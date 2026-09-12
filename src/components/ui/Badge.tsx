interface BadgeProps {
  children: string
  mono?: boolean
}

export default function Badge({ children }: BadgeProps) {
  return (
    <span className="inline-flex items-center px-2.5 py-1 pixel-corners-sm font-mono text-[10px] tracking-tight border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text-muted)]">
      {children}
    </span>
  )
}
