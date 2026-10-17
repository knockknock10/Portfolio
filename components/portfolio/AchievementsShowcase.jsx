"use client";

import { motion, useReducedMotion } from "framer-motion";
import styles from "./AchievementsShowcase.module.css";

const GITHUB_URL = "https://github.com/knockknock10";
const LEETCODE_URL = "https://leetcode.com/u/knockknock10/";
const SNAPSHOT_LABEL = "Profile data snapshot · 10 Oct 2026";

function hasNumber(value) {
  return typeof value === "number" && Number.isFinite(value);
}

function displayNumber(value) {
  return hasNumber(value) ? value.toLocaleString("en-US") : "—";
}

function SmallIcon({ kind }) {
  const shared = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" };
  if (kind === "cap") return <svg viewBox="0 0 24 24" {...shared}><path d="m2 9 10-5 10 5-10 5z"/><path d="M6 11v5c3.7 3 8.3 3 12 0v-5M22 9v6"/></svg>;
  if (kind === "code") return <svg viewBox="0 0 24 24" {...shared}><path d="m8 7-5 5 5 5m8-10 5 5-5 5m-2-12-4 14"/></svg>;
  if (kind === "trophy") return <svg viewBox="0 0 24 24" {...shared}><path d="M8 4h8v5a4 4 0 0 1-8 0zM8 6H4v2a4 4 0 0 0 4 4m8-6h4v2a4 4 0 0 1-4 4M12 13v5m-4 2h8m-7-2h6"/></svg>;
  if (kind === "github") return <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.03c-3.1.67-3.76-1.31-3.76-1.31-.5-1.28-1.24-1.62-1.24-1.62-1.02-.7.08-.69.08-.69 1.13.08 1.72 1.16 1.72 1.16 1 1.72 2.62 1.22 3.26.94.1-.73.4-1.22.71-1.5-2.48-.28-5.09-1.24-5.09-5.52 0-1.22.44-2.22 1.16-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.05 1.15a10.6 10.6 0 0 1 5.55 0c2.11-1.44 3.05-1.15 3.05-1.15.61 1.54.23 2.68.11 2.96.72.78 1.16 1.78 1.16 3 0 4.29-2.62 5.24-5.11 5.51.4.35.76 1.03.76 2.08v3.08c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z"/></svg>;
  if (kind === "shield") return <svg viewBox="0 0 24 24" {...shared}><path d="M12 3 20 6v5c0 5-3.4 8-8 10-4.6-2-8-5-8-10V6z"/><path d="m8.5 12 2.3 2.2 4.7-5"/></svg>;
  if (kind === "book") return <svg viewBox="0 0 24 24" {...shared}><path d="M4 5.5A3.5 3.5 0 0 1 7.5 2H20v17H7.5A3.5 3.5 0 0 0 4 22zM4 5.5V22m4-15h8m-8 4h7"/></svg>;
  return <svg viewBox="0 0 24 24" {...shared}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>;
}

function SectionHeader({ icon, title, index, link, linkLabel }) {
  return (
    <div className={styles.panelHeader}>
      <span className={styles.panelIcon}><SmallIcon kind={icon}/></span>
      <h3>{title}</h3>
      {index ? <span className={styles.panelIndex}>{index}</span> : null}
      {link ? <a href={link}>{linkLabel || "View all"} <span aria-hidden="true">↗</span></a> : null}
    </div>
  );
}

function CertificatePanel({ items }) {
  return (
    <article className={styles.panel + " " + styles.certPanel}>
      <SectionHeader icon="shield" title="Certifications" index="01"/>
      {items.length ? (
        <div className={styles.certificateGrid}>
          {items.map((item) => (
            <article className={styles.certificate} key={item.title + (item.issuer || "")}>
              <div className={styles.certificateTop}>
                {item.badgeImage && item.badgeImage !== "MISSING" ? <img src={item.badgeImage} alt="" loading="lazy" onError={(event) => { event.currentTarget.style.display = "none"; }}/> : <span className={styles.certificateGlyph}><SmallIcon kind="shield"/></span>}
                <span className={styles.certificateIssuer}>{item.issuer && item.issuer !== "MISSING" ? item.issuer : "Issuer not supplied"}</span>
              </div>
              <h4>{item.title}</h4>
              {item.issueDate && item.issueDate !== "MISSING" ? <p>Issued {item.issueDate}</p> : null}
              {item.skillsCovered && Array.isArray(item.skillsCovered) ? <div className={styles.certificateTags}>{item.skillsCovered.slice(0, 3).map(tag => <span key={tag}>{tag}</span>)}</div> : null}
              {item.credentialUrl && item.credentialUrl !== "MISSING" ? <a className={styles.inlineLink} href={item.credentialUrl} target="_blank" rel="noreferrer">Verify credential <span aria-hidden="true">↗</span></a> : null}
            </article>
          ))}
        </div>
      ) : (
        <div className={styles.credentialsEmpty}>
          <div className={styles.emptySeal} aria-hidden="true"><SmallIcon kind="shield"/></div>
          <div>
            <span className={styles.emptyKicker}>CREDENTIAL ARCHIVE</span>
            <h4>No certificates listed yet</h4>
            <p>No certificate title, issuer, or verification link is recorded in the current portfolio data. This section will populate when verified credentials are added—without placeholder badges or guessed claims.</p>
          </div>
          <a href={GITHUB_URL + "/Portfolio/blob/main/PORTFOLIO-DATA.md"} target="_blank" rel="noreferrer">Update credential records <span aria-hidden="true">↗</span></a>
        </div>
      )}
    </article>
  );
}

