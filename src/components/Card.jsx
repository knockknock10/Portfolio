/**
 * Card — a clean, solid content surface. Interactivity stays subtle and useful.
 */
export default function Card({
  as: Tag = 'div',
  interactive = false,
  className = '',
  children,
  ...props
}) {
  const classes = [
    'content-card rounded-xl p-6 sm:p-7',
    interactive ? 'content-card-interactive' : '',
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
