import { Link } from 'react-router-dom'

import usePageMeta from '../hooks/usePageMeta.js'

export default function NotFound() {
  usePageMeta({
    title: 'Page not found — Sanjeev Kumar',
    description: 'This page does not exist. Head back to the homepage.',
  })

  return (
    <main id="main" className="flex min-h-[60vh] items-center">
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8 lg:px-12 py-32">
        <p className="font-mono text-xs tracking-[0.2em] text-accent">404</p>
        <h1 className="mt-4 text-3xl font-medium tracking-tight text-fg md:text-4xl">
          Page not found
        </h1>
        <p className="mt-4 max-w-md text-muted leading-relaxed">
          The page you asked for does not exist. The case studies are the fastest way
          to see what I have built.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to="/"
            className="inline-flex h-11 items-center justify-center rounded-md bg-accent px-5 text-sm font-medium text-bg transition-colors duration-200 hover:bg-accent-hover"
          >
            Back to homepage
          </Link>
          <Link
            to="/#work"
            className="inline-flex h-11 items-center justify-center rounded-md border border-line-hover px-5 text-sm text-fg transition-colors duration-200 hover:bg-panel"
          >
            Selected work
          </Link>
        </div>
      </div>
    </main>
  )
}
