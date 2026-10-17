"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "./OpenSourceShowcase.module.css";

const githubProfile = "https://github.com/knockknock10";
const allPullRequests = "https://github.com/pulls?q=is%3Apr+author%3Aknockknock10";

const contributions = [
  {
    id: "kestra-databricks-290",
    organization: "Kestra",
    handle: "kestra-io",
    organizationUrl: "https://github.com/kestra-io",
    logo: "https://github.com/kestra-io.png",
    repository: "plugin-databricks",
    title: "DBFS trigger support",
    number: 290,
    status: "Merged",
    url: "https://github.com/kestra-io/plugin-databricks/pull/290",
    description: "Added Databricks task-plugin functionality with execution handling and focused test coverage.",
    tags: ["Java", "Gradle", "Plugin"],
  },
  {
    id: "kestra-snyk-27",
    organization: "Kestra",
    handle: "kestra-io",
    organizationUrl: "https://github.com/kestra-io",
    logo: "https://github.com/kestra-io.png",
    repository: "plugin-snyk",
    title: "Issue listing and polling",
    number: 27,
    status: "Open",
    url: "https://github.com/knockknock10/plugin-snyk/pull/27",
    description: "Introduces issue listing and polling-trigger support, with tests and maintainer feedback in the review loop.",
    tags: ["Java", "Gradle", "API"],
  },
  {
    id: "kestra-fabric-39",
    organization: "Kestra",
    handle: "kestra-io",
    organizationUrl: "https://github.com/kestra-io",
    logo: "https://github.com/kestra-io.png",
    repository: "plugin-microsoft-fabric",
    title: "Microsoft Fabric integration",
    number: 39,
    status: "Open",
    url: "https://github.com/kestra-io/plugin-microsoft-fabric/pull/39",
    description: "Plugin work around Microsoft Fabric workspace management and data-pipeline integration.",
    tags: ["Java", "Azure", "Plugin"],
  },
  {
    id: "camel-k-6866",
    organization: "Apache Camel K",
    handle: "apache",
    organizationUrl: "https://github.com/apache/camel-k",
    logo: "https://github.com/apache.png",
    repository: "camel-k",
    title: "NetworkPolicy cleanup",
    number: 6866,
    status: "Merged",
    url: "https://github.com/apache/camel-k/pull/6866",
    description: "Worked on network-policy test setup and E2E validation in the Camel K Kubernetes workflow.",
    tags: ["Kubernetes", "Tests", "Networking"],
  },
  {
    id: "wanaku-245",
    organization: "Wanaku AI",
    handle: "wanaku-ai",
    organizationUrl: "https://github.com/wanaku-ai",
    logo: "https://github.com/wanaku-ai.png",
    repository: "wanaku-tests",
    title: "Policy lifecycle tests",
    number: 245,
    status: "Merged",
    url: "https://github.com/wanaku-ai/wanaku-tests/pull/245",
    description: "Added test-focused improvements that make policy lifecycle behavior easier to validate.",
    tags: ["Java", "Tests", "CI/CD"],
  },
  {
    id: "aevor-114",
    organization: "Aevor",
    handle: "Aevor",
    organizationUrl: "https://github.com/Aevor",
    logo: "https://avatars.githubusercontent.com/u/291477028?v=4",
    repository: "platform",
    title: "AI limit package",
    number: 114,
    status: "Merged",
    url: "https://github.com/Aevor/platform/pull/114",
    description: "Platform-side changes for the multi-repository developer-tooling project.",
    tags: ["Go", "API", "Platform"],
  },
  {
    id: "aevor-105",
    organization: "Aevor",
    handle: "Aevor",
    organizationUrl: "https://github.com/Aevor",
    logo: "https://avatars.githubusercontent.com/u/291477028?v=4",
    repository: "platform",
    title: "Pull-request handlers",
    number: 105,
    status: "Merged",
    url: "https://github.com/Aevor/platform/pull/105",
    description: "Developed pull-request handler functionality in the Aevor platform repository.",
    tags: ["Go", "GitHub API", "Backend"],
  },
  {
    id: "podiom-335",
    organization: "Podiom",
    handle: "Podiom",
    organizationUrl: "https://github.com/Podiom",
    logo: "https://github.com/Podiom.png",
    repository: "Podiom",
    title: "Native activity tests",
    number: 335,
    status: "Merged",
    url: "https://github.com/Podiom/Podiom/pull/335",
    description: "Contributed native activity test coverage and reliability improvements.",
    tags: ["Tests", "Reliability", "Java"],
  },
  {
    id: "open-nsw-263",
    organization: "OpenNSW",
    handle: "OpenNSW",
    organizationUrl: "https://github.com/OpenNSW",
    logo: "https://avatars.githubusercontent.com/u/255828504?v=4",
    repository: "core",
    title: "Integration test work",
    number: 263,
    status: "Open",
    url: "https://github.com/OpenNSW/core/pull/263",
    description: "Test-focused changes in the core project; the pull request remains under review.",
    tags: ["Testing", "Database", "Integration"],
  },
  {
    id: "open-nsw-265",
    organization: "OpenNSW",
    handle: "OpenNSW",
    organizationUrl: "https://github.com/OpenNSW",
    logo: "https://avatars.githubusercontent.com/u/255828504?v=4",
    repository: "core",
    title: "Database test fix",
    number: 265,
    status: "Open",
    url: "https://github.com/OpenNSW/core/pull/265",
    description: "A database test fix currently tracked as an open contribution.",
    tags: ["Database", "Tests", "Java"],
  },
  {
    id: "ansvisor-970",
    organization: "Ansvisor",
    handle: "ansvisor",
    organizationUrl: "https://github.com/ansvisor",
    logo: "https://avatars.githubusercontent.com/u/274837157?v=4",
    repository: "ansvisor",
    title: "Agent-active-brand",
    number: 970,
    status: "Merged",
    url: "https://github.com/ansvisor/ansvisor/pull/970",
    description: "Issue-driven implementation work merged into the upstream AI and developer-tooling codebase.",
    tags: ["Go", "Tests", "Bug fix"],
  },
  {
    id: "terraform-308",
    organization: "Kestra",
    handle: "kestra-io",
    organizationUrl: "https://github.com/kestra-io",
    logo: "https://github.com/kestra-io.png",
    repository: "terraform-provider-kestra",
    title: "Import resource listing",
    number: 308,
    status: "Merged",
    url: "https://github.com/kestra-io/terraform-provider-kestra/pull/308",
    description: "Terraform-provider improvements around listing imported resources.",
    tags: ["Terraform", "Go", "Provider"],
  },
];

