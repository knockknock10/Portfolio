"use client";

import { motion, useReducedMotion } from "framer-motion";
import styles from "./ExperienceShowcase.module.css";

function hasValue(value) {
  return typeof value === "string" && value.trim() !== "" && value !== "MISSING";
}

function ExternalMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M13 5h6v6m0-6-9 9" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18 13v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function KnowledgeGraphMark() {
  return (
    <svg viewBox="0 0 170 118" fill="none" aria-hidden="true">
      <path d="M24 30 78 18 126 42 93 91 35 82 24 30ZM78 18 93 91M24 30 126 42M35 82 126 42" stroke="currentColor" strokeOpacity=".38" strokeWidth="1.1" strokeDasharray="3 4" />
      <circle cx="24" cy="30" r="5.5" fill="#f7c48f"/><circle cx="78" cy="18" r="5.5" fill="#8ba6ff"/><circle cx="126" cy="42" r="7" fill="#6edac0"/><circle cx="93" cy="91" r="5.5" fill="#b7a0ff"/><circle cx="35" cy="82" r="5.5" fill="#ffab9e"/>
      <circle cx="24" cy="30" r="10" stroke="#f7c48f" strokeOpacity=".28"/><circle cx="126" cy="42" r="13" stroke="#6edac0" strokeOpacity=".25"/>
    </svg>
  );
}

function WaveMark() {
  const bars = [7, 13, 23, 14, 30, 19, 10, 25, 16, 32, 12, 20, 9, 17, 28, 11, 22, 8, 15, 25, 12, 18, 7, 14];
  return (
    <svg viewBox="0 0 192 42" fill="none" aria-hidden="true">
      {bars.map((height, index) => <rect key={index} x={index * 7 + 3} y={(42 - height) / 2} width="3.5" height={height} rx="1.75" fill="currentColor" opacity={0.34 + (height / 32) * 0.66} />)}
      <path d="M0 21H192" stroke="currentColor" strokeOpacity=".22" strokeWidth=".8" />
    </svg>
  );
}

