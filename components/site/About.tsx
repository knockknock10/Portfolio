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
            <div className="sk-prose gl-about-prose">
              {/* Previous About copy retained for reference:
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
              */}
              <p>
                I&apos;m a third-year B.Tech student in Computer Science and Engineering at SRM University AP. I learn
                by building software, reading code written by other people, and working out why a system behaves the
                way it does.
              </p>
              <p>
                My work so far spans backend services and developer tools, full-stack applications, upstream open-source
                contributions, and a research project on speech watermarking. I like going beyond a working demo:
                understanding the data flow, testing edge cases, and being clear about what the results do and do not show.
              </p>
              <p>
                I&apos;m especially interested in backend and platform engineering: service boundaries, APIs, databases,
                testing, reliability, and code that another engineer can maintain. I&apos;m looking for software
                engineering internships where I can learn from experienced engineers and contribute useful work.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="sk-aside">
              <div className="sk-panel">
                <h3>Education</h3>
                <strong>B.Tech, Computer Science and Engineering</strong>
                <p>SRM University AP, currently in third year</p>
                {/* Corrected from the earlier displayed 8.7; the supplied record states 8.61. */}
                <p className="gl-fact-line">CGPA 8.61 / 10 · Expected graduation 2028</p>
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

        {/* Working habits, taken from the copy above and laid out as a scannable row. */}
        <ol className="gl-habits">
          {[
            ["Read the code", "Other people's codebases teach faster than tutorials. I read before I change."],
            ["Test the edges", "A demo that works once is not done. I look for the input that breaks it."],
            ["Say what it shows", "Results get reported with their limits, not rounded up."],
          ].map(([title, body], i) => (
            <li key={title} className="gl-habit">
              <span className="gl-habit__n">{String(i + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
