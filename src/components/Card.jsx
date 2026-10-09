/**
 * Card — shared panel surface with clear hierarchy and readable text.
 */
export default function Card({
  as: Tag = 'div',
  interactive = false,
  className = '',
  children,
  ...props
}) {
  const classes = [
    'glass-card rounded-2xl p-6 sm:p-7',
    interactive
      ? 'cursor-pointer hover:-translate-y-1'
      : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <Tag className={classes} {...props}>
      {children}
    </Tag>
  )
}
