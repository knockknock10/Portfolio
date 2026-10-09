# Repository Audit

## Scope

- Repository: `knockknock10/Portfolio`
- Branch: `main`
- Commit inspected: `41fa20ccb4d34b8c5e044a471f9645d28876c8be` (9 October 2026)
- Repository files examined: 88 files, including project data, components, pages, styling, public assets, package and lock files, CI, environment example, hosting configuration, README, and résumé PDF.
- This is a report on the linked GitHub snapshot. It cannot reflect uncommitted changes in a separate local working tree.

## Executive findings

The production build and lint command both pass on the inspected snapshot. The stack is current and already supports a multi-route portfolio with static output plus a small server-side GitHub data endpoint. A framework migration is not warranted by the build results.

The major blocker is content scope: the repository currently describes a software-engineering portfolio, not a manga/manhwa/manhua artist portfolio. The repo contains no art samples, no artist bio, no pen name, and no artist-platform links. The only image asset is the favicon. Do not invent artist content or reuse the software case-study copy as art descriptions.

## Current tech stack

| Area | Verified value | Evidence |
|---|---|---|
| UI framework | React `^19.3.0` | `package.json` |
| Build tool | Vite `^8.3.4` | `package.json`, build output |
| Styling | Tailwind CSS `^4.3.3` through `@tailwindcss/vite`, plus `src/styles/index.css` tokens and utilities | `package.json`, `vite.config.js`, CSS |
| Routing | React Router DOM `^7.18.4`, `BrowserRouter` | `package.json`, `src/App.jsx` |
| Language | JavaScript / JSX, ES modules | Source files, `package.json` |
| Package manager | npm; `package-lock.json` present; CI uses `npm ci` | Root files, CI |
| Runtime in CI | Node.js 22 | `.github/workflows/ci.yml` |
| Fonts | `@fontsource-variable/inter`, `@fontsource-variable/jetbrains-mono` | `package.json`, `src/main.jsx` |
| Linting | ESLint `^10.12.0`, React Hooks and React Refresh plugins | `eslint.config.js`, `package.json` |
| Server-side data | Shared Node handler for GitHub requests; server-only token configuration | `server/github/`, `api/github.js`, `shared/github-config.js` |
| Vercel config | `vercel.json`; build output `dist`; SPA rewrite and `/api` handler convention | `vercel.json`, `api/github.js` |
| Netlify config | `netlify.toml`; publish `dist`; `netlify/functions/github.js`; API and SPA rewrites | `netlify.toml` |
| CI | GitHub Actions workflow runs lint and production build on `main`, `feat/portfolio-rebuild`, and PRs to `main` | `.github/workflows/ci.yml` |

### Build and lint status

Ran in an isolated, disposable copy of the linked `main` snapshot; no application files were changed on GitHub.

1. `npm ci` — **PASS**; dependencies installed successfully. The install summary reported 0 vulnerabilities.
2. `npm run build` — **PASS**; Vite 8.3.4 transformed 89 modules and produced `dist/`.
3. `npm run lint` — **PASS**; ESLint exited successfully with no reported errors or warnings.

Build output reported approximately 52.99 kB CSS (12.01 kB gzip) and 397.32 kB JavaScript (118.41 kB gzip). `package.json` does not define a test script, so no project test suite was run.

ESLint explicitly ignores `server/` and `api/`; the successful lint result therefore does not mean those handler files are covered by ESLint.

## Reusable material

### Reusable after content approval

- App entry point, route configuration, root layout, and existing page-routing patterns.
- General layout primitives and section components under `src/components/`.
- The global CSS token organization in `src/styles/index.css`, subject to a later design audit.
- Locally packaged Inter and JetBrains Mono fonts, if their look fits the approved art direction.
- Vite/Tailwind setup, npm lockfile, build command, and hosting fallback configuration.
- Current project data format as a structural example only; its descriptions are not artist content.

