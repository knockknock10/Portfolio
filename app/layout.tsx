import type { Metadata } from "next"
import localFont from "next/font/local"
import { content } from "@/lib/content"
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

const brandName = content.identity.professionalName ?? content.identity.fullName
const socialLinks = (content.socials ?? []).flatMap((item) =>
  item.url && /^https?:\/\//i.test(item.url)
    ? [{ platform: item.platform, url: item.url }]
    : [],
)

export const metadata: Metadata = {
  title: brandName ?? undefined,
  icons: { icon: "/favicon.svg" },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={interTight.variable}>
        <SmoothScrollProvider>
          <Nav
            name={brandName}
            githubUrl={socialLinks.find((social) => social.platform === "GitHub")?.url ?? null}
          />
          <div className="site-shell">
            <RouteTransition>{children}</RouteTransition>
          </div>
          <Footer name={brandName} email={content.contact.email} socials={socialLinks} />
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
