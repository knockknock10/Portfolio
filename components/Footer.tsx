import Link from "next/link"
import VisitorCounter from "@/components/portfolio/VisitorCounter"

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
    <>
      <VisitorCounter />
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
            <Link href="/">Home</Link>
            <Link href="/work">Work</Link>
            <Link href="/research">Research</Link>
            <Link href="/open-source">Open source</Link>
            <Link href="/internships">Experience</Link>
            <Link href="/skills">Skills</Link>
            <Link href="/problem-solving">Coding</Link>
            <Link href="/certifications">Achievements</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </nav>

          <section
            className="footer-support"
            aria-labelledby="footer-support-title"
            style={{
              gridColumn: "1 / -1",
              display: "grid",
              gap: "0.75rem",
              justifyItems: "start",
              width: "100%",
              marginTop: "1.5rem",
            }}
          >
            <div>
              <h2
                id="footer-support-title"
                style={{ margin: 0, fontSize: "1rem", fontWeight: 600 }}
              >
                Support my open-source work
              </h2>
              <p style={{ margin: "0.35rem 0 0", maxWidth: "38rem" }}>
                If something I build or contribute to has been useful, you can
                help me keep creating and contributing.
              </p>
            </div>
            <iframe
              src="https://github.com/sponsors/knockknock10/card"
              title="Sponsor Sanjeev Kumar on GitHub"
              width="600"
              height="225"
              loading="lazy"
              style={{
                display: "block",
                width: "100%",
                maxWidth: "600px",
                height: "225px",
                border: 0,
                borderRadius: "12px",
              }}
            />
            <a
              href="https://github.com/sponsors/knockknock10"
              target="_blank"
              rel="noreferrer"
              className="footer-email"
            >
              View GitHub Sponsors →
            </a>
          </section>

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

          {copyrightName ? (
            <p className="footer-copyright">
              © {year} {copyrightName}
            </p>
          ) : null}
        </div>
      </footer>
    </>
  )
}
