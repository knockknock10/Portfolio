import { Intro } from "@/components/site/Intro"
import type { Metadata } from "next"
import localFont from "next/font/local"
import { getContent } from "@/lib/content.server"
import { publicUrl } from "@/lib/public-url"
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider"
import "./site.css"
import "./glass.css"
import "./portfolio-polish.css"
import "./portfolio-interactions.css"
import "./portfolio-experience.css"

const interTight = localFont({
  src: "../node_modules/@fontsource-variable/inter-tight/files/inter-tight-latin-wght-normal.woff2",
  variable: "--font-ui",
  display: "swap",
})

const content = getContent()
const brandName = content.identity.professionalName ?? content.identity.fullName ?? "Sanjeev Kumar"
const description =
  "Sanjeev Kumar is a computer science student who builds backend systems, contributes to open-source projects and researches speech watermarking."

export const metadata: Metadata = {
  metadataBase: new URL("https://knockknock10.github.io/Portfolio/"),
  title: {
    default: brandName + " | Software engineer",
    template: "%s | " + brandName,
  },
  description,
  applicationName: brandName,
  openGraph: {
    type: "website",
    title: brandName + " | Software engineer",
    description,
    images: [{ url: publicUrl("/images/og.png"), width: 1200, height: 630, alt: brandName + ", software engineer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: brandName + " | Software engineer",
    description,
    images: [publicUrl("/images/og.png")],
  },
  icons: { icon: publicUrl("/favicon.svg") },
}

// Structured data so search engines and link previews know who this page is about.
const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Sanjeev Kumar",
  jobTitle: "Software engineer (student)",
  affiliation: { "@type": "CollegeOrUniversity", name: "SRM University AP" },
  url: "https://knockknock10.github.io/Portfolio/",
  sameAs: [
    "https://github.com/knockknock10",
    "https://www.linkedin.com/in/sanjeev-kumar-ba567133a/",
  ],
  knowsAbout: ["Backend engineering", "Open source", "Speech watermarking", "Go", "Java", "Python"],
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={interTight.variable} suppressHydrationWarning>
      <head>
        {/* Plays the short opening curtain once per browser session; no-op without JS or storage. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(!sessionStorage.getItem('gl-intro')&&!matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.dataset.intro='play';sessionStorage.setItem('gl-intro','1')}}catch(e){}",
          }}
        />
      </head>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }} />
        {/* Earlier version: a plain curtain
        <div className="gl-intro" aria-hidden="true"><span>Sanjeev Kumar</span></div> */}
        <Intro />
        <a className="sk-skip" href="#main-content">
          Skip to content
        </a>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  )
}

/* ---------------------------------------------------------------------------
   Previous layout (kept for reference, not in use). It loaded globals.css,
   portfolio-scene.css, the cinematic intro, the old chrome and the old footer.
--------------------------------------------------------------------------- */

// import type { Metadata } from "next"
// import type { CSSProperties } from "react"
// import localFont from "next/font/local"
// import { getContent } from "@/lib/content.server"
// import { publicUrl } from "@/lib/public-url"
// import { Footer } from "@/components/Footer"
// import CinematicIntro from "@/components/intro/CinematicIntro"
// import PortfolioChrome from "@/components/portfolio/PortfolioChrome"
// import { RouteTransition } from "@/components/RouteTransition"
// import { SmoothScrollProvider } from "@/components/SmoothScrollProvider"
// import "./globals.css"
// import "./portfolio-scene.css"
//
// const interTight = localFont({
//   src: "../node_modules/@fontsource-variable/inter-tight/files/inter-tight-latin-wght-normal.woff2",
//   variable: "--font-ui",
//   display: "swap",
// })
//
// const content = getContent()
// const brandName = content.identity.professionalName ?? content.identity.fullName ?? "Sanjeev Kumar"
// const description =
//   content.identity.tagline ??
//   "Software engineering, open-source contributions, and applied AI by Sanjeev Kumar."
// const rootStyle = {
//   "--hero-scene-url": `url("${publicUrl("/images/hero-scene.webp")}")`,
// } as CSSProperties
//
// const socialLinks = (content.socials ?? []).flatMap((item) =>
//   item.url && /^https?:\/\//i.test(item.url)
//     ? [{ platform: item.platform, url: item.url }]
//     : [],
// )
//
// export const metadata: Metadata = {
//   metadataBase: new URL("https://knockknock10.github.io/Portfolio/"),
//   title: {
//     default: brandName,
//     template: "%s | " + brandName,
//   },
//   description,
//   applicationName: brandName,
//   openGraph: {
//     type: "website",
//     title: brandName,
//     description,
//   },
//   twitter: {
//     card: "summary",
//     title: brandName,
//     description,
//   },
//   icons: { icon: publicUrl("/favicon.svg") },
// }
//
// export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
//   return (
//     <html lang="en">
//       <body className={interTight.variable} style={rootStyle}>
//         <a className="skip-link" href="#main-content">Skip to content</a>
//         <SmoothScrollProvider>
//           <CinematicIntro />
//           <PortfolioChrome />
//           <div id="main-content" tabIndex={-1} className="site-shell">
//             <RouteTransition>{children}</RouteTransition>
//           </div>
//           <Footer
//             name={brandName}
//             copyrightName={content.identity.professionalName ?? content.identity.fullName}
//             email={content.contact.email}
//             socials={socialLinks}
//           />
//         </SmoothScrollProvider>
//       </body>
//     </html>
//   )
// }
