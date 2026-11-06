"use client"

import { useState } from "react"

const stages = [
  {
    id: "audio",
    number: "01",
    label: "Audio",
    short: "Multichannel input",
    title: "Start with the sound scene",
    detail: "SonicMap works with recorded audio, including multichannel recordings. The research asks what can be inferred about the sources and events in a scene without relying on a camera.",
  },
  {
    id: "detection",
    number: "02",
    label: "Detection",
    short: "Acoustic observations",
    title: "Turn sound into observations",
    detail: "The repository contains separate perception paths: a framewise PANNs event detector and a multichannel spatial path. They are distinct implementations today, not one fully unified perception pipeline.",
  },
  {
    id: "track",
    number: "03",
    label: "Source track",
    short: "Continuity hypotheses",
    title: "Follow possible sources over time",
    detail: "Spatial observations can be associated into source-track hypotheses. A track ID is a system hypothesis about continuity, not a guarantee that the physical source identity is correct.",
  },
  {
    id: "relation",
    number: "04",
    label: "Late-arrival tests",
    short: "Knowledge-time question",
    title: "Ask what the system knew at the time",
    detail: "The current graph path stores event-time relations. A separate synthetic test explores how queries should behave when evidence arrives late; a full knowledge-time model is not yet connected to predicted audio observations.",
  },
] as const

export function KnowledgeGraphExplorer() {
  const [active, setActive] = useState<(typeof stages)[number]["id"]>("relation")
  const selected = stages.find((stage) => stage.id === active) ?? stages[3]

  return (
    <div className="gl-kg-explorer">
      <div className="gl-kg-explorer__heading">
        <span>Research model · explore a stage</span>
        <small>Conceptual flow, not a claim of end-to-end validation</small>
      </div>
      <div className="gl-kg-flow" role="group" aria-label="Explore SonicMap research stages">
        {stages.map((stage, index) => (
          <div className="gl-kg-flow__item" key={stage.id}>
            <button type="button" className="gl-kg-node" data-active={stage.id === active}
              aria-pressed={stage.id === active} onClick={() => setActive(stage.id)}>
              <span className="gl-kg-node__number">{stage.number}</span>
              <strong>{stage.label}</strong>
              <small>{stage.short}</small>
            </button>
            {index < stages.length - 1 ? <span className="gl-kg-flow__connector" aria-hidden="true">→</span> : null}
          </div>
        ))}
      </div>
      <div className="gl-kg-explorer__detail" aria-live="polite" key={selected.id}>
        <span>{selected.number} / 04 · {selected.label}</span>
        <strong>{selected.title}</strong>
        <p>{selected.detail}</p>
      </div>
    </div>
  )
}
