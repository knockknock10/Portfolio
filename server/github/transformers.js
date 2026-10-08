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
      if (!ref) return null
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
      if (refType === 'branch' && ref) {
        return { ...base, label: 'CREATE', action: `Created branch ${ref}`, detail: null }
      }
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

/** Organization discovery from PRs, issues, and contributed repos */
export function toOrganizations(payload, username) {
  const user = payload?.user
  if (!user) return []

  const orgMap = new Map()

  // Helper to add org from a repository owner
  function addOrgFromOwner(owner) {
    if (!owner || owner.__typename !== 'Organization') return
    const login = owner.login
    if (!orgMap.has(login)) {
      orgMap.set(login, {
        login,
        name: owner.name || login,
        avatarUrl: owner.avatarUrl,
        description: owner.description || null,
        url: owner.url || `https://github.com/${login}`,
        prCount: 0,
        issueCount: 0,
        repoSet: new Set(),
        latestActivity: null,
      })
    }
    return orgMap.get(login)
  }

  // Process PRs
  const prs = user.pullRequests?.nodes ?? []
  for (const pr of prs) {
    const org = addOrgFromOwner(pr.repository?.owner)
    if (org) {
      org.prCount += 1
      org.repoSet.add(pr.repository?.nameWithOwner)
      const date = pr.mergedAt || pr.closedAt || pr.updatedAt || pr.createdAt
      if (date && (!org.latestActivity || new Date(date) > new Date(org.latestActivity))) {
        org.latestActivity = date
      }
    }
  }

  // Process issues
  const issues = user.issues?.nodes ?? []
  for (const issue of issues) {
    const org = addOrgFromOwner(issue.repository?.owner)
    if (org) {
      // Only count issues authored by the user
      if (issue.author?.login === username) {
        org.issueCount += 1
      }
      org.repoSet.add(issue.repository?.nameWithOwner)
      const date = issue.closedAt || issue.updatedAt || issue.createdAt
      if (date && (!org.latestActivity || new Date(date) > new Date(org.latestActivity))) {
        org.latestActivity = date
      }
    }
  }

  // Process contributed repositories (catches orgs from commits/etc)
  const contributed = user.repositoriesContributedTo?.nodes ?? []
  for (const repo of contributed) {
    addOrgFromOwner(repo.owner)
  }

  // Convert to array and rank
  const orgs = Array.from(orgMap.values()).map((org) => ({
    login: org.login,
    name: org.name,
    avatarUrl: org.avatarUrl,
    description: org.description,
    url: org.url,
    contributionCount: org.prCount + org.issueCount,
    prCount: org.prCount,
    issueCount: org.issueCount,
    repoCount: org.repoSet.size,
    repositories: Array.from(org.repoSet),
    latestActivity: org.latestActivity,
  }))

  // Rank: PRs first, then issues, then repo count, then recency
  orgs.sort((a, b) => {
    if (b.prCount !== a.prCount) return b.prCount - a.prCount
    if (b.issueCount !== a.issueCount) return b.issueCount - a.issueCount
    if (b.repoCount !== a.repoCount) return b.repoCount - a.repoCount
    return new Date(b.latestActivity ?? 0) - new Date(a.latestActivity ?? 0)
  })

  return orgs
}

/** Organization detail with public repositories */
export function toOrganizationDetail(payload) {
  const org = payload?.organization
  if (!org) return null
  return {
    login: org.login,
    name: org.name || org.login,
    avatarUrl: org.avatarUrl,
    description: org.description || null,
    url: org.url,
    publicRepos: (org.repositories?.nodes ?? []).map((repo) => ({
      name: repo.name,
      nameWithOwner: repo.nameWithOwner,
      description: repo.description || null,
      language: repo.primaryLanguage?.name || null,
      languageColor: repo.primaryLanguage?.color || null,
      stars: repo.stargazerCount ?? 0,
      forks: repo.forkCount ?? 0,
      updatedAt: repo.updatedAt,
      url: repo.url,
    })),
  }
}

/** PR model for organization detail */
export function toContributionPRModel(nodes) {
  return (nodes ?? []).map((pr) => ({
    id: `${pr.repository?.nameWithOwner}#${pr.number}`,
    repoName: pr.repository?.nameWithOwner,
    repoOwner: pr.repository?.owner?.login,
    number: pr.number,
    title: pr.title,
    state: pr.state, // OPEN, MERGED, CLOSED
    isDraft: pr.isDraft ?? false,
    createdAt: pr.createdAt,
    updatedAt: pr.updatedAt,
    mergedAt: pr.mergedAt,
    closedAt: pr.closedAt,
    url: pr.url,
    author: pr.author?.login,
    labels: (pr.labels?.nodes ?? []).map((l) => l.name),
  }))
}

