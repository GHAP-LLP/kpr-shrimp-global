# Infrastructure & Deployment

Living document — current state, not a log. See `CHANGELOG.md` for history.

## Frontend — Vercel

- **Live URL:** `https://frontend-mu-nine-84.vercel.app`
- Vercel project name: `frontend`, account: `prashanthketha-9745s-projects`.
- Build config: `vercel.json` → `cd frontend && yarn install && yarn build`, output `frontend/.next`.
- Custom domain `www.indoaquaticltd.com` (referenced in `robots.txt`/`sitemap.xml`) is **not connected** — DNS does not resolve.

## Backend — Render (planned, not yet live)

- `render.yaml` defines service `kpr-shrimp-backend` (Python, root `backend/`), but no Render service has actually been created from it.
- Required secrets once created: `MONGO_URL`, `CORS_ORIGINS` (both `sync: false` — set manually in Render dashboard). `DB_NAME` is set to `kpr_shrimp` in the yaml.

## Database
- MongoDB — no instance provisioned yet (e.g. Atlas). Needed before backend can run for real.

## Env vars reference

| Var | Where | Status |
|---|---|---|
| `MONGO_URL` | `backend/.env` | not set live |
| `DB_NAME` | `backend/.env` | `kpr_shrimp` (from render.yaml) |
| `CORS_ORIGINS` | `backend/.env` | not set live |

## CLI access notes
- Vercel CLI (`npx vercel`) authenticated via `vercel login` (device flow) on 2026-08-26.
- No Render CLI/token configured yet.
