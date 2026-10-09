export default function TextLink({
  as: Tag = 'a',
  href,
  external = false,
  className = '',
  children,
  ...props
}) {
  const externalProps = external
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {}

  return (
    <Tag
      href={href}
      className={`group inline-flex items-center gap-1.5 text-sm text-muted underline-offset-4 transition-colors duration-200 hover:text-fg hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded-sm ${className}`}
      {...externalProps}
      {...props}
    >
      <span>{children}</span>
      {external && (
        <svg
          aria-hidden="true"
          viewBox="0 0 12 12"
          className="size-3 shrink-0 text-dim transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-fg"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M3.5 8.5 8.5 3.5M4.5 3.5h4v4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </Tag>
  )
}