export default function ExperienceShowcase({ researchItems = [], internships = [] }) {
  const reducedMotion = useReducedMotion();
  const semBind = researchItems.find((item) => item.title?.toLowerCase().includes("sembind"));
  const nanoSensor = researchItems.find((item) => /nano.?sensor/i.test(item.title || ""));
  const motionProps = (delay = 0, y = 14) => ({
    initial: reducedMotion ? false : { opacity: 0, y },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.14 },
    transition: reducedMotion ? { duration: 0 } : { duration: 0.48, delay, ease: [0.22, 1, 0.36, 1] },
  });

  const internshipEntries = (Array.isArray(internships) ? internships : [])
    .filter((item) => hasValue(item.company) && hasValue(item.role))
    .map((item) => ({
      key: "job-" + item.company + "-" + item.role,
      period: [item.startDate, item.endDate].filter(hasValue).join(" — ") || "DATES NOT LISTED",
      kind: "PROFESSIONAL EXPERIENCE",
      title: item.role + " · " + item.company,
      description: hasValue(item.summary) ? item.summary : "Role details supplied in the portfolio data.",
      tags: Array.isArray(item.stack) ? item.stack : [],
      status: "Verified profile entry",
      tone: "employment",
      links: hasValue(item.link) ? [{ label: "Role details", href: item.link }] : [],
    }));

  const timeline = [
    {
      key: "knowledge-graph",
      period: "OCT 2026 — NOW",
      kind: "CURRENT RESEARCH DIRECTION",
      title: "Causal-temporal audio knowledge graphs",
      description: "Exploring how audio events can be represented over time and connected to causal environmental reasoning for non-visual situational intelligence and hazard prediction.",
      tags: ["Temporal knowledge graphs", "Audio events", "Causal reasoning", "GraphRAG", "LLMs"],
      status: "Exploring",
      tone: "graph",
      visual: "graph",
      links: [],
    },
    {
      key: "sembind",
      period: "JUN 2025 — SEP 2026",
      kind: "FIRST-AUTHOR RESEARCH",
      title: "SemBind-Audio",
      description: "A reference-based speech-watermarking study comparing semantic contribution and spectral suitability for embedding placement across LibriSpeech test-clean. The manuscript was submitted to IEEE Signal Processing Letters; the work also records where joint placement did not beat spectral-only placement.",
      tags: ["HuBERT", "STFT", "Speech watermarking", "LibriSpeech", "SHA-256"],
      status: "Submitted manuscript",
      tone: "research",
      visual: "wave",
      featured: true,
      links: [
        ...(hasValue(semBind?.pdf) ? [{ label: "Read paper", href: semBind.pdf }] : []),
        ...(hasValue(semBind?.link) ? [{ label: "Source repository", href: semBind.link, external: true }] : []),
      ],
    },
    {
      key: "nanosensor",
      period: "JAN — MAY 2025",
      kind: "RESEARCH PROJECT",
      title: nanoSensor?.title || "Nano Sensor Project",
      description: "Worked on nano-sensor network communication and environmental monitoring, exploring routing, packet propagation, and real-time event detection in a resource-constrained setting.",
      tags: ["MATLAB", "Sensor networks", "Routing", "Packet propagation"],
      status: "Completed project",
      tone: "sensor",
      visual: "sensor",
      links: [],
    },
    {
      key: "open-source",
      period: "2024 — NOW",
      kind: "UPSTREAM ENGINEERING",
      title: "Open-source contributions across real codebases",
      description: "Work across Kestra, Apache Camel K, Wanaku AI and Ansvisor has included plugin functionality, trigger support, integration tests, network-policy test cases, and review-driven fixes.",
      tags: ["Kestra", "Apache Camel K", "Wanaku AI", "Ansvisor", "Tests & review"],
      status: "Ongoing",
      tone: "opensource",
      visual: "source",
      links: [{ label: "Contribution record", href: "#open-source" }],
    },
    ...internshipEntries,
  ];

  return (
    <section className={styles.section} id="internships" aria-labelledby="experience-heading" tabIndex={-1}>
      <div className={styles.experienceShell}>
        <header className={styles.experienceHeader}>
          <motion.div className={styles.headingCopy} {...motionProps(0, 18)}>
            <p className={styles.eyebrow}><span>05</span><i aria-hidden="true" /> EXPERIENCE / FIELD LOG <b aria-hidden="true" /></p>
            <h2 id="experience-heading">Experience, in<br /><span>the work.</span></h2>
            <p className={styles.lede}>A record of research, upstream engineering and technical builds that can be inspected. The story is told through the work itself—not inflated job titles or invented impact numbers.</p>
            <div className={styles.focusTags} aria-label="Experience categories">
              <span>Research</span><span>Open source</span><span>Systems</span>
            </div>
          </motion.div>

          <motion.aside className={styles.fieldNote} {...motionProps(.08, 12)} aria-label="Engineering evidence">
            <div className={styles.fieldNoteTop}><span><i /><i /><i /></span><span>ENGINEERING LOG / 05</span></div>
            <div className={styles.fieldNoteVisual}><KnowledgeGraphMark /></div>
            <p className={styles.fieldNoteKicker}>THREE CONNECTED THREADS</p>
            <div className={styles.threadRows}>
              <div><span className={styles.threadMark} data-tone="research" /><span><strong>Research</strong><small>Experiment · measure · explain limits</small></span></div>
              <div><span className={styles.threadMark} data-tone="opensource" /><span><strong>Open source</strong><small>Implement · test · respond to review</small></span></div>
              <div><span className={styles.threadMark} data-tone="systems" /><span><strong>Systems</strong><small>Build something another engineer can inspect</small></span></div>
            </div>
          </motion.aside>
        </header>

        <div className={styles.timelineHeader}>
          <div><span className={styles.liveDot} /><span>RESEARCH &amp; ENGINEERING TIMELINE</span></div>
          <span>{String(timeline.length).padStart(2, "0")} ENTRIES</span>
        </div>

        <ol className={styles.timeline}>
          {timeline.map((item, index) => (
            <motion.li
              key={item.key}
              className={item.featured ? styles.timelineItemFeatured : styles.timelineItem}
              data-tone={item.tone}
              {...motionProps(Math.min(index * .045, .16), 12)}
            >
              <div className={styles.timelineDate}><span>{item.period}</span><i aria-hidden="true" /></div>
              <div className={styles.timelineRail} aria-hidden="true"><span /></div>
              <article className={styles.timelineBody}>
                <div className={styles.timelineMeta}><span>{item.kind}</span><span className={styles.status} data-tone={item.tone}>{item.status}</span></div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <div className={styles.timelineBottom}>
                  <div className={styles.timelineTags}>{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                  {item.visual === "graph" ? <div className={styles.timelineVisual} data-visual="graph"><KnowledgeGraphMark /></div> : null}
                  {item.visual === "wave" ? <div className={styles.timelineVisual} data-visual="wave"><WaveMark /></div> : null}
                  {item.visual === "sensor" ? <div className={styles.sensorGraphic} aria-hidden="true"><span /><span /><span /><i /></div> : null}
                  {item.links.length ? <div className={styles.timelineLinks}>{item.links.map((link) => <a key={link.label} href={link.href} target={link.external || link.href.startsWith("http") ? "_blank" : undefined} rel={link.external || link.href.startsWith("http") ? "noreferrer" : undefined}>{link.label}<ExternalMark /></a>)}</div> : null}
                </div>
              </article>
            </motion.li>
          ))}
        </ol>

        <motion.footer className={styles.evidenceFooter} {...motionProps(.08, 8)}>
          <span className={styles.evidenceSeal} aria-hidden="true">↗</span>
          <div><strong>For a placement reviewer</strong><p>Start with the source-linked projects, inspect the research methodology, then follow the upstream work. Each section answers a different question; no dashboard repeats the same counters.</p></div>
          <a href="#work">Explore selected work <ExternalMark /></a>
        </motion.footer>
      </div>
    </section>
  );
}
