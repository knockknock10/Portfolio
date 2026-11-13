"use client"

import { useState } from "react"
import { CountUp } from "./CountUp"
import { ContributionGraph } from "./ContributionGraph"

/**
 * GitHub and LeetCode, one at a time. Figures below were read from the public profiles on 12 Nov 2026
 * and are labelled as a snapshot; the contribution graph itself loads live.
 */
const GH_BADGES = [
  { name: "Pull Shark", note: "Merged pull requests, silver tier x3", src: "https://github.githubassets.com/assets/pull-shark-silver-0643f87ac9fd.png", url: "https://github.com/knockknock10?achievement=pull-shark&tab=achievements" },
  { name: "Galaxy Brain", note: "Answers accepted in discussions", src: "https://github.githubassets.com/assets/galaxy-brain-default-847262c21056.png", url: "https://github.com/knockknock10?achievement=galaxy-brain&tab=achievements" },
  { name: "Pair Extraordinaire", note: "Co-authored merged work", src: "https://github.githubassets.com/assets/pair-extraordinaire-default-579438a20e01.png", url: "https://github.com/knockknock10?achievement=pair-extraordinaire&tab=achievements" },
  { name: "Quickdraw", note: "Closed within five minutes", src: "https://github.githubassets.com/assets/quickdraw-default-39c6aec8ff89.png", url: "https://github.com/knockknock10?achievement=quickdraw&tab=achievements" },
  { name: "YOLO", note: "Merged without a review", src: "https://github.githubassets.com/assets/yolo-default-be0bbff04951.png", url: "https://github.com/knockknock10?achievement=yolo&tab=achievements" },
]
const LC_BADGES = [
  { name: "365 Days", src: "https://assets.leetcode.com/static_assets/marketing/lg365.png" },
  { name: "Knight", src: "https://leetcode.com/static/images/badges/knight.png" },
  { name: "100 Days 2026", src: "https://assets.leetcode.com/static_assets/others/100_1080_1080.png" },
]
const LC_LEVELS = [
  { label: "Easy", solved: 134, total: 975 },
  { label: "Medium", solved: 224, total: 2146 },
  { label: "Hard", solved: 76, total: 989 },
]

/** An image from another site; if it cannot load it simply disappears instead of showing a broken icon. */
function Img({ src, size, className }: { src: string; size: number; className?: string }) {
  const [failed, setFailed] = useState(false)
  if (failed) return null
  return <img className={className} src={src} alt="" width={size} height={size} loading="lazy" onError={() => setFailed(true)} />
}

const GH_LOGO = "https://cdn.simpleicons.org/github/1d1d1f"
const LC_LOGO = "https://cdn.simpleicons.org/leetcode/FFA116"

export function CodingProfiles({ githubUrl }: { githubUrl: string }) {
  const [tab, setTab] = useState<"github" | "leetcode">("github")

  return (
    <section className="gl-cp" id="profiles" aria-labelledby="profiles-title">
      <div className="sk-wrap">
        <header className="gl-cp__head fx-clip">
          <p className="sk-eyebrow">Proof of work</p>
          <h2 id="profiles-title">Open the profiles.</h2>
          <p>Everything here links to the real thing. One platform at a time: pick one.</p>
        </header>

        <div className="gl-cp__tabs" role="tablist" aria-label="Coding profiles">
          <button role="tab" aria-selected={tab === "github"} data-on={tab === "github"} onClick={() => setTab("github")}>
            <Img src={GH_LOGO} size={22} /> GitHub
          </button>
          <button role="tab" aria-selected={tab === "leetcode"} data-on={tab === "leetcode"} onClick={() => setTab("leetcode")}>
            <Img src={LC_LOGO} size={22} /> LeetCode
          </button>
        </div>

        <div className="gl-cp__stage gl-pane fx-zoom">
          <Img className="gl-cp__mark" src={tab === "github" ? GH_LOGO : LC_LOGO} size={460} />

          {tab === "github" ? (
            <div className="gl-cp__panel" key="gh" role="tabpanel">
              <div className="gl-cp__row">
                <div className="gl-cp__big">
                  <strong><CountUp value={3261} /></strong>
                  <span>contributions in the last year</span>
                </div>
                <dl className="gl-cp__facts">
                  <div><dt>public repositories</dt><dd>42</dd></div>
                  <div><dt>followers</dt><dd>20</dd></div>
                  <div><dt>organisations</dt><dd>Aevor</dd></div>
                </dl>
              </div>

              <h3 className="gl-cp__sub">Achievements</h3>
              <ul className="gl-cp__badges">
                {GH_BADGES.map((b) => (
                  <li key={b.name}>
                    <a href={b.url} target="_blank" rel="noreferrer" aria-label={`${b.name}: ${b.note}`}>
                      <Img src={b.src} size={84} />
                      <b>{b.name}</b>
                      <small>{b.note}</small>
                    </a>
                  </li>
                ))}
              </ul>

              <h3 className="gl-cp__sub">Contribution graph</h3>
              <div className="gl-cp__graph"><ContributionGraph profileUrl={githubUrl} /></div>
              <a className="gl-btn" href={githubUrl} target="_blank" rel="noreferrer">Open GitHub profile ↗</a>
            </div>
          ) : (
            <div className="gl-cp__panel" key="lc" role="tabpanel">
              <div className="gl-cp__row">
                <div className="gl-cp__big">
                  <strong><CountUp value={1997} /></strong>
                  <span>contest rating · Knight · top 2.71% globally</span>
                </div>
                <dl className="gl-cp__facts">
                  <div><dt>global rank</dt><dd>23,290</dd></div>
                  <div><dt>contests attended</dt><dd>7</dd></div>
                  <div><dt>longest streak</dt><dd>39 days</dd></div>
                </dl>
              </div>

              <h3 className="gl-cp__sub"><CountUp value={434} /> of 4,110 problems solved</h3>
              <ul className="gl-cp__levels">
                {LC_LEVELS.map((l) => (
                  <li key={l.label} data-level={l.label.toLowerCase()}>
                    <span>{l.label}</span>
                    <i style={{ ["--w" as string]: `${(l.solved / l.total) * 100}%` }} />
                    <b>{l.solved}<small> / {l.total}</small></b>
                  </li>
                ))}
              </ul>

              <h3 className="gl-cp__sub">Badges · 9 earned</h3>
              <ul className="gl-cp__badges gl-cp__badges--lc">
                {LC_BADGES.map((b) => (
                  <li key={b.name}>
                    <a href="https://leetcode.com/u/knockknock10/" target="_blank" rel="noreferrer" aria-label={b.name}>
                      <Img src={b.src} size={84} />
                      <b>{b.name}</b>
                    </a>
                  </li>
                ))}
              </ul>
              <p className="gl-cp__fine">387 submissions in the past year across 213 active days. Mostly Java (364 solved).</p>
              <a className="gl-btn" href="https://leetcode.com/u/knockknock10/" target="_blank" rel="noreferrer">Open LeetCode profile ↗</a>
            </div>
          )}
        </div>
        <p className="gl-cp__snap">Profile figures as of 12 November 2026. The contribution graph is live.</p>
      </div>
    </section>
  )
}
