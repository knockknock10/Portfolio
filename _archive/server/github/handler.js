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

function restRepoName(item) {
  const prefix = 'https://api.github.com/repos/'
  return item?.repository_url?.startsWith(prefix)
    ? item.repository_url.slice(prefix.length)
    : null
}

function restIssueTime(item) {
  return item?.pull_request?.merged_at || item?.closed_at || item?.updated_at || item?.created_at || null
}

function restPRModel(item) {
  const repoName = restRepoName(item)
  const mergedAt = item?.pull_request?.merged_at || null
  return {
    id: (repoName || 'repository') + '#' + item.number,
    repoName,
    repoOwner: repoName?.split('/')[0] || null,
    number: item.number,
    title: item.title || 'Untitled pull request',
    state: mergedAt ? 'MERGED' : String(item.state || 'open').toUpperCase(),
    isDraft: item.draft === true,
    createdAt: item.created_at || null,
    updatedAt: item.updated_at || null,
    mergedAt,
    closedAt: item.closed_at || null,
    url: item.html_url,
    author: item.user?.login || null,
    labels: (item.labels || []).map((label) => label.name).filter(Boolean),
  }
}

function restIssueModel(item, username) {
  const repoName = restRepoName(item)
  return {
    id: (repoName || 'repository') + '#' + item.number,
    repoName,
    repoOwner: repoName?.split('/')[0] || null,
    number: item.number,
    title: item.title || 'Untitled issue',
    state: String(item.state || 'open').toUpperCase(),
    myRole: item.user?.login === username ? 'opened' : 'commented',
    createdAt: item.created_at || null,
    updatedAt: item.updated_at || null,
    closedAt: item.closed_at || null,
    url: item.html_url,
    author: item.user?.login || null,
    assignees: (item.assignees || []).map((assignee) => assignee.login).filter(Boolean),
    labels: (item.labels || []).map((label) => label.name).filter(Boolean),
  }
}

function restTimelineModel(item, isPR) {
  const repoName = restRepoName(item)
  const mergedAt = item?.pull_request?.merged_at || null
  const state = mergedAt ? 'MERGED' : String(item.state || 'open').toUpperCase()
  return {
    id: (repoName || 'repository') + '#' + item.number,
    type: isPR ? 'PULL_REQUEST' : 'ISSUE',
    repoName,
    org: repoName?.split('/')[0] || null,
    number: item.number,
    title: item.title || (isPR ? 'Untitled pull request' : 'Untitled issue'),
    state,
    isDraft: item.draft === true,
    date: restIssueTime(item),
    url: item.html_url,
    action: isPR
      ? mergedAt ? 'Merged pull request' : item.draft ? 'Draft pull request' : state === 'CLOSED' ? 'Closed pull request' : 'Opened pull request'
      : 'Opened issue',
  }
}

async function searchAuthored(username, qualifiers, perPage = 100) {
  // Open Source pages intentionally focus on outside contributions, not PRs in the user's own repositories.
  const query = encodeURIComponent('author:' + username + ' -user:' + username + ' ' + qualifiers)
  return ghRest('/search/issues?q=' + query + '&per_page=' + perPage + '&sort=updated&order=desc')
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
  const { data, fetchedAt, stale } = await cached(
    'organizations:' + username,
    TTL.organizations,
    async () => {
      if (hasToken()) {
        try {
          const result = await ghGraphQL(ORG_DISCOVERY_QUERY, { login: username, first: 100 })
          if (result?.user) return toOrganizations(result, username)
        } catch {
          // The public REST fallback still provides useful, verifiable PR data.
        }
      }

      const search = await searchAuthored(username, 'is:pr')
      const groups = new Map()

      for (const item of search.items || []) {
        const repoName = restRepoName(item)
        if (!repoName) continue
        const [login] = repoName.split('/')
        if (!login || login.toLowerCase() === username.toLowerCase()) continue

        const date = restIssueTime(item)
        let group = groups.get(login)
        if (!group) {
          group = { login, repos: new Set(), prCount: 0, latestActivity: null }
          groups.set(login, group)
        }
        group.prCount += 1
        group.repos.add(repoName)
        if (date && (!group.latestActivity || new Date(date) > new Date(group.latestActivity))) {
          group.latestActivity = date
        }
      }

      // Confirm each owner is a GitHub organization; never guess from a repo name.
      const candidates = Array.from(groups.values())
        .sort((a, b) => {
          if (b.prCount !== a.prCount) return b.prCount - a.prCount
          return new Date(b.latestActivity || 0) - new Date(a.latestActivity || 0)
        })
        .slice(0, 16)

      const profiles = await Promise.allSettled(
        candidates.map((group) => ghRest('/orgs/' + encodeURIComponent(group.login))),
      )

      return profiles
        .map((result) => {
          if (result.status !== 'fulfilled') return null
          const organization = result.value
          const group = groups.get(organization.login)
          if (!group) return null
          return {
            login: organization.login,
            name: organization.name || organization.login,
            avatarUrl: organization.avatar_url || null,
            description: organization.description || null,
            url: organization.html_url || ('https://github.com/' + organization.login),
            contributionCount: group.prCount,
            prCount: group.prCount,
            issueCount: 0,
            repoCount: group.repos.size,
            repositories: Array.from(group.repos).sort(),
            latestActivity: group.latestActivity,
          }
        })
        .filter(Boolean)
        .sort((a, b) => {
          const dateDifference = new Date(b.latestActivity || 0) - new Date(a.latestActivity || 0)
          return dateDifference || b.prCount - a.prCount
        })
    },
  )
  return { data, fetchedAt, stale }
}

