import { createContext } from 'react'

/**
 * Filter context — consumed via useFilters, provided by FilterProvider.
 * Kept in its own module so component files only export components.
 */
export const FilterContext = createContext(null)
