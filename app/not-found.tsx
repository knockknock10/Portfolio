import Link from "next/link"

export default function NotFound() {
  return (
    <main className="sk-notfound">
      <p className="sk-eyebrow">404</p>
      <h1>That page doesn&apos;t exist.</h1>
      <p>The link may be old, or the page may have moved. The whole portfolio is on the home page now.</p>
      <div className="sk-hero__actions">
        <Link className="sk-btn sk-btn--solid" href="/">
          Back to home
        </Link>
      </div>
    </main>
  )
}

// ---------------------------------------------------------------------------
// Previous 404 page (kept for reference, not in use)
// ---------------------------------------------------------------------------
// import Link from "next/link"
//
// export default function NotFound() {
//   return (
//     <main className="route-shell editorial-page not-found-page">
//       <p className="route-kicker">404 · Page not found</p>
//       <h1 className="route-shell-title">This page went off the map.</h1>
//       <p className="route-lede">
//         The link may be outdated, or the page may have moved. Let’s get you back to something useful.
//       </p>
//       <div className="not-found-actions">
//         <Link className="contact-email-link" href="/">Go home <span aria-hidden="true">↗</span></Link>
//         <Link className="route-text-link" href="/work">Explore selected work <span aria-hidden="true">→</span></Link>
//       </div>
//     </main>
//   )
// }
