import { publicUrl } from "@/lib/public-url"
import type { ResearchItem } from "@/lib/research"
import { ArrowUpRight } from "./icons"
import { Reveal } from "./Reveal"
import { PaperViewer } from "./PaperViewer"
import { KnowledgeGraphExplorer } from "./KnowledgeGraphExplorer"

function isText(value: string | string[] | undefined | null): value is string {
  return typeof value === "string" && value !== "MISSING" && value.trim() !== ""
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
                <KnowledgeGraphExplorer />
                <span className="gl-research-card__eyebrow">SonicMap RQ1 · research prototype</span>
                <span className="gl-research-card__title">Causal-temporal audio knowledge graphs</span>
                <span className="gl-research-card__abstract">
                  I'm working on tracking sound-source observations across a recording and keeping the relationships
                  between them over time. The main audio pipeline and the late-arrival timing tests are being evaluated
                  separately for now.
                </span>
                <span className="gl-research-card__tags">
                  <span>Multichannel audio</span>
                  <span>Source tracking</span>
                  <span>Temporal relations</span>
                  <span>Event-time queries</span>
                </span>
                <details className="gl-kg-details">
                  <summary>What I am investigating <span aria-hidden="true">＋</span></summary>
                  <div>
                    <p>
                      One question is how to handle evidence that arrives late. A query about an earlier moment should
                      not use information the system had not received yet. The current graph path stores event-time
                      relations; the separate knowledge-time work is still being developed.
                    </p>
                    <p>
                      I have a deterministic delayed-arrival test using synthetic observations. It compares log and
                      graph query paths, but it does not yet feed predicted audio detections into a bitemporal graph.
                    </p>
                    <small>
                      The current system is a research prototype, not a validated real-time end-to-end system.
                      The relation-extraction results are still weak, and the research novelty has not been established.
                    </small>
                  </div>
                </details>
              </div>
              <div className="gl-research-entry__footer">
                <span>Audio tracking and temporal graph queries</span>
                <span>In progress</span>
                <a href="https://github.com/knockknock10/Portfolio/blob/main/SONICMAP-RQ1.md" target="_blank" rel="noreferrer">
                  Research notes <ArrowUpRight />
                </a>
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
