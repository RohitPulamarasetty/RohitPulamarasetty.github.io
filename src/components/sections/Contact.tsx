'use client'

import { ArrowUpRight, Mail } from 'lucide-react'
import { socials } from '@/lib/data'

export default function Contact() {
  return (
    <section id="contact" className="relative scroll-mt-24 py-28 md:py-36 overflow-hidden bg-[#0e0d0b] text-[#faf5ea]">
      <div
        className="dot-grid absolute inset-0 opacity-60"
        style={{ ['--grid-line' as string]: 'rgba(244, 239, 226, 0.08)' }}
        aria-hidden
      />
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 55% 60% at 50% 0%, rgba(224, 139, 62, 0.18) 0%, transparent 70%)',
        }}
        aria-hidden
      />

      <div data-reveal className="relative max-w-2xl mx-auto px-6 text-center">
        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="section-index pixel-corners-sm" style={{ background: 'transparent', borderColor: 'rgba(244,239,226,0.18)', color: '#e0a35f' }}>
            07
          </span>
          <span className="h-px w-6 bg-[rgba(244,239,226,0.2)]" aria-hidden />
          <span className="font-pixel text-[10px] uppercase tracking-[0.22em] text-[#e0a35f]">What&apos;s Next</span>
        </div>

        <h2 className="font-display font-bold text-[#faf5ea] tracking-tight leading-[1.1] text-[clamp(1.9rem,5vw,3rem)] mb-5">
          Have something worth building?
          <span className="term-caret text-[#e0a35f] align-baseline" aria-hidden />
        </h2>

        <p className="text-base text-[#c9bfb2] mb-10 max-w-md mx-auto">
          Always glad to hear from builders. I read every note.
        </p>

        <div className="flex flex-col items-center gap-7">
          <a
            href={`mailto:${socials.email}`}
            className="group inline-flex items-center gap-2.5 px-7 py-3.5 pixel-corners-sm pixel-shadow-sm bg-[#f0c68a] text-[#1a1408] font-display font-semibold text-sm hover:brightness-105 hover:-translate-x-px hover:-translate-y-px active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
          >
            <Mail className="w-4 h-4" strokeWidth={2.2} />
            {socials.email}
          </a>

          <div className="flex items-center gap-6 text-sm font-medium text-[#c9bfb2]">
            <a href={socials.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-white transition-colors">
              GitHub <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2} />
            </a>
            <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-white transition-colors">
              LinkedIn <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2} />
            </a>
            <a href={socials.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-white transition-colors">
              Instagram <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2} />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
