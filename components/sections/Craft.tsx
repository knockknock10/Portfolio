import { CraftSequence } from "@/components/sections/CraftSequence"
import type { CraftStep } from "@/lib/craft"

type CraftProps = { steps: CraftStep[] }

export function Craft({ steps }: CraftProps) {
  const visibleSteps = steps.slice(0, 4)
  return (
    <section className="craft-section" aria-labelledby="craft-heading">
      <h2 id="craft-heading" className="section-heading">Craft</h2>
      {visibleSteps.length > 0 ? (
        <CraftSequence steps={visibleSteps} />
      ) : (
        <p className="craft-empty-copy">The process section is being written.</p>
      )}
    </section>
  )
}
