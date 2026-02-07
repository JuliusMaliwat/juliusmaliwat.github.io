# Skills taxonomy from CV + logos/links + university project cards

This ExecPlan is a living document. The sections `Progress`, `Surprises & Discoveries`, `Decision Log`, and `Outcomes & Retrospective` must be kept up to date as work proceeds.

This plan is maintained in accordance with `PLANS.md` at the repository root.

## Purpose / Big Picture

This change upgrades the About page with company logos linked to company websites, a Skills section grouped exactly as the CV taxonomy, and university project cards inside expanded Education entries. Certification now also shows a PNG badge image. The outcome is richer credibility and discoverability while preserving the mellow visual tone.

## Progress

- [x] (2026-02-07 00:10Z) Confirmed requirements for company links, thesis links, and university project links.
- [x] (2026-02-07 00:12Z) Verified uploaded assets in `public/skills`, `public/logos`, and `public/certifications`.
- [x] (2026-02-07 10:11Z) Saved this ExecPlan to `docs/EXECPLAN-SKILLS-LOGOS-UNI-PROJECTS.md`.
- [x] (2026-02-07 10:11Z) Extended content schemas for company logos/links, education thesis/project links, certification badge image, and categorized skills.
- [x] (2026-02-07 10:11Z) Populated content files with company links, thesis links, and university projects.
- [x] (2026-02-07 10:12Z) Created Skills content grouped by CV taxonomy.
- [x] (2026-02-07 10:12Z) Updated About page rendering (logos, skills groups, certification badge, university project cards).
- [x] (2026-02-07 10:13Z) Updated styles for mellow rendering of the new elements.
- [x] (2026-02-07 10:15Z) Updated docs (`README.md`, `AGENTS.md`) and this ExecPlan living sections.
- [ ] (2026-02-07 10:15Z) Validate local production build (blocked by local `node_modules/.vite` file lock; rerun after lock release).

## Surprises & Discoveries

- Observation: some source text had mojibake artifacts in existing content and About rendering (`l’Italia`, `·`, arrow symbols).
  Evidence: existing values in `src/content/experience/experience-1.md` and `src/pages/about/index.astro` before this implementation.

- Observation: local `astro build` is blocked by EPERM lock in `.vite` cache.
  Evidence: `EPERM: operation not permitted, unlink ...\node_modules\.vite\deps\astro___axobject-query.js`.

## Decision Log

- Decision: Skills section follows CV grouping exactly (3 groups), excluding extra uploaded logos not listed in CV.
  Rationale: explicit request to use CV taxonomy as the canonical structure.
  Date/Author: 2026-02-07 / Codex

- Decision: Company logos are rendered only in Experience summaries and linked to the respective company websites.
  Rationale: strengthens credibility while keeping layout noise low.
  Date/Author: 2026-02-07 / Codex

- Decision: University projects are rendered as dedicated cards under coursework within expanded Education items.
  Rationale: keeps coursework readable and makes project repos easy to scan and open.
  Date/Author: 2026-02-07 / Codex

- Decision: Certification badge image is displayed next to credential metadata.
  Rationale: visual proof improves trust and scannability.
  Date/Author: 2026-02-07 / Codex

## Outcomes & Retrospective

The feature set is implemented end-to-end in schema, content, rendering, and styles. About now includes linked company logos, thesis links, university project cards, grouped skills with icons, and a certification badge. Documentation was updated to reflect the new behavior. Remaining work is only a local production build rerun once the `.vite` file lock is released.

## Context and Orientation

The main rendering entrypoint for this feature is `src/pages/about/index.astro`. Content schemas are defined in `src/content/config.ts`, while data lives in `src/content/experience/`, `src/content/education/`, `src/content/certifications/`, and the new `src/content/skills/` directory. Static assets are read from `public/logos/`, `public/skills/`, and `public/certifications/`. Styling is centralized in `src/styles/global.css`.

## Plan of Work

The implementation first extended content schemas so all display requirements are data-driven. Content files were then enriched with company links/logos, thesis links, university projects, and certification badge image. A dedicated skills collection was added and populated with one entry per skill, grouped using the exact CV categories. The About page renderer was updated to consume these fields and render each section conditionally. Finally, styles were added for logos, skills chips, certification badge, and university project cards while preserving the existing mellow timeline visual language.

## Concrete Steps

From repository root:

    npm run build

Current local result:

    EPERM: operation not permitted, unlink ...\node_modules\.vite\deps\astro___axobject-query.js

Retry after stopping other running dev processes that may hold the `.vite` cache lock.

## Validation and Acceptance

Acceptance criteria:

- Experience rows show clickable company logos and company links for Quantyca, Softlab, and KPMG.
- Skills section appears in About and is grouped into exactly three CV categories.
- Education entries show thesis links and university project cards that open the correct GitHub repos.
- Certification shows badge image and credential link.
- New visuals remain mellow and consistent in both light and dark themes.

Local production build validation remains pending only due the `.vite` lock issue.

## Idempotence and Recovery

All changes are additive. Re-running the content and schema updates is safe. If any icon path fails, textual labels still render and only the path needs correction. If visual density feels high, only new classes in `src/styles/global.css` can be tuned without touching timeline foundations.

## Artifacts and Notes

Key files changed:

- `src/content/config.ts`
- `src/content/experience/experience-1.md`
- `src/content/experience/experience-2.md`
- `src/content/experience/experience-3.md`
- `src/content/education/education-1.md`
- `src/content/education/education-2.md`
- `src/content/certifications/databricks-data-engineer-associate.md`
- `src/content/skills/*.md`
- `src/pages/about/index.astro`
- `src/styles/global.css`
- `README.md`
- `AGENTS.md`

## Interfaces and Dependencies

No new npm dependencies were introduced. The feature relies on existing Astro content collections and static public assets.

Plan update note: this plan was created and then updated after implementation to reflect completed work, discovered local build lock limitation, and resulting documentation updates.
