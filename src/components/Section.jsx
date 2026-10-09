import Container from './Container.jsx'
import SectionHeading from './SectionHeading.jsx'

/**
 * Section frame — provides generous vertical rhythm and clean anchor scrolling.
 * No mechanical horizontal divider lines.
 */
export default function Section({ id, children, className = '' }) {
  return (
    <section
      id={id}
      className={`scroll-mt-24 relative ${className}`}
    >
      <Container className="py-16 md:py-20 lg:py-24">{children}</Container>
    </section>
  )
}

export { SectionHeading }
