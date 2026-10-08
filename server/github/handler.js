/**
 * /api/github/* request handler.
 *
 * Runs in two contexts with the same code:
 *  - Vite dev/preview middleware (vite.config.js)
 *  - serverless function (api/github.js) on supported hosts
 *
 * Browser → /api/github?resource=… → this handler → GitHub API.
 * The browser never talks to GitHub directly and never sees a token.
 */

import { cached, GitHubError } from './cache.js'
import { ghRest, ghGraphQL, hasToken } from './client.js'
import {
  CONTRIBUTIONS_QUERY,
  ORG_DISCOVERY_QUERY,
  ORG_PRS_QUERY,
  ORG_ISSUES_QUERY,
  CONTRIBUTION_TIMELINE_QUERY,
  ORG_DETAIL_QUERY,
} from './queries.js'
import {
  toActivityModels,
  toContributionModel,
  toProfileModel,
  toRepositoryModels,
  toOrganizations,
  toOrganizationDetail,
  toContributionPRModel,
  toContributionIssueModel,
  toTimelineEvents,
  toSummaryCounts,
} from './transformers.js'
import { resolveGithubUsername, rankRepositories, githubDisplay } from '../../shared/github-config.js'

const TTL = {
  profile: 60 * 60_000,
  repos: 30 * 60_000,
  events: 10 * 60_000,
  contributions: 60 * 60_000,
  organizations: 60 * 60_000,
  orgDetail: 60 * 60_000,
  orgPRs: 30 * 60_000,
  orgIssues: 30 * 60_000,
  timeline: 15 * 60_000,
  summary: 60 * 60_000,
}

const STATUS_BY_CODE = {
  not_found: 404,
  rate_limited: 429,
  timeout: 503,
  unavailable: 503,
  forbidden: 503,
  malformed: 503,
  bad_request: 400,
}

const MESSAGES_BY_CODE = {
  not_found: 'GitHub account not found',
  rate_limited: 'GitHub rate limit reached',
  timeout: 'GitHub request timed out',
  unavailable: 'GitHub activity is temporarily unavailable',
  forbidden: 'GitHub authentication failed',
  malformed: 'GitHub returned an unexpected response',
  bad_request: 'Unknown GitHub resource',
}

function send(res, status, body, extraHeaders = {}) {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.setHeader('Cache-Control', 'public, max-age=60, stale-while-revalidate=600')
  for (const [key, value] of Object.entries(extraHeaders)) res.setHeader(key, value)
  res.end(JSON.stringify(body))
}

function sendError(res, code) {
  const status = STATUS_BY_CODE[code] ?? 503
  send(res, status, {
    ok: false,
    error: { code, message: MESSAGES_BY_CODE[code] ?? MESSAGES_BY_CODE.unavailable },
  })
}

function yearWindow(year) {
  const now = new Date()
  const from = new Date(Date.UTC(year, 0, 1))
  const to = year === now.getUTCFullYear() ? now : new Date(Date.UTC(year, 11, 31, 23, 59, 59))
  return { from: from.toISOString(), to: to.toISOString() }
}

async function loadProfile(username) {
  const { data, fetchedAt, stale } = await cached(`profile:${username}`, TTL.profile, () =>
    ghRest(`/users/${encodeURIComponent(username)}`),
  )
  return { data: toProfileModel(data), fetchedAt, stale }
}

async function loadRepos(username) {
  const { data, fetchedAt, stale } = await cached(`repos:${username}`, TTL.repos, () =>
    ghRest(`/users/${encodeURIComponent(username)}/repos?per_page=50&type=owner&sort=pushed`),
  )
  const ranked = rankRepositories(data).slice(0, githubDisplay.repositoryLimit)
  return { data: toRepositoryModels(ranked), fetchedAt, stale }
}

async function loadEvents(username) {
  const { data, fetchedAt, stale } = await cached(`events:${username}`, TTL.events, () =>
    ghRest(`/users/${encodeURIComponent(username)}/events/public?per_page=30`),
  )
  return { data: toActivityModels(data).slice(0, githubDisplay.activityLimit), fetchedAt, stale }
}

async function loadContributions(username, year) {
  if (!hasToken()) {
    throw new GitHubError('unavailable', 'Contribution data requires server-side GitHub auth', 503)
  }
  const { from, to } = yearWindow(year)
  const { data, fetchedAt, stale } = await cached(
    `contributions:${username}:${year}`,
    TTL.contributions,
    async () => {
      const result = await ghGraphQL(CONTRIBUTIONS_QUERY, { login: username, from, to })
      if (!result?.user) throw new GitHubError('not_found', 'GitHub account not found', 404)
      return result.user
    },
  )
  return { data: toContributionModel(data, year), fetchedAt, stale }
}

// Phase 4 loaders

async function loadOrganizations(username) {
  if (!hasToken()) {
    throw new GitHubError('unavailable', 'Organization discovery requires server-side GitHub auth', 503)
  }
  const { data, fetchedAt, stale } = await cached(
    `organizations:${username}`,
    TTL.organizations,
    async () => {
      const result = await ghGraphQL(ORG_DISCOVERY_QUERY, { login: username, first: 100 })
      if (!result?.user) throw new GitHubError('not_found', 'GitHub account not found', 404)
      return toOrganizations(result, username)
    },
  )
  return { data, fetchedAt, stale }
}

