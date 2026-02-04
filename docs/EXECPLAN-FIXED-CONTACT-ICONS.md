# Fixed contact icons across all pages

**Overall Progress:** `100%`

This ExecPlan is a living document. The sections `Progress`, `Surprises & Discoveries`, `Decision Log`, and `Outcomes & Retrospective` must be kept up to date as work proceeds.

This plan is written to comply with `PLANS.md` at the repository root. Maintain this document in accordance with that file.

## Purpose / Big Picture

After this change, the site will no longer show the large “Contact” card at the bottom of pages. Instead, every page will display a fixed, minimal row of three contact icons (email, GitHub, LinkedIn) pinned to the bottom of the viewport, similar to the reference screenshots. This improves visual flow by keeping contact actions present but unobtrusive. The change is visible by running the dev server and verifying that the icons remain fixed at the bottom on Home, About Me, Projects (list and detail), and Library.

## Progress

- [x] 🟩 (2026-02-04 20:45Z) Drafted ExecPlan for fixed contact icons.
- [x] 🟩 (2026-02-04 21:10Z) Replace the footer card with a fixed icon bar component.
- [x] 🟩 (2026-02-04 21:12Z) Wire the icon bar to email + social links from `src/content/profile/index.md`.
- [x] 🟩 (2026-02-04 21:15Z) Add global styles for fixed bottom positioning and hover states.
- [x] 🟩 (2026-02-04 21:30Z) Validate on all pages and confirm deploy.

## Surprises & Discoveries

No surprises yet.

## Decision Log

- Decision: Reuse `src/components/Footer.astro` as the fixed icon bar instead of adding a new component.
  Rationale: Footer is already used on all pages; converting it avoids touching every page file and keeps the change localized.
  Date/Author: 2026-02-04 / Codex

## Outcomes & Retrospective

The fixed contact icon bar is implemented and validated across all pages. The previous contact card no longer appears, and the footer is now a minimal, always-visible icon strip. No follow-up issues were observed during validation.

## Context and Orientation

This repository is an Astro static site. Pages live in `src/pages/` and already import `src/components/Footer.astro`. The Footer component currently renders a large card with contact details, which is what the user wants to remove. Global styles live in `src/styles/global.css`. Contact data (email and social links) lives in `src/content/profile/index.md`.

The goal is to replace the Footer card with a fixed, minimal icon bar that is always visible at the bottom of the viewport. The icons should link to:

Email: `mailto:juliusmaliwat.work@gmail.com` (from profile email)
GitHub: profile link with label “GitHub”
LinkedIn: profile link with label “LinkedIn”

## Plan of Work

First, update `src/components/Footer.astro` to render a minimal fixed container with three icon links, one each for email, GitHub, and LinkedIn. Use inline SVG icons so no new dependencies or assets are required. The component should read `email` and `links` props (already passed in by pages) and resolve the GitHub/LinkedIn URLs by matching the link `label` values.

Next, adjust `src/styles/global.css` to add a fixed bottom bar style. It should be centered, unobtrusive, and have a subtle background/blur to remain readable over content. Add hover and focus states for accessibility. Also add bottom padding to `main` if needed so content does not overlap the fixed bar.

Finally, verify that every page shows the icon bar and that the old card layout is gone. Confirm that the icons remain fixed when scrolling.

## Concrete Steps

From the repository root, edit:

- `src/components/Footer.astro` to replace the card markup with a fixed icon bar and inline SVG icons.
- `src/styles/global.css` to add styles for the fixed icon bar and to ensure content does not overlap it.

Run the dev server:

    npm run dev

## Validation and Acceptance

The change is accepted when all of the following are true:

The contact card no longer appears on any page.

A fixed icon row (email, GitHub, LinkedIn) is visible at the bottom of the viewport on all pages.

The icons link correctly to:
- `mailto:juliusmaliwat.work@gmail.com`
- GitHub profile URL from `src/content/profile/index.md`
- LinkedIn profile URL from `src/content/profile/index.md`

The icons remain fixed while scrolling and do not overlap important content.

## Idempotence and Recovery

These edits are safe to re-run. If you need to roll back, restore `src/components/Footer.astro` and `src/styles/global.css` from git history.

## Artifacts and Notes

Expected behavior example:

    Bottom bar shows three icons.
    Clicking the mail icon opens a new email.
    Clicking GitHub/LinkedIn opens the profile in a new tab.

## Interfaces and Dependencies

No new dependencies are required. Use inline SVG icons inside `src/components/Footer.astro`. The component should accept `email` and `links` props (already provided by pages). Keep the data source in `src/content/profile/index.md`.

Plan update note: Created initial ExecPlan to replace the footer contact card with a fixed icon bar on all pages, per user request.
