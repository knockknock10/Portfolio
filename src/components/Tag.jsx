/**
 * Small monospace metadata chip — for tech tags, labels and status markers.
 */
export default function Tag({ as: TagElement = 'span', className = '', children, ...props }) {
  return (
    <TagElement
      className={`inline-flex items-center rounded border border-line bg-panel px-2 py-1 font-mono text-[11px] leading-none tracking-[0.1em] text-muted uppercase ${className}`}
      {...props}
    >
      {children}
    </TagElement>
  )
}
