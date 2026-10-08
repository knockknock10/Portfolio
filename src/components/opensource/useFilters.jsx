import { useContext } from 'react'
import { FilterContext } from './FilterContext.jsx'

/**
 * Consumes the filter context. Must be used inside FilterProvider.
 */
export function useFilters() {
  const ctx = useContext(FilterContext)
  if (!ctx) throw new Error('useFilters must be used within FilterProvider')
  return ctx
}
