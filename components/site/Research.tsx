import { publicUrl } from "@/lib/public-url"
import type { ResearchItem } from "@/lib/research"
import { ArrowUpRight } from "./icons"
import { Reveal } from "./Reveal"
import { PaperViewer } from "./PaperViewer"

function isText(value: string | string[] | undefined | null): value is string {
  return typeof value === "string" && value !== "MISSING" && value.trim() !== ""
}

function KnowledgeGraphMark() {
  return (
    <svg className="gl-kg-mark" viewBox="0 0 420 190" role="img" aria-label="Concept illustration of audio observations connected into a temporal knowledge graph">
      <path d="M70 95 185 42 324 82M70 95 185 150 324 82M185 42 185 150M185 42 324 82M185 150 324 82" />
      <path d="M324 82 385 42M324 82 385 144" className="gl-kg-mark__secondary" />
      <circle cx="70" cy="95" r="25" className="gl-kg-mark__node gl-kg-mark__node--audio" />
      <circle cx="185" cy="42" r="20" className="gl-kg-mark__node" />
      <circle cx="185" cy="150" r="20" className="gl-kg-mark__node" />
      <circle cx="324" cy="82" r="25" className="gl-kg-mark__node gl-kg-mark__node--focus" />
      <circle cx="385" cy="42" r="11" className="gl-kg-mark__node gl-kg-mark__node--small" />
      <circle cx="385" cy="144" r="11" className="gl-kg-mark__node gl-kg-mark__node--small" />
      <path d="M59 95h22M70 84v22M179 42h12M185 36v12M318 82h12M324 76v12" className="gl-kg-mark__cross" />
    </svg>
  )
}

function Metadata({ item }: { item: ResearchItem }) {
  const authors = Array.isArray(item.authors) ? item.authors.join(", ") : null
  return (
    <div className="gl-research-meta">
      {authors ? <span>{authors}</span> : null}
      {isText(item.year) ? <span>{item.year}</span> : null}
    </div>
  )
}

export function Research({ paper, other }: { paper: ResearchItem | null; other: ResearchItem[] }) {
  const pdf = paper && isText(paper.pdf) ? publicUrl("/" + paper.pdf.replace(/^\/+/, "")) : null
  const code = paper && isText(paper.link) ? paper.link : null

  return (
    <section className="sk-section sk-dark sk-research-section" id="research" aria-labelledby="research-title">
      <div className="sk-wrap">
        <Reveal>
          <div className="sk-head">
            <div>
              <p className="sk-eyebrow">Research & exploration</p>
              <h2 className="sk-h2" id="research-title">
                Sound, space & temporal intelligence
              </h2>
            </div>
            <p className="sk-lede">
              From protecting speech content to building audio systems that remember how a scene changes over time.
              These are the research questions I am working through.
            </p>
          </div>
        </Reveal>

        <div className="gl-research-grid">
          {paper ? (
            <Reveal delay={0.04}>
              <article className="gl-research-entry">
                <div className="gl-research-topline">
                  <span className="gl-research-status"><i /> First-author manuscript</span>
                  <span className="gl-research-year">{isText(paper.year) ? paper.year : "Research"}</span>
                </div>
                {pdf ? (
                  <PaperViewer
                    pdf={pdf}
                    title={paper.title}
                    className="gl-research-card gl-research-card--paper"
                    ariaLabel={`Open submitted paper: ${paper.title}`}
                  >
                    <span className="gl-research-card__eyebrow">Submitted · not yet published</span>
                    <span className="gl-research-card__title">{paper.title}</span>
                    <span className="gl-research-card__abstract">
                      {isText(paper.abstract) ? paper.abstract : "A research study on reference-based speech watermarking."}
                    </span>
                    <span className="gl-research-card__tags">
                      {(paper.tags ?? []).slice(0, 5).map((tag) => <span key={tag}>{tag}</span>)}
                    </span>
                    <span className="gl-research-card__action">
                      Read the paper <ArrowUpRight />
                    </span>
                  </PaperViewer>
                ) : (
                  <div className="gl-research-card gl-research-card--paper">
                    <span className="gl-research-card__title">{paper.title}</span>
                    {isText(paper.abstract) ? <span className="gl-research-card__abstract">{paper.abstract}</span> : null}
                  </div>
                )}
                <div className="gl-research-entry__footer">
                  <Metadata item={paper} />
                  {isText(paper.venue) ? <span>{isText(paper.status) ? paper.status : paper.venue}</span> : null}
                  {code ? <a href={code} target="_blank" rel="noreferrer">Source code <ArrowUpRight /></a> : null}
                </div>
              </article>
            </Reveal>
          ) : null}

          <Reveal delay={0.1}>
            <article className="gl-research-entry gl-research-entry--sonicmap">
              <div className="gl-research-topline">
                <span className="gl-research-status gl-research-status--active"><i /> Active research</span>
                <span className="gl-research-year">2026</span>
              </div>
              <div className="gl-research-card gl-research-card--kg">
                <KnowledgeGraphMark />
                <span className="gl-research-card__eyebrow">SonicMap RQ1 · research prototype</span>
                <span className="gl-research-card__title">Causal-temporal audio knowledge graphs</span>
                <span className="gl-research-card__abstract">
                  Turning multichannel audio observations into time-indexed source and relation hypotheses, with
                  evidence-linked memory that can answer what the system knew at a particular moment.
                </span>
                <span className="gl-research-card__tags">
                  <span>Multichannel audio</span>
                  <span>Source tracking</span>
                  <span>Temporal relations</span>
                  <span>Bitemporal memory</span>
                </span>
                <details className="gl-kg-details">
                  <summary>What I am investigating <span aria-hidden="true">＋</span></summary>
                  <div>
                    <p>
                      The graph separates event time (when a relation held in the scene) from knowledge time
                      (when the system received that evidence). Versioned assertions preserve earlier snapshots
                      when observations arrive late or a relation is corrected, extended or retracted.
                    </p>
                    <p>
                      A controlled delayed-arrival diagnostic is in place. The next research step is to evaluate
                      receipt-time behaviour with predicted audio observations and compare event-log, event-time
                      graph and bitemporal-graph baselines.
                    </p>
                    <small>
                      This remains a prototype, not a validated real-time end-to-end system; synthetic tests
                      establish software semantics, not audio accuracy or research novelty.
                    </small>
                  </div>
                </details>
                <span className="gl-research-card__action gl-research-card__action--static">
                  Ongoing work <span aria-hidden="true">↗</span>
                </span>
              </div>
              <div className="gl-research-entry__footer">
                <span>Knowledge-time-aware temporal graph memory</span>
                <span>In progress</span>
              </div>
            </article>
          </Reveal>
        </div>

        {other.length ? (
          <Reveal delay={0.14}>
            <div className="gl-research-archive">
              <p className="gl-research-archive__label">Earlier research experience</p>
              {other.map((item) => (
                <article className="gl-research-archive__item" key={item.title}>
                  <div>
                    <h3>{item.title}</h3>
                    {isText(item.abstract) ? <p>{item.abstract}</p> : null}
                    {item.tags.length ? <p className="gl-research-archive__tags">{item.tags.join(" · ")}</p> : null}
                  </div>
                  <span>{isText(item.year) ? item.year : "Experience"}</span>
                </article>
              ))}
            </div>
          </Reveal>
        ) : null}
      </div>
    </section>
  )
}
