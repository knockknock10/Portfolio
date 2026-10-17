"use client";

import { motion, useReducedMotion } from "framer-motion";
import styles from "./ExperienceShowcase.module.css";

const isPresent = (value) =>
  typeof value === "string" && value.trim() !== "" && !/^MISSING(?:\\s|$|—)/i.test(value);

const shortDate = (value) => {
  if (!isPresent(value)) return "";
  if (/^\\d{4}-\\d{2}-\\d{2}$/.test(value)) {
    return new Date(value + "T00:00:00Z").toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
      timeZone: "UTC",
    });
  }
  return value;
};

const compact = (value, max = 230) => {
  if (!isPresent(value)) return "";
  const normalized = value.replace(/\\s+/g, " ").trim();
  return normalized.length > max ? normalized.slice(0, max).replace(/[ ,;:.]+$/, "") + "…" : normalized;
};

function DateRail({ label, index, tone }) {
  return (
    <div className={styles.dateRail} data-tone={tone}>
      <span className={styles.dateLabel}>{label}</span>
      <span className={styles.timelineNode} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
    </div>
  );
}

function EventGlyph({ kind }) {
  const shared = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };
  if (kind === "graph") return <svg viewBox="0 0 32 32" {...shared}><circle cx="7" cy="16" r="3"/><circle cx="23" cy="7" r="3"/><circle cx="24" cy="24" r="3"/><path d="m10 15 10-7M10 18l11 5M23 10v11"/></svg>;
  if (kind === "research") return <svg viewBox="0 0 32 32" {...shared}><path d="M11 4h10M14 4v8L6 25a2 2 0 0 0 2 3h16a2 2 0 0 0 2-3l-8-13V4"/><path d="M10 22h12M13 18h6"/></svg>;
  if (kind === "opensource") return <svg viewBox="0 0 32 32" {...shared}><path d="M12 8 4 16l8 8M20 8l8 8-8 8M18 5l-4 22"/></svg>;
  if (kind === "sensor") return <svg viewBox="0 0 32 32" {...shared}><rect x="8" y="8" width="16" height="16" rx="3"/><path d="M12 3v5m8-5v5M12 24v5m8-5v5M3 12h5m-5 8h5m16-8h5m-5 8h5M12 13h8v6h-8z"/></svg>;
  if (kind === "work") return <svg viewBox="0 0 32 32" {...shared}><rect x="4" y="10" width="24" height="17" rx="3"/><path d="M11 10V6h10v4M4 17h24M13 16v3h6v-3"/></svg>;
  return <svg viewBox="0 0 32 32" {...shared}><path d="M7 4h18v24H7zM11 10h10M11 15h10M11 20h6"/></svg>;
}

const currentThread = {
  id: "knowledge-graph",
  date: "OCT 2026 · CURRENT",
  category: "RESEARCH DIRECTION",
  title: "Causal-temporal audio knowledge graphs",
  description: "Exploring temporal knowledge graphs, causal reasoning and GraphRAG for non-visual situational intelligence. This is an active research direction—not a claimed publication.",
  status: "Exploring",
  tone: "violet",
  kind: "graph",
  link: "#research",
  linkLabel: "Research context",
  tags: ["Temporal knowledge graphs", "Causal reasoning", "GraphRAG"],
};

const openSourceThread = {
  id: "upstream-engineering",
  date: "ONGOING",
  category: "UPSTREAM ENGINEERING",
  title: "Contributing inside real codebases",
  description: "Source-linked work across plugin integrations, Go services, Kubernetes/network-policy testing and regression coverage. Merged and still-open work is labelled separately in the Open Source section.",
  status: "Maintainer review",
  tone: "green",
  kind: "opensource",
  link: "#open-source",
  linkLabel: "Inspect contributions",
  tags: ["Kestra", "Apache Camel K", "Wanaku AI", "Go · Java · Testing"],
};

function researchEvent(item, index) {
  const isSemBind = /^sembind/i.test(item?.title || "");
  const isSensor = /nano.?sensor/i.test(item?.title || "");
  const date = isPresent(item?.year) ? item.year : "DATE NOT RECORDED";
  return {
    id: "research-" + (item?.title || index),
    date,
    category: isPresent(item?.type) ? item.type.toUpperCase() : "RESEARCH",
    title: isSemBind
      ? "SemBind-Audio · speech watermarking"
      : isSensor
        ? "Nanosensor network communication simulator"
        : item?.title || "Research project",
    description: compact(item?.abstract, isSemBind ? 255 : 205) || "Research description is not available in the current portfolio data.",
    status: isPresent(item?.status) ? item.status : "Research entry",
    tone: isSemBind ? "blue" : "amber",
    kind: isSensor ? "sensor" : "research",
    link: isPresent(item?.link) ? item.link : "",
    linkLabel: isPresent(item?.link) ? "Open research repo" : "",
    pdf: isPresent(item?.pdf) ? item.pdf : "",
    pdfLabel: isPresent(item?.pdf) ? "Read manuscript" : "",
    tags: Array.isArray(item?.tags) ? item.tags.filter(isPresent).slice(0, 4) : [],
    yearValue: isPresent(item?.year) ? Number.parseInt(item.year, 10) || 0 : 0,
    priority: isSemBind ? 3 : isSensor ? 1 : 2,
  };
}

