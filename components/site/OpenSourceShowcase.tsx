"use client"

import { useMemo } from "react"
import type { UpstreamSummary } from "@/lib/upstream.server"
import { CountUp } from "./CountUp"
import { OrgLogo } from "./OrgLogo"
import { useLiveGithub } from "./useLiveGithub"

const fmt = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" })
const when = (v: string | null) => {
  const t = v ? Date.parse(v) : NaN
  return Number.isFinite(t) ? fmt.format(t) : ""
}
const FX = ["fx-left", "fx-zoom", "fx-right"]

/**
 * Open source, edited down: the numbers, then only the three projects with the most merged work.
 * Everything else sits behind one link to GitHub instead of a wall of other people's repositories.
 */
export function OpenSourceShowcase({ data: snapshot, profileUrl }: { data: UpstreamSummary; profileUrl: string }) {
  const live = useLiveGithub()
  const data = live?.upstream ?? snapshot
  const best = useMemo(() => [...data.projects].sort((a, b) => b.mergedCount - a.mergedCount).slice(0, 3), [data.projects])

  return (
    <section className="gl-oss" id="open-source" aria-labelledby="oss-title">
      <div className="sk-wrap">
        <header className="gl-oss__head fx-clip">
          <p className="sk-eyebrow">Open source</p>
          <h2 id="oss-title">Fixes that got merged.</h2>
          <p>
            Pull requests I have sent to projects other teams maintain. The three where most of my work landed come first, then every other project.
            Each one links straight to the review, so you can read the code and the feedback yourself.
          </p>
        </header>

        {data.available ? (
          <>
            <div className="gl-oss__stats gl-pane fx-zoom">
              <div><strong><CountUp value={data.mergedCount} /></strong><span>pull requests merged</span></div>
              <div><strong><CountUp value={data.openCount} /></strong><span>in review right now</span></div>
              <div><strong><CountUp value={data.projectCount} /></strong><span>projects contributed to</span></div>
            </div>

            <div className="gl-oss__cards">
              {best.map((project, i) => (
                <article key={project.owner} className={`gl-oss__card gl-pane ${FX[i % 3]}`}>
                  <div className="gl-oss__who">
                    <OrgLogo owner={project.owner} name={project.name} size={44} />
                    <div>
                      <h3>{project.name}</h3>
                      <p>{project.mergedCount} merged{project.openCount ? ` · ${project.openCount} open` : ""}</p>
                    </div>
                  </div>
                  <ul>
                    {project.pullRequests.slice(0, 3).map((pr) => (
                      <li key={pr.id}>
                        <a href={pr.url} target="_blank" rel="noreferrer">
                          <span className="gl-oss__pr">{pr.title}</span>
                          <span className="gl-oss__meta">
                            <b data-status={pr.status}>{pr.status === "merged" ? "Merged" : "Open"}</b>
                            {when(pr.date)}
                            <i aria-hidden="true">↗</i>
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                  <a className="gl-oss__all" href={project.searchUrl} target="_blank" rel="noreferrer">All {project.name} pull requests ↗</a>
                </article>
              ))}
            </div>

            <div className="gl-oss__wall fx-clip">
              <h3>Every project I have contributed to</h3>
              <ul>
                {data.own ? (
                  <li>
                    <a href={`https://github.com/${data.own.owner}`} target="_blank" rel="noreferrer" data-own="true">
                      <OrgLogo owner={data.own.owner} name="Aevor" size={56} />
                      <b>Aevor</b>
                      <span>My organisation · {data.own.mergedCount} merged</span>
                    </a>
                  </li>
                ) : null}
                {data.projects.map((project) => (
                  <li key={project.owner}>
                    <a href={project.searchUrl} target="_blank" rel="noreferrer">
                      <OrgLogo owner={project.owner} name={project.name} size={56} />
                      <b>{project.name}</b>
                      <span>{project.mergedCount ? `${project.mergedCount} merged` : ""}{project.mergedCount && project.openCount ? " · " : ""}{project.openCount ? `${project.openCount} open` : ""}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <p className="gl-oss__foot fx-clip">
              <a href={profileUrl} target="_blank" rel="noreferrer">The full history is on GitHub ↗</a>
              {data.own ? <span> · My own organisation, Aevor, has {data.own.mergedCount} merged pull requests of its own.</span> : null}
            </p>
          </>
        ) : (
          <p className="gl-oss__foot">
            The contribution figures are not available right now. <a href={profileUrl} target="_blank" rel="noreferrer">See them on GitHub ↗</a>
          </p>
        )}
      </div>
    </section>
  )
}
