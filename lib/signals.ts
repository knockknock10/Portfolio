import "server-only"

import { getWorkData, type ContributionCalendar, type DataValue } from "@/lib/work"

export type SignalNumber = DataValue<number>
export type SignalText = DataValue<string>

export interface ContestTrendPoint {
  contest: SignalText
  date: SignalText
  rank: SignalNumber
  ratingAfterContest: SignalNumber
}

export interface SignalStats {
  github: {
    totalRepos: SignalNumber
    totalStars: SignalNumber
    contributionsLast365Days: SignalNumber
    currentStreak: SignalNumber
    longestStreak: SignalNumber
    contributionCalendar: ContributionCalendar | null
  }
  leetcode: {
    available: boolean
    username: string
    totalSolved: SignalNumber
    easySolved: SignalNumber
    mediumSolved: SignalNumber
    hardSolved: SignalNumber
    acceptanceRate: SignalText
    profileRank: SignalNumber
    contestRating: SignalNumber
    contestRank: SignalNumber
    badges: string[]
    contestHistory: ContestTrendPoint[]
    dailySubmissionCalendar: Array<{ date: string; submissions: number }> | null
  }
}

function numberValue(value: unknown): SignalNumber {
  if (typeof value === "number" && Number.isFinite(value)) return value
  if (typeof value === "string" && value.trim() && value !== "MISSING") {
    const parsed = Number(value)
    if (Number.isFinite(parsed)) return parsed
  }
  return "MISSING"
}

function textValue(value: unknown): SignalText {
  if (typeof value === "string" && value.trim() && value !== "MISSING") return value
  if (typeof value === "number" && Number.isFinite(value)) return String(value)
  return "MISSING"
}

export function getSignalsData(): SignalStats {
  // getWorkData reads PORTFOLIO-DATA.md on the server and keeps its parsing rules centralized.
  const data = getWorkData()
  const leetcode = data.leetCode
  const row = (difficulty: string): SignalNumber =>
    numberValue(leetcode?.solved.find((item) => item.difficulty === difficulty)?.solved)

  const contestHistory: ContestTrendPoint[] = (leetcode?.contestHistory ?? []).map((point) => ({
    contest: textValue(point.contest),
    date: textValue(point.date),
    rank: numberValue(point.rank),
    ratingAfterContest: numberValue(point.ratingAfterContest),
  }))

  const badge = textValue(leetcode?.contest.badge)
  const badges = badge === "MISSING" ? [] : [badge]

  return {
    github: {
      totalRepos: numberValue(data.stats.totalRepos),
      totalStars: numberValue(data.stats.totalStars),
      contributionsLast365Days: numberValue(data.stats.contributionsLast365Days),
      currentStreak: numberValue(data.stats.currentStreak),
      longestStreak: numberValue(data.stats.longestStreak),
      contributionCalendar: data.contributionCalendar,
    },
    leetcode: {
      available: Boolean(leetcode),
      username: leetcode?.username ?? "",
      totalSolved: row("All"),
      easySolved: row("Easy"),
      mediumSolved: row("Medium"),
      hardSolved: row("Hard"),
      acceptanceRate: textValue(leetcode?.acceptanceRate),
      profileRank: numberValue(leetcode?.profile.ranking),
      contestRating: numberValue(leetcode?.contest.rating),
      contestRank: numberValue(leetcode?.contest.globalRanking),
      badges,
      contestHistory,
      dailySubmissionCalendar: leetcode?.dailySubmissionCalendar ?? null,
    },
  }
}
