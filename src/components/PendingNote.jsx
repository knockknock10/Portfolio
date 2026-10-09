/**
 * Explicit placeholder marker — makes it unambiguous that structured content
 * (projects, contributions, metrics) arrives in a later phase. Never used for real data.
 */
export default function PendingNote({ children }) {
  return (
    <div
      className="flex items-start gap-3 rounded-xl px-5 py-5"
      style={{ border: '1px dashed rgba(255, 255, 255, 0.12)' }}
    >
      <span aria-hidden="true" className="font-mono text-xs text-accent">
        //
      </span>
      <p className="font-mono text-xs leading-relaxed text-dim">{children}</p>
    </div>
  )
}
