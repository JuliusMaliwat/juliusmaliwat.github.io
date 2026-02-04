# Restructure site sections and home CTAs

This ExecPlan is a living document. The sections `Progress`, `Surprises & Discoveries`, `Decision Log`, and `Outcomes & Retrospective` must be kept up to date as work proceeds.

This plan is written to comply with `PLANS.md` at the repository root. Maintain this document in accordance with that file.

## Purpose / Big Picture

After this change, the site will have four sections only: Home, About Me, Projects, and Library. The Home page will be simplified to show only two actions: “Get in touch” (mailto) and “Download CV” (a placeholder PDF). The About Me page will combine Experience and Education into a single, readable CV-style page. This is visible by starting the dev server and navigating to the pages in the top navigation; the old Experience/Education/Contact pages will no longer appear.

## Progress

- [x] (2026-02-04 19:30Z) Drafted ExecPlan for the section restructure.
- [x] (2026-02-04 20:10Z) Update Home to show only “Get in touch” and “Download CV”.
- [x] (2026-02-04 20:15Z) Merge Experience and Education into About Me page.
- [x] (2026-02-04 20:16Z) Add Library page and update navigation.
- [x] (2026-02-04 20:18Z) Add placeholder `public/cv.pdf` and update contact email.
- [ ] Validate locally and confirm deploy.

## Surprises & Discoveries

- Observation: Deleting the old Experience/Education/Contact pages failed with “Accesso al percorso negato”.
  Evidence: PowerShell `Remove-Item` returned permission denied.

## Decision Log

- Decision: Keep the Library page as a simple static page for now, with placeholder content.
  Rationale: The request did not define “library” content. A static page keeps scope minimal and still gives a navigable section.
  Date/Author: 2026-02-04 / Codex

- Decision: Use a placeholder PDF in `public/cv.pdf` and link to it from Home.
  Rationale: The request explicitly asked for a fake CV for now, so a static file is the simplest way to ship the interaction.
  Date/Author: 2026-02-04 / Codex

- Decision: Replace old Experience/Education/Contact pages with redirects to `/about/` instead of deleting.
  Rationale: File deletion failed due to permission errors; redirects preserve the “single About Me” experience without blocking progress.
  Date/Author: 2026-02-04 / Codex

## Outcomes & Retrospective

Core restructure is implemented: Home is CTA-only, About Me merges Experience and Education, Library page exists, and old pages redirect to About. Remaining work is only to validate locally and confirm the GitHub Pages deploy after the next push.

## Context and Orientation

This repository is an Astro static site. Pages live in `src/pages/` and are rendered at matching routes. The navigation is implemented in `src/components/Nav.astro`. The global layout and metadata live in `src/layouts/BaseLayout.astro`. Static assets (like a CV PDF) live in `public/` and are served at the site root path (for example, `public/cv.pdf` is available at `/cv.pdf`).

Current pages include `src/pages/index.astro` (Home), `src/pages/about/index.astro` (About Me), `src/pages/projects/index.astro`, `src/pages/projects/[slug].astro`, and `src/pages/library/index.astro`. The old `experience`, `education`, and `contact` pages now redirect to `/about/`. Content entries are stored in `src/content/`, including `src/content/profile/index.md`, `src/content/experience/`, and `src/content/education/`.

## Plan of Work

First, simplify the Home page in `src/pages/index.astro` so it renders a short introduction and exactly two actions: a mailto link to `juliusmaliwat.work@gmail.com` and a download link to `/cv.pdf`. Remove the other sections from Home so the page focuses on these actions.

Next, create a new About Me page at `src/pages/about/index.astro` that combines Experience and Education entries on one page. Reuse the existing content collections so no data migration is needed. The page should read like a CV: a short intro, then Experience, then Education.

Then, replace the old standalone pages `src/pages/experience/index.astro`, `src/pages/education/index.astro`, and `src/pages/contact/index.astro` with redirects to `/about/` so the navigation and site structure match the new four-section requirement even if those routes are accessed directly.

Add a new Library page at `src/pages/library/index.astro` with a simple heading and placeholder copy. This can be a static list for now. Keep it minimal; no new content collections are required.

Update navigation in `src/components/Nav.astro` to include only Home, About Me, Projects, and Library. Ensure the active state still works on these routes.

Add a placeholder CV file at `public/cv.pdf`. It can be a very small PDF with “CV placeholder” text for now. Update `src/content/profile/index.md` to use the new contact email `juliusmaliwat.work@gmail.com` so mailto links are consistent.

## Concrete Steps

From the repository root, make the edits described above with your editor. When adding the placeholder CV, ensure the file is saved as `public/cv.pdf` so it is publicly accessible at `https://<site>/cv.pdf`.

Run the dev server from the repository root:

    npm run dev

Open the site at `http://localhost:3000/` and verify navigation and links.

## Validation and Acceptance

The change is accepted when the following are all true:

The Home page shows only a short intro and two buttons/links: one that opens an email to `juliusmaliwat.work@gmail.com` and one that downloads `/cv.pdf`. No Experience, Education, Projects, or Contact sections appear on Home.

The navigation contains exactly four items: Home, About Me, Projects, Library.

The About Me page shows Experience and Education sections together in a CV-style flow, using the existing content entries.

The Projects page and project detail pages continue to work.

The Library page exists and renders placeholder content.

The old Experience, Education, and Contact routes redirect to `/about/` and are not linked in navigation.

## Idempotence and Recovery

These edits are safe to re-run. If you need to roll back, restore the previous page content from git history and revert `src/components/Nav.astro` and `src/pages/index.astro`. Replacing the placeholder PDF is safe; it can be overwritten by the real CV later.

## Artifacts and Notes

Expected Home link behavior:

    Get in touch → mailto:juliusmaliwat.work@gmail.com
    Download CV → /cv.pdf

## Interfaces and Dependencies

No new dependencies are required. Continue using Astro’s built-in page routing and content collections. Keep the current collection schemas in `src/content/config.ts` unchanged and reuse them on the About Me page.

Plan update note: Created initial ExecPlan to restructure the site into Home, About Me, Projects, and Library with a simplified Home CTA and merged CV-style About page, per user request.
Plan update note: Adjusted plan to use redirects for old pages due to permission errors when deleting files.
Plan update note: Updated context and rollback guidance to reflect redirects instead of deletion.
