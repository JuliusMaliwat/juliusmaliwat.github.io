# Feature Implementation Plan

**Overall Progress:** `95%`

## TLDR
Build a clean, minimal personal website with Astro on GitHub Pages to showcase experience, education, projects, and contact info, inspired by a modern dark aesthetic.

## Critical Decisions
- Decision 1: **Astro + GitHub Pages (Actions deploy)** - modern UX with static performance and easy hosting.
- Decision 2: **English-only initially** - keep scope focused; Italian can be added later.

## Tasks:

- [ ] 🟩 **Step 1: Bootstrap Astro scaffold**
  - [ ] 🟩 Initialize Astro project in repo root
  - [ ] 🟩 Install dependencies and verify dev server runs (run manually: `npm run dev`)

- [ ] 🟩 **Step 2: Define content structure**
  - [ ] 🟩 Create content collections for profile, experience, education, projects
  - [ ] 🟩 Add single project entry (Chrome extension)

- [ ] 🟩 **Step 3: Build core pages**
  - [ ] 🟩 Home/About sectioned layout (no CTA)
  - [ ] 🟩 Experience section
  - [ ] 🟩 Education section (incl. thesis + university projects)
  - [ ] 🟩 Projects page + landing page template
  - [ ] 🟩 Contact section with email + social links

- [ ] 🟩 **Step 4: Visual design pass**
  - [ ] 🟩 Apply minimal/clean dark theme inspired by reference
  - [ ] 🟩 Typography, spacing, and grid styling
  - [ ] 🟩 Add subtle UX touches (hover, transitions)

- [ ] 🟩 **Step 5: SEO + analytics**
  - [ ] 🟩 Add metadata (title, description, OG)
  - [ ] 🟩 Add lightweight analytics script

- [ ] 🟨 **Step 6: GitHub Pages deploy**
  - [ ] 🟩 Add GitHub Actions workflow for Astro build
  - [ ] 🟥 Verify Pages build output and base URL settings
