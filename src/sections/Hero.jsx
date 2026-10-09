import Container from '../components/Container.jsx'
import { hero, profile } from '../data/profile.js'

export default function Hero() {
  return (
    <section id="top" className="border-b border-line">
      <Container className="pt-20 pb-20 sm:pt-28 sm:pb-24 lg:pt-32 lg:pb-28">
        <div className="max-w-4xl">
          <p className="hero-enter font-mono text-xs tracking-[0.12em] text-muted">
            {profile.roleLine1} · {profile.roleLine2}
          </p>

          <h1 className="hero-enter mt-6 max-w-4xl text-4xl font-semibold leading-[1.08] tracking-[-0.035em] text-fg sm:text-6xl lg:text-7xl">
            Engineering resilient systems, open infrastructure, and applied AI.
          </h1>

          <p className="hero-enter mt-7 max-w-2xl text-base leading-8 text-muted sm:text-lg">
            Hi, I&apos;m <strong className="font-medium text-fg">{profile.name}</strong>.{' '}
            {hero.statement}
          </p>

          <div className="hero-enter mt-9 flex flex-wrap items-center gap-3">
            <a
              href={hero.primaryCta.href}
              className="inline-flex h-11 items-center gap-2 rounded-lg bg-accent px-5 text-sm font-medium text-white transition-colors hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
            >
              {hero.primaryCta.label}
              <span aria-hidden="true">→</span>
            </a>
            <a
              href={hero.secondaryCta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center gap-2 rounded-lg border border-line px-5 text-sm font-medium text-fg transition-colors hover:border-line-hover hover:bg-panel hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
            >
              {hero.secondaryCta.label}
              <span aria-hidden="true">↗</span>
            </a>
          </div>

          <p className="hero-enter mt-10 border-t border-line pt-5 text-sm text-dim">
            Currently focused on {hero.focus.toLowerCase()}.
          </p>
        </div>
      </Container>
    </section>
  )
}
