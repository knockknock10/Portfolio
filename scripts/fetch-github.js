#!/usr/bin/env node
import { readFile, writeFile } from "node:fs/promises";

const ROOT = process.cwd();
const TOKEN = process.env.GITHUB_TOKEN;
const HEADERS = {
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
  "User-Agent": "PortfolioDataRefresh"
};
if (TOKEN) HEADERS.Authorization = "Bearer " + TOKEN;
const errors = [];

function updateBlock(source, name, body) {
  const start = "<!-- " + name + ":START -->";
  const end = "<!-- " + name + ":END -->";
  const a = source.indexOf(start);
  const b = source.indexOf(end, a + start.length);
  if (a < 0 || b < 0) throw new Error("Missing block markers: " + name);
  return source.slice(0, a + start.length) + "\n" + body + "\n" + source.slice(b);
}
function table(rows) {
  if (!rows.length) return "MISSING";
  const keys = Object.keys(rows[0]);
  return "| " + keys.join(" | ") + " |\n| " + keys.map(() => "---").join(" | ") + " |\n" +
    rows.map(row => "| " + keys.map(key => String(row[key] ?? "MISSING").replace(/\|/g, "\\|").replace(/\n/g, " ")).join(" | ") + " |").join("\n");
}
function fence(data) { return "~~~json\n" + JSON.stringify(data, null, 2) + "\n~~~"; }
function missing(value) { return value == null || value === "" ? "MISSING" : value; }
async function api(url, options = {}) {
  let retries = 0;
  while (true) {
    const response = await fetch(url, {
      method: options.method || "GET",
      headers: { ...HEADERS, ...(options.headers || {}) },
      body: options.body ? JSON.stringify(options.body) : undefined
    });
    const raw = response.status === 204 ? "" : await response.text();
    let data = null;
    try { data = raw ? JSON.parse(raw) : null; } catch { data = raw; }
    if (response.ok) return { response, data };
    const limited = response.status === 429 || (response.status === 403 &&
      (response.headers.get("x-ratelimit-remaining") === "0" || /rate limit|secondary rate/i.test(JSON.stringify(data))));
    const wait = Number(response.headers.get("retry-after") || 0);
    if (limited && retries < 2 && wait > 0 && wait <= 8) {
      retries++;
      await new Promise(resolve => setTimeout(resolve, wait * 1000));
      continue;
    }
    const error = new Error("HTTP " + response.status + ": " + url + " — " + JSON.stringify(data).slice(0, 400));
    error.rateLimited = limited;
    throw error;
  }
}
async function listAll(url) {
  const result = [];
  let next = url;
  while (next) {
    const page = await api(next);
    if (!Array.isArray(page.data)) throw new Error("Expected list from " + next);
    result.push(...page.data);
    const link = (page.response.headers.get("link") || "").split(",").find(item => /rel="next"/.test(item));
    next = link && link.match(/<([^>]+)>/)?.[1] || null;
  }
  return result;
}
async function safe(field, fn) {
  try { return await fn(); }
  catch (error) {
    errors.push({ field, reason: error.message, rateLimited: Boolean(error.rateLimited) });
    return null;
  }
}
function rankRepos(rows) {
  return rows.slice().sort((a, b) =>
    (Number(b.stargazers_count) || 0) - (Number(a.stargazers_count) || 0) ||
    String(b.pushed_at || "").localeCompare(String(a.pushed_at || "")));
}
function repoRecord(repo) {
  return {
    name: missing(repo.name), description: missing(repo.description), html_url: missing(repo.html_url),
    homepage: missing(repo.homepage), language: missing(repo.language),
    stargazers_count: repo.stargazers_count ?? "MISSING", forks_count: repo.forks_count ?? "MISSING",
    watchers_count: repo.watchers_count ?? "MISSING", open_issues_count: repo.open_issues_count ?? "MISSING",
    topics: Array.isArray(repo.topics) ? repo.topics : [], created_at: missing(repo.created_at),
    updated_at: missing(repo.updated_at), pushed_at: missing(repo.pushed_at),
    license: missing(repo.license && repo.license.spdx_id), size: repo.size ?? "MISSING",
    archived: repo.archived ?? "MISSING", fork: repo.fork ?? "MISSING", default_branch: missing(repo.default_branch)
  };
}
function streakStats(days) {
  const ordered = days.slice().sort((a, b) => a.date.localeCompare(b.date));
  const active = ordered.filter(day => day.contributionCount > 0);
  let longest = 0, run = 0, previous = null, longestGap = 0;
  for (const day of ordered) {
    if (day.contributionCount > 0) {
      const date = Date.parse(day.date + "T00:00:00Z");
      run = previous !== null && date - previous === 86400000 ? run + 1 : 1;
      longest = Math.max(longest, run);
      previous = date;
    } else { run = 0; previous = null; }
  }
  for (let i = 1; i < active.length; i++) {
    longestGap = Math.max(longestGap, (Date.parse(active[i].date + "T00:00:00Z") - Date.parse(active[i - 1].date + "T00:00:00Z")) / 86400000 - 1);
  }
  const today = new Date().toISOString().slice(0, 10);
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  let current = 0;
  if (active.length && (active.at(-1).date === today || active.at(-1).date === yesterday)) {
    for (let i = ordered.length - 1; i >= 0; i--) {
      if (ordered[i].contributionCount > 0) current++;
      else if (current > 0) break;
    }
  }
  return { longestStreak: longest, currentStreak: current, longestGapBetweenContributions: longestGap, totalActiveDays: active.length };
}
async function main() {
  let markdown = await readFile(ROOT + "/PORTFOLIO-DATA.md", "utf8");
  let username = process.env.GITHUB_USERNAME;
  if (!username) {
    const source = await readFile(ROOT + "/lib/portfolio-data.ts", "utf8").catch(() => "");
    username = source.match(/https:\/\/github\.com\/([A-Za-z0-9-]+)/)?.[1] || null;
  }
  if (!username) {
    markdown = updateBlock(markdown, "GITHUB-DATA", "MISSING — no GitHub username found.");
    markdown = updateBlock(markdown, "GITHUB-MISSING", "- GitHub username — MISSING; set GITHUB_USERNAME.");
    await writeFile(ROOT + "/PORTFOLIO-DATA.md", markdown);
    process.exitCode = 1;
    return;
  }
  const profile = await safe("GitHub profile", async () => (await api("https://api.github.com/users/" + encodeURIComponent(username))).data);
  const repos = await safe("Public repositories", async () => listAll("https://api.github.com/users/" + encodeURIComponent(username) + "/repos?type=owner&per_page=100&sort=updated")) || [];
  const gists = await safe("Public gists", async () => listAll("https://api.github.com/users/" + encodeURIComponent(username) + "/gists?per_page=100")) || [];
  const orgs = await safe("Public org membership", async () => listAll("https://api.github.com/users/" + encodeURIComponent(username) + "/orgs?per_page=100")) || [];
  const now = new Date();
  const from = new Date(now.getTime() - 365 * 86400000);
  const query = "query($login:String!,$from:DateTime!,$to:DateTime!){user(login:$login){contributionsCollection(from:$from,to:$to){totalContributions totalCommitContributions contributionCalendar{totalContributions weeks{contributionDays{date contributionCount color}}}}}}";
  const graph = TOKEN ? await safe("GitHub GraphQL contribution calendar", async () => {
    const result = (await api("https://api.github.com/graphql", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: { query, variables: { login: username, from: from.toISOString(), to: now.toISOString() } }
    })).data;
    if (result.errors?.length) throw new Error(result.errors.map(item => item.message).join("; "));
    return result.data?.user?.contributionsCollection || null;
  }) : null;
  const searches = {};
  const searchQueries = {
    prsOpened: "author:" + username + " is:pr",
    prsMerged: "author:" + username + " is:pr is:merged",
    prsReviewed: "reviewed-by:" + username + " is:pr",
    issuesOpened: "author:" + username + " is:issue",
    issuesClosed: "author:" + username + " is:issue is:closed"
  };
  for (const [key, queryText] of Object.entries(searchQueries)) {
    searches[key] = await safe("Search " + key, async () =>
      (await api("https://api.github.com/search/issues?q=" + encodeURIComponent(queryText) + "&per_page=100&sort=created&order=desc")).data);
  }
  const commits = [];
  const byRepo = {};
  let cursor = 0;
  const workers = Array.from({ length: Math.min(TOKEN ? 4 : 2, repos.length) }, async () => {
    while (cursor < repos.length) {
      const repo = repos[cursor++];
      const rows = await safe("Commit history " + repo.full_name, async () =>
        listAll("https://api.github.com/repos/" + repo.full_name + "/commits?author=" + encodeURIComponent(username) +
          "&since=" + encodeURIComponent(from.toISOString()) + "&until=" + encodeURIComponent(now.toISOString()) + "&per_page=100"));
      if (!rows) { byRepo[repo.full_name] = { count: "MISSING", lastCommitDate: "MISSING" }; continue; }
      const entries = rows.map(item => ({
        repository: repo.full_name, sha: item.sha, url: item.html_url,
        date: item.commit?.author?.date || item.commit?.committer?.date || null
      }));
      commits.push(...entries);
      byRepo[repo.full_name] = { count: entries.length, lastCommitDate: entries.map(item => item.date).filter(Boolean).sort().at(-1) || "MISSING" };
    }
  });
  await Promise.all(workers);
  const totals = {
    publicRepositories: repos.length,
    stars: repos.reduce((sum, item) => sum + (item.stargazers_count || 0), 0),
    forks: repos.reduce((sum, item) => sum + (item.forks_count || 0), 0),
    watchers: repos.reduce((sum, item) => sum + (item.watchers_count || 0), 0),
    openIssues: repos.reduce((sum, item) => sum + (item.open_issues_count || 0), 0),
    commitsLast365Days: graph?.totalCommitContributions ?? commits.length,
    prsOpened: searches.prsOpened?.total_count ?? "MISSING",
    prsMerged: searches.prsMerged?.total_count ?? "MISSING",
    prsReviewed: searches.prsReviewed?.total_count ?? "MISSING",
    issuesOpened: searches.issuesOpened?.total_count ?? "MISSING",
    issuesClosed: searches.issuesClosed?.total_count ?? "MISSING",
    contributionsLast365Days: graph?.totalContributions ?? "MISSING"
  };
  const langs = {};
  for (const repo of repos) if (repo.language) langs[repo.language] = (langs[repo.language] || 0) + 1;
  const denominator = Object.values(langs).reduce((sum, count) => sum + count, 0);
  const languageRows = Object.entries(langs).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([language, count]) => ({
    language, repositories: count, percentage: denominator ? (100 * count / denominator).toFixed(2) + "%" : "MISSING"
  }));
  const orderedRepos = rankRepos(repos);
  const calendar = graph?.contributionCalendar;
  const days = calendar ? (calendar.weeks || []).flatMap(week => week.contributionDays || []) : [];
  const monthly = {}, daily = {}, hours = Array(24).fill(0);
  const weekdays = { Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: 0 };
  for (const commit of commits) if (commit.date) {
    const date = new Date(commit.date);
    const day = date.toISOString().slice(0, 10), month = day.slice(0, 7);
    daily[day] = (daily[day] || 0) + 1;
    monthly[month] = (monthly[month] || 0) + 1;
    hours[date.getUTCHours()]++;
    weekdays[["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][date.getUTCDay()]]++;
  }
  const orgNames = new Set(orgs.map(org => org.login));
  for (const key of ["prsOpened", "prsReviewed", "issuesOpened"]) for (const item of searches[key]?.items || []) {
    const fullName = (item.repository_url || "").replace("https://api.github.com/repos/", "");
    const owner = fullName.split("/")[0];
    if (owner && owner.toLowerCase() !== username.toLowerCase()) orgNames.add(owner);
  }
  const organizationDetails = [];
  for (const name of orgNames) {
    const org = await safe("Organization profile " + name, async () => (await api("https://api.github.com/orgs/" + encodeURIComponent(name))).data);
    const membership = await safe("Public membership " + name, async () => {
      const response = await fetch("https://api.github.com/orgs/" + encodeURIComponent(name) + "/public_members/" + encodeURIComponent(username), { headers: HEADERS });
      if (response.status === 204) return "public member";
      if (response.status === 404) return "not listed as a public member";
      if (!response.ok) throw new Error("HTTP " + response.status);
      return "public member";
    });
    const contributionSearch = {};
    for (const [key, queryText] of Object.entries({
      prs: "org:" + name + " author:" + username + " is:pr",
      reviews: "org:" + name + " reviewed-by:" + username + " is:pr",
      issues: "org:" + name + " author:" + username + " is:issue",
      comments: "org:" + name + " commenter:" + username
    })) {
      contributionSearch[key] = await safe("Organization " + name + " " + key, async () => {
        const result = (await api("https://api.github.com/search/issues?q=" + encodeURIComponent(queryText) + "&per_page=100&sort=created&order=desc")).data;
        return {
          total_count: result.total_count,
          items: (result.items || []).map(item => ({
            title: item.title || "MISSING", url: item.html_url || "MISSING", state: item.state || "MISSING",
            created_at: item.created_at || "MISSING", merged_at: item.pull_request?.merged_at || "MISSING",
            submitted_at: "MISSING — not exposed by issue search results",
            repository: (item.repository_url || "").replace("https://api.github.com/repos/") || "MISSING"
          }))
        };
      });
    }
    const worked = new Set();
    for (const result of Object.values(contributionSearch)) for (const item of result?.items || []) if (item.repository !== "MISSING") worked.add(item.repository);
    for (const commit of commits) if (commit.repository.toLowerCase().startsWith(name.toLowerCase() + "/")) worked.add(commit.repository);
    organizationDetails.push({
      login: name, name: org?.name || "MISSING", avatar_url: org?.avatar_url || "MISSING",
      description: org?.description || "MISSING", url: "https://github.com/" + name,
      public_repos: org?.public_repos ?? "MISSING", followers: org?.followers ?? "MISSING",
      membership: membership || "MISSING",
      repositories: [...worked].sort().map(fullName => ({
        name: fullName, url: "https://github.com/" + fullName,
        role: membership === "public member" ? "member" : "contributor",
        commits: byRepo[fullName]?.count ?? "MISSING", lastCommitDate: byRepo[fullName]?.lastCommitDate ?? "MISSING"
      })),
      contributions: contributionSearch
    });
  }
  const profileRows = profile ? ["login","name","avatar_url","bio","company","blog","location","email","twitter_username","hireable","public_repos","public_gists","followers","following","created_at"].map(field => ({ field, value: missing(profile[field]) })) : [];
  const output = [
    "### Profile\n\n" + table(profileRows),
    "### Stats\n\n" + table(Object.entries(totals).map(([metric, value]) => ({ metric, value }))),
    "### Most-used primary languages\n\nRepository-count share, not source-code byte share.\n\n" + table(languageRows),
    "### Featured repositories\n\n" + table(orderedRepos.filter(item => !item.fork).slice(0, 5).map(item => ({ name: item.name, stars: item.stargazers_count, lastPushed: item.pushed_at, url: item.html_url }))),
    "### Repository details (top 20)\n\n" + fence(orderedRepos.slice(0, 20).map(repoRecord)),
    "### Public gists\n\n" + (gists.length ? fence(gists.map(item => ({ id: item.id, description: missing(item.description), html_url: item.html_url, created_at: item.created_at, updated_at: item.updated_at, files: Object.values(item.files || {}).map(file => ({ name: file.filename, language: missing(file.language) })) }))) : "None returned; 0 public gists."),
    "### Organizations and contributions\n\n" + fence(organizationDetails),
    "### Contribution calendar\n\n" + (calendar ? fence({ totalContributions: calendar.totalContributions, weeks: calendar.weeks }) : "MISSING — GitHub GraphQL requires GITHUB_TOKEN."),
    "### Git graph\n\n" + fence({
      from: from.toISOString(), to: now.toISOString(), byRepository: byRepo, byMonth: monthly,
      mostActiveRepository: Object.entries(byRepo).sort((a, b) => (Number(b[1].count) || 0) - (Number(a[1].count) || 0))[0]?.[0] || "MISSING",
      mostActiveMonth: Object.entries(monthly).sort((a, b) => b[1] - a[1])[0]?.[0] || "MISSING",
      dailyCommits: daily, streaks: calendar ? streakStats(days) : "MISSING", dailyContributions: calendar ? days : "MISSING",
      commitsByHourUTC: commits.length ? hours : "MISSING", commitsByWeekdayUTC: commits.length ? weekdays : "MISSING"
    }),
    "### Diagnostics\n\n" + fence({ snapshotDate: now.toISOString(), tokenAvailable: Boolean(TOKEN), errors })
  ].join("\n\n");
  const missingItems = errors.map(error => "- " + error.field + " — MISSING: " + error.reason);
  if (!TOKEN) missingItems.push("- GitHub GraphQL contribution calendar — MISSING: GITHUB_TOKEN not set.");
  if (!calendar) missingItems.push("- Full contribution calendar, streaks and contribution-based active days — MISSING: GraphQL calendar unavailable.");
  markdown = updateBlock(markdown, "GITHUB-DATA", output);
  markdown = updateBlock(markdown, "GITHUB-MISSING", missingItems.join("\n"));
  markdown = updateBlock(markdown, "GITHUB-ORG-MISSING", organizationDetails.length ? "Organization fetch attempted; see Diagnostics for any missing activity fields." : "- Organization contributions — MISSING: no org profiles returned.");
  await writeFile(ROOT + "/PORTFOLIO-DATA.md", markdown);
  console.log("GitHub data refreshed for " + username + ".");
  if (errors.length) console.error("Some fields remain MISSING; see the report.");
}
main().catch(error => { console.error(error.stack || error.message); process.exitCode = 1; });