function AcademicPanel() {
  return (
    <article className={styles.panel + " " + styles.academicPanel}>
      <SectionHeader icon="cap" title="Academic Record" index="02"/>
      <div className={styles.cgpaHero}>
        <span>CGPA</span>
        <strong>8.61</strong>
        <span className={styles.cgpaRing} aria-hidden="true"><SmallIcon kind="cap"/></span>
      </div>
      <div className={styles.educationDetails}>
        <span className={styles.livePill}><i/> Currently in 3rd year</span>
        <h4>B.Tech · Computer Science &amp; Engineering</h4>
        <p>SRM University AP · Amaravati</p>
        <div className={styles.educationMeta}><span>2024—2028</span><span>Undergraduate</span></div>
      </div>
      <div className={styles.academicNote}><SmallIcon kind="book"/><span>Academic record provided for the current portfolio profile.</span></div>
    </article>
  );
}

function CodingPanel({ data }) {
  const solved = data?.leetcode?.totalSolved;
  const easy = data?.leetcode?.easySolved;
  const medium = data?.leetcode?.mediumSolved;
  const hard = data?.leetcode?.hardSolved;
  const contestRating = data?.leetcode?.contestRating;
  const contestRank = data?.leetcode?.contestRank;
  const contestCount = data?.leetcode?.contestAttendedCount;
  const topPercent = data?.leetcode?.contestTopPercentage;
  const badge = data?.leetcode?.badges?.[0];
  const hasSolvedSplit = hasNumber(easy) && hasNumber(medium) && hasNumber(hard);
  const sum = hasSolvedSplit ? easy + medium + hard : 0;
  const safeRatio = (value) => sum > 0 ? Math.max(0, Math.min(100, (value / sum) * 100)) : 0;
  return (
    <article className={styles.panel + " " + styles.codingPanel}>
      <SectionHeader icon="code" title="Problem Solving" index="03" link={LEETCODE_URL} linkLabel="View profile"/>
      <div className={styles.solvedTotal}><strong>{displayNumber(solved)}</strong><span>problems solved in the saved profile snapshot</span></div>
      {hasSolvedSplit ? (
        <div className={styles.difficultyBreakdown} aria-label={"Easy " + easy + ", Medium " + medium + ", Hard " + hard}>
          {[[ "Easy", easy, "easy" ], [ "Medium", medium, "medium" ], [ "Hard", hard, "hard" ]].map(([label, value, tone]) => (
            <div className={styles.difficultyRow} key={label}>
              <div><span data-tone={tone}>{label}</span><strong>{displayNumber(value)}</strong></div>
              <div className={styles.difficultyTrack}><i data-tone={tone} style={{ width: safeRatio(value) + "%" }}/></div>
            </div>
          ))}
        </div>
      ) : <p className={styles.dataUnavailable}>Solved counts are not present in the saved profile snapshot.</p>}
      <div className={styles.contestMiniGrid}>
        <div><span>Contest rating</span><strong>{hasNumber(contestRating) ? Math.round(contestRating).toLocaleString("en-US") : "—"}</strong></div>
        <div><span>Contest rank</span><strong>{hasNumber(contestRank) ? contestRank.toLocaleString("en-US") : "—"}</strong></div>
        <div><span>Contests recorded</span><strong>{displayNumber(contestCount)}</strong></div>
      </div>
      <div className={styles.contestBadges}>
        {badge && badge !== "MISSING" ? <span className={styles.knightBadge}><SmallIcon kind="trophy"/>{badge} badge</span> : null}
        {topPercent && topPercent !== "MISSING" ? <span className={styles.rankBadge}>Top {String(topPercent).replace(/^Top\s*/i, "").replace(/%?$/, "%")} in contests</span> : null}
      </div>
      <p className={styles.snapshotNote}>Profile metrics can change. Open LeetCode for the current totals.</p>
    </article>
  );
}

