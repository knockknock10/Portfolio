/**
 * Button — shared interaction primitive with tactile feedback.
 */

const VARIANTS = {
  primary: [
    'glass-btn-primary text-white font-medium',
    'rounded-xl px-5 h-11',
  ].join(' '),

  secondary: [
    'glass-btn-secondary text-fg font-medium',
    'rounded-xl px-5 h-11',
  ].join(' '),

  glass: [
    'glass-pill text-fg hover:border-cyan/40 hover:text-white',
    'rounded-xl px-5 h-11',
  ].join(' '),

  ghost: [
    'text-muted hover:text-white hover:bg-white/[0.06]',
    'rounded-xl px-4 h-11',
  ].join(' '),
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
    'inline-flex items-center justify-center gap-2 text-[14px] font-medium select-none',
    'transition-all duration-200 ease-out',
    'active:scale-[0.98]',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2',
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
