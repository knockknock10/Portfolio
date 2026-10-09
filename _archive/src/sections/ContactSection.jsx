import SectionShell from '../components/SectionShell.jsx'
import Button from '../components/Button.jsx'
import { contact, profile, sections } from '../data/profile.js'

const config = sections.find((section) => section.id === 'contact')

export default function ContactSection() {
  return (
    <SectionShell {...config}>
      <div className="max-w-2xl">
        <p className="text-lg leading-relaxed text-muted">{contact.body}</p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Button as="a" href={contact.primaryCta.href} variant="primary">
            {contact.primaryCta.label}
          </Button>
          <Button as="a" href={profile.links.github} external variant="secondary">
            GitHub
          </Button>
        </div>
        <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.18em] text-dim">
          {profile.links.email}
        </p>
      </div>
    </SectionShell>
  )
}
