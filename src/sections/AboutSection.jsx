import SectionShell from '../components/SectionShell.jsx'
import Tag from '../components/Tag.jsx'
import { sections, about } from '../data/profile.js'

const config = sections.find((section) => section.id === 'about')

export default function AboutSection() {
  return (
    <SectionShell {...config}>
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
        <div className="space-y-4 lg:col-span-5">
          {about.bio.map((paragraph) => (
            <p key={paragraph} className="text-[15px] leading-relaxed text-muted md:text-base">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:col-span-6 lg:col-start-7">
          {about.groups.map((group) => (
            <div key={group.label}>
              <p className="font-mono text-[11px] tracking-[0.18em] text-dim uppercase">
                {group.label}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <Tag key={item}>{item}</Tag>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionShell>
  )
}
