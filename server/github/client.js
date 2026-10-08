/**
 * GitHub HTTP client — server-side only.
 *
 * SECURITY: the token (GITHUB_TOKEN / GH_TOKEN) is read from process.env here
 * and attached to outgoing server→GitHub requests only. It never appears in
 * responses, frontend code, or the built bundle.
 */

import { GitHubError } from './cache.js'

const API_BASE = () => process.env.GITHUB_API_BASE || 'https://api.github.com'
const TIMEOUT_MS = 8000

function serverToken() {
  return process.env.GITHUB_TOKEN || process.env.GH_TOKEN || ''
}

function baseHeaders() {
  const headers = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'User-Agent': 'sanjeev-portfolio-server',
  }
  const token = serverToken()
  if (token) headers.Authorization = `Bearer ${token}`
  return headers
}

function mapHttpError(status) {
  if (status === 404) return new GitHubError('not_found', 'GitHub account not found', 404)
  if (status === 403 || status === 429) {
    return new GitHubError('rate_limited', 'GitHub API rate limit reached', 429)
  }
  if (status >= 500) return new GitHubError('unavailable', 'GitHub is unavailable', 503)
  return new GitHubError('unavailable', `Unexpected GitHub response (${status})`, 503)
}

async function request(url, options = {}) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)
  try {
    const response = await fetch(url, { ...options, signal: controller.signal })
    if (!response.ok) throw mapHttpError(response.status)
    try {
      return await response.json()
    } catch {
      throw new GitHubError('malformed', 'GitHub returned a malformed response', 503)
    }
  } catch (error) {
    if (error instanceof GitHubError) throw error
    if (error?.name === 'AbortError') {
      throw new GitHubError('timeout', 'GitHub request timed out', 503)
    }
    throw new GitHubError('unavailable', 'Could not reach GitHub', 503)
  } finally {
    clearTimeout(timer)
  }
}

/** REST GET against api.github.com — returns parsed JSON. */
export async function ghRest(path) {
  return request(`${API_BASE()}${path}`, { headers: baseHeaders() })
}

/** GraphQL POST — returns the `data` object or throws on any error. */
export async function ghGraphQL(query, variables) {
  const body = await request(`${API_BASE()}/graphql`, {
    method: 'POST',
    headers: { ...baseHeaders(), 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
  })
  if (body.errors?.length && !body.data) {
    throw new GitHubError('unavailable', 'GitHub GraphQL error', 503)
  }
  return body.data
}

/** True when a token is configured (used to decide if calendar data is possible). */
export function hasToken() {
  return Boolean(serverToken())
}
