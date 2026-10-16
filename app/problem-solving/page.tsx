import type { Metadata } from "next"
import Link from "next/link"
import { getContent } from "@/lib/content.server"
import { getSignalsData } from "@/lib/signals"


export const metadata: Metadata = {
  title: "Problem Solving",
  description: "Sanjeev Kumar's approach to data structures, algorithms, contest practice, and engineering fundamentals.",
}

const focusAreas = [
  {
    number: "01",
    title: "Data structures and algorithms",
    description: "Build fluency with core patterns by implementing them, analysing trade-offs, and reviewing edge cases.",
  },
  {
    number: "02",
    title: "Contest practice",
    description: "Work on translating a problem statement into a correct approach under constraints, then revisit the solution to learn from it.",
  },
  {
    number: "03",
    title: "Engineering fundamentals",
    description: "Pair interview preparation with a deeper understanding of systems, APIs, databases, and the code used in real projects.",
  },
]

export default function ProblemSolvingPage() {
  const content = getContent()
  const activity = getSignalsData().leetcode
  const profileUrl =
    content.socials?.find((item) => /^LeetCode(?: profile)?$/i.test(item.platform) && item.url?.startsWith("https://"))?.url ??
    "https://leetcode.com/u/knockknock10/"

  return (
    <main className="route-shell editorial-page problem-solving-page">
      <header className="route-intro">
        <p className="route-kicker">Problem solving</p>
        <h1 className="route-shell-title">Build the habit. Understand the pattern.</h1>
        <p className="route-lede">
          I use algorithm practice to strengthen problem decomposition and implementation,
          alongside the project work that teaches me to build complete systems.
        </p>
      </header>

      <section className="problem-solving-proof" aria-labelledby="problem-solving-proof-title">
        <div>
          <p className="route-kicker">Profile</p>
          <h2 id="problem-solving-proof-title">See the actual practice history.</h2>
          <p>
            A snapshot of algorithm practice and contest performance from the checked public profile data.
            Follow the profile for the most current numbers.
          </p>
        </div>
        <Link className="contact-email-link" href={profileUrl} target="_blank" rel="noreferrer">
          Open LeetCode <span aria-hidden="true">↗</span>
        </Link>
      </section>

      {activity.available ? (
        <section className="problem-solving-stats" aria-label="LeetCode profile snapshot">
          <div className="problem-solving-solved">
            <p className="route-kicker">Problems solved</p>
            <p className="problem-solving-solved-number">
              {typeof activity.totalSolved === "number" ? activity.totalSolved.toLocaleString("en-US") : "—"}
              <span> / 4,073 tracked questions</span>
            </p>
            <div className="problem-solving-difficulty" aria-label="Solved problems by difficulty">
              <div className="problem-solving-difficulty-segment is-easy" style={{ width: (typeof activity.easySolved === "number" ? activity.easySolved / Math.max(typeof activity.totalSolved === "number" ? activity.totalSolved : 1, 1) * 100 : 0) + "%" }} />
              <div className="problem-solving-difficulty-segment is-medium" style={{ width: (typeof activity.mediumSolved === "number" ? activity.mediumSolved / Math.max(typeof activity.totalSolved === "number" ? activity.totalSolved : 1, 1) * 100 : 0) + "%" }} />
              <div className="problem-solving-difficulty-segment is-hard" style={{ width: (typeof activity.hardSolved === "number" ? activity.hardSolved / Math.max(typeof activity.totalSolved === "number" ? activity.totalSolved : 1, 1) * 100 : 0) + "%" }} />
            </div>
            <div className="problem-solving-difficulty-labels">
              <span><i className="is-easy" />Easy <strong>{typeof activity.easySolved === "number" ? activity.easySolved : "—"}</strong></span>
              <span><i className="is-medium" />Medium <strong>{typeof activity.mediumSolved === "number" ? activity.mediumSolved : "—"}</strong></span>
              <span><i className="is-hard" />Hard <strong>{typeof activity.hardSolved === "number" ? activity.hardSolved : "—"}</strong></span>
            </div>
          </div>
          <dl className="problem-solving-metric-grid">
            {[
              { label: "Contest rating", value: typeof activity.contestRating === "number" ? activity.contestRating.toLocaleString("en-US", { maximumFractionDigits: 1 }) : "—" },
              { label: "Contest rank", value: typeof activity.contestRank === "number" ? activity.contestRank.toLocaleString("en-US") : "—" },
              { label: "Global profile rank", value: typeof activity.profileRank === "number" ? activity.profileRank.toLocaleString("en-US") : "—" },
              { label: "Acceptance rate", value: activity.acceptanceRate !== "MISSING" ? activity.acceptanceRate : "—" },
            ].map((item) => (
              <div className="problem-solving-metric" key={item.label}>
                <dt>{item.label}</dt><dd>{item.value}</dd>
              </div>
            ))}
          </dl>
          {activity.badges.length > 0 ? (
            <div className="problem-solving-badges">
              <span>Earned contest badge</span>
              {activity.badges.map((badge) => <strong key={badge}><span aria-hidden="true">✦</span> {badge}</strong>)}
            </div>
          ) : null}
        </section>
      ) : null}

      <section className="problem-solving-focus" aria-labelledby="problem-solving-focus-title">
        <p className="route-kicker">How I practise</p>
        <h2 id="problem-solving-focus-title">Consistency over vanity metrics.</h2>
        <div className="problem-solving-list">
          {focusAreas.map((item) => (
            <article className="problem-solving-item" key={item.number}>
              <span>{item.number}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
