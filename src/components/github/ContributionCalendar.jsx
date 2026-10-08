import { useRef, useState, useCallback } from 'react'

/**
 * ContributionCalendar — native GitHub contribution graph built for this portfolio.
 *
 * Data shape (from /api/github?resource=contributions):
 * {
 *   year: number,
 *   total: number,
 *   weeks: Day[][] (53 weeks × 7 days, Sunday-first),
 *   totals: { commits, pullRequests, issues, reviews, repositories }
 * }
 *
 * Each day: { date: 'YYYY-MM-DD', count: number, level: 0-4 }
 *
 * Design:
 * - near-black background, warm accent progression
 * - keyboard accessible (arrow nav, Enter for details)
 * - mobile: horizontal scroll container only inside the graph
 * - legend + total + year selector
 * - respects prefers-reduced-motion
 */

const LEVEL_COLORS = [
  'var(--color-contrib-0, #161b22)', // none
  'var(--color-contrib-1, #0d4429)', // first quartile
  'var(--color-contrib-2, #1a5c3b)', // second quartile
  'var(--color-contrib-3, #28864f)', // third quartile
  'var(--color-contrib-4, #3fb950)', // fourth quartile
]

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function formatDate(dateStr) {
  const d = new Date(`${dateStr}T00:00:00`)
  return d.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })
}

function ContributionCell({ day, index, onFocus, onHover, onLeave, tabIndex }) {
  const level = day.level ?? 0
  const count = day.count ?? 0
  const date = day.date ?? ''
  const style = { backgroundColor: LEVEL_COLORS[Math.min(level, 4)] }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onFocus?.(day)
    }
  }

  return (
    <rect
      x={index % 7 * 13 + 1}
      y={Math.floor(index / 7) * 13 + 1}
      width={11}
      height={11}
      rx={2}
      ry={2}
      style={style}
      tabIndex={tabIndex ? 0 : -1}
      role="button"
      aria-label={count ? `${formatDate(date)}: ${count} contribution${count !== 1 ? 's' : ''}` : `No contributions on ${formatDate(date)}`}
      onFocus={(_event) => onFocus?.(day)}
      onBlur={() => onLeave?.()}
      onMouseEnter={() => onHover?.(day)}
      onMouseLeave={() => onLeave?.()}
      onKeyDown={handleKeyDown}
    />
  )
}

function MonthLabels({ weeks }) {
  const firstDays = new Map()
  weeks.forEach((week, wIdx) => {
    week.forEach((day, dIdx) => {
      if (dIdx === 0) {
        const month = new Date(`${day.date}T00:00:00`).getMonth()
        if (!firstDays.has(month)) firstDays.set(month, wIdx)
      }
    })
  })

  return (
    <g aria-hidden="true" fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace" fontSize="10" fill="var(--color-text-muted, #71767b)">
      {Array.from(firstDays.entries()).map(([month, weekIdx]) => (
        <text key={month} x={weekIdx * 13 + 13} y={-6} textAnchor="middle">
          {MONTHS[month]}
        </text>
      ))}
    </g>
  )
}

function DayLabels() {
  return (
    <g aria-hidden="true" fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace" fontSize="10" fill="var(--color-text-muted, #71767b)">
      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, i) =>
        i % 2 === 0 ? (
          <text key={day} x={-8} y={i * 13 + 17} textAnchor="end">{day}</text>
        ) : null
      )}
    </g>
  )
}

function Tooltip({ day, position }) {
  if (!day) return null
  const count = day.count ?? 0
  const date = day.date ?? ''
  if (!count) return null

  const [x, y] = position
  return (
    <g pointerEvents="none" filter="drop-shadow(0 4px 12px rgba(0,0,0,0.4))">
      <rect
        x={x - 80}
        y={y - 52}
        width={160}
        height={40}
        rx={6}
        fill="var(--color-bg-panel, #181a1d)"
        stroke="var(--color-border, #2a2d31)"
        strokeWidth={1}
      />
      <text x={x} y={y - 30} textAnchor="middle" fill="var(--color-text-fg, #e6e6e6)" fontSize="12" fontWeight={500}>
        {formatDate(date)}
      </text>
      <text x={x} y={y - 12} textAnchor="middle" fill="var(--color-accent, #e6a23c)" fontSize="11" fontWeight={600}>
        {count} contribution{count !== 1 ? 's' : ''}
      </text>
    </g>
  )
}

