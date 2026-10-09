import Container from './Container.jsx'
import TextLink from './TextLink.jsx'
import { footer, profile } from '../data/profile.js'

export default function Footer() {
  const { github, linkedin, email, resume } = profile.links

  return (
    <footer className="site-footer">
      <Container className="flex flex-col gap-8 py-10 md:flex-row md:items-start md:justify-between md:py-12">
        <div className="max-w-sm">
          <p className="text-base font-semibold text-fg">{profile.name}</p>
          <p className="mt-2 text-sm leading-6 text-muted">{footer.availability}</p>
        </div>

        <nav aria-label="Footer" className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <TextLink href={github} external>GitHub</TextLink>
          {linkedin && <TextLink href={linkedin} external>LinkedIn</TextLink>}
          <TextLink href={`mailto:${email}`}>Email</TextLink>
          <TextLink href={resume}>Resume</TextLink>
        </nav>
      </Container>

      <Container className="site-footer-bottom flex flex-col gap-2 py-4 text-xs sm:flex-row sm:items-center sm:justify-between">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span>{footer.builtWith}</span>
      </Container>
    </footer>
  )
}
