"use client"

import { useMemo, useState } from "react"
import type { UpstreamProject, UpstreamSummary } from "@/lib/upstream.server"
import { ArrowUpRight } from "./icons"
import { ContributionGraph } from "./ContributionGraph"
import { OrgLogo } from "./OrgLogo"
import { Reveal } from "./Reveal"

const PAGE = 6
const dateFormat = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" })

function formatDate(value: string | null) {
  if (!value) return ""
  const time = Date.parse(value)
  return Number.isFinite(time) ? dateFormat.format(time) : ""
}

function counts(project: Pick<UpstreamProject, "mergedCount" | "openCount">) {
  const parts: string[] = []
  if (project.mergedCount) parts.push(`${project.mergedCount} merged`)
  if (project.openCount) parts.push(`${project.openCount} open`)
  return parts.join(" · ")
}

export function OpenSourceGlass({ data, profileUrl }: { data: UpstreamSummary; profileUrl: string }) {
  const [selected, setSelected] = useState<string | null>(null)
  const [shown, setShown] = useState(PAGE)

  const rows = useMemo(() => {
    const all = data.projects.flatMap((project) =>
      project.pullRequests.map((pr) => ({ ...pr, owner: project.owner, project: project.name })),
    )
    all.sort((a, b) => (b.date ? Date.parse(b.date) : 0) - (a.date ? Date.parse(a.date) : 0))
    return selected ? all.filter((row) => row.owner === selected) : all
  }, [data.projects, selected])

  const chosen = data.projects.find((project) => project.owner === selected) ?? null

  return (
    <section className="sk-section" id="open-source" aria-labelledby="oss-title">
      <div className="sk-wrap">
        <Reveal>
          <div className="sk-head">
            <div>
              <p className="sk-eyebrow">Open source</p>
              <h2 className="sk-h2" id="oss-title">
                Organisations I&apos;ve contributed to
              </h2>
            </div>
            <p className="sk-lede">
              I send pull requests to projects I don&apos;t own, mostly tests, CI fixes, plugins and docs. Pick an
              organisation to see exactly what I did there.
            </p>
          </div>
        </Reveal>

        {data.available ? (
          <>
            <Reveal>
              <div className="sk-oss-totals gl-totals">
                <div className="gl-panel gl-totals__item">
                  <strong>{data.mergedCount}</strong>
                  <span>pull requests merged</span>
                </div>
                <div className="gl-panel gl-totals__item">
                  <strong>{data.openCount}</strong>
                  <span>open, in review</span>
                </div>
                <div className="gl-panel gl-totals__item">
                  <strong>{data.projectCount}</strong>
                  <span>organisations and projects</span>
                </div>
              </div>
            </Reveal>

            <Reveal>
              <ul className="gl-orgs" aria-label="Organisations">
                {data.own ? (
                  <li>
                    <a
                      className="gl-org gl-org--own"
                      data-tilt
                      href="https://github.com/Aevor"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <OrgLogo owner="Aevor" name="Aevor" />
                      <span className="gl-org__body">
                        <strong>Aevor</strong>
                        <small>My own organisation · {data.own.mergedCount} merged</small>
                      </span>
                      <ArrowUpRight />
                    </a>
                  </li>
                ) : null}
                {data.projects.map((project) => (
                  <li key={project.owner}>
                    <button
                      type="button"
                      className="gl-org"
                      data-tilt
                      aria-pressed={selected === project.owner}
                      onClick={() => {
                        setSelected(selected === project.owner ? null : project.owner)
                        setShown(PAGE)
                      }}
                    >
                      <OrgLogo owner={project.owner} name={project.name} />
                      <span className="gl-org__body">
                        <strong>{project.name}</strong>
                        <small>{counts(project)}</small>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal>
              <ContributionGraph profileUrl={profileUrl} />
            </Reveal>

            <Reveal>
              <div className="gl-panel gl-feed">
                <div className="gl-feed__head">
                  <div>
                    <h3>{chosen ? `${chosen.name} contributions` : "Recent contributions"}</h3>
                    <p>
                      {chosen
                        ? `${counts(chosen)}`
                        : "Merged and open pull requests across every project, newest first."}
                    </p>
                  </div>
                  {selected ? (
                    <button type="button" className="gl-chip-button" onClick={() => setSelected(null)}>
                      Show all organisations
                    </button>
                  ) : null}
                </div>

                <ul className="gl-feed__list">
                  {rows.slice(0, shown).map((pr) => (
                    <li key={pr.id}>
                      <a className="sk-pr gl-pr" href={pr.url} target="_blank" rel="noreferrer">
                        <OrgLogo owner={pr.owner} name={pr.project} size={32} />
                        <span className="sk-pr__title">
                          {pr.title}
                          <span className="sk-pr__repo">
                            {pr.project} · {pr.repository} #{pr.number}
                          </span>
                        </span>
                        <span className="sk-pr__status" data-status={pr.status}>
                          {pr.status === "merged" ? "Merged" : "Open"}
                        </span>
                        <span className="sk-pr__date">{formatDate(pr.date)}</span>
                      </a>
                    </li>
                  ))}
                </ul>

                {rows.length > shown ? (
                  <button type="button" className="sk-btn sk-btn--small" onClick={() => setShown(shown + PAGE)}>
                    Show {Math.min(PAGE, rows.length - shown)} more of {rows.length - shown}
                  </button>
                ) : null}
              </div>
            </Reveal>

            <Reveal>
              <p className="sk-note">
                {data.own
                  ? `I'm also building Aevor, where ${data.own.mergedCount} pull requests have been merged. Those aren't counted above. `
                  : ""}
                Closed pull requests that were not merged are left out. Counts were generated when this site was built
                {data.generatedAt ? ` (${formatDate(data.generatedAt)})` : ""}.{" "}
                <a className="sk-text-link" href={profileUrl} target="_blank" rel="noreferrer">
                  Full history on GitHub <ArrowUpRight />
                </a>
              </p>
            </Reveal>
          </>
        ) : (
          <>
            <Reveal>
              <ContributionGraph profileUrl={profileUrl} />
            </Reveal>
            <Reveal>
              <p className="sk-note">
                The pull-request index couldn&apos;t be loaded when this site was built.{" "}
                <a className="sk-text-link" href={profileUrl} target="_blank" rel="noreferrer">
                  See my pull requests on GitHub <ArrowUpRight />
                </a>
              </p>
            </Reveal>
          </>
        )}
      </div>
    </section>
  )
}
