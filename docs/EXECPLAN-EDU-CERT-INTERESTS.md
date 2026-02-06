# Education enrichment + certifications + hobbies (text-only logos)

This ExecPlan is a living document. The sections `Progress`, `Surprises & Discoveries`, `Decision Log`, and `Outcomes & Retrospective` must be kept up to date as work proceeds.

This plan must be maintained in accordance with `PLANS.md` at the repository root.

## Purpose / Big Picture

This change enriches the About page so it reads like a professional CV: Education shows the grade inline, thesis titles, and relevant coursework, while a new Certifications section highlights the Databricks certification with a verification link. A final Hobbies & Interests section adds personality in a lightweight, mellow style. Logos and external links for companies/universities are intentionally omitted for now, keeping the layout clean until assets are provided.

## Progress

- [x] (2026-02-06 01:05Z) Draft this ExecPlan with confirmed decisions (English content, text-only logos, certification link provided).
- [x] (2026-02-06 01:15Z) Save this ExecPlan to `docs/EXECPLAN-EDU-CERT-INTERESTS.md`.
- [x] (2026-02-06 01:20Z) Update education schema and content to remove summary fluff, add grade and courses.
- [x] (2026-02-06 01:25Z) Add Certifications collection and render a new section after Education.
- [x] (2026-02-06 01:30Z) Add Hobbies & Interests collection and render a new section at the end.
- [x] (2026-02-06 01:35Z) Update About page rendering for new fields and conditional blocks.
- [x] (2026-02-06 01:40Z) Update global styles for the new sections (mellow, no cards).
- [x] (2026-02-06 01:45Z) Update docs: `README.md`, `AGENTS.md`, and this ExecPlan’s living sections.
- [x] (2026-02-06 01:55Z) Validate locally and confirm deploy.

## Surprises & Discoveries

None.

## Decision Log

- Decision: Keep the Education and Certifications content in English.
  Rationale: The site is already English-first and the coursework list was provided in English.
  Date/Author: 2026-02-06 / Codex

- Decision: Do not add logos or external links yet for companies/universities.
  Rationale: The user asked for text-only until logos are available; links can be added later without layout changes.
  Date/Author: 2026-02-06 / Codex

- Decision: Show Education grades inline in the header rather than in a separate line.
  Rationale: Improves scanability while keeping the layout compact.
  Date/Author: 2026-02-06 / Codex

- Decision: Add Certifications as a separate section after Education with a verification link.
  Rationale: Certifications deserve their own block and need a visible credential URL.
  Date/Author: 2026-02-06 / Codex

- Decision: Hobbies & Interests will use a light icon grid with text labels (no GIFs for now).
  Rationale: Keeps the mellow aesthetic and avoids weight/performance costs.
  Date/Author: 2026-02-06 / Codex

## Outcomes & Retrospective

Education now shows grades inline, only thesis titles, and relevant coursework. Certifications and Hobbies & Interests are added as new sections, and styles match the mellow, non-card layout. Validation confirmed locally.

## Context and Orientation

The About page is rendered by `src/pages/about/index.astro`, which shows Experience and Education accordions and now needs to include Certifications and Hobbies. Education entries live in `src/content/education/*.md`, with the schema in `src/content/config.ts`. Global styles are in `src/styles/global.css`. The site uses a mellow espresso palette and timeline layout without cards.

## Plan of Work

First, extend the education content model to support a grade and a list of courses, and make the summary optional so we can remove the placeholder sentences. Update the two existing education entries to move the grade into a new `grade` field, remove the summary, keep the thesis, and add the provided coursework lists.

Next, add a Certifications collection and create one entry for Databricks Certified Data Engineer Associate with the provided date and verification link.

Then, add a Hobbies & Interests collection populated with the provided interests, using a simple icon and label for each item.

Finally, update the About page to render the new fields and sections in order (Experience, Education, Certifications, Hobbies & Interests) and update global styles to keep the presentation mellow and non-card-based.

## Concrete Steps

Work from repo root.

1) Update `src/content/config.ts` by making `education.summary` optional, adding `education.grade` and `education.courses`, and defining new `certifications` and `interests` collections.

2) Update `src/content/education/*.md` by removing `summary`, adding `grade`, keeping the thesis, and adding the new course lists.

3) Create `src/content/certifications/databricks-data-engineer-associate.md` with title, issuer, date, and credential URL.

4) Create `src/content/interests/` entries for fitness, basketball, chess, anime, bouldering, trekking, and guitar.

5) Update `src/pages/about/index.astro` to render grades inline, render courses, and insert the Certifications and Hobbies sections.

6) Update `src/styles/global.css` to add mellow styles for the certifications list and interests grid.

7) Update `README.md`, `AGENTS.md`, and this ExecPlan’s Progress/Outcomes.

## Validation and Acceptance

Run `npm run dev` and verify:

- Education entries show grade inline in the header.
- Education no longer shows the removed summary lines.
- Thesis titles and courses render correctly.
- Certifications section appears after Education with a working Databricks credential link.
- Hobbies & Interests section appears at the end with lightweight icons.
- No card styling is introduced.

## Idempotence and Recovery

All steps are additive or optional. If a section looks wrong, revert the relevant content file and re-run. If schema changes break content, restore previous field names and re-add optional values.

## Artifacts and Notes

None.

## Interfaces and Dependencies

No new external dependencies. All work uses Astro content collections and existing components.

Plan update note: Executed the plan to enrich Education, add Certifications and Hobbies, update styling, and validate locally.
