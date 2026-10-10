import "server-only"

type GitHubSearchItem = {
  title?: string
  html_url?: string
  state?: string
  created_at?: string
  repository_url?: string
  pull_request?: {
    merged_at?: string | null
  }
}

type GitHubSearchResponse = {
  items?: GitHubSearchItem[]
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

const API_URL =
  "https://api.github.com/search/issues?q=" +
  encodeURIComponent("author:knockknock10 is:pr") +
  "&sort=created&order=desc&per_page=8"

/**
 * Fetch public pull requests on the server so tokens are never shipped to the
 * browser. Cache the result for one hour and fail gracefully when rate-limited.
 */
export async function getRecentPublicPullRequests(): Promise<PublicPullRequestResult> {
  try {
    const headers: Record<string, string> = {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "Sanjeev-Portfolio",
    }
    const token = process.env.GITHUB_TOKEN
    if (token) headers.Authorization = "Bearer " + token

    const response = await fetch(API_URL, {
      headers,
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(5000),
    })

    if (!response.ok) return { available: false, items: [] }

    const payload = (await response.json()) as GitHubSearchResponse
    const items = (Array.isArray(payload.items) ? payload.items : []).flatMap((item) => {
      if (
        !item.title ||
        !item.html_url?.startsWith("https://github.com/") ||
        !item.repository_url?.startsWith("https://api.github.com/repos/")
      ) {
        return []
      }

      const repository = item.repository_url.slice("https://api.github.com/repos/".length)
      const merged = Boolean(item.pull_request?.merged_at)
      const state = item.state === "open" ? "open" : "closed"

      return [{
        title: item.title,
        url: item.html_url,
        state,
        merged,
        createdAt: item.created_at ?? null,
        repository,
      } satisfies PublicPullRequest]
    })

    return { available: true, items }
  } catch {
    return { available: false, items: [] }
  }
}
