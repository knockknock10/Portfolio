export default function Card({
  as: Tag = 'div',
  interactive = false,
  className = '',
  children,
  ...props
}) {
  const classes = [
    'rounded-lg border bg-panel p-6 transition-colors duration-300',
    interactive ? 'border-line hover:border-line-hover' : 'border-line',
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
