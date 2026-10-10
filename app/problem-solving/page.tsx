import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Problem Solving",
  description: "Sanjeev Kumar's approach to data structures, algorithms, contest practice, and engineering fundamentals.",
}

import { getContent } from "@/lib/content.server"

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
            This page intentionally avoids guessed solved counts, contest ratings, or rankings.
            Check the source profile for the current record.
          </p>
        </div>
        <Link className="contact-email-link" href={profileUrl} target="_blank" rel="noreferrer">
          Open LeetCode <span aria-hidden="true">↗</span>
        </Link>
      </section>

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
