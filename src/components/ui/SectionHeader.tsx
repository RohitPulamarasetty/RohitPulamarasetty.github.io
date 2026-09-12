interface SectionHeaderProps {
  eyebrow: string
  heading: string
  sub?: string
  index?: string
  center?: boolean
}

export default function SectionHeader({ eyebrow, heading, sub, index, center = false }: SectionHeaderProps) {
  return (
    <div data-reveal className={`mb-14 ${center ? 'text-center flex flex-col items-center' : ''}`}>
      {/* HUD label row: [ index ] — eyebrow */}
      <div className={`flex items-center gap-3 mb-5 ${center ? 'justify-center' : ''}`}>
        {index && <span className="section-index pixel-corners-sm">{index}</span>}
        <span className="h-px w-6 bg-[var(--color-border)]" aria-hidden />
        <span className="font-pixel text-[10px] uppercase tracking-[0.22em] text-[var(--color-accent)]">
          {eyebrow}
        </span>
      </div>

      <h2 className="font-display font-bold text-[var(--color-text)] leading-[1.05] tracking-[-0.015em] text-[clamp(1.7rem,3.4vw,2.6rem)]">
        {heading}
      </h2>

      {sub && (
        <p className={`mt-4 text-base text-[var(--color-text-muted)] max-w-lg ${center ? 'mx-auto' : ''}`}>
          {sub}
        </p>
      )}
    </div>
  )
}
