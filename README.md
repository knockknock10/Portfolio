# Sanjeev Kumar — Portfolio

Personal developer portfolio. Dark-first editorial design, built for clarity and evidence over adjectives.

**Stack:** React 19 · Vite · Tailwind CSS v4 · Inter + JetBrains Mono (self-hosted)

## Commands

```bash
npm install
npm run dev       # dev server
npm run build     # production build
npm run preview   # serve the production build
npm run lint      # eslint
```

## Structure

```
src/
  components/   # reusable primitives: Button, Card, Tag, SectionShell, Navbar, Footer…
  sections/     # one file per homepage section (Hero, SelectedWork, About…)
  layouts/      # page shell (skip link + navbar + footer)
  data/         # single source of truth: profile.js (identity/links/copy), projects.js
  styles/       # design tokens (@theme) + base + motion
```

## Editing content

- Identity, links (GitHub / LinkedIn / Email / Resume), nav and section copy → `src/data/profile.js`
- Project names, summaries, tech tags → `src/data/projects.js`
- Design tokens (colors, fonts) → `src/styles/index.css` (`@theme`)

LinkedIn is intentionally disabled until a real URL is set in `profile.js` — no placeholder hrefs anywhere.

## Phase status

Phase 1 foundation complete: design system, navbar, hero, section shells, footer, responsive + a11y baseline.

Later phases add: case studies, GitHub/LeetCode data integrations, open-source contribution details, research write-up.
