# Sanjeev Kumar — Portfolio

**Live site:** https://knockknock10.github.io/Portfolio/

This is my personal portfolio. I use it to keep a few projects, research work, open-source contributions and contact details in one place.

## What's on the site

- **Projects:** Aevor, CommitHub, Wandera, NovaFest and ConvergenceGuard.
- **Research:** SemBind-Audio and SonicMap RQ1. The research section links to the work and explains what has been tested, what did not work and what is still being worked on.
- **Open source:** Links to contributions in the projects I've worked with.
- **Problem solving:** Coding profiles and saved statistics. Numbers are shown with the date they were recorded.
- **About and contact:** Education, background, résumé and ways to reach me.

## Built with

Next.js 15, React 19, TypeScript, CSS, Framer Motion and Lenis. The site is exported as a static site and hosted on GitHub Pages; it does not need a Node.js server at runtime.

## Run it locally

You need Node.js 22 or newer and npm.

```bash
git clone https://github.com/knockknock10/Portfolio.git
cd Portfolio
npm ci
npm run dev
```

Open http://localhost:3000.

## Check the GitHub Pages build

```bash
npm ci
npm run lint
npx tsc --noEmit
npm run build:pages
```

The static files are written to `out/`. The Pages workflow also checks the generated routes and the `/Portfolio/` asset paths before deployment.

## Publishing

The workflow in `.github/workflows/deploy-pages.yml` handles the site deployment.

1. Open a pull request against `main`. It runs linting, TypeScript checks, the static build and route checks.
2. Merge the pull request into `main`.
3. Check the Actions tab and make sure the `Deploy portfolio to GitHub Pages` run finishes successfully.

The site is hosted under `/Portfolio/`, so keep that base path when changing asset or route handling. Don't add a second workflow that publishes the same site.

## Updating the content

The profile and contact details are kept in `lib/portfolio-data.ts`. The selected project cards are in `components/site/Work.tsx`, and the research section is in `components/site/Research.tsx`. The research and experience records, along with saved GitHub and LeetCode data, are in `PORTFOLIO-DATA.md`. When updating coding-profile numbers, keep the date of the saved snapshot with them.

Only put files in `public/` that are meant to be publicly accessible. Don't commit API keys, tokens or private documents.

## Repository layout

- `app/` — page routes, layout and styles.
- `components/site/` — the sections and components used by the site.
- `lib/` — portfolio content and data helpers.
- `public/` — images, paper and résumé files.
- `.github/workflows/` — checks and GitHub Pages deployment.
- `_archive/` — older files kept for reference.

## Profiles

- [GitHub](https://github.com/knockknock10)
- [LeetCode](https://leetcode.com/u/knockknock10/)
- [LinkedIn](https://www.linkedin.com/in/sanjeev-kumar-ba567133a/)
