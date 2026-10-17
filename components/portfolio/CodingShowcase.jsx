"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import styles from "./CodingShowcase.module.css";

const LEETCODE_PROFILE = "https://leetcode.com/u/knockknock10/";
const SNAPSHOT_DATE = "10 Oct 2026";

function numberText(value, digits = 0) {
  if (typeof value !== "number" || !Number.isFinite(value)) return "—";
  return value.toLocaleString("en-US", { maximumFractionDigits: digits });
}

function Icon({ kind }) {
  const props = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" };
  if (kind === "code") return <svg viewBox="0 0 24 24" {...props}><path d="m8 7-5 5 5 5m8-10 5 5-5 5m-2-12-4 14"/></svg>;
  if (kind === "chart") return <svg viewBox="0 0 24 24" {...props}><path d="M4 20V11m5 9V4m5 16v-7m5 7V8"/></svg>;
  if (kind === "target") return <svg viewBox="0 0 24 24" {...props}><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/><path d="m12 12 7-7m-3 0h3v3"/></svg>;
  if (kind === "calendar") return <svg viewBox="0 0 24 24" {...props}><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18M8 14h3m-3 3h6"/></svg>;
  if (kind === "book") return <svg viewBox="0 0 24 24" {...props}><path d="M4 5.5A3.5 3.5 0 0 1 7.5 2H20v17H7.5A3.5 3.5 0 0 0 4 22zM4 5.5V22m4-15h8m-8 4h7"/></svg>;
  if (kind === "arrow") return <svg viewBox="0 0 24 24" {...props}><path d="M5 12h14m-6-6 6 6-6 6"/></svg>;
  return <svg viewBox="0 0 24 24" {...props}><circle cx="12" cy="12" r="9"/><path d="m8 12 2.5 2.5L16 9"/></svg>;
}

const resources = [
  { name: "LeetCode", kind: "My problem-solving profile", detail: "Problems, submissions and contest history", href: LEETCODE_PROFILE, icon: "LC", tone: "amber", personal: true },
  { name: "Codeforces", kind: "Competitive programming", detail: "Contests and implementation practice", href: "https://codeforces.com/", icon: "CF", tone: "blue" },
  { name: "HackerRank", kind: "Skills practice", detail: "Structured programming exercises", href: "https://www.hackerrank.com/", icon: "HR", tone: "green" },
  { name: "NeetCode", kind: "Interview roadmap", detail: "Curated problems grouped by pattern", href: "https://neetcode.io/", icon: "N", tone: "violet" },
  { name: "GeeksforGeeks", kind: "DSA practice", detail: "Topic-wise problems and explanations", href: "https://www.geeksforgeeks.org/", icon: "GFG", tone: "green" },
  { name: "HackerEarth", kind: "Problem-solving practice", detail: "Challenges and programming contests", href: "https://www.hackerearth.com/", icon: "HE", tone: "dark" },
  { name: "Striver A2Z", kind: "DSA learning path", detail: "A structured progression through core topics", href: "https://takeuforward.org/strivers-a2z-dsa-course/", icon: "A2Z", tone: "coral" },
  { name: "System Design Primer", kind: "Systems reference", detail: "Architecture concepts and interview topics", href: "https://github.com/donnemartin/system-design-primer", icon: "SD", tone: "dark" },
];

const patternAreas = [
  { title: "Arrays & hashing", detail: "Build a clean model of the input before optimizing." },
  { title: "Trees & graphs", detail: "Reason about traversal, state and connectivity." },
  { title: "Dynamic programming", detail: "Define state, transitions and base cases explicitly." },
  { title: "Complexity & edge cases", detail: "Check bounds, invariants and the real cost of a solution." },
];

