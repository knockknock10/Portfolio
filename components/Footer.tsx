import Link from "next/link"
import { VisitorCounter } from "@/components/sections/PortfolioExperience"

export type FooterSocial = {
  platform: string
  url: string
}

type FooterProps = {
  name: string | null
  copyrightName: string | null
  email: string | null
  socials: FooterSocial[]
}

export function Footer({ name, copyrightName, email, socials }: FooterProps) {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-identity">
          {name ? (
            <Link href="/" className="footer-name">
              {name}
            </Link>
          ) : null}
          {email ? (
            <a className="footer-email" href={"mailto:" + email}>
              {email}
            </a>
          ) : null}
        </div>

        <nav className="footer-navigation" aria-label="Explore portfolio">
          <Link href="/work">Work</Link>
          <Link href="/open-source">Open source</Link>
          <Link href="/signals">Activity</Link>
          <Link href="/problem-solving">Problem solving</Link>
          <Link href="/research">Research</Link>
          <Link href="/internships">Experience</Link>
          <Link href="/certifications">Certifications</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </nav>

        {socials.length > 0 ? (
          <nav className="footer-socials" aria-label="Social links">
            {socials.map((social) => (
              <a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noreferrer"
              >
                {social.platform.replace(/ profile$/i, "")}
              </a>
            ))}
          </nav>
        ) : null}

        <VisitorCounter />

        {copyrightName ? (
          <p className="footer-copyright">
            © {year} {copyrightName}
          </p>
        ) : null}
      </div>
    </footer>
  )
}
