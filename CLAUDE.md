# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

KPR Shrimp Global — a B2B marketing website for a UK-based frozen shrimp importer/distributor. The site is purely informational (Phase 1+2 complete); forms show a success state on submit but do not hit the backend. The backend exists but is not wired to the frontend yet.

## Commands

### Frontend
```bash
cd frontend
yarn start        # dev server on port 3000
yarn build        # production build
yarn test         # run tests (no test files currently exist)
```

### Backend
```bash
cd backend
uvicorn server:app --reload --port 8000
```

### Backend tests
```bash
cd backend
pytest            # all tests
pytest tests/test_foo.py::test_bar  # single test
```

### Install dependencies
```bash
cd frontend && yarn install
cd backend && pip install -r requirements.txt
```

## Architecture

### Frontend
- **CRA + CRACO** — `craco.config.js` adds the `@` → `src/` webpack alias, wraps the dev server for `@emergentbase/visual-edits` live editing, and optionally mounts a health-check plugin (disabled by default via `ENABLE_HEALTH_CHECK=false`).
- **`@` alias** resolves to `src/` — use `@/components/Foo` not `../../components/Foo`.
- **Routing** — React Router v7. All routes defined in `App.js`. Dynamic pages receive URL params:
  - `/products/:category` → `ProductHubPage` calls `getCategoryBySlug(params.category)`
  - `/products/:category/:variant` → `ProductVariantPage` calls `getVariantBySlug(params.category, params.variant)`
  - `/sectors/:sector` → `SectorPage` matches `sectors.find(s => s.slug === params.sector)`
- **Static data layer** — all product and sector content lives in `src/data/products.js` and `src/data/sectors.js`. There is no API fetch; pages read directly from these exports. Adding or editing products/sectors means editing these files.
  - `products.js` exports `productCategories` (3 categories, 11 variants), `COUNT_SIZES`, `IMG` (image URLs), `getCategoryBySlug()`, `getVariantBySlug()`.
  - `sectors.js` exports `sectors` (4 sectors) and `SECTOR_IMG`.

### Styling
- **Tailwind CSS** with a custom brand token palette defined in `tailwind.config.js` and mirrored as CSS vars in `src/index.css`:

| Token | Hex | Usage |
|---|---|---|
| `frost-900` | `#1E293B` | Hero backgrounds, section headers |
| `frost-700` | `#475569` | Hover states, secondary text |
| `frost-500` | `#94A3B8` | Muted text, dividers |
| `neon-500` | `#F97316` | CTA buttons, accent lines |
| `neon-600` | `#EA580C` | Hover on neon buttons |
| `ice-100` | `#F1F5F9` | Default page background |
| `ice-300` | `#E2E8F0` | Card backgrounds, borders |
| `ink-900` | `#0F172A` | Primary text |

- **Dark theme pattern** — sub-pages (`ProductsHubPage`, `ProductHubPage`, `ProductVariantPage`, `SectorPage`, `ContactPage`, `RequestSamplePage`) use `bg-frost-900` page backgrounds with `bg-white/5 border-white/10` glass-style cards and `bg-white/10` table headers. The Homepage uses `bg-ice-100` for the outer shell and `bg-frost-900` only for the hero and CTA sections.
- **Fonts** — Fraunces (`font-fraunces`) for H1–H3, Inter (`font-inter` / `font-sans`) for body/nav, JetBrains Mono (`font-mono`) for spec tables.
- Shadcn/ui components are in `src/components/ui/` (Radix UI primitives).

### Backend
- FastAPI app in `backend/server.py`. All routes are mounted under the `/api` prefix via `api_router`.
- MongoDB via Motor (async). Connection uses `MONGO_URL` and `DB_NAME` env vars from `backend/.env`.
- Currently only has `/api/status` (POST/GET) as a health-check scaffold — no domain endpoints yet.

### Environment variables
- `frontend/.env` — `REACT_APP_BACKEND_URL` (backend base URL for future API calls), `WDS_SOCKET_PORT=443`, `ENABLE_HEALTH_CHECK=false`
- `backend/.env` — `MONGO_URL`, `DB_NAME`, `CORS_ORIGINS`
