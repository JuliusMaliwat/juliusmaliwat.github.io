# Populate real content + accordion CV sections + simplified Home

**Overall Progress:** `100%`

This ExecPlan is a living document. The sections `Progress`, `Surprises & Discoveries`, `Decision Log`, and `Outcomes & Retrospective` must be kept up to date as work proceeds.

This plan must be saved as `docs/EXECPLAN-CONTENT-CV-ACCORDIONS.md` and maintained in accordance with `PLANS.md` at the repository root.

## Summary

We will replace placeholder content with real CV data, simplify the Home layout to match the provided example, add a home icon in the nav (replacing the Home label), and rework the About page so Experience/Education become expandable timeline-style entries (accordion). Projects will be left empty with a “coming soon” state. The CV PDF will replace `public/cv.pdf` and be used as the download source.

## Important changes or additions to public APIs/interfaces/types

We will update the profile content schema and/or usage to support the new Home layout text. Specifically:

- `src/content/profile/index.md` will be updated with:
  - `headline`: “Data Engineer @ Quantyca”
  - `bioShort`: “MSc Data Science @ University of Bicocca”
  - Optional new field `homeGreeting` (if needed) to render “hello, i’m julius :)”
- `src/content/config.ts` will be updated only if we introduce new fields (for example `homeGreeting`) or a `draft` flag for projects.

No new external dependencies will be added.

## Explicit assumptions and defaults

- The user will provide the real CV PDF and it will replace `public/cv.pdf`.
- Home keeps both CTAs: “Get in touch” and “Download CV”.
- The Home icon replaces the “Home” label in the nav (the “JM” pill remains).
- Accordion defaults to collapsed for all entries.
- Projects page shows “Coming soon” when there are no visible projects.

## Progress

- [x] 🟩 (2026-02-04 22:00Z) Drafted ExecPlan for real content + accordions + home simplification.
- [x] 🟩 (2026-02-05 18:40Z) Replace placeholder CV PDF.
- [x] 🟩 (2026-02-05 19:05Z) Extract CV text from user-provided copy in `docs/cv-extracted.txt`.
- [x] 🟩 (2026-02-05 19:15Z) Populate Experience/Education with real CV data.
- [x] 🟩 (2026-02-05 10:15Z) Update profile content fields for new Home text.
- [x] 🟩 (2026-02-05 10:20Z) Simplify Home layout to match example.
- [x] 🟩 (2026-02-05 10:30Z) Implement accordion/timeline for Experience and Education in About.
- [x] 🟩 (2026-02-05 10:35Z) Hide projects (empty state) without removing the section.
- [x] 🟩 (2026-02-05 19:30Z) Validate locally and confirm deploy.

## Surprises & Discoveries

- Observation: Local `pdftotext` (MiKTeX runtime) failed, so extraction used a manual text copy instead.
  Evidence: `docs/cv-extracted.txt` provided by the user.

## Decision Log

- Decision: Replace “Home” label with a house icon and keep the left “JM” pill.
  Rationale: Matches the reference screenshot and avoids duplicate home cues.
  Date/Author: 2026-02-04 / Codex

- Decision: Keep both Home CTAs (Get in touch + Download CV).
  Rationale: The example shows two buttons and you confirmed keeping both.
  Date/Author: 2026-02-04 / Codex

- Decision: Use native `<details>`/`<summary>` for expand/collapse entries.
  Rationale: Accessible by default, minimal JS, easy timeline styling with CSS.
  Date/Author: 2026-02-04 / Codex

- Decision: Hide projects by marking entries as `draft` and filtering them out.
  Rationale: Keeps the Projects page present while hiding unpublished content.
  Date/Author: 2026-02-05 / Codex

- Decision: Populate CV content from manual text extraction (user-provided copy).
  Rationale: Local `pdftotext` failed, and this keeps the plan moving without new dependencies.
  Date/Author: 2026-02-05 / Codex

## Outcomes & Retrospective

