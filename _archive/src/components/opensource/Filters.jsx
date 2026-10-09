import { useFilters } from './useFilters.jsx'

/**
 * Filter controls for organizations, type, and state.
 * Uses glass-control material — the right place for translucency.
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
      <label
        htmlFor={name}
        className="font-mono text-[10px] uppercase tracking-[0.18em] text-dim shrink-0"
      >
        {label}
      </label>
      <select
        id={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={[
          'flex h-8 min-w-[130px] items-center rounded-lg px-3',
          'text-[12px] text-fg font-mono',
          'glass-control',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1 focus-visible:ring-offset-bg',
          'appearance-none cursor-pointer',
        ].join(' ')}
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'10\' height=\'6\' viewBox=\'0 0 10 6\'%3E%3Cpath d=\'M1 1l4 4 4-4\' stroke=\'%2371717a\' strokeWidth=\'1.5\' fill=\'none\' strokeLinecap=\'round\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 8px center' }}
        aria-label={label}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} style={{ background: '#0D0F12' }}>
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
    <div className="flex flex-wrap items-center gap-3 mb-6 p-3.5 rounded-xl glass-control">
      <FilterSelect
        label="Org"
        value={filters.org}
        options={orgOptions.map((o) => ({ value: o, label: o === 'all' ? 'All orgs' : o }))}
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
      <span className="ml-auto font-mono text-[11px] text-dim tabular-nums">
        {filteredEvents.length} result{filteredEvents.length !== 1 ? 's' : ''}
      </span>
    </div>
  )
}
