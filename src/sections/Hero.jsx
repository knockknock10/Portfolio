import { Link } from 'react-router-dom'
import Container from '../components/Container.jsx'
import { hero, profile } from '../data/profile.js'
import { projects } from '../data/projects/index.js'

export default function Hero() {
  return (
    <section id="top" className="hero-section">
      <Container className="hero-layout grid items-start gap-12 py-16 sm:py-20 lg:grid-cols-[minmax(0,1.35fr)_minmax(280px,0.65fr)] lg:gap-16 lg:py-24 xl:py-28">
        <div className="hero-copy">
          <p className="hero-availability">
            <span className="hero-status-mark" aria-hidden="true" />
            {hero.status}
          </p>

          <p className="hero-kicker mt-8">
            {profile.roleLine1} <span aria-hidden="true">/</span> {profile.roleLine2}
          </p>

          <h1 className="hero-title mt-5">
            I build <span className="hero-title-accent">software</span>
            <br className="hidden sm:block" /> that holds up.
          </h1>

          <p className="hero-intro mt-6">
            I&apos;m {profile.name}, a third-year Computer Science student at SRM University AP. I work on backend systems, open source, and applied AI by building, testing, and contributing to real codebases.
          </p>

          <div className="hero-actions mt-8">
            <a href={hero.primaryCta.href} className="hero-cta hero-cta-primary">
              View selected work <span aria-hidden="true">↘</span>
            </a>
            <a href={`mailto:${profile.links.email}`} className="hero-cta hero-cta-secondary">
              Get in touch <span aria-hidden="true">↗</span>
            </a>
            <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className="hero-text-link">
              GitHub <span aria-hidden="true">↗</span>
            </a>
          </div>

          <p className="hero-focus mt-8">
            <span>Currently focused on</span>
            <strong>{hero.focus}</strong>
          </p>
        </div>

        <aside className="hero-projects" aria-labelledby="hero-projects-title">
          <div className="hero-projects-heading">
            <h2 id="hero-projects-title">A few things I&apos;ve been building</h2>
            <span>03</span>
          </div>

          <div className="hero-project-list">
            {projects.slice(0, 3).map((project) => (
              <Link
                key={project.id}
                to={`/work/${project.id}`}
                className="hero-project-row"
              >
                <span className="hero-project-number">{project.number}</span>
                <span className="hero-project-copy">
                  <strong>{project.title}</strong>
                  <span>{project.category}</span>
                </span>
                <span className="hero-project-arrow" aria-hidden="true">↗</span>
              </Link>
            ))}
          </div>

          <Link to="/#work" className="hero-projects-footer">
            More work and technical details <span aria-hidden="true">→</span>
          </Link>
        </aside>
      </Container>
    </section>
  )
}
