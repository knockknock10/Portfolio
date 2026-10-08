import { useEffect, useRef } from 'react'

/**
 * One-shot scroll reveal (fade + slight rise). Respects prefers-reduced-motion.
 * Stagger via the `delay` prop — never loops, and never hides content permanently:
 * if observers are unavailable (or motion is reduced) the element is shown immediately.
 */
export default function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...props }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined

    const show = () => el.classList.add('is-visible')

    if (
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      show()
      return undefined
    }

    if (typeof IntersectionObserver === 'undefined') {
      show()
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            show()
            observer.disconnect()
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={`reveal ${className}`}
      {...props}
    >
      {children}
    </Tag>
  )
}
