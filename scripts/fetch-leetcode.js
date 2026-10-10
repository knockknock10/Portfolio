#!/usr/bin/env node
import { readFile, writeFile } from "node:fs/promises";
const ROOT = process.cwd(), errors = [];
function updateBlock(source, name, body) {
  const start = "<!-- " + name + ":START -->", end = "<!-- " + name + ":END -->";
  const a = source.indexOf(start), b = source.indexOf(end, a + start.length);
  if (a < 0 || b < 0) throw new Error("Missing block markers: " + name);
  return source.slice(0, a + start.length) + "\n" + body + "\n" + source.slice(b);
}
function table(rows) {
  if (!rows.length) return "MISSING";
  const keys = Object.keys(rows[0]);
  return "| " + keys.join(" | ") + " |\n| " + keys.map(() => "---").join(" | ") + " |\n" +
    rows.map(row => "| " + keys.map(key => String(row[key] ?? "MISSING").replace(/\|/g, "\\|").replace(/\n/g, " ")).join(" | ") + " |").join("\n");
}
function fence(value) { return "~~~json\n" + JSON.stringify(value, null, 2) + "\n~~~"; }
async function query(queryText, label) {
  let retries = 0;
  while (true) {
    const response = await fetch("https://leetcode.com/graphql/?query=" + encodeURIComponent(queryText), {
      headers: { Accept: "application/json", "User-Agent": "Mozilla/5.0 PortfolioDataRefresh" }
    });
    const raw = await response.text();
    let data = null;
    try { data = JSON.parse(raw); } catch {}
    if (response.ok && data && !(data.errors && data.errors.length)) return data.data;
    const limited = response.status === 429 || /rate limit/i.test(raw);
    const wait = Number(response.headers.get("retry-after") || 0);
    if (limited && retries < 2 && wait > 0 && wait <= 8) {
      retries++;
      await new Promise(resolve => setTimeout(resolve, wait * 1000));
      continue;
    }
    const error = new Error(label + " failed (HTTP " + response.status + "): " +
      (data && data.errors ? data.errors.map(item => item.message).join("; ") : raw.slice(0, 400)));
    errors.push({ field: label, reason: error.message, rateLimited: limited });
    throw error;
  }
}
function calendar(raw, start, end) {
  const map = {};
  for (const [stamp, count] of Object.entries(raw || {})) {
    const date = new Date(Number(stamp) * 1000).toISOString().slice(0, 10);
    map[date] = (map[date] || 0) + Number(count || 0);
  }
  const rows = [];
  for (let cursor = new Date(start); cursor <= end; cursor.setUTCDate(cursor.getUTCDate() + 1)) {
    const date = cursor.toISOString().slice(0, 10);
    rows.push({ date, submissions: map[date] || 0 });
  }
  return rows;
}
function missing(value) { return value == null || value === "" ? "MISSING" : value; }
async function main() {
  let markdown = await readFile(ROOT + "/PORTFOLIO-DATA.md", "utf8");
  let username = process.env.LEETCODE_USERNAME;
  if (!username) {
    const config = await readFile(ROOT + "/lib/portfolio-data.ts", "utf8").catch(() => "");
    username = config.match(/leetcode\.com\/u\/([^/"\s]+)/)?.[1] || null;
  }
  if (!username) {
    markdown = updateBlock(markdown, "LEETCODE-DATA", "MISSING — no LeetCode username found.");
    markdown = updateBlock(markdown, "LEETCODE-MISSING", "- LeetCode username — MISSING; set LEETCODE_USERNAME or configure a LeetCode URL.");
    await writeFile(ROOT + "/PORTFOLIO-DATA.md", markdown);
    process.exitCode = 1;
    return;
  }
  const base = 'username: "' + username + '"';
  const queries = {
    profile: "{ allQuestionsCount { difficulty count } matchedUser(" + base + ") { username profile { ranking realName aboutMe userAvatar countryName company school websites reputation } submitStats { acSubmissionNum { difficulty count submissions } totalSubmissionNum { difficulty count submissions } } userCalendar { activeYears streak totalActiveDays submissionCalendar } languageProblemCount { languageName problemsSolved } tagProblemCounts { advanced { tagName tagSlug problemsSolved } intermediate { tagName tagSlug problemsSolved } fundamental { tagName tagSlug problemsSolved } } } }",
    contest: '{ userContestRanking(username: "' + username + '") { attendedContestsCount rating globalRanking totalParticipants topPercentage badge { name icon } } userContestRankingHistory(username: "' + username + '") { attended contest { title startTime } rating ranking } }',
    recent: '{ recentAcSubmissionList(username: "' + username + '", limit: 20) { id title titleSlug timestamp statusDisplay lang runtime memory } }'
  };
  const data = {};
  for (const [name, queryText] of Object.entries(queries)) {
    try { data[name] = await query(queryText, name); } catch {}
  }
  const user = data.profile && data.profile.matchedUser;
  const profile = user && user.profile || {};
  const ac = Object.fromEntries((user && user.submitStats && user.submitStats.acSubmissionNum || []).map(row => [row.difficulty, row]));
  const all = Object.fromEntries((user && user.submitStats && user.submitStats.totalSubmissionNum || []).map(row => [row.difficulty, row]));
  const questions = Object.fromEntries((data.profile && data.profile.allQuestionsCount || []).map(row => [row.difficulty, row.count]));
  const acceptance = Number(all.All && all.All.submissions || 0)
    ? (100 * Number(ac.All && ac.All.submissions || 0) / Number(all.All.submissions)).toFixed(2) + "%" : "MISSING";
  let rawCalendar = {};
  try { rawCalendar = JSON.parse(user && user.userCalendar && user.userCalendar.submissionCalendar || "{}"); } catch {}
  const end = new Date(new Date().toISOString().slice(0, 10) + "T00:00:00Z");
  const start = new Date(end.getTime() - 364 * 86400000);
  const activity = calendar(rawCalendar, start, end);
  const ranking = data.contest && data.contest.userContestRanking;
  const profileRows = [
    { field: "username", value: missing(user && user.username) }, { field: "realName", value: missing(profile.realName) },
    { field: "aboutMe", value: missing(profile.aboutMe) }, { field: "avatar", value: missing(profile.userAvatar) },
    { field: "country", value: missing(profile.countryName) }, { field: "company", value: missing(profile.company) },
    { field: "school", value: missing(profile.school) }, { field: "websites", value: profile.websites && profile.websites.length ? profile.websites.join(", ") : "MISSING" },
    { field: "ranking", value: profile.ranking ?? "MISSING" }, { field: "reputation", value: profile.reputation ?? "MISSING" },
    { field: "solutionCount", value: "MISSING" }, { field: "categoryDiscussCount", value: "MISSING" }, { field: "postViewCount", value: "MISSING" }
  ];
  const solvedRows = ["All", "Easy", "Medium", "Hard"].map(difficulty => ({
    difficulty, solved: ac[difficulty] ? ac[difficulty].count : "MISSING",
    totalQuestions: questions[difficulty] ?? "MISSING",
    acceptedSubmissions: ac[difficulty] ? ac[difficulty].submissions : "MISSING",
    allSubmissions: all[difficulty] ? all[difficulty].submissions : "MISSING"
  }));
  const contestRows = [
    { metric: "attendedContestsCount", value: ranking ? ranking.attendedContestsCount : "MISSING" },
    { metric: "rating", value: ranking ? ranking.rating : "MISSING" },
    { metric: "globalRanking", value: ranking ? ranking.globalRanking : "MISSING" },
    { metric: "totalParticipants", value: ranking ? ranking.totalParticipants : "MISSING" },
    { metric: "topPercentage", value: ranking && ranking.topPercentage != null ? ranking.topPercentage + "%" : "MISSING" },
    { metric: "badge", value: ranking && ranking.badge ? ranking.badge.name : "MISSING" },
    { metric: "badge icon", value: ranking && ranking.badge && ranking.badge.icon ? (ranking.badge.icon.startsWith("http") ? ranking.badge.icon : "https://leetcode.com" + ranking.badge.icon) : "MISSING" }
  ];
  const history = (data.contest && data.contest.userContestRankingHistory || []).filter(row => row.attended)
    .sort((a, b) => a.contest.startTime - b.contest.startTime).slice(-10)
    .map(row => ({ contest: row.contest.title, date: new Date(Number(row.contest.startTime) * 1000).toISOString().slice(0, 10), rank: row.ranking, ratingAfterContest: Number(Number(row.rating).toFixed(3)) }));
  const skills = {};
  for (const category of ["fundamental", "intermediate", "advanced"]) skills[category] = (user && user.tagProblemCounts && user.tagProblemCounts[category] || []).map(row => ({
    tag: row.tagName, slug: row.tagSlug, solved: row.problemsSolved,
    percentOfTotalSolved: ac.All && ac.All.count ? Number((100 * row.problemsSolved / ac.All.count).toFixed(2)) : "MISSING"
  }));
  const languages = (user && user.languageProblemCount || []).map(row => ({ language: row.languageName, problemsSolved: row.problemsSolved }));
  const recent = (data.recent && data.recent.recentAcSubmissionList || []).map(row => ({
    id: row.id, title: (row.title || "").trim(), url: row.titleSlug ? "https://leetcode.com/problems/" + row.titleSlug + "/" : "MISSING",
    language: row.lang || "MISSING", status: row.statusDisplay || "MISSING",
    timestamp: row.timestamp ? new Date(Number(row.timestamp) * 1000).toISOString() : "MISSING",
    runtime: row.runtime || "MISSING", memory: row.memory || "MISSING"
  }));
  const sections = [
    "### Profile\n\n" + table(profileRows),
    "### Solved problems\n\n" + table(solvedRows) + "\n\nAcceptance rate: " + acceptance + ".\n\nContribution points: MISSING.",
    "### Contest stats\n\n" + table(contestRows) + "\n\n### Last 10 attended contests\n\n" + (history.length ? table(history) : "MISSING"),
    "### Skills by category\n\n" + Object.entries(skills).map(([category, rows]) => "#### " + category + "\n\n" + (rows.length ? table(rows) : "MISSING")).join("\n\n"),
    "### Programming languages\n\n" + (languages.length ? table(languages) : "MISSING"),
    "### Activity\n\n" + table([
      { metric: "activeYears", value: user && user.userCalendar ? (user.userCalendar.activeYears || []).join(", ") : "MISSING" },
      { metric: "totalActiveDays", value: user && user.userCalendar ? user.userCalendar.totalActiveDays : "MISSING" },
      { metric: "maxStreak", value: user && user.userCalendar ? user.userCalendar.streak : "MISSING" },
      { metric: "activeDaysLast365", value: activity.filter(row => row.submissions > 0).length },
      { metric: "currentStreak", value: "MISSING" }
    ]) + "\n\nDaily submission calendar:\n\n" + fence(activity),
    "### Recent accepted submissions\n\n" + (recent.length ? fence(recent) : "MISSING") + "\n\nThe public recent-submission endpoint returns accepted submissions only.",
    "### Raw contest payload\n\n" + fence(data.contest || "MISSING"),
    "### Diagnostics\n\n" + fence({ snapshotDate: new Date().toISOString(), username, errors })
  ].join("\n\n");
  const missingFields = errors.map(error => "- " + error.field + " — MISSING: " + error.reason);
  missingFields.push(
    "- solutionCount/categoryDiscussCount — MISSING: not exposed by queried public GraphQL fields.",
    "- Exact postViewCount — MISSING: exact value not available.",
    "- contributionPoints — MISSING: public response exposes reputation instead.",
    "- Current streak — MISSING: no explicit current-streak field.",
    "- Full recent attempts — MISSING: endpoint returns accepted submissions only."
  );
  markdown = updateBlock(markdown, "LEETCODE-DATA", sections.join("\n\n"));
  markdown = updateBlock(markdown, "LEETCODE-MISSING", missingFields.join("\n"));
  await writeFile(ROOT + "/PORTFOLIO-DATA.md", markdown);
  console.log("LeetCode data refreshed for " + username + ".");
  if (errors.length) console.error("Some fields remain MISSING.");
}
main().catch(error => { console.error(error.stack || error.message); process.exitCode = 1; });
