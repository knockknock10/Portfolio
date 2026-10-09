import { Link } from 'react-router-dom'
import SectionShell from '../components/SectionShell.jsx'
import { sections } from '../data/profile.js'
import { leetcodeConfig } from '../data/leetcode.js'
import LeetCodeProfileCard from '../components/leetcode/LeetCodeProfileCard.jsx'
import {
  DifficultyBreakdown,
  ContestInfo,
  DataFreshness,
  ProfileLink,
  NoStatsNotice,
} from '../components/leetcode/ProblemStats.jsx'

const config = sections.find((section) => section.id === 'problem-solving')

/**
 * Homepage Problem Solving section — concise snapshot.
 * Shows profile card, key stats, and link to detailed page.
 */
export default function ProblemSolvingSection() {
  const hasStats = !!leetcodeConfig.stats

  return (
    <SectionShell {...config} pending={null}>
      <div className="space-y-8">
        {/* Profile Card */}
        <LeetCodeProfileCard />

        {/* Key Statistics — only if verified snapshot exists */}
        {hasStats && (
          <>
            <DifficultyBreakdown />
            <ContestInfo />
            <DataFreshness />
          </>
        )}

        {!hasStats && <NoStatsNotice />}

        {/* Link to detailed page */}
        <div className="border-t border-line pt-4 text-center">
          <Link
            to="/problem-solving"
            className="inline-flex items-center gap-2 text-sm text-accent underline-offset-4 transition-colors duration-200 hover:underline"
          >
            {hasStats ? 'View detailed problem-solving activity →' : 'View problem-solving page →'}
          </Link>
        </div>
      </div>
    </SectionShell>
  )
}