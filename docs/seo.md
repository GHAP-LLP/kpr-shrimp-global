# SEO

Living document — current state, not a log. See `CHANGELOG.md` for history.

## Current setup
- `frontend/public/robots.txt` + `sitemap.xml` reference `https://www.indoaquaticltd.com` — **domain not yet live** (DNS unresolved). Sitemap will point to the wrong/unreachable domain until this is connected.
- `frontend/src/lib/metadata.js` — `buildMetadata()` helper, appears to be the active Next.js metadata source (Open Graph, Twitter cards, canonical URLs).
- `frontend/src/components/SEO.jsx` — react-helmet-async based, **not imported anywhere**. Likely dead code from the pre-Next.js CRA version; Next.js App Router should use `generateMetadata`/the metadata export instead of client-side `<Helmet>`. Needs a decision: remove or confirm still needed.

## Outstanding
- No keyword/ranking/analytics tooling connected (no Search Console, GA, etc.) — see `analytics-growth.md`.
- Full technical audit blocked until the production domain is actually live (canonical URLs currently point to an unreachable domain).
