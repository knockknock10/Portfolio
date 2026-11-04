import type { ReactNode } from "react"
import { Reveal } from "./Reveal"

/*
  Grouped from the skills already listed in lib/portfolio-data.ts and the previous
  Skills section. "Learning" marks things I am still picking up, not things I claim.
*/
const rows: { label: string; items: string; learning?: string }[] = [
  { label: "Languages", items: "Go, Java, C++, C, Python, JavaScript, SQL", learning: "Rust" },
  { label: "Backend and data", items: "Node.js, Express, Gin, GORM, REST APIs, PostgreSQL, MongoDB, WebSockets" },
  { label: "Frontend", items: "React, Next.js, Tailwind CSS, Vite" },
  { label: "Infrastructure and tooling", items: "Docker, Git, GitHub Actions, AWS", learning: "Kubernetes" },
  { label: "Machine learning and research", items: "PyTorch, Transformers, HuBERT, STFT-based audio processing, SHA-256 payload binding" },
]

export function Skills({ children }: { children?: ReactNode }) {
  return (
    <section className="sk-section sk-section--follow" id="skills" aria-labelledby="skills-title">
      <div className="sk-wrap">
        <Reveal>
          <div className="sk-head">
            <div>
              <p className="sk-eyebrow">Skills</p>
              <h2 className="sk-h2" id="skills-title">
                What I work with
              </h2>
            </div>
            <p className="sk-lede">
              Go and Java for backend work, React and Node for the web, Python for research. Things I&apos;m still
              learning are marked.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <dl className="sk-skill-rows">
            {rows.map((row) => (
              <div className="sk-skill-row" key={row.label}>
                <dt>{row.label}</dt>
                <dd>
                  {row.items}
                  {row.learning ? (
                    <>
                      {" "}
                      <em>· learning {row.learning}</em>
                    </>
                  ) : null}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        {children}
      </div>
    </section>
  )
}
