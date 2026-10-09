import TextLink from '../TextLink.jsx'
import { leetcodeConfig, getLeetCodeProfileUrl } from '../../data/leetcode.js'

/**
 * LeetCode profile card — compact, verified identity snapshot.
 * Displays username, profile link, and optional display name/avatar.
 * All data comes from src/data/leetcode.js config.
 */
export default function LeetCodeProfileCard({ className = '' }) {
  const profileUrl = getLeetCodeProfileUrl()
  const username = leetcodeConfig.username
  const displayName = leetcodeConfig.displayName
  const avatarUrl = leetcodeConfig.avatarUrl

  if (!username) {
    return (
      <div
        className={`rounded-xl bg-panel p-6 ${className}`}
        style={{ border: '1px solid rgba(255, 255, 255, 0.08)' }}
      >
        <div className="flex items-start gap-4">
          <div
            className="size-12 shrink-0 rounded-xl bg-panel-raised flex items-center justify-center"
            style={{ border: '1px solid rgba(255, 255, 255, 0.08)' }}
            aria-hidden="true"
          >
            <svg className="size-6 text-dim" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-mono text-xs tracking-[0.2em] text-accent uppercase">LeetCode not configured</p>
            <p className="mt-1 text-sm text-muted">
              Set your LeetCode username in{' '}
              <code className="font-mono text-xs text-dim bg-panel-raised px-1.5 py-0.5 rounded border border-line break-all">src/data/leetcode.js</code>{' '}
              to enable the Problem Solving section.
            </p>
            <p className="mt-3 text-sm text-dim">
              Your profile URL will be:{' '}
              <code className="font-mono text-xs bg-panel-raised px-1.5 py-0.5 rounded border border-line break-all">{'https://leetcode.com/u/<username>/'}</code>
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`rounded-xl bg-panel p-6 ${className}`}
      style={{ border: '1px solid rgba(255, 255, 255, 0.08)' }}
    >
      <div className="flex items-start gap-4">
        {avatarUrl && (
          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View @${username} on LeetCode`}
            className="shrink-0"
          >
            <img
              src={avatarUrl}
              alt=""
              className="size-12 rounded-xl"
              style={{ border: '1px solid rgba(255, 255, 255, 0.08)' }}
              width={48}
              height={48}
            />
          </a>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-2 flex-wrap">
            <a
              href={profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-sm font-medium text-fg hover:text-accent transition-colors"
            >
              @{username}
            </a>
            {displayName && (
              <span className="text-sm text-muted">{displayName}</span>
            )}
          </div>
          <TextLink href={profileUrl} external className="mt-2 text-sm">
            View LeetCode profile
          </TextLink>
        </div>
      </div>
    </div>
  )
}