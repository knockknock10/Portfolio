"use client"

import { useState } from "react"
import type { CSSProperties } from "react"
import type { SignalStats } from "@/lib/signals"
import { ArrowUpRight } from "./icons"
import { Reveal } from "./Reveal"

const profiles = [
  {
    id: "codeforces",
    label: "Codeforces",
    mark: "CF",
    logo: "codeforces",
    accent: "#3b82b5",
    detail: "Timed contests and algorithmic implementation",
    focus: "Contest practice",
    href: "https://codeforces.com/profile/knockknock10",
  },
  {
    id: "hackerrank",
    label: "HackerRank",
    mark: "HR",
    logo: "hackerrank",
    accent: "#25865d",
    detail: "Language tracks and structured assessments",
    focus: "Skill tracks",
    href: "https://www.hackerrank.com/profile/knockknock10",
  },
  {
    id: "neetcode",
    label: "NeetCode",
    mark: "N",
    logo: null,
    accent: "#7b6e9e",
    detail: "Interview patterns and a curated roadmap",
    focus: "Interview prep",
    href: "https://neetcode.io/user/DigitalTrill950",
  },
  {
    id: "geeksforgeeks",
    label: "GeeksforGeeks",
    mark: "GFG",
    logo: "geeksforgeeks",
    accent: "#4e8965",
    detail: "DSA practice and concept references",
    focus: "DSA library",
    href: "https://www.geeksforgeeks.org/profile/karthikjaihh0z",
  },
] as const

function num(value: number | "MISSING", digits = 0): string | null {
  return typeof value === "number"
    ? value.toLocaleString("en-US", { maximumFractionDigits: digits })
    : null
}

