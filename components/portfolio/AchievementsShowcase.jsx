"use client";

import { motion, useReducedMotion } from "framer-motion";
import styles from "./AchievementsShowcase.module.css";

const events = [
  { month: "MAR 2026", title: "HackPSU 2026", detail: "Participation · Software development", tone: "blue", mark: "H" },
  { month: "OCT 2026", title: "AWS Bangalore Event 2026", detail: "Attended · Cloud and AI", tone: "amber", mark: "AWS" },
  { month: "OCT 2024", title: "Hacktoberfest 2024", detail: "Open-source contributions", tone: "violet", mark: "⌘" },
  { month: "MAR 2024", title: "College Technical Fest", detail: "Participation · Project showcase", tone: "green", mark: "✳" },
];

function Icon({ kind }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" };
  if (kind === "cap") return <svg viewBox="0 0 24 24" {...common}><path d="m2 9 10-5 10 5-10 5z"/><path d="M6 11v5c3.7 3 8.3 3 12 0v-5M22 9v6"/></svg>;
  if (kind === "shield") return <svg viewBox="0 0 24 24" {...common}><path d="M12 3 20 6v5c0 5-3.4 8-8 10-4.6-2-8-5-8-10V6z"/><path d="m8.5 12 2.3 2.2 4.7-5"/></svg>;
  if (kind === "trophy") return <svg viewBox="0 0 24 24" {...common}><path d="M8 4h8v5a4 4 0 0 1-8 0zM8 6H4v2a4 4 0 0 0 4 4m8-6h4v2a4 4 0 0 1-4 4M12 13v5m-4 2h8"/></svg>;
  if (kind === "book") return <svg viewBox="0 0 24 24" {...common}><path d="M4 5.5A3.5 3.5 0 0 1 7.5 2H20v17H7.5A3.5 3.5 0 0 0 4 22zM4 5.5V22m4-15h8m-8 4h7"/></svg>;
  return <svg viewBox="0 0 24 24" {...common}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>;
}

function PanelHeading({ icon, title, eyebrow }) {
  return (
    <header className={styles.panelHeading}>
      <span className={styles.panelIcon}><Icon kind={icon} /></span>
      <div><h3>{title}</h3>{eyebrow ? <p>{eyebrow}</p> : null}</div>
    </header>
  );
}

function CertificateArchive({ items }) {
  const present = (value) => typeof value === "string" && value !== "MISSING" && Boolean(value.trim());
  return (
    <article className={styles.panel + " " + styles.certPanel}>
      <PanelHeading icon="shield" title="Certification archive" eyebrow="CREDENTIALS · EVIDENCE FIRST" />
      {items.length ? (
        <div className={styles.certList}>
          {items.map((item, index) => (
            <motion.article
              className={styles.certRow}
              key={item.title + "-" + item.issuer}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.35, delay: Math.min(index * 0.045, 0.18) }}
            >
              <span className={styles.certSeal}>{present(item.badgeImage) ? <img src={item.badgeImage} alt="" loading="lazy" /> : <Icon kind="shield" />}</span>
              <span className={styles.certCopy}>
                <strong>{item.title}</strong>
                <small>{present(item.issuer) ? item.issuer : "Issuer not recorded"}{present(item.issueDate) ? " · " + item.issueDate : ""}</small>
                <span className={styles.verification} data-verified={item.verificationStatus === "verified" ? "true" : "false"}>
                  {item.verificationStatus === "verified" ? "Verification link recorded" : "Self-reported · not independently verified"}
                </span>
              </span>
              {present(item.credentialUrl) ? <a className={styles.externalLink} href={item.credentialUrl} target="_blank" rel="noreferrer" aria-label={"Verify " + item.title}>↗</a> : null}
            </motion.article>
          ))}
        </div>
      ) : (
        <div className={styles.emptyArchive}>
          <span className={styles.emptySeal}><Icon kind="shield" /></span>
          <div>
            <span className={styles.emptyEyebrow}>NO CREDENTIAL RECORDS YET</span>
            <h4>Only verified credentials belong here.</h4>
            <p>The current repository has no certificate records or verification links. This section is ready for real credentials; it will not fill the space with guessed badges.</p>
            <a href="https://github.com/knockknock10/Portfolio/blob/main/PORTFOLIO-DATA.md" target="_blank" rel="noreferrer">View the portfolio data source <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      )}
      {items.length ? <p className={styles.panelFootnote}>Credential links open the issuer or verification record where one is available.</p> : null}
    </article>
  );
}

