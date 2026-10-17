"use client";

import styles from "./HomeHero.module.css";


function SocialGlyph({ label }) {
  const name = (label || "").toLowerCase();

  if (name.includes("github")) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path fill="currentColor" d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.03c-3.1.67-3.76-1.31-3.76-1.31-.5-1.28-1.24-1.62-1.24-1.62-1.02-.7.08-.69.08-.69 1.13.08 1.72 1.16 1.72 1.16 1 1.72 2.62 1.22 3.26.94.1-.73.4-1.22.71-1.5-2.48-.28-5.09-1.24-5.09-5.52 0-1.22.44-2.22 1.16-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.05 1.15a10.6 10.6 0 0 1 5.55 0c2.11-1.44 3.05-1.15 3.05-1.15.61 1.54.23 2.68.11 2.96.72.78 1.16 1.78 1.16 3 0 4.29-2.62 5.24-5.11 5.51.4.35.76 1.03.76 2.08v3.08c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" />
      </svg>
    );
  }

  if (name.includes("linkedin")) return <span className={styles.linkedinGlyph} aria-hidden="true">in</span>;
  if (name.includes("leetcode")) return <span className={styles.leetcodeGlyph} aria-hidden="true">〈〉</span>;

  if (name.includes("mail") || name.includes("email")) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="5" width="18" height="14" rx="1.7" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <path d="m4 7 8 6 8-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    );
  }

  if (name.includes("resume") || name.includes("cv")) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6 3.5h8l4 4V21H6z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M14 3.5v4h4M9 12h6M9 15h6M9 18h4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  }

  return <span aria-hidden="true">↗</span>;
}

function buildSocialLinks(socials, email, resumePath) {
  const links = (socials || [])
    .filter((item) => item && item.url)
    .map((item) => ({ label: item.platform || "Profile", href: item.url }));

  if (email && !links.some((item) => /email|mail/i.test(item.label) || item.href.startsWith("mailto:"))) {
    links.push({ label: "Email", href: "mailto:" + email });
  }

  if (resumePath && !links.some((item) => /resume|cv/i.test(item.label))) {
    links.push({ label: "Resume", href: resumePath });
  }

  return links.slice(0, 5);
}

export function HomeHero({
  fullName = "Sanjeev Kumar",
  socials = [],
  email = null,
  resumePath = "/resume.pdf",
  data = null,
}) {
  const links = buildSocialLinks(socials, email, resumePath);
  const githubStats = data?.github || {};
  const publicMetrics = [
    { label: "Public repositories", value: githubStats.totalRepos, icon: "github" },
    { label: "Stars across repositories", value: githubStats.totalStars, icon: "star" },
    { label: "Public forks", value: githubStats.totalForks, icon: "fork" },
  ];
  const nameParts = (fullName || "Sanjeev Kumar").trim().split(/\s+/);
  const firstName = nameParts.shift() || "Sanjeev";
  const lastName = nameParts.join(" ") || "Kumar";



  return (
    <section id="home" className={styles.hero} aria-labelledby="hero-title" tabIndex={-1}>
      <div className={styles.heroVisual} aria-hidden="true" />
      <div className={styles.heroShade} aria-hidden="true" />


      <div className={styles.heroCopy}>
        <p className={styles.heroEyebrow}>CSE <span aria-hidden="true">·</span> SRM UNIVERSITY AP</p>

        <h1 id="hero-title" className={styles.heroTitle}>
          <span>{firstName}</span>
          <span className={styles.heroTitleSecond}>
            <span>{lastName}</span>
            <span className={styles.signature} aria-hidden="true">Sanjeev</span>
          </span>
        </h1>

        <p className={styles.heroBio}>
          I’m a computer science student who enjoys building backend systems, contributing to
          open source, and exploring audio watermarking and applied AI.
        </p>

        <div className={styles.heroActions}>
          <a className={styles.primaryAction} href="#work">View my work <span aria-hidden="true">→</span></a>
          <a className={styles.secondaryAction} href="#contact">Get in touch <span aria-hidden="true">→</span></a>
        </div>

        <nav className={styles.socialLinks} aria-label="Social profiles">
          {links.map((item) => (
            <a
              key={item.label}
              className={styles.socialLink}
              href={item.href}
              aria-label={item.label}
              title={item.label}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel={item.href.startsWith("http") ? "noreferrer" : undefined}
            >
              <SocialGlyph label={item.label} />
            </a>
          ))}
        </nav>
      </div>

      <aside className={styles.rightCards} aria-label="Current focus">
        <div className={styles.quoteCard}>
          <span className={styles.quoteMark} aria-hidden="true">”</span>
          <p>“Interesting problems lead to better engineers.”</p>
          <span className={styles.quoteRule} aria-hidden="true" />
        </div>
        <a className={styles.currentCard} href="#research">
          <span className={styles.currentDot} aria-hidden="true" />
          <span className={styles.currentCopy}>
            <span>Currently working on</span>
            <strong>SemBind-Audio</strong>
          </span>
          <span className={styles.currentArrow} aria-hidden="true">→</span>
        </a>
      </aside>

      <div className={styles.statsBar} aria-label="Public GitHub repository snapshot">
        {publicMetrics.map((metric) => (
          <a className={styles.statItem} href="#open-source" key={metric.label} title="Saved public profile snapshot · 10 Oct 2026">
            {metric.icon === "github" ? <SocialGlyph label="GitHub" /> : metric.icon === "star" ? (
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 2.8 2.8 5.7 6.3.9-4.55 4.45 1.07 6.28L12 17.2l-5.62 2.95 1.07-6.28L2.9 9.4l6.3-.9z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/></svg>
            ) : (
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 4v10m0-10a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM6 14l8-5m0-5v5m0-5a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 5v8m0-8a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
            <strong>{typeof metric.value === "number" ? metric.value.toLocaleString("en-US") : "—"}</strong>
            <span>{metric.label}</span>
          </a>
        ))}
      </div>

      <a className={styles.scrollCue} href="#work" aria-label="Scroll down to selected work">
        <span className={styles.scrollCueIcon} aria-hidden="true">↓</span>
        <span>SCROLL DOWN</span>
      </a>
    </section>
  );
}
