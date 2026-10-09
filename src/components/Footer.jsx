import Container from './Container.jsx'
import TextLink from './TextLink.jsx'
import { footer, profile } from '../data/profile.js'

export default function Footer() {
  const { github, linkedin, email, resume } = profile.links

  return (
    <footer
      className="mt-8"
      style={{ borderTop: '1px solid rgba(255, 255, 255, 0.07)' }}
    >
      {/* Ambient glow above footer */}
      <div
        aria-hidden="true"
        className="h-px w-full"
        style={{
          background:
            'linear-gradient(to right, transparent, rgba(124,131,255,0.20), transparent)',
        }}
      />

      <Container className="flex flex-col gap-8 py-12 md:flex-row md:items-start md:justify-between md:py-14">
        <div className="max-w-xs">
          <p className="font-mono text-[12px] font-semibold tracking-[0.22em] text-fg uppercase">
            {profile.wordmark}
          </p>
          <p className="mt-3 text-[13px] leading-relaxed text-muted">{footer.availability}</p>
        </div>

        <nav aria-label="Footer" className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <TextLink href={github} external>GitHub</TextLink>
          {linkedin && (
            <TextLink href={linkedin} external>LinkedIn</TextLink>
          )}
          <TextLink href={`mailto:${email}`}>Email</TextLink>
          <TextLink href={resume}>Resume</TextLink>
        </nav>
      </Container>

      <Container
        className="flex flex-col gap-2 py-5 font-mono text-[10px] tracking-[0.1em] text-dim sm:flex-row sm:items-center sm:justify-between"
        style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}
      >
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span>{footer.builtWith}</span>
      </Container>
    </footer>
  )
}