function internshipEvent(item, index) {
  const start = shortDate(item?.startDate);
  const end = isPresent(item?.endDate) && item.endDate.toLowerCase() === "present" ? "Present" : shortDate(item?.endDate);
  const date = start && end ? start + " — " + end : start || end || "DATES NOT RECORDED";
  return {
    id: "industry-" + (item?.company || index),
    date,
    category: isPresent(item?.role) ? item.role.toUpperCase() : "INDUSTRY EXPERIENCE",
    title: [item?.role, item?.company].filter(isPresent).join(" · ") || item?.company || "Experience",
    description: compact(item?.summary, 220) || "Experience details are not available in the current portfolio data.",
    status: "Industry experience",
    tone: "amber",
    kind: "work",
    link: isPresent(item?.link) ? item.link : "",
    linkLabel: isPresent(item?.link) ? "Open organization" : "",
    tags: Array.isArray(item?.stack) && item.stack !== "MISSING" ? item.stack.slice(0, 4) : [],
    yearValue: start ? Number.parseInt(start.slice(-4), 10) || 0 : 0,
    priority: 4,
  };
}

function EvidenceLink({ href, children, subtle = false }) {
  if (!isPresent(href)) return null;
  const external = /^https?:\\/\\//i.test(href);
  return (
    <a className={subtle ? styles.evidenceLinkSubtle : styles.evidenceLink} href={href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined}>
      {children}<span aria-hidden="true">↗</span>
    </a>
  );
}

