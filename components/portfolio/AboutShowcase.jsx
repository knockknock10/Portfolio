"use client";

import { motion, useReducedMotion } from "framer-motion";
import styles from "./AboutShowcase.module.css";

const principles = [
  { number: "01", title: "Understand before adding", detail: "Start with the existing behaviour, constraints and the smallest useful change.", tone: "blue" },
  { number: "02", title: "Make claims testable", detail: "Use reproducible checks, explicit trade-offs and evidence that another engineer can inspect.", tone: "violet" },
  { number: "03", title: "Leave the trail clearer", detail: "Good implementation includes readable code, focused tests and context for the next person.", tone: "amber" },
];

export default function AboutShowcase({ content, standalone = false }) {
  const reducedMotion = useReducedMotion();
  const name = content?.identity?.professionalName || content?.identity?.fullName || "Sanjeev Kumar";
  const biography = [content?.identity?.shortBio, content?.identity?.longBio]
    .filter((value) => typeof value === "string" && value.trim().length > 0);
  const transition = reducedMotion ? { duration: 0 } : { duration: 0.42, ease: [0.22, 1, 0.36, 1] };

  return (
    <section id={standalone ? undefined : "about"} className={styles.section} data-standalone={standalone ? "true" : "false"} aria-labelledby="about-heading" tabIndex={-1}>
      <header className={styles.sectionHeader}>
        <motion.div className={styles.headingCopy} initial={reducedMotion ? false : { opacity: 0, y: 13 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.18 }} transition={transition}>
          <p className={styles.eyebrow}><span>09</span><i /> ABOUT <b /></p>
          <h2 id="about-heading">Curiosity, turned into <span>systems.</span></h2>
          <p className={styles.intro}>I’m {name}, a computer science student who learns by building, contributing and testing ideas against real constraints.</p>
          {biography.length ? biography.slice(0, 2).map((paragraph, index) => <p className={styles.bio} key={index}>{paragraph}</p>) : <p className={styles.bio}>I work across software engineering, open-source contribution and applied AI research, with a preference for practical implementations and clearly explained trade-offs.</p>}
        </motion.div>

        <motion.aside className={styles.portraitPanel} initial={reducedMotion ? false : { opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.18 }} transition={reducedMotion ? { duration: 0 } : { ...transition, delay: 0.07 }}>
          <div className={styles.portraitPhoto}><img src="/images/sanjeev-profile.webp" alt={name} loading="lazy" /></div>
          <div className={styles.portraitOverlay} aria-hidden="true" />
          <div className={styles.portraitLabel}><span>WORKING NOTES / 2026</span><strong>Build with curiosity.<br />Contribute with care.</strong></div>
          <div className={styles.portraitIndex}>SK <i /> CS / ENGINEERING</div>
        </motion.aside>
      </header>

      <div className={styles.principlesHeader}>
        <div><p className={styles.subEyebrow}>HOW I APPROACH THE WORK</p><h3>Principles over buzzwords.</h3></div>
        <p>These are the habits I try to carry between a project, a research experiment and an upstream pull request.</p>
      </div>
      <div className={styles.principlesGrid}>
        {principles.map((item, index) => (
          <motion.article className={styles.principleCard} data-tone={item.tone} key={item.number} initial={reducedMotion ? false : { opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.16 }} transition={reducedMotion ? { duration: 0 } : { ...transition, delay: index * 0.06 }}>
            <span className={styles.principleNumber}>{item.number}</span>
            <span className={styles.principleMark} aria-hidden="true">{index === 0 ? "⌘" : index === 1 ? "↗" : "◇"}</span>
            <h4>{item.title}</h4>
            <p>{item.detail}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
