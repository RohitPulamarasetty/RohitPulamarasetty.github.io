interface SectionHeaderProps {
  label?: string
  heading: string
  sub?: string
  center?: boolean
}

export default function SectionHeader({ label, heading, sub, center = false }: SectionHeaderProps) {
  return (
    <div className={`mb-16 ${center ? 'text-center' : ''}`}>
      {label && (
        <p className="text-xs font-mono uppercase tracking-widest text-[#999] dark:text-[#555] mb-3">
          {label}
        </p>
      )}
      <h2 className="text-3xl md:text-4xl font-bold text-[#0f0f0f] dark:text-[#f2f2f2] tracking-tight">
        {heading}
      </h2>
      {sub && (
        <p className="mt-3 text-base text-[#666] dark:text-[#888] max-w-lg">
          {sub}
        </p>
      )}
    </div>
  )
}
