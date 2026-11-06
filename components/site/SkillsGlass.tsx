"use client"

import { useMemo, useState, type ReactNode } from "react"
import { Reveal } from "./Reveal"

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

const groups: { id: string; label: string; items: string[]; learning?: string[] }[] = [
  { id: "languages", label: "Languages", items: ["Go", "Java", "C++", "C", "Python", "JavaScript", "SQL", "Bash"], learning: ["Rust"] },
  { id: "backend", label: "Backend", items: ["Node.js", "Express", "Gin", "GORM", "REST APIs", "Microservices", "WebSockets"] },
  { id: "frontend", label: "Frontend", items: ["React", "Next.js", "HTML5", "CSS3", "Tailwind CSS", "Vite", "Webpack"] },
  { id: "data", label: "Databases", items: ["PostgreSQL", "MongoDB", "SQL"] },
  { id: "infra", label: "DevOps and cloud", items: ["Docker", "Kubernetes", "GitHub Actions", "CI/CD", "Linux", "AWS"] },
  { id: "ml", label: "ML and research", items: ["PyTorch", "Transformers", "HuBERT", "STFT audio processing", "SHA-256 payload binding"] },
  { id: "tools", label: "Tools", items: ["Git", "Postman", "Vercel", "Netlify", "VS Code", "Vim"] },
]

type SelectedSkill = { name: string; category: string; learning: boolean }

function SkillTile({ item, category, learning, selected, onSelect }: {
  item: string
  category: string
  learning: boolean
  selected: boolean
  onSelect: (skill: SelectedSkill) => void
}) {
  return (
    <li>
      <button type="button" className={`gl-skill ${learning ? "gl-skill--learning" : ""}`}
        data-selected={selected} aria-pressed={selected}
        onClick={() => onSelect({ name: item, category, learning })}>
        <SkillLogo name={item} />
        <span className="gl-skill__name">{item}</span>
        {learning ? <small>learning</small> : <span className="gl-skill__open" aria-hidden="true">↗</span>}
      </button>
    </li>
  )
}

export function SkillsGlass({ children }: { children?: ReactNode }) {
  const [active, setActive] = useState(groups[0].id)
  const [query, setQuery] = useState("")
  const [selected, setSelected] = useState<SelectedSkill | null>(null)
  const group = groups.find((item) => item.id === active) ?? groups[0]
  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    if (!normalized) return null
    return groups.flatMap((category) => [
      ...category.items.filter((item) => item.toLowerCase().includes(normalized)).map((name) => ({ name, category: category.label, learning: false })),
      ...(category.learning ?? []).filter((item) => item.toLowerCase().includes(normalized)).map((name) => ({ name, category: category.label, learning: true })),
    ])
  }, [query])

  const choose = (skill: SelectedSkill) => setSelected(skill)

  return (
    <section className="sk-section sk-section--follow" id="skills" aria-labelledby="skills-title">
      <div className="sk-wrap">
        <Reveal>
          <div className="sk-head">
            <div>
              <p className="sk-eyebrow">Skills</p>
              <h2 className="sk-h2" id="skills-title">What I work with</h2>
            </div>
            <p className="sk-lede">
              Go, Java and C++ for backend and systems work; React and Node for web applications; Python for research.
              Browse by discipline or search the inventory. Rust is marked separately as learning.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div className="gl-panel gl-skills">
            <div className="gl-skills__toolbar">
              <div className="gl-tabs" role="tablist" aria-label="Skill groups">
                {groups.map((item, index) => (
                  <button type="button" role="tab" key={item.id} id={`tab-${item.id}`}
                    tabIndex={active === item.id ? 0 : -1}
                    aria-selected={active === item.id} aria-controls="skills-panel"
                    onKeyDown={(event) => {
                      const next = event.key === "ArrowRight" || event.key === "ArrowDown"
                        ? (index + 1) % groups.length
                        : event.key === "ArrowLeft" || event.key === "ArrowUp"
                          ? (index - 1 + groups.length) % groups.length
                          : event.key === "Home" ? 0 : event.key === "End" ? groups.length - 1 : -1
                      if (next < 0) return
                      event.preventDefault()
                      setActive(groups[next].id)
                      setSelected(null)
                      setQuery("")
                      document.getElementById(`tab-${groups[next].id}`)?.focus()
                    }}
                    onClick={() => { setActive(item.id); setSelected(null); setQuery("") }}>
                    {item.label}
                    <small>{item.items.length + (item.learning?.length ?? 0)}</small>
                  </button>
                ))}
              </div>
              <label className="gl-skills__search">
                <span aria-hidden="true">⌕</span>
                <input type="search" value={query} onChange={(event) => { setQuery(event.target.value); setSelected(null) }}
                  placeholder="Find a technology" aria-label="Search technologies" />
                {query ? <button type="button" onClick={() => setQuery("")} aria-label="Clear search">×</button> : null}
              </label>
            </div>

            {filtered ? (
              <div className="gl-skills__results" id="skills-panel" role="tabpanel" aria-label="Search results">
                <p className="gl-skills__result-count">{filtered.length} {filtered.length === 1 ? "match" : "matches"} across all groups</p>
                {filtered.length ? (
                  <ul className="gl-skills__items">
                    {filtered.map((item) => (
                      <SkillTile key={item.category + item.name} item={item.name} category={item.category}
                        learning={item.learning} selected={selected?.name === item.name && selected.category === item.category}
                        onSelect={choose} />
                    ))}
                  </ul>
                ) : <p className="gl-skills__empty">No matching technology. Try another term.</p>}
              </div>
            ) : (
              <ul className="gl-skills__items" id="skills-panel" role="tabpanel" aria-labelledby={`tab-${group.id}`} key={group.id}>
                {group.items.map((item) => (
                  <SkillTile key={item} item={item} category={group.label} learning={false}
                    selected={selected?.name === item && selected.category === group.label} onSelect={choose} />
                ))}
                {group.learning?.map((item) => (
                  <SkillTile key={item} item={item} category={group.label} learning
                    selected={selected?.name === item && selected.category === group.label} onSelect={choose} />
                ))}
              </ul>
            )}

            {selected ? (
              <div className="gl-skill-detail" aria-live="polite">
                <span className="gl-skill-detail__mark"><SkillLogo name={selected.name} /></span>
                <div>
                  <small>{selected.category}{selected.learning ? " · Learning" : " · Listed skill"}</small>
                  <strong>{selected.name}</strong>
                  <p>{selected.learning
                    ? "Currently learning and building familiarity with this technology."
                    : "Included in the skills inventory. See the projects and research sections for examples of the work around this area."}</p>
                </div>
                <button type="button" onClick={() => setSelected(null)} aria-label="Close technology details">×</button>
              </div>
            ) : (
              <p className="gl-skills__prompt">Choose a technology to see its category, or search across the full list.</p>
            )}
          </div>
        </Reveal>

        {children}
      </div>
    </section>
  )
}