### Not suitable as artist portfolio content

- `src/data/profile.js` identity, bio, availability, and contact copy.
- The Aevor, CommitHub, and SemBind-Audio case-study copy in `src/data/projects/`.
- The GitHub contribution, organization, pull-request, issue, and LeetCode UI in `src/components/github/`, `src/components/opensource/`, and `src/components/leetcode/`.
- Developer-oriented sections and routes under `src/sections/` and `src/pages/` that exist only for code-hosting activity, case studies, and problem solving.
- `public/resume.pdf`, which is a developer résumé, not an artist CV.

For an artist rebuild, reuse framework and accessibility foundations where helpful; do not carry forward the developer-specific information as filler.

## Broken, unused, stale, or risky findings

### Content and assets

- **Primary scope mismatch:** source identity and all project records describe a software engineer. Artist-specific content fields are absent.
- **Artwork assets absent:** the only image-format file is `public/favicon.svg` (an `SK` favicon). No project artwork, gallery images, covers, thumbnails, or Open Graph image are present.
- **Project metadata is sparse:** project records do not define year, client, medium, or local image paths.
- **Conflicting email addresses:** `src/data/profile.js` uses `sanjeevkumar_s@srmap.edu.in`; the PDF uses `sanjeevkumars.s@srmap.edu.in`.
- **LinkedIn mismatch:** the résumé prints `linkedin.com/in/-sanjeev-kr`, while the profile config has `linkedin: null`.
- **CommitHub description mismatch:** the résumé presents it as a custom version-control system in Go; `src/data/projects/commithub.js` presents a full-stack collaboration platform. Keep these descriptions distinct until the owner verifies what each refers to.
- **Dynamic avatar sources:** `src/components/github/GitHubProfile.jsx`, `src/components/opensource/OrganizationCard.jsx`, and `src/pages/OrganizationDetailPage.jsx` render avatar values from API data. `src/components/leetcode/LeetCodeProfileCard.jsx` can render a configured avatar URL. These are not local repo assets; future art-facing pages must not rely on them under the local-assets-only rule. If no approved local image exists, render no image.
- **LeetCode numbers intentionally absent:** `src/data/leetcode.js` has `stats: null`; the UI should retain the honest missing-data state rather than introduce estimates.

### Styling and motion readiness

- Global styles use tokens for deep neutral surfaces and cobalt/violet/cyan accents. Review the palette later against the requested art direction; no visual work was performed in this phase.
- Existing transitions use plain `ease` timing in several selectors (`src/styles/index.css`, around lines 37, 58, and 77). A hero fade animation exists, and `prefers-reduced-motion` handling is already present. Recheck all motion before reusing these styles under the requested spring/overshoot-only rule.
- The CSS has a light specular gradient, not a project image. There is no artwork to use as a visual placeholder.

### Hosting, metadata, and maintenance

- Both Vercel and Netlify configuration files exist. The code supports both, but the preferred canonical host is not determined by repository content. Choose one deployment target before deployment-specific cleanup.
- `README.md` records the absence of SSR and the absence of an Open Graph preview image. Client-side route metadata is set at runtime, so crawlers that do not execute JavaScript see the base HTML metadata.
- `index.html` does not contain a canonical URL or `og:image` entry.
- No separate automated test script is configured in `package.json`.
- Static inspection did not identify a reason to remove a declared dependency before the content and route scope are settled. Do not prune dependencies only on the basis of names; verify imports and build behavior during implementation.

## Stack recommendation

**Keep React + Vite + Tailwind + React Router for now; do not migrate during this redesign.** Reasons:

1. The clean npm install, production build, and lint command all pass.
2. Existing routes, layout primitives, styling tokens, and hosting fallbacks are already available.
3. Replacing the framework would add work without solving the actual blocker, which is the mismatch between the source portfolio content and the requested artist portfolio.
4. The site appears suited to static output with limited server-side API support; the present stack already supports that architecture.