async function loadOrganizationDetail(username, orgLogin) {
  const cacheKey = 'orgDetail:' + username + ':' + orgLogin
  const { data, fetchedAt, stale } = await cached(
    cacheKey,
    TTL.orgDetail,
    async () => {
      if (hasToken()) {
        try {
          const result = await ghGraphQL(ORG_DETAIL_QUERY, { login: orgLogin })
          if (result?.organization) return toOrganizationDetail(result)
        } catch {
          // Public organization and repository metadata is available through REST.
        }
      }

      const organization = await ghRest('/orgs/' + encodeURIComponent(orgLogin))
      const repoResponse = await ghRest(
        '/orgs/' + encodeURIComponent(orgLogin) + '/repos?per_page=100&type=public&sort=pushed',
      ).catch(() => [])

      const repositories = (Array.isArray(repoResponse) ? repoResponse : [])
        .map((repo) => ({
          name: repo.name,
          nameWithOwner: repo.full_name,
          description: repo.description || null,
          language: repo.language || null,
          languageColor: null,
          stars: repo.stargazers_count ?? 0,
          forks: repo.forks_count ?? 0,
          updatedAt: repo.updated_at || null,
          url: repo.html_url,
        }))

      return {
        login: organization.login,
        name: organization.name || organization.login,
        avatarUrl: organization.avatar_url || null,
        description: organization.description || null,
        url: organization.html_url || ('https://github.com/' + organization.login),
        publicRepos: repositories,
      }
    },
  )
  return { data, fetchedAt, stale }
}

async function loadOrgPRs(username, orgLogin, params) {
  const cacheKey = 'orgPRs:' + username + ':' + orgLogin
  const { data, fetchedAt, stale } = await cached(
    cacheKey,
    TTL.orgPRs,
    async () => {
      if (hasToken()) {
        try {
          const result = await ghGraphQL(ORG_PRS_QUERY, { login: username, first: 100 })
          if (result?.user) {
            const prs = (result.user?.pullRequests?.nodes ?? []).filter(
              (pr) => pr && pr.repository?.owner?.login === orgLogin,
            )
            return toContributionPRModel(prs)
          }
        } catch {
          // Fall back to the public issue-search endpoint below.
        }
      }
      const result = await searchAuthored(username, 'org:' + orgLogin + ' is:pr')
      return (result.items || []).map(restPRModel)
    },
  )
  return { data, fetchedAt, stale }
}

async function loadOrgIssues(username, orgLogin, params) {
  const cacheKey = 'orgIssues:' + username + ':' + orgLogin
  const { data, fetchedAt, stale } = await cached(
    cacheKey,
    TTL.orgIssues,
    async () => {
      if (hasToken()) {
        try {
          const result = await ghGraphQL(ORG_ISSUES_QUERY, { login: username, first: 100 })
          if (result?.user) {
            const issues = (result.user?.issues?.nodes ?? []).filter(
              (issue) => issue && issue.repository?.owner?.login === orgLogin,
            )
            return toContributionIssueModel(issues, username)
          }
        } catch {
          // Fall back to public issues authored by this user in the organization.
        }
      }
      const result = await searchAuthored(username, 'org:' + orgLogin + ' is:issue')
      return (result.items || []).map((item) => restIssueModel(item, username))
    },
  )
  return { data, fetchedAt, stale }
}

async function loadTimeline(username) {
  const { data, fetchedAt, stale } = await cached(
    'timeline:' + username,
    TTL.timeline,
    async () => {
      if (hasToken()) {
        try {
          const result = await ghGraphQL(CONTRIBUTION_TIMELINE_QUERY, { login: username, first: 30 })
          if (result?.user) return toTimelineEvents(result, username)
        } catch {
          // Use real public PR/issue records if authenticated GraphQL is unavailable.
        }
      }

      const [prs, issues] = await Promise.all([
        searchAuthored(username, 'is:pr', 30),
        searchAuthored(username, 'is:issue', 30),
      ])
      return [
        ...(prs.items || []).map((item) => restTimelineModel(item, true)),
        ...(issues.items || []).map((item) => restTimelineModel(item, false)),
      ]
        .filter((event) => event.url && event.date && event.repoName)
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 30)
    },
  )
  return { data, fetchedAt, stale }
}

async function loadSummary(username) {
  const { data, fetchedAt, stale } = await cached(
    'summary:' + username,
    TTL.summary,
    async () => {
      if (hasToken()) {
        try {
          const [timelineResult, orgResult] = await Promise.all([
            ghGraphQL(CONTRIBUTION_TIMELINE_QUERY, { login: username, first: 100 }),
            ghGraphQL(ORG_DISCOVERY_QUERY, { login: username, first: 100 }),
          ])
          if (timelineResult?.user) {
            const summary = toSummaryCounts(timelineResult, username)
            summary.organizations = toOrganizations(orgResult, username).length
            return summary
          }
        } catch {
          // Count only values the public search API can verify.
        }
      }

      const [allPRs, openedIssues] = await Promise.all([
        searchAuthored(username, 'is:pr', 1),
        searchAuthored(username, 'is:issue', 1),
      ])
      return {
        totalPRs: allPRs.total_count ?? 0,
        openedIssues: openedIssues.total_count ?? 0,
      }
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
    loadOrgPRs(username, params.get('org'), params),
  'org-issues': (username, params) =>
    loadOrgIssues(username, params.get('org'), params),
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