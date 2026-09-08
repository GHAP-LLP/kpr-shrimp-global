import os
import sys
from pathlib import Path
from unittest.mock import AsyncMock, MagicMock

import bcrypt
import pytest

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

TEST_ADMIN_PASSWORD = "correct-horse-battery"

os.environ.setdefault("MONGO_URL", "mongodb://localhost:27017")
os.environ.setdefault("DB_NAME", "kpr_shrimp_test")
os.environ.setdefault("JWT_SECRET", "test-secret-0123456789abcdef0123456789abcdef")
os.environ.setdefault("ADMIN_USERNAME", "admin")
os.environ.setdefault(
    "ADMIN_PASSWORD_HASH",
    bcrypt.hashpw(TEST_ADMIN_PASSWORD.encode(), bcrypt.gensalt(rounds=4)).decode(),
)

import server  # noqa: E402


@pytest.fixture()
def mock_db(monkeypatch):
    """Replace the Mongo collection with an AsyncMock so no database is needed."""
    enquiries = MagicMock()
    enquiries.create_index = AsyncMock()
    enquiries.insert_one = AsyncMock()
    enquiries.find_one = AsyncMock(return_value=None)
    enquiries.update_one = AsyncMock()
    enquiries.count_documents = AsyncMock(return_value=0)
    fake_db = MagicMock()
    fake_db.enquiries = enquiries
    monkeypatch.setattr(server, "db", fake_db)
    return fake_db


@pytest.fixture()
def client(mock_db):
    from fastapi.testclient import TestClient

    # https base_url so the Secure session cookie is stored and replayed by the client.
    with TestClient(server.app, base_url="https://testserver") as test_client:
        yield test_client


_ip_counter = 0


@pytest.fixture()
def unique_ip():
    """A fresh client IP per test so the in-memory rate limiter doesn't bleed between tests."""
    global _ip_counter
    _ip_counter += 1
    return f"10.1.{_ip_counter // 250}.{_ip_counter % 250 + 1}"
