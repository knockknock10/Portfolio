/**
 * Card — restrained liquid surface with a local specular highlight on pointer movement.
 */
export default function Card({
  as: Tag = 'div',
  interactive = false,
  className = '',
  children,
  ...props
}) {
  const handlePointerMove = (event) => {
    if (event.pointerType === 'touch') return
    const rect = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty('--card-glass-x', `${event.clientX - rect.left}px`)
    event.currentTarget.style.setProperty('--card-glass-y', `${event.clientY - rect.top}px`)
  }

  const classes = [
    'glass-card rounded-2xl p-6 sm:p-7',
    interactive ? 'glass-card-interactive cursor-pointer' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <Tag className={classes} onPointerMove={handlePointerMove} {...props}>
      {children}
    </Tag>
  )
}
