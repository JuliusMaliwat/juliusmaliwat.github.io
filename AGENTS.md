# Repository Guidelines

## Context Summary
This repo is a personal website built with Astro and deployed to GitHub Pages via GitHub Actions. The current navigation is Home, About Me, Projects, Library. Home is intentionally minimal and only includes two actions: “Get in touch” (mailto) and “Download CV” (served from `public/cv.pdf`). The About Me page merges Experience and Education into a single CV-style page. Older Experience/Education/Contact routes now redirect to `/about/`.

## Executed Plans (chronological)
1. `docs/IMPLEMENTATION_PLAN.md` — Initial site scaffold, content collections, core pages, styles, and deploy workflow (plan notes final validation).
2. `docs/EXECPLAN-SECTION-RESTRUCTURE.md` — Section restructure: Home CTA-only, About Me merges Experience + Education, Library added, redirects for old routes (implemented; validation step remains).
3. `docs/EXECPLAN-FIXED-CONTACT-ICONS.md` — Replace footer contact card with fixed bottom icon bar (implementation complete; validation pending).

## Plan Authoring & Execution Rules
When the user asks to “build a plan,” create the plan using the template and rules in `PLANS.md` at the repo root. Keep the plan self-contained and follow the formatting constraints in that file exactly.

When executing a plan, always update documentation that reflects the new state:
- `README.md` if user-facing behavior or setup changes.
- `AGENTS.md` executed plan list (add the new plan in chronological order).
- Any plan file’s “Progress/Decision Log/Outcomes” sections as required by `PLANS.md`.
- Other docs if they become inaccurate (for example `docs/` specs or setup notes).

## Project Structure & Module Organization
This is an Astro static site. Source lives under `src/`, with routes in `src/pages/` (Home in `index.astro`, About Me in `about/index.astro`, Projects in `projects/`, Library in `library/`), UI building blocks in `src/components/` (PascalCase filenames), layouts in `src/layouts/`, site data in `src/content/` (profile, experience, education, projects), shared constants in `src/consts.ts`, and global styles in `src/styles/`. Static files in `public/` (for example `cv.pdf`) are copied to the site root on build. Planning notes live in `docs/`.

## Build, Test, and Development Commands
- `npm install` installs dependencies.
- `npm run dev` starts the local dev server with hot reload.
- `npm run build` generates a production build in `dist/`.
- `npm run preview` serves the production build locally for verification.
- `npm run astro` runs the Astro CLI for one-off tasks.

## Coding Style & Naming Conventions
Use 2-space indentation, matching existing `.astro`, `.ts`, and `.css` files. Prefer double quotes for strings. Components in `src/components/` use PascalCase names (for example `Nav.astro`). Pages in `src/pages/` are lowercase to match routes. Use kebab-case for CSS class names (for example `hero-title`).

## Testing Guidelines
No automated test framework is configured yet. If you add tests, document the runner in `package.json` and keep tests near their source (for example `src/**/__tests__/`) or under a top-level `tests/` directory.

## Commit & Pull Request Guidelines
Current history uses short, imperative commit messages (for example `init`, `pipe`). Keep commits small and focused. For pull requests, include a clear summary of changes, link related issues when applicable, and add screenshots for any visual changes.

## Security & Configuration Tips
Environment variables are optional and listed in `.env.example` (for example `PUBLIC_PLAUSIBLE_DOMAIN`). Only variables prefixed with `PUBLIC_` are exposed to the browser by Astro. Do not commit secrets.
