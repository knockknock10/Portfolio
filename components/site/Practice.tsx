import type { SignalStats } from "@/lib/signals"
import { ArrowUpRight } from "./icons"
import { Reveal } from "./Reveal"

const profiles = [
  { label: "LeetCode", href: "https://leetcode.com/u/knockknock10/" },
  { label: "Codeforces", href: "https://codeforces.com/profile/knockknock10" },
  { label: "HackerRank", href: "https://www.hackerrank.com/profile/knockknock10" },
  { label: "NeetCode", href: "https://neetcode.io/user/DigitalTrill950" },
  { label: "GeeksforGeeks", href: "https://www.geeksforgeeks.org/profile/karthikjaihh0z" },
]

function num(value: number | "MISSING", digits = 0): string | null {
  return typeof value === "number" ? value.toLocaleString("en-US", { maximumFractionDigits: digits }) : null
}

function CircularProgress({
  value,
  max,
  size = 120,
  strokeWidth = 8,
  children,
}: {
  value: number
  max: number
  size?: number
  strokeWidth?: number
  children?: React.ReactNode
}) {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const progress = Math.min(value / max, 1)
  const dashOffset = circumference - progress * circumference

  return (
    <div
      className="sk-progress-ring"
      style={{ width: size, height: size, position: "relative" }}
    >
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--rule)"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--accent)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          style={{ transition: "stroke-dashoffset 0.8s ease-out" }}
        />
      </svg>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {children}
      </div>
    </div>
  )
}

function DifficultyBar({
  easy,
  medium,
  hard,
  total,
}: {
  easy: number
  medium: number
  hard: number
  total: number
}) {
  const easyPct = (easy / total) * 100
  const mediumPct = (medium / total) * 100
  const hardPct = (hard / total) * 100

  return (
    <div className="sk-difficulty-bar">
      <div className="sk-difficulty-bar__track">
        <div
          className="sk-difficulty-bar__fill sk-difficulty-bar__fill--easy"
          style={{ width: `${easyPct}%` }}
        />
        <div
          className="sk-difficulty-bar__fill sk-difficulty-bar__fill--medium"
          style={{ width: `${mediumPct}%` }}
        />
        <div
          className="sk-difficulty-bar__fill sk-difficulty-bar__fill--hard"
          style={{ width: `${hardPct}%` }}
        />
      </div>
      <div className="sk-difficulty-bar__legend">
        <span className="sk-difficulty-bar__label">
          <span className="sk-difficulty-bar__dot sk-difficulty-bar__dot--easy" />
          Easy {easy}
        </span>
        <span className="sk-difficulty-bar__label">
          <span className="sk-difficulty-bar__dot sk-difficulty-bar__dot--medium" />
          Med {medium}
        </span>
        <span className="sk-difficulty-bar__label">
          <span className="sk-difficulty-bar__dot sk-difficulty-bar__dot--hard" />
          Hard {hard}
        </span>
      </div>
    </div>
  )
}

function MiniCalendar({
  data,
}: {
  data: Array<{ date: string; submissions: number }> | null
}) {
  if (!data || data.length === 0) return null

  // Get last 35 days for a 5x7 mini grid
  const days = data.slice(-35)
  const maxSubs = Math.max(...days.map((d) => d.submissions), 1)

  const getLevel = (count: number) => {
    if (count === 0) return 0
    const pct = count / maxSubs
    if (pct < 0.25) return 1
    if (pct < 0.5) return 2
    if (pct < 0.75) return 3
    return 4
  }

  return (
    <div className="sk-mini-calendar">
      <div className="sk-mini-calendar__grid">
        {days.map((day, i) => {
          const level = getLevel(day.submissions)
          return (
            <div
              key={day.date + i}
              className={`sk-mini-calendar__cell sk-mini-calendar__cell--level${level}`}
              title={`${day.date}: ${day.submissions} submissions`}
            />
          )
        })}
      </div>
      <div className="sk-mini-calendar__footer">
        <span>Last 5 weeks</span>
        <div className="sk-mini-calendar__legend">
          <span>Less</span>
          <div className="sk-mini-calendar__cell sk-mini-calendar__cell--level0" />
          <div className="sk-mini-calendar__cell sk-mini-calendar__cell--level1" />
          <div className="sk-mini-calendar__cell sk-mini-calendar__cell--level2" />
          <div className="sk-mini-calendar__cell sk-mini-calendar__cell--level3" />
          <div className="sk-mini-calendar__cell sk-mini-calendar__cell--level4" />
          <span>More</span>
        </div>
      </div>
    </div>
  )
}

