import Section from './Section.jsx'
import SectionHeading from './SectionHeading.jsx'
import PendingNote from './PendingNote.jsx'
import Reveal from './Reveal.jsx'

/**
 * Reusable section shell used by every homepage section.
 * Renders the section frame; children provide the body.
 */
export default function SectionShell({ id, index, title, intent, meta, pending, children }) {
  return (
    <Section id={id}>
      <Reveal>
        <SectionHeading index={index} title={title} intent={intent} meta={meta} />
      </Reveal>
      <Reveal delay={80} className="mt-8 md:mt-10">
        {children ?? (pending ? <PendingNote>{pending}</PendingNote> : null)}
      </Reveal>
    </Section>
  )
}