function CodeIllustration() {
  return (
    <div className={styles.codeScene} aria-label="Decorative code editor illustration">
      <div className={styles.codeSceneTop}>
        <div className={styles.windowDots}><i/><i/><i/></div>
        <span>problem-solving / scratchpad</span>
        <span className={styles.codeSceneLanguage}>GO · PYTHON · JAVA</span>
      </div>
      <div className={styles.editorBody}>
        <aside className={styles.editorFiles} aria-hidden="true">
          <span>EXPLORER</span><b>⌄ practice</b><i>◇ arrays.go</i><i>◇ graph.py</i><i>◇ dp.java</i><i>◇ notes.md</i>
        </aside>
        <div className={styles.codeLines} aria-hidden="true">
          <div><span>01</span><code><b>func</b> solve(input <em>[]Node</em>) Result {"{"}</code></div>
          <div><span>02</span><code>&nbsp;&nbsp;<i>// understand the constraints</i></code></div>
          <div><span>03</span><code>&nbsp;&nbsp;state := <b>initialState</b>(input)</code></div>
          <div><span>04</span><code>&nbsp;&nbsp;<b>for</b> _, node := <em>range</em> input {"{"}</code></div>
          <div><span>05</span><code>&nbsp;&nbsp;&nbsp;&nbsp;state = <b>transition</b>(state, node)</code></div>
          <div><span>06</span><code>&nbsp;&nbsp;{"}"}</code></div>
          <div><span>07</span><code>&nbsp;&nbsp;<b>return</b> validate(state)</code></div>
          <div><span>08</span><code>{"}"}</code></div>
          <div className={styles.editorComment}><span>↳</span> Read carefully. Prove it. Test the edges.</div>
        </div>
      </div>
      <div className={styles.codeSceneFoot}><span><i/> Focus mode</span><span>THINK → IMPLEMENT → VERIFY</span></div>
    </div>
  );
}

function DifficultyBar({ label, value, total, tone }) {
  const width = typeof value === "number" && typeof total === "number" && total > 0 ? Math.min(100, value / total * 100) : 0;
  return (
    <div className={styles.difficultyRow}>
      <div className={styles.difficultyLabel}><span data-tone={tone}>{label}</span><strong>{numberText(value)}</strong></div>
      <div className={styles.difficultyTrack}><i data-tone={tone} style={{ width: width + "%" }}/></div>
      <small>{Math.round(width)}% of solved total</small>
    </div>
  );
}

function SubmissionHeatmap({ days }) {
  const calendar = useMemo(() => {
    if (!Array.isArray(days)) return [];
    return [...days]
      .filter((day) => day && /^\d{4}-\d{2}-\d{2}$/.test(day.date) && Number.isFinite(day.submissions) && day.submissions >= 0)
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(-364);
  }, [days]);
  const max = Math.max(1, ...calendar.map((day) => day.submissions));
  const monthLabels = useMemo(() => {
    const seen = [];
    for (const day of calendar) {
      const month = day.date.slice(0, 7);
      if (!seen.includes(month)) seen.push(month);
    }
    return seen.slice(-12);
  }, [calendar]);

  if (!calendar.length) {
    return (
      <div className={styles.heatmapEmpty}>
        <span className={styles.heatmapEmptyIcon}><Icon kind="calendar"/></span>
        <div><strong>No daily submission series in the saved snapshot</strong><p>The profile summary is available, but the snapshot does not include a day-by-day calendar. This panel will fill in when the data source is refreshed.</p></div>
      </div>
    );
  }

  return (
    <div className={styles.heatmapContent}>
      <div className={styles.monthLabels}>{monthLabels.map((month) => <span key={month}>{new Date(month + "-01T00:00:00Z").toLocaleDateString("en-US", { month: "short", timeZone: "UTC" })}</span>)}</div>
      <div className={styles.heatmapGrid} role="img" aria-label={"LeetCode submission activity for " + calendar.length + " saved days"}>
        {calendar.map((day) => {
          const level = day.submissions <= 0 ? 0 : day.submissions / max >= .75 ? 4 : day.submissions / max >= .5 ? 3 : day.submissions / max >= .25 ? 2 : 1;
          return <i key={day.date} data-level={level} title={day.date + " · " + day.submissions + " submissions"}/>;
        })}
      </div>
      <div className={styles.heatmapLegend}><span>Less</span>{[0,1,2,3,4].map(level => <i key={level} data-level={level}/>)}<span>More</span><small>Saved LeetCode profile data</small></div>
    </div>
  );
}

