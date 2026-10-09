/**
 * Organization card — a compact path to real repository-level contribution evidence.
 * Counts are intentionally omitted because anonymous search results are not exhaustive.
 */
export default function OrganizationCard({ org, onClick }) {
  const repositories = Array.isArray(org.repositories) ? org.repositories : []

  return (
    <article className="org-card min-w-0">
      <div className="flex items-start gap-3">
        {org.avatarUrl ? (
          <img
            src={org.avatarUrl}
            alt=""
            className="org-avatar"
            width={40}
            height={40}
            loading="lazy"
          />
        ) : (
          <span className="org-avatar org-avatar-fallback" aria-hidden="true">
            {org.login.slice(0, 1).toUpperCase()}
          </span>
        )}

        <div className="min-w-0 flex-1">
          <h3 className="org-name break-words">{org.name || org.login}</h3>
          <p className="org-login break-words">@{org.login}</p>
        </div>

        <a
          href={org.url || `https://github.com/${org.login}`}
          target="_blank"
          rel="noopener noreferrer"
          className="org-external-link"
          aria-label={`Open ${org.name || org.login} on GitHub`}
        >
          ↗
        </a>
      </div>

      {org.description && <p className="org-description">{org.description}</p>}

      {repositories.length > 0 && (
        <div className="org-repositories">
          <span className="org-repositories-label">Repositories in recent PR results</span>
          {repositories.slice(0, 3).map((repository) => (
            <span key={repository} className="org-repository-name" title={repository}>
              {repository}
            </span>
          ))}
          {repositories.length > 3 && (
            <span className="org-repository-more">+{repositories.length - 3} more</span>
          )}
        </div>
      )}

      <div className="mt-5">
        <button
          type="button"
          className="org-card-action"
          onClick={() => onClick?.(org.login)}
        >
          View contribution history <span aria-hidden="true">→</span>
        </button>
      </div>
    </article>
  )
}
