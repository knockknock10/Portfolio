"use client";

import { motion, useReducedMotion } from "framer-motion";
import styles from "./ExperienceShowcase.module.css";

const process = [
  {
    number: "01",
    title: "Understand the failure mode",
    detail: "Reproduce the current behaviour, read the surrounding code and clarify the constraint before changing the implementation.",
    label: "Frame the problem",
    tone: "blue",
  },
  {
    number: "02",
    title: "Make the smallest complete change",
    detail: "Keep the responsibility clear, preserve existing contracts and avoid introducing abstractions before they earn their place.",
    label: "Implement with intent",
    tone: "violet",
  },
  {
    number: "03",
    title: "Prove the behaviour",
    detail: "Use focused regression tests, local checks and realistic edge cases so the result is more than a change that merely compiles.",
    label: "Validate the result",
    tone: "green",
  },
  {
    number: "04",
    title: "Close the review loop",
    detail: "Respond to review feedback, explain trade-offs, refine the patch and leave enough context for the next maintainer.",
    label: "Review and document",
    tone: "amber",
  },
];

const qualityChecks = [
  { title: "Behaviour before refactor", detail: "Capture what should remain true.", mark: "01" },
  { title: "Tests before confidence", detail: "Verify the path and its edge cases.", mark: "02" },
  { title: "Context before handoff", detail: "Make decisions and limitations legible.", mark: "03" },
];

export default function ExperienceShowcase() {
  const reducedMotion = useReducedMotion();
  const transition = reducedMotion ? { duration: 0 } : { duration: 0.42, ease: [0.22, 1, 0.36, 1] };

  return (
    <section className={styles.section} id="internships" aria-labelledby="experience-heading" tabIndex={-1}>
      <header className={styles.sectionHeader}>
        <motion.div className={styles.headingCopy} initial={reducedMotion ? false : { opacity: 0, y: 13 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.18 }} transition={transition}>
          <p className={styles.eyebrow}><span>05</span><i /> EXPERIENCE <b /></p>
          <h2 id="experience-heading">The work behind<br />the <span>result.</span></h2>
          <p className={styles.lede}>Experience is more than a list of titles. It is the habit of tracing a problem, making a change that fits the system, and proving the result holds up.</p>
        </motion.div>
        <motion.aside className={styles.practiceCard} initial={reducedMotion ? false : { opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.18 }} transition={reducedMotion ? { duration: 0 } : { ...transition, delay: 0.08 }}>
          <div className={styles.practiceTop}><span className={styles.windowDots}><i /><i /><i /></span><span>ENGINEERING LOOP</span><span>4 STEPS</span></div>
          <div className={styles.loopDiagram}>
            {process.map((item, index) => <div className={styles.loopNode} data-tone={item.tone} key={item.number}><span>{item.number}</span><strong>{index === 0 ? "Trace" : index === 1 ? "Build" : index === 2 ? "Verify" : "Review"}</strong></div>)}
          </div>
          <div className={styles.practiceFoot}><span className={styles.footPulse} />Repeat until the change is clear and verifiable.</div>
        </motion.aside>
      </header>

      <div className={styles.experienceGrid}>
        <div className={styles.processPanel}>
          <header className={styles.panelHeading}><div><p>THE APPROACH</p><h3>From problem to dependable change</h3></div><span>01 — 04</span></header>
          <ol className={styles.processList}>
            {process.map((item, index) => (
              <motion.li key={item.number} data-tone={item.tone} initial={reducedMotion ? false : { opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.18 }} transition={reducedMotion ? { duration: 0 } : { duration: 0.35, delay: index * 0.045 }}>
                <span className={styles.processNumber}>{item.number}</span>
                <span className={styles.processCopy}><small>{item.label}</small><strong>{item.title}</strong><em>{item.detail}</em></span>
                <span className={styles.processArrow} aria-hidden="true">↗</span>
              </motion.li>
            ))}
          </ol>
        </div>

        <aside className={styles.qualityPanel}>
          <div className={styles.qualityEyebrow}><span><i /><i /><i /></span><small>QUALITY / BASELINE</small></div>
          <h3>“Done” should be something another person can verify.</h3>
          <p className={styles.qualityIntro}>A short checklist keeps the work honest, especially when the codebase is unfamiliar or a change crosses several boundaries.</p>
          <div className={styles.qualityChecks}>
            {qualityChecks.map((item) => (
              <div className={styles.qualityCheck} key={item.mark}>
                <span>{item.mark}</span><div><strong>{item.title}</strong><small>{item.detail}</small></div><span className={styles.checkMark} aria-hidden="true">✓</span>
              </div>
            ))}
          </div>
          <div className={styles.qualityFooter}><span>TRACE</span><i /><span>TEST</span><i /><span>REVIEW</span></div>
        </aside>
      </div>
    </section>
  );
}