function ContestSparkline({
  history,
}: {
  history: Array<{ ratingAfterContest: number | "MISSING"; date: string }>
}) {
  const validPoints = history
    .filter((p): p is { ratingAfterContest: number; date: string } =>
      typeof p.ratingAfterContest === "number"
    )
    .slice(-20) // Last 20 contests

  if (validPoints.length < 2) return null

  const ratings = validPoints.map((p) => p.ratingAfterContest)
  const min = Math.min(...ratings)
  const max = Math.max(...ratings)
  const range = max - min || 1

  const width = 200
  const height = 50
  const padding = 4
  const points = validPoints.map((p, i) => {
    const x = (i / (validPoints.length - 1)) * width
    const y = height - padding - ((p.ratingAfterContest - min) / range) * (height - 2 * padding)
    return `${x},${y}`
  })

  return (
    <div className="sk-contest-sparkline">
      <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
        <polyline
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2"
          points={points.join(" ")}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <div className="sk-contest-sparkline__labels">
        <span>{min}</span>
        <span>Contest rating trend</span>
        <span>{max}</span>
      </div>
    </div>
  )
}

export function Practice({ stats }: { stats: SignalStats["leetcode"] }) {
  const solved = num(stats.totalSolved)
  const totalQuestions = typeof stats.totalQuestions === "number" ? stats.totalQuestions : 3500
  const solvedNum = typeof stats.totalSolved === "number" ? stats.totalSolved : 0
  const rating = num(stats.contestRating)
  const attended = num(stats.contestAttendedCount)

  const easy = typeof stats.easySolved === "number" ? stats.easySolved : 0
  const medium = typeof stats.mediumSolved === "number" ? stats.mediumSolved : 0
  const hard = typeof stats.hardSolved === "number" ? stats.hardSolved : 0
  const acceptance = typeof stats.acceptanceRate === "string" ? stats.acceptanceRate : null

  const hasContestHistory =
    Array.isArray(stats.contestHistory) && stats.contestHistory.length > 0

  return (
    <Reveal>
      <div className="sk-practice">
        <div className="sk-practice__intro">
          <h3>Problem solving</h3>
          <p className="sk-lede" style={{ margin: 0 }}>
            I practise data structures and algorithms regularly. It keeps the fundamentals sharp for
            the systems I build.
          </p>
        </div>

        <div className="sk-practice__visuals">
          {/* Network visualization background layer */}
          <div className="sk-practice-glow sk-practice-glow--1" aria-hidden="true" />
          <div className="sk-practice-glow sk-practice-glow--2" aria-hidden="true" />
          <div className="sk-practice-glow sk-practice-glow--3" aria-hidden="true" />
          {/* Progress ring with solved count */}
          <div className="sk-practice__stat">
            <CircularProgress value={solvedNum} max={totalQuestions}>
              <span className="sk-practice__stat-value">{solved}</span>
              <span className="sk-practice__stat-label">solved</span>
            </CircularProgress>
            {acceptance && (
              <span className="sk-practice__stat-meta">{acceptance} acceptance</span>
            )}
          </div>

          {/* Difficulty breakdown */}
          {(easy > 0 || medium > 0 || hard > 0) && (
            <div className="sk-practice__breakdown">
              <DifficultyBar easy={easy} medium={medium} hard={hard} total={solvedNum || 1} />
            </div>
          )}

          {/* Contest sparkline */}
          {hasContestHistory && rating && (
            <div className="sk-practice__contests">
              <div className="sk-contest-header">
                <span className="sk-contest-rating">{rating}</span>
                <span className="sk-contest-label">rating</span>
              </div>
              <ContestSparkline history={stats.contestHistory} />
              <span className="sk-contest-meta">{attended} contests attended</span>
            </div>
          )}

          {/* Mini calendar heatmap */}
          {stats.dailySubmissionCalendar && stats.dailySubmissionCalendar.length > 0 && (
            <div className="sk-practice__calendar">
              <MiniCalendar data={stats.dailySubmissionCalendar} />
            </div>
          )}
        </div>

        <div className="sk-practice__foot">
          <span>Figures are from my public LeetCode profile when this site was last built.</span>
          <span className="sk-practice__links">
            {profiles.map((profile) => (
              <a
                className="sk-text-link"
                key={profile.href}
                href={profile.href}
                target="_blank"
                rel="noreferrer"
              >
                {profile.label} <ArrowUpRight />
              </a>
            ))}
          </span>
        </div>
      </div>
    </Reveal>
  )
}
