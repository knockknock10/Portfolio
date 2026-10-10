import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Open Source",
  description: "Explore Sanjeev Kumar's open-source focus and recent public pull requests.",
}

import { getRecentPublicPullRequests } from "@/lib/github.server"

const contributions = [
  {
    number: "01",
    name: "Kestra · Databricks plugin",
    kind: "Plugin engineering",
    description:
      "Working through integration-level changes, CI feedback, and the details that make workflow plugins reliable for real users.",
    repository: "https://github.com/kestra-io/plugin-databricks",
    repositoryLabel: "Upstream repository",
  },
  {
    number: "02",
    name: "Apache Camel K",
    kind: "Cloud-native integration",
    description:
      "Learning in a large open-source codebase by investigating build workflows, tests, and issue-driven maintenance.",
    repository: "https://github.com/apache/camel-k",
    repositoryLabel: "Upstream repository",
  },
  {
    number: "03",
    name: "Ansvisor",
    kind: "Developer tooling",
    description:
      "A personal open-source project that I use to practice shipping software, solving real implementation problems, and improving developer workflows.",
    repository: "https://github.com/knockknock10/ansvisor",
    repositoryLabel: "My repository",
  },
]

export default async function OpenSourcePage() {
  const activity = await getRecentPublicPullRequests()

  return (
    <main className="route-shell editorial-page open-source-page">
      <header className="route-intro">
        <p className="route-kicker">Open source</p>
        <h1 className="route-shell-title">Learn in the open. Improve the work.</h1>
        <p className="route-lede">
          I contribute by understanding an issue, reproducing it, making a focused change,
          and working through the feedback that makes a patch production-ready.
        </p>
      </header>

      <section className="oss-list" aria-label="Open-source projects and current focus">
        {contributions.map((item) => (
          <article className="oss-item" key={item.number}>
            <span className="oss-number">{item.number}</span>
            <div className="oss-copy">
              <p className="oss-kind">{item.kind}</p>
              <h2>{item.name}</h2>
              <p>{item.description}</p>
            </div>
            <Link href={item.repository} target="_blank" rel="noreferrer" className="oss-link">
              {item.repositoryLabel} <span aria-hidden="true">↗</span>
            </Link>
          </article>
        ))}
      </section>

      <section className="oss-activity" aria-labelledby="oss-activity-title">
        <header className="oss-activity-header">
          <p className="route-kicker">Recent activity</p>
          <h2 id="oss-activity-title">Open source, in practice.</h2>
          <p>Recent public pull requests are loaded from GitHub on the server and cached for an hour.</p>
        </header>
        {activity.available ? (
          activity.items.length > 0 ? (
            <ol className="oss-pr-list">
              {activity.items.map((item) => (
                <li className="oss-pr-item" key={item.url}>
                  <div className="oss-pr-main">
                    <p className="oss-pr-repo">{item.repository}</p>
                    <h3>
                      <Link href={item.url} target="_blank" rel="noreferrer">{item.title}</Link>
                    </h3>
                  </div>
                  <div className="oss-pr-meta">
                    <span className={"oss-pr-status" + (item.merged ? " is-merged" : item.state === "open" ? " is-open" : "")}>
                      {item.merged ? "Merged" : item.state === "open" ? "Open" : "Closed"}
                    </span>
                    {item.createdAt ? (
                      <time dateTime={item.createdAt}>
                        {new Date(item.createdAt).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                          timeZone: "UTC",
                        })}
                      </time>
                    ) : null}
                  </div>
                </li>
              ))}
            </ol>
          ) : (
            <p className="oss-activity-note">No public pull requests were returned for this profile.</p>
          )
        ) : (
          <p className="oss-activity-note">
            The live feed is temporarily unavailable. You can still inspect the current record on{" "}
            <Link href="https://github.com/pulls?q=is%3Apr+author%3Aknockknock10" target="_blank" rel="noreferrer">GitHub</Link>.
          </p>
        )}
      </section>

      <section className="oss-proof" aria-labelledby="oss-proof-title">
        <div>
          <p className="route-kicker">Contribution history</p>
          <h2 id="oss-proof-title">Review the real work.</h2>
          <p>
            Pull requests, review discussions, and issue activity are the source of truth.
            I don’t present unmerged work as merged, or guess at contribution statistics.
          </p>
        </div>
        <div className="oss-proof-links">
          <Link href="https://github.com/knockknock10?tab=activity" target="_blank" rel="noreferrer">
            GitHub activity <span aria-hidden="true">↗</span>
          </Link>
          <Link href="https://github.com/pulls?q=is%3Apr+author%3Aknockknock10" target="_blank" rel="noreferrer">
            Pull requests <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </main>
  )
}
