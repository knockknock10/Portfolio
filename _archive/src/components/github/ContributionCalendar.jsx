import { useRef, useState, useCallback } from 'react'
import { DEFAULT_GITHUB_USERNAME } from '../../../shared/github-config.js'

/**
 * ContributionCalendar — native GitHub contribution graph built for this portfolio.
 *
 * Data shape (from /api/github?resource=contributions):
 * {
 *   year: number,
 *   total: number,
 *   weeks: Day[][] (53 weeks × up to 7 days, Sunday-first),
 *   totals: { commits, pullRequests, issues, reviews, repositories }
 * }
 *
 * Each day: { date: 'YYYY-MM-DD', count: number, level: 0-4 }
 */

const LEVEL_COLORS = [
  'var(--color-contrib-0, #0D1117)', // none
  'var(--color-contrib-1, #0D3B2E)', // first quartile
  'var(--color-contrib-2, #196B45)', // second quartile
  'var(--color-contrib-3, #2DA44E)', // third quartile
  'var(--color-contrib-4, #3FB950)', // fourth quartile
]

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function formatDate(dateStr) {
  if (!dateStr) return ''
  const d = new Date(`${dateStr}T00:00:00`)
  return d.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })
}

function ContributionCell({ day, weekIdx, dayIdx, onFocus, onHover, onLeave, tabIndex }) {
  const level = day.level ?? 0
  const count = day.count ?? 0
  const date = day.date ?? ''
  const fill = LEVEL_COLORS[Math.min(level, 4)]

  // Calculate day of week safely from date
  const dayOfWeek = date ? new Date(`${date}T00:00:00`).getDay() : dayIdx

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onFocus?.(day)
    }
  }

  return (
    <rect
      x={weekIdx * 13 + 1}
      y={dayOfWeek * 13 + 1}
      width={10.5}
      height={10.5}
      rx={2}
      ry={2}
      fill={fill}
      tabIndex={tabIndex ? 0 : -1}
      role="button"
      className="transition-all duration-150 hover:stroke-accent/70 hover:stroke-[1px] cursor-pointer outline-none focus-visible:stroke-accent focus-visible:stroke-[1.5px]"
      aria-label={count ? `${formatDate(date)}: ${count} contribution${count !== 1 ? 's' : ''}` : `No contributions on ${formatDate(date)}`}
      onFocus={(_event) => onFocus?.(day)}
      onBlur={() => onLeave?.()}
      onMouseEnter={(e) => onHover?.(day, e)}
      onMouseLeave={() => onLeave?.()}
      onKeyDown={handleKeyDown}
    />
  )
}

function MonthLabels({ weeks }) {
  const firstDays = new Map()
  weeks.forEach((week, wIdx) => {
    week.forEach((day) => {
      const date = day.date
      if (!date) return
      const d = new Date(`${date}T00:00:00`)
      const month = d.getMonth()
      if (d.getDate() <= 7 && !firstDays.has(month)) {
        firstDays.set(month, wIdx)
      }
    })
  })

  return (
    <g aria-hidden="true" fontFamily="var(--font-mono, monospace)" fontSize="10" fill="var(--color-dim, #71717A)">
      {Array.from(firstDays.entries()).map(([month, weekIdx]) => (
        <text key={month} x={weekIdx * 13 + 6} y={-5} textAnchor="start">
          {MONTHS[month]}
        </text>
      ))}
    </g>
  )
}

function DayLabels() {
  return (
    <g aria-hidden="true" fontFamily="var(--font-mono, monospace)" fontSize="9" fill="var(--color-dim, #71717A)">
      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, i) =>
        i % 2 === 1 ? (
          <text key={day} x={-8} y={i * 13 + 9} textAnchor="end">
            {day}
          </text>
        ) : null
      )}
    </g>
  )
}