function ContributionMini({ calendar }) {
  const weeks = Array.isArray(calendar?.weeks) ? calendar.weeks : [];
  const days = weeks.flatMap((week) => Array.isArray(week.contributionDays) ? week.contributionDays : []);
  const count = calendar?.totalContributions;
  if (!days.length) {
    return (
      <div className={styles.noCalendar}>
        <div className={styles.noCalendarMark}>
          <span><SmallIcon kind="github"/></span>
          <div><strong>Contribution calendar not in snapshot</strong><small>Current repository totals are available below.</small></div>
        </div>
        <p>The saved data does not include daily contribution records, so a heatmap will appear only after that data is refreshed.</p>
        <a href="#open-source">Open the contribution view in Open Source <span aria-hidden="true">↗</span></a>
      </div>
    );
  }
  const recentDays = days.slice(-140);
  const max = Math.max(1, ...recentDays.map((day) => day.contributionCount || 0));
  return (
    <div className={styles.calendarWrap}>
      <div className={styles.calendarMonths}><span>RECENT ACTIVITY</span><span>{hasNumber(count) ? count.toLocaleString("en-US") + " contributions" : "Contribution history"}</span></div>
      <div className={styles.calendarGrid} role="img" aria-label="Saved GitHub contribution calendar, recent 140 days">
        {recentDays.map((day) => {
          const level = day.contributionCount <= 0 ? 0 : day.contributionCount / max >= .75 ? 4 : day.contributionCount / max >= .5 ? 3 : day.contributionCount / max >= .25 ? 2 : 1;
          return <i key={day.date} data-level={level} title={day.date + ": " + day.contributionCount + " contributions"}/>;
        })}
      </div>
      <div className={styles.calendarLegend}><span>Less</span>{[0,1,2,3,4].map(level=><i key={level} data-level={level}/>)}<span>More</span></div>
    </div>
  );
}

function GitHubPanel({ data }) {
  const repos = data?.github?.totalRepos;
  const stars = data?.github?.totalStars;
  const forks = data?.github?.totalForks;
  return (
    <article className={styles.panel + " " + styles.githubPanel}>
      <SectionHeader icon="github" title="GitHub Activity" index="04" link={GITHUB_URL} linkLabel="View profile"/>
      <div className={styles.githubMiniStats}>
        <div><strong>{displayNumber(repos)}</strong><span>Public repositories</span></div>
        <div><strong>{displayNumber(stars)}</strong><span>Stars on public repositories</span></div>
        <div><strong>{displayNumber(forks)}</strong><span>Public forks</span></div>
      </div>
      <ContributionMini calendar={data?.github?.contributionCalendar}/>
      <a className={styles.githubFootLink} href="#open-source">Explore the contribution trail <span aria-hidden="true">↗</span></a>
    </article>
  );
}

const milestones = [
  {
    date: "2026",
    kind: "Research",
    title: "SemBind-Audio manuscript submitted",
    detail: "Reference-based speech watermarking; manuscript submitted to IEEE Signal Processing Letters.",
    href: "https://github.com/knockknock10/SemBind_Audio",
    tone: "violet",
  },
  {
    date: "OCT 2026",
    kind: "New direction",
    title: "Causal-temporal audio knowledge graphs",
    detail: "Beginning research into knowledge graphs for non-visual situational intelligence.",
    href: "#research",
    tone: "blue",
  },
  {
    date: "Earlier work",
    kind: "Research",
    title: "Nano Sensor Project",
    detail: "MATLAB-based nano-scale sensor-network communication simulation, routing and packet propagation.",
    href: "#research",
    tone: "mint",
  },
  {
    date: "Ongoing",
    kind: "Engineering",
    title: "Projects and upstream contributions",
    detail: "Building Aevor, CommitHub, Wandera, ConvergenceGuard and NovaFest while improving existing open-source projects.",
    href: "#open-source",
    tone: "coral",
  },
];