function ResourceCarousel() {
  const scroller = useRef(null);
  const reducedMotion = useReducedMotion();
  function scroll(direction) {
    const el = scroller.current;
    if (!el) return;
    el.scrollBy({ left: direction * Math.max(250, el.clientWidth * .78), behavior: reducedMotion ? "auto" : "smooth" });
  }

  return (
    <section className={styles.resourcesSection} aria-labelledby="coding-resources-heading">
      <div className={styles.resourcesHeader}>
        <div><p className={styles.subEyebrow}>PRACTICE DESK</p><h3 id="coding-resources-heading">Platforms &amp; references</h3><p>One verified personal profile, alongside the public practice tools and references linked here.</p></div>
        <div className={styles.carouselControls}>
          <button type="button" onClick={() => scroll(-1)} aria-label="Scroll resources left">←</button>
          <button type="button" onClick={() => scroll(1)} aria-label="Scroll resources right">→</button>
        </div>
      </div>
      <div className={styles.resourceScroller} ref={scroller} role="list" aria-label="Coding platforms and references">
        {resources.map((item) => (
          <a className={styles.resourceCard} role="listitem" href={item.href} key={item.name} target="_blank" rel="noreferrer">
            <span className={styles.resourceMark} data-tone={item.tone}>{item.icon}</span>
            <span className={styles.resourceText}><strong>{item.name}</strong><small>{item.kind}</small><span>{item.detail}</span></span>
            <span className={styles.resourceArrow} aria-hidden="true">↗</span>
          </a>
        ))}
      </div>
      <div className={styles.resourcesFoot}><span>Scroll to explore</span><span>EXTERNAL LINKS OPEN IN A NEW TAB</span></div>
    </section>
  );
}

function ContestHistory({ history }) {
  const rows = Array.isArray(history) ? history.filter((item) => item && typeof item.contest === "string" && item.contest !== "MISSING").slice(-5).reverse() : [];
  if (!rows.length) return <p className={styles.emptyContest}>Contest-by-contest records are not available in the current snapshot. The saved profile link has the latest history.</p>;
  return (
    <ol className={styles.contestList}>
      {rows.map((item, index) => {
        const date = typeof item.date === "string" && item.date !== "MISSING" ? item.date : "";
        const parsedDate = date ? new Date(date + "T00:00:00Z") : null;
        const label = parsedDate && !Number.isNaN(parsedDate.getTime()) ? parsedDate.toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "UTC" }) : "Contest";
        return (
          <li key={item.contest + date + index}>
            <time dateTime={date || undefined}>{label}</time>
            <span className={styles.contestMark} aria-hidden="true">LC</span>
            <span className={styles.contestCopy}><strong>{item.contest}</strong><small>{typeof item.rank === "number" ? "Rank " + numberText(item.rank) : "Rank unavailable"}{typeof item.ratingAfterContest === "number" ? " · Rating " + numberText(item.ratingAfterContest, 1) : ""}</small></span>
            <a href={LEETCODE_PROFILE} target="_blank" rel="noreferrer" aria-label={"Open " + item.contest + " on LeetCode"}>↗</a>
          </li>
        );
      })}
    </ol>
  );
}



const GITHUB_PROFILE = "https://github.com/knockknock10";
const CONTRIBUTION_API = "https://github-contributions-api.jogruber.de/v4/knockknock10?y=all";

