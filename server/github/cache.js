/**
 * In-memory TTL cache for GitHub responses.
 *
 * - Fresh entries are served without touching GitHub.
 * - Concurrent misses share one in-flight request (no duplicate GitHub calls).
 * - Transient failures (rate limit, outage, timeout) fall back to the last
 *   known value with `stale: true`, so the site can show real data with a
 *   freshness timestamp instead of an error — but never a fake number.
 */

const entries = new Map()

export class GitHubError extends Error {
  constructor(code, message, status = 500) {
    super(message)
    this.name = 'GitHubError'
    this.code = code
    this.status = status
  }
}

const TRANSIENT_CODES = new Set(['rate_limited', 'unavailable', 'timeout', 'malformed', 'forbidden'])

export async function cached(key, ttlMs, loader) {
  const now = Date.now()
  let entry = entries.get(key)
  if (!entry) {
    entry = { value: null, at: 0, inflight: null }
    entries.set(key, entry)
  }

  if (entry.value && now - entry.at < ttlMs) {
    return { data: entry.value, fetchedAt: entry.at, stale: false }
  }

  if (!entry.inflight) {
    entry.inflight = loader()
      .then((value) => {
        entry.value = value
        entry.at = Date.now()
        entry.inflight = null
        return value
      })
      .catch((error) => {
        entry.inflight = null
        throw error
      })
  }

  try {
    const value = await entry.inflight
    return { data: value, fetchedAt: entry.at, stale: false }
  } catch (error) {
    if (entry.value && error instanceof GitHubError && TRANSIENT_CODES.has(error.code)) {
      return { data: entry.value, fetchedAt: entry.at, stale: true }
    }
    throw error
  }
}

/** Test helper — clears all cached entries. */
export function clearCache() {
  entries.clear()
}
