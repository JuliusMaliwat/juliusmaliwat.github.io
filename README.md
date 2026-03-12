# juliusmaliwat.github.io

Personal website built with Astro and deployed on GitHub Pages.

## Sections
- Home (single-page hub with centered hero, anchor navigation, and scroll-to-explore flow)
- Home nav is text-only and right-aligned (`Experience`, `Skills`, `Projects`)
- Mobile nav switches to a Camilla-style 3-line menu with full-screen top-down overlay motion
- Home nav active state follows section visibility (no preselected tab in hero state)
- Home nav underline animates on hover/focus and remains persistent on the active section
- Mobile hero stays centered and keeps first viewport focused on Home content only
- Mobile CTAs keep intrinsic two-column sizing across phone widths (no inflation)
- Mobile hamburger uses a clean line icon with no circular shell
- Experience + Education (paired two-column expandable timelines)
- Skills (premium icon strip treatment)
- Certifications embedded in Skills
- Projects section on Home
- Dedicated project detail pages with brand-only header (`Julius.` back to Home)
- Dedicated MSc dashboard project: `/projects/what-did-it-take-msc/`
  - Includes custom-tooltip monthly chart, `Ideal week` heatmap (07:00-22:00), and yearly daily heatmaps (2023/2024/2025)
- Library (minimal placeholder)
- Footer contact links + `Download CV`
- Dark-only theme runtime and staged reveal motion system

Legacy routes redirect to Home anchors:
- `/about/` -> `/`
- `/experience/` -> `/#experience`
- `/education/` -> `/#education`
- `/contact/` -> `/#contact`
- `/projects/` -> `/#projects`

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
- `experience/` for professional roles
- `education/` for university studies, thesis, and projects
- `certifications/` for credential listings
- `skills/` for categorized skill icons
- `interests/` for archived hobbies/interests content (not rendered in current Home)
- `projects/` for project landing pages

`Projects` supports detail routes per project slug, for example:
`/projects/why-am-i-here-extension/`

The MSc dashboard route:
`/projects/what-did-it-take-msc/`

It is backed by build-time data generated from Forest CSV with:
- `Tag=Studio`
- `Is Success=true`
- date range `Sep 2023` to `Oct 2025`

Regenerate dashboard data locally before deploy when CSV changes:

```bash
npm run build:msc-dashboard-data
```

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
