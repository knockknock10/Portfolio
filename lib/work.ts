import "server-only"

import { readFileSync } from "node:fs"
import { join } from "node:path"

export type MissingValue = "MISSING"
export type DataValue<T> = T | MissingValue

export type WorkImage = {
  src: string
  alt: string
  projectTitle: string
  width?: number
  height?: number
}

export interface RepoCommitRecord {
  sha: string
  shortSha: string
  message: string
  date: string
  html_url: string
}

export interface RepoRecord {
  name: string
  description: DataValue<string>
  html_url: string
  homepage: DataValue<string>
  language: DataValue<string>
  stargazers_count: DataValue<number>
  forks_count: DataValue<number>
  watchers_count: DataValue<number>
  open_issues_count: DataValue<number>
  topics: string[]
  created_at: DataValue<string>
  updated_at: DataValue<string>
  pushed_at: DataValue<string>
  license: DataValue<string>
  size: DataValue<number>
  archived: DataValue<boolean>
  fork: DataValue<boolean>
  default_branch: DataValue<string>
  recent_commits: DataValue<RepoCommitRecord[]>
}

export interface ProjectRecord {
  title: string
  slug: string
  description: DataValue<string>
  longDescription: DataValue<string[]>
  year: DataValue<string | number>
  role: DataValue<string>
  client: DataValue<string>
  medium: DataValue<string>
  tools: DataValue<string[]>
  tags: DataValue<string[]>
  repoUrl: DataValue<string>
  liveUrl: DataValue<string>
  images: DataValue<string | string[]>
  coverImage: DataValue<string>
  process: DataValue<Array<{ title: string; description: string; image: DataValue<string> }>>
  outcomes: DataValue<string | string[]>
  featured: DataValue<boolean>
  order: DataValue<number>
}

export interface ContributionDay {
  date: string
  contributionCount: number
  weekday?: number
}

export interface ContributionWeek {
  contributionDays: ContributionDay[]
}

export interface ContributionCalendar {
  totalContributions: DataValue<number>
  weeks: ContributionWeek[]
}

export interface LeetCodeSolvedRow {
  difficulty: string
  solved: DataValue<number>
  totalQuestions: DataValue<number>
  acceptedSubmissions: DataValue<number>
  allSubmissions: DataValue<number>
}

export interface LeetCodeStats {
  username: string
  profile: Record<string, DataValue<string | number>>
  solved: LeetCodeSolvedRow[]
  acceptanceRate: DataValue<string>
  contest: Record<string, DataValue<string | number>>
  contestHistory: Array<Record<string, DataValue<string | number>>>
  dailySubmissionCalendar: Array<{ date: string; submissions: number }> | null
}

export interface OrganizationSearchItem {
  title: DataValue<string>
  url: DataValue<string>
  state: DataValue<string>
  created_at: DataValue<string>
  merged_at: DataValue<string>
  submitted_at: DataValue<string>
  repository: DataValue<string>
}

export interface OrganizationSearchResult {
  total_count: DataValue<number>
  items: OrganizationSearchItem[]
}

export interface OrganizationRecord {
  login: string
  name?: DataValue<string>
  avatar_url: DataValue<string>
  description: DataValue<string>
  url: string
  public_repos: DataValue<number>
  followers: DataValue<number>
  membership: DataValue<string>
  repositories?: Array<{
    name: string
    url: string
    role: DataValue<string>
    commits: DataValue<number>
    lastCommitDate: DataValue<string>
  }>
  contributions?: {
    prs?: OrganizationSearchResult
    reviews?: OrganizationSearchResult
    issues?: OrganizationSearchResult
    comments?: OrganizationSearchResult
  }
}

export interface RepoItem {
  type: "repo"
  slug: string
  title: string
  description: string | null
  tags: string[]
  featured: boolean
  activityDate: string | null
  coverSrc: string | null
  repo: RepoRecord
  organization: OrganizationRecord | null
  recentCommits: Array<{ message: string; date: string; sha: string; url: string }> | null
}

export interface ProjectItem {
  type: "project"
  slug: string
  title: string
  description: string | null
  tags: string[]
  featured: boolean
  activityDate: string | null
  coverSrc: string | null
  project: ProjectRecord
}

export type WorkItem = RepoItem | ProjectItem

