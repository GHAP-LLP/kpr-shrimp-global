# KPR Shrimp Global — Project PRD

## Original Problem Statement
Build a B2B marketing website for KPR Shrimp Global Ltd based on the provided build specification document. Use a custom color palette (frost/neon/ice tokens) instead of the spec's original color scheme.

## Color Palette (Custom — override from spec)
| Token | Hex | Use |
|-------|-----|-----|
| --frost-900 | #1E293B | Primary brand, hero backgrounds, section headers |
| --frost-700 | #475569 | Hover states, secondary accents, body text |
| --frost-500 | #94A3B8 | UI elements, dividers, muted text |
| --neon-500 | #F97316 | CTA buttons, orange accent lines |
| --ice-100 | #F1F5F9 | Default page backgrounds |
| --ice-300 | #E2E8F0 | Card backgrounds, borders |
| --ink-900 | #0F172A | Primary text |
| --white | #FFFFFF | Card surfaces |

## Typography
- **H1–H3**: Fraunces (Google Font, variable weight)
- **Body / Nav / UI**: Inter (Google Font)
- **Spec tables**: JetBrains Mono (Google Font)

## Tech Stack
- **Frontend**: React.js (CRA), React Router v7, Tailwind CSS
- **Backend**: FastAPI + MongoDB (no backend features used in Phase 1+2)

## User Personas
- Foodservice / HORECA operators (restaurants, hotels, pubs, chains, caterers)
- Food manufacturers (ready meal producers, ingredient buyers)
- Wholesale distributors (cash-and-carry, redistribution)
- Retail private label buyers (supermarkets, own-brand ranges)

## Scope Completed: Phase 1 + 2

### Phase 1: Foundation
- [x] Sticky responsive Navbar with Products and Sectors dropdowns
- [x] Footer with 4-column layout
- [x] Breadcrumb component
- [x] Homepage with all 7 sections:
  - Hero (dark frost-900 bg, Fraunces H1, stats bar)
  - Trust bar (certifications working towards)
  - Product range (3 category cards)
  - Sectors served (4 sector cards with overlaid images)
  - Why Specialist Matters (4 feature cards)
  - Sourcing section (Green House Agro Products)
  - Lead capture CTA section

### Phase 2: Product & Sector Pages
- [x] Products hub page (/products) with 3 category cards + count size reference table
- [x] Frozen Raw Shrimp hub (/products/frozen-raw-shrimp) — 5 variants + count size guide
- [x] Cooked Shrimp hub (/products/cooked-shrimp) — 2 variants
- [x] Ready-to-Cook hub (/products/ready-to-cook) — 4 variants
- [x] Product variant detail pages with full spec table (JetBrains Mono)
- [x] 4 Sector landing pages (Foodservice & HORECA, Food Manufacturers, Wholesale Distributors, Retail Private Label)

### Forms
- [x] Request a Sample page — full form with sector, product, volume, timeline
- [x] Contact page — contact form
- Both forms: UI-only (show success state on submit, no backend)

## Architecture
- `src/data/products.js` — All 3 product categories, 11 variants, count sizes
- `src/data/sectors.js` — All 4 sectors with benefits, pack formats, docs
- `src/components/Navbar.jsx` — Sticky nav, hover dropdowns, mobile hamburger
- `src/components/Footer.jsx` — 4-column footer
- `src/components/Breadcrumb.jsx` — Breadcrumb navigation
- `src/pages/HomePage.jsx` — All 7 sections inline
- `src/pages/ProductsHubPage.jsx` — Products overview
- `src/pages/ProductHubPage.jsx` — Dynamic category hub
- `src/pages/ProductVariantPage.jsx` — Variant with spec table
- `src/pages/SectorPage.jsx` — Dynamic sector landing page
- `src/pages/RequestSamplePage.jsx` — Sample request form
- `src/pages/ContactPage.jsx` — Contact form
- `src/pages/NotFoundPage.jsx` — 404 page

## Last Updated
2026-02-12 (v2 — homepage redesigned to match spec reference images)

### Homepage v2 Changes
- Hero redesigned: no background image, pure frost-900 dark navy, compact layout
- Trust bar: centered dot-separated labels (BRC AA · BAP CERTIFIED · HACCP · EU APPROVED · FSA REGISTERED)
- Sections now numbered: 01 · PRODUCT RANGE, 02 · WHO WE SERVE, 03 · WHY SPECIALIST MATTERS, 04 · SIZING & SPECIFICATIONS, 05 · SOURCING
- Product cards: icon-based (Snowflake, Flame, UtensilsCrossed) — no photos
- Sector cards: icon-based (ShoppingBag, ChefHat, Truck, Factory)
- Sizing section: COUNT 16/20 | PIECES/KG 35–44 | GLAZE 10–20% | PACK 10×1kg data boxes
- Lead capture: neon-500 orange bg, email input + dark CTA button
- Fixed critical Tailwind config bug (duplicate `colors` key overwriting brand tokens)

## Prioritized Backlog

### P0 (Critical — Phase 3)
- [ ] Individual product variant pages (e.g., /products/cooked-shrimp/iqf-cooked-pd) — already routed, data present
- [ ] About page (/about)
- [ ] Sustainability page (/sustainability)

### P1 (Important)
- [ ] Resources / Downloads page (spec sheets, CoA, datasheets)
- [ ] Quote request form (separate from sample)
- [ ] Backend integration for form submissions (Resend or similar)
- [ ] Real UK office address, phone number
- [ ] Real email addresses confirmed

### P2 (Enhancement)
- [ ] SEO meta tags per page (react-helmet)
- [ ] Open Graph tags for social sharing
- [ ] Sitemap.xml
- [ ] LinkedIn company page link
- [ ] Google Analytics integration
- [ ] Real Adobe Stock photography replacing Unsplash placeholders
- [ ] Animation/micro-interactions (Framer Motion)
- [ ] Mobile menu improvements (full-screen overlay)