Home and navigation have been simplified and the About page now uses accordions. Projects are hidden behind an empty state. The CV PDF has been replaced and real Experience/Education entries have been added. Local validation completed and deploy confirmed.

## Context and Orientation

Home page is `src/pages/index.astro`. Navigation is in `src/components/Nav.astro`. About page is `src/pages/about/index.astro`. Content lives in `src/content/` with `profile/`, `experience/`, and `education/`. The CV download file is `public/cv.pdf`. Global styles are in `src/styles/global.css`. Projects page is `src/pages/projects/index.astro`.

## Plan of Work

1. Replace the placeholder CV file with the real PDF at `public/cv.pdf`. Use it both as the download link and as the parsing source.
2. Extract the CV text and map it into `src/content/experience/*.md` and `src/content/education/*.md`. Create one file per role/degree, ordered by date.
3. Update `src/content/profile/index.md` with the new headline and education line. Add `homeGreeting` if needed, and update `src/content/config.ts` accordingly.
4. Simplify `src/pages/index.astro` to match the example: “hello, i’m julius :)” plus two lines for role and degree, with the two CTAs beneath. Remove extra labels/fields that make it feel redundant.
5. Modify `src/components/Nav.astro` to render a home icon instead of the “Home” text label, keeping the “JM” pill intact.
6. Rework `src/pages/about/index.astro` to render Experience and Education as accordions with timeline styling. Each summary should include role/degree, institution/company, and date range. The expanded content should show achievements/highlights and details from the CV.
7. Update `src/styles/global.css` with accordion and timeline styles.
8. Update `src/pages/projects/index.astro` to show an empty-state message when there are no visible projects. Optionally add a `draft: true` flag in project entries and filter them out.
9. Update `README.md` and `AGENTS.md` to reflect this plan execution and the new content rules.

## Concrete Steps

From repo root:

- Replace `public/cv.pdf` with the real CV.
- Extract CV text. Preferred method:

    python - <<'PY'
    from pathlib import Path
    import sys
    try:
        from pypdf import PdfReader
    except Exception:
        print("pypdf not available. Install with: python -m pip install pypdf")
        sys.exit(1)

    reader = PdfReader("public/cv.pdf")
    text = "\n".join(page.extract_text() or "" for page in reader.pages)
    Path("docs/cv-extracted.txt").write_text(text, encoding="utf-8")
    print("Wrote docs/cv-extracted.txt")
    PY

  If extraction fails, manually copy the CV content into `docs/cv-extracted.txt` for reference.

- Populate experience and education content files from the extracted text.
- Update Home and About templates and CSS as described.

## Test cases and scenarios

- Home renders:
  - “hello, i’m julius :)”
  - “Data Engineer @ Quantyca”
  - “MSc Data Science @ University of Bicocca”
  - CTA buttons: Get in touch (mailto) + Download CV (public/cv.pdf)
- About page:
  - Experience entries are collapsed by default and expand on click
  - Education entries are collapsed by default and expand on click
  - Timeline styling is visible
- Projects page shows “Coming soon” with no project cards

## Validation and Acceptance

- Navigate Home/About/Projects/Library; Home matches the simple reference layout.
- Accordion behavior works for Experience/Education.
- CV download link opens the real `public/cv.pdf`.
- Projects list is empty with a clear placeholder message.
- No layout overlap with the fixed contact icon bar.

## Idempotence and Recovery

All edits are safe to re-run. If needed, restore prior content files and page templates from git history. Replacing `public/cv.pdf` can be done multiple times without side effects.

## Artifacts and Notes

- `docs/cv-extracted.txt` may be kept temporarily to validate parsing and then removed.

## Interfaces and Dependencies

No new dependencies. If `pypdf` is not installed, install it locally or manually provide the extracted CV text. Use native `<details>` and `<summary>` for expand/collapse behavior.

Plan update note: Created initial ExecPlan for real CV content, simplified Home, home icon nav change, accordion timeline experience/education, and empty Projects state.
