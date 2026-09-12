import type { ReactNode } from 'react'

interface BrowserFrameProps {
  url: string
  children: ReactNode
  className?: string
}

export default function BrowserFrame({ url, children, className = '' }: BrowserFrameProps) {
  return (
    <div className={`browser-frame pixel-corners pixel-shadow-sm overflow-hidden ${className}`}>
      <div className="browser-frame-bar">
        <span className="browser-frame-dot" />
        <span className="browser-frame-dot" />
        <span className="browser-frame-dot" />
        <span className="browser-frame-url">{url}</span>
      </div>
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-[var(--color-bg)]">{children}</div>
    </div>
  )
}
