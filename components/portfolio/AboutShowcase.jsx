"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import styles from "./AboutShowcase.module.css";

function Icon({ kind }) {
  const shared = { fill: "none", stroke: "currentColor", strokeWidth: 1.75, strokeLinecap: "round", strokeLinejoin: "round" };
  if (kind === "cap") return <svg viewBox="0 0 24 24" {...shared}><path d="m2 9 10-5 10 5-10 5z"/><path d="M6 11v5c3.7 3 8.3 3 12 0v-5M22 9v6"/></svg>;
  if (kind === "pin") return <svg viewBox="0 0 24 24" {...shared}><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></svg>;
  if (kind === "chart") return <svg viewBox="0 0 24 24" {...shared}><path d="M4 20V10m5 10V4m5 16v-7m5 7V7"/></svg>;
  if (kind === "brain") return <svg viewBox="0 0 24 24" {...shared}><path d="M12 5a4 4 0 0 0-7 2.5A4 4 0 0 0 4 15a4 4 0 0 0 4 5h4zm0 0a4 4 0 0 1 7 2.5A4 4 0 0 1 20 15a4 4 0 0 1-4 5h-4M8 9v6m8-6v6M8 12h4m4 0h-4"/></svg>;
  if (kind === "book") return <svg viewBox="0 0 24 24" {...shared}><path d="M4 5.5A3.5 3.5 0 0 1 7.5 2H20v17H7.5A3.5 3.5 0 0 0 4 22zM4 5.5V22m4-15h8m-8 4h7"/></svg>;
  if (kind === "users") return <svg viewBox="0 0 24 24" {...shared}><circle cx="9" cy="8" r="3"/><path d="M3 20v-2a6 6 0 0 1 12 0v2M17 5a3 3 0 0 1 0 6m1 3a4 4 0 0 1 3 4v2"/></svg>;
  if (kind === "cloud") return <svg viewBox="0 0 24 24" {...shared}><path d="M6 18a4 4 0 0 1-.3-8A6 6 0 0 1 17 8a5 5 0 0 1 1 10Z"/><path d="M12 11v7m-3-3 3 3 3-3"/></svg>;
  if (kind === "target") return <svg viewBox="0 0 24 24" {...shared}><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/><path d="m12 12 7-7m-3 0h3v3"/></svg>;
  if (kind === "audio") return <svg viewBox="0 0 24 24" {...shared}><path d="M3 12h2l2-5 3 10 3-14 3 13 2-4h3"/></svg>;
  return <svg viewBox="0 0 24 24" {...shared}><path d="M12 3 3 8l9 5 9-5-9-5Zm-9 10 9 5 9-5M3 18l9 5 9-5"/></svg>;
}

const interests = [
  { icon: "audio", title: "Audio AI & signals", detail: "Representations, watermarking and signal-level evaluation", href: "#research", tone: "violet" },
  { icon: "brain", title: "Knowledge graphs", detail: "Temporal context, causal questions and retrieval", href: "#research", tone: "blue" },
  { icon: "cloud", title: "Backend & platforms", detail: "APIs, databases, infrastructure and service boundaries", href: "#work", tone: "mint" },
  { icon: "book", title: "Technical reading", detail: "Research papers, documentation and implementation details", href: "#research", tone: "amber" },
];

const focusAreas = [
  { icon: "target", title: "Causal-temporal audio knowledge graphs", detail: "Non-visual situational intelligence", href: "#research", tone: "violet" },
  { icon: "audio", title: "SemBind-Audio", detail: "Reference-based speech watermarking", href: "#research", tone: "blue" },
  { icon: "users", title: "Open-source development", detail: "Tests, fixes and upstream reviews", href: "#open-source", tone: "mint" },
  { icon: "cloud", title: "Cloud & DevOps", detail: "Deploying and operating useful systems", href: "#skills", tone: "amber" },
];

function PhotoCard({ name }) {
  const [imageFailed, setImageFailed] = useState(false);
  const initials = (name || "Sanjeev Kumar").split(/\s+/).map(part => part[0]).join("").slice(0, 2).toUpperCase();

  return (
    <div className={styles.photoCard}>
      <div className={styles.photoTopline}><span>PROFILE / 2026</span><span>SRM UNIVERSITY AP</span></div>
      <div className={styles.photoStage}>
        <div className={styles.photoGlow} aria-hidden="true"/>
        {!imageFailed ? (
          <img className={styles.portraitImage} src="/images/sanjeev-portrait.png" alt={"Portrait of " + name} loading="lazy" onError={() => setImageFailed(true)}/>
        ) : (
          <div className={styles.portraitPlaceholder} aria-label="Portrait image placeholder">
            <span>{initials}</span>
            <small>PORTRAIT IMAGE SLOT</small>
          </div>
        )}
        <div className={styles.photoIdentity}><strong>{name}</strong><span>B.Tech Computer Science</span><span>SRM University AP</span></div>
        <div className={styles.photoScribble} aria-hidden="true">Build<br/>Learn<br/>Contribute<br/><em>Create impact.</em></div>
        <div className={styles.photoIndex}><span>08</span><span>ABOUT</span></div>
      </div>
      <div className={styles.photoBottomline}><span><i/> Curious by default</span><span>AMARAVATI · INDIA</span></div>
    </div>
  );
}

