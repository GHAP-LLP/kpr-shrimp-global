# Frontend

Living document — current state, not a log. See `CHANGELOG.md` for history.

## Stack
- Next.js 15, App Router (`frontend/app/`)
- React 19
- Tailwind CSS + shadcn/ui (Radix primitives) in `src/components/ui/`
- `@` alias → `src/` (configured in `next.config.js` + `jsconfig.json`)

## Routing
- `app/products/[category]/page.jsx` → `getCategoryBySlug(params.category)`
- `app/products/[category]/[variant]/page.jsx` → `getVariantBySlug(params.category, params.variant)`
- `app/sectors/[sector]/page.jsx` → `sectors.find(s => s.slug === params.sector)`

## Data layer
- Static only — no API fetch yet. `src/data/products.js` (3 categories, 11 variants) and `src/data/sectors.js` (4 sectors).

## Known issues / cleanup candidates
- `src/components/SEO.jsx` (react-helmet-async) is not imported anywhere — likely dead code from pre-Next.js version. See `roadmap.md`.
- No `frontend/.env` currently exists (removed stale `REACT_APP_BACKEND_URL` reference from `CLAUDE.md`).
