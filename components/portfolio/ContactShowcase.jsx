"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import styles from "./ContactShowcase.module.css";

function Glyph({ kind }) {
  const props = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" };
  if (kind === "mail") return <svg viewBox="0 0 24 24" {...props}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></svg>;
  if (kind === "pin") return <svg viewBox="0 0 24 24" {...props}><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></svg>;
  if (kind === "clock") return <svg viewBox="0 0 24 24" {...props}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>;
  if (kind === "linkedin") return <svg viewBox="0 0 24 24"><path fill="currentColor" d="M5.2 7.8A2.2 2.2 0 1 0 5.2 3.4a2.2 2.2 0 0 0 0 4.4ZM3.3 9.5h3.8v11.2H3.3zM9.5 9.5h3.6V11h.1a3.9 3.9 0 0 1 3.5-1.9c3.7 0 4.4 2.4 4.4 5.5v6.1h-3.8v-5.4c0-1.3 0-3-1.9-3s-2.2 1.4-2.2 2.9v5.5H9.5z"/></svg>;
  if (kind === "github") return <svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.03c-3.1.67-3.76-1.31-3.76-1.31-.5-1.28-1.24-1.62-1.24-1.62-1.02-.7.08-.69.08-.69 1.13.08 1.72 1.16 1.72 1.16 1 1.72 2.62 1.22 3.26.94.1-.73.4-1.22.71-1.5-2.48-.28-5.09-1.24-5.09-5.52 0-1.22.44-2.22 1.16-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.05 1.15a10.6 10.6 0 0 1 5.55 0c2.11-1.44 3.05-1.15 3.05-1.15.61 1.54.23 2.68.11 2.96.72.78 1.16 1.78 1.16 3 0 4.29-2.62 5.24-5.11 5.51.4.35.76 1.03.76 2.08v3.08c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z"/></svg>;
  if (kind === "leetcode") return <svg viewBox="0 0 24 24" {...props}><path d="M15 3.5 9 9m0 0-3 3 3 3m-3-3h9m-4-8-6 6a4 4 0 0 0 0 5.7l2 2M13 3l4 4m-1 10h4"/></svg>;
  return <svg viewBox="0 0 24 24" {...props}><path d="M5 12h14m-6-6 6 6-6 6"/></svg>;
}

const topicOptions = [
  "Software engineering opportunity",
  "Research collaboration",
  "Open-source contribution",
  "Project discussion",
  "Mentorship or technical discussion",
  "Something else",
];

