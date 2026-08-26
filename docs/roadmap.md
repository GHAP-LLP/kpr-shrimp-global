# Roadmap / Backlog

Status: `todo` · `in-progress` · `done`. Grouped by category. Update as work progresses.

## Infra / Deployment
- [ ] `todo` — Create actual Render service from `render.yaml`, provision MongoDB (e.g. Atlas), set `MONGO_URL`/`CORS_ORIGINS` secrets.
- [ ] `todo` — Connect custom domain `www.indoaquaticltd.com` to the Vercel deployment (currently unresolved DNS).
- [ ] `todo` — Wire frontend forms (Contact, Request a Sample) to real backend endpoints once backend exists.

## Backend
- [ ] `todo` — Design real domain endpoints (contact submissions, sample requests) beyond the `/api/status` scaffold.
- [ ] `todo` — Define MongoDB collections/schema for form submissions.

## SEO
- [ ] `todo` — Decide fate of unused `frontend/src/components/SEO.jsx` (react-helmet based, not imported) — remove or repurpose.
- [ ] `todo` — Full technical SEO audit once a stable domain is live (meta, schema, sitemap accuracy, crawlability).

## Frontend
- [ ] `todo` — Confirm `frontend/.env` needs (backend base URL) once backend is live.

## Docs
- [x] `done` — Documentation system set up (`docs/` folder).
