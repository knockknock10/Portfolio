/**
 * Summary values returned by GitHub. Missing values are not inferred.
 */
const METRICS = [
  { key: 'organizations', label: 'Organizations' },
  { key: 'repositories', label: 'Repositories' },
  { key: 'totalPRs', label: 'Pull requests' },
  { key: 'mergedPRs', label: 'Merged PRs' },
  { key: 'openPRs', label: 'Open PRs' },
  { key: 'draftPRs', label: 'Draft PRs' },
  { key: 'totalIssues', label: 'Issues' },
  { key: 'assignedIssues', label: 'Assigned issues' },
  { key: 'openedIssues', label: 'Issues opened' },
  { key: 'totalReviews', label: 'Code reviews' },
]

export default function SummaryCounts({ counts }) {
  if (!counts || Object.keys(counts).length === 0) return null

  const items = METRICS
    .filter(({ key }) => Number.isFinite(counts[key]) && counts[key] > 0)
    .map(({ key, label }) => ({ key, label, value: counts[key] }))

  if (items.length === 0) return null

  return (
    <dl className="summary-metrics" aria-label="Open-source summary">
      {items.map(({ key, label, value }) => (
        <div key={key} className="summary-metric">
          <dd>{value.toLocaleString()}</dd>
          <dt>{label}</dt>
        </div>
      ))}
    </dl>
  )
}
