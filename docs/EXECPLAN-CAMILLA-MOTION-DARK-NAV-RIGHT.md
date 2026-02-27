# Camilla-Like Premium Motion (All Sections) + Dark-Only + Right-Aligned Nav + Hover Underline Motion

This ExecPlan is a living document. The sections `Progress`, `Surprises & Discoveries`, `Decision Log`, and `Outcomes & Retrospective` must be kept up to date as work proceeds.

This plan is saved as `docs/EXECPLAN-CAMILLA-MOTION-DARK-NAV-RIGHT.md` and maintained in accordance with `PLANS.md` at the repository root.

## Summary

This pass aligns the site with the requested premium behavior:

- dark mode fixed globally (toggle removed)
- nav text-only, links aligned right of brand
- delayed premium entrance across all major sections
- robust active section detection (Experience included)
- animated underline motion on nav hover
- extension eyebrow renamed to `Chrome extension`
- soft full-screen pacing for `Experience`, `Skills`, `Projects`

## Progress

- [x] (2026-02-27 18:25Z) Re-verified nav/theme/motion/current layout in `Nav.astro`, `BaseLayout.astro`, `motion.js`, `index.astro`, `global.css`, `projects/[slug].astro`.
- [x] (2026-02-27 18:30Z) Locked direction: no icons, dark-only, right-aligned nav, one-time delayed reveal.
- [x] (2026-02-27 18:34Z) Extended motion scope to all major sections.
- [x] (2026-02-27 18:37Z) Added requirement: nav underline animates on hover for every nav item.
- [x] (2026-02-27 19:05Z) Implemented dark-only runtime and removed toggle UI/script wiring.
- [x] (2026-02-27 19:10Z) Implemented right-aligned text-only nav.
- [x] (2026-02-27 19:16Z) Implemented staged delayed entrance across hero, experience, skills, projects.
- [x] (2026-02-27 19:21Z) Replaced active-section logic with focus-line resolver.
- [x] (2026-02-27 19:24Z) Applied soft full-screen section pacing and updated extension eyebrow copy.
- [x] (2026-02-27 19:28Z) Synced docs (`README.md` and `.codex/AGENTS.md`) with dark-only/nav/motion behavior.
- [x] (2026-02-27 19:31Z) Validated production build with `npm run build`.
- [ ] Run full manual UX checklist in browser (hover/active transitions and section pacing).

## Surprises & Discoveries

- Observation: existing files contained mojibake glyphs for arrows/separators in `index.astro`; replacing section markup directly removed these artifacts while applying stagger/pacing updates.
- Observation: intersection-ratio active detection was brittle around `#experience`; focus-line resolution is more stable for this layout.

## Decision Log

- Decision: Keep nav labels text-only (no icons).
  Rationale: explicit visual feedback from user.
  Date/Author: 2026-02-27 / Codex

- Decision: Keep project detail header in brand-only mode (`Julius.`).
  Rationale: previously confirmed UX direction; unaffected by this pass.
  Date/Author: 2026-02-27 / Codex

- Decision: Use soft full-screen pacing (`min-height`) instead of hard viewport lock.
  Rationale: preserves readability for long CV content while maintaining premium cadence.
  Date/Author: 2026-02-27 / Codex

## Outcomes & Retrospective

Implementation completed for theme locking, nav structure, hover underline motion, staged reveal, active-section logic, and section pacing. `npm run build` passes successfully. Remaining item: full manual UX checklist in browser across breakpoints.
