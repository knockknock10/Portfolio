import type { Metadata } from "next"
import Link from "next/link"
import { OpenSourceOrganizations } from "@/components/sections/PortfolioExperience"
import { getRecentPublicPullRequests } from "@/lib/github.server"

export const metadata: Metadata = {
  title: "Open Source",
  description: "Organizations and upstream repositories where Sanjeev Kumar builds, tests and contributes.",
}

export default async function OpenSourcePage() {
  const activity = await getRecentPublicPullRequests()
  return (
    <main className="editorial-page open-source-page">
      <OpenSourceOrganizations />
      <section className="oss-activity" aria-labelledby="oss-activity-title">
        <header className="oss-activity-header">
          <p className="route-kicker">Public pull requests</p>
          <h2 id="oss-activity-title">The work, in context.</h2>
          <p>Recent public pull requests are loaded from GitHub and cached for an hour. Open each source to review the discussion and implementation.</p>
        </header>
        {activity.available && activity.items.length ? (
          <ol className="oss-pr-list">
            {activity.items.map((item) => (
              <li className="oss-pr-item" key={item.url}>
                <div className="oss-pr-main">
                  <p className="oss-pr-repo">{item.repository}</p>
                  <h3><Link href={item.url} target="_blank" rel="noreferrer">{item.title}</Link></h3>
                </div>
                <div className="oss-pr-meta">
                  <span className={"oss-pr-status" + (item.merged ? " is-merged" : item.state === "open" ? " is-open" : "")}>{item.merged ? "Merged" : item.state === "open" ? "Open" : "Closed"}</span>
                  {item.createdAt ? <time dateTime={item.createdAt}>{new Date(item.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" })}</time> : null}
                </div>
              </li>
            ))}
          </ol>
        ) : (
          <p className="oss-activity-note">The live feed is temporarily unavailable. <Link href="https://github.com/pulls?q=is%3Apr+author%3Aknockknock10" target="_blank" rel="noreferrer">Review all public pull requests on GitHub ↗</Link></p>
        )}
      </section>
    </main>
  )
}
