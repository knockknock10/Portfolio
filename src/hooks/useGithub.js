import { useEffect, useState, useCallback } from 'react'
import { fetchAll } from '../lib/github.js'
import { resolveGithubUsername, githubDisplay } from '../../shared/github-config.js'

/**
 * Single hook for the homepage Proof of Work section.
 * Fetches all GitHub data with loading/error/stale states.
 */
export function useGithubProof() {
  const [state, setState] = useState({
    profile: { data: null, loading: true, error: null, stale: false },
    repos: { data: null, loading: true, error: null, stale: false },
    events: { data: null, loading: true, error: null, stale: false },
    contributions: { data: null, loading: true, error: null, stale: false },
    year: new Date().getUTCFullYear(),
    availableYears: [],
  })

  const username = resolveGithubUsername({})

  const load = useCallback(async (year) => {
    const currentYear = new Date().getUTCFullYear()
    const years = Array.from({ length: githubDisplay.yearCount }, (_, i) => currentYear - i)

    setState((s) => ({
      ...s,
      profile: { ...s.profile, loading: true },
      repos: { ...s.repos, loading: true },
      events: { ...s.events, loading: true },
      contributions: { ...s.contributions, loading: true },
    }))

    const results = await fetchAll(username, year)

    setState((s) => ({
      ...s,
      profile: { data: results.profile.data ?? null, loading: false, error: results.profile.ok ? null : results.profile.error, stale: results.profile.data?.stale ?? false },
      repos: { data: results.repos.data ?? null, loading: false, error: results.repos.ok ? null : results.repos.error, stale: results.repos.data?.stale ?? false },
      events: { data: results.events.data ?? null, loading: false, error: results.events.ok ? null : results.events.error, stale: results.events.data?.stale ?? false },
      contributions: { data: results.contributions.data ?? null, loading: false, error: results.contributions.ok ? null : results.contributions.error, stale: results.contributions.data?.stale ?? false },
      year,
      availableYears: years,
    }))
  }, [username])

  /* eslint-disable react-hooks/exhaustive-deps, react-hooks/set-state-in-effect */
  useEffect(() => {
    load(new Date().getUTCFullYear())
  }, [])
  /* eslint-enable */

  const setYear = useCallback((year) => load(year), [load])

  return { ...state, setYear, username }
}