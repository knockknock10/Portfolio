import { Fragment } from 'react'

/**
 * Architecture / pipeline diagram rendered from structured data.
 * Two shapes, both honest to the underlying implementation:
 *  - rows:   chains of nodes (request path, event path, service boundaries)
 *  - stages: single ordered pipeline list
 * Thin borders, muted labels, one accent. Stacks vertically on mobile.
 */

function Arrow() {
  return (
    <li
      aria-hidden="true"
      className="flex shrink-0 items-center justify-center font-mono text-accent md:self-center"
    >
      <span className="md:hidden">↓</span>
      <span className="hidden md:inline">→</span>
    </li>
  )
}

function Node({ node, index }) {
  return (
    <li
      className="min-w-0 flex-1 rounded-xl bg-panel px-4 py-3"
      style={{ border: '1px solid rgba(255, 255, 255, 0.08)' }}
    >
      <span className="block font-mono text-[10px] tracking-[0.16em] text-accent uppercase">
        {String(index + 1).padStart(2, '0')}
      </span>
      <span className="mt-1.5 block text-sm font-semibold text-fg">{node.title}</span>
      {node.sub && (
        <span className="mt-0.5 block font-mono text-[11px] leading-snug text-muted">
          {node.sub}
        </span>
      )}
    </li>
  )
}

function RowChain({ row }) {
  return (
    <div>
      <p className="font-mono text-[11px] tracking-[0.18em] text-dim uppercase">
        {row.title}
      </p>
      <ol className="mt-3 flex flex-col items-stretch gap-2 md:flex-row md:items-stretch md:gap-3">
        {row.nodes.map((node, index) => (
          <Fragment key={node.title}>
            {index > 0 && <Arrow />}
            <Node node={node} index={index} />
          </Fragment>
        ))}
      </ol>
    </div>
  )
}

export default function ArchitectureDiagram({ diagram, label = 'Architecture diagram' }) {
  if (!diagram) return null

  if (diagram.stages) {
    return <PipelineList stages={diagram.stages} label={label} />
  }

  return (
    <figure aria-label={label} className="space-y-6">
      {diagram.rows.map((row) => (
        <RowChain key={row.title} row={row} />
      ))}
    </figure>
  )
}

function PipelineList({ stages, label }) {
  if (!stages?.length) return null
  return (
    <figure aria-label={label}>
      <ol className="mx-auto max-w-xl">
        {stages.map((stage, index) => (
          <li key={stage.title} className="flex items-stretch gap-4">
            <div className="flex flex-col items-center">
              <span
                className="flex size-6 shrink-0 items-center justify-center rounded-full bg-panel font-mono text-[10px] text-accent"
                style={{ border: '1px solid rgba(124, 131, 255, 0.3)' }}
              >
                {index + 1}
              </span>
              {index < stages.length - 1 && (
                <span aria-hidden="true" className="my-1 w-px flex-1 bg-line" />
              )}
            </div>
            <div
              className={`min-w-0 flex-1 rounded-xl bg-panel px-4 py-3 ${
                index < stages.length - 1 ? 'mb-2' : ''
              }`}
              style={{ border: '1px solid rgba(255, 255, 255, 0.08)' }}
            >
              <span className="block text-sm font-semibold text-fg">{stage.title}</span>
              {stage.sub && (
                <span className="mt-0.5 block font-mono text-[11px] leading-snug text-muted">
                  {stage.sub}
                </span>
              )}
            </div>
          </li>
        ))}
      </ol>
    </figure>
  )
}
