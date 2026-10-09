/**
 * Frontend GitHub API client — calls our internal server-side endpoints.
 * Never talks to GitHub directly. Keeps the UI decoupled from GitHub API shape.
 */

const BASE = '/api/github'

async function fetchJson(url) {
  const res = await fetch(url, { headers: { Accept: 'application/json' } })
  const body = await res.json().catch(() => ({}))
  if (!res.ok) {
    const err = new Error(body.error?.message ?? `Request failed (${res.status})`)
    err.code = body.error?.code ?? 'unavailable'
    err.status = res.status
    throw err
  }
  return body
}

export async function fetchProfile() {
  return fetchJson(`${BASE}?resource=profile`)
}

export async function fetchRepos() {
  return fetchJson(`${BASE}?resource=repos`)
}

export async function fetchEvents() {
  return fetchJson(`${BASE}?resource=events`)
}

export async function fetchContributions(_username, year) {
  return fetchJson(`${BASE}?resource=contributions&year=${year}`)
}

// Phase 4 — Open Source endpoints
export async function fetchOrganizations() {
  return fetchJson(`${BASE}?resource=organizations`)
}

export async function fetchOrganization(org) {
  return fetchJson(`${BASE}?resource=organization&org=${encodeURIComponent(org)}`)
}

export async function fetchOrgPRs(org) {
  return fetchJson(`${BASE}?resource=org-prs&org=${encodeURIComponent(org)}`)
}

export async function fetchOrgIssues(org) {
  return fetchJson(`${BASE}?resource=org-issues&org=${encodeURIComponent(org)}`)
}

export async function fetchTimeline() {
  return fetchJson(`${BASE}?resource=timeline`)
}

export async function fetchSummary() {
  return fetchJson(`${BASE}?resource=summary`)
}

export async function fetchAll(_username, year) {
  const [profile, repos, events, contributions] = await Promise.allSettled([
    fetchProfile(),
    fetchRepos(),
    fetchEvents(),
    fetchContributions(null, year),
  ])
  return {
    profile: profile.status === 'fulfilled' ? profile.value : { ok: false, error: profile.reason },
    repos: repos.status === 'fulfilled' ? repos.value : { ok: false, error: repos.reason },
    events: events.status === 'fulfilled' ? events.value : { ok: false, error: events.reason },
    contributions: contributions.status === 'fulfilled' ? contributions.value : { ok: false, error: contributions.reason },
  }
}