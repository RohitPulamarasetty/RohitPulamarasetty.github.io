import { Terminal, BookOpen, Compass } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import { nowGroups } from '@/lib/data'

const panelIcons = [Terminal, BookOpen, Compass]

export default function Currently() {
  return (
    <section id="currently" className="scroll-mt-24 py-24 md:py-32 bg-[var(--color-bg)]">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          index="03"
          eyebrow="Right Now"
          heading="Still figuring it out — on purpose"
          sub="Not a finished skill set. Just what I'm doing right now."
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {nowGroups.map((group, i) => {
            const Icon = panelIcons[i]
            return (
              <div
                key={group.category}
                data-reveal
                className="pixel-card pixel-corners pixel-shadow-sm overflow-hidden"
              >
                {/* Module header — window chrome + live-ish status */}
                <div className="viewport-bar">
                  <Icon className="w-3.5 h-3.5 text-[var(--color-accent)]" strokeWidth={2} />
                  <span className="font-pixel font-bold text-[10px] uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                    {group.category}
                  </span>
                  <span className="ml-auto w-1.5 h-1.5 bg-[var(--color-accent-2)] animate-pulse" aria-hidden />
                </div>
                <ul className="p-5 space-y-3.5">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-[15px] font-medium text-[var(--color-text)]">
                      <span className="font-mono text-[11px] text-[var(--color-accent)]" aria-hidden>&gt;</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
