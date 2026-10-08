import Container from './Container.jsx'
import TextLink from './TextLink.jsx'
import { footer, profile } from '../data/profile.js'

export default function Footer() {
  const { github, linkedin, email, resume } = profile.links

  return (
    <footer className="border-t border-line">
      <Container className="flex flex-col gap-8 py-12 md:flex-row md:items-start md:justify-between md:py-16">
        <div className="max-w-sm">
          <p className="font-mono text-[13px] font-medium tracking-[0.2em] text-fg">
            {profile.wordmark}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted">{footer.availability}</p>
        </div>

        <nav aria-label="Footer" className="flex flex-wrap items-center gap-x-7 gap-y-3">
          <TextLink href={github} external>
            GitHub
          </TextLink>
          {linkedin && (
            <TextLink href={linkedin} external>
              LinkedIn
            </TextLink>
          )}
          <TextLink href={`mailto:${email}`}>Email</TextLink>
          <TextLink href={resume}>Resume</TextLink>
        </nav>
      </Container>

      <Container className="flex flex-col gap-2 border-t border-line py-6 font-mono text-[11px] tracking-[0.08em] text-dim sm:flex-row sm:items-center sm:justify-between">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span>{footer.builtWith}</span>
      </Container>
    </footer>
  )
}
