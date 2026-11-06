"use client"

import { useState, type ReactNode } from "react"
import { Reveal } from "./Reveal"

/* Grouped from the résumé and the skills already listed in lib/portfolio-data.ts. "Learning" marks what I'm still picking up. */
const groups: { id: string; label: string; items: string[]; learning?: string[] }[] = [
  { id: "languages", label: "Languages", items: ["Go", "Java", "C++", "C", "Python", "JavaScript", "SQL", "Bash"], learning: ["Rust"] },
  { id: "backend", label: "Backend", items: ["Node.js", "Express", "Gin", "GORM", "REST APIs", "Microservices", "WebSockets"] },
  { id: "frontend", label: "Frontend", items: ["React", "Next.js", "HTML5", "CSS3", "Tailwind CSS", "Vite", "Webpack"] },
  { id: "data", label: "Databases", items: ["PostgreSQL", "MongoDB", "SQL"] },
  { id: "infra", label: "DevOps and cloud", items: ["Docker", "GitHub Actions", "CI/CD", "Linux", "AWS"], learning: ["Kubernetes"] },
  { id: "ml", label: "ML and research", items: ["PyTorch", "Transformers", "HuBERT", "STFT audio processing", "SHA-256 payload binding"] },
  { id: "tools", label: "Tools", items: ["Git", "Postman", "Vercel", "Netlify", "VS Code", "Vim"] },
]

export function SkillsGlass({ children }: { children?: ReactNode }) {
  const [active, setActive] = useState(groups[0].id)
  const group = groups.find((item) => item.id === active) ?? groups[0]

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
              Go and Java for backend work, React and Node for the web, Python for research. Pick a group to see what is
              in it.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div className="gl-panel gl-skills">
            <div className="gl-tabs" role="tablist" aria-label="Skill groups">
              {groups.map((item) => (
                <button
                  type="button"
                  role="tab"
                  key={item.id}
                  id={`tab-${item.id}`}
                  aria-selected={active === item.id}
                  aria-controls="skills-panel"
                  onClick={() => setActive(item.id)}
                >
                  {item.label}
                  <small>{item.items.length + (item.learning?.length ?? 0)}</small>
                </button>
              ))}
            </div>
            <ul className="gl-skills__items" id="skills-panel" role="tabpanel" aria-labelledby={`tab-${group.id}`} key={group.id}>
              {group.items.map((item, index) => (
                <li className="gl-skill" key={item} style={{ animationDelay: `${index * 45}ms` }}>
                  {item}
                </li>
              ))}
              {group.learning?.map((item, index) => (
                <li className="gl-skill gl-skill--learning" key={item} style={{ animationDelay: `${(group.items.length + index) * 45}ms` }}>
                  {item} <small>learning</small>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {children}
      </div>
    </section>
  )
}
