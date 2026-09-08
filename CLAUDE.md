# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Indo Aquatic (repo: kpr-shrimp-global) — a B2B marketing website for a UK-based frozen prawn importer/distributor. Frontend deploys to Vercel, backend (FastAPI + MongoDB Atlas) to Render (`render.yaml`, service `kpr-shrimp-backend`). The contact, sample-request, and document-request forms all POST to the backend, which stores enquiries in Mongo and emails the team via Resend. An admin dashboard lives at `/admin` (JWT cookie auth).

**Vocabulary rule: the site says "prawn", never "shrimp"** — in copy, URLs, slugs, and spec keys. Legacy `*-shrimp` slugs 301-redirect to the prawn slugs in `next.config.js`.

## Commands

### Frontend
```bash
cd frontend
yarn start        # dev server on port 3000 (npx next dev also works)
yarn build        # production build (npx next build also works)
```

### Backend
```bash
cd backend
uvicorn server:app --reload --port 8000
```

### Backend tests
```bash
cd backend
pytest            # all tests (mocked Mongo — no database needed)
pytest tests/test_enquiries.py::test_contact_enquiry_stored  # single test
```
On this machine Python is at `$env:LOCALAPPDATA\Programs\Python\Python311\python.exe` (`python` alone resolves to the Microsoft Store stub).

### Install dependencies
```bash
cd frontend && yarn install
cd backend && pip install -r requirements.txt
```

## Architecture

### Frontend
- **Next.js 15 (App Router)** — `next.config.js` adds the `@` → `src/` webpack alias, disables ESLint during builds, **rewrites `/api/*` to the Render backend** (so forms work same-origin with no CORS and no env var required; `NEXT_PUBLIC_API_URL` overrides), and **301-redirects legacy shrimp slugs**.
- **`@` alias** resolves to `src/` — use `@/components/Foo` not `../../components/Foo`.
- **Routing** — file-based under `frontend/app/`. Dynamic pages: `app/products/[category]`, `app/products/[category]/[variant]`, `app/sectors/[sector]`; hub pages exist at `/products` and `/sectors`. `app/sitemap.js` and `app/robots.js` are generated from the data files — never hand-edit a sitemap. `app/admin/layout.jsx` sets `robots: noindex`.
- **Static data layer** — content lives in `src/data/`:
  - `products.js` — `productCategories` (3 categories, 12 variants; slugs `frozen-raw-prawns`, `cooked-prawns`, `ready-to-cook`), `COUNT_SIZES`, `IMG`, `getCategoryBySlug()`, `getVariantBySlug()`.
  - `sectors.js` — `sectors` (4) and `SECTOR_IMG`.
  - `nav.js` — single source for Navbar + Footer links.
  - `certifications.js` — single source for certification names/status, rendered on the homepage strip, About grid, and Sustainability roadmap. Update status here only.
  - `images.js` — brand imagery. **All images are self-hosted in `frontend/public/images/`** (stock placeholders pending real photography — see the `// Replace with:` comments).
- **Forms** — client components in `src/components/pages/` POST via `postEnquiry()` in `src/lib/api.js` (75s AbortController timeout for Render cold starts, friendly 422/429 messages). Every form has a honeypot `website` field and a required GDPR `consent` checkbox, and sends `source_page`.

### Styling
- **Tailwind CSS** with a custom brand token palette defined in `tailwind.config.js` and mirrored as CSS vars in `src/index.css`:

| Token | Hex | Usage |
|---|---|---|
| `frost-900` | `#1E293B` | Hero backgrounds, section headers |
| `frost-700` | `#475569` | Hover states, secondary text |
| `frost-500` | `#94A3B8` | Muted text, dividers |
| `neon-500` | `#F97316` | Accent text/icons on DARK backgrounds only |
| `neon-600` | `#EA580C` | Decorative only |
| `neon-700` | `#C2410C` | Button fills, accent text on light backgrounds (WCAG AA with white) |
| `neon-800` | `#9A3412` | Hover on neon-700 buttons |
| `ice-100` | `#F1F5F9` | Default page background |
| `ice-300` | `#E2E8F0` | Card backgrounds, borders |
| `ink-900` | `#0F172A` | Primary text |

- **Contrast rule**: `neon-500` fails WCAG AA against white/ice — use `text-neon-700`/`bg-neon-700` on light backgrounds and for all filled buttons; `neon-500` is acceptable for accent text on `frost-900`. The shared `SectionLabel` component (`src/components/SectionLabel.jsx`) takes a `dark` prop for this.
- **Dark theme pattern** — sub-page headers use `bg-frost-900` with `bg-white/5 border-white/10` glass cards. Homepage uses `bg-ice-100` shell with `bg-frost-900` hero/CTA sections. CTA bands are `bg-neon-700`.
- **Fonts** — Fraunces (`font-fraunces`) for H1–H3, Inter (`font-inter`/`font-sans`) for body/nav, JetBrains Mono (`font-mono`) for spec tables. Loaded via `next/font`.
- Shadcn/ui components are in `src/components/ui/` (Radix primitives, mostly unused scaffolding).
- Accessibility: a skip link and global `:focus-visible` styles live in `src/index.css`; the mobile menu is a `role="dialog"` with Escape handling; decorative images get `alt=""`.

### Backend (`backend/server.py`)
- FastAPI, all routes under `/api`. MongoDB via Motor with 5s server-selection timeout; indexes created at startup (lifespan).
- Public endpoints: `POST /api/enquiries/{contact|sample-request|document-request}` (Pydantic-validated, required `consent`, honeypot short-circuit, per-IP in-memory rate limiting 5/min), `GET /api/health` (pings Mongo).
- Admin endpoints: `POST /api/admin/{login|logout}`, `GET /api/admin/me`, `GET/PATCH /api/admin/enquiries[...]` (paginated, `page_size` capped at 100). Auth = bcrypt-checked login issuing a 24h HS256 JWT in a Secure/HttpOnly/SameSite=None cookie.
- Enquiry notification email is sent via Resend as a FastAPI `BackgroundTask` with `html.escape`d fields; a startup warning logs if Resend env vars are missing.
- **No `source_ip` is stored** (GDPR) — X-Forwarded-For is used for rate-limit bucketing only.
- CORS falls back to the known site origins (never `*`) when `CORS_ORIGINS` is unset.
- Tests in `backend/tests/` mock the Mongo collection (`conftest.py`) — keep new endpoint tests in that style.

### Environment variables
- `backend/.env` — `MONGO_URL`, `DB_NAME`, `CORS_ORIGINS`, `JWT_SECRET`, `ADMIN_USERNAME`, `ADMIN_PASSWORD_HASH`, `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `ADMIN_NOTIFICATION_EMAIL` (see `.env.example`; production values live in the Render dashboard).
- Frontend needs no env vars in production (the `/api` rewrite has a hardcoded Render fallback); `NEXT_PUBLIC_API_URL` optionally overrides the backend origin.

### Content caveats
- Certification claims render from `src/data/certifications.js`; EU approval is marked "in progress" — do not state it as held.
- Two sections in `app/sustainability/page.jsx` carry `NEEDS REVIEW` comments awaiting director sign-off — do not extend those claims.
- No public phone number is published (the previous one was a fictitious Ofcom drama number); contact is email-only until a real number is supplied.
