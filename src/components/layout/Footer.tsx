'use client'

import Image from 'next/image'
import { ArrowUp } from 'lucide-react'
import { GitHubIcon, LinkedInIcon, InstagramIcon } from '@/components/ui/BrandIcons'
import { socials } from '@/lib/data'

export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-bg)]">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative w-8 h-9 pixel-corners-sm border border-[var(--color-border)] bg-[var(--color-bg-elevated)] flex-shrink-0">
              <Image
                src="/rohit_cutout.png"
                alt=""
                fill
                aria-hidden
                className="object-contain object-bottom pixelated p-0.5"
                sizes="32px"
              />
            </div>
            <div className="flex flex-col items-start gap-0.5">
              <p className="font-display font-bold text-sm text-[var(--color-text)] tracking-tight">
                Rohit Kumar Pulamarasetty
              </p>
              <p className="font-pixel text-[8px] text-[var(--color-text-muted)] uppercase tracking-[0.14em] mt-1">Builder · Founder · IIT Madras</p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <a
              href={socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center rounded-full text-[var(--color-text-muted)] hover:text-[var(--color-accent)] hover:bg-[var(--color-bg-elevated)] hover:-translate-y-0.5 transition-all duration-150"
              aria-label="GitHub"
            >
              <GitHubIcon className="w-4 h-4" />
            </a>
            <a
              href={socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center rounded-full text-[var(--color-text-muted)] hover:text-[var(--color-accent)] hover:bg-[var(--color-bg-elevated)] hover:-translate-y-0.5 transition-all duration-150"
              aria-label="LinkedIn"
            >
              <LinkedInIcon className="w-4 h-4" />
            </a>
            <a
              href={socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center rounded-full text-[var(--color-text-muted)] hover:text-[var(--color-accent)] hover:bg-[var(--color-bg-elevated)] hover:-translate-y-0.5 transition-all duration-150"
              aria-label="Instagram"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${socials.email}`}
              className="w-9 h-9 flex items-center justify-center rounded-full text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg-elevated)] transition-all duration-150 text-sm font-medium"
              aria-label="Email"
            >
              <span className="text-xs" aria-hidden>@</span>
            </a>

            <div className="w-px h-5 bg-[var(--color-border)] mx-2" />

            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="w-9 h-9 flex items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:border-[var(--color-accent)] transition-all duration-150"
              aria-label="Back to top"
            >
              <ArrowUp className="w-3.5 h-3.5" strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
