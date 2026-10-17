"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { SignalStats } from "@/lib/signals";
import styles from "./CodingShowcase.module.css";

type CodingShowcaseProps = {
  data: SignalStats;
  standalone?: boolean;
};

const LEETCODE_URL = "https://leetcode.com/u/knockknock10/";
const LEETCODE_CONTEST_URL = "https://leetcode.com/contest/";

function numberValue(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function numberLabel(value: unknown): string {
  const number = numberValue(value);
  return number === null ? "—" : number.toLocaleString("en-US");
}

function labelValue(value: unknown): string | null {
  return typeof value === "string" && value.trim() && value !== "MISSING" ? value : null;
}

function Arrow() {
  return <span className={styles.arrow} aria-hidden="true">↗</span>;
}

function Glyph({ kind }: { kind: "code" | "trophy" | "github" | "clock" | "book" | "chart" | "target" }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (kind === "code") return <svg viewBox="0 0 24 24" {...common}><path d="m8 7-5 5 5 5m8-10 5 5-5 5m-2-12-4 14"/></svg>;
  if (kind === "trophy") return <svg viewBox="0 0 24 24" {...common}><path d="M8 4h8v5a4 4 0 0 1-8 0zM8 6H4v2a4 4 0 0 0 4 4m8-6h4v2a4 4 0 0 1-4 4M12 13v5m-4 2h8m-7-2h6"/></svg>;
  if (kind === "github") return <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.03c-3.1.67-3.76-1.31-3.76-1.31-.5-1.28-1.24-1.62-1.24-1.62-1.02-.7.08-.69.08-.69 1.13.08 1.72 1.16 1.72 1.16 1 1.72 2.62 1.22 3.26.94.1-.73.4-1.22.71-1.5-2.48-.28-5.09-1.24-5.09-5.52 0-1.22.44-2.22 1.16-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.05 1.15a10.6 10.6 0 0 1 5.55 0c2.11-1.44 3.05-1.15 3.05-1.15.61 1.54.23 2.68.11 2.96.72.78 1.16 1.78 1.16 3 0 4.29-2.62 5.24-5.11 5.51.4.35.76 1.03.76 2.08v3.08c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z"/></svg>;
  if (kind === "clock") return <svg viewBox="0 0 24 24" {...common}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>;
  if (kind === "book") return <svg viewBox="0 0 24 24" {...common}><path d="M4 5.5A3.5 3.5 0 0 1 7.5 2H20v17H7.5A3.5 3.5 0 0 0 4 22zM4 5.5V22m4-15h8m-8 4h7"/></svg>;
  if (kind === "chart") return <svg viewBox="0 0 24 24" {...common}><path d="M4 19V9m5 10V4m5 15v-7m5 7V6"/><path d="M2 20h20"/></svg>;
  return <svg viewBox="0 0 24 24" {...common}><circle cx="12" cy="12" r="9"/><path d="m8 12 2.5 2.5L16 9"/></svg>;
}

function PanelHeading({ icon, title, meta }: { icon: "code" | "trophy" | "github" | "clock" | "book" | "chart" | "target"; title: string; meta?: string }) {
  return (
    <header className={styles.panelHeading}>
      <span className={styles.panelIcon}><Glyph kind={icon} /></span>
      <h3>{title}</h3>
      {meta ? <span className={styles.panelMeta}>{meta}</span> : null}
    </header>
  );
}

function StatCard({ icon, label, value, detail, href, tone = "blue" }: { icon: "code" | "trophy" | "github" | "clock" | "chart"; label: string; value: string; detail: string; href?: string; tone?: "blue" | "violet" | "green" | "amber" }) {
  const Body = (
    <>
      <div className={styles.statTop}><span className={styles.statGlyph} data-tone={tone}><Glyph kind={icon} /></span><span className={styles.statLabel}>{label}</span>{href ? <Arrow /> : null}</div>
      <strong className={styles.statValue}>{value}</strong>
      <span className={styles.statDetail}>{detail}</span>
    </>
  );
  return (
    <motion.article className={styles.statCard} data-tone={tone} whileHover={{ y: -3 }} transition={{ type: "spring", stiffness: 280, damping: 24 }}>
      {href ? <a href={href} target="_blank" rel="noreferrer" aria-label={label + ": " + value + ". Open profile"}>{Body}</a> : Body}
    </motion.article>
  );
}

function ActivityHeatmap({ days }: { days: Array<{ date: string; submissions: number }> | null }) {
  const entries = Array.isArray(days) ? days.slice(-182) : [];
  if (!entries.length) {
    return (
      <div className={styles.emptyActivity}>
        <span className={styles.emptyActivityIcon}><Glyph kind="chart" /></span>
        <div><strong>Daily activity is not in this snapshot</strong><p>The profile link remains the source of truth until a fresh daily submission calendar is available.</p></div>
      </div>
    );
  }

  const firstDay = Number.isNaN(Date.parse(entries[0].date)) ? 0 : new Date(entries[0].date + "T00:00:00Z").getUTCDay();
  const cells: Array<{ date: string; submissions: number } | null> = [
    ...Array.from({ length: firstDay }, () => null),
    ...entries,
  ];
  const max = Math.max(1, ...entries.map((item) => numberValue(item.submissions) ?? 0));
  const levelOf = (value: number) => value <= 0 ? 0 : value / max >= 0.75 ? 4 : value / max >= 0.5 ? 3 : value / max >= 0.25 ? 2 : 1;

  return (
    <div className={styles.heatmapWrap}>
      <div className={styles.heatmapMonths}><span>RECENT PRACTICE</span><span>Last {entries.length} recorded days</span></div>
      <div className={styles.heatmapWithDays}>
        <div className={styles.weekdayLabels} aria-hidden="true"><span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span></div>
        <div className={styles.heatmap} role="img" aria-label="LeetCode daily submission activity from the saved profile snapshot">
          {cells.map((day, index) => day ? (
            <i key={day.date + "-" + index} data-level={levelOf(numberValue(day.submissions) ?? 0)} title={day.date + ": " + day.submissions + " submissions"} />
          ) : <i key={"blank-" + index} className={styles.heatmapBlank} aria-hidden="true" />)}
        </div>
      </div>
      <div className={styles.heatmapLegend}><span>Less</span>{[0, 1, 2, 3, 4].map((level) => <i key={level} data-level={level} />)}<span>More</span></div>
    </div>
  );
}

function ContestHistory({ data }: { data: SignalStats["leetcode"] }) {
  const entries = [...(data.contestHistory ?? [])].filter((item) => labelValue(item.contest)).slice(-4).reverse();
  return (
    <div className={styles.contestList}>
      {entries.length ? entries.map((item, index) => (
        <a className={styles.contestRow} href={LEETCODE_CONTEST_URL} target="_blank" rel="noreferrer" key={(labelValue(item.contest) ?? "contest") + index}>
          <span className={styles.contestIndex}>{String(entries.length - index).padStart(2, "0")}</span>
          <span className={styles.contestCopy}>
            <strong>{labelValue(item.contest)}</strong>
            <small>{labelValue(item.date) ?? "Date not recorded"}{numberValue(item.rank) !== null ? " · Rank " + numberLabel(item.rank) : ""}</small>
          </span>
          <span className={styles.contestRating}>{numberValue(item.ratingAfterContest) !== null ? numberLabel(item.ratingAfterContest) : "—"}<small>rating</small></span>
          <Arrow />
        </a>
      )) : (
        <div className={styles.emptyContest}>
          <Glyph kind="trophy" />
          <strong>No contest history recorded</strong>
          <p>Contest results will appear here when they exist in the saved profile data.</p>
        </div>
      )}
      <a className={styles.textLink} href={LEETCODE_URL} target="_blank" rel="noreferrer">Open full LeetCode profile <Arrow /></a>
    </div>
  );
}

const focusAreas = [
  { icon: "target", title: "Data structures & algorithms", detail: "Patterns, constraints, correctness and complexity.", tone: "blue" },
  { icon: "chart", title: "Contest reasoning", detail: "Break a problem down, then improve the solution.", tone: "violet" },
  { icon: "code", title: "System design", detail: "Boundaries, trade-offs, resilience and clear APIs.", tone: "amber" },
  { icon: "book", title: "Research-driven engineering", detail: "Measure assumptions instead of overstating results.", tone: "green" },
] as const;

const resources = [
  { name: "LeetCode", detail: "Problem practice", href: LEETCODE_URL, tone: "amber" },
  { name: "NeetCode Roadmap", detail: "Patterns & study plans", href: "https://neetcode.io/roadmap", tone: "blue" },
  { name: "Codeforces", detail: "Contest archive", href: "https://codeforces.com/", tone: "violet" },
  { name: "GeeksforGeeks", detail: "Reference articles", href: "https://www.geeksforgeeks.org/", tone: "green" },
  { name: "CP-Algorithms", detail: "Algorithm notes", href: "https://cp-algorithms.com/", tone: "amber" },
  { name: "AtCoder", detail: "Contest practice", href: "https://atcoder.jp/", tone: "blue" },
] as const;

export default function CodingShowcase({ data, standalone = false }: CodingShowcaseProps) {
  const reducedMotion = useReducedMotion();
  const leetcode = data.leetcode;
  const solved = numberValue(leetcode.totalSolved);
  const contestRating = numberValue(leetcode.contestRating);
  const contestCount = numberValue(leetcode.contestAttendedCount);
  const contestRank = numberValue(leetcode.contestRank);
  const contestTop = labelValue(leetcode.contestTopPercentage);
  const cards = reducedMotion
    ? { initial: false as const, whileInView: undefined, transition: undefined }
    : { initial: { opacity: 0, y: 15 }, whileInView: { opacity: 1, y: 0 }, transition: { duration: 0.48 }, };

  return (
    <section id={standalone ? undefined : "signals"} className={styles.section} data-standalone={standalone ? "true" : "false"} aria-labelledby="coding-heading" tabIndex={-1}>
      <header className={styles.sectionHeader}>
        <div className={styles.headingCopy}>
          <p className={styles.eyebrow}><span>07</span><i /> CODING &amp; PROBLEM SOLVING <b /></p>
          <h2 id="coding-heading">Code. Practice.<br />Improve. <span>Repeat.</span></h2>
          <p className={styles.lede}>The goal is not to collect counts. It is to understand the pattern, make the trade-off explicit, and write a solution I can defend.</p>
          <div className={styles.topicChips}><span>Data structures</span><span>Algorithms</span><span>Contest reasoning</span><span>System design</span></div>
        </div>
        <aside className={styles.methodCard}>
          <span className={styles.methodIndex}>THE PRACTICE LOOP</span>
          <div className={styles.methodSteps}><span>Understand</span><i>→</i><span>Implement</span><i>→</i><span>Review</span></div>
          <p>Correctness first. Complexity second. Clarity all the way through.</p>
        </aside>
      </header>

      <div className={styles.statsGrid}>
        <StatCard icon="code" label="LeetCode" value={solved === null ? "—" : numberLabel(solved)} detail="Problems solved in saved snapshot" href={LEETCODE_URL} tone="amber" />
        <StatCard icon="trophy" label="Contest rating" value={contestRating === null ? "—" : numberLabel(Math.round(contestRating))} detail="Current rating in saved profile snapshot" href={LEETCODE_CONTEST_URL} tone="violet" />
        <StatCard icon="clock" label="Contests attended" value={contestCount === null ? "—" : numberLabel(contestCount)} detail="Recorded in the saved profile snapshot" href={LEETCODE_CONTEST_URL} tone="blue" />
        <StatCard icon="chart" label="Contest standing" value={contestTop ? (contestTop.toLowerCase().includes("top") ? contestTop : "Top " + contestTop + "%") : contestRank === null ? "—" : "#" + numberLabel(contestRank)} detail={contestRank === null ? "No global contest rank recorded" : "Global rank " + numberLabel(contestRank)} href={LEETCODE_CONTEST_URL} tone="green" />
      </div>

      <div className={styles.dashboardGrid}>
        <motion.article className={styles.panel + " " + styles.activityPanel} {...cards} viewport={{ once: true, amount: 0.12 }}>
          <PanelHeading icon="chart" title="Problem-solving activity" meta="LEETCODE" />
          <ActivityHeatmap days={leetcode.dailySubmissionCalendar} />
          <div className={styles.difficultySummary}>
            {[
              { label: "Easy", value: leetcode.easySolved, tone: "easy" },
              { label: "Medium", value: leetcode.mediumSolved, tone: "medium" },
              { label: "Hard", value: leetcode.hardSolved, tone: "hard" },
            ].map((item) => (
              <div className={styles.difficultyItem} key={item.label}>
                <span data-tone={item.tone}>{item.label}</span>
                <strong>{numberLabel(item.value)}</strong>
              </div>
            ))}
          </div>
        </motion.article>

        <motion.article className={styles.panel + " " + styles.contestPanel} {...cards} viewport={{ once: true, amount: 0.15 }} transition={reducedMotion ? { duration: 0 } : { duration: 0.48, delay: 0.08 }}>
          <PanelHeading icon="trophy" title="Contest history" meta="RECORDED RESULTS" />
          <ContestHistory data={leetcode} />
        </motion.article>

        <motion.article className={styles.panel + " " + styles.focusPanel} {...cards} viewport={{ once: true, amount: 0.15 }} transition={reducedMotion ? { duration: 0 } : { duration: 0.48, delay: 0.12 }}>
          <PanelHeading icon="target" title="Focus areas" meta="WHAT I PRACTISE" />
          <div className={styles.focusGrid}>
            {focusAreas.map((item) => (
              <div className={styles.focusCard} data-tone={item.tone} key={item.title}>
                <span><Glyph kind={item.icon} /></span>
                <div><strong>{item.title}</strong><p>{item.detail}</p></div>
              </div>
            ))}
          </div>
        </motion.article>

        <motion.article className={styles.panel + " " + styles.resourcesPanel} {...cards} viewport={{ once: true, amount: 0.15 }} transition={reducedMotion ? { duration: 0 } : { duration: 0.48, delay: 0.16 }}>
          <PanelHeading icon="book" title="Practice resources" meta="OPEN REFERENCE" />
          <div className={styles.resourceGrid}>
            {resources.map((item) => (
              <a className={styles.resourceLink} data-tone={item.tone} href={item.href} target="_blank" rel="noreferrer" key={item.name}>
                <span className={styles.resourceMark}>{item.name === "CP-Algorithms" ? "CP" : item.name.slice(0, 2).toUpperCase()}</span>
                <span><strong>{item.name}</strong><small>{item.detail}</small></span>
                <Arrow />
              </a>
            ))}
          </div>
        </motion.article>
      </div>
      <p className={styles.snapshotNote}>Metrics are drawn from the portfolio’s saved profile snapshot; unavailable values are left blank rather than estimated. <a href={LEETCODE_URL} target="_blank" rel="noreferrer">Check LeetCode for current totals <Arrow /></a></p>
    </section>
  );
}
