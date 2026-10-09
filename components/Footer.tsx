import Link from "next/link"

export type FooterSocial = {
  platform: string
  url: string
}

type FooterProps = {
  name: string | null
  email: string | null
  socials: FooterSocial[]
}

export function Footer({ name, email, socials }: FooterProps) {
  const copyrightName = name
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

        {socials.length > 0 ? (
          <nav className="footer-socials" aria-label="Social links">
            {socials.map((social) => (
              <a key={social.platform} href={social.url} target="_blank" rel="noreferrer">
                {social.platform}
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
  )
}