function TimelineEvent({ item, index, reducedMotion }) {
  return (
    <motion.li
      className={styles.timelineItem}
      data-tone={item.tone}
      initial={reducedMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={reducedMotion ? { duration: 0 } : { duration: 0.46, delay: Math.min(index * 0.06, 0.24), ease: [0.22, 1, 0.36, 1] }}
    >
      <DateRail label={item.date} index={index} tone={item.tone}/>
      <article className={styles.eventCard}>
        <div className={styles.eventAccent} aria-hidden="true"/>
        <div className={styles.eventIcon}><EventGlyph kind={item.kind}/></div>
        <div className={styles.eventBody}>
          <div className={styles.eventMeta}>
            <span className={styles.eventCategory}>{item.category}</span>
            <span className={styles.eventStatus} data-tone={item.tone}><i aria-hidden="true"/>{item.status}</span>
          </div>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          {item.tags?.length ? <div className={styles.eventTags}>{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div> : null}
          <div className={styles.eventActions}>
            <EvidenceLink href={item.link}>{item.linkLabel || "Open evidence"}</EvidenceLink>
            <EvidenceLink href={item.pdf} subtle>{item.pdfLabel || "Read document"}</EvidenceLink>
          </div>
        </div>
      </article>
    </motion.li>
  );
}

function WorkingPrinciples() {
  const principles = [
    { n: "01", title: "Read the system", text: "Understand the existing contract before changing it." },
    { n: "02", title: "Make the change", text: "Keep the patch focused and explain the trade-off." },
    { n: "03", title: "Run the proof", text: "Test the path, boundary cases and regressions." },
    { n: "04", title: "Leave context", text: "Make the result reviewable for the next engineer." },
  ];
  return (
    <aside className={styles.practicePanel} aria-labelledby="practice-heading">
      <div className={styles.practiceHeader}>
        <span className={styles.terminalLights} aria-hidden="true"><i/><i/><i/></span>
        <span>WORKING_NOTES.md</span>
        <span className={styles.practiceVersion}>v1.0</span>
      </div>
      <h3 id="practice-heading">How I approach a codebase.</h3>
      <p className={styles.practiceLead}>Not a claimed job title. A repeatable way to make a change another engineer can inspect.</p>
      <ol className={styles.principleList}>
        {principles.map((item) => (
          <li key={item.n}>
            <span>{item.n}</span>
            <div><strong>{item.title}</strong><small>{item.text}</small></div>
            <i aria-hidden="true">↗</i>
          </li>
        ))}
      </ol>
      <div className={styles.practiceFooter}><span className={styles.statusDot}/><span>Evidence over adjectives</span><span>·</span><span>Review-ready</span></div>
    </aside>
  );
}

export default function ExperienceShowcase({ researchItems = [], internships = [] }) {
  const reducedMotion = useReducedMotion();
  const safeResearch = Array.isArray(researchItems) ? researchItems : [];
  const safeInternships = Array.isArray(internships) ? internships : [];
  const researchEvents = safeResearch.map(researchEvent);
  const internshipEvents = safeInternships.map(internshipEvent);
  const events = [
    currentThread,
    ...researchEvents.sort((a, b) => (b.yearValue - a.yearValue) || (a.priority - b.priority)),
    openSourceThread,
    ...internshipEvents,
  ];

  return (
    <section className={styles.section} id="internships" aria-labelledby="experience-heading" tabIndex={-1}>
      <div className={styles.sectionInner}>
        <header className={styles.sectionHeader}>
          <motion.div className={styles.headingCopy} initial={reducedMotion ? false : { opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.18 }} transition={{ duration: reducedMotion ? 0 : 0.48 }}>
            <p className={styles.eyebrow}><span>05</span><i aria-hidden="true"/> EXPERIENCE &amp; RESEARCH <b aria-hidden="true"/></p>
            <h2 id="experience-heading">The work<br/>has a <span>trail.</span></h2>
            <p className={styles.lede}>Research questions, upstream changes and engineering practice—each kept distinct from formal employment, and linked to evidence wherever it exists.</p>
            <div className={styles.headerFootnote}><span aria-hidden="true">↳</span><span>Scroll the timeline. Follow the work, not just the title.</span></div>
          </motion.div>
          <motion.div className={styles.chapterSignature} initial={reducedMotion ? false : { opacity: 0, x: 12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.18 }} transition={{ duration: reducedMotion ? 0 : 0.48, delay: reducedMotion ? 0 : 0.08 }}>
            <div className={styles.signatureTop}><span>ENGINEERING LOG</span><span>2024 — 2026</span></div>
            <div className={styles.signatureGraphic} aria-hidden="true">
              <svg viewBox="0 0 520 100" preserveAspectRatio="none">
                <defs><linearGradient id="experienceLine" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#f3b46d"/><stop offset=".48" stopColor="#7788ff"/><stop offset="1" stopColor="#79e4c6"/></linearGradient></defs>
                <path d="M0 64 C34 64 34 26 65 26 S103 83 137 70 S185 17 219 38 S267 81 301 54 S354 24 383 50 S426 83 455 49 S495 24 520 17" stroke="url(#experienceLine)" strokeWidth="2.5" fill="none"/>
                {[65,137,219,301,383,455].map((x, i) => <circle key={x} cx={x} cy={[26,70,38,54,50,49][i]} r="4.5" fill="#fff" stroke={["#f3b46d","#b4a6ff","#7788ff","#79e4c6","#a9b6ff","#79e4c6"][i]} strokeWidth="2"/> )}
              </svg>
            </div>
            <div className={styles.signatureBottom}><span>RESEARCH</span><i/><span>OPEN SOURCE</span><i/><span>ENGINEERING</span></div>
            <p>One thread connects them: understand the system, test the change, make the result reviewable.</p>
          </motion.div>
        </header>

        <div className={styles.timelineLayout}>
          <div className={styles.timelinePanel}>
            <div className={styles.timelineHeading}>
              <div><span>THE RECORD</span><h3>Milestones &amp; active threads</h3></div>
              <span className={styles.timelineCount}>{String(events.length).padStart(2, "0")} ENTRIES</span>
            </div>
            <ol className={styles.timelineList}>
              {events.map((item, index) => <TimelineEvent key={item.id} item={item} index={index} reducedMotion={reducedMotion}/>)}
            </ol>
          </div>
          <WorkingPrinciples/>
        </div>
        <footer className={styles.experienceFooter}>
          <div className={styles.footerSignal} aria-hidden="true"><EventGlyph kind="graph"/></div>
          <div><strong>Want the full implementation trail?</strong><span>Go directly to project code, the research artifacts, or reviewed upstream contributions.</span></div>
          <div className={styles.footerLinks}>
            <EvidenceLink href="#work">Projects</EvidenceLink>
            <EvidenceLink href="#research">Research</EvidenceLink>
            <EvidenceLink href="#open-source">Open source</EvidenceLink>
          </div>
        </footer>
      </div>
    </section>
  );
}
