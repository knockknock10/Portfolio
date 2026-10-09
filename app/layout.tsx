import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"

const interTight = localFont({
  src: "../node_modules/@fontsource-variable/inter-tight/files/inter-tight-latin-wght-normal.woff2",
  variable: "--font-ui",
  display: "swap",
})

export const metadata: Metadata = {
  icons: { icon: "/favicon.svg" },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={interTight.variable}>{children}</body>
    </html>
  )
}
