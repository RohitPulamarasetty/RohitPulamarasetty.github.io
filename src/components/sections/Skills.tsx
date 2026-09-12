import SectionHeader from '@/components/ui/SectionHeader'
import { skillGroups } from '@/lib/data'
import { skillIcons } from '@/lib/skill-icons'

export default function Skills() {
  return (
    <section id="skills" className="scroll-mt-24 py-24 md:py-32 bg-[var(--color-bg-elevated)] border-y border-[var(--color-border)]">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader index="04" eyebrow="The Toolkit" heading="What I actually reach for" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12">
          {skillGroups.map((group) => (
            <div key={group.category} data-reveal>
              <div className="flex items-center gap-2.5 mb-5">
                <span className="w-1.5 h-1.5 bg-[var(--color-accent)]" aria-hidden />
                <h3 className="font-pixel font-bold text-[10px] uppercase tracking-[0.2em] text-[var(--color-accent)]">
                  {group.category}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => {
                  const Icon = skillIcons[skill]
                  return (
                    <span key={skill} className="skill-chip pixel-corners-sm">
                      {Icon && <Icon className="skill-chip-icon w-4 h-4" />}
                      {skill}
                    </span>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
