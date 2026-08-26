# Website Tone & Policy Briefing

**Date:** 26 August 2026
**Purpose:** Summarise the site-wide positioning/tone rewrite and Corporate Policies additions made this session, what needs director confirmation before it can be treated as final, and what can be safely ignored given Indo Aquatic's size and sector under UK law.

---

## 1. Tone change — what the site now says

The site previously implied SS Agro Products was a "parent company"/trading arm of Indo Aquatic. This has been corrected throughout the site (Home, About, Sustainability, Policies, Contact, Footer, Hero) to the following consistent story:

- **Indo Aquatic UK Ltd is an independent company** (Company No. 17230607), not a subsidiary or trading arm of any overseas entity.
- The directors bring **20+ years of family aquaculture experience**, having grown a farming/processing operation to conglomerate scale (referenced as **$100 million**) before establishing the UK entity — no founder is named in this narrative copy.
- Indo Aquatic **owns and operates its own prawn farms and processing plants** in Kodavalur, Nellore, Andhra Pradesh, **alongside a global network of vetted partners** in other leading prawn-producing regions — not reliant on India alone.
- Supply chain sequence is now stated precisely: farmed/processed at own facilities and by partners worldwide → **samples from every partner are tested and finalised at Indo Aquatic's own facility** → shipped (from India or other partner regions) → UK cold storage (Grimsby/Hull).
- Tone throughout emphasises **highest quality, full traceability, and close control at every step**, "from pond to UK plate."
- Removed: the "SS Agro Products" company name (facility is now referred to only by location), and the "Our Team" section on the About page (director bios / names no longer publicly listed).

**JSON-LD structured data** (`layout.jsx`) had its `parentOrganization` field referencing SS Agro removed — this was a real SEO/legal risk (a false corporate affiliation claim in machine-readable schema.org data) and has not been reinstated.

---

## 2. Corporate Policies page — what was added

The `/policies` page (linked in both the Navbar "Company" dropdown and Footer) now covers 20 sections, including two added this session:

- **§19 Animal Welfare (Aquaculture)** — closed pond systems, antibiotic-free production (verifiable via third-party residue testing), BAP/ASC audit scope covering welfare/biosecurity. Built entirely from facts already published on the Sustainability page.
- **§20 Whistleblowing and Speak Up** — concerns raised directly to a director, handled confidentially, framed appropriately for a small company (no fabricated third-party hotline).

Both were written using only facts already verified/published elsewhere on the site — nothing new was asserted.

---

## 3. Needs your confirmation before treating as final

| Item | Why it needs sign-off |
|---|---|
| **Certifications** (BRC, BAP, HACCP, ISO 22000, FSSC 22000, FDA Registered, Halal, ASC) | Currently *listed* as "Held" on the Sustainability/About pages, but no actual certificate files exist. The Resources page "Request document" button is an email-capture form only — nothing is actually sent. **Decision needed:** supply the real certificate PDFs so the claim is backed by a real document, or remove/soften the download-request option so we're not implying a document exists that can't be produced. |
| **"$100 million" figure** | Now stated publicly on the About page (directors' family business scale). Confirm you're comfortable with this number being public before it's finalised. |
| **Privacy Policy wording** | §6 "Who we share data with" still says "our sourcing partners (India and other origin countries)" rather than "our own facilities and partners." Left as-is because it's a legal/data-sharing disclosure that's accurate either way — flag if you want it aligned to the "own farms" language for full consistency. |
| **Sustainable Seafood Coalition (SSC) membership** | Lyons Seafoods and M&S are both members (Responsible Sourcing Code + Environmental Labelling Code). Not published anywhere on the site — logged only as a `docs/roadmap.md` consideration. Needs a genuine business decision to join before any membership language is added. |

---

## 4. What we can safely ignore (per UK company size/sector rules)

These are commonly seen on larger competitor sites (Birds Eye, M&S, Lyons Seafoods) but are **not legally required** for a company of Indo Aquatic's size, and were deliberately left out rather than fabricated:

- **Statutory Modern Slavery Act 2015 Statement** — only mandatory for businesses with turnover above **£36 million**. Indo Aquatic is below this threshold, so a general "Human Rights and Modern Slavery" policy commitment (already in §2) is sufficient; a formal signed annual statement is optional, not required.
- **GSCOP (Groceries Supply Code of Practice) obligations** — GSCOP regulates the UK's largest *designated* grocery retailers (Tesco, Sainsbury's, etc.), not their suppliers directly. Indo Aquatic is not itself GSCOP-designated, so no direct compliance burden — already noted correctly in Policies §12.
- **Named third-party ethical audit schemes** (ETI Base Code membership, SEDEX, GDST, MarinTrust) — these are voluntary membership schemes some larger retailers require of *their own* suppliers. Not adopted by Indo Aquatic, so nothing is claimed — safe to ignore unless a specific customer contract requires joining one.
- **Formal Net Zero / carbon reduction targets** — not a legal requirement for an SME importer; only larger retailers/quoted companies face mandatory climate-related financial disclosure (e.g. TCFD/SECR thresholds Indo Aquatic doesn't meet). General energy-efficiency language (already in §16) is proportionate.
- **EU establishment approval** — already correctly shown as "In progress" rather than "Held," since it only matters if/when exporting to the EU; not required for UK-only trade.
- **IUU (Illegal, Unreported, Unregulated) fishing / Fisheries Bill catch certification** — this regulates **wild-caught** fisheries. Indo Aquatic deals exclusively in **farmed** (aquaculture) prawns, so this entire compliance regime doesn't apply and has correctly never been referenced on the site.

---

## Bottom line

Nothing has been published that overstates Indo Aquatic's certifications, memberships, or legal obligations. The four items in Section 3 are the only outstanding decisions before this round of changes is fully "signed off." Everything in Section 4 is a legitimate gap compared to larger competitors, but not a compliance risk at Indo Aquatic's current size and sector.
