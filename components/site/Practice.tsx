import type { SignalStats } from "@/lib/signals"
import { ArrowUpRight } from "./icons"
import { Reveal } from "./Reveal"

const profiles = [
  { label: "LeetCode", href: "https://leetcode.com/u/knockknock10/" },
  { label: "Codeforces", href: "https://codeforces.com/profile/knockknock10" },
  { label: "HackerRank", href: "https://www.hackerrank.com/profile/knockknock10" },
  { label: "NeetCode", href: "https://neetcode.io/user/DigitalTrill950" },
  { label: "GeeksforGeeks", href: "https://www.geeksforgeeks.org/profile/karthikjaihh0z" },
]

function num(value: number | "MISSING", digits = 0): string | null {
  return typeof value === "number" ? value.toLocaleString("en-US", { maximumFractionDigits: digits }) : null
}

export function Practice({ stats }: { stats: SignalStats["leetcode"] }) {
  const solved = num(stats.totalSolved)
  const rating = num(stats.contestRating)
  const attended = num(stats.contestAttendedCount)
  const hard = num(stats.hardSolved)

  const numbers = [
    solved ? { value: solved, label: "LeetCode problems solved" } : null,
    hard ? { value: hard, label: "of them rated hard" } : null,
    rating ? { value: rating, label: `contest rating after ${attended ?? "several"} contests` } : null,
    stats.contestTopPercentage !== "MISSING"
      ? { value: `Top ${stats.contestTopPercentage}`, label: "of ranked contestants worldwide" }
      : null,
  ].filter((item): item is { value: string; label: string } => item !== null)

  return (
    <Reveal>
      <div className="sk-practice">
        <div className="sk-practice__intro">
          <h3>Problem solving</h3>
          <p className="sk-lede" style={{ margin: 0 }}>
            I practise data structures and algorithms regularly. It keeps the fundamentals sharp for the systems I
            build.
          </p>
        </div>

        {numbers.length ? (
          <dl className="sk-practice__numbers">
            {numbers.map((item) => (
              <div key={item.label}>
                <dd style={{ margin: 0 }}>
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        ) : null}

        <div className="sk-practice__foot">
          <span>Figures are from my public LeetCode profile when this site was last built.</span>
          <span className="sk-practice__links">
            {profiles.map((profile) => (
              <a className="sk-text-link" key={profile.href} href={profile.href} target="_blank" rel="noreferrer">
                {profile.label} <ArrowUpRight />
              </a>
            ))}
          </span>
        </div>
      </div>
    </Reveal>
  )
}