function PlatformMark({ profile }: { profile: (typeof profiles)[number] }) {
  const [failed, setFailed] = useState(false)

  return (
    <span className="gl-practice-platform__mark" data-platform={profile.id} aria-hidden="true">
      {profile.logo && !failed ? (
        <img
          src={`https://cdn.simpleicons.org/${profile.logo}`}
          alt=""
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
        />
      ) : null}
      {!profile.logo || failed ? <span>{profile.mark}</span> : null}
    </span>
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
    <div className="sk-difficulty-bar gl-practice-difficulty">
      <div className="sk-difficulty-bar__track" aria-label="Solved problem difficulty breakdown">
        <div className="sk-difficulty-bar__fill sk-difficulty-bar__fill--easy" style={{ width: `${easyPct}%` }} />
        <div className="sk-difficulty-bar__fill sk-difficulty-bar__fill--medium" style={{ width: `${mediumPct}%` }} />
        <div className="sk-difficulty-bar__fill sk-difficulty-bar__fill--hard" style={{ width: `${hardPct}%` }} />
      </div>
      <div className="sk-difficulty-bar__legend">
        <span className="sk-difficulty-bar__label"><span className="sk-difficulty-bar__dot sk-difficulty-bar__dot--easy" />Easy <strong>{easy}</strong></span>
        <span className="sk-difficulty-bar__label"><span className="sk-difficulty-bar__dot sk-difficulty-bar__dot--medium" />Medium <strong>{medium}</strong></span>
        <span className="sk-difficulty-bar__label"><span className="sk-difficulty-bar__dot sk-difficulty-bar__dot--hard" />Hard <strong>{hard}</strong></span>
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
  const days = data.slice(-35)
  const maxSubs = Math.max(...days.map((day) => day.submissions), 1)

  const getLevel = (count: number) => {
    if (count === 0) return 0
    const pct = count / maxSubs
    if (pct < 0.25) return 1
    if (pct < 0.5) return 2
    if (pct < 0.75) return 3
    return 4
  }

  return (
    <div className="sk-mini-calendar gl-practice-calendar">
      <div className="sk-mini-calendar__grid">
        {days.map((day) => {
          const level = getLevel(day.submissions)
          return (
            <div
              key={day.date}
              className={`sk-mini-calendar__cell sk-mini-calendar__cell--level${level}`}
              title={`${day.date}: ${day.submissions} submissions`}
            />
          )
        })}
      </div>
      <div className="sk-mini-calendar__footer">
        <span>Last five weeks</span>
        <div className="sk-mini-calendar__legend">
          <span>Less</span>
          {[0, 1, 2, 3, 4].map((level) => (
            <div key={level} className={`sk-mini-calendar__cell sk-mini-calendar__cell--level${level}`} />
          ))}
          <span>More</span>
        </div>
      </div>
    </div>
  )
}

function ContestSparkline({
  history,
}: {
  history: SignalStats["leetcode"]["contestHistory"]
}) {
  const validPoints = history
    .filter((point): point is typeof point & { ratingAfterContest: number } =>
      typeof point.ratingAfterContest === "number"
    )
    .slice(-20)

  if (validPoints.length < 2) return null
  const ratings = validPoints.map((point) => point.ratingAfterContest)
  const min = Math.min(...ratings)
  const max = Math.max(...ratings)
  const range = max - min || 1
  const points = validPoints.map((point, index) => {
    const x = (index / (validPoints.length - 1)) * 200
    const y = 46 - ((point.ratingAfterContest - min) / range) * 38
    return `${x},${y}`
  })

  return (
    <div className="gl-practice-trend">
      <div className="gl-practice-trend__top">
        <span>Contest rating trend</span>
        <span>{min.toLocaleString("en-US")} — {max.toLocaleString("en-US")}</span>
      </div>
      <svg viewBox="0 0 200 52" role="img" aria-label={`Contest rating trend, ranging from ${min} to ${max}`}>
        <polyline fill="none" stroke="currentColor" strokeWidth="2.5" points={points.join(" ")} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  )
}

function LeetCodeFeature({
  stats,
  snapshotLabel,
}: {
  stats: SignalStats["leetcode"]
  snapshotLabel: string | null
}) {
  const solved = num(stats.totalSolved)
  const totalQuestions = num(stats.totalQuestions)
  const easy = typeof stats.easySolved === "number" ? stats.easySolved : null
  const medium = typeof stats.mediumSolved === "number" ? stats.mediumSolved : null
  const hard = typeof stats.hardSolved === "number" ? stats.hardSolved : null
  const solvedBreakdown = easy !== null && medium !== null && hard !== null
  const solvedTotal = solvedBreakdown ? easy + medium + hard : 0
  const acceptance = stats.acceptanceRate !== "MISSING" ? stats.acceptanceRate : null
  const rating = num(stats.contestRating)
  const attended = num(stats.contestAttendedCount)
  const hasActivity = Boolean(stats.dailySubmissionCalendar?.length)
  const hasTrend = stats.contestHistory.length > 1

  return (
    <article className="gl-practice-feature" aria-labelledby="practice-leetcode-title">
      <div className="gl-practice-feature__top">
        <div className="gl-practice-feature__identity">
          <span className="gl-practice-feature__brand" aria-hidden="true">LC</span>
          <div>
            <span className="gl-practice-feature__eyebrow">Primary practice log</span>
            <h4 id="practice-leetcode-title">LeetCode</h4>
          </div>
        </div>
        <span className="gl-practice-feature__snapshot">
          <i aria-hidden="true" /> Snapshot · {snapshotLabel ?? "Date not recorded"}
        </span>
      </div>

      <div className="gl-practice-feature__body">
        <div className="gl-practice-feature__score">
          <strong>{solved ?? "—"}</strong>
          <span>problems solved</span>
          {totalQuestions ? <small>of {totalQuestions} in the saved catalogue</small> : null}
        </div>

        <div className="gl-practice-feature__breakdown">
          {solvedBreakdown && solvedTotal > 0 ? (
            <>
              <span className="gl-practice-feature__label">Difficulty mix</span>
              <DifficultyBar easy={easy} medium={medium} hard={hard} total={solvedTotal} />
            </>
          ) : (
            <p className="gl-practice-feature__muted">Difficulty breakdown is not present in this snapshot.</p>
          )}
        </div>
      </div>

      <div className="gl-practice-feature__metrics">
        {acceptance ? (
          <div><strong>{acceptance}</strong><span>Acceptance</span></div>
        ) : null}
        {rating ? (
          <div><strong>{rating}</strong><span>Contest rating</span></div>
        ) : null}
        {attended ? (
          <div><strong>{attended}</strong><span>Contests attended</span></div>
        ) : null}
        {num(stats.profileRank) ? (
          <div><strong>#{num(stats.profileRank)}</strong><span>Profile rank</span></div>
        ) : null}
      </div>

      {hasActivity || hasTrend ? (
        <details className="gl-practice-feature__details">
          <summary>
            Explore the activity snapshot
            <span aria-hidden="true">＋</span>
          </summary>
          <div className="gl-practice-feature__activity">
            {hasActivity ? <MiniCalendar data={stats.dailySubmissionCalendar} /> : null}
            {hasTrend ? <ContestSparkline history={stats.contestHistory} /> : null}
          </div>
        </details>
      ) : null}

      <div className="gl-practice-feature__footer">
        <span>Public profile snapshot, not a live counter</span>
        <a href="https://leetcode.com/u/knockknock10/" target="_blank" rel="noreferrer">
          Open LeetCode <ArrowUpRight />
        </a>
      </div>
    </article>
  )
}

export function Practice({
  stats,
  snapshotDate,
}: {
  stats: SignalStats["leetcode"]
  snapshotDate: string | null
}) {
  const snapshotLabel = snapshotDate
    ? new Date(`${snapshotDate}T00:00:00Z`).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
        timeZone: "UTC",
      })
    : null

  return (
    <Reveal>
      <section className="sk-practice gl-practice-hub" aria-labelledby="practice-title">
        <div className="gl-practice-hub__intro">
          <div>
            <p className="sk-eyebrow">Practice · problem solving</p>
            <h3 id="practice-title">The work behind the work.</h3>
          </div>
          <p className="sk-lede">
            Different platforms sharpen different skills. Here&apos;s the public trail of interview practice,
            timed problem solving and structured learning.
          </p>
        </div>

        <div className="gl-practice-hub__layout">
          <LeetCodeFeature stats={stats} snapshotLabel={snapshotLabel} />

          <div className="gl-practice-directory">
            <div className="gl-practice-directory__heading">
              <div>
                <span className="gl-practice-directory__eyebrow">More practice spaces</span>
                <h4>Different ways to think.</h4>
              </div>
              <span className="gl-practice-directory__count">04 profiles</span>
            </div>

            <div className="gl-practice-directory__grid">
              {profiles.map((profile, index) => (
                <a
                  className="gl-practice-platform"
                  key={profile.id}
                  href={profile.href}
                  target="_blank"
                  rel="noreferrer"
                  data-platform={profile.id}
                  style={{ "--platform-accent": profile.accent, "--platform-index": index } as CSSProperties}
                  aria-label={`Open ${profile.label} profile in a new tab`}
                >
                  <div className="gl-practice-platform__top">
                    <PlatformMark profile={profile} />
                    <span>{String(index + 2).padStart(2, "0")}</span>
                  </div>
                  <strong>{profile.label}</strong>
                  <p>{profile.detail}</p>
                  <span className="gl-practice-platform__footer">
                    {profile.focus}
                    <ArrowUpRight />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Reveal>
  )
}
