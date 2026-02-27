# juliusmaliwat.github.io

Personal website built with Astro and deployed on GitHub Pages.

## Sections
- Home (single-page hub with centered hero, anchor navigation, and scroll-to-explore flow)
- Home nav is text-only and right-aligned (`Experience`, `Skills`, `Projects`)
- Home nav active state follows section visibility (no preselected tab in hero state)
- Home nav underline animates on hover/focus and remains persistent on the active section
- Experience + Education (paired two-column expandable timelines)
- Skills (premium icon strip treatment)
- Certifications embedded in Skills
- Projects section on Home
- Dedicated project detail pages with brand-only header (`Julius.` back to Home)
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
