import { Reveal } from "./Reveal"
import { BackgroundSVG } from "./BackgroundSVG"

export function About({ location }: { location: string | null }) {
  return (
    <section className="sk-section sk-section--tint" id="about" aria-labelledby="about-title">
      <BackgroundSVG variant="triangle" className="sk-deco-svg sk-deco-svg--triangle sk-deco-svg--right-bottom" />
      <div className="sk-wrap">
        <Reveal>
          <div className="sk-head">
            <div>
              <p className="sk-eyebrow">About</p>
              <h2 className="sk-h2" id="about-title">
                A bit about me
              </h2>
            </div>
          </div>
        </Reveal>

        <div className="sk-about">
          <Reveal>
            <div className="sk-prose">
              <p>
                I&apos;m a third-year B.Tech student in Computer Science and Engineering at SRM University AP. Most of what
                I know, I learned by building something and then finding out what broke.
              </p>
              <p>
                That has meant shipping web projects, sending fixes and tests to open-source codebases I didn&apos;t
                write, debugging infrastructure, and turning a research idea about speech watermarking into code that I
                could measure.
              </p>
              <p>
                I like backend and platform work: clear service boundaries, honest error handling, and systems that are
                easy for the next person to read. I&apos;m looking for internships and full-time roles where I can keep
                doing that with a strong team.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="sk-aside">
              <div className="sk-panel">
                <h3>Education</h3>
                <strong>B.Tech, Computer Science and Engineering</strong>
                <p>SRM University AP, currently in third year</p>
              </div>
              <div className="sk-panel">
                <h3>What I&apos;m focused on</h3>
                <ul>
                  <li>Backend and platform engineering</li>
                  <li>Contributing to open-source projects</li>
                  <li>Speech watermarking research</li>
                  <li>Data structures and algorithms</li>
                </ul>
              </div>
              {location ? (
                <div className="sk-panel">
                  <h3>Based in</h3>
                  <strong>{location}</strong>
                </div>
              ) : null}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