const communities = [
  { name: "Kestra", logo: "https://github.com/kestra-io.png", url: "https://github.com/kestra-io" },
  { name: "Apache Camel K", logo: "https://github.com/apache.png", url: "https://github.com/apache/camel-k" },
  { name: "Wanaku AI", logo: "https://github.com/wanaku-ai.png", url: "https://github.com/wanaku-ai" },
  { name: "Aevor", logo: "https://avatars.githubusercontent.com/u/291477028?v=4", url: "https://github.com/Aevor" },
  { name: "OpenNSW", logo: "https://avatars.githubusercontent.com/u/255828504?v=4", url: "https://github.com/OpenNSW" },
  { name: "Podiom", logo: "https://github.com/Podiom.png", url: "https://github.com/Podiom" },
  { name: "Ansvisor", logo: "https://avatars.githubusercontent.com/u/274837157?v=4", url: "https://github.com/ansvisor" },
];

function GitHubMark({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path fill="currentColor" d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.03c-3.1.67-3.76-1.31-3.76-1.31-.5-1.28-1.24-1.62-1.24-1.62-1.02-.7.08-.69.08-.69 1.13.08 1.72 1.16 1.72 1.16 1 1.72 2.62 1.22 3.26.94.1-.73.4-1.22.71-1.5-2.48-.28-5.09-1.24-5.09-5.52 0-1.22.44-2.22 1.16-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.05 1.15a10.6 10.6 0 0 1 5.55 0c2.11-1.44 3.05-1.15 3.05-1.15.61 1.54.23 2.68.11 2.96.72.78 1.16 1.78 1.16 3 0 4.29-2.62 5.24-5.11 5.51.4.35.76 1.03.76 2.08v3.08c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" />
    </svg>
  );
}

function formatLocalDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function GitHubContributionGraph({ communityCount, mergedCount, trackedCount, openCount }) {
  const [days, setDays] = useState([]);
  const [totals, setTotals] = useState({});
  const [period, setPeriod] = useState("last");
  const [loadState, setLoadState] = useState("loading");

  useEffect(() => {
    const controller = new AbortController();
    fetch("https://github-contributions-api.jogruber.de/v4/knockknock10?y=all", { signal: controller.signal })
      .then((response) => response.ok ? response.json() : Promise.reject(new Error("Contribution data is unavailable")))
      .then((payload) => {
        const safeDays = Array.isArray(payload.contributions)
          ? payload.contributions.filter((day) =>
              day &&
              /^\d{4}-\d{2}-\d{2}$/.test(day.date) &&
              Number.isFinite(day.count) &&
              day.count >= 0 &&
              Number.isFinite(day.level) &&
              day.level >= 0 &&
              day.level <= 4
            )
          : [];
        if (!safeDays.length) throw new Error("Contribution history is empty");
        const safeTotals = payload.total && typeof payload.total === "object"
          ? Object.fromEntries(Object.entries(payload.total).filter(([year, count]) => /^\d{4}$/.test(year) && Number.isFinite(count)))
          : {};
        setDays(safeDays);
        setTotals(safeTotals);
        setLoadState("live");
      })
      .catch((error) => {
        if (error.name !== "AbortError") setLoadState("fallback");
      });
    return () => controller.abort();
  }, []);

  const { weeks, total, startLabel, endLabel } = useMemo(() => {
    const contributionMap = new Map(days.map((day) => [day.date, day]));
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    let rangeStart;
    let rangeEnd;

    if (period === "last") {
      rangeEnd = today;
      rangeStart = new Date(today);
      rangeStart.setDate(rangeStart.getDate() - 364);
    } else {
      const year = Number(period);
      rangeStart = new Date(year, 0, 1);
      rangeEnd = new Date(year, 11, 31);
      if (year === today.getFullYear()) rangeEnd = today;
    }

    const actualStart = new Date(rangeStart);
    actualStart.setHours(0, 0, 0, 0);
    const actualEnd = new Date(rangeEnd);
    actualEnd.setHours(23, 59, 59, 999);
    const gridStart = new Date(actualStart);
    gridStart.setDate(gridStart.getDate() - gridStart.getDay());
    const gridEnd = new Date(actualEnd);
    gridEnd.setDate(gridEnd.getDate() + (6 - gridEnd.getDay()));

    const builtWeeks = [];
    let weekStart = new Date(gridStart);
    let periodTotal = 0;
    while (weekStart <= gridEnd) {
      const week = [];
      for (let dayIndex = 0; dayIndex < 7; dayIndex += 1) {
        const date = new Date(weekStart);
        date.setDate(weekStart.getDate() + dayIndex);
        const key = formatLocalDate(date);
        const inRange = date >= actualStart && date <= actualEnd;
        const item = inRange ? contributionMap.get(key) : null;
        const count = item ? item.count : 0;
        if (item) periodTotal += item.count;
        week.push({
          key,
          date,
          count,
          level: item ? item.level : 0,
          inRange,
        });
      }
      builtWeeks.push(week);
      weekStart.setDate(weekStart.getDate() + 7);
    }

    return {
      weeks: builtWeeks,
      total: period === "last" ? periodTotal : (totals[period] ?? periodTotal),
      startLabel: actualStart.toLocaleDateString("en-US", { month: "short", year: "numeric" }),
      endLabel: actualEnd.toLocaleDateString("en-US", { month: "short", year: "numeric" }),
    };
  }, [days, totals, period]);

  const yearOptions = useMemo(() => Object.keys(totals).sort((a, b) => Number(b) - Number(a)), [totals]);
  const monthSlots = weeks.map((week, index) => {
    const first = week.find((day) => day.inRange && day.date.getDate() <= 7);
    return {
      key: index,
      label: first ? first.date.toLocaleDateString("en-US", { month: "short" }) : "",
    };
  });

  return (
    <aside className={styles.githubGraphPanel} aria-labelledby="github-graph-heading">
      <div className={styles.githubGraphMain}>
        <div className={styles.githubGraphTop}>
        <a className={styles.githubGraphTitle} href={githubProfile} target="_blank" rel="noreferrer" aria-label="Open Sanjeev's GitHub profile">
          <GitHubMark className={styles.githubGraphMark} />
          <span id="github-graph-heading">GitHub contributions</span>
          <span className={styles.githubTitleArrow} aria-hidden="true">↗</span>
        </a>
        <select value={period} onChange={(event) => setPeriod(event.target.value)} aria-label="Contribution graph period">
          <option value="last">Last 12 months</option>
          {yearOptions.map((year) => <option key={year} value={year}>{year}</option>)}
        </select>
      </div>

      <div className={styles.githubGraphMeta}>
        <span>{loadState === "loading" ? "Loading live contribution history…" : loadState === "fallback" ? "Contribution history unavailable" : `${startLabel} — ${endLabel}`}</span>
        <span>{total.toLocaleString()} contributions</span>
      </div>

      <div className={styles.githubHeatmapViewport} tabIndex={0} role="region" aria-label="Scrollable GitHub contribution calendar">
        <div className={styles.githubHeatmapInner}>
          <div className={styles.githubMonthRail} style={{ gridTemplateColumns: `repeat(${weeks.length}, minmax(0, 1fr))` }}>
            {monthSlots.map((month) => <span key={month.key}>{month.label}</span>)}
          </div>
          <div className={styles.githubHeatmapBody}>
            <div className={styles.githubWeekdayRail} aria-hidden="true">
              <span></span><span>Mon</span><span></span><span>Wed</span><span></span><span>Fri</span><span></span>
            </div>
            <div className={styles.githubHeatmapGrid} style={{ gridTemplateColumns: `repeat(${weeks.length}, minmax(0, 1fr))` }} role="grid" aria-label="Daily contribution levels">
              {weeks.map((week, weekIndex) => (
                <div className={styles.githubHeatmapWeek} key={weekIndex} role="row">
                  {week.map((day) => (
                    <span
                      key={day.key}
                      className={styles.githubHeatmapDay}
                      data-level={day.inRange ? day.level : "empty"}
                      title={day.inRange ? `${day.count} contributions on ${day.key}` : ""}
                      role="gridcell"
                      aria-label={day.inRange ? `${day.count} contributions on ${day.key}` : "Outside selected period"}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

        <div className={styles.githubGraphFooter}>
          <span className={styles.heatmapLegend}><span>Less</span><i data-level="0" /><i data-level="1" /><i data-level="2" /><i data-level="3" /><i data-level="4" /><span>More</span></span>
          <span className={styles.heatmapSource}>{loadState === "live" ? "Live public contribution history" : "Source: GitHub profile"}</span>
        </div>
      </div>
      <div className={styles.githubGraphStats}>
        <div className={styles.githubGraphStat}>
          <span className={styles.graphStatIcon}>▥</span>
          <span><strong>{total.toLocaleString()}</strong><small>Contributions</small></span>
        </div>
        <div className={styles.githubGraphStat}>
          <span className={styles.graphStatIcon}>⑂</span>
          <span><strong>{mergedCount}</strong><small>Merged PRs shown</small></span>
        </div>
        <div className={styles.githubGraphStat}>
          <span className={styles.graphStatIcon}>⌘</span>
          <span><strong>{trackedCount}</strong><small>PRs tracked here</small></span>
        </div>
        <div className={styles.githubGraphStat}>
          <span className={styles.graphStatIcon}>♧</span>
          <span><strong>{communityCount}</strong><small>Communities</small></span>
        </div>
        <p className={styles.graphStatNote}>{openCount} pull requests in the curated list are still open.</p>
      </div>
    </aside>
  );
}

function ContributionCard({ item }) {
  const [logoFailed, setLogoFailed] = useState(false);

  return (
    <article className={styles.contributionCard}>
      <div className={styles.contributionCardMain}>
        <div className={styles.contributionCardHeader}>
          <a className={styles.contributionOrgLogo} href={item.organizationUrl} target="_blank" rel="noreferrer" aria-label={`Visit ${item.organization}`}>
            {!logoFailed ? <img src={item.logo} alt="" loading="lazy" onError={() => setLogoFailed(true)} /> : <GitHubMark />}
          </a>
          <div className={styles.contributionCardTitle}>
            <div className={styles.contributionRepoLabel}><span>{item.organization}</span><i>/</i><span>{item.repository}</span></div>
            <h3>{item.title}</h3>
          </div>
          <span className={styles.contributionStatus} data-status={item.status.toLowerCase()}>{item.status}</span>
        </div>
        <p className={styles.contributionCardDescription}>{item.description}</p>
        <div className={styles.contributionTags}>{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
        <div className={styles.contributionCardFooter}>
          <span>Pull request <b>#{item.number}</b></span>
          <a className={styles.contributionGitHubLink} href={item.url} target="_blank" rel="noreferrer" aria-label={`Open ${item.organization} ${item.repository} pull request ${item.number} on GitHub`}>
            <GitHubMark />
            <span>Open on GitHub</span>
          </a>
        </div>
      </div>
      <div className={styles.contributionRepoPreview} aria-hidden="true">
        <span className={styles.repoPreviewTop}><i />{item.repository}</span>
        <GitHubMark className={styles.repoPreviewMark} />
        <span className={styles.repoPreviewStatus}>{item.status === "Merged" ? "Merged upstream" : "Under review"}</span>
        <span className={styles.repoPreviewLines}><i /><i /><i /></span>
      </div>
    </article>
  );
}

export default function OpenSourceShowcase() {
  const [filter, setFilter] = useState("all");
  const [showAll, setShowAll] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);

  const organizationsCount = communities.length;
  const mergedCount = contributions.filter((item) => item.status === "Merged").length;
  const openCount = contributions.filter((item) => item.status === "Open").length;
  const filteredContributions = useMemo(
    () => contributions.filter((item) => filter === "all" || item.status.toLowerCase() === filter),
    [filter],
  );
  const visibleContributions = showAll ? filteredContributions : filteredContributions.slice(0, visibleCount);

  return (
    <section className={styles.openSourceSection} id="open-source" aria-labelledby="open-source-heading" tabIndex={-1}>
      <div className={styles.openSourceIntroLayout}>
        <div className={styles.openSourceIntro}>
          <p className={styles.openSourceEyebrow}><span>04</span><i /> OPEN SOURCE <b /></p>
          <h2 id="open-source-heading">Open <span>Source</span></h2>
          <p className={styles.openSourceLead}>I work in upstream codebases—reproducing issues, adding tests, responding to review, and improving tools other developers rely on. Every card below links to the original pull request.</p>
          <div className={styles.openSourceActions}>
            <a className={styles.githubProfileButton} href={githubProfile} target="_blank" rel="noreferrer">
              <GitHubMark /> <span>View GitHub</span><span className={styles.actionArrow} aria-hidden="true">→</span>
            </a>
            <a className={styles.allContributionsButton} href={allPullRequests} target="_blank" rel="noreferrer">
              See all contributions <span aria-hidden="true">→</span>
            </a>
          </div>
          <div className={styles.openSourceProofLine}>
            <span><i /> {organizationsCount} communities</span>
            <span>{mergedCount} curated merged PRs</span>
            <span>{openCount} open PRs tracked</span>
          </div>
        </div>
        <GitHubContributionGraph communityCount={organizationsCount} mergedCount={mergedCount} trackedCount={contributions.length} openCount={openCount} />
      </div>

      <div className={styles.featuredContributionsPanel}>
        <div className={styles.featuredContributionsHeader}>
          <div>
            <p>UPSTREAM WORK / REVIEW TRAIL</p>
            <h3>Featured contributions</h3>
            <span>Small, verifiable slices of work—not a list of claims.</span>
          </div>
          <a href={allPullRequests} target="_blank" rel="noreferrer">View all on GitHub <span aria-hidden="true">→</span></a>
        </div>

        <div className={styles.contributionFilters} role="group" aria-label="Filter featured pull requests">
          {[
            { id: "all", label: "All", count: contributions.length },
            { id: "merged", label: "Merged", count: mergedCount },
            { id: "open", label: "Open", count: openCount },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              className={filter === item.id ? styles.contributionFilterActive : styles.contributionFilter}
              aria-pressed={filter === item.id}
              onClick={() => {
                setFilter(item.id);
                setShowAll(false);
                setVisibleCount(6);
              }}
            >
              {item.label}<span>{item.count}</span>
            </button>
          ))}
        </div>

        <div className={styles.contributionCardGrid} aria-live="polite">
          {visibleContributions.map((item) => <ContributionCard key={item.id} item={item} />)}
        </div>

        {filteredContributions.length > 6 ? (
          <button
            type="button"
            className={styles.showAllContributions}
            aria-expanded={showAll}
            onClick={() => setShowAll((current) => !current)}
          >
            {showAll ? "Show fewer contributions" : `Explore all ${filteredContributions.length} curated pull requests`}
            <span aria-hidden="true">{showAll ? "−" : "+"}</span>
          </button>
        ) : null}
      </div>

      <div className={styles.communityStrip} aria-label="Open-source communities">
        <span className={styles.communityStripLabel}>COMMUNITIES</span>
        {communities.map((community) => (
          <a key={community.name} href={community.url} target="_blank" rel="noreferrer" className={styles.communityPill}>
            <img src={community.logo} alt="" loading="lazy" />
            <span>{community.name}</span>
            <span className={styles.communityArrow} aria-hidden="true">↗</span>
          </a>
        ))}
      </div>

      <div className={styles.openSourceValues}>
        <div><span className={styles.valueGlyph} data-color="blue">◇</span><span><strong>Make a real impact</strong><small>Small fixes in software people use.</small></span></div>
        <div><span className={styles.valueGlyph} data-color="violet">⌘</span><span><strong>Learn in public</strong><small>Follow issues through review.</small></span></div>
        <div><span className={styles.valueGlyph} data-color="cyan">↗</span><span><strong>Collaborate upstream</strong><small>Respect project conventions.</small></span></div>
        <div><span className={styles.valueGlyph} data-color="coral">♡</span><span><strong>Give back</strong><small>Improve tools I use and learn from.</small></span></div>
      </div>
    </section>
  );
}
