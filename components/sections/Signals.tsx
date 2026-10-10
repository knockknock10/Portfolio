"use client"

import { motion, useReducedMotion } from "framer-motion"
import { readDurationToken, readSpringToken, useSpringToken } from "@/components/primitives/motionTokens"
import type { ContributionCalendar, ContributionDay } from "@/lib/work"
import type { SignalNumber, SignalStats } from "@/lib/signals"

type SignalsProps = {
  data: SignalStats
  standalone?: boolean
}

function hasNumber(value: SignalNumber): value is number {
  return typeof value === "number" && Number.isFinite(value)
}

function numberLabel(value: SignalNumber): string | null {
  return hasNumber(value) ? new Intl.NumberFormat("en-US").format(value) : null
}

function dateLabel(value: string): string {
  const date = new Date(value + "T00:00:00Z")
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(date)
}

function contributionLevel(count: number, max: number): number {
  if (count <= 0) return 0
  return Math.min(4, Math.max(1, Math.ceil((count / Math.max(max, 1)) * 4)))
}

const cellVariants = {
  hidden: { opacity: 0 },
  visible: (index: number) => ({
    opacity: 1,
    transition: {
      ...(readSpringToken("gentle") ?? {
        type: "spring" as const,
        stiffness: 170,
        damping: 23,
        mass: 1,
      }),
      delay: Math.min(
        readDurationToken("--duration-signals-stagger-cap") * index / 365,
        readDurationToken("--duration-signals-stagger-cap"),
      ),
    },
  }),
}

