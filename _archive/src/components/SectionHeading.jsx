/**
 * SectionHeading — straightforward headings with enough context to scan quickly.
 */
export default function SectionHeading({ title, intent, meta, heading: Heading = 'h2' }) {
  return (
    <header className="section-heading">
      {meta && <p className="section-meta">{meta}</p>}
      <Heading className="section-title">{title}</Heading>
      {intent && <p className="section-intent">{intent}</p>}
    </header>
  )
}
