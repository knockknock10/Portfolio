import { publicUrl } from "@/lib/public-url"
import { ArrowRight, ArrowUpRight, Download, GitHub, LinkedIn, Code } from "./icons"

export type Fact = { value: string; label: string }

type HeroProps = {
  email: string | null
  resumeHref: string
  github: string | null
  linkedin: string | null
  leetcode: string | null
  facts: Fact[]
}

export function Hero({ email, resumeHref, github, linkedin, leetcode, facts }: HeroProps) {
  return (
    <section className="sk-hero" id="top" aria-labelledby="hero-title">
      <div className="sk-wrap">
        <div className="sk-hero__grid">
          <div>
            <p className="sk-hero__kicker">Computer science student at SRM University AP</p>
            <h1 id="hero-title">
              <span>Sanjeev</span>
              <span>Kumar</span>
            </h1>
            <p className="sk-hero__lede">
              I build backend services and developer tools, contribute fixes to open-source projects, and research
              speech and audio intelligence.
            </p>
            <p className="sk-hero__status">Open to software engineering internships.</p>

            <div className="sk-hero__actions">
              <a className="sk-btn sk-btn--solid" href="#work" data-magnetic>
                See my work <ArrowRight />
              </a>
              <a className="sk-btn" href={resumeHref} target="_blank" rel="noreferrer" data-magnetic>
                Résumé <Download />
              </a>
              {email ? (
                <a className="sk-btn" href={`mailto:${email}`} data-magnetic>
                  Email me
                </a>
              ) : null}
            </div>

            <nav className="sk-hero__focus" aria-label="Explore my focus areas">
              <a className="sk-hero__focus-chip" href="#work" data-tilt>
                <span className="sk-hero__focus-index">01</span>
                <span>Backend & systems</span>
                <ArrowUpRight />
              </a>
              <a className="sk-hero__focus-chip" href="#open-source" data-tilt>
                <span className="sk-hero__focus-index">02</span>
                <span>Open source</span>
                <ArrowUpRight />
              </a>
              <a className="sk-hero__focus-chip" href="#research" data-tilt>
                <span className="sk-hero__focus-index">03</span>
                <span>Audio intelligence</span>
                <ArrowUpRight />
              </a>
            </nav>

            <div className="sk-hero__links">
              {github ? (
                <a href={github} target="_blank" rel="noreferrer">
                  <GitHub /> GitHub
                </a>
              ) : null}
              {linkedin ? (
                <a href={linkedin} target="_blank" rel="noreferrer">
                  <LinkedIn /> LinkedIn
                </a>
              ) : null}
              {leetcode ? (
                <a href={leetcode} target="_blank" rel="noreferrer">
                  <Code /> LeetCode
                </a>
              ) : null}
            </div>
          </div>

          <div className="sk-portrait" data-tilt>
            <div className="sk-portrait__shape" aria-hidden="true" />
            <div className="sk-portrait__photo">
              <img
                src={publicUrl("/images/sanjeev-portrait.webp")}
                width={880}
                height={1320}
                alt="Sanjeev Kumar standing on a metro platform"
                fetchPriority="high"
              />
            </div>
            <div className="sk-portrait__signal sk-portrait__signal--top">
              <span>Currently exploring</span>
              <strong>Audio → knowledge graphs</strong>
            </div>
            <div className="sk-portrait__signal sk-portrait__signal--bottom">
              <span className="sk-portrait__signal-dot" aria-hidden="true" />
              <strong>Building in public</strong>
              <span>Code · research · systems</span>
            </div>
          </div>
        </div>

        {facts.length ? (
          <dl className="sk-facts">
            {facts.map((fact) => (
              <div className="sk-fact" key={fact.label} data-tilt>
                <dt style={{ display: "none" }}>{fact.label}</dt>
                <dd>
                  <strong>{fact.value}</strong>
                  <span>{fact.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        ) : null}
      </div>
    </section>
  )
}
