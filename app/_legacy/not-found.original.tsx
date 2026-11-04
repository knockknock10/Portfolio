import Link from "next/link"

export default function NotFound() {
  return (
    <main className="route-shell editorial-page not-found-page">
      <p className="route-kicker">404 · Page not found</p>
      <h1 className="route-shell-title">This page went off the map.</h1>
      <p className="route-lede">
        The link may be outdated, or the page may have moved. Let’s get you back to something useful.
      </p>
      <div className="not-found-actions">
        <Link className="contact-email-link" href="/">Go home <span aria-hidden="true">↗</span></Link>
        <Link className="route-text-link" href="/work">Explore selected work <span aria-hidden="true">→</span></Link>
      </div>
    </main>
  )
}
