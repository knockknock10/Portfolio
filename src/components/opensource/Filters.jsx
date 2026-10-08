import { useFilters } from './useFilters.jsx'

/**
 * Filter controls for organizations, type, and state.
 * Works on pre-loaded data (client-side filtering).
 */

const TYPE_OPTIONS = [
  { value: 'all', label: 'All contributions' },
  { value: 'PULL_REQUEST', label: 'Pull requests' },
  { value: 'ISSUE', label: 'Issues' },
  { value: 'REVIEW', label: 'Reviews' },
]

const STATE_OPTIONS = [
  { value: 'all', label: 'All states' },
  { value: 'OPEN', label: 'Open' },
  { value: 'MERGED', label: 'Merged' },
  { value: 'CLOSED', label: 'Closed' },
]

function FilterSelect({ label, value, options, onChange, name }) {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor={name} className="font-mono text-[11px] uppercase tracking-[0.18em] text-dim shrink-0">
        {label}
      </label>
      <select
        id={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex h-9 min-w-[140px] items-center rounded-md border border-line bg-panel px-3 text-sm text-fg focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
        aria-label={label}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export function FilterBar() {
  const { filters, setFilters, filteredEvents, orgOptions } = useFilters()

  return (
    <div className="flex flex-wrap items-center gap-3 mb-6 p-4 rounded-lg border border-line bg-panel">
      <FilterSelect
        label="Org"
        value={filters.org}
        options={orgOptions.map((o) => ({ value: o, label: o === 'all' ? 'All' : o }))}
        onChange={(v) => setFilters((f) => ({ ...f, org: v }))}
        name="org-filter"
      />
      <FilterSelect
        label="Type"
        value={filters.type}
        options={TYPE_OPTIONS}
        onChange={(v) => setFilters((f) => ({ ...f, type: v }))}
        name="type-filter"
      />
      <FilterSelect
        label="State"
        value={filters.state}
        options={STATE_OPTIONS}
        onChange={(v) => setFilters((f) => ({ ...f, state: v }))}
        name="state-filter"
      />
      <span className="ml-auto font-mono text-[11px] text-dim">
        {filteredEvents.length} results
      </span>
    </div>
  )
}
