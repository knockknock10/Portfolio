"use client";

import { useState } from "react";
import Image from "next/image";
import SidebarNavigation from "./SidebarNavigation";
import styles from "./HomeHero.module.css";

const socialMarks = {
  github: "GH",
  linkedin: "in",
  email: "✉",
  mail: "✉",
  resume: "↗",
  cv: "↗",
};

function getSocialLinks(socials, email, resumePath) {
  const links = (socials || [])
    .filter((item) => item && item.url)
    .map((item) => {
      const label = item.platform || "Profile";
      const normalized = label.toLowerCase();
      return {
        label,
        href: item.url,
        mark: Object.entries(socialMarks).find(([key]) => normalized.includes(key))?.[1] || "↗",
      };
    });

  if (email && !links.some((item) => /email|mail/i.test(item.label) || item.href.startsWith("mailto:"))) {
    links.push({ label: "Email", href: "mailto:" + email, mark: "✉" });
  }

  if (resumePath && !links.some((item) => /resume|cv/i.test(item.label))) {
    links.push({ label: "Resume", href: resumePath, mark: "↗" });
  }

  return links.slice(0, 4);
}

export function HomeHero({
  fullName = "Sanjeev Kumar",
  socials = [],
  email = null,
  resumePath = "/resume.pdf",
}) {
  const [portraitSrc, setPortraitSrc] = useState("/images/sanjeev-profile.webp");
  const socialsToShow = getSocialLinks(socials, email, resumePath);

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
          {socialsToShow.map((social) => (
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
            src={portraitSrc}
            alt="Sanjeev Kumar in a black shirt and light trousers"
            fill
            priority
            unoptimized={portraitSrc.startsWith("https://")}
            onError={() => {
              if (!portraitSrc.startsWith("https://")) {
                setPortraitSrc("https://avatars.githubusercontent.com/u/116096166?v=4");
              }
            }}
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
