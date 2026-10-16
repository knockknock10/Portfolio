"use client"

import { motion, useReducedMotion } from "framer-motion"
import { useState } from "react"
import { readDurationToken, useSpringToken } from "@/components/primitives/motionTokens"
import type { ResearchItem } from "@/lib/research"

type ResearchProps = {
  items: ResearchItem[]
  standalone?: boolean
}

function available(value: string | "MISSING"): value is string {
  return value !== "MISSING" && Boolean(value.trim())
}

function paperLink(url: string): boolean {
  return /doi\.org|arxiv\.org|\.pdf(?:$|[?#])/i.test(url)
}

function AbstractDisclosure({ abstract }: { abstract: string }) {
  const [expanded, setExpanded] = useState(false)
  return (
    <div className="research-abstract-wrap">
      <p className={expanded ? "research-abstract is-expanded" : "research-abstract"}>
        {abstract}
      </p>
      <button
        className="research-read-more"
        type="button"
        aria-expanded={expanded}
        onClick={() => setExpanded((current) => !current)}
      >
        {expanded ? "Read less" : "Read more"}
      </button>
    </div>
  )
}

function FeaturedResearch({ item }: { item: ResearchItem }) {
  const reducedMotion = Boolean(useReducedMotion())
  const [methodOpen, setMethodOpen] = useState(false)
  const link = available(item.link) ? item.link : null
  const authors = Array.isArray(item.authors) ? item.authors : []
  const submittedToIEEE = available(item.status) && /submitted/i.test(item.status)
  const venue = available(item.venue) ? item.venue : "Research manuscript"

  return (
    <motion.article
      className="research-feature"
      initial={reducedMotion ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: reducedMotion ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="research-feature-copy">
        <div className="research-feature-kicker">
          <span className="research-feature-index">01 / FIRST-AUTHOR RESEARCH</span>
          <span className="research-feature-firstauthor">FIRST AUTHOR</span>
          <span className="research-feature-status"><i /> {submittedToIEEE ? "SUBMITTED MANUSCRIPT" : "ACTIVE RESEARCH"}</span>
        </div>
        <p className="research-feature-venue">{venue} · {available(item.year) ? item.year : "Submission"}</p>
        <h3>{item.title}</h3>
        <p className="research-feature-authors">
          {authors.join(" · ")}
        </p>
        <p className="research-feature-lede">
          {available(item.abstract) ? item.abstract : "A controlled study of reference-based speech-watermark placement, evaluating semantic contribution and spectral suitability on a full speech corpus."}
        </p>
        <div className="research-feature-metrics" aria-label="Study scale">
          <div><strong>2,620</strong><span>test-clean utterances</span></div>
          <div><strong>5</strong><span>placement rules</span></div>
          <div><strong>6</strong><span>embedding targets</span></div>
        </div>
        <p className="research-feature-finding">
          <strong>Key finding.</strong> In the reported experiments, joint placement was statistically indistinguishable from spectral-only placement; local spectral suitability was the stronger placement criterion.
        </p>

        <div className="research-feature-tags" aria-label="Research technologies">
          {item.tags.map((tag) => <span key={tag}>{tag}</span>)}
        </div>

        <button
          type="button"
          className="research-method-toggle"
          aria-expanded={methodOpen}
          aria-controls="sembind-method"
          onClick={() => setMethodOpen((current) => !current)}
        >
          {methodOpen ? "Hide research pipeline" : "Explore the research pipeline"}
          <span aria-hidden="true">{methodOpen ? "−" : "+"}</span>
        </button>

        <div
          id="sembind-method"
          className={methodOpen ? "research-method-panel is-open" : "research-method-panel"}
          hidden={!methodOpen}
        >
          <ol>
            <li><strong>Represent.</strong> Extract spectro-temporal features and frozen HuBERT embeddings.</li>
            <li><strong>Select.</strong> Combine semantic saliency with spectral suitability to pick robust locations.</li>
            <li><strong>Embed.</strong> Adapt the watermark strength to each selected region.</li>
            <li><strong>Verify.</strong> Bind a 256-bit SHA-256 digest and verify through extraction and voting.</li>
          </ol>
        </div>

        <div className="research-feature-actions">
          {link ? (
            <a className="research-feature-primary" href={link} target="_blank" rel="noreferrer">
              Explore repository <span aria-hidden="true">↗</span>
            </a>
          ) : null}
          <span className="research-feature-note">{submittedToIEEE ? "Submitted to IEEE Signal Processing Letters · not yet published" : "Research manuscript · active work"}</span>
        </div>
      </div>

      <div className="research-feature-visual">
        <img
          src={available(item.image) ? item.image : "/images/research/sembind-audio-lab.svg"}
          alt="SemBind workflow illustration: speech waveform, spectrogram and semantic-spectral placement followed by reference-based verification"
          loading="lazy"
          decoding="async"
        />
        <span className="research-visual-caption"><i /> HU BERT · STFT · REFERENCE-BASED PROOF</span>
      </div>
    </motion.article>
  )
}

export function Research({ items, standalone = false }: ResearchProps) {
  const reducedMotion = Boolean(useReducedMotion())
  const spring = useSpringToken("gentle")
  const duration = readDurationToken("--duration-slow")
  const stagger = readDurationToken("--duration-section-stagger")
  const staggerCap = readDurationToken("--duration-section-stagger-cap")
  const transition = reducedMotion
    ? { duration: 0 }
    : { ...(spring ?? { type: "spring" as const }), duration }

  if (!items.length) return null

  const Heading = standalone ? "h1" : "h2"
  const featuredResearch = items.find(
    (item) => item.title.toLowerCase().includes("sembind"),
  )
  const secondaryItems = featuredResearch
    ? items.filter((item) => item !== featuredResearch)
    : items

  return (
    <section className="research-section" id={standalone ? undefined : "research"} aria-labelledby="research-heading" tabIndex={-1}>
      <div className="research-inner">
        <header className="research-header">
          <p className="research-eyebrow">Applied AI · Investigation</p>
          <Heading id="research-heading" className="research-title">Research that connects ideas to systems.</Heading>
          <p className="research-intro">
            From signal processing to trustworthy machine learning—research is shown with its actual
            implementation path, the tools involved and a direct link to the source.
          </p>
        </header>

        {featuredResearch ? <FeaturedResearch item={featuredResearch} /> : null}

        {secondaryItems.length ? (
          <div className="research-more">
            <div className="research-more-heading">
              <span>ALSO EXPLORING</span>
              <p>Additional research experience</p>
            </div>
            <div className="research-list">
              {secondaryItems.map((item, index) => {
                const status =
                  available(item.status) && ["under review", "in progress"].includes(item.status.toLowerCase())
                    ? item.status.toLowerCase() === "under review" ? "Under review" : "In progress"
                    : null
                const delay = reducedMotion ? 0 : Math.min(index * stagger, staggerCap)
                return (
                  <motion.article
                    className="research-row"
                    key={item.title + "-" + item.year}
                    initial={reducedMotion ? false : { opacity: 0, y: 9 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.18 }}
                    transition={{ ...transition, delay }}
                  >
                    <div className="research-year">
                      {available(item.year) ? item.year : null}
                    </div>
                    <div className="research-copy">
                      <div className="research-title-line">
                        <h3>{item.title}</h3>
                        {status ? <span className="research-status">{status}</span> : null}
                      </div>
                      {Array.isArray(item.authors) ? (
                        <p className="research-authors">{item.authors.join(", ")}</p>
                      ) : null}
                      {available(item.venue) ? <p className="research-venue">{item.venue}</p> : null}
                      {available(item.abstract) ? <AbstractDisclosure abstract={item.abstract} /> : (
                        <p className="research-secondary-description">
                          Research experience exploring {item.tags.length ? item.tags.join(", ") : item.type}.
                        </p>
                      )}
                      {item.tags.length ? <p className="research-tags">{item.tags.join(" · ")}</p> : null}
                    </div>
                    <div className="research-actions">
                      {available(item.image) ? <img className="research-image" src={item.image} alt={item.title} loading="lazy" /> : null}
                      {available(item.link) ? (
                        <a className="research-link" href={item.link} target="_blank" rel="noreferrer">
                          {paperLink(item.link) ? "Read paper" : "View source"}
                          <span aria-hidden="true">↗</span>
                        </a>
                      ) : null}
                    </div>
                  </motion.article>
                )
              })}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  )
}
