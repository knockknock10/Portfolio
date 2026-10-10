import styles from "./WorkExperience.module.css"
import type { WorkStats } from "@/lib/work"
import { isAvailable } from "@/lib/work"

type WorkStatsStripProps = { stats: WorkStats }

function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US").format(value)
}

export function WorkStatsStrip({ stats }: WorkStatsStripProps) {
  const entries: Array<{ label: string; value: number | "MISSING" }> = [
    { label: "Repositories", value: stats.totalRepos },
    { label: "Stars", value: stats.totalStars },
    { label: "Forks", value: stats.totalForks },
    { label: "Contributions · last year", value: stats.contributionsLast365Days },
    { label: "Current streak", value: stats.currentStreak },
    { label: "Longest streak", value: stats.longestStreak },
    { label: "LeetCode solved", value: stats.leetCodeSolved },
  ]
  const available = entries.filter((entry) => isAvailable(entry.value))
  if (!available.length) return null

  return (
    <dl className={styles.statsStrip} aria-label="Work and activity statistics">
      {available.map((entry) => (
        <div className={styles.stat} key={entry.label}>
          <dt className={styles.statLabel}>{entry.label}</dt>
          <dd className={styles.statValue}>{formatNumber(entry.value as number)}</dd>
        </div>
      ))}
    </dl>
  )
}
