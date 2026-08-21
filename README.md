# juliusmaliwat.github.io

Personal website built with Astro and deployed on GitHub Pages.

## Sections
- Home (single-page hub with centered hero and anchor navigation)
- Home nav is text-only, right-aligned (`Experience`, `Education`, `Skills`)
- Mobile nav switches to a Camilla-style 3-line menu with full-screen top-down overlay motion
- Mobile hero stays centered and keeps first viewport focused on Home content only
- Mobile CTAs keep intrinsic two-column sizing across phone widths (no inflation)
- Mobile hamburger uses a clean line icon with no circular shell
- Experience (flat list, one role per line, tag row for stack, Certifications block)
- Education (flat list, one degree per line, tag row for grade/thesis/projects link)
- Skills (typography-first, grouped by category)
- Footer/connect: email, GitHub, LinkedIn, CV links
- Dark-only theme runtime

## Stack
- Astro (static site generator)
- GitHub Pages (via GitHub Actions)
- Native CSS + lightweight vanilla JS motion (no animation libraries)

## Local development
```bash
npm install
npm run dev
```

## Content editing
Content lives in `src/content/`:
- `profile/` for name, headline, location, links, and bio
- `skills/` for categorized skills
- `projects/` kept for a future Projects section; not currently rendered on any page

Experience and Education copy is hardcoded directly in `src/components/Experience.astro` and `src/components/Education.astro` (no content collection backs these sections).

Social links used in the footer are defined in `src/content/profile/index.md`.

## Analytics (optional)
If you want lightweight analytics, set:
```
PUBLIC_PLAUSIBLE_DOMAIN=your-domain.com
```
Then run:
```
npm run dev
```

## Deployment
Deployment is handled by GitHub Actions once the workflow is added in `.github/workflows/`.
