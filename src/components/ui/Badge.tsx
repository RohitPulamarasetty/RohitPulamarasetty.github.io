interface BadgeProps {
  children: string
  mono?: boolean
  variant?: 'default' | 'outline'
}

export default function Badge({ children, mono = false, variant = 'default' }: BadgeProps) {
  const base = 'inline-flex items-center px-2.5 py-1 text-xs rounded-full transition-colors'

  const variants = {
    default: 'bg-[#f0f0f0] dark:bg-[#1a1a1a] text-[#444] dark:text-[#aaa]',
    outline: 'border border-[#e8e8e8] dark:border-[#1e1e1e] text-[#666] dark:text-[#888]',
  }

  return (
    <span className={`${base} ${variants[variant]} ${mono ? 'font-mono' : 'font-medium'}`}>
      {children}
    </span>
  )
}
