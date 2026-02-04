# juliusmaliwat.github.io

Personal website built with Astro and deployed on GitHub Pages.

## Sections
- Home (CTA-only: email + CV download)
- About Me (combined Experience + Education)
- Projects
- Library

## Stack
- Astro (static site generator)
- GitHub Pages (via GitHub Actions)

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
- `projects/` for project landing pages

The Home CTAs link to email and `public/cv.pdf`. Replace `public/cv.pdf` with the real CV when ready.

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
