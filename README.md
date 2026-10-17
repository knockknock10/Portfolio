# Sanjeev Kumar — Portfolio

[![Portfolio CI](https://github.com/knockknock10/Portfolio/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/knockknock10/Portfolio/actions/workflows/ci.yml)
[![Deploy to GitHub Pages](https://github.com/knockknock10/Portfolio/actions/workflows/deploy-pages.yml/badge.svg?branch=main)](https://github.com/knockknock10/Portfolio/actions/workflows/deploy-pages.yml)

> Software engineering · Open source · Applied audio AI · Research

**Live site: [knockknock10.github.io/Portfolio](https://knockknock10.github.io/Portfolio/)**

A responsive, motion-led portfolio for my software engineering projects, upstream open-source contributions, SemBind-Audio research, technical skills, coding profiles, experience, and contact links.

![Portfolio preview](public/images/hero-scene.webp)

## What you'll find

- **Selected work** — projects, technology choices, and links to repositories or live demos.
- **Research** — SemBind-Audio methodology, paper resources, figures, and evidence.
- **Open source** — public contribution history, selected upstream pull requests, and GitHub achievements.
- **Skills and experience** — a structured view of technologies and research/project work.
- **Coding profiles** — links to LeetCode, Codeforces, NeetCode, HackerRank, and GeeksforGeeks.
- **Certificates** — a gallery that supports image and PDF files from `public/certificates/`.
- **Contact** — email and verified public profiles.

## Tech stack

Next.js 15 · React 19 · JavaScript/TypeScript · CSS Modules · Tailwind CSS 4 · Framer Motion · Lenis · GitHub Actions

## Run locally

Requirements: Node.js 22 and npm.

```bash
git clone https://github.com/knockknock10/Portfolio.git
cd Portfolio
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Check the project before submitting changes:

```bash
npm run lint
npx tsc --noEmit
npm run build
```

## GitHub Pages deployment

The `Deploy to GitHub Pages` workflow builds a static Next.js export for the repository path `/Portfolio` and publishes it when a commit reaches `main`.

- Site URL: [https://knockknock10.github.io/Portfolio/](https://knockknock10.github.io/Portfolio/)
- Build command: `npm run build:pages`
- Static output: `out/`
- Contribution history is generated as a build-time static JSON file. GitHub Pages does not run a Node.js API server.
- The first deployment requires **Settings → Pages → Build and deployment → Source: GitHub Actions**.

## Add certificates

Place your authentic certificate scans or exported PDFs in `public/certificates/`. Use clear file names (for example, `aws-cloud-practitioner.pdf` or `hackerrank-java-basic.png`). The gallery discovers supported files on the next deployment. Add issuer, date, credential ID, skills, and verification URL to `PORTFOLIO-DATA.md` when known.

Files under `public/` are publicly accessible. Only add material you intend to publish.

## Repository structure

- `app/` — routes, layout, styles, and statically exported contribution data.
- `components/` — portfolio sections and interactive UI.
- `lib/` — portfolio data readers and shared utilities.
- `public/` — static images, PDF résumé, and certificate uploads.
- `.github/workflows/` — CI and GitHub Pages deployment.

## Links

- [GitHub profile](https://github.com/knockknock10)
- [LeetCode](https://leetcode.com/u/knockknock10/)
- [Codeforces](https://codeforces.com/profile/knockknock10)
- [NeetCode](https://neetcode.io/user/DigitalTrill950)
- [HackerRank](https://www.hackerrank.com/profile/knockknock10)
- [GeeksforGeeks](https://www.geeksforgeeks.org/profile/karthikjaihh0z)

---

Built and maintained by Sanjeev Kumar. Facts that change over time (such as platform metrics and pull-request status) should be read from the linked public profiles and repositories.
