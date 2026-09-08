from fastapi import FastAPI, APIRouter, HTTPException, Request, Response, Depends, Cookie
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import certifi
import os
import logging
import bcrypt
import jwt
import requests
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional, Literal
import uuid
from datetime import datetime, timezone, timedelta


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
# tlsCAFile=certifi.where() avoids TLS handshake failures against Atlas from containers with an incomplete system CA bundle (e.g. Render).
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url, tlsCAFile=certifi.where())
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

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str


class SampleRequestCreate(BaseModel):
    model_config = ConfigDict(extra="ignore")

    name: str = Field(min_length=1, max_length=200)
    company: str = Field(min_length=1, max_length=200)
    email: EmailStr
    phone: Optional[str] = Field(default="", max_length=50)
    sector: str = Field(min_length=1, max_length=100)
    products: List[str] = Field(default_factory=list)
    volume: Optional[str] = Field(default="", max_length=100)
    timeline: Optional[str] = Field(default="", max_length=100)
    notes: Optional[str] = Field(default="", max_length=2000)
    # Honeypot field: real users never fill this in; bots that auto-fill every field will.
    website: Optional[str] = Field(default="", max_length=200)


class SampleRequest(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    type: Literal["sample_request"] = "sample_request"
    name: str
    company: str
    email: EmailStr
    phone: str = ""
    sector: str
    products: List[str] = Field(default_factory=list)
    volume: str = ""
    timeline: str = ""
    notes: str = ""
    status: str = "new"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class ContactCreate(BaseModel):
    model_config = ConfigDict(extra="ignore")

    name: str = Field(min_length=1, max_length=200)
    company: Optional[str] = Field(default="", max_length=200)
    email: EmailStr
    message: str = Field(min_length=1, max_length=2000)
    # Honeypot field: real users never fill this in; bots that auto-fill every field will.
    website: Optional[str] = Field(default="", max_length=200)


class ContactEnquiry(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    type: Literal["contact"] = "contact"
    name: str
    company: str = ""
    email: EmailStr
    message: str
    status: str = "new"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class AdminLogin(BaseModel):
    username: str
    password: str


class EnquiryStatusUpdate(BaseModel):
    status: Literal["new", "read", "responded", "archived"]


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
    """Best-effort email notification via Resend — never blocks or fails the enquiry submission."""
    if not (RESEND_API_KEY and RESEND_FROM_EMAIL and ADMIN_NOTIFICATION_EMAIL):
        return
    try:
        lines = [f"<p><b>{k}:</b> {v}</p>" for k, v in doc.items() if k not in ("id", "type", "status")]
        requests.post(
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
    except Exception:
        logger.exception("Failed to send admin notification email")


# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}


@api_router.post("/enquiries/sample-request", response_model=SampleRequest)
async def create_sample_request(payload: SampleRequestCreate, request: Request):
    if payload.website:
        # Honeypot tripped — silently accept without storing to avoid tipping off bots.
        return SampleRequest(**payload.model_dump(exclude={"website"}))

    sample_request = SampleRequest(**payload.model_dump(exclude={"website"}))

    doc = sample_request.model_dump()
    doc["created_at"] = doc["created_at"].isoformat()
    doc["source_ip"] = request.client.host if request.client else None

    try:
        await db.enquiries.insert_one(doc)
    except Exception:
        logger.exception("Failed to store sample request enquiry")
        raise HTTPException(status_code=500, detail="Could not save your request. Please try again.")

    notify_admin_of_enquiry("sample_request", doc)
    return sample_request


@api_router.post("/enquiries/contact", response_model=ContactEnquiry)
async def create_contact_enquiry(payload: ContactCreate, request: Request):
    if payload.website:
        # Honeypot tripped — silently accept without storing to avoid tipping off bots.
        return ContactEnquiry(**payload.model_dump(exclude={"website"}))

    contact_enquiry = ContactEnquiry(**payload.model_dump(exclude={"website"}))

    doc = contact_enquiry.model_dump()
    doc["created_at"] = doc["created_at"].isoformat()
    doc["source_ip"] = request.client.host if request.client else None

    try:
        await db.enquiries.insert_one(doc)
    except Exception:
        logger.exception("Failed to store contact enquiry")
        raise HTTPException(status_code=500, detail="Could not send your message. Please try again.")

    notify_admin_of_enquiry("contact", doc)
    return contact_enquiry


@api_router.post("/admin/login")
async def admin_login(payload: AdminLogin, response: Response):
    valid_username = payload.username == ADMIN_USERNAME
    valid_password = bcrypt.checkpw(payload.password.encode(), ADMIN_PASSWORD_HASH.encode())
    if not (valid_username and valid_password):
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
    response.delete_cookie(key=SESSION_COOKIE_NAME, path="/")
    return {"ok": True}


@api_router.get("/admin/me")
async def admin_me(admin: str = Depends(get_current_admin)):
    return {"username": admin}


@api_router.get("/admin/enquiries")
async def list_enquiries(
    type: Optional[Literal["sample_request", "contact"]] = None,
    status: Optional[Literal["new", "read", "responded", "archived"]] = None,
    page: int = 1,
    page_size: int = 20,
    admin: str = Depends(get_current_admin),
):
    query = {}
    if type:
        query["type"] = type
    if status:
        query["status"] = status

    skip = max(page - 1, 0) * page_size
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
    result = await db.enquiries.update_one({"id": enquiry_id}, {"$set": {"status": payload.status}})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Enquiry not found")
    doc = await db.enquiries.find_one({"id": enquiry_id}, {"_id": 0})
    return doc



@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()