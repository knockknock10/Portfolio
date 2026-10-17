"use client";

import { useState, type FormEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { SocialLink } from "@/lib/content";
import styles from "./Contact.module.css";

type ContactProps = {
  email: string | null;
  socials: SocialLink[] | null;
  availabilityNote: string | null;
  headingLevel?: "h1" | "h2";
  asMain?: boolean;
};

function Glyph({ kind }: { kind: "mail" | "github" | "linkedin" | "web" | "spark" | "clock" | "message" | "arrow" }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (kind === "mail") return <svg viewBox="0 0 24 24" {...common}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></svg>;
  if (kind === "github") return <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.03c-3.1.67-3.76-1.31-3.76-1.31-.5-1.28-1.24-1.62-1.24-1.62-1.02-.7.08-.69.08-.69 1.13.08 1.72 1.16 1.72 1.16 1 1.72 2.62 1.22 3.26.94.1-.73.4-1.22.71-1.5-2.48-.28-5.09-1.24-5.09-5.52 0-1.22.44-2.22 1.16-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.05 1.15a10.6 10.6 0 0 1 5.55 0c2.11-1.44 3.05-1.15 3.05-1.15.61 1.54.23 2.68.11 2.96.72.78 1.16 1.78 1.16 3 0 4.29-2.62 5.24-5.11 5.51.4.35.76 1.03.76 2.08v3.08c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z"/></svg>;
  if (kind === "linkedin") return <span className={styles.linkedinMark}>in</span>;
  if (kind === "web") return <svg viewBox="0 0 24 24" {...common}><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></svg>;
  if (kind === "clock") return <svg viewBox="0 0 24 24" {...common}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>;
  if (kind === "message") return <svg viewBox="0 0 24 24" {...common}><path d="M20 11.5a7.5 7.5 0 0 1-7.5 7.5H7l-4 2 1.3-4.1A7.5 7.5 0 1 1 20 11.5Z"/><path d="M8 10h8M8 13h5"/></svg>;
  if (kind === "arrow") return <svg viewBox="0 0 24 24" {...common}><path d="M5 12h13m-5-5 5 5-5 5"/></svg>;
  return <svg viewBox="0 0 24 24" {...common}><path d="m12 3 1.6 5.4L19 10l-5.4 1.6L12 17l-1.6-5.4L5 10l5.4-1.6zM19 16l.7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7z"/></svg>;
}

function linkIcon(platform: string): "github" | "linkedin" | "web" {
  const label = platform.toLowerCase();
  if (label.includes("github")) return "github";
  if (label.includes("linkedin")) return "linkedin";
  return "web";
}

const topics = [
  { title: "Applied AI & audio", note: "Research and signal processing", tone: "blue" },
  { title: "Backend systems", note: "APIs, data and service boundaries", tone: "violet" },
  { title: "Open source", note: "Upstream contributions and reviews", tone: "green" },
  { title: "Research collaboration", note: "Experiments with clear evidence", tone: "amber" },
  { title: "Developer tooling", note: "Useful workflows and automation", tone: "blue" },
  { title: "Internships", note: "Software engineering opportunities", tone: "violet" },
  { title: "System design", note: "Trade-offs, reliability and scale", tone: "amber" },
  { title: "New ideas", note: "A thoughtful technical conversation", tone: "green" },
];

export function Contact({ email, socials, availabilityNote, headingLevel = "h2", asMain = false }: ContactProps) {
  const Heading = headingLevel;
  const Container = asMain ? "main" : "section";
  const reducedMotion = useReducedMotion();
  const [name, setName] = useState("");
  const [replyEmail, setReplyEmail] = useState("");
  const [subject, setSubject] = useState("Collaboration");
  const [message, setMessage] = useState("");
  const [notice, setNotice] = useState("");
  const transition = reducedMotion ? { duration: 0 } : { duration: 0.42, ease: [0.22, 1, 0.36, 1] as const };

  const availableSocials = (socials ?? [])
    .filter((social): social is { platform: string; url: string } =>
      Boolean(social.url && /^https?:\/\//i.test(social.url)),
    )
    .filter((social) => !social.platform.toLowerCase().includes("leetcode"))
    .sort((a, b) => {
      const score = (platform: string) => {
        const label = platform.toLowerCase();
        return label.includes("linkedin") ? 0 : label.includes("github") ? 1 : 2;
      };
      return score(a.platform) - score(b.platform);
    })
    .slice(0, 3);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email) {
      setNotice("An email address is not configured. Use one of the professional profile links instead.");
      return;
    }
    const body = [
      "Hi Sanjeev,",
      "",
      message.trim(),
      "",
      "---",
      "From: " + name.trim(),
      "Reply-to: " + replyEmail.trim(),
      "Topic: " + subject,
    ].join("\n");
    const href = "mailto:" + email + "?subject=" + encodeURIComponent("Portfolio · " + subject) + "&body=" + encodeURIComponent(body);
    setNotice("Your email app should open with a draft. The message has not been sent by this site.");
    window.location.href = href;
  }

  return (
    <Container id={asMain ? undefined : "contact"} className={styles.contact} data-standalone={asMain ? "true" : "false"} aria-labelledby="contact-heading">
      <header className={styles.contactHeader}>
        <motion.div className={styles.headingCopy} initial={reducedMotion ? false : { opacity: 0, y: 13 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={transition}>
          <p className={styles.eyebrow}><span>10</span><i /> CONTACT <b /></p>
          <Heading id="contact-heading">Let’s build<br />something <span>meaningful.</span></Heading>
          <p className={styles.lede}>A good conversation can start with a bug, a research question, an open-source issue or an idea that needs a first prototype.</p>
          <div className={styles.topicPills}><span>Internships</span><span>Research</span><span>Open source</span><span>Projects</span><span>Technical discussions</span></div>
        </motion.div>

        <motion.aside className={styles.contactSignal} initial={reducedMotion ? false : { opacity: 0, y: 13 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={reducedMotion ? { duration: 0 } : { ...transition, delay: 0.08 }}>
          <div className={styles.signalTop}><span className={styles.signalIcon}><Glyph kind="spark" /></span><span>GOOD CONVERSATIONS START WITH CONTEXT</span></div>
          <p>What are you building, investigating or trying to improve?</p>
          <div className={styles.signalRule} />
          <div className={styles.signalMeta}><span><Glyph kind="mail" /> Email works best for detailed ideas.</span><span><Glyph kind="clock" /> I’ll reply when I can give the conversation proper attention.</span></div>
        </motion.aside>
      </header>

      <div className={styles.contactGrid}>
        <div className={styles.leftColumn}>
          <motion.section className={styles.connectPanel} initial={reducedMotion ? false : { opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={transition} aria-labelledby="connect-heading">
            <header className={styles.panelHeading}><span className={styles.panelIcon}><Glyph kind="arrow" /></span><div><h3 id="connect-heading">Connect with me</h3><p>THE DIRECT ROUTES</p></div></header>
            <div className={styles.connectGrid}>
              {email ? (
                <a className={styles.connectCard} href={"mailto:" + email}>
                  <span className={styles.connectGlyph} data-tone="red"><Glyph kind="mail" /></span>
                  <span className={styles.connectCopy}><strong>Email</strong><small>{email}</small><em>Opportunities and collaboration</em></span><span className={styles.external}>↗</span>
                </a>
              ) : null}
              {availableSocials.map((social) => (
                <a className={styles.connectCard} href={social.url} key={social.platform} target="_blank" rel="noreferrer">
                  <span className={styles.connectGlyph} data-tone={linkIcon(social.platform)}><Glyph kind={linkIcon(social.platform)} /></span>
                  <span className={styles.connectCopy}><strong>{social.platform.replace(/ profile$/i, "")}</strong><small>{social.url.replace(/^https?:\/\//i, "").replace(/\/$/, "")}</small><em>Open profile</em></span><span className={styles.external}>↗</span>
                </a>
              ))}
            </div>
          </motion.section>

          <motion.section className={styles.topicsPanel} initial={reducedMotion ? false : { opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={reducedMotion ? { duration: 0 } : { ...transition, delay: 0.06 }} aria-labelledby="topics-heading">
            <header className={styles.panelHeading}><span className={styles.panelIcon}><Glyph kind="spark" /></span><div><h3 id="topics-heading">Let’s talk about</h3><p>TECHNICAL AND CAREER CONVERSATIONS</p></div></header>
            <div className={styles.topicGrid}>
              {topics.map((topic) => <div className={styles.topicCard} data-tone={topic.tone} key={topic.title}><span className={styles.topicDot} /><span><strong>{topic.title}</strong><small>{topic.note}</small></span></div>)}
            </div>
          </motion.section>
        </div>

        <motion.section className={styles.messagePanel} initial={reducedMotion ? false : { opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={reducedMotion ? { duration: 0 } : { ...transition, delay: 0.04 }} aria-labelledby="message-heading">
          <header className={styles.messageHeading}>
            <span className={styles.messageIcon}><Glyph kind="message" /></span>
            <div><h3 id="message-heading">Start a conversation</h3><p>Fill in a few details to prepare an email draft.</p></div>
            <span className={styles.messageStep}>01 / 01</span>
          </header>
          <form className={styles.messageForm} onSubmit={handleSubmit}>
            <div className={styles.fieldRow}>
              <label><span>Your name</span><input autoComplete="name" name="name" value={name} onChange={(event) => setName(event.target.value)} placeholder="How should I address you?" required /></label>
              <label><span>Your email</span><input autoComplete="email" name="email" type="email" value={replyEmail} onChange={(event) => setReplyEmail(event.target.value)} placeholder="you@example.com" required /></label>
            </div>
            <label><span>What is this about?</span><select name="subject" value={subject} onChange={(event) => setSubject(event.target.value)}><option>Collaboration</option><option>Internship opportunity</option><option>Research discussion</option><option>Open-source contribution</option><option>Project feedback</option><option>Other</option></select></label>
            <label><span>Your message</span><textarea name="message" value={message} onChange={(event) => setMessage(event.target.value)} placeholder="A little context goes a long way…" rows={5} required /></label>
            <button className={styles.submitButton} type="submit" disabled={!email}><span>Prepare email draft</span><Glyph kind="arrow" /></button>
            {notice ? <p className={styles.formNotice} role="status">{notice}</p> : <p className={styles.formFootnote}>This opens your email application with a pre-filled draft. Nothing is sent or stored by this page.</p>}
          </form>
        </motion.section>
      </div>

      <div className={styles.contactBottom}>
        <div className={styles.availabilityCard}><span className={styles.availabilityDot} /><div><strong>{availabilityNote || "Open to thoughtful engineering conversations."}</strong><small>Current interests: applied AI, software engineering and open source.</small></div></div>
        <a className={styles.backToWork} href="/work">See selected work <Glyph kind="arrow" /></a>
      </div>
    </Container>
  );
}