function GitHubContributionCalendar() {
  const [payload, setPayload] = useState(null);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [selectedYear, setSelectedYear] = useState(String(new Date().getFullYear()));

  useEffect(() => {
    const controller = new AbortController();
    fetch(CONTRIBUTION_API, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("Contribution service returned " + response.status);
        return response.json();
      })
      .then((result) => {
        const contributions = Array.isArray(result?.contributions)
          ? result.contributions.filter((day) => day && /^\d{4}-\d{2}-\d{2}$/.test(day.date) && Number.isFinite(day.count))
          : [];
        const totals = result?.total && typeof result.total === "object" ? result.total : {};
        const availableYears = Object.keys(totals).filter((year) => /^\d{4}$/.test(year)).sort((a, b) => Number(b) - Number(a));
        if (!contributions.length || !availableYears.length) throw new Error("No contribution history returned");
        setPayload({ contributions, totals, availableYears });
        setSelectedYear(availableYears.includes(String(new Date().getFullYear())) ? String(new Date().getFullYear()) : availableYears[0]);
      })
      .catch((error) => {
        if (error?.name !== "AbortError") setFailed(true);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, []);

  const years = payload?.availableYears || [];
  const year = years.includes(selectedYear) ? selectedYear : (years[0] || selectedYear);
  const today = new Date().toISOString().slice(0, 10);
  const days = payload?.contributions?.filter((day) => day.date.startsWith(year) && (year !== String(new Date().getFullYear()) || day.date <= today)) || [];
  const firstDate = new Date(year + "-01-01T00:00:00Z");
  const leadingSlots = Number.isNaN(firstDate.getTime()) ? 0 : firstDate.getUTCDay();
  const weekCount = Math.max(1, Math.ceil((leadingSlots + days.length) / 7));
  const total = payload?.totals?.[year] ?? days.reduce((sum, day) => sum + day.count, 0);
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  return (
    <article className={styles.githubCalendarPanel} aria-labelledby="github-calendar-heading">
      <header className={styles.githubCalendarHeader}>
        <div>
          <p className={styles.subEyebrow}>OPEN-SOURCE ACTIVITY</p>
          <h3 id="github-calendar-heading">GitHub contributions</h3>
          <p>Pick a year to inspect the daily contribution calendar.</p>
        </div>
        <a href={GITHUB_PROFILE} target="_blank" rel="noreferrer">GitHub profile ↗</a>
      </header>

      {loading ? (
        <div className={styles.githubCalendarStatus} role="status">Loading contribution history…</div>
      ) : failed ? (
        <div className={styles.githubCalendarStatus} role="status">
          <strong>Contribution history is temporarily unavailable.</strong>
          <span>The rest of the section still works. Open GitHub to see the live calendar.</span>
          <a href={GITHUB_PROFILE} target="_blank" rel="noreferrer">View contributions on GitHub ↗</a>
        </div>
      ) : (
        <>
          <div className={styles.githubYearTabs} aria-label="Choose GitHub contribution year">
            {years.map((availableYear) => (
              <button
                type="button"
                key={availableYear}
                aria-pressed={year === availableYear}
                data-active={year === availableYear ? "true" : "false"}
                onClick={() => setSelectedYear(availableYear)}
              >
                {availableYear}
                <span>{Number(payload?.totals?.[availableYear] || 0).toLocaleString("en-US")}</span>
              </button>
            ))}
          </div>
          <div className={styles.githubCalendarSummary}>
            <strong>{Number(total || 0).toLocaleString("en-US")}</strong>
            <span>contributions in {year}</span>
            <small>Public contribution data · cached by the source service</small>
          </div>
          <div className={styles.githubCalendarViewport}>
            <div className={styles.githubMonthLabels} aria-hidden="true">
              {monthNames.map((month) => <span key={month}>{month}</span>)}
            </div>
            <div className={styles.githubCalendarRow}>
              <div className={styles.githubWeekdayLabels} aria-hidden="true">
                <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
              </div>
              <div
                className={styles.githubContributionGrid}
                role="grid"
                aria-label={"GitHub contribution calendar for " + year + ", " + total + " contributions"}
                style={{ gridTemplateColumns: "repeat(" + weekCount + ", 10px)" }}
              >
                {days.map((day, index) => {
                  const dayDate = new Date(day.date + "T00:00:00Z");
                  const slot = leadingSlots + Math.floor((dayDate.getTime() - firstDate.getTime()) / 86400000);
                  const level = Number.isInteger(day.level) ? Math.max(0, Math.min(4, day.level)) : (day.count <= 0 ? 0 : day.count >= 8 ? 4 : day.count >= 5 ? 3 : day.count >= 3 ? 2 : 1);
                  return (
                    <button
                      key={day.date}
                      type="button"
                      className={styles.githubContributionCell}
                      data-level={level}
                      style={{ gridColumn: Math.floor(slot / 7) + 1, gridRow: (slot % 7) + 1 }}
                      title={day.date + " · " + day.count + (day.count === 1 ? " contribution" : " contributions")}
                      aria-label={day.date + ": " + day.count + (day.count === 1 ? " contribution" : " contributions")}
                    />
                  );
                })}
              </div>
            </div>
          </div>
          <div className={styles.githubCalendarLegend}><span>Less</span>{[0, 1, 2, 3, 4].map((level) => <i key={level} data-level={level} />)}<span>More</span></div>
        </>
      )}
    </article>
  );
}

function ContributionMix() {
  return (
    <article className={styles.contributionMixPanel} aria-labelledby="contribution-mix-heading">
      <div className={styles.contributionMixHead}>
        <p className={styles.subEyebrow}>ACTIVITY SNAPSHOT</p>
        <h3 id="contribution-mix-heading">How I contribute</h3>
        <p>Contribution mix shown in the reference image you supplied.</p>
      </div>
      <svg className={styles.contributionMixChart} viewBox="0 0 520 300" role="img" aria-label="Reference contribution mix: commits 76 percent, pull requests 23 percent, code review 1 percent, issue percentage not provided">
        <path className={styles.mixAxis} d="M260 50V255M58 145H462" />
        <path className={styles.mixArea} d="M133 145L260 140L260 182Z" />
        <path className={styles.mixLine} d="M133 145H260V182" />
        <circle className={styles.mixDot} cx="133" cy="145" r="5.5" />
        <circle className={styles.mixDot} cx="260" cy="140" r="5.5" />
        <circle className={styles.mixDot} cx="260" cy="182" r="5.5" />
        <text className={styles.mixLabel} x="260" y="22" textAnchor="middle">1%</text>
        <text className={styles.mixLabel} x="260" y="43" textAnchor="middle">Code review</text>
        <text className={styles.mixLabel} x="104" y="133" textAnchor="end">76%</text>
        <text className={styles.mixLabel} x="104" y="155" textAnchor="end">Commits</text>
        <text className={styles.mixLabel} x="430" y="152" textAnchor="start">Issues</text>
        <text className={styles.mixLabel} x="260" y="278" textAnchor="middle">23%</text>
        <text className={styles.mixLabel} x="260" y="298" textAnchor="middle">Pull requests</text>
      </svg>
      <p className={styles.contributionMixFoot}>Percentages follow the supplied reference; the GitHub profile is the source of truth for current activity.</p>
    </article>
  );
}

function ContributionInsights() {
  return (
    <div className={styles.contributionInsights}>
      <GitHubContributionCalendar />
      <ContributionMix />
    </div>
  );
}

export default function CodingShowcase({ data }) {
  const reducedMotion = useReducedMotion();
  const leetcode = data?.leetcode || {};
  const solved = typeof leetcode.totalSolved === "number" ? leetcode.totalSolved : null;
  const easy = leetcode.easySolved;
  const medium = leetcode.mediumSolved;
  const hard = leetcode.hardSolved;
  const rating = leetcode.contestRating;
  const contestRank = leetcode.contestRank;
  const acceptance = leetcode.acceptanceRate !== "MISSING" ? leetcode.acceptanceRate : null;
  const top = leetcode.contestTopPercentage !== "MISSING" ? leetcode.contestTopPercentage : null;
  const snapshotMotion = (delay = 0) => ({
    initial: reducedMotion ? false : { opacity: 0, y: 13 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: .12 },
    transition: { duration: reducedMotion ? 0 : .38, delay: reducedMotion ? 0 : delay },
  });

  return (
    <section className={styles.codingSection} id="coding" aria-labelledby="coding-heading" tabIndex={-1}>
      <header className={styles.codingHeader}>
        <motion.div className={styles.codingIntro} {...snapshotMotion()}>
          <p className={styles.eyebrow}><span>07</span><i/> CODE &amp; PROBLEM SOLVING <b/></p>
          <h2 id="coding-heading">Code. Practice.<br/>Improve. <span>Repeat.</span></h2>
          <p>I use algorithm practice to get better at translating constraints into clear, correct implementations—then carry that discipline into the systems I build.</p>
          <div className={styles.topicTags}><span>Data structures</span><span>Algorithms</span><span>Contest practice</span><span>System design</span></div>
          <a className={styles.primaryAction} href={LEETCODE_PROFILE} target="_blank" rel="noreferrer">Open my LeetCode profile <Icon kind="arrow"/></a>
        </motion.div>
        <motion.div className={styles.editorWrap} {...snapshotMotion(.06)}>
          <CodeIllustration/>
          <div className={styles.editorQuote}><span>“</span><p>Discipline in practice today creates options tomorrow.</p><small>— SANJEEV KUMAR</small></div>
        </motion.div>
      </header>

      <div className={styles.metricsGrid} aria-label="LeetCode profile metrics">
        {[
          { label: "Problems solved", value: numberText(solved), note: "Saved profile snapshot", icon: "code", tone: "amber" },
          { label: "Contest rating", value: numberText(rating, 1), note: typeof leetcode.contestAttendedCount === "number" ? leetcode.contestAttendedCount + " contests recorded" : "Contest history", icon: "chart", tone: "blue" },
          { label: "Contest global rank", value: numberText(contestRank), note: top ? "Top " + top + " in recorded profile" : "Contest ranking", icon: "target", tone: "violet" },
          { label: "Acceptance rate", value: acceptance || "—", note: "Saved profile snapshot", icon: "check", tone: "green" },
        ].map((metric, index) => (
          <motion.article className={styles.metricCard} data-tone={metric.tone} key={metric.label} {...snapshotMotion(index * .035)}>
            <span className={styles.metricIcon}><Icon kind={metric.icon}/></span>
            <span className={styles.metricCopy}><small>{metric.label}</small><strong>{metric.value}</strong><span>{metric.note}</span></span>
            <span className={styles.metricNumber}>0{index + 1}</span>
          </motion.article>
        ))}
      </div>

      <div className={styles.codingDetailsGrid}>
        <motion.article className={styles.glassPanel + " " + styles.difficultyPanel} {...snapshotMotion()}>
          <div className={styles.panelHeading}><span className={styles.panelIcon}><Icon kind="chart"/></span><div><h3>Problem breakdown</h3><p>All values come from the saved LeetCode profile.</p></div><span className={styles.panelIndex}>01</span></div>
          <div className={styles.solvedHero}><strong>{numberText(solved)}</strong><span>accepted problems</span></div>
          <div className={styles.difficultyBars}>
            <DifficultyBar label="Easy" value={easy} total={solved} tone="easy"/>
            <DifficultyBar label="Medium" value={medium} total={solved} tone="medium"/>
            <DifficultyBar label="Hard" value={hard} total={solved} tone="hard"/>
          </div>
          <div className={styles.splitNote}><span>Profile ranking <strong>{numberText(leetcode.profileRank)}</strong></span><a href={LEETCODE_PROFILE} target="_blank" rel="noreferrer">Verify on LeetCode ↗</a></div>
        </motion.article>

        <motion.article className={styles.glassPanel + " " + styles.activityPanel} {...snapshotMotion(.04)}>
          <div className={styles.panelHeading}><span className={styles.panelIcon}><Icon kind="calendar"/></span><div><h3>Practice activity</h3><p>Day-level activity is shown only when it exists in the saved data.</p></div><span className={styles.panelIndex}>02</span></div>
          <SubmissionHeatmap days={leetcode.dailySubmissionCalendar}/>
          <div className={styles.practicePrinciples}>
            {patternAreas.map((item, index) => <div key={item.title}><span>0{index + 1}</span><strong>{item.title}</strong><small>{item.detail}</small></div>)}
          </div>
        </motion.article>

        <motion.article className={styles.glassPanel + " " + styles.contestPanel} {...snapshotMotion(.08)}>
          <div className={styles.panelHeading}><span className={styles.panelIcon}><Icon kind="target"/></span><div><h3>Contest history</h3><p>Saved contest records · profile can change.</p></div><span className={styles.panelIndex}>03</span></div>
          <ContestHistory history={leetcode.contestHistory}/>
          <a className={styles.panelFooterLink} href={LEETCODE_PROFILE} target="_blank" rel="noreferrer">See the full contest history <Icon kind="arrow"/></a>
        </motion.article>
      </div>

      <ContributionInsights />

      <ResourceCarousel/>

      <div className={styles.codingFooter}><span className={styles.footerMark}><Icon kind="target"/></span><div><strong>Practice is a process, not a leaderboard screenshot.</strong><small>Profile snapshot dated {SNAPSHOT_DATE}. For current standings, open the source profile.</small></div><a href="/problem-solving">Detailed problem-solving notes <span aria-hidden="true">↗</span></a></div>
    </section>
  );
}
