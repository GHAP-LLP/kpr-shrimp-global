# Project Documentation

This `docs/` folder is the single source of truth for everything happening on KPR Shrimp Global (Indo Aquatic UK Ltd) outside of the code itself. It's git-tracked, so nothing here gets lost between sessions or machines.

## How it's organized

- **[CHANGELOG.md](CHANGELOG.md)** — one entry per calendar date. Each entry has: **Summary** (theme of the day), **What we worked on** (narrative), **What changed** (concrete, checked-off list), **Pending / Next steps** (checklist carried forward until done).
- **[decisions.md](decisions.md)** — the "why" behind non-obvious choices (ADR-style). Changelog says *what* happened; this says *why*.
- **[roadmap.md](roadmap.md)** — pending/backlog tasks, grouped by category, with status.
- Category deep-dives (living documents, updated in place as things evolve — not append-only logs):
  - **[frontend.md](frontend.md)** — architecture, conventions, component/page inventory.
  - **[backend.md](backend.md)** — API endpoints, data models, DB schema.
  - **[infrastructure.md](infrastructure.md)** — hosting, deployment, domains, env vars, CI/CD.
  - **[seo.md](seo.md)** — technical SEO, metadata strategy, sitemap/schema status.
  - **[design-visual.md](design-visual.md)** — brand tokens, typography, imagery/style guide.
  - **[content-marketing.md](content-marketing.md)** — messaging, positioning, copy conventions, campaigns.
  - **[analytics-growth.md](analytics-growth.md)** — tracking, conversion, metrics (once instrumented).
  - **[legal-compliance.md](legal-compliance.md)** — privacy/cookie/terms status, regulatory notes.
  - **[qa-security.md](qa-security.md)** — testing status, known issues, security posture.

## Workflow

Once per day (not every session/turn), the assistant should:
1. Add or merge into today's `CHANGELOG.md` entry: Summary, What we worked on, What changed (checked off), Pending / Next steps (checklist).
2. Update the relevant category file(s) if the change affects current-state facts (e.g. a new API endpoint goes in `backend.md`, not just the changelog).
3. Log any non-obvious "why" decisions in `decisions.md`.
4. Move/update items in `roadmap.md` as tasks complete or new ones surface.
