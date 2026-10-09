# Portfolio

Personal portfolio for Sanjeev Kumar — software engineer, open-source contributor, and applied AI researcher.

## Tech Stack

- **React 19** + **Vite 8**
- **Tailwind CSS 4** (via `@tailwindcss/vite`)
- **React Router 7** for routing
- **ESLint** for linting

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── leetcode/         # Phase 5: LeetCode profile & stats components
│   ├── opensource/       # Phase 4: Open source components
│   ├── github/           # Phase 3: GitHub proof-of-work components
│   └── casestudy/        # Phase 2: Case study components
├── data/
│   ├── leetcode.js       # Phase 5: LeetCode configuration & utilities
│   ├── profile.js        # Identity, navigation, sections, metadata
│   └── projects/         # Project data files
├── hooks/                # Custom React hooks
├── layouts/              # Page layouts
├── lib/                  # API clients
├── pages/                # Route pages
├── sections/             # Homepage sections
├── styles/               # Global styles & design tokens
└── main.jsx              # App entry point
server/
├── github/               # Server-side GitHub API handlers
└── ...
shared/
└── github-config.js      # Shared GitHub configuration (client + server)
```

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

## Phase 5 — Problem Solving (LeetCode)

### Configuration

The Problem Solving section is driven by a single configuration file:

**`src/data/leetcode.js`**

```js
export const leetcodeConfig = {
  // Your LeetCode username (the slug in your profile URL)
  // Example: https://leetcode.com/u/knockknock10/ → 'knockknock10'
  username: 'knockknock10',

  // Optional display name — only set if verified
  displayName: null,

  // Optional avatar URL — only set if you have a verified, authorized source
  avatarUrl: null,

  // Verified statistics snapshot (all fields optional)
  stats: null,
};
```

### How to Configure

1. **Set your username**
   - Find your username at `https://leetcode.com/u/<your-username>/`
   - Update `username` in `src/data/leetcode.js` (currently `'knockknock10'`)
   - The profile URL is derived automatically: `https://leetcode.com/u/<username>/`

2. **Add verified statistics (optional)**
   - Only add numbers you have personally verified
   - All fields are optional — omit or set to `null` if unverified
   - Example:
   ```js
   stats: {
     totalSolved: 342,
     easySolved: 156,
     mediumSolved: 148,
     hardSolved: 38,
     contestRating: 1847,
     globalRanking: 12345,
     contestsAttended: 24,
     mostRecentContest: {
       name: 'Weekly Contest 420',
       rank: 1523,
       rating: 1847,
       date: '2026-09-28T00:00:00Z',
     },
     verifiedAt: '2026-10-09T00:00:00Z',  // ISO 8601, when YOU verified
     source: 'LeetCode profile page (manual verification)',
     notes: 'Contest rating reflects post-contest update on 2026-09-28.',
   },
   ```

3. **Key Rules**
   - `totalSolved` MUST equal `easySolved + mediumSolved + hardSolved`
   - `verifiedAt` = when YOU verified the numbers (ISO 8601, not build date)
   - `source` = where the data came from
   - Never commit fake, estimated, or scraped numbers
   - `null`/missing values are never displayed as zeros

### Data Freshness & Provenance

Every displayed statistic shows its verification timestamp:
> "Stats last verified: 9 October 2026"

This reflects when a human last verified the numbers — not the build date or current date.

### Compliance

- **No scraping** — no web scrapers, crawlers, browser automation, or reverse-engineering
- **No unauthorized APIs** — no unverified third-party statistics services
- **Manual snapshots only** — the portfolio remains useful without automated statistics
- **Honest representation** — missing data is clearly disclosed, never fabricated

### Routes

- **Homepage section**: `/#problem-solving` — concise snapshot with profile link and key stats
- **Detailed page**: `/problem-solving` — full breakdown with difficulty chart, contest info, and configuration guide

### Navigation

The "Problem Solving" link appears in the main navigation bar and footer (when configured).

## GitHub Data (server-side token)

The open-source sections read the GitHub API through `/api/github?...`.

- Put a personal access token in `.env` as `GITHUB_TOKEN=...` (the file is gitignored and must never be committed).
- The token is read **server-side only** (`server/github/` + `api/github.js`); it is never exposed to the browser bundle (no `VITE_` prefix, never `import.meta.env`).
- In dev/preview, `vite.config.js` loads `.env` into the API handler's environment. On Vercel, `api/github.js` runs as a serverless function. On Netlify, `netlify/functions/github.js` adapts the same handler and `netlify.toml` routes `/api/github` to it. Both hosting adapters read the project's environment variables server-side.
- Optional: `VITE_GITHUB_USERNAME` overrides the default GitHub username shown in the open-source section; it must be a public username, never a secret.
- Without a token the API falls back to unauthenticated requests (lower rate limits); the UI shows an error state with retry rather than fabricated numbers.

## Deployment

The project builds to static assets in `dist/` and now includes deployment configuration for both Vercel and Netlify.

- **Vercel:** `vercel.json` defines the build command, output directory, and SPA fallback. `api/github.js` serves the GitHub API requests.
- **Netlify:** `netlify.toml` defines the build, deploy directory, function directory, the `/api/github` function rewrite, and the SPA fallback for deep links such as `/work/aevor`.
- **Required environment variable:** configure `GITHUB_TOKEN` in the host's site/project environment settings for authenticated GraphQL data (contributions, organizations, PRs, and issues). On Netlify, use Site configuration → Environment variables; on Vercel, use Project Settings → Environment Variables. Never place the token in a `VITE_*` variable or commit it.
- **Preview/production:** ensure the variable is available to the deploy context you're testing, then trigger a new deployment after changing host configuration.

## Known Limitations

- **Client-side rendering** — titles/descriptions/Open Graph tags are set at runtime per route; there is no SSR, so social-preview scrapers that do not run JavaScript see only the `index.html` defaults. No `og:image` asset is configured.
- **GitHub stats** — live via the GitHub API when `GITHUB_TOKEN` is configured; on API errors the UI discloses the failure instead of showing zeros.
- **LeetCode stats** — manual, verified snapshots only (no scraping, no unofficial APIs). `null` values are never rendered as `0`.
- **Canonical URLs** — no per-route `<link rel="canonical">` is emitted.

## License

MIT