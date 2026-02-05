# Mellow theme + light/dark toggle + typewriter hero + About cleanup

This ExecPlan is a living document. The sections `Progress`, `Surprises & Discoveries`, `Decision Log`, and `Outcomes & Retrospective` must be kept up to date as work proceeds.

This plan must be maintained in accordance with `PLANS.md` at the repository root.

## Purpose / Big Picture

This change makes the site feel softer and more flexible by introducing a mellow dark/light palette, a clear theme toggle, and a typing-style greeting on the Home page. The About page becomes tighter and more professional by removing the redundant headline and Profile section, starting directly from Experience, and ensuring Experience/Education are ordered correctly and feel clickable. The result is a calmer visual tone and clearer interaction cues without changing the site’s information architecture.

## Progress

- [x] (2026-02-05 20:05Z) Draft this ExecPlan with confirmed decisions.
- [x] (2026-02-05 20:25Z) Remove the “JM” pill and add a light/dark toggle in `src/components/Nav.astro`.
- [x] (2026-02-05 20:30Z) Implement mellow dark/light tokens and theme toggle behavior in `src/styles/global.css` and the shared layout script.
- [x] (2026-02-05 20:32Z) Add a typewriter animation for the Home greeting in `src/pages/index.astro`.
- [x] (2026-02-05 20:36Z) Remove the About headline and Profile section in `src/pages/about/index.astro`.
- [x] (2026-02-05 20:38Z) Sort Experience and Education newest-first in `src/pages/about/index.astro`.
- [x] (2026-02-05 20:42Z) Improve accordion clickability with hover, focus, and chevron cues in `src/styles/global.css`.
- [x] (2026-02-05 20:45Z) Update docs: `AGENTS.md`, `README.md`, and this ExecPlan’s living sections.
- [x] (2026-02-05 21:05Z) Fix theme/typewriter initialization by retrying on DOMContentLoaded and astro:page-load.
- [x] (2026-02-05 21:20Z) Move theme/typewriter logic into static files in `public/scripts/` to guarantee execution.
- [x] (2026-02-05 21:35Z) Apply warm espresso palette tokens for dark/light themes.
- [x] (2026-02-05 21:50Z) Soften dark background and redesign timeline styling to feel less rigid.
- [x] (2026-02-05 22:10Z) Slow down typewriter speed and remove card-like timeline styling.
- [x] (2026-02-05 22:30Z) Prevent light-mode flash by preloading theme and softening timeline layout further.
- [x] (2026-02-05 22:50Z) Eliminate light-mode toggle flash and refine timeline spacing/hover without cards.
- [x] (2026-02-05 23:05Z) Hide toggle until theme ready, align timeline dots, and soften line contrast.
- [x] (2026-02-05 23:20Z) Add hover underline + stronger affordance and tighten theme-toggle flash prevention.
- [x] (2026-02-05 23:35Z) Render a single theme icon via JS and align dots with date baseline.
- [x] (2026-02-05 23:45Z) Hide the toggle until the icon is injected and realign dots with the date column.
- [x] (2026-02-06 00:10Z) Remove icon injection, render sun/moon in markup, and align dots to timeline line.
- [x] (2026-02-06 00:25Z) Nudge timeline dots left to match the line and remove theme-toggle transition flash.
- [x] (2026-02-06 00:40Z) Validate locally and confirm deploy.

## Surprises & Discoveries

- Observation: Inline scripts did not execute reliably in local dev, even after re-init hooks.
  Evidence: User report from `npm run dev`; moved logic to static scripts under `public/scripts/`.

## Decision Log

- Decision: Default theme is dark with a light toggle.
  Rationale: Matches the current tone while adding flexibility.
  Date/Author: 2026-02-05 / Codex

- Decision: The typewriter animation plays once and respects reduced-motion.
  Rationale: Adds personality without being distracting.
  Date/Author: 2026-02-05 / Codex

- Decision: About page keeps only the title and starts with Experience.
  Rationale: Reduces redundancy and improves flow.
  Date/Author: 2026-02-05 / Codex

