"use client";

import Image from "next/image";
import SidebarNavigation from "./SidebarNavigation";
import styles from "./HomeHero.module.css";

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/knockknock10",
    mark: "GH",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/-sanjeev-kr",
    mark: "in",
  },
  {
    label: "Email",
    href: "mailto:Sanjeev.kr10111@gmail.com",
    mark: "✉",
  },
  {
    label: "Resume",
    href: "/resume.pdf",
    mark: "↗",
  },
];

export function HomeHero({ content }) {
  const fullName =
    content?.identity?.professionalName ||
    content?.identity?.fullName ||
    "Sanjeev Kumar";

  return (
    <section id="home" className={styles.hero} aria-labelledby="hero-title" tabIndex={-1}>
      <SidebarNavigation />

      <div className={styles.heroAtmosphere} aria-hidden="true">
        <span className={styles.atmosphereOrb} />
        <span className={styles.atmosphereRule} />
      </div>

      <div className={styles.heroCopy}>
        <p className={styles.heroEyebrow}>
          <span className={styles.eyebrowDot} />
          CSE <span aria-hidden="true">·</span> SRM UNIVERSITY AP
        </p>

        <h1 id="hero-title" className={styles.heroTitle}>
          <span>Sanjeev</span>
          <span className={styles.heroTitleAccent}>Kumar</span>
        </h1>

        <p className={styles.heroBio}>
          I’m a computer science student at SRM University AP. Most of my work sits across
          backend engineering, open-source contributions, and applied AI research.
        </p>

        <div className={styles.heroActions}>
          <a className={styles.primaryAction} href="#work">
            View my work
            <span aria-hidden="true">↗</span>
          </a>
          <a className={styles.secondaryAction} href="#contact">
            Get in touch
            <span aria-hidden="true">→</span>
          </a>
        </div>

        <nav className={styles.socialLinks} aria-label="Contact and profiles">
          {socials.map((social) => (
            <a
              className={styles.socialLink}
              key={social.label}
              href={social.href}
              aria-label={social.label}
              target={social.href.startsWith("http") ? "_blank" : undefined}
              rel={social.href.startsWith("http") ? "noreferrer" : undefined}
            >
              <span aria-hidden="true">{social.mark}</span>
            </a>
          ))}
        </nav>

        <div className={styles.heroFocusLine}>
          <span className={styles.focusLine} aria-hidden="true" />
          <p>BACKEND <span>·</span> OPEN SOURCE <span>·</span> AUDIO & KNOWLEDGE SYSTEMS</p>
        </div>
      </div>

      <div className={styles.portraitStage} aria-label="Portrait of Sanjeev Kumar">
        <div className={styles.portraitFrame}>
          <Image
            src="/images/sanjeev-profile.webp"
            alt="Sanjeev Kumar in a black overshirt and white trousers"
            fill
            priority
            sizes="(max-width: 760px) 100vw, 62vw"
            className={styles.portraitImage}
          />
          <div className={styles.portraitWash} aria-hidden="true" />
        </div>

        <div className={styles.portraitTopLabel}>
          <span>PERSONAL PORTFOLIO</span>
          <span>2026 <i aria-hidden="true">↗</i></span>
        </div>

        <div className={styles.portraitIdentity}>
          <div className={styles.portraitIdentityMark}>SK</div>
          <div>
            <strong>{fullName}</strong>
            <span>B.Tech · Computer Science</span>
            <span>SRM University AP</span>
          </div>
          <span className={styles.portraitIdentityArrow} aria-hidden="true">↗</span>
        </div>

        <div className={styles.portraitSideNote} aria-hidden="true">
          <span>BUILD</span>
          <span>CONTRIBUTE</span>
          <span>RESEARCH</span>
        </div>
      </div>

      <a className={styles.scrollCue} href="#work" aria-label="Scroll to selected work">
        <span className={styles.scrollMouse} aria-hidden="true"><i /></span>
        <span>SCROLL TO EXPLORE</span>
        <span className={styles.scrollArrow} aria-hidden="true">↓</span>
      </a>
    </section>
  );
}