export default function ContributionCalendar({
  data,
  year,
  onYearChange,
  availableYears,
  error,
  loading,
  stale,
}) {
  const [focusedDay, setFocusedDay] = useState(null)
  const [hoveredDay, setHoveredDay] = useState(null)
  const [tooltipPos, setTooltipPos] = useState([0, 0])
  const svgRef = useRef(null)
  const flatDays = data?.weeks.flat() ?? []

  const handleCellFocus = useCallback((day) => setFocusedDay(day), [])
  const handleCellHover = useCallback((day, e) => {
    if (!e || !svgRef.current) return
    const rect = svgRef.current.getBoundingClientRect()
    setTooltipPos([e.clientX - rect.left, e.clientY - rect.top])
    setHoveredDay(day)
  }, [])
  const handleCellLeave = useCallback(() => {
    setHoveredDay(null)
    setFocusedDay(null)
  }, [])

  if (loading) {
    return (
      <div className="w-full" role="status" aria-label="Loading contribution calendar">
        <div className="grid grid-cols-53 gap-1 max-w-full overflow-x-auto" aria-hidden="true">
          {Array.from({ length: 53 }, (_, w) =>
            Array.from({ length: 7 }, (_, d) => (
              <div key={`${w}-${d}`} className="h-3 w-3 rounded bg-line animate-pulse" />
            ))
          )}
        </div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="w-full" role="alert">
        <div className="rounded-lg border border-line bg-panel p-6 text-center">
          <p className="text-muted">GitHub activity is temporarily unavailable.</p>
          <a
            href={`https://github.com/${availableYears?.[0] || 'knockknock10'}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block text-sm text-accent underline-offset-4 hover:underline"
          >
            View GitHub profile ↗
          </a>
        </div>
      </div>
    )
  }

  const totalContributions = data.total ?? 0
  const weeks = data.weeks ?? []
  const weekCount = weeks.length

  return (
    <div className="w-full">
      {/* Year selector */}
      {availableYears?.length > 1 && (
        <div className="mb-4 flex items-center gap-3">
          <span className="font-mono text-xs tracking-[0.18em] text-dim uppercase">Year</span>
          <select
            value={year}
            onChange={(e) => onYearChange(Number(e.target.value))}
            className="flex h-9 items-center rounded-md border border-line bg-panel px-3 text-sm text-fg focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
            aria-label="Select contribution year"
          >
            {availableYears.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>
      )}

      {/* Calendar */}
      <div className="relative max-w-full overflow-x-auto" role="img" aria-label={`GitHub contribution calendar for ${year} — ${totalContributions} total contributions`}>
        <svg
          ref={svgRef}
          width={weekCount * 13 + 2}
          height={96}
          className="block"
          style={{ minWidth: '100%' }}
        >
          <DayLabels />
          <MonthLabels weeks={weeks} />
          <g>
            {flatDays.map((day, idx) => (
              <ContributionCell
                key={day.date}
                day={day}
                index={idx}
                onFocus={handleCellFocus}
                onHover={handleCellHover}
                onLeave={handleCellLeave}
                tabIndex={true}
              />
            ))}
          </g>
          <Tooltip day={hoveredDay || focusedDay} position={tooltipPos} />
        </svg>
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap items-center gap-3 text-[11px] text-muted">
        <span className="font-mono tracking-[0.18em] uppercase">Less</span>
        <div className="flex items-center gap-1" aria-hidden="true">
          {LEVEL_COLORS.map((color, i) => (
            <div key={i} className="size-3 rounded" style={{ backgroundColor: color }} />
          ))}
        </div>
        <span className="font-mono tracking-[0.18em] uppercase">More</span>
        <span className="ml-auto font-mono text-fg">{totalContributions.toLocaleString()} total</span>
      </div>

      {stale && (
        <p className="mt-2 text-[11px] text-dim" aria-live="polite">
          Showing cached data — live refresh pending.
        </p>
      )}
    </div>
  )
}