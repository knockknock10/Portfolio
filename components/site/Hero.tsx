"use client"

import { useState } from "react"
import { publicUrl } from "@/lib/public-url"
import { useLiveGithub } from "./useLiveGithub"
import { ArrowRight, ArrowUpRight, Download, GitHub, LinkedIn, Code } from "./icons"

export type Fact = { value: string; label: string; live?: "merged" | "projects" }

type HeroProps = {
  email: string | null
  resumeHref: string
  github: string | null
  linkedin: string | null
  leetcode: string | null
  facts: Fact[]
}

const focusAreas = [
  {
    id: "systems",
    label: "Backend & systems",
    title: "Designing the parts beneath the interface",
    note: "Service boundaries, APIs, databases and dependable backend workflows.",
    href: "#work",
  },
  {
    id: "open-source",
    label: "Open source",
    title: "Learning in codebases shared by everyone",
    note: "Issue investigation, focused fixes, tests and collaboration with maintainers.",
    href: "#open-source",
  },
  {
    id: "research",
    label: "Audio intelligence",
    title: "Teaching software to remember a sound scene",
    note: "Speech watermarking and temporal audio knowledge graphs.",
    href: "#research",
  },
]

export function Hero({ email, resumeHref, github, linkedin, leetcode, facts: builtFacts }: HeroProps) {
  const live = useLiveGithub()
  const facts = builtFacts.map((fact) =>
    live && fact.live === "merged"
      ? { ...fact, value: String(live.upstream.mergedCount) }
      : live && fact.live === "projects"
        ? { ...fact, value: String(live.upstream.projectCount) }
        : fact,
  )
  const [activeFocus, setActiveFocus] = useState("research")
  const selected = focusAreas.find((item) => item.id === activeFocus) ?? focusAreas[2]

  return (
    <section className="sk-hero" id="top" aria-labelledby="hero-title">
      <div className="sk-wrap">
        <div className="sk-hero__grid">
          <div>
            <p className="sk-hero__kicker">Computer science student at SRM University AP</p>
            {/* Previous heading: <h1 id="hero-title"><span>Sanjeev</span><span>Kumar</span></h1>
                Letters now rise one after another; the label keeps it readable for screen readers. */}
            <h1 id="hero-title" aria-label="Sanjeev Kumar">
              {["Sanjeev", "Kumar"].map((word, line) => (
                <span key={word} aria-hidden="true" className="gl-letters">
                  {[...word].map((letter, index) => (
                    <i key={index} style={{ "--i": index + line * 7 } as React.CSSProperties}>
                      {letter}
                    </i>
                  ))}
                </span>
              ))}
            </h1>
            <p className="sk-hero__lede">
              I build backend services and developer tools, contribute fixes to open-source projects, and research
              speech and audio intelligence.
            </p>
            <p className="sk-hero__status">Open to software engineering internships.</p>

            <div className="sk-hero__actions">
              <a className="sk-btn sk-btn--solid" href="#work" data-magnetic>
                See my work <ArrowRight />
              </a>
              <a className="sk-btn" href={resumeHref} target="_blank" rel="noreferrer" data-magnetic>
                Résumé <Download />
              </a>
              {email ? (
                <a className="sk-btn" href={`mailto:${email}`} data-magnetic>
                  Email me
                </a>
              ) : null}
            </div>

            <div className="sk-hero__explorer">
              <div className="sk-hero__explorer-head">
                <span>Choose a thread to explore</span>
                <span>01 — 03</span>
              </div>
              <nav className="sk-hero__focus" aria-label="Explore my focus areas">
                {focusAreas.map((item, index) => (
                  <a
                    className="sk-hero__focus-chip"
                    key={item.id}
                    href={item.href}
                    data-active={activeFocus === item.id}
                    onMouseEnter={() => setActiveFocus(item.id)}
                    onFocus={() => setActiveFocus(item.id)}
                    onClick={() => setActiveFocus(item.id)}
                  >
                    <span className="sk-hero__focus-index">{String(index + 1).padStart(2, "0")}</span>
                    <span>{item.label}</span>
                    <ArrowUpRight />
                  </a>
                ))}
              </nav>
              <div className="sk-hero__focus-preview" aria-live="polite" key={selected.id}>
                <span className="sk-hero__focus-preview-label">A little more about this thread</span>
                <strong>{selected.title}</strong>
                <p>{selected.note}</p>
                <a href={selected.href}>Explore this part <ArrowRight /></a>
              </div>
            </div>

            <div className="sk-hero__links">
              {github ? (
                <a href={github} target="_blank" rel="noreferrer">
                  <GitHub /> GitHub
                </a>
              ) : null}
              {linkedin ? (
                <a href={linkedin} target="_blank" rel="noreferrer">
                  <LinkedIn /> LinkedIn
                </a>
              ) : null}
              {leetcode ? (
                <a href={leetcode} target="_blank" rel="noreferrer">
                  <Code /> LeetCode
                </a>
              ) : null}
            </div>
          </div>

          <div className="sk-portrait" data-tilt>
            <div className="sk-portrait__shape" aria-hidden="true" />
            {/* Removed on request: the rotating text ring beside the portrait.
            <svg className="gl-ring" viewBox="0 0 200 200" aria-hidden="true">
              <defs>
                <path id="gl-ring-path" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
              </defs>
              <text>
                <textPath href="#gl-ring-path">Open to internships · Backend · Open source · Speech research · </textPath>
              </text>
            </svg>
            */}
            <div className="sk-portrait__photo">
              <img
                src={publicUrl("/images/sanjeev-portrait.webp")}
                width={880}
                height={1320}
                alt="Sanjeev Kumar standing on a metro platform"
                fetchPriority="high"
              />
            </div>
            <div className="sk-portrait__signal sk-portrait__signal--top" aria-live="polite">
              <span>Currently exploring</span>
              <strong>{selected.label}</strong>
              <small>{selected.note}</small>
            </div>
            <div className="sk-portrait__signal sk-portrait__signal--bottom">
              <span className="sk-portrait__signal-dot" aria-hidden="true" />
              <strong>Building in public</strong>
              <span>Code · research · systems</span>
            </div>
          </div>
        </div>

        {facts.length ? (
          <dl className="sk-facts">
            {facts.map((fact) => (
              <div className="sk-fact" key={fact.label} data-tilt>
                <dt style={{ display: "none" }}>{fact.label}</dt>
                <dd>
                  <strong>{fact.value}</strong>
                  <span>{fact.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        ) : null}
      </div>
    </section>
  )
}
