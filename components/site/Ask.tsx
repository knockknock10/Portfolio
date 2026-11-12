"use client"

import { useState, type FormEvent } from "react"
import { askKb, ASK_SUGGESTIONS, type AskEntry } from "@/lib/ask-kb"
import { useLenis } from "@/components/SmoothScrollProvider"

type Turn = { q: string; hit: AskEntry | null }

/** A small question box. Answers come only from facts already on this site, not from a language model. */
export function Ask() {
  const [turns, setTurns] = useState<Turn[]>([])
  const [value, setValue] = useState("")
  const lenis = useLenis()

  const ask = (q: string) => {
    const text = q.trim()
    if (!text) return
    setTurns((t) => [...t.slice(-3), { q: text, hit: askKb(text) }])
    setValue("")
  }
  const jump = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    if (lenis) lenis.scrollTo(el, { offset: -20 })
    else el.scrollIntoView({ behavior: "smooth" })
  }
  const submit = (e: FormEvent) => { e.preventDefault(); ask(value) }

  return (
    <section className="gl-ask-sec" aria-labelledby="ask-title">
      <div className="sk-wrap">
        <div className="gl-ask">
          <div className="gl-ask__head">
            <p className="sk-eyebrow">Ask</p>
            <h2 id="ask-title">Ask me anything</h2>
            <p>Type a question about my work, research or background. Answers come from what is on this site, so you can always check them.</p>
          </div>
          <div className="gl-ask__main">
            <div className="gl-ask__log" role="log" aria-live="polite">
              {turns.map((t, i) => (
                <div key={i} className="gl-ask__turn">
                  <p className="gl-ask__q">{t.q}</p>
                  {t.hit ? (
                    <div className="gl-ask__a">
                      <p>{t.hit.answer}</p>
                      {t.hit.section ? (
                        <button type="button" onClick={() => jump(t.hit!.section!)}>See {t.hit.label} →</button>
                      ) : null}
                    </div>
                  ) : (
                    <div className="gl-ask__a">
                      <p>I don&apos;t have an answer for that on this site. Email is the quickest way to ask directly.</p>
                      <button type="button" onClick={() => jump("contact")}>Go to contact →</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <form className="gl-ask__form" onSubmit={submit}>
              <input value={value} onChange={(e) => setValue(e.target.value)} placeholder="e.g. What is he working on in research?" aria-label="Ask a question" />
              <button type="submit">Ask</button>
            </form>
            <div className="gl-ask__chips">
              {ASK_SUGGESTIONS.map((s) => (
                <button key={s} type="button" onClick={() => ask(s)}>{s}</button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
