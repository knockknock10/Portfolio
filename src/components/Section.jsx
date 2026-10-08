import Container from './Container.jsx'
import SectionHeading from './SectionHeading.jsx'

/**
 * Consistent section frame: hairline rule, shared vertical rhythm, aligned container.
 */
export default function Section({ id, children, className = '' }) {
  return (
    <section id={id} className={`scroll-mt-16 border-t border-line ${className}`}>
      <Container className="py-16 md:py-24 lg:py-28">{children}</Container>
    </section>
  )
}

export { SectionHeading }
