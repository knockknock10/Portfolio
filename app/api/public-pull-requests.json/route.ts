export const dynamic = "force-static"

const SEARCH_ENDPOINT = "https://api.github.com/search/issues"
const PAGE_SIZE = 100
const MAX_SEARCH_RESULTS = 1000

type GitHubSearchPullRequest = {
  id?: number
  number?: number
  title?: string
  html_url?: string
  repository_url?: string
  state?: string
  created_at?: string | null
  updated_at?: string | null
  pull_request?: { merged_at?: string | null }
}

type GitHubSearchPayload = {
  total_count?: number
  incomplete_results?: boolean
  items?: GitHubSearchPullRequest[]
}

type PublicPullRequest = {
  id: string
  owner: string
  repository: string
  number: number
  title: string
  url: string
  state: "open" | "closed"
  mergedAt: string | null
  createdAt: string | null
  updatedAt: string | null
}

async function fetchPage(page: number): Promise<GitHubSearchPayload> {
  const url = new URL(SEARCH_ENDPOINT)
  url.searchParams.set("q", "author:knockknock10 is:pr")
  url.searchParams.set("sort", "updated")
  url.searchParams.set("order", "desc")
  url.searchParams.set("per_page", String(PAGE_SIZE))
  url.searchParams.set("page", String(page))

  const response = await fetch(url, {
    headers: {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "Sanjeev-Portfolio",
    },
    cache: "force-cache",
    signal: AbortSignal.timeout(12000),
  })

  if (!response.ok) {
    throw new Error(`GitHub public pull-request search failed with status ${response.status}`)
  }

  return (await response.json()) as GitHubSearchPayload
}

function normalizePullRequest(item: GitHubSearchPullRequest): PublicPullRequest | null {
  if (
    !Number.isInteger(item.number) ||
    !item.title?.trim() ||
    !item.html_url ||
    !item.repository_url ||
    (item.state !== "open" && item.state !== "closed")
  ) {
    return null
  }

  let repositoryUrl: URL
  let pullRequestUrl: URL

  try {
    repositoryUrl = new URL(item.repository_url)
    pullRequestUrl = new URL(item.html_url)
  } catch {
    return null
  }

  if (repositoryUrl.protocol !== "https:" || repositoryUrl.hostname !== "api.github.com") return null
  if (pullRequestUrl.protocol !== "https:" || pullRequestUrl.hostname !== "github.com") return null

  const repositoryParts = repositoryUrl.pathname.split("/").filter(Boolean)
  const pullRequestParts = pullRequestUrl.pathname.split("/").filter(Boolean)
  if (
    repositoryParts.length !== 3 ||
    repositoryParts[0] !== "repos" ||
    pullRequestParts.length !== 4 ||
    pullRequestParts[2] !== "pull" ||
    !/^\d+$/.test(pullRequestParts[3]) ||
    repositoryParts[1].toLowerCase() !== pullRequestParts[0].toLowerCase() ||
    repositoryParts[2].toLowerCase() !== pullRequestParts[1].toLowerCase() ||
    Number(pullRequestParts[3]) !== item.number
  ) {
    return null
  }

  const owner = repositoryParts[1]
  const repository = repositoryParts[2]
  const mergedAt = item.pull_request?.merged_at ?? null

  return {
    id: `${owner}/${repository}#${item.number}`,
    owner,
    repository,
    number: item.number as number,
    title: item.title.trim(),
    url: pullRequestUrl.href,
    state: item.state,
    mergedAt,
    createdAt: item.created_at ?? null,
    updatedAt: item.updated_at ?? null,
  }
}

/**
 * GitHub Pages cannot query GitHub at runtime. Index public authored pull
 * requests at build time and export a small JSON file for the client-side
 * organization explorer. The curated fallback in the UI remains available if
 * GitHub's search API is unavailable during a build.
 */
export async function GET() {
  try {
    const firstPage = await fetchPage(1)
    const reportedTotal = Number.isFinite(firstPage.total_count) ? Number(firstPage.total_count) : 0
    const indexedLimit = Math.min(reportedTotal, MAX_SEARCH_RESULTS)
    const pageCount = Math.max(1, Math.ceil(indexedLimit / PAGE_SIZE))
    const remainingPages = await Promise.all(
      Array.from({ length: pageCount - 1 }, (_, index) => fetchPage(index + 2)),
    )
    const payloads = [firstPage, ...remainingPages]
    const rawItems = payloads.flatMap((payload) => Array.isArray(payload.items) ? payload.items : [])
    const unique = new Map<string, PublicPullRequest>()

    for (const rawItem of rawItems) {
      const item = normalizePullRequest(rawItem)
      if (item && !unique.has(item.id)) unique.set(item.id, item)
    }

    const contributions = [...unique.values()].sort((left, right) => {
      const leftDate = left.updatedAt ? Date.parse(left.updatedAt) : 0
      const rightDate = right.updatedAt ? Date.parse(right.updatedAt) : 0
      return rightDate - leftDate
    })

    if (reportedTotal > 0 && contributions.length === 0) {
      throw new Error("GitHub returned no valid public pull-request records.")
    }

    return Response.json({
      available: true,
      generatedAt: new Date().toISOString(),
      reportedTotal,
      indexedCount: contributions.length,
      truncated: reportedTotal > contributions.length,
      incompleteResults: payloads.some((payload) => payload.incomplete_results === true),
      contributions,
    })
  } catch {
    return Response.json({
      available: false,
      generatedAt: new Date().toISOString(),
      reportedTotal: 0,
      indexedCount: 0,
      truncated: false,
      incompleteResults: false,
      contributions: [],
      message: "The public contribution index could not be refreshed during this build.",
    })
  }
}