function ContributionHeatmap({
  calendar,
  reducedMotion,
}: {
  calendar: ContributionCalendar
  reducedMotion: boolean
}) {
  const allDays = calendar.weeks.flatMap((week) => week.contributionDays)
  const max = Math.max(0, ...allDays.map((day) => day.contributionCount))
  const cell = readDurationToken("--signals-cell-size")
  const gap = readDurationToken("--signals-cell-gap")
  const cellSize = cell > 0 ? cell : 10
  const cellGap = gap >= 0 ? gap : 3
  const width = calendar.weeks.length * (cellSize + cellGap) - cellGap
  const height = 7 * (cellSize + cellGap) - cellGap

  if (!calendar.weeks.length || !allDays.length) return null

  let flatIndex = 0

  return (
    <div className="signals-block signals-calendar-block">
      <div className="signals-block-heading">
        <div>
          <p className="signals-eyebrow">GitHub</p>
          <h3>Contribution calendar</h3>
        </div>
        {typeof calendar.totalContributions === "number" ? (
          <p className="signals-calendar-total">
            {numberLabel(calendar.totalContributions)} contributions
          </p>
        ) : null}
      </div>
      <div className="signals-heatmap-scroll" tabIndex={0} aria-label="Scrollable GitHub contribution calendar">
        <motion.svg
          className="signals-heatmap-svg"
          role="group"
          aria-label="GitHub contribution calendar by week"
          viewBox={"0 0 " + width + " " + height}
          width={width}
          height={height}
          initial={reducedMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
        >
          {calendar.weeks.map((week, weekIndex) =>
            week.contributionDays.slice(0, 7).map((day: ContributionDay, dayIndex) => {
              const index = flatIndex++
              const level = contributionLevel(day.contributionCount, max)
              const label = dateLabel(day.date) + ": " + day.contributionCount + " contributions"
              return (
                <motion.rect
                  key={weekIndex + "-" + dayIndex}
                  className="signals-heatmap-cell"
                  x={weekIndex * (cellSize + cellGap)}
                  y={dayIndex * (cellSize + cellGap)}
                  width={cellSize}
                  height={cellSize}
                  fill={"var(--color-contribution-" + level + ")"}
                  aria-label={label}
                  role="gridcell"
                  tabIndex={0}
                  custom={index}
                  variants={cellVariants}
                  transition={reducedMotion ? { duration: 0 } : undefined}
                >
                  <title>{label}</title>
                </motion.rect>
              )
            }),
          )}
        </motion.svg>
      </div>
      <div className="signals-heatmap-legend" aria-hidden="true">
        <span>Less</span>
        {[0, 1, 2, 3, 4].map((level) => (
          <span
            className="signals-legend-cell"
            key={level}
            style={{ backgroundColor: "var(--color-contribution-" + level + ")" }}
          />
        ))}
        <span>More</span>
      </div>
    </div>
  )
}

function TrendLine({ points }: { points: SignalStats["leetcode"]["contestHistory"] }) {
  const usable = points.filter((point) => typeof point.ratingAfterContest === "number")
  if (usable.length < 2) return null
  const ratings = usable.map((point) => point.ratingAfterContest as number)
  const min = Math.min(...ratings)
  const max = Math.max(...ratings)
  const spread = Math.max(1, max - min)
  const coordinates = ratings.map((rating, index) => {
    const x = 2 + (index / (ratings.length - 1)) * 96
    const y = 27 - ((rating - min) / spread) * 22
    return x.toFixed(2) + "," + y.toFixed(2)
  })
  return (
    <svg
      className="signals-trend-line"
      viewBox="0 0 100 32"
      role="img"
      aria-label={"Contest rating trend for " + usable.length + " recorded contests"}
    >
      <polyline points={coordinates.join(" ")} fill="none" stroke="var(--color-accent)" strokeWidth="1.5" />
    </svg>
  )
}

export function Signals({ data, standalone = false }: SignalsProps) {
  const reducedMotion = Boolean(useReducedMotion())
  const spring = useSpringToken("gentle")
  const revealDuration = readDurationToken("--duration-slow")
  const transition = reducedMotion
    ? { duration: 0 }
    : { ...(spring ?? { type: "spring" as const }), duration: revealDuration }
  const githubStats = [
    { key: "contributions", label: "Contributions · 365 days", value: numberLabel(data.github.contributionsLast365Days) },
    { key: "current", label: "Current streak", value: numberLabel(data.github.currentStreak) },
    { key: "longest", label: "Longest streak", value: numberLabel(data.github.longestStreak) },
    { key: "repos", label: "Public repositories", value: numberLabel(data.github.totalRepos) },
    { key: "stars", label: "Total stars", value: numberLabel(data.github.totalStars) },
  ].filter((stat): stat is { key: string; label: string; value: string } => stat.value !== null)
  const solved = data.leetcode
  const hasLeetcode = solved.available && [
    solved.totalSolved,
    solved.easySolved,
    solved.mediumSolved,
    solved.hardSolved,
    solved.acceptanceRate,
    solved.profileRank,
    solved.contestRating,
    solved.contestRank,
  ].some((value) => value !== "MISSING")
  const hasCalendar = Boolean(data.github.contributionCalendar?.weeks.length)
  if (!hasCalendar && githubStats.length === 0 && !hasLeetcode) return null

  const Heading = standalone ? "h1" : "h2"
  const easy = hasNumber(solved.easySolved) ? solved.easySolved : 0
  const medium = hasNumber(solved.mediumSolved) ? solved.mediumSolved : 0
  const hard = hasNumber(solved.hardSolved) ? solved.hardSolved : 0
  const solvedTotal = hasNumber(solved.totalSolved) ? solved.totalSolved : easy + medium + hard
  const hasSolvedBreakdown = solvedTotal > 0 && easy + medium + hard > 0
  const totalForBar = Math.max(solvedTotal, easy + medium + hard, 1)

  return (
    <section
      id={standalone ? undefined : "signals"}
      className="signals-section"
      aria-label="GitHub and LeetCode activity"
      tabIndex={-1}
    >
      <div className="signals-inner">
        <header className="signals-header">
          <p className="signals-eyebrow">Activity</p>
          <Heading className="signals-title">{standalone ? "Signals" : "Signals"}</Heading>
        </header>

        {hasCalendar ? (
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={transition}
          >
            <ContributionHeatmap calendar={data.github.contributionCalendar!} reducedMotion={reducedMotion} />
          </motion.div>
        ) : null}

        {githubStats.length > 0 ? (
          <motion.div
            className="signals-block signals-total-block"
            initial={reducedMotion ? false : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.16 }}
            transition={transition}
            aria-label="GitHub totals and streaks"
          >
            <div className="signals-block-heading">
              <div>
                <p className="signals-eyebrow">GitHub</p>
                <h3>Totals and streaks</h3>
              </div>
            </div>
            <dl className="signals-stat-strip">
              {githubStats.map((stat) => (
                <div className="signals-stat" key={stat.key}>
                  <dt className="signals-stat-label">{stat.label}</dt>
                  <dd className="signals-stat-value">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </motion.div>
        ) : null}

        {hasLeetcode ? (
          <motion.div
            className="signals-block signals-leetcode-block"
            initial={reducedMotion ? false : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.16 }}
            transition={transition}
          >
            <div className="signals-block-heading">
              <div>
                <p className="signals-eyebrow">LeetCode</p>
                <h3>Problem solving</h3>
              </div>
              <a
                className="signals-inline-link"
                href={"https://leetcode.com/u/" + encodeURIComponent(solved.username) + "/"}
                target="_blank"
                rel="noreferrer"
              >
                Profile <span aria-hidden="true">↗</span>
              </a>
            </div>

            <div className="signals-leetcode-layout">
              <div className="signals-solved-column">
                {numberLabel(solved.totalSolved) ? (
                  <div className="signals-solved-total">
                    <strong>{numberLabel(solved.totalSolved)}</strong>
                    <span>problems solved</span>
                  </div>
                ) : null}
                {hasSolvedBreakdown ? (
                  <>
                    <div className="signals-solved-bar" role="img" aria-label={easy + " easy, " + medium + " medium, " + hard + " hard problems solved"}>
                      <motion.div
                        className="signals-solved-segment signals-solved-easy"
                        style={{ width: (easy / totalForBar) * 100 + "%", transformOrigin: "left" }}
                        initial={reducedMotion ? false : { scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true, amount: 0.6 }}
                        transition={transition}
                      />
                      <motion.div
                        className="signals-solved-segment signals-solved-medium"
                        style={{ width: (medium / totalForBar) * 100 + "%", transformOrigin: "left" }}
                        initial={reducedMotion ? false : { scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true, amount: 0.6 }}
                        transition={transition}
                      />
                      <motion.div
                        className="signals-solved-segment signals-solved-hard"
                        style={{ width: (hard / totalForBar) * 100 + "%", transformOrigin: "left" }}
                        initial={reducedMotion ? false : { scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true, amount: 0.6 }}
                        transition={transition}
                      />
                    </div>
                    <div className="signals-solved-legend">
                      <span><i className="signals-easy-dot" /> Easy <strong>{numberLabel(solved.easySolved) ?? "—"}</strong></span>
                      <span><i className="signals-medium-dot" /> Medium <strong>{numberLabel(solved.mediumSolved) ?? "—"}</strong></span>
                      <span><i className="signals-hard-dot" /> Hard <strong>{numberLabel(solved.hardSolved) ?? "—"}</strong></span>
                    </div>
                  </>
                ) : null}
              </div>

              <dl className="signals-leetcode-metrics">
                {numberLabel(solved.profileRank) ? (
                  <div className="signals-mini-stat"><dt>Global rank</dt><dd>{numberLabel(solved.profileRank)}</dd></div>
                ) : null}
                {solved.acceptanceRate !== "MISSING" ? (
                  <div className="signals-mini-stat"><dt>Acceptance rate</dt><dd>{solved.acceptanceRate}</dd></div>
                ) : null}
                {numberLabel(solved.contestRating) ? (
                  <div className="signals-mini-stat"><dt>Contest rating</dt><dd>{Number(solved.contestRating).toLocaleString("en-US", { maximumFractionDigits: 1 })}</dd></div>
                ) : null}
                {numberLabel(solved.contestRank) ? (
                  <div className="signals-mini-stat"><dt>Contest rank</dt><dd>{numberLabel(solved.contestRank)}</dd></div>
                ) : null}
              </dl>
            </div>

            {solved.contestHistory.length > 1 ? (
              <div className="signals-contest-trend">
                <div>
                  <p className="signals-eyebrow">Contest history</p>
                  <p className="signals-trend-caption">Last {solved.contestHistory.length} recorded contests</p>
                </div>
                <TrendLine points={solved.contestHistory} />
              </div>
            ) : null}

            {solved.badges.length > 0 ? (
              <div className="signals-badges">
                <span className="signals-badges-label">Contest badge</span>
                <ul>
                  {solved.badges.map((badge) => <li key={badge}>{badge}</li>)}
                </ul>
              </div>
            ) : null}
          </motion.div>
        ) : null}
      </div>
    </section>
  )
}
