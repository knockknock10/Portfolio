import { useEffect, useState, useCallback } from 'react'
import {
  fetchOrganizations,
  fetchOrgPRs,
  fetchOrgIssues,
  fetchTimeline,
  fetchSummary,
  fetchOrganization,
} from '../lib/github.js'

/**
 * Normalize one entry of a Promise.allSettled result into a
 * `{ data, loading, error, stale }` slice.
 *
 * The API responds with `{ ok, data, fetchedAt, stale }` on success and throws
 * (rejecting the promise) on failure, so a rejected entry has no `.value` at
 * all. Every field below has to be read through a `fulfilled` guard — touching
 * `.value` unconditionally is what used to throw a TypeError and blank the page.
 *
 * `stale` lives at the top level of the response body, not inside `data`.
 */
function toSlice(result, fallback) {
  if (result.status !== 'fulfilled') {
    return { data: fallback, loading: false, error: result.reason ?? null, stale: false }
  }
  const body = result.value
  const ok = body?.ok !== false
  return {
    data: (ok ? body?.data : null) ?? fallback,
    loading: false,
    error: ok ? null : (body?.error ?? null),
    stale: body?.stale ?? false,
  }
}

/**
 * Hook for the main /open-source page — organizations + summary + timeline.
 */
export function useOpenSource() {
  const [state, setState] = useState({
    organizations: { data: [], loading: true, error: null, stale: false },
    summary: { data: {}, loading: true, error: null, stale: false },
    timeline: { data: [], loading: true, error: null, stale: false },
  })

  const load = useCallback(async () => {
    setState((s) => ({
      ...s,
      organizations: { ...s.organizations, loading: true },
      summary: { ...s.summary, loading: true },
      timeline: { ...s.timeline, loading: true },
    }))

    const [orgs, summary, timeline] = await Promise.allSettled([
      fetchOrganizations(),
      fetchSummary(),
      fetchTimeline(),
    ])

    setState((s) => ({
      ...s,
      organizations: toSlice(orgs, []),
      summary: toSlice(summary, {}),
      timeline: toSlice(timeline, []),
    }))
  }, [])

  /* eslint-disable react-hooks/set-state-in-effect, react-hooks/exhaustive-deps */
  useEffect(() => {
    load()
  }, [])
  /* eslint-enable */

  return { ...state, refresh: load }
}

/**
 * Hook for organization detail page — PRs, issues, repo list.
 */
export function useOrganizationDetail(org) {
  const [state, setState] = useState({
    org: { data: null, loading: true, error: null, stale: false },
    prs: { data: [], loading: true, error: null, stale: false },
    issues: { data: [], loading: true, error: null, stale: false },
  })

  const load = useCallback(async () => {
    if (!org) return
    setState((s) => ({
      ...s,
      org: { ...s.org, loading: true },
      prs: { ...s.prs, loading: true },
      issues: { ...s.issues, loading: true },
    }))

    const [orgData, prs, issues] = await Promise.allSettled([
      fetchOrganization(org),
      fetchOrgPRs(org),
      fetchOrgIssues(org),
    ])

    setState((s) => ({
      ...s,
      org: toSlice(orgData, null),
      prs: toSlice(prs, []),
      issues: toSlice(issues, []),
    }))
  }, [org])

  /* eslint-disable react-hooks/set-state-in-effect, react-hooks/exhaustive-deps */
  useEffect(() => {
    load()
  }, [])
  /* eslint-enable */

  return { ...state, refresh: load }
}