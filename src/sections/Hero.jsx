import Container from '../components/Container.jsx'
import { hero, profile } from '../data/profile.js'

function HeroVisual() {
  return (
    <div className="hero-art" aria-hidden="true">
      <div className="hero-art-glow" />
      <div className="hero-orbit hero-orbit-one" />
      <div className="hero-orbit hero-orbit-two" />
      <div className="hero-orbit hero-orbit-three" />
      <div className="hero-orb">
        <div className="hero-orb-glass" />
        <div className="hero-orb-shine" />
        <div className="hero-orb-core">SK</div>
      </div>
      <span className="hero-orb-label hero-label-one">SYSTEMS</span>
      <span className="hero-orb-label hero-label-two">OPEN SOURCE</span>
      <span className="hero-orb-label hero-label-three">APPLIED AI</span>
      <span className="hero-orb-ping hero-ping-one" />
      <span className="hero-orb-ping hero-ping-two" />
    </div>
  )
}

export default function Hero() {
  const handleVisualPointerMove = (event) => {
    if (event.pointerType === 'touch') return
    const { left, top, width, height } = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - left) / Math.max(width, 1)
    const y = (event.clientY - top) / Math.max(height, 1)
    event.currentTarget.style.setProperty('--tilt-x', `${(0.5 - y) * 7}deg`)
    event.currentTarget.style.setProperty('--tilt-y', `${(x - 0.5) * 9}deg`)
  }

  const resetVisualPointer = (event) => {
    event.currentTarget.style.setProperty('--tilt-x', '0deg')
    event.currentTarget.style.setProperty('--tilt-y', '0deg')
  }

  return (
    <section id="top" className="hero-section relative isolate overflow-hidden">
      <Container className="hero-layout grid items-center gap-8 py-20 sm:py-24 md:py-28 lg:grid-cols-[1.08fr_0.92fr] lg:gap-4 lg:py-28 xl:py-32">
        <div className="relative z-10 max-w-3xl">
          <div className="hero-enter inline-flex items-center gap-2.5 rounded-full px-3.5 py-2 text-xs font-medium text-white/85 hero-status">
            <span className="hero-status-mark" aria-hidden="true" />
            {hero.status}
          </div>

          <p className="hero-enter mt-7 font-mono text-[11px] uppercase tracking-[0.2em] text-muted sm:text-xs">
            {profile.roleLine1} <span className="text-white/30">/</span> {profile.roleLine2}
          </p>

          <h1 className="hero-enter mt-5 max-w-4xl text-[2.7rem] font-medium leading-[1.04] tracking-[-0.055em] text-fg sm:text-6xl lg:text-[4.25rem] xl:text-[4.8rem]">
            Engineering <span className="hero-title-glint">resilient systems</span>, open infrastructure, and applied AI.
          </h1>

          <p className="hero-enter mt-7 max-w-2xl text-base leading-8 text-muted sm:text-lg sm:leading-9">
            Hi, I&apos;m <strong className="font-medium text-fg">{profile.name}</strong>.{' '}
            {hero.statement}
          </p>

          <div className="hero-enter mt-9 flex flex-wrap items-center gap-3">
            <a href={hero.primaryCta.href} className="hero-cta hero-cta-primary">
              {hero.primaryCta.label}
              <span aria-hidden="true" className="hero-cta-arrow">↗</span>
            </a>
            <a
              href={hero.secondaryCta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-cta hero-cta-secondary"
            >
              {hero.secondaryCta.label}
              <span aria-hidden="true" className="hero-cta-arrow">↗</span>
            </a>
          </div>

          <div className="hero-enter mt-10 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-dim">
            <span className="font-mono uppercase tracking-[0.12em] text-muted">Currently focused</span>
            <span className="hidden h-1 w-1 rounded-full bg-white/30 sm:block" aria-hidden="true" />
            <span>{hero.focus}</span>
          </div>
        </div>

        <div
          className="hero-visual-wrap hero-enter"
          onPointerMove={handleVisualPointerMove}
          onPointerLeave={resetVisualPointer}
        >
          <HeroVisual />
        </div>
      </Container>
      <div className="hero-bottom-haze" aria-hidden="true" />
    </section>
  )
}
