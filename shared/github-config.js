/**
 * Single source of truth for GitHub configuration.
 *
 * Shared by:
 *  - the browser (bundled by Vite — public values only, never tokens)
 *  - the server layer (server/github/*) for endpoint validation
 *
 * SECURITY: nothing in this file is a secret. GITHUB_TOKEN is read exclusively
 * from server-side process.env and never referenced here.
 */

export const DEFAULT_GITHUB_USERNAME = 'knockknock10'

/**
 * Resolve the GitHub username from environment configuration.
 * Precedence: server env (GITHUB_USERNAME) → Vite client env → verified default.
 */
export function resolveGithubUsername(env = {}) {
  return env.GITHUB_USERNAME || env.VITE_GITHUB_USERNAME || DEFAULT_GITHUB_USERNAME
}

/**
 * Repositories pinned explicitly. Pinned repos are always included in
 * "Selected repositories" and visibly labelled as pinned — distinct from
 * repos chosen by the automatic ranking below.
 */
export const featuredRepositories = [
  'knockknock10/CommitHub',
  'knockknock10/SemBind_Audio',
]

/**
 * Display preferences for the homepage proof layer.
 * The homepage stays compact; details live on GitHub / case studies.
 */
export const githubDisplay = {
  repositoryLimit: 6,
  activityLimit: 8,
  /** How many calendar years the year selector offers (current year included). */
  yearCount: 3,
}

/**
 * Deterministic repository ranking — no opaque score.
 * Order of precedence:
 *   1. pinned (featuredRepositories) — always included, flagged "pinned"
 *   2. not a fork
 *   3. recent activity (pushed_at)
 *   4. public traction (stars, forks)
 *   5. completeness (has a description, not archived)
 * Ties break by most recently pushed.
 */
export function rankRepositories(repositories) {
  const pinned = new Set(featuredRepositories)
  const now = Date.now()
  const daysSince = (dateString) =>
    dateString ? (now - Date.parse(dateString)) / 86_400_000 : Infinity

  const scored = repositories.map((repo) => {
    const pushedDays = daysSince(repo.pushed_at)
    let score = 0
    if (pinned.has(repo.full_name)) score += 1000
    if (repo.fork) score -= 500
    if (repo.archived) score -= 100
    if (pushedDays <= 7) score += 120
    else if (pushedDays <= 30) score += 70
    else if (pushedDays <= 90) score += 40
    else if (pushedDays <= 365) score += 15
    score += Math.min(repo.stargazers_count ?? 0, 50) * 4
    score += Math.min(repo.forks_count ?? 0, 20) * 6
    if (repo.description) score += 20
    return { repo, score, pinned: pinned.has(repo.full_name) }
  })

  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score
    return Date.parse(b.repo.pushed_at ?? 0) - Date.parse(a.repo.pushed_at ?? 0)
  })

  return scored
}
