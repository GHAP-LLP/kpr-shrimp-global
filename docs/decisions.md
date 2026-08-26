# Decisions Log

Why non-obvious choices were made. Changelog says *what*; this says *why*. Newest first.

---

### 2026-08-26 — Removed Emergent-platform tooling

**Decision:** Removed `@craco/craco`, `@emergentbase/visual-edits`, `emergentintegrations`, and `.emergent/emergent.yml`.

**Why:** The project migrated from CRA (via Emergent's scaffolding platform) to Next.js 15 App Router. `next dev` doesn't use CRACO, the visual-edits package was never imported, and deploys now go through Render (backend) + Vercel (frontend) rather than Emergent's own hosting. These were pure dead weight (dependency install time, security surface) with zero functional use.

### 2026-08-26 — Documentation system introduced

**Decision:** Adopted a `docs/` folder with a changelog + category deep-dives + decisions log + roadmap, instead of one giant README or relying on chat history.

**Why:** User is building this project across multiple sessions/IDEs (migrated from a remote IDE to local) and wants full visibility into technical, frontend, backend, SEO, marketing, and design work without re-deriving context each time. Git-tracked docs survive IDE/session changes; chat history and session memory do not.
