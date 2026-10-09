import { leetcodeConfig, validateStats, formatVerifiedAt } from '../../data/leetcode.js'

/**
 * Difficulty breakdown — shows Easy/Medium/Hard counts from verified snapshot.
 * Only renders if all three difficulty counts are available and consistent.
 */
export function DifficultyBreakdown() {
  const stats = leetcodeConfig.stats

  if (!stats) return null

  const { easySolved, mediumSolved, hardSolved, totalSolved } = stats
  const validation = validateStats(stats)

  // Only show if all three difficulty counts are present
  if (easySolved == null || mediumSolved == null || hardSolved == null) {
    return null
  }

  // Suppress if validation fails
  if (!validation.valid) {
    if (import.meta.env.DEV) {
      console.warn('[ProblemSolving] Stats validation failed:', validation.issues)
    }
    return null
  }

  const total = totalSolved ?? easySolved + mediumSolved + hardSolved

  return (
    <div className="border-t border-line pt-6" aria-labelledby="difficulty-heading">
      <h3 id="difficulty-heading" className="font-mono text-xs tracking-[0.2em] text-accent uppercase mb-4">
        Difficulty breakdown
      </h3>

      <div className="grid gap-4 sm:grid-cols-3">
        <DifficultyStat
          label="Easy"
          value={easySolved}
          total={total}
          color="text-green-400"
        />
        <DifficultyStat
          label="Medium"
          value={mediumSolved}
          total={total}
          color="text-yellow-400"
        />
        <DifficultyStat
          label="Hard"
          value={hardSolved}
          total={total}
          color="text-red-400"
        />
      </div>

      {totalSolved != null && (
        <p className="mt-4 font-mono text-sm text-fg text-center">
          Total solved: <span className="tabular-nums">{totalSolved.toLocaleString()}</span>
        </p>
      )}
    </div>
  )
}

function DifficultyStat({ label, value, total, color }) {
  const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : '0.0'

  return (
    <div
      className="rounded-xl bg-panel p-4"
      style={{ border: '1px solid rgba(255, 255, 255, 0.08)' }}
    >
      <div className="flex items-baseline justify-between gap-2 mb-2">
        <span className="font-mono text-xs tracking-[0.1em] text-dim uppercase">{label}</span>
        <span className={`font-mono text-sm tabular-nums ${color}`}>{percentage}%</span>
      </div>
      <div className="h-2 bg-panel-raised rounded-full overflow-hidden" role="img" aria-label={`${label}: ${value} of ${total} problems (${percentage}%)`}>
        <div
          className={`h-full ${color.replace('text-', 'bg-')} transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className="mt-2 font-mono text-base font-medium tabular-nums text-fg text-right">
        {value.toLocaleString()}
      </p>
    </div>
  )
}

/**
 * Contest information — shows rating, ranking, contests attended from verified snapshot.
 * All fields optional; only renders if at least one contest field is available.
 */
export function ContestInfo() {
  const stats = leetcodeConfig.stats

  if (!stats) return null

  const {
    contestRating,
    globalRanking,
    contestsAttended,
    mostRecentContest,
  } = stats

  const hasContestData =
    contestRating != null ||
    globalRanking != null ||
    contestsAttended != null ||
    mostRecentContest

  if (!hasContestData) return null

  return (
    <div className="border-t border-line pt-6" aria-labelledby="contest-heading">
      <h3 id="contest-heading" className="font-mono text-xs tracking-[0.2em] text-accent uppercase mb-4">
        Contest activity
      </h3>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {contestRating != null && (
          <ContestStat
            label="Current rating"
            value={contestRating.toLocaleString()}
          />
        )}
        {globalRanking != null && (
          <ContestStat
            label="Global rank"
            value={`#${globalRanking.toLocaleString()}`}
          />
        )}
        {contestsAttended != null && (
          <ContestStat
            label="Contests attended"
            value={contestsAttended.toLocaleString()}
          />
        )}
        {mostRecentContest?.name && (
          <ContestStat
            label="Most recent"
            value={mostRecentContest.name}
            subtext={
              mostRecentContest.rank
                ? `Rank #${mostRecentContest.rank.toLocaleString()}`
                : undefined
            }
          />
        )}
      </div>

      {mostRecentContest?.date && (
        <p className="mt-4 font-mono text-[11px] text-dim text-center">
          Last contest: {new Date(mostRecentContest.date).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            timeZone: 'UTC',
          })}
        </p>
      )}
    </div>
  )
}

function ContestStat({ label, value, subtext }) {
  return (
    <div
      className="rounded-xl bg-panel p-4 text-center"
      style={{ border: '1px solid rgba(255, 255, 255, 0.08)' }}
    >
      <p className="font-mono text-xs tracking-[0.1em] text-dim uppercase">{label}</p>
      <p className="mt-1 font-mono text-lg font-medium tabular-nums text-fg">{value}</p>
      {subtext && <p className="mt-1 text-xs text-muted">{subtext}</p>}
    </div>
  )
}

/**
 * Data freshness notice — shows verification timestamp and source.
 * Always renders if stats exist.
 */
export function DataFreshness() {
  const stats = leetcodeConfig.stats

  if (!stats) return null

  const verifiedAt = formatVerifiedAt(stats)
  const source = stats.source
  const notes = stats.notes

  return (
    <div className="border-t border-line pt-4" aria-live="polite">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-sm">
        {verifiedAt && (
          <span className="font-mono text-[11px] tracking-[0.12em] text-dim">{verifiedAt}</span>
        )}
        {source && (
          <span className="text-muted">Source: {source}</span>
        )}
      </div>
      {notes && (
        <p className="mt-2 text-[13px] text-dim leading-relaxed">{notes}</p>
      )}
    </div>
  )
}

/**
 * Profile link button — prominent external link to LeetCode profile.
 */
export function ProfileLink() {
  const profileUrl = leetcodeConfig.username
    ? `https://leetcode.com/u/${leetcodeConfig.username}/`
    : null

  if (!profileUrl) return null

  return (
    <div className="border-t border-line pt-4 text-center">
      <a
        href={profileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-sm font-medium text-accent underline-offset-4 transition-colors duration-200 hover:underline"
        aria-label={`View ${leetcodeConfig.username}'s LeetCode profile`}
      >
        <svg className="size-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
        </svg>
        View full LeetCode profile →
      </a>
    </div>
  )
}

/**
 * Empty state — shown when no stats are configured.
 * Visitor-facing copy: never exposes internal configuration instructions
 * when the profile itself is already configured.
 */
export function NoStatsNotice() {
  const username = leetcodeConfig.username

  return (
    <div className="border-t border-line pt-6 text-center">
      <p className="text-muted">
        {username
          ? 'Verified statistics are not published here yet — only confirmed numbers will be shown, never estimates.'
          : 'Configure your LeetCode username in '}
        {!username && (
          <code className="font-mono text-xs bg-panel-raised px-1 rounded">{'src/data/leetcode.js'}</code>
        )}
        {!username && ' to see verified problem-solving stats.'}
      </p>
    </div>
  )
}