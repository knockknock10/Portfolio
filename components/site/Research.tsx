import { publicUrl } from "@/lib/public-url"
import type { ResearchItem } from "@/lib/research"
import { ArrowUpRight } from "./icons"
import { Reveal } from "./Reveal"
import { Wave } from "./Wave"

/*
  Result figures below are the ones already published on the previous Research
  section (clean-reference E1 benchmark, n = 2,620). They are shown as-is.
*/
const results = [
  { method: "Joint (semantic + spectral)", success: "100%", snr: "75.37" },
  { method: "Semantic only", success: "100%", snr: "73.30" },
  { method: "Spectral only", success: "100%", snr: "77.16" },
  { method: "Random", success: "99.96%", snr: "74.25" },
]

const numbers = [
  { value: "2,620", label: "audio samples (LibriSpeech test-clean)" },
  { value: "40", label: "speakers" },
  { value: "5.40 hrs", label: "of 16 kHz speech" },
  { value: "3", label: "replicas of each payload bit" },
]

function isText(value: string | string[] | undefined | null): value is string {
  return typeof value === "string" && value !== "MISSING" && value.trim() !== ""
}

export function Research({ paper, other }: { paper: ResearchItem | null; other: ResearchItem[] }) {
  const pdf = paper && isText(paper.pdf) ? publicUrl("/" + paper.pdf.replace(/^\/+/, "")) : null
  const code = paper && isText(paper.link) ? paper.link : null
  const authors = paper && Array.isArray(paper.authors) ? paper.authors.join(", ") : null

  return (
    <section className="sk-section sk-dark" id="research" aria-labelledby="research-title">
      <Wave edge="top" />
      <Wave edge="bottom" />
      <div className="sk-wrap">
        <Reveal>
          <div className="sk-head">
            <div>
              <p className="sk-eyebrow">Research</p>
              <h2 className="sk-h2" id="research-title">
                Watermarking speech
              </h2>
            </div>
            <p className="sk-lede">
              My first-author paper looks at where to hide a watermark in speech so that it survives, and whether a
              self-supervised model can help choose the spot.
            </p>
          </div>
        </Reveal>

        {paper ? (
          <div className="sk-research">
            <Reveal>
              <div>
                <h3 className="sk-paper-title">{paper.title}</h3>
                <dl className="sk-meta-list">
                  {authors ? (
                    <div>
                      <dt>Authors</dt>
                      <dd>{authors}</dd>
                    </div>
                  ) : null}
                  {isText(paper.venue) ? (
                    <div>
                      <dt>Venue</dt>
                      <dd>{isText(paper.status) ? paper.status : paper.venue}</dd>
                    </div>
                  ) : null}
                  {isText(paper.year) ? (
                    <div>
                      <dt>Year</dt>
                      <dd>{paper.year}</dd>
                    </div>
                  ) : null}
                </dl>
                {isText(paper.abstract) ? <p>{paper.abstract}</p> : null}
                <div className="sk-hero__actions">
                  {pdf ? (
                    <a className="sk-btn sk-btn--light sk-btn--small" href={pdf} target="_blank" rel="noreferrer">
                      Read the paper <ArrowUpRight />
                    </a>
                  ) : null}
                  {code ? (
                    <a className="sk-btn sk-btn--light sk-btn--small" href={code} target="_blank" rel="noreferrer">
                      Code <ArrowUpRight />
                    </a>
                  ) : null}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="sk-card">
                <h3>Placement rules compared</h3>
                <p>Clean-reference benchmark across all 2,620 test-clean utterances.</p>
                <table className="sk-table">
                  <thead>
                    <tr>
                      <th scope="col">Placement rule</th>
                      <th scope="col">Payload recovered</th>
                      <th scope="col">Mean SNR (dB)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((row) => (
                      <tr key={row.method}>
                        <th scope="row">{row.method}</th>
                        <td>{row.success}</td>
                        <td>{row.snr}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="sk-stat-grid">
                  {numbers.map((item) => (
                    <div key={item.label}>
                      <strong>{item.value}</strong>
                      <span>{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        ) : null}

        <Reveal>
          <p className="sk-note" style={{ color: "var(--on-dark-muted)", marginTop: "clamp(28px, 4vw, 44px)" }}>
            What I found: the model&apos;s contribution map is a useful signal, but in the current tests local spectral
            suitability was the stronger criterion, and the joint method did not consistently beat spectral-only. The paper
            has been submitted and is not yet published.
          </p>
        </Reveal>

        {other.map((item) => (
          <Reveal key={item.title}>
            <div className="sk-side">
              <h3>{item.title}</h3>
              <div>
                {isText(item.abstract) ? <p>{item.abstract}</p> : null}
                {item.tags.length ? <p style={{ marginTop: 10 }}>{item.tags.join(" · ")}</p> : null}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
