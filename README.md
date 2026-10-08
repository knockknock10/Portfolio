# Sanjeev Kumar — Portfolio

Personal developer portfolio focused on software engineering, backend systems, open-source work, and applied AI research.

## Overview

This portfolio is built as a small, maintainable React application with a server-side GitHub data layer. The goal is to show **evidence of work**—projects, research, open-source contributions, GitHub activity, and problem solving—rather than relying only on a skills list.

### Highlights

- Responsive dark-first portfolio UI
- Project case studies for Aevor, CommitHub, and SemBind-Audio
- GitHub profile, repositories, activity, and contribution calendar
- Open-source organization, PR, issue, and contribution timeline views
- Server-side GitHub API proxy so the GitHub token never reaches the browser
- Cached GitHub responses with stale-data fallback for transient API failures
- Accessible navigation, responsive layouts, metadata, and a printable resume

## Tech Stack

- **Frontend:** React 19, Vite, React Router, Tailwind CSS v4
- **Typography:** Inter Variable, JetBrains Mono Variable
- **Backend/API layer:** Node-compatible serverless handler + GitHub REST/GraphQL APIs
- **Tooling:** ESLint, npm
- **Deployment:** compatible with Vite static hosting plus a host that supports the `api/` serverless entry point

## Project Structure

```
.
├── api/
│   └── github.js                 # Serverless GitHub API entry point
├── public/
│   ├── favicon.svg
│   ├── resume.pdf
│   └── robots.txt
├── server/
│   └── github/
│       ├── cache.js              # TTL/in-flight response cache
│       ├── client.js             # Server-side GitHub REST/GraphQL client
│       ├── handler.js            # /api/github request router
│       ├── queries.js             # All GitHub GraphQL queries
│       └── transformers.js        # GitHub payload → UI view models
├── shared/
│   └── github-config.js          # Public GitHub configuration + repo ranking
├── src/
│   ├── components/               # Reusable UI primitives
│   ├── components/casestudy/     # Case-study components
│   ├── components/github/        # GitHub proof components
│   ├── components/opensource/    # Open-source contribution UI
│   ├── data/                     # Portfolio/project content
│   ├── hooks/                    # Data and page hooks
│   ├── layouts/                  # Application layout
│   ├── pages/                    # Route-level pages
│   ├── sections/                 # Homepage sections
│   └── styles/                   # Design tokens and global styles
├── .env.example
├── eslint.config.js
├── index.html
├── package.json
└── vite.config.js
```

## Local Development

Requirements:

- Node.js 20+ recommended
- npm

Install dependencies:

```bash
npm install
```

Start development:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

Run linting:

```bash
npm run lint
```

## GitHub Integration

The browser requests portfolio data from:

```
Browser → /api/github → server/github/handler.js → GitHub API
```

Public REST resources can work without authentication, but contribution-calendar and extended open-source GraphQL data require a server-side GitHub token.

Create a local `.env` from the example:

```bash
cp .env.example .env
```

Set:

```env
GITHUB_USERNAME=knockknock10
GITHUB_TOKEN=your_server_side_token
```

**Never** use a `VITE_` prefix for `GITHUB_TOKEN`. Vite client environment variables are exposed to the browser bundle.

The real `.env` file is ignored by Git.

## GitHub Data Design

The GitHub integration intentionally separates responsibilities:

1. `client.js` handles authenticated server-to-GitHub requests.
2. `handler.js` validates requests and selects the appropriate resource loader.
3. `queries.js` contains GraphQL operations that REST cannot provide.
4. `transformers.js` converts raw GitHub responses into stable UI models.
5. `cache.js` reduces repeated API calls and can serve the last successful value during transient failures.
6. `shared/github-config.js` controls public username and repository-display preferences.

No GitHub token is sent to React components.

## Content

Portfolio content is kept separate from UI code where practical:

- `src/data/profile.js` — identity, links, biography, contact information
- `src/data/projects/` — project-specific content
- `src/data/proof.js` — proof/evidence content used by the portfolio

## Security Notes

- Do not commit `.env`.
- Do not put GitHub secrets in `src/`, `shared/`, or any `VITE_*` environment variable.
- The GitHub API proxy only exposes normalized response data to the frontend.
- Public GitHub information should be treated as untrusted external data and transformed before rendering.

## License

This repository contains a personal portfolio. Unless a separate license is added, the source code is not granted for unrestricted redistribution.
