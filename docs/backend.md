# Backend

Living document — current state, not a log. See `CHANGELOG.md` for history.

## Status: not deployed

FastAPI app in `backend/server.py`. Currently just a scaffold — runs locally only:

```
cd backend
uvicorn server:app --reload --port 8000
```

## Endpoints

| Method | Path | Purpose |
|---|---|---|
| GET | `/api/` | health check ("Hello World") |
| POST | `/api/status` | create a `StatusCheck` doc |
| GET | `/api/status` | list `StatusCheck` docs |

All routes mounted under `/api` via `api_router`.

## Data store
- MongoDB via Motor (async), connection from `MONGO_URL` / `DB_NAME` env vars (`backend/.env`, not committed).
- Only collection currently used: `status_checks`.
- No live MongoDB instance is provisioned yet — see `roadmap.md`.

## Deployment target
- `render.yaml` defines a `kpr-shrimp-backend` web service (Python runtime, root `backend/`) — **not yet created** on Render.
