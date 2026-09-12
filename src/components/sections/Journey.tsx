import SectionHeader from '@/components/ui/SectionHeader'
import { timeline } from '@/lib/data'

export default function Journey() {
  return (
    <section id="journey" className="scroll-mt-24 py-24 md:py-32 bg-[var(--color-bg)] overflow-hidden">
      <div className="max-w-4xl mx-auto px-6">
        <SectionHeader index="05" eyebrow="How I Got Here" heading="The path so far" center />

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-2 bottom-2 w-px bg-[var(--color-border)]" aria-hidden />

          <ol className="space-y-2 md:space-y-0">
            {timeline.map((item, i) => {
              const rightSide = i % 2 === 1
              return (
                <li
                  key={item.id}
                  data-reveal
                  className="relative pl-12 md:pl-0 md:py-8 md:grid md:grid-cols-2 md:gap-10"
                >
                  <span
                    aria-hidden
                    className="absolute left-4 md:left-1/2 top-1.5 md:top-[38px] -translate-x-1/2 w-3 h-3 rotate-45 bg-[var(--color-accent)] ring-4 ring-[var(--color-bg)] z-10"
                  />
                  <div className={rightSide ? 'md:col-start-2 md:pl-10' : 'md:col-start-1 md:pr-10 md:text-right md:ml-auto md:max-w-sm'}>
                    <p className={`mb-2.5 ${rightSide ? '' : 'md:flex md:justify-end'}`}>
                      <span className="inline-flex items-center font-pixel text-[9px] uppercase tracking-[0.16em] text-[var(--color-accent)] px-2 py-1 pixel-corners-sm border border-[var(--color-border)] bg-[var(--color-bg-elevated)]">
                        {item.date}
                      </span>
                    </p>
                    <h3 className="font-display font-bold text-lg text-[var(--color-text)] mb-1.5 leading-snug tracking-tight">{item.title}</h3>
                    {item.organization && (
                      <p className="text-sm font-medium text-[var(--color-accent-2)] mb-1.5">{item.organization}</p>
                    )}
                    <p className="text-[15px] text-[var(--color-text-muted)] leading-relaxed max-w-sm md:ml-auto">
                      {item.description}
                    </p>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
