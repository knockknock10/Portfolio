const VARIANTS = {
  primary:
    'bg-accent text-bg font-medium hover:bg-accent-hover border border-transparent',
  secondary:
    'border border-line-hover text-fg bg-transparent hover:bg-panel',
  ghost:
    'border border-transparent text-muted hover:text-fg',
}

export default function Button({
  as: Tag = 'a',
  href,
  variant = 'primary',
  external = false,
  className = '',
  children,
  ...props
}) {
  const classes = [
    'inline-flex h-11 items-center justify-center gap-2 rounded-md px-5 text-sm',
    'transition-colors duration-200',
    VARIANTS[variant] ?? VARIANTS.primary,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const externalProps = external
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {}

  if (Tag === 'button') {
    return (
      <button type="button" className={classes} {...props}>
        {children}
      </button>
    )
  }

  return (
    <Tag href={href} className={classes} {...externalProps} {...props}>
      {children}
    </Tag>
  )
}
