/**
 * Verified summary metrics for the open-source page.
 * Only displays metrics that can be accurately computed from GitHub data.
 */

const METRICS = [
  { key: 'organizations', label: 'Organizations', singular: 'organization' },
  { key: 'repositories', label: 'Repositories', singular: 'repository' },
  { key: 'totalPRs', label: 'Pull Requests', singular: 'pull request' },
  { key: 'mergedPRs', label: 'Merged PRs', singular: 'merged PR' },
  { key: 'openPRs', label: 'Open PRs', singular: 'open PR' },
  { key: 'draftPRs', label: 'Draft PRs', singular: 'draft PR' },
  { key: 'totalIssues', label: 'Issues', singular: 'issue' },
  { key: 'assignedIssues', label: 'Assigned Issues', singular: 'assigned issue' },
  { key: 'openedIssues', label: 'Opened Issues', singular: 'opened issue' },
  { key: 'totalReviews', label: 'Code Reviews', singular: 'code review' },
]

export default function SummaryCounts({ counts }) {
  if (!counts || Object.keys(counts).length === 0) return null

  const items = METRICS.map(({ key, label, singular }) => {
    const value = counts[key] ?? 0
    if (value === 0) return null
    return (
      <div key={key} className="flex items-baseline gap-2">
        <span className="font-medium text-fg">{value.toLocaleString()}</span>
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-dim">
          {value === 1 ? singular : label}
        </span>
      </div>
    )
  }).filter(Boolean)

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" role="list" aria-label="Open source summary">
      {items.map((item, i) => (
        <div key={i} className="rounded-lg border border-line bg-panel p-4">
          {item}
        </div>
      ))}
    </div>
  )
}