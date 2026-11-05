# Thiago Gomes · Portfolio

**[View the portfolio](https://thiago-a-gomes.github.io/)**

A personal portfolio featuring selected projects, a public repository catalog, professional experience, education, and contact information. Built with **React 19, TypeScript, Vite, and Tailwind CSS**.

## Core features

- Dark theme by default, with a light-theme toggle and a saved browser preference.
- A graphite, lime, and purple visual identity with an original illustration, subtle motion, and a pause control.
- A project gallery with category filters and technical details in accessible dialogs.
- Reduced-motion support, keyboard navigation, and focus restoration.
- A searchable, sortable public repository catalog with language filters.
- Expandable experience and education sections, contact links, and an email-copy button.
- Pre-rendered HTML makes content and project links available before JavaScript runs.

## Getting started

Requires Node.js **22.19 or later in the 22.x line** and npm.

```sh
npm ci
npm run dev
```

To build and preview the production version:

```sh
npm run build
npm run preview
```

## Tests

```sh
npx playwright install chromium
npm run test:e2e -- --workers=1
npm run test:report
```

To use an existing Chrome installation on Windows, set `$env:PLAYWRIGHT_CHANNEL = 'chrome'` before running the tests. The suite covers filters, search, sorting, project details, dialogs, focus, email copying, reduced motion, hydration errors, images, and responsive layouts from 320 to 1440 pixels. Each test uses an isolated context. Playwright generates local HTML reports and failure traces; existing results are in [reports](reports).

The **74 tests mentioned on the Kurio card belong to Kurio**; this portfolio has a separate suite.

## Project structure

```text
app/
  index.html              Entry template
  src/
    App.tsx               Page composition
    components/           Scene, cards, dialog, and repository catalog
    data/                 Projects and public GitHub snapshot
    styles.css            Tokens, components, and responsive styles
scripts/
  prerender.mjs           Static HTML generated from the React application
  export-pages.mjs        Export to the existing deployment
  sync-repositories.mjs   Update the public repository catalog
tests/                    Playwright tests
img/                      Original images used by the build
assets/                   Generated deployment assets
index.html                Generated HTML for GitHub Pages
```

Edit the template in `app/index.html` and components in `app/src`. The root `index.html` is generated and should not be edited manually.

## Projects and data

Featured projects are described in `app/src/data/projects.ts`, with the scope of each demo, case study, and production application identified. The repository catalog is a snapshot of public repositories; it does not require a token or GitHub requests during a visit.

To update it:

```sh
node scripts/sync-repositories.mjs
npm run build
```

The script uses the public GitHub API and retains the previous catalog if a request fails. Review the data before publishing. Ritmo Lab is a public demo; the repository catalog contains only public repositories.

Current education: **Software Engineering at UNINTER, in progress**. The Systems Analysis and Development degree at CEUNSP is complete.

## Deployment

GitHub Pages publishes the root of `main`. Pre-rendered HTML and assets are versioned with the source to preserve the existing address and configuration:

```sh
npm run build
npm run test:e2e -- --workers=1
npm run export:pages
git add app scripts tests package.json package-lock.json vite.config.ts tsconfig.json postcss.config.js playwright.config.ts index.html assets
git commit -m "feat: update portfolio"
git push
```

`export:pages` copies the build to `index.html` and `assets/` without deleting directories. `.nojekyll` prevents Jekyll processing. Deployment uses the existing GitHub Pages workflow.

## Scope

The portfolio uses static data and local interactions. It does not collect registrations, process payments, implement authentication, or require its own API. Project links lead to applications with their own limitations, documented in their details and repositories.
