"use client"

import { Reveal } from "./Reveal"
import { useLiveGithub } from "./useLiveGithub"

type Props = { merged: number | null; orgs: number | null; projectCount: number }

/**
 * A quick read for someone with thirty seconds: one plain-language sentence, then four proof points that each
 * jump to the section that backs them up. Numbers come from the same upstream index as the hero.
 */
export function Glance({ merged: builtMerged, orgs: builtOrgs, projectCount }: Props) {
  const live = useLiveGithub()
  const merged = live ? live.upstream.mergedCount : builtMerged
  const orgs = live ? live.upstream.projectCount : builtOrgs
  const tiles = [
    merged !== null && orgs !== null
      ? { n: String(merged), t: "fixes accepted into other teams' open-source projects", s: `across ${orgs} projects`, href: "#open-source" }
      : null,
    { n: "1", t: "first-author research paper on protecting speech audio", s: "submitted, not yet published", href: "#research" },
    { n: String(projectCount), t: "projects I am building or have shipped", s: "one live on the web", href: "#work" },
    { n: "3", t: "coding platforms where I practise: LeetCode, Codeforces and HackerRank", s: "profiles and ratings inside", href: "#profiles" },
  ].filter((x): x is { n: string; t: string; s: string; href: string } => x !== null)

  return (
    <section className="gl-glance" aria-labelledby="glance-title">
      <div className="sk-wrap">
        <Reveal>
          <p className="sk-eyebrow" id="glance-title">At a glance</p>
          <p className="gl-glance__plain">
            In plain words: I write the behind-the-scenes code that apps run on, help fix free software that many companies use,
            and study how to protect and understand voice recordings.
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <ul className="gl-glance__grid">
            {tiles.map((x) => (
              <li key={x.href}>
                <a href={x.href} className="gl-glance__tile gl-magnet">
                  <strong>{x.n}</strong>
                  <span>{x.t}</span>
                  <em>{x.s} <b aria-hidden="true">↓</b></em>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
