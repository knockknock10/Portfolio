# Sanjeev Kumar — Portfolio

**Live site:** https://knockknock10.github.io/Portfolio/

A single-page portfolio covering my software projects, backend and platform engineering interests, upstream open-source contributions, speech-watermarking research, university experience, technical skills and contact details.

## What is on the site

- **Selected work:** Aevor, CommitHub, Wandera, NovaFest and other engineering projects, with links to code or live demos.
- **Research:** SemBind-Audio methodology, clean-reference evaluation results, paper and source repository. The page distinguishes submitted work from published work and describes the current robustness limitations.
- **Open source:** Source-linked upstream pull requests, grouped by project and organisation.
- **Experience:** University research and protocol/workflow work, described without inventing dates or job titles.
- **Skills and problem solving:** Technologies grouped by area and saved coding-profile statistics with their snapshot date.
- **Contact:** Email, GitHub, LinkedIn and résumé.

## Technology

Next.js 15, React 19, TypeScript, CSS, Framer Motion and Lenis. The project is exported as a static site for GitHub Pages; it does not rely on a Node.js server at runtime.

## Run locally

Requirements: Node.js 22 or newer and npm.

```bash
git clone https://github.com/knockknock10/Portfolio.git
cd Portfolio
npm ci
npm run dev
```

Open http://localhost:3000.

## Validate the GitHub Pages build locally

```bash
npm ci
npm run lint
npx tsc --noEmit
npm run build:pages
```

The static export is written to `out/`. The Pages workflow additionally checks the generated routes and the `/Portfolio/` asset paths before creating a deployment artifact.

## Publishing

The workflow at `.github/workflows/deploy-pages.yml` is the single publisher for the project site.

1. Open a pull request targeting `main`. The workflow runs lint, TypeScript checks, builds the static export and verifies all required HTML, JSON and public assets. Pull requests do not deploy.
2. Merge the pull request into `main`. A push to `main` runs the same checks and publishes the generated artifact to GitHub Pages.
3. Check the **Actions** tab for the `Deploy portfolio to GitHub Pages` run. The `Publish GitHub Pages` job must finish successfully before considering the live site updated.

The site is hosted at the repository path `/Portfolio/`, so static assets must use the `/Portfolio/` base path. Do not add a second Next.js Pages publisher or deploy a build made without `GITHUB_PAGES=true`.

## Portfolio data

`lib/portfolio-data.ts` contains curated public profile content. `PORTFOLIO-DATA.md` records supporting source snapshots for GitHub, LeetCode, projects, research and experience. Refresh changing metrics before presenting them as current.

Only add material to `public/` that is intended to be publicly accessible. Never commit access tokens, private credentials or documents that should not be public.

## Repository layout

- `app/` — page routes, layout and styles.
- `components/site/` — portfolio sections and UI.
- `lib/` — typed portfolio data and source readers.
- `public/` — static images, paper and résumé.
- `.github/workflows/` — quality checks and the GitHub Pages publisher.
- `_archive/` — retained legacy material kept for reference.

## Profiles

- GitHub: https://github.com/knockknock10
- LeetCode: https://leetcode.com/u/knockknock10/
- LinkedIn: https://www.linkedin.com/in/sanjeev-kumar-ba567133a/
