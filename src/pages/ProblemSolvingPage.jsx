import { Link } from 'react-router-dom'
import usePageMeta from '../hooks/usePageMeta.js'
import Layout from '../layouts/Layout.jsx'
import Container from '../components/Container.jsx'
import Section from '../components/Section.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import Reveal from '../components/Reveal.jsx'
import Card from '../components/Card.jsx'
import { profile } from '../data/profile.js'
import { leetcodeConfig, validateStats } from '../data/leetcode.js'
import LeetCodeProfileCard from '../components/leetcode/LeetCodeProfileCard.jsx'
import {
  DifficultyBreakdown,
  ContestInfo,
  DataFreshness,
  ProfileLink,
  NoStatsNotice,
} from '../components/leetcode/ProblemStats.jsx'

export default function ProblemSolvingPage() {
  const hasStats = !!leetcodeConfig.stats
  const validation = hasStats ? validateStats(leetcodeConfig.stats) : { valid: true, issues: [] }

  usePageMeta({
    title: `${profile.name} — Problem Solving`,
    description:
      'Verified LeetCode problem-solving activity: difficulty breakdown, contest participation, and progress snapshots. Data presented with source attribution and freshness disclosure.',
  })

  return (
    <Layout>
      <main id="main">
        <Section id="problem-solving">
          <Container className="py-16 md:py-24 lg:py-28">
            <Reveal>
              <SectionHeading
                heading="h1"
                index="05"
                title="Problem Solving"
                intent="Verified problem-solving practice and platform activity, presented as data rather than claims."
              />
            </Reveal>

            <Reveal delay={80} className="mt-10 md:mt-12 space-y-8">
              {/* Profile Card */}
              <LeetCodeProfileCard />

              {/* Verified Statistics */}
              {hasStats && validation.valid && (
                <>
                  <DifficultyBreakdown />
                  <ContestInfo />
                  <DataFreshness />
                </>
              )}

              {/* Validation warning (dev only) */}
              {hasStats && !validation.valid && import.meta.env.DEV && (
                <Card className="border-accent bg-panel-raised/50">
                  <div className="flex items-start gap-3">
                    <svg className="size-5 text-accent shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <div>
                      <p className="font-mono text-xs tracking-[0.1em] text-accent uppercase">Data validation warning (dev only)</p>
                      <ul className="mt-2 text-sm text-muted space-y-1">
                        {validation.issues.map((issue, i) => (
                          <li key={i}>• {issue}</li>
                        ))}
                      </ul>
                      <p className="mt-2 text-xs text-dim">Fix the stats object in src/data/leetcode.js to resolve.</p>
                    </div>
                  </div>
                </Card>
              )}

              {/* No stats configured */}
              {!hasStats && (
                <Card>
                  <div className="text-center py-4">
                    <NoStatsNotice />
                  </div>
                </Card>
              )}

              {/* Profile Link */}
              <ProfileLink />

              {/* Configuration guidance — dev-only; never shown in production builds */}
              {import.meta.env.DEV && (!hasStats || !leetcodeConfig.username) && (
                <div
                  className="rounded-xl p-6 bg-panel"
                  style={{ border: '1px dashed rgba(255, 255, 255, 0.12)' }}
                >
                  <h3 className="font-mono text-xs tracking-[0.2em] text-accent uppercase mb-4">Configuration guide</h3>
                  <div className="space-y-4 text-sm text-muted">
                    <div>
                      <p className="font-mono text-xs text-dim mb-2">1. Set your username</p>
                      <pre className="font-mono text-[12px] bg-panel-raised p-3 rounded overflow-x-auto text-fg">
{`// src/data/leetcode.js
export const leetcodeConfig = {
  username: 'your-username',  // from https://leetcode.com/u/your-username/
  // ... rest of config
}`}
                      </pre>
                    </div>
                    <div>
                      <p className="font-mono text-xs text-dim mb-2">2. Add verified stats (optional)</p>
                      <pre className="font-mono text-[12px] bg-panel-raised p-3 rounded overflow-x-auto text-fg">
{`stats: {
  totalSolved: 342,
  easySolved: 156,
  mediumSolved: 148,
  hardSolved: 38,
  contestRating: 1847,
  globalRanking: 12345,
  contestsAttended: 24,
  verifiedAt: '2026-10-09T00:00:00Z',
  source: 'LeetCode profile page (manual verification)',
}`}
                      </pre>
                    </div>
                    <div>
                      <p className="font-mono text-xs text-dim mb-2">3. Key rules</p>
                      <ul className="space-y-1 text-[13px]">
                        <li>• All stat fields are optional — omit if unverified</li>
                        <li>• <code className="bg-panel-raised px-1 rounded">{'totalSolved'}</code> must equal sum of difficulties</li>
                        <li>• <code className="bg-panel-raised px-1 rounded">{'verifiedAt'}</code> = when YOU verified (ISO 8601)</li>
                        <li>• <code className="bg-panel-raised px-1 rounded">{'source'}</code> = where data came from</li>
                        <li>• Never commit fake or estimated numbers</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Back to top */}
              <div className="border-t border-line pt-4 text-center">
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 text-sm text-accent underline-offset-4 transition-colors duration-200 hover:underline"
                >
                  ← Back to homepage
                </Link>
              </div>
            </Reveal>
          </Container>
        </Section>
      </main>
    </Layout>
  )
}