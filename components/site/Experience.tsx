import type { Internship } from "@/lib/internships"
import { Reveal } from "./Reveal"

function list(value: string[] | "MISSING"): string[] {
  return Array.isArray(value) ? value : []
}

export function Experience({ internships }: { internships: Internship[] }) {
  return (
    <section className="sk-section sk-section--tight-bottom gl-experience-section" id="experience" aria-labelledby="experience-title">
      <div className="sk-wrap">
        <Reveal>
          <div className="sk-head">
            <div>
              <p className="sk-eyebrow">Experience</p>
              <h2 className="sk-h2" id="experience-title">Research &amp; university work</h2>
            </div>
            <p className="sk-lede">
              Open an entry to see the responsibilities, context and tools. Each one is described by the work itself,
              not an inflated job title.
            </p>
          </div>
        </Reveal>

        <div className="gl-experience-list">
          {internships.map((entry, index) => {
            const bullets = list(entry.responsibilities)
            const stack = list(entry.stack)
            return (
              <Reveal key={entry.company + entry.role}>
                <details className="gl-experience-item">
                  <summary className="gl-experience-item__summary">
                    <span className="gl-experience-item__index">{String(index + 1).padStart(2, "0")}</span>
                    <span className="gl-experience-item__heading">
                      <strong>{entry.role !== "MISSING" ? entry.role : entry.company}</strong>
                      <small>{entry.company}{entry.location !== "MISSING" ? ` · ${entry.location}` : ""}</small>
                    </span>
                    <span className="gl-experience-item__action">Explore <i aria-hidden="true">＋</i></span>
                  </summary>
                  <div className="gl-experience-item__content">
                    {entry.summary !== "MISSING" ? <p>{entry.summary}</p> : null}
                    {bullets.length ? (
                      <ul className="sk-bullets">
                        {bullets.map((item) => <li key={item}>{item}</li>)}
                      </ul>
                    ) : null}
                    {stack.length ? (
                      <ul className="sk-tags" aria-label="Topics and tools">
                        {stack.map((item) => <li className="sk-chip" key={item}>{item}</li>)}
                      </ul>
                    ) : null}
                  </div>
                </details>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