/** Issue model for organization detail */
export function toContributionIssueModel(nodes, username) {
  return (nodes ?? []).map((issue) => {
    const isAssigned = (issue.assignees?.nodes ?? []).some((a) => a.login === username)
    const isAuthor = issue.author?.login === username
    let myRole = 'commented'
    if (isAuthor) myRole = 'opened'
    else if (isAssigned) myRole = 'assigned'

    return {
      id: `${issue.repository?.nameWithOwner}#${issue.number}`,
      repoName: issue.repository?.nameWithOwner,
      repoOwner: issue.repository?.owner?.login,
      number: issue.number,
      title: issue.title,
      state: issue.state, // OPEN, CLOSED
      myRole,
      createdAt: issue.createdAt,
      updatedAt: issue.updatedAt,
      closedAt: issue.closedAt,
      url: issue.url,
      author: issue.author?.login,
      assignees: (issue.assignees?.nodes ?? []).map((a) => a.login),
      labels: (issue.labels?.nodes ?? []).map((l) => l.name),
    }
  })
}

/** Timeline events from PRs, issues, reviews */
export function toTimelineEvents(payload, username) {
  const user = payload?.user
  if (!user) return []

  const events = []

  // PR events
  for (const pr of user.pullRequests?.nodes ?? []) {
    events.push({
      type: 'PULL_REQUEST',
      repoName: pr.repository?.nameWithOwner,
      org: pr.repository?.owner?.login,
      number: pr.number,
      title: pr.title,
      state: pr.state, // OPEN, MERGED, CLOSED
      isDraft: pr.isDraft ?? false,
      date: pr.mergedAt || pr.closedAt || pr.updatedAt || pr.createdAt,
      url: pr.url,
      action: pr.isDraft ? 'Draft PR' : pr.state === 'MERGED' ? 'Merged PR' : pr.state === 'CLOSED' ? 'Closed PR' : 'Opened PR',
    })
  }

  // Issue events (authored or assigned)
  for (const issue of user.issues?.nodes ?? []) {
    const isAssigned = (issue.assignees?.nodes ?? []).some((a) => a.login === username)
    const isAuthor = issue.author?.login === username
    if (!isAuthor && !isAssigned) continue

    events.push({
      type: 'ISSUE',
      repoName: issue.repository?.nameWithOwner,
      org: issue.repository?.owner?.login,
      number: issue.number,
      title: issue.title,
      state: issue.state, // OPEN, CLOSED
      date: issue.closedAt || issue.updatedAt || issue.createdAt,
      url: issue.url,
      action: isAuthor ? 'Opened issue' : 'Assigned issue',
      myRole: isAuthor ? 'opened' : 'assigned',
    })
  }

  // Sort by date descending
  events.sort((a, b) => new Date(b.date) - new Date(a.date))
  return events
}

/** Summary counts for the open-source page */
export function toSummaryCounts(payload, username) {
  const user = payload?.user
  if (!user) return {}

  const prs = user.pullRequests?.nodes ?? []
  const issues = user.issues?.nodes ?? []

  const orgSet = new Set()
  const repoSet = new Set()

  for (const pr of prs) {
    if (pr.repository?.owner?.__typename === 'Organization') orgSet.add(pr.repository.owner.login)
    repoSet.add(pr.repository?.nameWithOwner)
  }
  for (const issue of issues) {
    if (issue.repository?.owner?.__typename === 'Organization') orgSet.add(issue.repository.owner.login)
    repoSet.add(issue.repository?.nameWithOwner)
  }

  return {
    organizations: orgSet.size,
    repositories: repoSet.size,
    totalPRs: prs.length,
    mergedPRs: prs.filter((p) => p.state === 'MERGED').length,
    openPRs: prs.filter((p) => p.state === 'OPEN' && !p.isDraft).length,
    draftPRs: prs.filter((p) => p.isDraft).length,
    closedPRs: prs.filter((p) => p.state === 'CLOSED' && !p.isDraft && !p.mergedAt).length,
    totalIssues: issues.length,
    assignedIssues: issues.filter((i) => (i.assignees?.nodes ?? []).some((a) => a.login === username)).length,
    openedIssues: issues.filter((i) => i.author?.login === username).length,
    openIssues: issues.filter((i) => i.state === 'OPEN').length,
  }
}