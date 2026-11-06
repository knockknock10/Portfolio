import type { Internship } from "@/lib/internships"
import { Reveal } from "./Reveal"
import { BackgroundSVG } from "./BackgroundSVG"

/*
  Dates, team size and employer links were never recorded for these entries
  (see PORTFOLIO-DATA.md), so none are shown. Nothing here is inferred.
*/
function list(value: string[] | "MISSING"): string[] {
  return Array.isArray(value) ? value : []
}

export function Experience({ internships }: { internships: Internship[] }) {
  return (
    <section className="sk-section sk-section--tight-bottom" id="experience" aria-labelledby="experience-title">
      <BackgroundSVG variant="triangle" className="sk-deco-svg sk-deco-svg--triangle sk-deco-svg--right-top" />
      <div className="sk-wrap">
        <Reveal>
          <div className="sk-head">
            <div>
              <p className="sk-eyebrow">Experience</p>
              <h2 className="sk-h2" id="experience-title">
                Research &amp; university work
              </h2>
            </div>
            {/* Previous heading retained for reference: “Where I’ve worked”. */}
            <p className="sk-lede">
              This section covers a university research internship and protocol and workflow work for a campus
              initiative. Each entry is described by its actual responsibilities, not an inflated job title.
            </p>
          </div>
        </Reveal>

        <div className="sk-timeline">
          {internships.map((entry) => {
            const bullets = list(entry.responsibilities)
            const stack = list(entry.stack)
            return (
              <Reveal key={entry.company + entry.role}>
                <article className="sk-entry">
                  <div>
                    <h3>{entry.role !== "MISSING" ? entry.role : entry.company}</h3>
                    <p className="sk-entry__where">
                      {entry.company}
                      {entry.location !== "MISSING" ? ` · ${entry.location}` : ""}
                    </p>
                  </div>
                  <div>
                    {entry.summary !== "MISSING" ? <p>{entry.summary}</p> : null}
                    {bullets.length ? (
                      <ul className="sk-bullets">
                        {bullets.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    ) : null}
                    {stack.length ? (
                      <ul className="sk-tags" aria-label="Topics and tools">
                        {stack.map((item) => (
                          <li className="sk-chip" key={item}>
                            {item}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
