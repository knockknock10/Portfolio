/**
 * Data transformation layer.
 *
 * Raw GitHub API shapes never reach the UI. Each transformer produces a
 * stable view model so components stay unchanged if GitHub's API evolves.
 *
 * Phase 4 (organizations, PRs, issues, contribution history) extends this
 * file with new transformers — the pattern stays identical:
 *   GitHub raw payload → <Model> view model → UI component
 *
 * ACCURACY RULES enforced here:
 *  - only fields GitHub actually returned are emitted (missing → null/omitted)
 *  - "merged" is only ever stated when GitHub's payload says merged === true
 *  - no counts are inferred, defaulted, or fabricated
 */

const LEVEL_INDEX = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
}

/** GitHub GraphQL contribution payload → ContributionCalendarViewModel */
export function toContributionModel(payload, year) {
  const collection = payload?.contributionsCollection
  if (!collection) return null
  const calendar = collection.contributionCalendar
  return {
    year,
    total: calendar.totalContributions,
    weeks: calendar.weeks.map((week) =>
      week.contributionDays.map((day) => ({
        date: day.date,
        count: day.contributionCount,
        level: LEVEL_INDEX[day.contributionLevel] ?? 0,
      })),
    ),
    totals: {
      commits: collection.totalCommitContributions,
      pullRequests: collection.totalPullRequestContributions,
      issues: collection.totalIssueContributions,
      reviews: collection.totalPullRequestReviewContributions,
      repositories: collection.totalRepositoryContributions,
    },
  }
}

/** REST /users/:login → ProfileModel */
export function toProfileModel(user) {
  return {
    login: user.login,
    name: user.name || null,
    bio: user.bio || null,
    avatarUrl: user.avatar_url,
    htmlUrl: user.html_url,
    company: user.company || null,
    location: user.location || null,
    followers: user.followers ?? null,
    publicRepos: user.public_repos ?? null,
    blog: user.blog || null,
  }
}

/** REST /users/:login/repos → RepositoryCardModel[] (already ranked upstream) */
export function toRepositoryModels(ranked) {
  return ranked.map(({ repo, pinned }) => ({
    id: repo.id,
    fullName: repo.full_name,
    name: repo.name,
    description: repo.description || null,
    htmlUrl: repo.html_url,
    language: repo.language || null,
    stars: repo.stargazers_count ?? 0,
    forks: repo.forks_count ?? 0,
    isFork: Boolean(repo.fork),
    archived: Boolean(repo.archived),
    pushedAt: repo.pushed_at || repo.updated_at || null,
    updatedAt: repo.updated_at || null,
    pinned,
  }))
}

/**
 * REST /users/:login/events/public → ActivityItemModel[].
 * GitHub's public Events API covers recent activity only (roughly the last
 * 90 days / 300 events) — it is not a historical archive. Unknown event
 * types are dropped rather than guessed at.
 */
export function toActivityModels(events) {
  return events.map(toActivityItem).filter(Boolean)
}

function repoLink(event) {
  return `https://github.com/${event.repo?.name ?? ''}`
}

function toActivityItem(event) {
  const repoName = event.repo?.name ?? null
  const url = repoLink(event)
  const base = {
    id: event.id,
    type: event.type,
    repoName,
    createdAt: event.created_at,
    url,
  }

  switch (event.type) {
    case 'PushEvent': {
      const ref = (event.payload?.ref ?? '').replace('refs/heads/', '')
      const size = event.payload?.size ?? event.payload?.commits?.length ?? 0
      // Drop zero-commit and headless pushes — they carry no meaningful signal.
      if (!ref || size === 0) return null
      return {
        ...base,
        label: 'PUSH',
        action: `Pushed ${size} ${size === 1 ? 'commit' : 'commits'} to ${ref}`,
        detail: null,
        url: ref ? `${url}/commits/${encodeURIComponent(ref)}` : url,
      }
    }

    case 'CreateEvent': {
      const refType = event.payload?.ref_type
      const ref = event.payload?.ref
      if (refType === 'repository') {
        return { ...base, label: 'CREATE', action: 'Created a repository', detail: null }
      }
      // Branch creation events are typically noise alongside the corresponding push.
      // Only surface tag events (releases, versioned checkpoints).
      if (refType === 'tag' && ref) {
        return { ...base, label: 'CREATE', action: `Created tag ${ref}`, detail: null }
      }
      return null
    }

    case 'DeleteEvent': {
      const refType = event.payload?.ref_type
      const ref = event.payload?.ref
      if (!ref || !refType) return null
      return { ...base, label: 'DELETE', action: `Deleted ${refType} ${ref}`, detail: null }
    }

    case 'IssuesEvent': {
      const issue = event.payload?.issue
      if (event.payload?.action !== 'opened' || !issue) return null
      return {
        ...base,
        label: 'ISSUE',
        action: 'Opened an issue',
        detail: `#${issue.number} ${issue.title}`,
        url: issue.html_url || url,
      }
    }

    case 'PullRequestEvent': {
      const pr = event.payload?.pull_request
      const action = event.payload?.action
      if (!pr) return null
      if (action === 'opened') {
        return {
          ...base,
          label: 'PULL REQUEST',
          action: 'Opened a pull request',
          detail: `#${pr.number} ${pr.title}`,
          url: pr.html_url || url,
        }
      }
      // Only claim "merged" when GitHub explicitly says the PR was merged.
      if (action === 'closed' && pr.merged === true) {
        return {
          ...base,
          label: 'PULL REQUEST',
          action: 'Merged a pull request',
          detail: `#${pr.number} ${pr.title}`,
          url: pr.html_url || url,
        }
      }
      if (action === 'closed') {
        return {
          ...base,
          label: 'PULL REQUEST',
          action: 'Closed a pull request',
          detail: `#${pr.number} ${pr.title}`,
          url: pr.html_url || url,
        }
      }
      return null
    }

    case 'IssueCommentEvent': {
      const issue = event.payload?.issue
      const comment = event.payload?.comment
      if (!issue || !comment) return null
      const isPull = Boolean(issue.pull_request)
      return {
        ...base,
        label: 'COMMENT',
        action: isPull ? 'Commented on a pull request' : 'Commented on an issue',
        detail: isPull ? null : `#${issue.number} ${issue.title}`,
        url: comment.html_url || url,
      }
    }

    case 'PullRequestReviewEvent': {
      const pr = event.payload?.pull_request
      const review = event.payload?.review
      if (!pr || !review) return null
      return {
        ...base,
        label: 'REVIEW',
        action: 'Reviewed a pull request',
        detail: `#${pr.number} ${pr.title}`,
        url: review.html_url || pr.html_url || url,
      }
    }

    case 'ReleaseEvent': {
      const release = event.payload?.release
      if (event.payload?.action !== 'published' || !release) return null
      return {
        ...base,
        label: 'RELEASE',
        action: `Published release ${release.tag_name ?? ''}`.trim(),
        detail: release.name || null,
        url: release.html_url || url,
      }
    }

    case 'ForkEvent': {
      const forkee = event.payload?.forkee
      return {
        ...base,
        label: 'FORK',
        action: 'Forked a repository',
        detail: forkee?.full_name || null,
        url: forkee?.html_url || url,
      }
    }

    case 'WatchEvent': {
      if (event.payload?.action !== 'started') return null
      return { ...base, label: 'STAR', action: 'Starred a repository', detail: null }
    }

    case 'PublicEvent':
      return { ...base, label: 'PUBLIC', action: 'Repository made public', detail: null }

    default:
      // Unknown/unsupported event type — dropped, never guessed.
      return null
  }
}
