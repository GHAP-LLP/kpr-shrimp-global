# Design & Visual

Living document — current state, not a log. See `CHANGELOG.md` for history.

## Brand tokens (`tailwind.config.js` / `src/index.css`)

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

## Fonts
- Fraunces (`font-fraunces`) — H1–H3
- Inter (`font-inter` / `font-sans`) — body/nav
- JetBrains Mono (`font-mono`) — spec tables

## Theme pattern
- Sub-pages (Products hub/variant, Sectors, Contact, Request Sample) use `bg-frost-900` dark backgrounds with `bg-white/5 border-white/10` glass cards.
- Homepage uses `bg-ice-100` shell, `bg-frost-900` only in hero/CTA sections.

## Reference
- `design_guidelines.json` at repo root — source of truth for design intent, check before making visual changes.
