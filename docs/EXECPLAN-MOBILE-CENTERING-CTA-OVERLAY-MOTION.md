# Mobile Centering + CTA Proportions + Camilla-Style Overlay Motion (Dark One-Page)

This ExecPlan is a living document. The sections `Progress`, `Surprises & Discoveries`, `Decision Log`, and `Outcomes & Retrospective` must be kept up to date as work proceeds.

This document is maintained in accordance with `PLANS.md` at the repository root.

## Purpose / Big Picture

This change improves the mobile first impression so it matches the premium desktop feel. After this update, the first mobile viewport shows only the hero content, CTA buttons keep stable proportions instead of inflating, the hamburger trigger is visually clean (no circular shell), and the menu opens with a top-down animated full-screen overlay similar to the Camilla reference.

## Progress

- [x] (2026-02-28 20:25Z) Re-verified mobile issues in `src/styles/global.css` and `src/components/Nav.astro` (hero section bleed, CTA width inflation, circular hamburger shell, card-style overlay).
- [x] (2026-02-28 20:33Z) Refactored `src/styles/global.css` to enforce centered mobile hero viewport rhythm and intrinsic two-column CTA sizing.
- [x] (2026-02-28 20:37Z) Refactored mobile nav visuals and motion in `src/styles/global.css` and `src/components/Nav.astro` for full-screen top-down overlay behavior.
- [x] (2026-02-28 20:42Z) Updated docs (`README.md`, `.codex/AGENTS.md`) with the new mobile UX contract.
- [x] (2026-02-28 20:48Z) Ran build validation and confirmed successful output.

## Surprises & Discoveries

- Observation: The old overlay structure could already close/open correctly, so only animation state orchestration was required in JS.
  Evidence: Existing `setOpen()` logic in `src/components/Nav.astro` already handled click-outside, ESC, link click, and resize close.

- Observation: CTA inflation came from layout model, not button style.
  Evidence: `display:flex` with wrapping and width-driven values in mobile media rules caused perceived scaling with viewport width.

## Decision Log

- Decision: Keep CTA buttons in two columns on all phone widths, including narrow devices.
  Rationale: User explicitly preferred desktop-like two-column CTA logic rather than stacking.
  Date/Author: 2026-02-28 / Codex

- Decision: Use a full-screen top-down overlay (not a card dialog) for mobile menu.
  Rationale: Better visual parity with the Camilla-inspired interaction model and cleaner hierarchy on small screens.
  Date/Author: 2026-02-28 / Codex

- Decision: Keep hero scroll cue in normal hero flow, not hard-anchored to the bottom.
  Rationale: User prioritized first-screen containment and centered composition over strict cue-bottom positioning.
  Date/Author: 2026-02-28 / Codex

## Outcomes & Retrospective

The mobile hero now keeps centered first-screen composition, CTA sizing is stable and intrinsic, and the hamburger/menu interaction feels cleaner and more premium. No route or content changes were required. Desktop behavior remains intact. The change resolved the mobile proportion and overlay concerns while staying inside the dark-only one-page architecture.

## Context and Orientation

Mobile top navigation is implemented in `src/components/Nav.astro`. Global responsive layout and visual system live in `src/styles/global.css`. The home hero and section structure are rendered in `src/pages/index.astro`. Documentation of current behavior is tracked in `README.md` and `.codex/AGENTS.md`.

## Plan of Work

The work focused on the mobile CSS and nav runtime only. First, mobile hero rules were adjusted so the hero occupies a soft viewport height and remains centered, preventing the Experience section from appearing in the first viewport. Next, CTA layout switched to intrinsic grid sizing with fixed clamp widths to eliminate width-driven inflation while preserving a two-column row. Then the hamburger visual shell was removed and the overlay model was converted from a card dialog to a full-screen panel with top-down animated entry and staggered link reveal. Finally, docs were updated and a build run verified no regressions in generation.

## Concrete Steps

From repository root:

1. Update `src/styles/global.css` mobile hero and CTA media-query rules (`@media (max-width: 760px)` and `@media (max-width: 520px)`).
2. Update `src/styles/global.css` mobile nav classes (`.mobile-menu-toggle`, `.mobile-nav-overlay`, `.mobile-nav-dialog`, `.mobile-nav-links`, `.mobile-nav-link`).
3. Update `src/components/Nav.astro` mobile nav JS:
   - add open/close transition orchestration (`is-visible` class with hidden handoff),
   - keep close triggers (link click, backdrop click, ESC, resize).
4. Update docs:
   - `README.md` section behavior bullets,
   - `.codex/AGENTS.md` context summary + executed plan list.
5. Validate:
   - run `npm run build`.

Expected build output includes successful Astro page generation with no route errors.

## Validation and Acceptance

Run in repo root:

    npm run build

Manual checks in `npm run dev`:

- On mobile widths (`320x568`, `360x800`, `390x844`, `430x932`), first viewport shows only hero content and not Experience cards.
- `View my work` and `Get in touch` stay in a stable two-column row and do not inflate while resizing.
- Hamburger has no circular shell and remains touch-accessible.
- Opening menu animates down from the top as a full-screen overlay and reveals links with stagger.
- Desktop nav and section behavior remain unchanged.

## Idempotence and Recovery

All edits are presentation/runtime changes and safe to reapply. If overlay animation tuning causes issues, rollback is isolated to `src/components/Nav.astro` and the mobile nav classes in `src/styles/global.css`. No data migration or route mutation is involved.

## Artifacts and Notes

Primary edited files:

- `src/components/Nav.astro`
- `src/styles/global.css`
- `README.md`
- `.codex/AGENTS.md`

## Interfaces and Dependencies

No new dependencies were added. The implementation uses Astro component markup, native CSS transitions, and existing vanilla JS event wiring.

Plan update note: this plan was added because the previous mobile pass still produced centered-hero and overlay interaction issues on real phone viewports; scope was narrowed to hero/CTA/nav overlay refinements only.
