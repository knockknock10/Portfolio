import { groupUpstream, type RawPullRequest, type UpstreamSummary } from "./upstream-group"

const USER = "knockknock10"
const TTL = 10 * 60 * 1000 // ten minutes; the unauthenticated GitHub API allows 60 requests an hour per visitor

export type LiveGithub = { upstream: UpstreamSummary; repoCount: number | null; fetchedAt: number }

type SearchItem = {
  id?: number
  number?: number
  title?: string
  html_url?: string
  repository_url?: string
  state?: string
  updated_at?: string | null
  pull_request?: { merged_at?: string | null }
}

function toRaw(item: SearchItem): RawPullRequest | null {
  const match = item.repository_url?.match(/repos\/([^/]+)\/([^/]+)$/)
  if (!match || !item.html_url || typeof item.number !== "number") return null
  return {
    id: String(item.id ?? item.html_url),
    owner: match[1],
    repository: `${match[1]}/${match[2]}`,
    number: item.number,
    title: item.title ?? "",
    url: item.html_url,
    state: item.state === "open" ? "open" : "closed",
    mergedAt: item.pull_request?.merged_at ?? null,
    updatedAt: item.updated_at ?? null,
  }
}

async function json(url: string, signal: AbortSignal) {
  const response = await fetch(url, { headers: { Accept: "application/vnd.github+json" }, signal })
  if (!response.ok) throw new Error(`GitHub answered ${response.status}`)
  return response.json()
}

function readCache(): LiveGithub | null {
  try {
    const raw = sessionStorage.getItem("live-github")
    if (!raw) return null
    const value = JSON.parse(raw) as LiveGithub
    return Date.now() - value.fetchedAt < TTL ? value : null
  } catch {
    return null
  }
}

let inflight: Promise<LiveGithub> | null = null

/** Current pull requests and repository count, straight from GitHub in the visitor's browser. */
export function fetchLiveGithub(signal: AbortSignal): Promise<LiveGithub> {
  const cached = readCache()
  if (cached) return Promise.resolve(cached)
  if (inflight) return inflight
  inflight = (async () => {
    const q = encodeURIComponent(`author:${USER} is:pr -user:${USER}`)
    const raw: RawPullRequest[] = []
    for (let page = 1; page <= 4; page += 1) {
      const data = (await json(`https://api.github.com/search/issues?q=${q}&per_page=100&page=${page}`, signal)) as {
        items?: SearchItem[]
        total_count?: number
      }
      const items = data.items ?? []
      for (const item of items) {
        const value = toRaw(item)
        if (value) raw.push(value)
      }
      if (items.length < 100) break
    }
    if (!raw.length) throw new Error("No pull requests returned")
    let repoCount: number | null = null
    try {
      const profile = (await json(`https://api.github.com/users/${USER}`, signal)) as { public_repos?: number }
      repoCount = typeof profile.public_repos === "number" ? profile.public_repos : null
    } catch {
      // The repository count is optional.
    }
    const value: LiveGithub = { upstream: groupUpstream(raw, new Date().toISOString()), repoCount, fetchedAt: Date.now() }
    try {
      sessionStorage.setItem("live-github", JSON.stringify(value))
    } catch {
      // Storage can be unavailable; the data still renders.
    }
    return value
  })().finally(() => {
    inflight = null
  })
  return inflight
}
