import Link from 'next/link'
import { type ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  external?: boolean
  download?: boolean
  className?: string
}

export default function Button({
  children,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  external = false,
  download = false,
  className = '',
}: ButtonProps) {
  const base =
    'inline-flex items-center gap-2 font-medium transition-all duration-200 cursor-pointer select-none'

  const variants = {
    primary:
      'bg-[#0f0f0f] text-white dark:bg-white dark:text-[#0f0f0f] hover:opacity-80',
    secondary:
      'border border-[#e8e8e8] dark:border-[#1e1e1e] text-[#0f0f0f] dark:text-[#f2f2f2] hover:border-[#c8c8c8] dark:hover:border-[#333]',
    ghost:
      'text-[#666] dark:text-[#888] hover:text-[#0f0f0f] dark:hover:text-[#f2f2f2]',
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm rounded-full',
    md: 'px-5 py-2.5 text-sm rounded-full',
    lg: 'px-7 py-3.5 text-base rounded-full',
  }

  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`

  if (href) {
    if (external || download) {
      return (
        <a
          href={href}
          className={cls}
          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          {...(download ? { download: true } : {})}
        >
          {children}
        </a>
      )
    }
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    )
  }

  return (
    <button onClick={onClick} className={cls}>
      {children}
    </button>
  )
}