export default function ContactShowcase({ content }) {
  const [name, setName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [topic, setTopic] = useState(topicOptions[0]);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const reducedMotion = useReducedMotion();
  const email = content?.contact?.email || "";
  const location = content?.contact?.location || "India";
  const socials = Array.isArray(content?.socials)
    ? content.socials.filter((item) => item && item.url && /^https?:\/\//i.test(item.url))
    : [];
  const profileCards = socials.map((item) => {
    const normalized = item.platform.toLowerCase();
    const kind = normalized.includes("linkedin") ? "linkedin" : normalized.includes("leetcode") ? "leetcode" : normalized.includes("github") ? "github" : "arrow";
    const description = kind === "linkedin" ? "Professional profile" : kind === "leetcode" ? "Problem-solving profile" : kind === "github" ? "Open-source work and projects" : "Public profile";
    return { ...item, kind, description };
  });
  const motionProps = (delay = 0) => ({
    initial: reducedMotion ? false : { opacity: 0, y: 12 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: .14 },
    transition: { duration: reducedMotion ? 0 : .38, delay: reducedMotion ? 0 : delay },
  });

  function handleSubmit(event) {
    event.preventDefault();
    if (!email) {
      setStatus("Email is not configured in the portfolio data. Please use one of the public profiles.");
      return;
    }
    const subject = encodeURIComponent(topic + (name.trim() ? " — " + name.trim() : ""));
    const body = encodeURIComponent(
      "Hi Sanjeev,\n\n" + message.trim() +
      "\n\n— " + name.trim() + "\nReply to: " + senderEmail.trim()
    );
    setStatus("Your email app should open with a draft. The portfolio does not send messages directly.");
    window.location.href = "mailto:" + email + "?subject=" + subject + "&body=" + body;
  }

  return (
    <section className={styles.contactSection} id="contact" aria-labelledby="contact-heading" tabIndex={-1}>
      <div className={styles.contactLayout}>
        <motion.div className={styles.contactIntro} {...motionProps()}>
          <p className={styles.eyebrow}><span>10</span><i/> CONTACT <b/></p>
          <h2 id="contact-heading">Have a problem<br/>worth <span>solving?</span></h2>
          <p className={styles.contactLead}>A codebase that needs careful work, an engineering opportunity, or a research idea worth testing? Send me the context and what you hope to make better.</p>
          <div className={styles.contactTags}><span>Engineering</span><span>Open source</span><span>Research</span><span>Project ideas</span></div>

          <article className={styles.connectPanel}>
            <div className={styles.panelHeading}><span><Glyph kind="mail"/></span><h3>Connect with me</h3><small>DIRECT CHANNELS</small></div>
            {email ? (
              <a className={styles.emailCard} href={"mailto:" + email}>
                <span className={styles.channelIcon}><Glyph kind="mail"/></span>
                <span className={styles.channelCopy}><strong>Email</strong><small>{email}</small><span>Best for a detailed message</span></span>
                <span className={styles.externalArrow} aria-hidden="true">↗</span>
              </a>
            ) : null}
            <div className={styles.profileGrid}>
              {profileCards.map((item) => (
                <a className={styles.profileCard} href={item.url} key={item.platform} target="_blank" rel="noreferrer">
                  <span className={styles.channelIcon} data-kind={item.kind}><Glyph kind={item.kind}/></span>
                  <span className={styles.channelCopy}><strong>{item.platform.replace(/ profile$/i, "")}</strong><small>{item.description}</small></span>
                  <span className={styles.externalArrow} aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
          </article>

          <div className={styles.locationStrip}>
            <div><span><Glyph kind="pin"/></span><small>Based in</small><strong>{location}</strong></div>
            <div><span><Glyph kind="clock"/></span><small>Local time zone</small><strong>IST · UTC+05:30</strong></div>
          </div>
        </motion.div>

        <motion.div className={styles.formColumn} {...motionProps(.06)}>
          <div className={styles.formCard}>
            <div className={styles.formHeading}>
              <span className={styles.formIcon}><Glyph kind="mail"/></span>
              <div><p className={styles.formEyebrow}>START A CONVERSATION</p><h3>Send a message</h3><p>Give me enough detail to understand the idea.</p></div>
            </div>
            <form className={styles.contactForm} onSubmit={handleSubmit}>
              <div className={styles.formRow}>
                <label>Name<input type="text" name="name" autoComplete="name" placeholder="Your name" value={name} onChange={(event) => setName(event.target.value)} required maxLength={100}/></label>
                <label>Your email<input type="email" name="email" autoComplete="email" placeholder="you@example.com" value={senderEmail} onChange={(event) => setSenderEmail(event.target.value)} required maxLength={254}/></label>
              </div>
              <label>What’s this about?
                <select name="topic" value={topic} onChange={(event) => setTopic(event.target.value)}>
                  {topicOptions.map((option) => <option key={option} value={option}>{option}</option>)}
                </select>
              </label>
              <label>Message<textarea name="message" placeholder="A little context, what you’ve tried, or what you’d like to discuss…" rows={6} value={message} onChange={(event) => setMessage(event.target.value)} required minLength={10} maxLength={4000}/></label>
              <button type="submit" className={styles.submitButton}>Open email draft <Glyph kind="arrow"/></button>
              <p className={styles.formNote}>This opens your configured email app with a draft addressed to Sanjeev. Nothing is sent by the website.</p>
              <p className={styles.formStatus} role="status" aria-live="polite">{status}</p>
            </form>
          </div>

          <article className={styles.contactNote}>
            <span className={styles.noteMark}><Glyph kind="arrow"/></span>
            <div><strong>Useful context beats a cold “hi”.</strong><p>Include the project or role, the problem you’re tackling, and the next step you have in mind. It helps me respond to the substance.</p></div>
          </article>
        </motion.div>
      </div>
      <div className={styles.contactBottomLine}><span>BUILD WITH INTENT</span><span>LEARN IN PUBLIC</span><span>LEAVE THE CODE BETTER</span></div>
    </section>
  );
}
