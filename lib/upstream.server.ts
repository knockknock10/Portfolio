import "server-only"

import { GET as getPublicPullRequests } from "@/app/api/public-pull-requests.json/route"
import { groupUpstream, unavailable, type RawPullRequest, type UpstreamSummary } from "./upstream-group"

// The grouping rules now live in ./upstream-group so the browser can reuse them for live data.
// The previous all-in-one version is kept in lib/_legacy/upstream.server.ts.txt.
export type { UpstreamPullRequest, UpstreamProject, UpstreamSummary } from "./upstream-group"

/** Snapshot taken when the site is built (the fallback while live data loads). */
export async function getUpstream(): Promise<UpstreamSummary> {
  try {
    const response = await getPublicPullRequests()
    const data = (await response.json()) as { available?: boolean; generatedAt?: string; contributions?: RawPullRequest[] }
    if (!data.available || !Array.isArray(data.contributions)) return unavailable
    return groupUpstream(data.contributions, data.generatedAt ?? null)
  } catch {
    return unavailable
  }
}
