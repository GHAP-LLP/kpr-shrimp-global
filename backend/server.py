import html
import logging
import os
import time
import uuid
from collections import defaultdict, deque
from contextlib import asynccontextmanager
from datetime import datetime, timezone, timedelta
from pathlib import Path
from typing import List, Optional, Literal

import bcrypt
import certifi
import jwt
import requests
from dotenv import load_dotenv
from fastapi import (
    FastAPI,
    APIRouter,
    BackgroundTasks,
    Cookie,
    Depends,
    HTTPException,
    Query,
    Request,
    Response,
)
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, ConfigDict, EmailStr, Field, field_validator
from starlette.middleware.cors import CORSMiddleware

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
# tlsCAFile=certifi.where() avoids TLS handshake failures against Atlas from containers with an incomplete system CA bundle (e.g. Render).
# Explicit timeouts so an unreachable Mongo fails a form POST in ~5s instead of the 30s driver default.
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(
    mongo_url,
    tlsCAFile=certifi.where(),
    serverSelectionTimeoutMS=5000,
    connectTimeoutMS=5000,
    socketTimeoutMS=10000,
)
db = client[os.environ['DB_NAME']]

# Admin auth config
JWT_SECRET = os.environ['JWT_SECRET']
ADMIN_USERNAME = os.environ['ADMIN_USERNAME']
ADMIN_PASSWORD_HASH = os.environ['ADMIN_PASSWORD_HASH']
SESSION_COOKIE_NAME = "admin_session"
SESSION_TTL_HOURS = 24

# Email notifications (optional — skipped if not configured)
RESEND_API_KEY = os.environ.get('RESEND_API_KEY', '')
RESEND_FROM_EMAIL = os.environ.get('RESEND_FROM_EMAIL', '')
ADMIN_NOTIFICATION_EMAIL = os.environ.get('ADMIN_NOTIFICATION_EMAIL', '')

