/**
 * Phase 4 transformers — normalize GitHub API responses to domain models.
 *
 * Raw GitHub shapes never reach the UI.
 * Each transformer produces a stable view model.
 */

const LEVEL_INDEX = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
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