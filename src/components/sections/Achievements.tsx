import SectionHeader from '@/components/ui/SectionHeader'
import { achievements } from '@/lib/data'

export default function Achievements() {
  return (
    <section id="achievements" className="scroll-mt-24 py-24 md:py-32 bg-[var(--color-bg-elevated)] border-y border-[var(--color-border)]">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader index="06" eyebrow="Milestones" heading="A few worth naming" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {achievements.map((a, i) => (
            <div
              key={a.id}
              data-reveal
              className="pixel-card group pixel-corners pixel-shadow-sm p-6 !bg-[var(--color-bg)]"
            >
              <span className="pixel-bracket border-t-2 border-l-2 top-2.5 left-2.5 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden />
              <span className="pixel-bracket border-b-2 border-r-2 bottom-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden />

              <div className="flex items-center justify-between mb-4">
                <p className="font-pixel text-[9px] uppercase tracking-[0.18em] text-[var(--color-accent)]">
                  {a.organization}
                </p>
                <span className="font-mono text-[10px] text-[var(--color-text-muted)]">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <h3 className="font-display font-bold text-base text-[var(--color-text)] mb-3 leading-snug tracking-tight">{a.title}</h3>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{a.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
