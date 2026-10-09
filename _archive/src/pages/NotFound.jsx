import { Link } from 'react-router-dom'

import Layout from '../layouts/Layout.jsx'
import usePageMeta from '../hooks/usePageMeta.js'
import Button from '../components/Button.jsx'

export default function NotFound() {
  usePageMeta({
    title: 'Page not found — Sanjeev Kumar',
    description: 'This page does not exist. Head back to the homepage.',
  })

  return (
    <Layout>
      <main id="main" className="flex min-h-[65vh] items-center">
        <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8 lg:px-12 py-32">
          <p className="font-mono text-xs tracking-[0.2em] text-accent uppercase">404 error</p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-fg md:text-4xl">
            Page not found
          </h1>
          <p className="mt-4 max-w-md text-muted leading-relaxed text-base">
            The page you asked for does not exist. The case studies are the fastest way
            to see what I have built.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button as={Link} to="/" variant="primary">
              Back to homepage
            </Button>
            <Button as={Link} to="/#work" variant="secondary">
              Selected work
            </Button>
          </div>
        </div>
      </main>
    </Layout>
  )
}