export interface WorkStats {
  totalRepos: DataValue<number>
  totalStars: DataValue<number>
  totalForks: DataValue<number>
  contributionsLast365Days: DataValue<number>
  currentStreak: DataValue<number>
  longestStreak: DataValue<number>
  leetCodeSolved: DataValue<number>
}

export interface WorkData {
  items: WorkItem[]
  projects: ProjectRecord[]
  repos: RepoRecord[]
  organizations: OrganizationRecord[]
  contributionCalendar: ContributionCalendar | null
  leetCode: LeetCodeStats | null
  stats: WorkStats
}

function isMissing(value: unknown): value is MissingValue {
  return value === "MISSING" || value === null || value === undefined || value === ""
}

function valueOrNull<T>(value: DataValue<T> | null | undefined): T | null {
  return isMissing(value) ? null : (value as T)
}

function section(markdown: string, heading: string): string {
  const start = markdown.indexOf(`## ${heading}`)
  if (start < 0) return ""
  const next = markdown.slice(start + 1).search(/^##\s/m)
  return markdown.slice(start, next < 0 ? undefined : start + 1 + next)
}

function markedBlock(markdown: string, name: string): string {
  const start = markdown.indexOf(`<!-- ${name}:START -->`)
  const end = markdown.indexOf(`<!-- ${name}:END -->`, start)
  if (start < 0 || end < 0) return ""
  return markdown.slice(start, end)
}

function jsonAfterHeading<T>(markdown: string, heading: string): T | null {
  const headingAt = markdown.indexOf(heading)
  if (headingAt < 0) return null
  const fenceAt = markdown.indexOf("~~~json", headingAt + heading.length)
  if (fenceAt < 0) return null
  const closeAt = markdown.indexOf("~~~", fenceAt + "~~~json".length)
  if (closeAt < 0) return null
  try {
    return JSON.parse(markdown.slice(fenceAt + "~~~json".length, closeAt).trim()) as T
  } catch {
    return null
  }
}

function tableAfterHeading(markdown: string, heading: string): Array<Record<string, string>> {
  const at = markdown.indexOf(heading)
  if (at < 0) return []
  const lines = markdown.slice(at + heading.length).split("\n")
  const tableLines: string[] = []
  let hasHeader = false
  for (const line of lines) {
    if (!line.trim().startsWith("|")) {
      if (hasHeader) break
      continue
    }
    if (/^\s*\|\s*:?-+/.test(line)) {
      hasHeader = true
      tableLines.push(line)
      continue
    }
    if (!hasHeader) tableLines.push(line)
    else tableLines.push(line)
  }
  if (tableLines.length < 3) return []
  const cells = (line: string) =>
    line
      .split("|")
      .slice(1, -1)
      .map((cell) => cell.trim())
  const headers = cells(tableLines[0])
  return tableLines.slice(2).map((line) => {
    const row = cells(line)
    return Object.fromEntries(headers.map((key, index) => [key, row[index] ?? "MISSING"]))
  })
}

function numeric(value: unknown): number | "MISSING" {
  if (typeof value === "number" && Number.isFinite(value)) return value
  if (
    typeof value === "string" &&
    value.trim() &&
    value !== "MISSING" &&
    Number.isFinite(Number(value))
  ) {
    return Number(value)
  }
  return "MISSING"
}

function tableNumber(rows: Array<Record<string, string>>, key: string): number | "MISSING" {
  const row = rows.find((item) => item.metric === key || item.field === key)
  return numeric(row?.value)
}

function safeDate(value: DataValue<string>): string | null {
  if (isMissing(value) || Number.isNaN(Date.parse(value))) return null
  return value
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}

function projectList(markdown: string): ProjectRecord[] {
  return (
    jsonAfterHeading<ProjectRecord[]>(section(markdown, "5. Project data"), "## 5. Project data") ??
    []
  )
}

function repoList(markdown: string): RepoRecord[] {
  const gh = markedBlock(markdown, "GITHUB-DATA")
  return (
    jsonAfterHeading<RepoRecord[]>(
      gh,
      "### Public repository detail — top 20 by stars then recent push",
    ) ??
    jsonAfterHeading<RepoRecord[]>(gh, "### Repository details (top 20)") ??
    []
  )
}

function organizationList(markdown: string): OrganizationRecord[] {
  const gh = markedBlock(markdown, "GITHUB-DATA")
  return (
    jsonAfterHeading<OrganizationRecord[]>(gh, "### Organizations and contributions") ??
    jsonAfterHeading<OrganizationRecord[]>(gh, "### Public organizations") ??
    []
  )
}

function contributionCalendar(markdown: string): ContributionCalendar | null {
  const gh = markedBlock(markdown, "GITHUB-DATA")
  const calendarText =
    gh.split("### Contribution calendar")[1]?.split(/### Git graph(?: and activity)?/)[0] ?? ""
  if (!calendarText || /\bMISSING\b/i.test(calendarText)) return null
  const parsed = jsonAfterHeading<ContributionCalendar>(gh, "### Contribution calendar")
  if (!parsed || !Array.isArray(parsed.weeks)) return null
  return parsed
}

function parseLeetCode(markdown: string): LeetCodeStats | null {
  const lc = markedBlock(markdown, "LEETCODE-DATA")
  if (!lc) return null
  const profileRows = tableAfterHeading(lc, "### Profile")
  const solvedRows = tableAfterHeading(lc, "### Solved problems")
  const contestRows = tableAfterHeading(lc, "### Contest stats")
  if (!profileRows.length && !solvedRows.length) return null
  const profile = Object.fromEntries(profileRows.map((row) => [row.field, row.value])) as Record<
    string,
    DataValue<string | number>
  >
  const solved: LeetCodeSolvedRow[] = solvedRows.map((row) => ({
    difficulty: row.difficulty,
    solved: numeric(row.solved),
    totalQuestions: numeric(row.totalQuestions),
    acceptedSubmissions: numeric(row.acceptedSubmissions),
    allSubmissions: numeric(row.allSubmissions),
  }))
  const contest = Object.fromEntries(
    contestRows.map((row) => [
      row.metric,
      numeric(row.value) === "MISSING" ? row.value : numeric(row.value),
    ]),
  ) as Record<string, DataValue<string | number>>
  const contestHistory = tableAfterHeading(lc, "### Last 10 attended contests").map((row) => ({
    contest: row.contest,
    date: row.date,
    rank: numeric(row.rank),
    ratingAfterContest: numeric(row.ratingAfterContest),
  }))
  const solvedAll = solved.find((row) => row.difficulty === "All")?.solved
  const acceptanceMatch = lc.match(/Acceptance rate:\s*([^.\n]+)/i)
  const activity = lc.split("### Activity")[1]?.split("### Recent accepted submissions")[0] ?? ""
  const recentCalendar = activity.match(/Daily submission calendar:\s*~~~json\s*([\s\S]*?)\s*~~~/)
  let dailySubmissionCalendar: Array<{ date: string; submissions: number }> | null = null
  if (recentCalendar) {
    try {
      const value = JSON.parse(recentCalendar[1]) as Array<{ date: string; submissions: number }>
      dailySubmissionCalendar = Array.isArray(value) ? value : null
    } catch {
      dailySubmissionCalendar = null
    }
  }
  return {
    username: String(profile.username ?? "knockknock10"),
    profile,
    solved,
    acceptanceRate: acceptanceMatch?.[1]?.trim() ?? "MISSING",
    contest: { ...contest, totalSolved: numeric(solvedAll) },
    contestHistory,
    dailySubmissionCalendar,
  }
}

function featuredRepoNames(markdown: string): Set<string> {
  const rows = tableAfterHeading(markedBlock(markdown, "GITHUB-DATA"), "### Featured repositories")
  return new Set(rows.map((row) => row.name).filter((name) => name && name !== "MISSING"))
}

function repoOwner(url: DataValue<string>): string | null {
  const safe = valueOrNull(url)
  const match = safe?.match(/^https:\/\/github\.com\/([^/]+)\/[^/]+\/?$/i)
  return match?.[1] ?? null
}

export function getWorkData(): WorkData {
  const markdown = readFileSync(join(process.cwd(), "PORTFOLIO-DATA.md"), "utf8")
  const github = markedBlock(markdown, "GITHUB-DATA")
  const aggregateRows = tableAfterHeading(github, "### Aggregate statistics").length
    ? tableAfterHeading(github, "### Aggregate statistics")
    : tableAfterHeading(github, "### Stats")
  const repos = repoList(markdown)
  const projects = projectList(markdown)
  const organizations = organizationList(markdown)
  const calendar = contributionCalendar(markdown)
  const leetCode = parseLeetCode(markdown)
  const featured = featuredRepoNames(markdown)
  const githubGraph =
    jsonAfterHeading<Record<string, unknown>>(github, "### Git graph") ??
    jsonAfterHeading<Record<string, unknown>>(github, "### Git graph and activity")
  const activeDays = calendar?.weeks.flatMap((week) => week.contributionDays) ?? []
  const contributionCounts = activeDays.map((day) => day.contributionCount)
  const contributionsFromCalendar = calendar
    ? contributionCounts.reduce((sum, count) => sum + count, 0)
    : "MISSING"
  const streaks = githubGraph?.streaks as Record<string, unknown> | undefined
  const stats: WorkStats = {
    totalRepos: tableNumber(aggregateRows, "Public repositories"),
    totalStars: tableNumber(aggregateRows, "Total stars"),
    totalForks: tableNumber(aggregateRows, "Total forks"),
    contributionsLast365Days:
      numeric(contributionsFromCalendar) !== "MISSING"
        ? numeric(contributionsFromCalendar)
        : tableNumber(aggregateRows, "Contributions last 365 days"),
    currentStreak: numeric(streaks?.currentStreak),
    longestStreak: numeric(streaks?.longestStreak),
    leetCodeSolved: numeric(leetCode?.solved.find((row) => row.difficulty === "All")?.solved),
  }

  const repoItems: RepoItem[] = repos.map((repo) => {
    const owner = repoOwner(repo.html_url)
    const organization =
      owner && owner.toLowerCase() !== "knockknock10"
        ? (organizations.find((org) => org.login.toLowerCase() === owner.toLowerCase()) ?? null)
        : null
    const coverPath = (repo as RepoRecord & { open_graph_image?: string }).open_graph_image
    const coverSrc =
      typeof coverPath === "string" && coverPath.startsWith("/public/")
        ? coverPath.slice("/public".length)
        : null
    const description = valueOrNull(repo.description)
    const tags = [
      ...repo.topics.filter((topic) => topic && topic !== "MISSING"),
      ...(!isMissing(repo.language) ? [repo.language] : []),
    ]
    const recentCommits = isAvailable(repo.recent_commits) && Array.isArray(repo.recent_commits)
      ? repo.recent_commits.map((commit) => ({ message: commit.message, date: commit.date, sha: commit.sha, url: commit.html_url }))
      : null
    return {
      type: "repo",
      slug: `repo-${slugify(repo.name)}`,
      title: repo.name,
      description,
      tags: [...new Set(tags)],
      featured: featured.has(repo.name),
      activityDate: safeDate(repo.pushed_at),
      coverSrc,
      repo,
      organization,
      recentCommits,
    }
  })

  const projectItems: ProjectItem[] = projects.map((project) => {
    const description = valueOrNull(project.description)
    const tagValue = valueOrNull(project.tags)
    const imageValue = valueOrNull(project.coverImage)
    const coverSrc =
      imageValue && imageValue.startsWith("/public/") ? imageValue.slice("/public".length) : null
    return {
      type: "project",
      slug: project.slug,
      title: project.title,
      description,
      tags: Array.isArray(tagValue) ? tagValue.filter((tag) => tag && tag !== "MISSING") : [],
      featured: project.featured === true,
      activityDate: safeDate(
        String(valueOrNull(project.year) ?? "MISSING") === "MISSING"
          ? "MISSING"
          : `${valueOrNull(project.year)}-01-01`,
      ),
      coverSrc,
      project,
    }
  })

  const items = [...repoItems, ...projectItems].sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1
    const dateA = a.activityDate ? Date.parse(a.activityDate) : 0
    const dateB = b.activityDate ? Date.parse(b.activityDate) : 0
    return dateB - dateA || a.title.localeCompare(b.title)
  })

  return { items, repos, projects, organizations, contributionCalendar: calendar, leetCode, stats }
}

export function isAvailable<T>(value: DataValue<T> | null | undefined): value is T {
  return !isMissing(value)
}
