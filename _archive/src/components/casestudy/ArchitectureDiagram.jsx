import { Fragment } from 'react'

/**
 * Text-first architecture and pipeline diagrams.
 * Keep the sequence easy to scan; use borders and spacing instead of dashboard tiles.
 */

function Arrow() {
  return (
    <li aria-hidden="true" className="architecture-arrow">
      <span className="md:hidden">↓</span>
      <span className="hidden md:inline">→</span>
    </li>
  )
}

function Node({ node, index }) {
  return (
    <li className="architecture-node">
      <span className="architecture-node-index">{String(index + 1).padStart(2, '0')}</span>
      <div className="min-w-0">
        <span className="architecture-node-title">{node.title}</span>
        {node.sub && <span className="architecture-node-sub">{node.sub}</span>}
      </div>
    </li>
  )
}

function RowChain({ row }) {
  return (
    <div className="architecture-row">
      <p className="architecture-row-title">{row.title}</p>
      <ol className="architecture-row-nodes">
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

  if (diagram.stages) return <PipelineList stages={diagram.stages} label={label} />

  return (
    <figure aria-label={label} className="space-y-8">
      {diagram.rows.map((row) => <RowChain key={row.title} row={row} />)}
    </figure>
  )
}

function PipelineList({ stages, label }) {
  if (!stages?.length) return null

  return (
    <figure aria-label={label} className="pipeline-list">
      <ol>
        {stages.map((stage, index) => (
          <li key={stage.title} className="pipeline-stage">
            <span className="pipeline-stage-number">{String(index + 1).padStart(2, '0')}</span>
            <div className="min-w-0 flex-1">
              <p className="pipeline-stage-title">{stage.title}</p>
              {stage.sub && <p className="pipeline-stage-sub">{stage.sub}</p>}
            </div>
          </li>
        ))}
      </ol>
    </figure>
  )
}