async function loadOrganizationDetail(username, orgLogin) {
  if (!hasToken()) {
    throw new GitHubError('unavailable', 'Organization detail requires server-side GitHub auth', 503)
  }
  const cacheKey = `orgDetail:${username}:${orgLogin}`
  const { data, fetchedAt, stale } = await cached(
    cacheKey,
    TTL.orgDetail,
    async () => {
      const result = await ghGraphQL(ORG_DETAIL_QUERY, { login: orgLogin })
      if (!result?.organization) throw new GitHubError('not_found', 'Organization not found', 404)
      return toOrganizationDetail(result)
    },
  )
  return { data, fetchedAt, stale }
}

async function loadOrgPRs(username, orgLogin) {
  if (!hasToken()) {
    throw new GitHubError('unavailable', 'Organization PRs require server-side GitHub auth', 503)
  }
  const cacheKey = `orgPRs:${username}:${orgLogin}`
  const { data, fetchedAt, stale } = await cached(
    cacheKey,
    TTL.orgPRs,
    async () => {
      const result = await ghGraphQL(ORG_PRS_QUERY, { login: username, org: orgLogin, first: 100 })
      if (!result?.user) throw new GitHubError('not_found', 'GitHub account not found', 404)
      // Filter to only PRs in this organization
      const prs = (result.user?.pullRequests?.nodes ?? []).filter(
        (pr) => pr.repository?.owner?.login === orgLogin,
      )
      return toContributionPRModel(prs)
    },
  )
  return { data, fetchedAt, stale }
}

async function loadOrgIssues(username, orgLogin) {
  if (!hasToken()) {
    throw new GitHubError('unavailable', 'Organization issues require server-side GitHub auth', 503)
  }
  const cacheKey = `orgIssues:${username}:${orgLogin}`
  const { data, fetchedAt, stale } = await cached(
    cacheKey,
    TTL.orgIssues,
    async () => {
      const result = await ghGraphQL(ORG_ISSUES_QUERY, { login: username, first: 100 })
      if (!result?.user) throw new GitHubError('not_found', 'GitHub account not found', 404)
      // Filter to only issues in this organization
      const issues = (result.user?.issues?.nodes ?? []).filter(
        (issue) => issue.repository?.owner?.login === orgLogin,
      )
      return toContributionIssueModel(issues, username)
    },
  )
  return { data, fetchedAt, stale }
}

async function loadTimeline(username) {
  if (!hasToken()) {
    throw new GitHubError('unavailable', 'Timeline requires server-side GitHub auth', 503)
  }
  const { data, fetchedAt, stale } = await cached(
    `timeline:${username}`,
    TTL.timeline,
    async () => {
      const result = await ghGraphQL(CONTRIBUTION_TIMELINE_QUERY, { login: username, first: 30 })
      if (!result?.user) throw new GitHubError('not_found', 'GitHub account not found', 404)
      return toTimelineEvents(result, username)
    },
  )
  return { data, fetchedAt, stale }
}

async function loadSummary(username) {
  if (!hasToken()) {
    throw new GitHubError('unavailable', 'Summary requires server-side GitHub auth', 503)
  }
  const { data, fetchedAt, stale } = await cached(
    `summary:${username}`,
    TTL.summary,
    async () => {
      const result = await ghGraphQL(CONTRIBUTION_TIMELINE_QUERY, { login: username, first: 100 })
      if (!result?.user) throw new GitHubError('not_found', 'GitHub account not found', 404)
      return toSummaryCounts(result, username)
    },
  )
  return { data, fetchedAt, stale }
}

const LOADERS = {
  profile: (username) => loadProfile(username),
  repos: (username) => loadRepos(username),
  events: (username) => loadEvents(username),
  contributions: (username, params) =>
    loadContributions(username, Number.parseInt(params.get('year'), 10)),
  // Phase 4
  organizations: (username) => loadOrganizations(username),
  organization: (username, params) =>
    loadOrganizationDetail(username, params.get('org')),
  'org-prs': (username, params) =>
    loadOrgPRs(username, params.get('org')),
  'org-issues': (username, params) =>
    loadOrgIssues(username, params.get('org')),
  timeline: (username) => loadTimeline(username),
  summary: (username) => loadSummary(username),
}

export async function handleGithubRequest(req, res) {
  if (req.method !== 'GET') {
    send(res, 405, { ok: false, error: { code: 'bad_request', message: 'Method not allowed' } })
    return
  }

  let url
  try {
    url = new URL(req.url, 'http://localhost')
  } catch {
    sendError(res, 'bad_request')
    return
  }

  const segments = url.pathname.split('/').filter(Boolean)
  const resource = url.searchParams.get('resource') || segments[segments.length - 1] || ''

  const loader = LOADERS[resource]
  if (!loader) {
    sendError(res, 'bad_request')
    return
  }

  // Validate year for contributions
  if (resource === 'contributions') {
    const year = Number.parseInt(url.searchParams.get('year'), 10)
    const currentYear = new Date().getUTCFullYear()
    if (!Number.isInteger(year) || year < 2008 || year > currentYear) {
      sendError(res, 'bad_request')
      return
    }
  }

  // Validate org parameter for org-scoped resources
  if (['organization', 'org-prs', 'org-issues'].includes(resource)) {
    const org = url.searchParams.get('org')
    if (!org || !/^[a-zA-Z0-9-]+$/.test(org)) {
      sendError(res, 'bad_request')
      return
    }
  }

  const username = resolveGithubUsername(process.env)

  try {
    const { data, fetchedAt, stale } = await loader(username, url.searchParams)
    if (!data && resource !== 'timeline' && resource !== 'summary') {
      sendError(res, 'unavailable')
      return
    }
    send(res, 200, { ok: true, data: data ?? [], fetchedAt, stale })
  } catch (error) {
    const code = error instanceof GitHubError ? error.code : 'unavailable'
    console.error(`[github] ${resource} failed: ${code} — ${error.message}`)
    sendError(res, code)
  }
}