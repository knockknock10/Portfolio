"use client"

import { useEffect, useMemo, useRef, useState } from "react"

type Day = { date: string; count: number; level: number }
type Payload = { total?: Record<string, number>; contributions?: Day[] }

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? ""
const LIVE_SOURCE = "https://github-contributions-api.jogruber.de/v4/knockknock10?y=all"
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
const CELL = 12
const GAP = 4

async function load(): Promise<Payload | null> {
  // 1) the snapshot written when the site was built, 2) the live public source.
  for (const url of [`${BASE}/api/github-contributions.json`, LIVE_SOURCE]) {
    try {
      const response = await fetch(url, { headers: { Accept: "application/json" } })
      if (!response.ok) continue
      const data = (await response.json()) as Payload
      if (Array.isArray(data.contributions) && data.contributions.length) return data
    } catch {
      // try the next source
    }
  }
  return null
}

function weeksFor(days: Day[]) {
  const weeks: (Day | null)[][] = []
  let week: (Day | null)[] = []
  const first = new Date(days[0].date + "T00:00:00Z").getUTCDay()
  for (let i = 0; i < first; i += 1) week.push(null)
  for (const day of days) {
    week.push(day)
    if (week.length === 7) {
      weeks.push(week)
      week = []
    }
  }
  if (week.length) {
    while (week.length < 7) week.push(null)
    weeks.push(week)
  }
  return weeks
}

export function ContributionGraph({ profileUrl }: { profileUrl: string }) {
  const [data, setData] = useState<Payload | null>(null)
  const [state, setState] = useState<"loading" | "ready" | "error">("loading")
  const [year, setYear] = useState<string>("last")
  const [hover, setHover] = useState<{ day: Day; x: number; y: number } | null>(null)
  const scroller = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let alive = true
    load().then((payload) => {
      if (!alive) return
      setData(payload)
      setState(payload ? "ready" : "error")
    })
    return () => {
      alive = false
    }
  }, [])

  const years = useMemo(() => {
    if (!data?.contributions) return []
    return Array.from(new Set(data.contributions.map((d) => d.date.slice(0, 4)))).sort().reverse()
  }, [data])

  const days = useMemo(() => {
    if (!data?.contributions) return []
    const all = [...data.contributions].sort((a, b) => a.date.localeCompare(b.date))
    if (year === "last") {
      const end = all[all.length - 1]?.date ?? ""
      const start = new Date(end + "T00:00:00Z")
      start.setUTCFullYear(start.getUTCFullYear() - 1)
      start.setUTCDate(start.getUTCDate() + 1)
      const from = start.toISOString().slice(0, 10)
      return all.filter((d) => d.date >= from)
    }
    return all.filter((d) => d.date.startsWith(year))
  }, [data, year])

  useEffect(() => {
    // On narrow screens start at the most recent weeks.
    const el = scroller.current
    if (el) el.scrollLeft = el.scrollWidth
  }, [days])

  const total = days.reduce((sum, d) => sum + d.count, 0)
  const weeks = useMemo(() => (days.length ? weeksFor(days) : []), [days])
  const width = weeks.length * (CELL + GAP) - GAP
  const height = 7 * (CELL + GAP) - GAP + 20

  const monthLabels = useMemo(() => {
    const labels: { x: number; text: string }[] = []
    let last = -1
    weeks.forEach((week, index) => {
      const first = week.find(Boolean)
      if (!first) return
      const month = Number(first.date.slice(5, 7)) - 1
      if (month !== last && index * (CELL + GAP) < weeks.length * (CELL + GAP) - 36 && (index === 0 || week.some((d) => d && d.date.slice(8, 10) <= "07"))) {
        labels.push({ x: index * (CELL + GAP), text: MONTHS[month] })
        last = month
      }
    })
    return labels
  }, [weeks])

  return (
    <div className="gl-panel gl-graph" data-state={state}>
      <div className="gl-graph__head">
        <div>
          <h3>Contribution graph</h3>
          <p>
            {state === "ready"
              ? `${total.toLocaleString("en-US")} contributions ${year === "last" ? "in the last year" : `in ${year}`}`
              : state === "loading"
                ? "Loading activity from GitHub…"
                : "The activity feed isn't available right now."}
          </p>
        </div>
        {state === "ready" ? (
          <div className="gl-segment" role="group" aria-label="Choose a period">
            {["last", ...years.slice(0, 4)].map((value) => (
              <button
                type="button"
                key={value}
                aria-pressed={year === value}
                onClick={() => setYear(value)}
              >
                {value === "last" ? "Last year" : value}
              </button>
            ))}
          </div>
        ) : null}
      </div>

      {state === "ready" ? (
        <div className="gl-graph__scroller" ref={scroller}>
          <svg
            className="gl-graph__svg"
            viewBox={`0 0 ${width} ${height}`}
            width={width}
            height={height}
            role="img"
            aria-label={`GitHub contribution calendar, ${total} contributions`}
            onMouseLeave={() => setHover(null)}
          >
            {monthLabels.map((label) => (
              <text key={label.x + label.text} x={label.x} y={11} className="gl-graph__month">
                {label.text}
              </text>
            ))}
            {weeks.map((week, wi) =>
              week.map((day, di) =>
                day ? (
                  <rect
                    key={day.date}
                    className="gl-cell"
                    data-level={day.level}
                    x={wi * (CELL + GAP)}
                    y={20 + di * (CELL + GAP)}
                    width={CELL}
                    height={CELL}
                    rx={4}
                    onMouseEnter={(event) => {
                      const box = (event.currentTarget.ownerSVGElement as SVGSVGElement).getBoundingClientRect()
                      const rect = event.currentTarget.getBoundingClientRect()
                      setHover({ day, x: rect.left - box.left + CELL / 2, y: rect.top - box.top })
                    }}
                  />
                ) : null,
              ),
            )}
          </svg>
          {hover ? (
            <div className="gl-tip" style={{ left: hover.x, top: hover.y }} role="status">
              <strong>
                {hover.day.count} contribution{hover.day.count === 1 ? "" : "s"}
              </strong>
              <span>
                {new Date(hover.day.date + "T00:00:00Z").toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                  timeZone: "UTC",
                })}
              </span>
            </div>
          ) : null}
        </div>
      ) : state === "error" ? (
        <p className="gl-graph__fallback">
          <a className="sk-text-link" href={profileUrl} target="_blank" rel="noreferrer">
            See the full contribution graph on GitHub
          </a>
        </p>
      ) : (
        <div className="gl-graph__skeleton" aria-hidden="true" />
      )}

      <div className="gl-graph__legend">
        <span>Less</span>
        {[0, 1, 2, 3, 4].map((level) => (
          <i key={level} className="gl-cell gl-cell--legend" data-level={level} />
        ))}
        <span>More</span>
      </div>
    </div>
  )
}
