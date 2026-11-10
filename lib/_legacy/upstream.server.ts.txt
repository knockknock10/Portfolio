import "server-only"

import { GET as getPublicPullRequests } from "@/app/api/public-pull-requests.json/route"

/**
 * Pull requests grouped for the Open Source section.
 *
 * The raw index comes from the existing build-time route
 * (app/api/public-pull-requests.json/route.ts), so there is one source of truth.
 * Here we only separate "work in other people's projects" from "work inside my own
 * project", so the headline numbers stay honest.
 */

/** Organizations that belong to me. Their pull requests are shown separately, not counted as upstream work. */
const OWN_OWNERS = new Set(["aevor", "knockknock10"])

/** Owners that are personal/classroom repositories rather than real upstream projects (for example a student ID). */
const PERSONAL_OWNER_PATTERNS = [/^ap\d+$/i]

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

type RawPullRequest = {
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

const unavailable: UpstreamSummary = {
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

export async function getUpstream(): Promise<UpstreamSummary> {
  try {
    const response = await getPublicPullRequests()
    const data = (await response.json()) as {
      available?: boolean
      generatedAt?: string
      contributions?: RawPullRequest[]
    }
    if (!data.available || !Array.isArray(data.contributions)) return unavailable

    const upstream = new Map<string, UpstreamProject>()
    let ownMerged = 0
    let ownOpen = 0

    for (const item of data.contributions) {
      const merged = Boolean(item.mergedAt)
      const open = item.state === "open" && !merged
      if (!merged && !open) continue // closed without merging: not shown

      const ownerKey = item.owner.toLowerCase()
      if (OWN_OWNERS.has(ownerKey)) {
        if (merged) ownMerged += 1
        else ownOpen += 1
        continue
      }
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
      generatedAt: data.generatedAt ?? null,
      mergedCount: projects.reduce((sum, project) => sum + project.mergedCount, 0),
      openCount: projects.reduce((sum, project) => sum + project.openCount, 0),
      projectCount: projects.length,
      projects,
      own: ownMerged + ownOpen > 0 ? { owner: "Aevor", mergedCount: ownMerged, openCount: ownOpen } : null,
    }
  } catch {
    return unavailable
  }
}
