import Container from '../components/Container.jsx'
import Button from '../components/Button.jsx'
import { hero, profile } from '../data/profile.js'

/**
 * Subtle technical backdrop: hairline vertical grid, faded toward the bottom.
 * Pure CSS — no images, no libraries. Hidden on small screens.
 */
function GridLines() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 hidden md:block"
      style={{
        backgroundImage:
          'repeating-linear-gradient(to right, rgba(255,255,255,0.045) 0 1px, transparent 1px)',
        backgroundSize: 'calc(100% / 6) 100%',
        maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.9), transparent 85%)',
        WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.9), transparent 85%)',
      }}
    />
  )
}

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <GridLines />
      <Container className="relative pt-20 pb-16 md:pt-28 md:pb-24 lg:pt-36 lg:pb-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-8">
            <div className="hero-enter flex items-center gap-3" style={{ animationDelay: '0ms' }}>
              <span
                aria-hidden="true"
                className="size-1.5 shrink-0 rounded-full bg-accent"
              />
              <p className="font-mono text-[10px] tracking-[0.14em] text-muted uppercase sm:text-[11px] sm:tracking-[0.2em]">
                {hero.status}
              </p>
            </div>

            <span
              aria-hidden="true"
              className="hero-enter mt-8 block h-px w-12 bg-accent"
              style={{ animationDelay: '60ms' }}
            />

            <h1
              className="hero-enter mt-7"
              style={{ animationDelay: '120ms' }}
            >
              <span className="block text-[2.5rem] leading-[1.03] font-semibold tracking-[-0.03em] text-fg uppercase sm:text-[3.25rem] lg:text-[4rem]">
                {profile.roleLine1}
              </span>{' '}
              <span className="mt-4 block font-mono text-[13px] leading-relaxed tracking-[0.3em] text-muted uppercase sm:text-[15px]">
                {profile.roleLine2}
              </span>
            </h1>

            <p
              className="hero-enter mt-8 max-w-xl text-lg leading-relaxed text-muted md:text-xl"
              style={{ animationDelay: '180ms' }}
            >
              {hero.statement}
            </p>

            <div
              className="hero-enter mt-9 flex flex-wrap items-center gap-3"
              style={{ animationDelay: '240ms' }}
            >
              <Button href={hero.primaryCta.href}>{hero.primaryCta.label}</Button>
              <Button href={hero.secondaryCta.href} variant="secondary" external>
                {hero.secondaryCta.label}
              </Button>
            </div>
          </div>

          <aside
            className="hero-enter lg:col-span-4 lg:col-start-9"
            style={{ animationDelay: '320ms' }}
            aria-label="Current focus"
          >
            <div className="border-t border-line pt-6 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
              <p className="font-mono text-[11px] tracking-[0.22em] text-dim uppercase">
                Currently
              </p>
              <ul className="mt-4 space-y-2.5">
                {hero.currently.map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-muted">
                    <span aria-hidden="true" className="font-mono text-accent">
                      →
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-7 border-t border-line pt-6">
                <p className="font-mono text-[11px] tracking-[0.22em] text-dim uppercase">
                  Focus
                </p>
                <p className="mt-3 font-mono text-[13px] tracking-[0.06em] text-fg">
                  {hero.focus}
                </p>
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  )
}
