import type { Metadata } from "next"
import localFont from "next/font/local"
import { getContent } from "@/lib/content.server"
import { Footer } from "@/components/Footer"
import { Nav } from "@/components/Nav"
import { RouteTransition } from "@/components/RouteTransition"
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider"
import "./globals.css"

const interTight = localFont({
  src: "../node_modules/@fontsource-variable/inter-tight/files/inter-tight-latin-wght-normal.woff2",
  variable: "--font-ui",
  display: "swap",
})

const content = getContent()
const brandName = content.identity.professionalName ?? content.identity.fullName ?? "Sanjeev Kumar"
const description =
  content.identity.tagline ??
  "Software engineering, open-source contributions, and applied AI by Sanjeev Kumar."
const socialLinks = (content.socials ?? []).flatMap((item) =>
  item.url && /^https?:\/\//i.test(item.url)
    ? [{ platform: item.platform, url: item.url }]
    : [],
)

export const metadata: Metadata = {
  title: {
    default: brandName,
    template: "%s | " + brandName,
  },
  description,
  applicationName: brandName,
  openGraph: {
    type: "website",
    title: brandName,
    description,
  },
  twitter: {
    card: "summary",
    title: brandName,
    description,
  },
  icons: { icon: "/favicon.svg" },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={interTight.variable}>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <SmoothScrollProvider>
          <Nav name={brandName} />
          <div id="main-content" tabIndex={-1} className="site-shell">
            <RouteTransition>{children}</RouteTransition>
          </div>
          <Footer
            name={brandName}
            copyrightName={content.identity.professionalName ?? content.identity.fullName}
            email={content.contact.email}
            socials={socialLinks}
          />
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