function Tooltip({ day, position }) {
  if (!day) return null
  const count = day.count ?? 0
  const date = day.date ?? ''

  const [x, y] = position
  return (
    <div
      className="pointer-events-none absolute z-50 rounded-lg px-3 py-2 bg-panel-raised border border-white/10 text-xs shadow-xl backdrop-blur-md -translate-x-1/2 -translate-y-full"
      style={{ left: Math.max(80, x), top: Math.max(30, y - 8) }}
    >
      <p className="font-medium text-fg">{formatDate(date)}</p>
      <p className="font-mono text-[11px] text-accent mt-0.5 font-semibold">
        {count ? `${count} contribution${count !== 1 ? 's' : ''}` : 'No contributions'}
      </p>
    </div>
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
  const containerRef = useRef(null)

  const handleCellFocus = useCallback((day) => setFocusedDay(day), [])
  const handleCellHover = useCallback((day, e) => {
    if (!e || !containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
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
        <div className="grid grid-cols-53 gap-1 max-w-full overflow-x-auto py-4" aria-hidden="true">
          {Array.from({ length: 53 }, (_, w) =>
            Array.from({ length: 7 }, (_, d) => (
              <div key={`${w}-${d}`} className="h-2.5 w-2.5 rounded-sm bg-line animate-pulse" />
            ))
          )}
        </div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="w-full" role="alert">
        <div className="rounded-xl border border-line bg-panel p-6 text-center">
          <p className="text-muted text-sm">GitHub activity is temporarily unavailable.</p>
          <a
            href={`https://github.com/${DEFAULT_GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block text-xs font-mono text-accent underline-offset-4 hover:underline"
          >
            View GitHub profile ↗
          </a>
        </div>
      </div>
    )
  }

  const totalContributions = data.total ?? 0
  const weeks = data.weeks ?? []
  const weekCount = Math.max(weeks.length, 52)
  const svgWidth = weekCount * 13 + 40
  const svgHeight = 112

  const activeDay = hoveredDay || focusedDay

  return (
    <div className="w-full relative" ref={containerRef}>
      {/* Year selector & Header */}
      {availableYears?.length > 1 && (
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] tracking-[0.18em] text-dim uppercase">Year</span>
            <select
              value={year}
              onChange={(e) => onYearChange(Number(e.target.value))}
              className="flex h-8 items-center rounded-lg px-3 font-mono text-[12px] text-fg glass-control focus:outline-none focus-visible:ring-2 focus-visible:ring-accent appearance-none cursor-pointer"
              style={{
                backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%2371717a' strokeWidth='1.5' fill='none' strokeLinecap='round'/%3E%3C/svg%3E\")",
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 8px center',
                paddingRight: '24px',
              }}
              aria-label="Select contribution year"
            >
              {availableYears.map((y) => (
                <option key={y} value={y} style={{ background: '#0D0F12' }}>{y}</option>
              ))}
            </select>
          </div>

          <span className="font-mono text-xs text-dim tabular-nums">
            <span className="text-fg font-medium">{totalContributions.toLocaleString()}</span> contributions
          </span>
        </div>
      )}

      {/* Calendar SVG with local horizontal scroll wrapper */}
      <div
        className="relative max-w-full overflow-x-auto pb-2"
        role="img"
        aria-label={`GitHub contribution calendar for ${year} — ${totalContributions} total contributions`}
        style={{ scrollbarWidth: 'thin' }}
      >
        <svg
          width={svgWidth}
          height={svgHeight}
          viewBox={`-28 -14 ${svgWidth} ${svgHeight}`}
          className="block"
        >
          <DayLabels />
          <MonthLabels weeks={weeks} />
          <g>
            {weeks.map((week, wIdx) =>
              week.map((day, dIdx) => (
                <ContributionCell
                  key={day.date || `${wIdx}-${dIdx}`}
                  day={day}
                  weekIdx={wIdx}
                  dayIdx={dIdx}
                  onFocus={handleCellFocus}
                  onHover={handleCellHover}
                  onLeave={handleCellLeave}
                  tabIndex={true}
                />
              ))
            )}
          </g>
        </svg>
      </div>

      {/* HTML Floating Tooltip */}
      <Tooltip day={activeDay} position={tooltipPos} />

      {/* Legend */}
      <div className="mt-3 flex flex-wrap items-center gap-3 text-[11px] text-muted">
        <span className="font-mono tracking-[0.16em] uppercase text-dim text-[10px]">Less</span>
        <div className="flex items-center gap-1" aria-hidden="true">
          {LEVEL_COLORS.map((color, i) => (
            <div key={i} className="size-2.5 rounded-sm" style={{ backgroundColor: color }} />
          ))}
        </div>
        <span className="font-mono tracking-[0.16em] uppercase text-dim text-[10px]">More</span>
      </div>

      {stale && (
        <p className="mt-2 text-[11px] text-dim" aria-live="polite">
          Showing cached data — live refresh pending.
        </p>
      )}
    </div>
  )
}