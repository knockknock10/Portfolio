/**
 * Pure grouping of pull requests into "upstream" work. Shared by the build-time
 * route (lib/upstream.server.ts) and the browser (lib/live-github.ts), so the
 * numbers are computed the same way in both places.
 */

/** Organizations that belong to me. Their pull requests are shown separately, not counted as upstream work. */
const OWN_OWNERS = new Set(["aevor", "knockknock10"])

/** Owners that are personal/classroom repositories rather than real upstream projects (for example a student ID). */
const PERSONAL_OWNER_PATTERNS = [/^ap\d+$/i]

/** Owners that are never shown or counted on the site (private choice: classmates' and personal repositories). */
// Stored as 53-bit hashes so the names are not readable in the shipped page. This is not secret (anyone can
// test a guess against the algorithm); it only keeps the names out of the text. The same check runs in the
// build-time route and in the browser, so the live GitHub fetch cannot bring these owners back.
const EXCLUDED_OWNER_HASHES = new Set<number>([1547575549078839, 6993789943835639])
function ownerHash(value: string): number {
  let h1 = 0xdeadbeef
  let h2 = 0x41c6ce57
  for (const char of value.toLowerCase()) {
    const code = char.charCodeAt(0)
    h1 = Math.imul(h1 ^ code, 2654435761)
    h2 = Math.imul(h2 ^ code, 1597334677)
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909)
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909)
  return 4294967296 * (2097151 & h2) + (h1 >>> 0)
}
export function isExcludedOwner(owner: string): boolean {
  return EXCLUDED_OWNER_HASHES.has(ownerHash(owner))
}

/** Friendlier names for a few owners. Anything not listed is shown exactly as it appears on GitHub. */
const DISPLAY_NAMES: Record<string, string> = {
  "kestra-io": "Kestra",
  apache: "Apache",
  "wanaku-ai": "Wanaku AI",
  webpack: "webpack",
  kubernetes: "Kubernetes",
  google: "Google",
  ansvisor: "Ansvisor",
  Podiom: "Podiom",
  OpenNSW: "OpenNSW",
}

export type UpstreamPullRequest = {
  id: string
  repository: string
  number: number
  title: string
  url: string
  status: "merged" | "open"
  /** ISO date of the merge, or of the last update for open pull requests. */
  date: string | null
}

export type UpstreamProject = {
  owner: string
  name: string
  mergedCount: number
  openCount: number
  /** Merged first (newest first), then open (newest first). */
  pullRequests: UpstreamPullRequest[]
  searchUrl: string
}

export type UpstreamSummary = {
  available: boolean
  generatedAt: string | null
  mergedCount: number
  openCount: number
  projectCount: number
  projects: UpstreamProject[]
  own: { owner: string; mergedCount: number; openCount: number } | null
}

export type RawPullRequest = {
  id: string
  owner: string
  repository: string
  number: number
  title: string
  url: string
  state: "open" | "closed"
  mergedAt: string | null
  updatedAt: string | null
}

export const unavailable: UpstreamSummary = {
  available: false,
  generatedAt: null,
  mergedCount: 0,
  openCount: 0,
  projectCount: 0,
  projects: [],
  own: null,
}

function byDateDescending(left: UpstreamPullRequest, right: UpstreamPullRequest) {
  return (right.date ? Date.parse(right.date) : 0) - (left.date ? Date.parse(left.date) : 0)
}

export function groupUpstream(contributions: RawPullRequest[], generatedAt: string | null): UpstreamSummary {
  const upstream = new Map<string, UpstreamProject>()
  let ownMerged = 0
  let ownOpen = 0

  for (const item of contributions) {
    const merged = Boolean(item.mergedAt)
    const open = item.state === "open" && !merged
    if (!merged && !open) continue // closed without merging: not shown

    const ownerKey = item.owner.toLowerCase()
    if (OWN_OWNERS.has(ownerKey)) {
      if (merged) ownMerged += 1
      else ownOpen += 1
      continue
    }
    if (isExcludedOwner(ownerKey)) continue
    if (PERSONAL_OWNER_PATTERNS.some((pattern) => pattern.test(item.owner))) continue

    let project = upstream.get(item.owner)
    if (!project) {
      project = {
        owner: item.owner,
        name: DISPLAY_NAMES[item.owner] ?? item.owner,
        mergedCount: 0,
        openCount: 0,
        pullRequests: [],
        searchUrl:
          "https://github.com/search?type=pullrequests&q=" +
          encodeURIComponent(`author:knockknock10 is:pr user:${item.owner}`),
      }
      upstream.set(item.owner, project)
    }

    if (merged) project.mergedCount += 1
    else project.openCount += 1
    project.pullRequests.push({
      id: item.id,
      repository: item.repository,
      number: item.number,
      title: item.title,
      url: item.url,
      status: merged ? "merged" : "open",
      date: merged ? item.mergedAt : item.updatedAt,
    })
  }

  const projects = [...upstream.values()]
  for (const project of projects) {
    const mergedList = project.pullRequests.filter((pr) => pr.status === "merged").sort(byDateDescending)
    const openList = project.pullRequests.filter((pr) => pr.status === "open").sort(byDateDescending)
    project.pullRequests = [...mergedList, ...openList]
  }
  projects.sort((left, right) => right.mergedCount - left.mergedCount || right.openCount - left.openCount)

  return {
    available: true,
    generatedAt,
    mergedCount: projects.reduce((sum, project) => sum + project.mergedCount, 0),
    openCount: projects.reduce((sum, project) => sum + project.openCount, 0),
    projectCount: projects.length,
    projects,
    own: ownMerged + ownOpen > 0 ? { owner: "Aevor", mergedCount: ownMerged, openCount: ownOpen } : null,
  }
}
