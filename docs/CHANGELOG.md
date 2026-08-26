# Changelog

One entry per calendar date, summarizing that day's work across the whole project. Format per day:

- **Summary** — one or two lines, the overall theme of the day.
- **What we worked on** — narrative bullets of areas touched.
- **What changed** — concrete changes made (files, configs, deployments, decisions).
- **Pending / Next steps** — checklist of what's left open, carried forward until done.

---

## 2026-08-26

### Summary
First working session in the local IDE after migrating off the remote/Emergent setup. Focus: figure out what's actually true about the project (docs were stale), clean up leftover cruft, confirm what's actually live, and set up ongoing documentation.

### What we worked on
- Reviewed the real project structure vs. what `CLAUDE.md` claimed (found it was describing an old CRA/CRACO/React Router stack that no longer exists).
- Investigated whether Emergent-platform tooling was still needed anywhere in the codebase.
- Checked what's actually deployed and reachable — frontend (Vercel) and backend (Render).
- Set up this `docs/` system for ongoing tracking.

### What changed
- [x] Corrected `CLAUDE.md` to describe the real stack: Next.js 15 App Router, file-based routing under `frontend/app/`, no more CRACO/React Router.
- [x] Removed unused Emergent-era dependencies: `@craco/craco`, `@emergentbase/visual-edits` (frontend), `emergentintegrations` (backend), and the `.emergent/` config folder. Regenerated `yarn.lock` via `corepack yarn install`.
- [x] Confirmed the live frontend URL: `https://frontend-mu-nine-84.vercel.app` (verified via `vercel login` + `vercel project ls`/`inspect`, content matches this repo).
- [x] Confirmed `www.indoaquaticltd.com` (used in `robots.txt`/`sitemap.xml`) is not connected to anything yet — DNS doesn't resolve.
- [x] Confirmed there is no live backend — `render.yaml` exists but no Render service has been created, no MongoDB provisioned, nothing wired up yet.
- [x] Flagged `frontend/src/components/SEO.jsx` as likely dead code (not imported anywhere; superseded by `frontend/src/lib/metadata.js`).
- [x] Set up `docs/` folder: this changelog, `decisions.md`, `roadmap.md`, and per-area living docs (frontend, backend, infra, SEO, design, marketing, analytics, legal, QA).

### Pending / Next steps
- [ ] Create the actual Render service from `render.yaml`; provision MongoDB; set `MONGO_URL`/`CORS_ORIGINS`.
- [ ] Connect `www.indoaquaticltd.com` to the Vercel deployment.
- [ ] Wire frontend forms (Contact, Request a Sample) to a real backend once it exists.
- [ ] Decide whether to delete `frontend/src/components/SEO.jsx`.
- [ ] Design real backend endpoints beyond the `/api/status` scaffold.