This is a provisional engineering recommendation. It should be reconsidered only if the confirmed target requires features that cannot reasonably fit the current architecture. Before later phases, the artist's real copy, links, and local images need to exist in the repository or be explicitly marked `MISSING`. For deployment, choose either Vercel or Netlify as the canonical target while retaining the other config only if it is still needed.

## Repository file inventory

All 88 files in the downloaded `main` archive were enumerated and source/configuration files were read for this audit. Paths are shown relative to the repository root.

```text
.env.example
.github/workflows/ci.yml
.gitignore
LICENSE
README.md
api/github.js
eslint.config.js
index.html
netlify/functions/github.js
netlify.toml
package-lock.json
package.json
public/favicon.svg
public/resume.pdf
public/robots.txt
server/github/cache.js
server/github/client.js
server/github/handler.js
server/github/queries.js
server/github/transformers.js
shared/github-config.js
src/App.jsx
src/components/Button.jsx
src/components/Card.jsx
src/components/Container.jsx
src/components/Footer.jsx
src/components/Navbar.jsx
src/components/PendingNote.jsx
src/components/ProjectCard.jsx
src/components/ProjectTags.jsx
src/components/Reveal.jsx
src/components/Section.jsx
src/components/SectionHeading.jsx
src/components/SectionShell.jsx
src/components/Tag.jsx
src/components/TextLink.jsx
src/components/casestudy/ArchitectureDiagram.jsx
src/components/casestudy/CaseStudyLayout.jsx
src/components/casestudy/CaseStudySection.jsx
src/components/casestudy/ProjectHero.jsx
src/components/casestudy/ProjectLinks.jsx
src/components/casestudy/ProjectMeta.jsx
src/components/casestudy/ProjectNavigation.jsx
src/components/casestudy/TechStack.jsx
src/components/github/ActivityItem.jsx
src/components/github/ContributionCalendar.jsx
src/components/github/GitHubProfile.jsx
src/components/github/RepositoryCard.jsx
src/components/leetcode/LeetCodeProfileCard.jsx
src/components/leetcode/ProblemStats.jsx
src/components/opensource/ContributionTimeline.jsx
src/components/opensource/FilterContext.jsx
src/components/opensource/FilterProvider.jsx
src/components/opensource/Filters.jsx
src/components/opensource/IssueItem.jsx
src/components/opensource/OrganizationCard.jsx
src/components/opensource/PRItem.jsx
src/components/opensource/SummaryCounts.jsx
src/components/opensource/useFilters.jsx
src/data/leetcode.js
src/data/profile.js
src/data/projects/aevor.js
src/data/projects/commithub.js
src/data/projects/index.js
src/data/projects/sembind-audio.js
src/hooks/useGithub.js
src/hooks/useOpenSource.js
src/hooks/usePageMeta.js
src/layouts/Layout.jsx
src/lib/github.js
src/main.jsx
src/pages/CaseStudyPage.jsx
src/pages/HomePage.jsx
src/pages/NotFound.jsx
src/pages/OpenSourcePage.jsx
src/pages/OrganizationDetailPage.jsx
src/pages/ProblemSolvingPage.jsx
src/sections/AboutSection.jsx
src/sections/ContactSection.jsx
src/sections/Hero.jsx
src/sections/OpenSourceSection.jsx
src/sections/ProblemSolvingSection.jsx
src/sections/ProofSection.jsx
src/sections/ResearchSection.jsx
src/sections/SelectedWorkSection.jsx
src/styles/index.css
vercel.json
vite.config.js
```

## Phase 0 boundary

No application source, page, component, configuration, asset, or dependency file was modified. No file was deleted. No commit was created. These reports are delivered as separate files because this execution environment cannot write into the user's local working tree; copy them to the repository root if that is the intended location. The GitHub branch itself remains unchanged by this audit.
