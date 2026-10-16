import "server-only"

type GitHubSearchItem = {
  title?: string
  html_url?: string
  created_at?: string
  repository_url?: string
}

type GitHubSearchResponse = {
  items?: GitHubSearchItem[]
}

type SearchGroup = {
  query: string
  state: "open" | "closed"
  merged: boolean
}

export type PublicPullRequest = {
  title: string
  url: string
  state: "open" | "closed"
  merged: boolean
  createdAt: string | null
  repository: string
}

export type PublicPullRequestResult = {
  available: boolean
  items: PublicPullRequest[]
}

const SEARCH_GROUPS: SearchGroup[] = [
  { query: "author:knockknock10 is:pr is:open", state: "open", merged: false },
  { query: "author:knockknock10 is:pr is:merged", state: "closed", merged: true },
  { query: "author:knockknock10 is:pr is:closed -is:merged", state: "closed", merged: false },
]

function isHttpsHost(value: string, hostname: string): boolean {
  try {
    const url = new URL(value)
    return url.protocol === "https:" && url.hostname === hostname
  } catch {
    return false
  }
}

function parsePublicPullRequest(
  item: GitHubSearchItem,
  group: SearchGroup,
): PublicPullRequest | null {
  if (
    !item.title?.trim() ||
    !item.html_url ||
    !item.repository_url ||
    !isHttpsHost(item.html_url, "github.com") ||
    !isHttpsHost(item.repository_url, "api.github.com")
  ) {
    return null
  }

  const repositoryParts = new URL(item.repository_url).pathname.split("/").filter(Boolean)
  const pullRequestParts = new URL(item.html_url).pathname.split("/").filter(Boolean)

  if (
    repositoryParts.length !== 3 ||
    repositoryParts[0] !== "repos" ||
    pullRequestParts.length !== 4 ||
    pullRequestParts[2] !== "pull" ||
    !/^\d+$/.test(pullRequestParts[3]) ||
    repositoryParts[1] !== pullRequestParts[0] ||
    repositoryParts[2] !== pullRequestParts[1]
  ) {
    return null
  }

  return {
    title: item.title.trim(),
    url: item.html_url,
    state: group.state,
    merged: group.merged,
    createdAt: item.created_at ?? null,
    repository: repositoryParts.slice(1).join("/"),
  }
}

async function fetchPublicPullRequests(group: SearchGroup): Promise<PublicPullRequest[]> {
  const url =
    "https://api.github.com/search/issues?q=" +
    encodeURIComponent(group.query) +
    "&sort=created&order=desc&per_page=8"

  const response = await fetch(url, {
    headers: {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "Sanjeev-Portfolio",
    },
    // Do not send GITHUB_TOKEN: authenticated issue search can include private
    // repositories, and this feed is rendered on a public page.
    next: { revalidate: 3600 },
    signal: AbortSignal.timeout(5000),
  })

  if (!response.ok) {
    throw new Error(`GitHub pull request search failed with status ${response.status}`)
  }

  const payload = (await response.json()) as GitHubSearchResponse
  return (Array.isArray(payload.items) ? payload.items : [])
    .map((item) => parsePublicPullRequest(item, group))
    .filter((item): item is PublicPullRequest => item !== null)
}

/**
 * Fetch only public pull requests on the server. Separate status-qualified
 * searches provide reliable merged state because Search Issues results do not
 * include pull_request.merged_at. Cache each search for one hour and fail
 * closed when GitHub is unavailable or rate-limits the request.
 */
export async function getRecentPublicPullRequests(): Promise<PublicPullRequestResult> {
  try {
    const groups = await Promise.all(SEARCH_GROUPS.map(fetchPublicPullRequests))
    const uniqueItems = new Map<string, PublicPullRequest>()

    for (const item of groups.flat()) {
      if (!uniqueItems.has(item.url)) uniqueItems.set(item.url, item)
    }

    const items = [...uniqueItems.values()].sort((a, b) => {
      const dateA = a.createdAt ? Date.parse(a.createdAt) : 0
      const dateB = b.createdAt ? Date.parse(b.createdAt) : 0
      return dateB - dateA
    })

    return { available: true, items: items.slice(0, 8) }
  } catch {
    return { available: false, items: [] }
  }
}
