import type { UpstreamProject, UpstreamPullRequest, UpstreamSummary } from "@/lib/upstream.server"
import { ArrowUpRight } from "./icons"
import { Reveal } from "./Reveal"

const PREVIEW_COUNT = 3
const dateFormat = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" })

function formatDate(value: string | null) {
  if (!value) return ""
  const time = Date.parse(value)
  return Number.isFinite(time) ? dateFormat.format(time) : ""
}

function PullRequestRow({ pr }: { pr: UpstreamPullRequest }) {
  return (
    <li>
      <a className="sk-pr" href={pr.url} target="_blank" rel="noreferrer">
        <span className="sk-pr__status" data-status={pr.status}>
          {pr.status === "merged" ? "Merged" : "Open"}
        </span>
        <span className="sk-pr__title">
          {pr.title}
          <span className="sk-pr__repo">
            {pr.repository} #{pr.number}
          </span>
        </span>
        <span className="sk-pr__date">{formatDate(pr.date)}</span>
      </a>
    </li>
  )
}

function counts(project: UpstreamProject) {
  const parts = []
  if (project.mergedCount) parts.push(`${project.mergedCount} merged`)
  if (project.openCount) parts.push(`${project.openCount} open`)
  return parts.join(" · ")
}

export function OpenSource({ data, profileUrl }: { data: UpstreamSummary; profileUrl: string }) {
  return (
    <section className="sk-section sk-section--tint" id="open-source" aria-labelledby="oss-title">
      <div className="sk-wrap">
        <Reveal>
          <div className="sk-head">
            <div>
              <p className="sk-eyebrow">Open source</p>
              <h2 className="sk-h2" id="oss-title">
                Work in other people&apos;s code
              </h2>
            </div>
            <p className="sk-lede">
              I send pull requests to projects I don&apos;t own, mostly tests, CI fixes, plugins and docs. Here is what has
              been merged, and what is still waiting on review.
            </p>
          </div>
        </Reveal>

        {data.available ? (
          <>
            <Reveal>
              <div className="sk-oss-totals">
                <div>
                  <strong>{data.mergedCount}</strong>
                  <span>pull requests merged</span>
                </div>
                <div>
                  <strong>{data.openCount}</strong>
                  <span>open, in review</span>
                </div>
                <div>
                  <strong>{data.projectCount}</strong>
                  <span>projects</span>
                </div>
              </div>
            </Reveal>

            <div>
              {data.projects.map((project) => {
                const preview = project.pullRequests.slice(0, PREVIEW_COUNT)
                const rest = project.pullRequests.slice(PREVIEW_COUNT)
                return (
                  <Reveal key={project.owner}>
                    <article className="sk-oss">
                      <div className="sk-oss__head">
                        <h3 className="sk-oss__name">{project.name}</h3>
                        <span className="sk-oss__counts">{counts(project)}</span>
                      </div>
                      <ul>
                        {preview.map((pr) => (
                          <PullRequestRow key={pr.id} pr={pr} />
                        ))}
                      </ul>
                      {rest.length ? (
                        <details className="sk-more">
                          <summary>Show {rest.length} more</summary>
                          <ul>
                            {rest.map((pr) => (
                              <PullRequestRow key={pr.id} pr={pr} />
                            ))}
                          </ul>
                        </details>
                      ) : null}
                    </article>
                  </Reveal>
                )
              })}
            </div>

            <Reveal>
              <p className="sk-note">
                {data.own
                  ? `I'm also building Aevor, my own organisation, where ${data.own.mergedCount} pull requests have been merged. Those are not counted above. `
                  : ""}
                Closed pull requests that were not merged are left out. Counts were generated when this site was last built
                {data.generatedAt ? ` (${formatDate(data.generatedAt)})` : ""}.{" "}
                <a className="sk-text-link" href={profileUrl} target="_blank" rel="noreferrer">
                  Full history on GitHub <ArrowUpRight />
                </a>
              </p>
            </Reveal>
          </>
        ) : (
          <Reveal>
            <p className="sk-note">
              The pull-request index couldn&apos;t be loaded when this site was built.{" "}
              <a className="sk-text-link" href={profileUrl} target="_blank" rel="noreferrer">
                See my pull requests on GitHub <ArrowUpRight />
              </a>
            </p>
          </Reveal>
        )}
      </div>
    </section>
  )
}
