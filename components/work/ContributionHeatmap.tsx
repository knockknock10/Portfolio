import styles from "./WorkExperience.module.css"
import type { ContributionCalendar } from "@/lib/work"

type ContributionHeatmapProps = { calendar: ContributionCalendar | null }

export function ContributionHeatmap({ calendar }: ContributionHeatmapProps) {
  if (!calendar || !calendar.weeks.length) return null

  const days = calendar.weeks.flatMap((week) => week.contributionDays)
  if (!days.length) return null
  const total =
    typeof calendar.totalContributions === "number"
      ? calendar.totalContributions
      : days.reduce((sum, day) => sum + day.contributionCount, 0)
  const max = Math.max(1, ...days.map((day) => day.contributionCount))
  const firstYear = days[0]?.date.slice(0, 4) ?? ""
  const lastYear = days.at(-1)?.date.slice(0, 4) ?? firstYear
  const period = firstYear === lastYear ? firstYear : `${firstYear}–${lastYear}`
  const today = new Date().toISOString().slice(0, 10)
  const cellSize = 8
  const gap = 4
  const stride = cellSize + gap
  const svgWidth = calendar.weeks.length * stride - gap
  const svgHeight = 7 * stride - gap

  return (
    <section className={styles.heatmapBlock} aria-labelledby="contribution-heatmap-title">
      <header className={styles.heatmapHeader}>
        <h2 id="contribution-heatmap-title" className={styles.heatmapTitle}>
          Contribution activity
        </h2>
        <p className={styles.heatmapTotal}>
          {new Intl.NumberFormat("en-US").format(total)} contributions · {period}
        </p>
      </header>
      <div className={styles.heatmapScroller}>
        <svg
          className={styles.heatmapSvg}
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          role="grid"
          aria-label={`GitHub contribution calendar for ${period}, ${total} total contributions`}
        >
          {calendar.weeks.map((week, weekIndex) =>
            week.contributionDays.map((day, dayIndex) => {
              const weekday = typeof day.weekday === "number" ? day.weekday : dayIndex
              const level =
                day.contributionCount === 0
                  ? 0
                  : Math.min(4, Math.max(1, Math.ceil((day.contributionCount / max) * 4)))
              const isToday = day.date === today
              return (
                <rect
                  key={day.date}
                  className={`${styles.heatmapCell} ${styles[`level${level}`]}${isToday ? ` ${styles.todayCell}` : ""}`}
                  x={weekIndex * stride}
                  y={weekday * stride}
                  width={cellSize}
                  height={cellSize}
                  tabIndex={0}
                  role="gridcell"
                  aria-label={`${day.date}: ${day.contributionCount} contributions`}
                >
                  <title>{`${day.date}: ${day.contributionCount} contributions`}</title>
                </rect>
              )
            }),
          )}
        </svg>
      </div>
    </section>
  )
}