# If CORS_ORIGINS is not set in the environment, fall back to the known site
# origins rather than "*" — a wildcard combined with allow_credentials would let
# any site make credentialed requests to the admin API.
DEFAULT_CORS_ORIGINS = (
    "https://www.indoaquaticltd.com,"
    "https://indoaquaticltd.com,"
    "http://localhost:3000"
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    if not (RESEND_API_KEY and RESEND_FROM_EMAIL and ADMIN_NOTIFICATION_EMAIL):
        logger.warning(
            "Email notification config incomplete (RESEND_API_KEY / RESEND_FROM_EMAIL / "
            "ADMIN_NOTIFICATION_EMAIL) — enquiries will be stored but nobody will be emailed."
        )
    try:
        await db.enquiries.create_index("id", unique=True)
        await db.enquiries.create_index([("created_at", -1)])
        await db.enquiries.create_index([("type", 1), ("status", 1)])
    except Exception:
        logger.exception("Failed to create indexes (continuing without them)")
    yield
    client.close()


app = FastAPI(lifespan=lifespan)

api_router = APIRouter(prefix="/api")


# --- Rate limiting (in-memory, per-IP sliding window; fine for a single worker) ---

_rate_buckets: dict = defaultdict(deque)


def _client_ip(request: Request) -> str:
    # Render sits behind a proxy, so request.client.host is the proxy. Use the
    # first X-Forwarded-For hop for rate-limit bucketing only — it is never stored.
    forwarded = request.headers.get("x-forwarded-for")
    if forwarded:
        return forwarded.split(",")[0].strip()
    return request.client.host if request.client else "unknown"


def _rate_limit(request: Request, scope: str, limit: int, window_seconds: int = 60) -> None:
    key = f"{scope}:{_client_ip(request)}"
    now = time.monotonic()
    bucket = _rate_buckets[key]
    while bucket and now - bucket[0] > window_seconds:
        bucket.popleft()
    if len(bucket) >= limit:
        raise HTTPException(status_code=429, detail="Too many requests. Please try again in a minute.")
    bucket.append(now)


def enquiry_rate_limit(request: Request) -> None:
    _rate_limit(request, "enquiry", limit=5)


def login_rate_limit(request: Request) -> None:
    _rate_limit(request, "login", limit=5)


# --- Models ---

MAX_PRODUCTS = 30


class EnquiryCreateBase(BaseModel):
    model_config = ConfigDict(extra="ignore")

    name: str = Field(min_length=1, max_length=200)
    company: str = Field(min_length=1, max_length=200)
    email: EmailStr
    # UK GDPR: submissions must carry explicit consent to be processed.
    consent: bool
    # Page the enquiry was submitted from (attribution only).
    source_page: Optional[str] = Field(default="", max_length=300)
    # Honeypot field: real users never fill this in; bots that auto-fill every field will.
    website: Optional[str] = Field(default="", max_length=200)

    @field_validator("consent")
    @classmethod
    def consent_required(cls, v: bool) -> bool:
        if not v:
            raise ValueError("Consent is required to process the enquiry")
        return v


class SampleRequestCreate(EnquiryCreateBase):
    phone: Optional[str] = Field(default="", max_length=50)
    sector: str = Field(min_length=1, max_length=100)
    products: List[str] = Field(default_factory=list, max_length=MAX_PRODUCTS)
    volume: Optional[str] = Field(default="", max_length=100)
    timeline: Optional[str] = Field(default="", max_length=100)
    notes: Optional[str] = Field(default="", max_length=2000)

    @field_validator("products")
    @classmethod
    def products_item_length(cls, v: List[str]) -> List[str]:
        for item in v:
            if len(item) > 200:
                raise ValueError("Product name too long")
        return v


class ContactCreate(EnquiryCreateBase):
    phone: str = Field(min_length=7, max_length=50)
    enquiry_type: Optional[str] = Field(default="", max_length=100)
    message: str = Field(min_length=1, max_length=2000)


class DocumentRequestCreate(EnquiryCreateBase):
    documents: List[str] = Field(min_length=1, max_length=40)
    notes: Optional[str] = Field(default="", max_length=2000)

    @field_validator("documents")
    @classmethod
    def documents_item_length(cls, v: List[str]) -> List[str]:
        for item in v:
            if len(item) > 200:
                raise ValueError("Document name too long")
        return v


class AdminLogin(BaseModel):
    username: str = Field(max_length=200)
    password: str = Field(max_length=200)


class EnquiryStatusUpdate(BaseModel):
    status: Literal["new", "read", "responded", "archived"]


ENQUIRY_TYPES = Literal["sample_request", "contact", "document_request"]


# --- Admin auth helpers ---

def create_session_token(username: str) -> str:
    payload = {
        "sub": username,
        "exp": datetime.now(timezone.utc) + timedelta(hours=SESSION_TTL_HOURS),
    }
    return jwt.encode(payload, JWT_SECRET, algorithm="HS256")


def get_current_admin(admin_session: Optional[str] = Cookie(default=None)) -> str:
    if not admin_session:
        raise HTTPException(status_code=401, detail="Not authenticated")
    try:
        payload = jwt.decode(admin_session, JWT_SECRET, algorithms=["HS256"])
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Session expired or invalid")
    return payload["sub"]


def notify_admin_of_enquiry(kind: str, doc: dict) -> None:
    """Email notification via Resend. Runs as a BackgroundTask after the response
    is sent, so a slow Resend call cannot delay the submitter or block the event loop."""
    if not (RESEND_API_KEY and RESEND_FROM_EMAIL and ADMIN_NOTIFICATION_EMAIL):
        logger.warning("Enquiry %s stored but notification email skipped: Resend not configured", doc.get("id"))
        return
    try:
        skip_keys = ("id", "type", "status", "consent")
        lines = [
            f"<p><b>{html.escape(str(k))}:</b> {html.escape(str(v))}</p>"
            for k, v in doc.items()
            if k not in skip_keys
        ]
        resp = requests.post(
            "https://api.resend.com/emails",
            headers={"Authorization": f"Bearer {RESEND_API_KEY}"},
            json={
                "from": RESEND_FROM_EMAIL,
                "to": [ADMIN_NOTIFICATION_EMAIL],
                "subject": f"New {kind.replace('_', ' ')} enquiry — {doc.get('name', '')}",
                "html": "".join(lines),
            },
            timeout=10,
        )
        if resp.status_code >= 400:
            logger.error("Resend rejected notification for enquiry %s: %s %s", doc.get("id"), resp.status_code, resp.text[:500])
    except Exception:
        logger.exception("Failed to send admin notification email")


def build_enquiry_doc(kind: str, payload: EnquiryCreateBase) -> dict:
    now = datetime.now(timezone.utc).isoformat()
    doc = payload.model_dump(exclude={"website"})
    doc.update({
        "id": str(uuid.uuid4()),
        "type": kind,
        "status": "new",
        "created_at": now,
        "consent_at": now,
    })
    return doc


async def store_enquiry(kind: str, payload: EnquiryCreateBase, background_tasks: BackgroundTasks, error_detail: str) -> dict:
    if payload.website:
        # Honeypot tripped — silently accept without storing to avoid tipping off bots.
        return {"ok": True}

    doc = build_enquiry_doc(kind, payload)
    try:
        await db.enquiries.insert_one(dict(doc))
    except Exception:
        logger.exception("Failed to store %s enquiry", kind)
        raise HTTPException(status_code=500, detail=error_detail)

    doc.pop("_id", None)
    background_tasks.add_task(notify_admin_of_enquiry, kind, doc)
    return {"ok": True}


# --- Public routes ---

@api_router.get("/")
async def root():
    return {"status": "ok"}


@api_router.get("/health")
async def health():
    try:
        await client.admin.command("ping")
        return {"status": "ok", "database": "ok"}
    except Exception:
        logger.exception("Health check: Mongo ping failed")
        return Response(content='{"status": "degraded", "database": "unreachable"}', status_code=503, media_type="application/json")


@api_router.post("/enquiries/sample-request", dependencies=[Depends(enquiry_rate_limit)])
async def create_sample_request(payload: SampleRequestCreate, background_tasks: BackgroundTasks):
    return await store_enquiry(
        "sample_request", payload, background_tasks,
        error_detail="Could not save your request. Please try again.",
    )


@api_router.post("/enquiries/contact", dependencies=[Depends(enquiry_rate_limit)])
async def create_contact_enquiry(payload: ContactCreate, background_tasks: BackgroundTasks):
    return await store_enquiry(
        "contact", payload, background_tasks,
        error_detail="Could not send your message. Please try again.",
    )


@api_router.post("/enquiries/document-request", dependencies=[Depends(enquiry_rate_limit)])
async def create_document_request(payload: DocumentRequestCreate, background_tasks: BackgroundTasks):
    return await store_enquiry(
        "document_request", payload, background_tasks,
        error_detail="Could not send your document request. Please try again.",
    )


# --- Admin routes ---

@api_router.post("/admin/login", dependencies=[Depends(login_rate_limit)])
async def admin_login(payload: AdminLogin, request: Request, response: Response):
    valid_username = payload.username == ADMIN_USERNAME
    try:
        valid_password = bcrypt.checkpw(payload.password.encode(), ADMIN_PASSWORD_HASH.encode())
    except ValueError:
        logger.error("ADMIN_PASSWORD_HASH is not a valid bcrypt hash — admin login is unusable until it is fixed")
        valid_password = False
    if not (valid_username and valid_password):
        logger.warning("Failed admin login attempt for username %r from %s", payload.username, _client_ip(request))
        raise HTTPException(status_code=401, detail="Invalid username or password")

    token = create_session_token(payload.username)
    response.set_cookie(
        key=SESSION_COOKIE_NAME,
        value=token,
        httponly=True,
        secure=True,
        samesite="none",
        max_age=SESSION_TTL_HOURS * 3600,
        path="/",
    )
    return {"ok": True}


@api_router.post("/admin/logout")
async def admin_logout(response: Response):
    # Attributes must match the ones the cookie was set with, or browsers
    # reject the deletion on cross-site responses and the session survives.
    response.delete_cookie(
        key=SESSION_COOKIE_NAME,
        path="/",
        secure=True,
        httponly=True,
        samesite="none",
    )
    return {"ok": True}


@api_router.get("/admin/me")
async def admin_me(admin: str = Depends(get_current_admin)):
    return {"username": admin}


@api_router.get("/admin/enquiries")
async def list_enquiries(
    type: Optional[ENQUIRY_TYPES] = None,
    status: Optional[Literal["new", "read", "responded", "archived"]] = None,
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    admin: str = Depends(get_current_admin),
):
    query = {}
    if type:
        query["type"] = type
    if status:
        query["status"] = status

    skip = (page - 1) * page_size
    cursor = db.enquiries.find(query, {"_id": 0}).sort("created_at", -1).skip(skip).limit(page_size)
    items = await cursor.to_list(page_size)
    total = await db.enquiries.count_documents(query)
    return {"items": items, "total": total, "page": page, "page_size": page_size}


@api_router.get("/admin/enquiries/{enquiry_id}")
async def get_enquiry(enquiry_id: str, admin: str = Depends(get_current_admin)):
    doc = await db.enquiries.find_one({"id": enquiry_id}, {"_id": 0})
    if not doc:
        raise HTTPException(status_code=404, detail="Enquiry not found")
    return doc


@api_router.patch("/admin/enquiries/{enquiry_id}")
async def update_enquiry_status(enquiry_id: str, payload: EnquiryStatusUpdate, admin: str = Depends(get_current_admin)):
    result = await db.enquiries.update_one(
        {"id": enquiry_id},
        {"$set": {
            "status": payload.status,
            "updated_at": datetime.now(timezone.utc).isoformat(),
            "updated_by": admin,
        }},
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Enquiry not found")
    doc = await db.enquiries.find_one({"id": enquiry_id}, {"_id": 0})
    return doc


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', DEFAULT_CORS_ORIGINS).split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)
