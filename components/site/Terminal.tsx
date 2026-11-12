"use client"

import { useEffect, useRef, useState, type KeyboardEvent } from "react"
import { useLiveGithub } from "./useLiveGithub"
// import { applyTheme } from "./ThemeToggle" // dark theme retired
import { askKb } from "@/lib/ask-kb"
import { useLenis } from "@/components/SmoothScrollProvider"

type Line = { kind: "in" | "out" | "dim"; text: string }
type Props = {
  email: string | null
  github: string | null
  resumeHref: string
  snapshot: { merged: number; open: number; orgs: number; repos: number | null } | null
}

const PROJECTS = ["Aevor", "CommitHub", "Wandera", "NovaFest", "ConvergenceGuard"]
const STACK = "Go · Java · C++ · Python · React · Node.js · MongoDB · PostgreSQL · Docker · Linux"
const SECTIONS = ["work", "research", "open-source", "experience", "skills", "certificates", "about", "contact"]
const COMMANDS = ["help", "ask", "whoami", "projects", "stack", "stats", "contact", "resume", "goto", "clear"]
const BOOT: Line[] = [
  { kind: "dim", text: "sanjeev@portfolio — type a command, or press a chip below" },
  { kind: "dim", text: "try: whoami · projects · stats · goto work" },
]

export function Terminal({ email, github, resumeHref, snapshot }: Props) {
  const live = useLiveGithub()
  const lenis = useLenis()
  const [lines, setLines] = useState<Line[]>(BOOT)
  const [value, setValue] = useState("")
  const history = useRef<string[]>([])
  const cursor = useRef(-1)
  const body = useRef<HTMLDivElement>(null)
  const input = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const el = body.current
    if (el) el.scrollTop = el.scrollHeight
  }, [lines])

  const stats = () => {
    const merged = live?.upstream.mergedCount ?? snapshot?.merged
    const open = live?.upstream.openCount ?? snapshot?.open
    const orgs = live?.upstream.projectCount ?? snapshot?.orgs
    const repos = live?.repoCount ?? snapshot?.repos
    if (merged == null) return ["No GitHub figures are available right now."]
    return [
      `pull requests merged   ${merged}`,
      `open, in review        ${open ?? "—"}`,
      `projects contributed   ${orgs ?? "—"}`,
      repos != null ? `public repositories   ${repos}` : "",
      live ? "source: GitHub API, just now" : "source: last site build",
    ].filter(Boolean)
  }

  const run = (raw: string) => {
    const cmd = raw.trim()
    if (!cmd) return
    history.current.unshift(cmd)
    cursor.current = -1
    const [name, ...rest] = cmd.toLowerCase().split(/\s+/)
    const arg = rest.join(" ")
    const out = (text: string[] | string, kind: Line["kind"] = "out"): Line[] =>
      (Array.isArray(text) ? text : [text]).map((t) => ({ kind, text: t }))
    let res: Line[] = []
    switch (name) {
      case "help":
        res = out(["help      list commands", "ask <question>   ask about me", "whoami    who this is", "projects  things I have built", "stack     tools I use", "stats     live open-source numbers", "contact   ways to reach me", "resume    open the résumé", "goto <section>   jump there", "clear"])
        break
      case "ask": {
        const hit = askKb(rest.join(" "))
        res = out(hit ? hit.answer : rest.length ? "No answer for that on this site. Try: ask is he open to internships" : "Usage: ask <question>")
        break
      }
      case "whoami":
        res = out(["Sanjeev Kumar", "Third-year B.Tech, Computer Science and Engineering, SRM University AP.", "Backend services, open-source contributions, speech-watermarking research."])
        break
      case "projects":
        res = out([...PROJECTS.map((p, i) => `${String(i + 1).padStart(2, "0")}  ${p}`), "→ goto work  to open the workbench"])
        break
      case "stack":
        res = out(STACK)
        break
      case "stats":
        res = out(stats())
        break
      case "contact":
        res = out([email ? `email     ${email}` : "", github ? `github    ${github}` : ""].filter(Boolean))
        break
      case "resume":
        window.open(resumeHref, "_blank", "noopener")
        res = out("Opening résumé in a new tab…")
        break
      case "goto": {
        const id = SECTIONS.find((s) => s === arg || s.replace("-", " ") === arg)
        if (!id) { res = out(`Unknown section. Try: ${SECTIONS.join(", ")}`); break }
        const el = document.getElementById(id)
        if (el) { if (lenis) lenis.scrollTo(el, { offset: -20 }); else el.scrollIntoView({ behavior: "smooth" }) }
        res = out(`Scrolling to ${id}…`)
        break
      }
      case "theme":
        res = out("The site is light only now.")
        break
      case "clear":
        setLines([])
        return
      default:
        res = out(`command not found: ${name}. Type help.`)
    }
    setLines((l) => [...l, { kind: "in", text: cmd }, ...res])
  }

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") { run(value); setValue("") }
    else if (e.key === "ArrowUp") {
      e.preventDefault()
      cursor.current = Math.min(cursor.current + 1, history.current.length - 1)
      setValue(history.current[cursor.current] ?? "")
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      cursor.current = Math.max(cursor.current - 1, -1)
      setValue(history.current[cursor.current] ?? "")
    } else if (e.key === "Tab") {
      e.preventDefault()
      const hit = COMMANDS.find((c) => c.startsWith(value.toLowerCase()))
      if (hit && value) setValue(hit)
    }
  }

  return (
    <section className="gl-term-sec" aria-label="Interactive terminal">
      <div className="sk-wrap">
        <div className="gl-term" onClick={() => input.current?.focus({ preventScroll: true })}>
          <div className="gl-term__bar" aria-hidden="true">
            <span /><span /><span />
            <b>sanjeev — portfolio</b>
          </div>
          <div className="gl-term__body" ref={body} role="log" aria-live="polite">
            {lines.map((l, i) => (
              <p key={i} className={`gl-term__line gl-term__line--${l.kind}`}>
                {l.kind === "in" ? <span className="gl-term__ps">$</span> : null}
                {l.text}
              </p>
            ))}
            <label className="gl-term__prompt">
              <span className="gl-term__ps">$</span>
              <input
                ref={input}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={onKey}
                spellCheck={false}
                autoComplete="off"
                autoCapitalize="off"
                aria-label="Terminal command"
              />
            </label>
          </div>
          <div className="gl-term__chips">
            {["whoami", "projects", "stats", "stack", "contact"].map((c) => (
              <button key={c} type="button" onClick={() => run(c)}>{c}</button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
