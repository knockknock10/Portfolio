"use client";

import { motion, useReducedMotion } from "framer-motion";
import styles from "./AchievementsShowcase.module.css";

function Icon({ kind }) {
  const props = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" };
  if (kind === "cap") return <svg viewBox="0 0 24 24" {...props}><path d="m2 9 10-5 10 5-10 5z"/><path d="M6 11v5c3.7 3 8.3 3 12 0v-5M22 9v6"/></svg>;
  if (kind === "shield") return <svg viewBox="0 0 24 24" {...props}><path d="M12 3 20 6v5c0 5-3.4 8-8 10-4.6-2-8-5-8-10V6z"/><path d="m8.5 12 2.3 2.2 4.7-5"/></svg>;
  if (kind === "external") return <svg viewBox="0 0 24 24" {...props}><path d="M13 5h6v6m0-6-9 9"/><path d="M18 13v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/></svg>;
  if (kind === "book") return <svg viewBox="0 0 24 24" {...props}><path d="M4 5.5A3.5 3.5 0 0 1 7.5 2H20v17H7.5A3.5 3.5 0 0 0 4 22zM4 5.5V22m4-15h8m-8 4h7"/></svg>;
  return <svg viewBox="0 0 24 24" {...props}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>;
}

function present(value) {
  return typeof value === "string" && value.trim() !== "" && value !== "MISSING";
}

function formatDate(value) {
  if (!present(value)) return "";
  if (value === "No expiry") return value;
  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return value;
  return new Date(value + "T00:00:00Z").toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "UTC" });
}

function CredentialShelf({ items }) {
  return (
    <article className={styles.credentialPanel}>
      <header className={styles.panelHeading}>
        <span className={styles.panelIcon}><Icon kind="shield"/></span>
        <div><p className={styles.panelEyebrow}>CREDENTIAL ARCHIVE</p><h3>Certifications &amp; credentials</h3></div>
        <span className={styles.panelCount}>{items.length ? String(items.length).padStart(2, "0") : "—"}</span>
      </header>
      {items.length ? (
        <div className={styles.credentialGrid}>
          {items.map((item) => (
            <article className={styles.credentialCard} key={item.title + "-" + item.issuer}>
              <div className={styles.credentialCardTop}>
                {present(item.badgeImage) ? <img src={item.badgeImage} alt="" loading="lazy" onError={(event) => { event.currentTarget.style.display = "none"; }}/> : <span className={styles.credentialGlyph}><Icon kind="shield"/></span>}
                <div><small>{present(item.issuer) ? item.issuer : "Issuer not supplied"}</small><h4>{item.title}</h4></div>
              </div>
              {present(item.issueDate) ? <p>Issued {formatDate(item.issueDate)}</p> : null}
              {present(item.expiryDate) ? <p>Expiry {formatDate(item.expiryDate)}</p> : null}
              {Array.isArray(item.skillsCovered) && item.skillsCovered.length ? <div className={styles.credentialTags}>{item.skillsCovered.slice(0, 4).map((skill) => <span key={skill}>{skill}</span>)}</div> : null}
              {present(item.credentialUrl) ? <a href={item.credentialUrl} target="_blank" rel="noreferrer">Verify credential <Icon kind="external"/></a> : <span className={styles.notVerified}>Verification link not supplied</span>}
            </article>
          ))}
        </div>
      ) : (
        <div className={styles.emptyShelf}>
          <div className={styles.emptyIllustration} aria-hidden="true">
            <div className={styles.emptyPaper}><span/><span/><span/><i><Icon kind="shield"/></i></div>
            <div className={styles.emptyGlow}/>
          </div>
          <div className={styles.emptyCopy}>
            <span className={styles.emptyKicker}>NO CERTIFICATE RECORDS</span>
            <h4>The shelf is ready when the evidence is.</h4>
            <p>The current portfolio data contains no certificate entries. Rather than display assumed badges, this area will show credentials when their issuer, dates and available verification details are added.</p>
          </div>
        </div>
      )}
    </article>
  );
}

export default function AchievementsShowcase({ items = [] }) {
  const reducedMotion = useReducedMotion();
  const reveal = (delay = 0) => ({
    initial: reducedMotion ? false : { opacity: 0, y: 12 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: .13 },
    transition: { duration: reducedMotion ? 0 : .38, delay: reducedMotion ? 0 : delay },
  });

  return (
    <section className={styles.achievementsSection} id="certifications" aria-labelledby="achievements-heading" tabIndex={-1}>
      <header className={styles.achievementsHeader}>
        <motion.div className={styles.achievementsIntro} {...reveal()}>
          <p className={styles.eyebrow}><span>08</span><i/> ACHIEVEMENTS &amp; CERTIFICATIONS <b/></p>
          <h2 id="achievements-heading">Progress worth<br/><span>proving.</span></h2>
          <p>Academic progress belongs here. Credentials belong here when the issuer and evidence can be checked. No placeholder awards, invented competition placements, or inflated counters.</p>
          <div className={styles.achievementTags}><span>Academic record</span><span>Verifiable credentials</span><span>Evidence first</span></div>
        </motion.div>
        <motion.aside className={styles.academicSpotlight} {...reveal(.06)} aria-label="Academic highlight">
          <div className={styles.spotlightTop}><span><Icon kind="cap"/> ACADEMIC HIGHLIGHT</span><span>01 / RECORD</span></div>
          <div className={styles.spotlightValue}><strong>8.61</strong><span>CGPA</span></div>
          <div className={styles.spotlightRule}><i/></div>
          <p>One academic signal, alongside implementations, experiments and code that can be inspected across the portfolio.</p>
          <div className={styles.spotlightFoot}><span className={styles.spotlightDot}/> <span>Academic record</span></div>
        </motion.aside>
      </header>

      <motion.div {...reveal(.1)}>
        <CredentialShelf items={items}/>
      </motion.div>

      <motion.footer className={styles.achievementFooter} {...reveal(.13)}>
        <span className={styles.footerMark}><Icon kind="book"/></span>
        <div><strong>Specifics matter more than badge counts.</strong><span>When credentials are added, each card supports issuer, issue date, skills and a verification link where available.</span></div>
        <a href="/about">About my background <Icon kind="external"/></a>
      </motion.footer>
    </section>
  );
}
