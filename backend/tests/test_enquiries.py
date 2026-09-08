import conftest


def contact_payload(**overrides):
    payload = {
        "name": "Jane Buyer",
        "company": "Frozen Foods Ltd",
        "email": "jane@frozenfoods.example",
        "phone": "07700900123",
        "message": "Please send your HOSO spec sheet.",
        "consent": True,
    }
    payload.update(overrides)
    return payload


def sample_payload(**overrides):
    payload = {
        "name": "Sam Procurement",
        "company": "Retail Group",
        "email": "sam@retail.example",
        "sector": "Retail Private Label",
        "products": ["Head-On Shell-On"],
        "consent": True,
    }
    payload.update(overrides)
    return payload


def post(client, ip, path, json):
    return client.post(path, json=json, headers={"X-Forwarded-For": ip})


def test_contact_enquiry_stored(client, mock_db, unique_ip):
    res = post(client, unique_ip, "/api/enquiries/contact", contact_payload())
    assert res.status_code == 200
    assert res.json() == {"ok": True}
    mock_db.enquiries.insert_one.assert_awaited_once()
    doc = mock_db.enquiries.insert_one.await_args.args[0]
    assert doc["type"] == "contact"
    assert doc["status"] == "new"
    assert doc["consent"] is True
    assert "website" not in doc
    assert "source_ip" not in doc


def test_honeypot_accepted_but_not_stored(client, mock_db, unique_ip):
    res = post(client, unique_ip, "/api/enquiries/contact", contact_payload(website="http://spam.example"))
    assert res.status_code == 200
    mock_db.enquiries.insert_one.assert_not_awaited()


def test_consent_required(client, mock_db, unique_ip):
    res = post(client, unique_ip, "/api/enquiries/contact", contact_payload(consent=False))
    assert res.status_code == 422
    mock_db.enquiries.insert_one.assert_not_awaited()


def test_contact_requires_phone(client, mock_db, unique_ip):
    payload = contact_payload()
    del payload["phone"]
    res = post(client, unique_ip, "/api/enquiries/contact", payload)
    assert res.status_code == 422


def test_sample_request_stored(client, mock_db, unique_ip):
    res = post(client, unique_ip, "/api/enquiries/sample-request", sample_payload())
    assert res.status_code == 200
    doc = mock_db.enquiries.insert_one.await_args.args[0]
    assert doc["type"] == "sample_request"


def test_products_list_capped(client, mock_db, unique_ip):
    res = post(client, unique_ip, "/api/enquiries/sample-request", sample_payload(products=["x"] * 31))
    assert res.status_code == 422
    mock_db.enquiries.insert_one.assert_not_awaited()


def test_document_request_needs_documents(client, mock_db, unique_ip):
    payload = contact_payload()
    del payload["phone"]
    del payload["message"]
    res = post(client, unique_ip, "/api/enquiries/document-request", {**payload, "documents": []})
    assert res.status_code == 422
    res = post(client, unique_ip, "/api/enquiries/document-request", {**payload, "documents": ["BRC Certificate"]})
    assert res.status_code == 200
    assert mock_db.enquiries.insert_one.await_args.args[0]["type"] == "document_request"


def test_enquiry_rate_limit(client, mock_db, unique_ip):
    for _ in range(5):
        res = post(client, unique_ip, "/api/enquiries/contact", contact_payload())
        assert res.status_code == 200
    res = post(client, unique_ip, "/api/enquiries/contact", contact_payload())
    assert res.status_code == 429


def test_admin_me_requires_auth(client):
    assert client.get("/api/admin/me").status_code == 401


def test_admin_login_wrong_password(client, unique_ip):
    res = post(client, unique_ip, "/api/admin/login", {"username": "admin", "password": "wrong"})
    assert res.status_code == 401


def test_admin_login_success_sets_cookie(client, unique_ip):
    res = post(
        client,
        unique_ip,
        "/api/admin/login",
        {"username": "admin", "password": conftest.TEST_ADMIN_PASSWORD},
    )
    assert res.status_code == 200
    assert "admin_session" in res.cookies
    assert client.get("/api/admin/me").status_code == 200
