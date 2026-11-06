"use client"

import { useState, type ReactNode } from "react"
import { Reveal } from "./Reveal"

/* Grouped from the résumé and the skills already listed in lib/portfolio-data.ts. "Learning" marks what I'm still picking up. */
const skillLogos: Record<string, { slug: string; color: string }> = {
  Go:{slug:"go",color:"00ADD8"}, Java:{slug:"openjdk",color:"E76F00"}, "C++":{slug:"cplusplus",color:"00599C"}, C:{slug:"c",color:"A8B9CC"},
  Python:{slug:"python",color:"3776AB"}, JavaScript:{slug:"javascript",color:"D6B400"}, Rust:{slug:"rust",color:"000000"},
  "Node.js":{slug:"nodedotjs",color:"339933"}, Express:{slug:"express",color:"333333"}, React:{slug:"react",color:"149ECA"},
  "Next.js":{slug:"nextdotjs",color:"111111"}, HTML5:{slug:"html5",color:"E34F26"}, CSS3:{slug:"css3",color:"1572B6"},
  "Tailwind CSS":{slug:"tailwindcss",color:"06B6D4"}, Vite:{slug:"vite",color:"646CFF"}, Webpack:{slug:"webpack",color:"8DD6F9"},
  PostgreSQL:{slug:"postgresql",color:"4169E1"}, MongoDB:{slug:"mongodb",color:"47A248"}, Docker:{slug:"docker",color:"2496ED"},
  Kubernetes:{slug:"kubernetes",color:"326CE5"}, "GitHub Actions":{slug:"githubactions",color:"2088FF"}, Linux:{slug:"linux",color:"B9A000"},
  AWS:{slug:"amazonaws",color:"232F3E"}, PyTorch:{slug:"pytorch",color:"EE4C2C"}, Git:{slug:"git",color:"F05032"},
  Postman:{slug:"postman",color:"FF6C37"}, Vercel:{slug:"vercel",color:"111111"}, Netlify:{slug:"netlify",color:"00AD9F"},
  "VS Code":{slug:"visualstudiocode",color:"007ACC"}
}
function SkillLogo({name}:{name:string}) {
  const [failed,setFailed]=useState(false)
  const logo=skillLogos[name]
  const fallback=name.split(/[\s.+-]/).filter(Boolean).map(part=>part[0]).join("").slice(0,2).toUpperCase()
  return <span className="gl-skill__logo" aria-hidden="true">
    {logo && !failed ? <img src={`https://cdn.simpleicons.org/${logo.slug}/${logo.color}`} alt="" loading="lazy" decoding="async" onError={()=>setFailed(true)} /> : null}
    {!logo || failed ? <span>{fallback}</span> : null}
  </span>
}

const groups: { id: string; label: string; items: string[]; learning?: string[] } = [
  { id: "languages", label: "Languages", items: ["Go", "Java", "C++", "C", "Python", "JavaScript", "SQL", "Bash"], learning: ["Rust"] },
  { id: "backend", label: "Backend", items: ["Node.js", "Express", "Gin", "GORM", "REST APIs", "Microservices", "WebSockets"] },
  { id: "frontend", label: "Frontend", items: ["React", "Next.js", "HTML5", "CSS3", "Tailwind CSS", "Vite", "Webpack"] },
  { id: "data", label: "Databases", items: ["PostgreSQL", "MongoDB", "SQL"] },
  { id: "infra", label: "DevOps and cloud", items: ["Docker", "Kubernetes", "GitHub Actions", "CI/CD", "Linux", "AWS"] },
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
              Go, Java and C++ for backend and systems work; React and Node for web applications; Python for research.
              Tools I&apos;ve used are listed directly, with Rust marked separately as learning.
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
                  <SkillLogo name={item} />
                  <span className="gl-skill__name">{item}</span>
                </li>
              ))}
              {group.learning?.map((item, index) => (
                <li className="gl-skill gl-skill--learning" key={item} style={{ animationDelay: `${(group.items.length + index) * 45}ms` }}>
                  <SkillLogo name={item} />
                  <span className="gl-skill__name">{item}</span>
                  <small>learning</small>
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
