import { useState, useMemo } from 'react'

import { FilterContext } from './FilterContext.jsx'

/**
 * Provides org / type / state filters over pre-loaded data (client-side filtering).
 */
export function FilterProvider({ children, organizations, events }) {
  const [filters, setFilters] = useState({
    org: 'all',
    type: 'all',
    state: 'all',
  })

  const filteredEvents = useMemo(() => {
    return (events ?? []).filter((event) => {
      if (filters.org !== 'all' && event.org !== filters.org) return false
      if (filters.type !== 'all' && event.type !== filters.type) return false
      if (filters.state !== 'all') {
        const eventState = event.state === 'OPEN' ? 'OPEN' : event.state === 'MERGED' ? 'MERGED' : 'CLOSED'
        if (eventState !== filters.state) return false
      }
      return true
    })
  }, [events, filters])

  const orgOptions = useMemo(
    () => ['all', ...(organizations ?? []).map((o) => o.login)],
    [organizations]
  )

  const contextValue = { filters, setFilters, filteredEvents, orgOptions }

  return <FilterContext.Provider value={contextValue}>{children}</FilterContext.Provider>
}