- Decision: Theme toggle is wired in `src/layouts/BaseLayout.astro` to avoid duplicate scripts across pages.
  Rationale: Centralizes the behavior while keeping the nav component simple.
  Date/Author: 2026-02-05 / Codex

## Outcomes & Retrospective

Theme toggle, mellow palettes, typewriter greeting, About cleanup, sorting, and accordion affordances are implemented and validated. Final dot alignment was tuned to match the timeline line in both themes.

## Context and Orientation

Navigation is rendered by `src/components/Nav.astro` and includes a home icon, links to About/Projects/Library, and a theme toggle (the “JM” pill is removed). The Home page is `src/pages/index.astro` and shows the greeting text with two CTAs plus a typewriter animation. The About page is `src/pages/about/index.astro` and now starts directly with Experience and Education accordions. Global styling is defined in `src/styles/global.css` using CSS variables for dark and light palettes. The base HTML structure and shared scripts are in `src/layouts/BaseLayout.astro`. The fixed contact icon bar is in `src/components/Footer.astro`.

## Plan of Work

First, remove the “JM” pill in the nav and add a theme toggle button with sun/moon icons. The toggle sets `data-theme` on `<html>`, persists the choice in `localStorage`, and defaults to dark when no preference is stored.

Next, replace the current dark-only tokens with a mellow dark palette and add a light palette override via `[data-theme="light"]`. Apply `color-scheme` to align native controls and ensure the fixed contact bar, cards, grid lines, and buttons remain readable.

Then, implement a typewriter greeting on the Home page by reusing the greeting text, animating it once on load, and disabling the animation when `prefers-reduced-motion` is enabled.

For the About page, remove the headline line and the Profile section so Experience is the first content block under the “About Me” title. Add date parsing and sorting so Experience and Education are displayed newest-first.

Finally, make the accordions feel clickable by improving hover/focus states and adding a chevron indicator that rotates on open. Update the documentation to reflect the new behavior.

## Concrete Steps

Work from repo root.

1. Update `src/components/Nav.astro` by removing the “JM” pill and adding a theme toggle button with `aria-label`. Keep the home icon and links intact.
2. Update `src/layouts/BaseLayout.astro` with a small inline script that applies the stored theme, defaults to dark, and toggles the icons and `data-theme` on click.
3. Update `src/styles/global.css` to define mellow dark tokens in `:root`, light tokens in `[data-theme="light"]`, and theme-toggle styles. Add accordion hover, focus, and chevron cues.
4. Update `src/pages/index.astro` to add a typewriter script for the greeting and a class that renders a blinking cursor during typing.
5. Update `src/pages/about/index.astro` to remove the headline and Profile section, and sort the Experience/Education collections newest-first.
6. Update `README.md`, `AGENTS.md`, and the living sections in this ExecPlan.

## Validation and Acceptance

Run `npm run dev` and verify:

- The “JM” pill is gone and a sun/moon toggle appears in the nav.
- Switching themes updates colors immediately and persists on refresh.
- The Home greeting types once on load and stays static afterward.
- Reduced-motion disables the typewriter effect.
- About shows the title and then Experience directly.
- Experience and Education are sorted newest-first.
- Accordions look clickable with hover and chevron rotation.
- Light mode renders the fixed contact bar correctly.

## Idempotence and Recovery

All changes are safe to re-run. If theme logic breaks, clear the `theme` key in `localStorage` to return to default dark. If sorting fails, remove the date parsing helper to return to file order.

## Artifacts and Notes

If needed, include small code excerpts for the theme toggle and typewriter in this section during implementation.

## Interfaces and Dependencies

No new dependencies. Use native DOM APIs, CSS variables, and existing Astro components.

Plan update note: Initial plan created to implement mellow theme + toggle, typewriter greeting, About cleanup, and accordion affordances.
Plan update note: Progress updated to reflect implementation and documentation changes; validation still pending.
