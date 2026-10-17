"use client"

import { motion, useReducedMotion } from "framer-motion"
import { useState } from "react"
import { readDurationToken, useSpringToken } from "@/components/primitives/motionTokens"
import { publicUrl } from "@/lib/public-url"
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
  const [paperOpen, setPaperOpen] = useState(false)
  const [selectedFigure, setSelectedFigure] = useState<"placement" | "architecture">("placement")
  const [figureLoadFailed, setFigureLoadFailed] = useState(false)
  const link = available(item.link) ? item.link : null
  const authors = Array.isArray(item.authors) ? item.authors : []
  const featuredAuthors = authors.filter((author) => author === "Sanjeev Kumar" || author === "Biswajit Maity")
  const submittedToIEEE = available(item.status) && /submitted/i.test(item.status)
  const venue = available(item.venue) ? item.venue : "Research manuscript"
  const figureSrc = selectedFigure === "placement"
    ? "/images/research/sembind-paper-fig3.webp"
    : "/images/research/sembind-paper-fig1.svg"
  const figureSourceUrl = selectedFigure === "placement"
    ? "https://github.com/knockknock10/SemBind_Audio/tree/main/PAPER_EVIDENCE_PACKAGE/04_FIGURES"
    : "https://github.com/knockknock10/SemBind_Audio/blob/main/PAPER_EVIDENCE_PACKAGE/04_FIGURES/FIG1_architecture.svg"
  const figureAlt = selectedFigure === "placement"
    ? "Figure 3 in the submitted manuscript: spectrogram, score curves, joint score and selected embedding regions across a 7.9-second utterance."
    : "Figure 1 in the submitted manuscript: the SemBind embedding pipeline combining frozen HuBERT contribution, STFT spectral suitability, placement selection and SHA-256-bound payload."

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
          <span className="research-feature-status">{submittedToIEEE ? "SUBMITTED MANUSCRIPT" : "ACTIVE RESEARCH"}</span>
        </div>
        <p className="research-feature-venue">{venue} · {available(item.year) ? item.year : "Submission"}</p>
        <h3>{item.title}</h3>
        <div className="research-feature-authors" aria-label="Featured research credits">
          {featuredAuthors.map((author) => (
            <span key={author} className={author === "Sanjeev Kumar" ? "research-feature-author is-first-author" : "research-feature-author"}>
              <small>{author === "Sanjeev Kumar" ? "FIRST AUTHOR" : "FACULTY CO-AUTHOR"}</small>
              <strong>{author}</strong>
            </span>
          ))}
          <p>The portfolio highlights these two credits; the submitted manuscript retains its full four-author byline.</p>
        </div>
        <p className="research-feature-lede">
          {available(item.abstract) ? item.abstract : "A controlled study of reference-based speech-watermark placement, evaluating semantic contribution and spectral suitability on a full speech corpus."}
        </p>
        <div className="research-feature-metrics" aria-label="Study scale">
          <div><strong>2,620</strong><span>test-clean utterances</span></div>
          <div><strong>5</strong><span>placement rules</span></div>
          <div><strong>6</strong><span>SNR targets</span></div>
        </div>
        <p className="research-feature-finding">
          <strong>Key finding.</strong> Spectral-only placement changed fewer Whisper tiny.en transcripts than joint placement at five of the six tested strengths. The current joint fusion does not consistently outperform spectral-only placement; local signal energy is the stronger operational criterion in these experiments.
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
              View implementation repo <span aria-hidden="true">↗</span>
            </a>
          ) : null}
          {available(item.pdf) ? (
            <>
              <a className="research-feature-primary research-pdf-primary" href={publicUrl(item.pdf)} target="_blank" rel="noreferrer">
                Open IEEE submission <span aria-hidden="true">↗</span>
              </a>
              <a className="research-feature-download" href={item.pdf} download="SemBind.pdf">Download PDF ↓</a>
            </>
          ) : null}
          <span className="research-feature-note">{submittedToIEEE ? "Submitted to IEEE Signal Processing Letters · not yet published" : "Research manuscript · active work"}</span>
        </div>
      </div>

      <div className="research-feature-visual">
        <div className="research-figure-switcher" role="group" aria-label="Choose a figure from the IEEE submission">
          <button
            type="button"
            className={selectedFigure === "placement" ? "research-figure-switch active" : "research-figure-switch"}
            aria-pressed={selectedFigure === "placement"}
            onClick={() => { setFigureLoadFailed(false); setSelectedFigure("placement") }}
          >
            Placement analysis
          </button>
          <button
            type="button"
            className={selectedFigure === "architecture" ? "research-figure-switch active" : "research-figure-switch"}
            aria-pressed={selectedFigure === "architecture"}
            onClick={() => { setFigureLoadFailed(false); setSelectedFigure("architecture") }}
          >
            Method pipeline
          </button>
        </div>
        <figure className="research-paper-figure">
          {figureLoadFailed ? (
            <div className="research-figure-fallback">
              <span>Figure preview unavailable</span>
              <a href={figureSourceUrl} target="_blank" rel="noreferrer">Open original figure ↗</a>
            </div>
          ) : (
            <img
              src={publicUrl(figureSrc)}
              alt={figureAlt}
              loading="lazy"
              decoding="async"
              onError={() => setFigureLoadFailed(true)}
            />
          )}
          <figcaption>
            {selectedFigure === "placement"
              ? "Fig. 3 · Actual crop from page 3 of the submitted IEEE PDF: spectrogram, placement scores and selected frames for a 7.9-second utterance."
              : "Fig. 1 · Original SemBind architecture figure: HuBERT contribution map and STFT-domain embedding."}
          </figcaption>
        </figure>
        {available(item.pdf) ? (
          <>
            <div className="research-paper-actions">
              <a className="research-paper-open" href={item.pdf} target="_blank" rel="noreferrer">Open full IEEE submission ↗</a>
              <a className="research-paper-download" href={item.pdf} download="SemBind.pdf">Download PDF ↓</a>
            </div>
            <button
              type="button"
              className="research-paper-toggle"
              aria-expanded={paperOpen}
              aria-controls="sembind-paper-preview"
              onClick={() => setPaperOpen((current) => !current)}
            >
              {paperOpen ? "Close paper preview −" : "Read the paper here +"}
            </button>
            {paperOpen ? (
              <div className="research-paper-preview" id="sembind-paper-preview">
                <iframe src={publicUrl(item.pdf) + "#view=FitH"} title="SemBind IEEE Signal Processing Letters submission" loading="lazy" />
                <p>PDF preview depends on your browser's built-in viewer. Open/download links remain available.</p>
              </div>
            ) : null}
          </>
        ) : (
          <div className="research-pdf-unhosted">
            <p>Supporting figures and implementation evidence for the submitted manuscript are available in the project repository.</p>
            <a className="research-paper-open" href="https://github.com/knockknock10/SemBind_Audio/tree/main/PAPER_EVIDENCE_PACKAGE" target="_blank" rel="noreferrer">
              Explore research evidence ↗
            </a>
          </div>
        )}
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
                    className={item.title.toLowerCase().includes("nanosensor") ? "research-row research-nanosensor-row" : "research-row"}
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
                    <div className={item.title.toLowerCase().includes("nanosensor") ? "research-actions research-nanosensor-actions" : "research-actions"}>
                      {available(item.image) ? (
                        item.title.toLowerCase().includes("nanosensor") ? (
                          <div className="research-nanosensor-media">
                            <img className="research-nanosensor-visual" src={publicUrl(item.image)} alt="Conceptual nanosensor network showing sensor nodes, multi-hop routing and packet delivery to a gateway" loading="lazy" decoding="async" />
                            <p className="research-nanosensor-caption">Concept illustration · MATLAB research context</p>
                          </div>
                        ) : (
                          <img className="research-image" src={item.image} alt={item.title} loading="lazy" />
                        )
                      ) : null}
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
