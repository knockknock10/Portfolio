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
const CF_LOGO = "https://cdn.simpleicons.org/codeforces/1F8ACB"
const HR_LOGO = "https://cdn.simpleicons.org/hackerrank/2EC866"
const GH_AVATAR = "https://github.com/knockknock10.png?size=240"
const CF_AVATAR = "https://codeforces.com/userpic.codeforces.org/6268558/title/2a7eb752c9fd5770.jpg"
const HR_AVATAR = "https://hrcdn.net/s3_pub/hr-avatars/e44f3e5f-2c8b-4dc8-b7e2-d3ee56cf94cb/150x150.png"
const LC_URL = "https://leetcode.com/u/knockknock10/"
const CF_URL = "https://codeforces.com/profile/knockknock10"
const HR_URL = "https://www.hackerrank.com/profile/knockknock10"
const HR_CERTS = [
  { name: "SQL (Basic)", url: "https://www.hackerrank.com/certificates/6dc7b54a5b2d" },
  { name: "JavaScript (Basic)", url: "https://www.hackerrank.com/certificates/6ff4ecef8635" },
]
const HR_TRACKS = ["Problem Solving", "C++", "Java", "Days of Code", "Days of JS"]

type Tab = "leetcode" | "codeforces" | "hackerrank"

/** GitHub on its own: the picture, the numbers, the achievements and the live contribution graph. */
export function GithubProfile({ githubUrl }: { githubUrl: string }) {
  return (
    <section className="gl-cp" id="github" aria-labelledby="github-title">
      <div className="sk-wrap">
        <header className="gl-cp__head fx-clip">
          <p className="sk-eyebrow">On GitHub</p>
          <h2 id="github-title">Every commit, in the open.</h2>
          <p>The graph below is live. The badges are the ones GitHub gave me.</p>
        </header>

        <div className="gl-cp__stage gl-pane fx-zoom">
          <Img className="gl-cp__mark" src={GH_LOGO} size={460} />
          <div className="gl-cp__panel">
            <div className="gl-cp__who">
              <Img className="gl-cp__avatar" src={GH_AVATAR} size={96} />
              <div>
                <b>Sanjeev Kumar</b>
                <a href={githubUrl} target="_blank" rel="noreferrer">@knockknock10 ↗</a>
              </div>
            </div>

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
        </div>
        <p className="gl-cp__snap">Figures as of 12 November 2026. The contribution graph is live.</p>
      </div>
    </section>
  )
}

/** Problem-solving sites, one at a time: LeetCode, Codeforces, HackerRank. */
export function CodingProfiles() {
  const [tab, setTab] = useState<Tab>("leetcode")
  const logo = tab === "leetcode" ? LC_LOGO : tab === "codeforces" ? CF_LOGO : HR_LOGO

  return (
    <section className="gl-cp" id="profiles" aria-labelledby="profiles-title">
      <div className="sk-wrap">
        <header className="gl-cp__head fx-clip">
          <p className="sk-eyebrow">Problem solving</p>
          <h2 id="profiles-title">Practice, on the record.</h2>
          <p>Contests, ratings and certificates from the sites I practise on. Pick one.</p>
        </header>

        <div className="gl-cp__tabs" role="tablist" aria-label="Coding profiles">
          <button role="tab" aria-selected={tab === "leetcode"} data-on={tab === "leetcode"} onClick={() => setTab("leetcode")}>
            <Img src={LC_LOGO} size={22} /> LeetCode
          </button>
          <button role="tab" aria-selected={tab === "codeforces"} data-on={tab === "codeforces"} onClick={() => setTab("codeforces")}>
            <Img src={CF_LOGO} size={22} /> Codeforces
          </button>
          <button role="tab" aria-selected={tab === "hackerrank"} data-on={tab === "hackerrank"} onClick={() => setTab("hackerrank")}>
            <Img src={HR_LOGO} size={22} /> HackerRank
          </button>
        </div>

        <div className="gl-cp__stage gl-pane fx-zoom">
          <Img className="gl-cp__mark" src={logo} size={460} />

          {tab === "leetcode" ? (
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
                    <a href={LC_URL} target="_blank" rel="noreferrer" aria-label={b.name}>
                      <Img src={b.src} size={84} />
                      <b>{b.name}</b>
                    </a>
                  </li>
                ))}
              </ul>
              <p className="gl-cp__fine">387 submissions in the past year across 213 active days. Mostly Java (364 solved).</p>
              <a className="gl-btn" href={LC_URL} target="_blank" rel="noreferrer">Open LeetCode profile ↗</a>
            </div>
          ) : tab === "codeforces" ? (
            <div className="gl-cp__panel" key="cf" role="tabpanel">
              <div className="gl-cp__who">
                <Img className="gl-cp__avatar" src={CF_AVATAR} size={96} />
                <div><b>knockknock10</b><span>Newbie · Codeforces</span></div>
              </div>
              <div className="gl-cp__row">
                <div className="gl-cp__big">
                  <strong><CountUp value={950} /></strong>
                  <span>contest rating · newest account, climbing</span>
                </div>
                <dl className="gl-cp__facts">
                  <div><dt>problems solved</dt><dd>17</dd></div>
                  <div><dt>best streak</dt><dd>2 days</dd></div>
                  <div><dt>joined</dt><dd>Sep 2026</dd></div>
                </dl>
              </div>
              <p className="gl-cp__fine">A young account on purpose: this is where I practise timed contests, so the number will move.</p>
              <a className="gl-btn" href={CF_URL} target="_blank" rel="noreferrer">Open Codeforces profile ↗</a>
            </div>
          ) : (
            <div className="gl-cp__panel" key="hr" role="tabpanel">
              <div className="gl-cp__who">
                <Img className="gl-cp__avatar" src={HR_AVATAR} size={96} />
                <div><b>Sanjeev Kumar</b><span>@knockknock10 · HackerRank</span></div>
              </div>
              <h3 className="gl-cp__sub">Verified certificates</h3>
              <ul className="gl-cp__badges gl-cp__badges--certs">
                {HR_CERTS.map((c) => (
                  <li key={c.name}>
                    <a href={c.url} target="_blank" rel="noreferrer" aria-label={`Certificate: ${c.name}`}>
                      <b>{c.name}</b>
                      <small>Verified · open certificate ↗</small>
                    </a>
                  </li>
                ))}
              </ul>
              <h3 className="gl-cp__sub">Tracks I have practised</h3>
              <ul className="gl-cp__chips">{HR_TRACKS.map((t) => <li key={t}>{t}</li>)}</ul>
              <a className="gl-btn" href={HR_URL} target="_blank" rel="noreferrer">Open HackerRank profile ↗</a>
            </div>
          )}
        </div>
        <p className="gl-cp__snap">Figures as of 12 November 2026, read from the public profiles.</p>
      </div>
    </section>
  )
}