function AcademicPanel() {
  const entries = [
    { label: "Degree", value: "B.Tech · Computer Science & Engineering", note: "SRM University AP · Amaravati", icon: "cap" },
    { label: "Academic standing", value: "CGPA 8.61", note: "Current saved academic record", icon: "trophy" },
    { label: "Academic milestone", value: "Dean’s List · 2024–2025", note: "Academic excellence", icon: "shield" },
    { label: "Consistent performance", value: "8.0+ CGPA", note: "Across semesters, as recorded in the profile reference", icon: "clock" },
  ];
  return (
    <article className={styles.panel + " " + styles.academicPanel}>
      <PanelHeading icon="cap" title="Academic achievements" eyebrow="THE FOUNDATION" />
      <div className={styles.academicList}>
        {entries.map((item, index) => (
          <motion.div className={styles.academicRow} key={item.label} initial={{ opacity: 0, x: 8 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.32, delay: index * 0.035 }}>
            <span className={styles.academicIcon} data-tone={item.icon}><Icon kind={item.icon} /></span>
            <span className={styles.academicCopy}><small>{item.label}</small><strong>{item.value}</strong><em>{item.note}</em></span>
          </motion.div>
        ))}
      </div>
      <div className={styles.academicFooter}><span>Expected graduation</span><strong>2028</strong></div>
    </article>
  );
}

function EventTrail() {
  const reducedMotion = useReducedMotion();
  return (
    <article className={styles.panel + " " + styles.eventsPanel}>
      <PanelHeading icon="trophy" title="Competitions & events" eyebrow="PARTICIPATION · COMMUNITY · PRACTICE" />
      <ol className={styles.eventList}>
        {events.map((item, index) => (
          <motion.li key={item.title} data-tone={item.tone} initial={reducedMotion ? false : { opacity: 0, x: 9 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.1 }} transition={reducedMotion ? { duration: 0 } : { duration: 0.32, delay: index * 0.045 }}>
            <span className={styles.eventMarker}>{item.mark}</span>
            <span className={styles.eventCopy}><small>{item.month}</small><strong>{item.title}</strong><em>{item.detail}</em></span>
            <span className={styles.eventArrow} aria-hidden="true">↗</span>
          </motion.li>
        ))}
      </ol>
    </article>
  );
}

/** @param {{ items?: import("@/lib/certifications").Certification[], standalone?: boolean }} props */
export default function AchievementsShowcase({ items = [], standalone = false }) {
  const reducedMotion = useReducedMotion();
  const entryTransition = reducedMotion ? { duration: 0 } : { duration: 0.42, ease: [0.22, 1, 0.36, 1] };
  const displayItems = Array.isArray(items) ? items : [];
  return (
    <section id={standalone ? undefined : "certifications"} className={styles.section} data-standalone={standalone ? "true" : "false"} aria-labelledby="achievements-heading" tabIndex={-1}>
      <header className={styles.sectionHeader}>
        <div className={styles.headingCopy}>
          <p className={styles.eyebrow}><span>08</span><i /> ACHIEVEMENTS <b /></p>
          <h2 id="achievements-heading">Progress with <span>proof.</span></h2>
          <p className={styles.lede}>Academic milestones, events and credentials deserve a clear record. This section separates documented achievements from active projects and daily practice.</p>
        </div>
        <div className={styles.statsGrid}>
          <motion.div className={styles.statCard} initial={reducedMotion ? false : { opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={entryTransition}>
            <span className={styles.statIcon} data-tone="blue"><Icon kind="cap" /></span><span className={styles.statLabel}>CURRENT CGPA</span><strong>8.61</strong><small>B.Tech · Computer Science</small>
          </motion.div>
          <motion.div className={styles.statCard} initial={reducedMotion ? false : { opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={reducedMotion ? { duration: 0 } : { ...entryTransition, delay: 0.07 }}>
            <span className={styles.statIcon} data-tone="violet"><Icon kind="shield" /></span><span className={styles.statLabel}>CREDENTIAL ARCHIVE</span><strong>{displayItems.length}</strong><small>{displayItems.length === 1 ? "recorded credential" : "recorded credentials"}</small>
          </motion.div>
          <motion.div className={styles.statCard} initial={reducedMotion ? false : { opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={reducedMotion ? { duration: 0 } : { ...entryTransition, delay: 0.14 }}>
            <span className={styles.statIcon} data-tone="amber"><Icon kind="trophy" /></span><span className={styles.statLabel}>EVENT TRAIL</span><strong>{events.length}</strong><small>Events & practice milestones</small>
          </motion.div>
        </div>
      </header>
      <div className={styles.panelGrid}>
        <CertificateArchive items={displayItems} />
        <EventTrail />
        <AcademicPanel />
      </div>
      <p className={styles.sectionNote}><Icon kind="book" /> Credentials, academic details and participation claims should be updated from their original sources. Project and coding statistics live in their own sections to avoid repeating the same information here.</p>
    </section>
  );
}