function FocusCard({ item }) {
  return (
    <a className={styles.focusItem} data-tone={item.tone} href={item.href}>
      <span className={styles.focusIcon}><Icon kind={item.icon}/></span>
      <span className={styles.focusCopy}><strong>{item.title}</strong><small>{item.detail}</small></span>
      <span className={styles.focusArrow} aria-hidden="true">↗</span>
    </a>
  );
}

export default function AboutShowcase({ content }) {
  const reducedMotion = useReducedMotion();
  const identity = content?.identity || {};
  const fullName = identity.professionalName || identity.fullName || "Sanjeev Kumar";
  const motionProps = (delay = 0) => ({
    initial: reducedMotion ? false : { opacity: 0, y: 10 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: .14 },
    transition: { duration: reducedMotion ? 0 : .35, delay: reducedMotion ? 0 : delay },
  });

  return (
    <section className={styles.aboutSection} id="about" aria-labelledby="about-heading" tabIndex={-1}>
      <div className={styles.aboutLayout}>
        <motion.div className={styles.aboutLeft} {...motionProps()}>
          <p className={styles.aboutEyebrow}><span>09</span><i/> ABOUT ME <b/></p>
          <h2 id="about-heading">Building impact with <span>technology.</span></h2>
          <p className={styles.aboutIntro}>I’m {fullName}, a Computer Science undergraduate at SRM University AP. I’m drawn to the parts where software becomes a system: service boundaries, reliable infrastructure, data, and the trade-offs behind a feature.</p>
          <p className={styles.aboutBody}>Alongside building products such as Aevor, CommitHub and Wandera, I contribute to upstream repositories and explore research questions in audio watermarking and causal-temporal knowledge graphs. I try to make implementations inspectable and claims measurable.</p>
          <div className={styles.aboutTags}><span>Builder</span><span>Research in progress</span><span>Open-source contributor</span><span>Systems learner</span></div>

          <article className={styles.educationCard}>
            <div className={styles.educationHeader}><span className={styles.educationIcon}><Icon kind="cap"/></span><h3>Education</h3><span className={styles.currentPill}>Current</span></div>
            <h4>B.Tech in Computer Science and Engineering</h4>
            <p>SRM University AP · Amaravati</p>
            <div className={styles.educationFooter}><span>2024—2028</span><span>Currently in 3rd year</span></div>
          </article>


        </motion.div>

        <motion.div className={styles.aboutCenter} {...motionProps(.04)}>
          <PhotoCard name={fullName}/>
          <article className={styles.interestsCard}>
            <div className={styles.interestsHeader}><span><Icon kind="book"/></span><h3>Interests beyond the editor</h3><small>FIELD NOTES</small></div>
            <div className={styles.interestsGrid}>
              {interests.map((item) => (
                <a className={styles.interestItem} data-tone={item.tone} href={item.href} key={item.title}>
                  <span><Icon kind={item.icon}/></span><div><strong>{item.title}</strong><small>{item.detail}</small></div>
                </a>
              ))}
            </div>
          </article>
        </motion.div>

        <motion.div className={styles.aboutRight} {...motionProps(.08)}>
          <article className={styles.journeyCard}>
            <span className={styles.journeyIcon}><Icon kind="target"/></span>
            <div><p className={styles.cardEyebrow}>MY JOURNEY</p><h3>From curious student to systems builder.</h3><p>I learn by taking ideas apart, implementing the hard parts, reading what failed, and improving the result. Research and open source give me a way to test those ideas against evidence and real code.</p></div>
          </article>

          <article className={styles.valuesCard}>
            <div className={styles.valuesHeader}><h3>What drives me</h3><span>CORE PRINCIPLES</span></div>
            <div className={styles.valuesGrid}>
              <div><span><Icon kind="target"/></span><strong>Useful systems</strong><small>Solve a real problem</small></div>
              <div><span><Icon kind="book"/></span><strong>Continuous learning</strong><small>Understand the why</small></div>
              <div><span><Icon kind="users"/></span><strong>Open source</strong><small>Improve work together</small></div>
              <div><span><Icon kind="brain"/></span><strong>Evidence-led research</strong><small>Measure, then claim</small></div>
            </div>
            <div className={styles.principleQuote}><span>“</span><p>Make the implementation inspectable. Make the claim measurable.</p><small>A working principle</small></div>
          </article>

          <article className={styles.exploringCard}>
            <div className={styles.exploringHeader}><span><Icon kind="brain"/></span><h3>Currently exploring</h3><small>IN PROGRESS</small></div>
            <div className={styles.focusList}>
              {focusAreas.map((item,index)=><FocusCard key={item.title} item={item} index={index}/>)}
            </div>
          </article>
        </motion.div>
      </div>

      <div className={styles.aboutValuesStrip}>
        {[
          ["◇","Build","Interesting projects"],
          ["▤","Learn","New technologies"],
          ["⌘","Contribute","To open source"],
          ["↗","Grow","As a researcher"],
          ["♡","Create impact","Real-world systems"],
        ].map(([icon,title,detail],index)=>(
          <motion.div key={title} {...motionProps(index*.025)}><span>{icon}</span><div><strong>{title}</strong><small>{detail}</small></div></motion.div>
        ))}
      </div>
    </section>
  );
}