function MilestonesPanel() {
  const reducedMotion = useReducedMotion();
  return (
    <article className={styles.panel + " " + styles.milestonesPanel}>
      <SectionHeader icon="trophy" title="Milestones" index="05" link="#work" linkLabel="View work"/>
      <ol className={styles.milestonesList}>
        {milestones.map((item, index) => (
          <motion.li key={item.title} data-tone={item.tone} initial={reducedMotion ? false : { opacity: 0, x: -6 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: .18 }} transition={{ duration: reducedMotion ? 0 : .28, delay: reducedMotion ? 0 : index * .04 }}>
            <span className={styles.milestoneDot} aria-hidden="true"/>
            <div className={styles.milestoneDate}>{item.date}<span>{item.kind}</span></div>
            <div className={styles.milestoneBody}><h4>{item.title}</h4><p>{item.detail}</p><a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel={item.href.startsWith("http") ? "noreferrer" : undefined}>Open related work <span aria-hidden="true">↗</span></a></div>
          </motion.li>
        ))}
      </ol>
    </article>
  );
}

export default function AchievementsShowcase({ items = [], data }) {
  const reducedMotion = useReducedMotion();
  const cards = [
    { value: "8.61", label: "CGPA", detail: "B.Tech CSE · SRM University AP", icon: "cap", tone: "blue" },
    { value: displayNumber(data?.leetcode?.totalSolved), label: "Problems solved", detail: "LeetCode profile snapshot", icon: "code", tone: "violet" },
    { value: data?.leetcode?.contestTopPercentage && data.leetcode.contestTopPercentage !== "MISSING" ? "Top " + String(data.leetcode.contestTopPercentage).replace(/^Top\s*/i, "") : "—", label: "Contest standing", detail: displayNumber(data?.leetcode?.contestAttendedCount) + " contests recorded", icon: "trophy", tone: "amber" },
    { value: displayNumber(data?.github?.totalRepos), label: "Public repositories", detail: displayNumber(data?.github?.totalStars) + " public stars", icon: "github", tone: "blue" },
  ];
  return (
    <section className={styles.achievementsSection} id="certifications" aria-labelledby="achievements-heading" tabIndex={-1}>
      <header className={styles.achievementsHeader}>
        <motion.div className={styles.achievementsIntro} initial={reducedMotion ? false : { opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }} transition={{ duration: reducedMotion ? 0 : .4 }}>
          <p className={styles.eyebrow}><span>07</span><i/> ACHIEVEMENTS <b/></p>
          <h2 id="achievements-heading">Achievements &amp; <span>Certifications</span></h2>
          <p>A record of academic progress, measured problem-solving, research milestones and work that can be inspected. Each number comes from the saved profile data; live profiles are one click away.</p>
          <div className={styles.introActions}>
            <a href={LEETCODE_URL} target="_blank" rel="noreferrer">LeetCode profile <span aria-hidden="true">↗</span></a>
            <a href={GITHUB_URL} target="_blank" rel="noreferrer">GitHub profile <span aria-hidden="true">↗</span></a>
          </div>
        </motion.div>
        <motion.div className={styles.highlightsPanel} initial={reducedMotion ? false : { opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .18 }} transition={{ duration: reducedMotion ? 0 : .45, delay: reducedMotion ? 0 : .05 }}>
          <div className={styles.highlightsTop}><span><SmallIcon kind="trophy"/> Key highlights</span><small>PROFILE SNAPSHOT</small></div>
          <div className={styles.highlightGrid}>
            {cards.map((card,index) => (
              <div className={styles.highlightCard} data-tone={card.tone} key={card.label}>
                <span className={styles.highlightIcon}><SmallIcon kind={card.icon}/></span>
                <div><strong>{card.value}</strong><span>{card.label}</span><small>{card.detail}</small></div>
                <span className={styles.highlightIndex}>0{index+1}</span>
              </div>
            ))}
          </div>
          <p className={styles.snapshotDate}>Saved profile snapshot · 10 Oct 2026. Profile totals can change.</p>
        </motion.div>
      </header>

      <div className={styles.primaryGrid}>
        <CertificatePanel items={items}/>
        <AcademicPanel/>
      </div>

      <div className={styles.secondaryGrid}>
        <CodingPanel data={data}/>
        <GitHubPanel data={data}/>
        <MilestonesPanel/>
      </div>

      <footer className={styles.achievementFooter}>
        <span className={styles.footerMark}><SmallIcon kind="shield"/></span>
        <div><strong>Evidence over inflated numbers.</strong><span>Certificates and contribution totals are shown only when they exist in the saved data source.</span></div>
        <a href="#about">More about me <span aria-hidden="true">↗</span></a>
      </footer>
    </section>
  );
}
