/**
 * Tag — quiet technical metadata label.
 */
export default function Tag({ as: TagElement = 'span', className = '', children, ...props }) {
  return (
    <TagElement
      className={[
        'inline-flex items-center border-b border-line px-0.5 pb-0.5',
        'font-mono text-[11px] leading-none text-dim',
        'transition-colors duration-150 hover:border-line-hover hover:text-fg',
        className,
      ]
        .filter(Boolean)
        .join(' ')
      }
      {...props}
    >
      {children}
    </TagElement>
  )
}
