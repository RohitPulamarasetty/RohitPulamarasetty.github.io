'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ArrowRight, ChevronDown, Compass, LineChart } from 'lucide-react'
import { SiReact, SiNextdotjs, SiTypescript, SiPython, SiNodedotjs, SiSupabase } from 'react-icons/si'

gsap.registerPlugin(useGSAP)

// Ambient pixel particles — deterministic positions, kept in the outer
// margins and the column gap so they never overlap reading content.
const PARTICLES = [
  { top: '20%', left: '2.5%', size: '6px', tone: '', delay: '0s' },
  { top: '68%', left: '4%', size: '4px', tone: 'is-muted', delay: '1.2s' },
  { top: '86%', left: '10%', size: '5px', tone: 'is-green', delay: '2.1s' },
  { top: '13%', left: '55%', size: '4px', tone: 'is-muted', delay: '0.6s' },
  { top: '30%', left: '95.5%', size: '6px', tone: '', delay: '1.8s' },
  { top: '58%', left: '97%', size: '4px', tone: 'is-green', delay: '0.3s' },
  { top: '82%', left: '92%', size: '5px', tone: 'is-muted', delay: '2.6s' },
  { top: '16%', left: '89%', size: '4px', tone: '', delay: '3.1s' },
  { top: '64%', left: '52%', size: '4px', tone: 'is-muted', delay: '1.5s' },
  { top: '91%', left: '46%', size: '5px', tone: '', delay: '0.9s' },
] as const

const TECH_STACK = [
  { Icon: SiReact, label: 'React' },
  { Icon: SiNextdotjs, label: 'Next.js' },
  { Icon: SiTypescript, label: 'TypeScript' },
  { Icon: SiPython, label: 'Python' },
  { Icon: SiNodedotjs, label: 'Node.js' },
  { Icon: SiSupabase, label: 'Supabase' },
]

export default function Hero() {
  const scope = useRef<HTMLElement>(null)
  const spotlightRef = useRef<HTMLDivElement>(null)
  const tiltRef = useRef<HTMLDivElement>(null)
  const primaryRef = useRef<HTMLAnchorElement>(null)

  useGSAP(
    () => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const canHover = window.matchMedia('(hover: hover)').matches

      // ---- Entrance ---------------------------------------------------
      // Functional content (name, tagline, CTAs) animates on TRANSFORM
      // only and its opacity is cleared first, so a stalled tab can never
      // leave text or buttons invisible. Decorative HUD elements may fade.
      if (!reduce) {
        gsap.set(['.hero-name-line', '.hero-rise', '.hero-cta'], { clearProps: 'opacity' })

        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

        tl.from('.hero-status', { y: -8, opacity: 0, duration: 0.5 })
          .from('.hero-name-line', { yPercent: 115, duration: 0.72, stagger: 0.09 }, '-=0.2')
          .from('.hero-caret', { scaleY: 0, transformOrigin: 'bottom', duration: 0.3 }, '-=0.15')
          .from('.hero-rise', { y: 14, opacity: 0, duration: 0.55, stagger: 0.09 }, '-=0.4')
          .from('.hero-cta', { y: 12, duration: 0.5, stagger: 0.08 }, '-=0.35')
          // Portrait frame: draw + settle
          .from('.hero-viewport', { scale: 0.95, opacity: 0, duration: 0.7, ease: 'power2.out' }, '-=0.75')
          .from('.hero-viewport-inner', { yPercent: 8, duration: 0.8, ease: 'power2.out' }, '<')
          // HUD elements snap into place with a tiny overshoot
          .from(
            '.hero-hud',
            { scale: 0.6, opacity: 0, duration: 0.4, ease: 'back.out(2.4)', stagger: 0.1 },
            '-=0.35'
          )
          .from('.hero-scroll', { opacity: 0, duration: 0.6 }, '-=0.2')
      }

      // ---- Cursor spotlight (subtle, section-wide) --------------------
      let raf = 0
      const onSpot = (e: PointerEvent) => {
        if (raf) return
        raf = requestAnimationFrame(() => {
          raf = 0
          const el = scope.current
          const sp = spotlightRef.current
          if (!el || !sp) return
          const r = el.getBoundingClientRect()
          sp.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`)
          sp.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`)
        })
      }

      // ---- Portrait parallax tilt (capped small) ---------------------
      let quickX: ((v: number) => void) | null = null
      let quickY: ((v: number) => void) | null = null
      if (!reduce && canHover && tiltRef.current) {
        quickX = gsap.quickTo(tiltRef.current, 'rotateY', { duration: 0.7, ease: 'power3.out' })
        quickY = gsap.quickTo(tiltRef.current, 'rotateX', { duration: 0.7, ease: 'power3.out' })
      }
      const onTilt = (e: MouseEvent) => {
        if (!tiltRef.current || !quickX || !quickY) return
        const r = tiltRef.current.getBoundingClientRect()
        quickX(((e.clientX - r.left) / r.width - 0.5) * 8)
        quickY(((e.clientY - r.top) / r.height - 0.5) * -8)
      }
      const onLeave = () => {
        quickX?.(0)
        quickY?.(0)
      }

      if (canHover) {
        scope.current?.addEventListener('pointermove', onSpot, { passive: true })
        if (!reduce) {
          scope.current?.addEventListener('mousemove', onTilt, { passive: true })
          scope.current?.addEventListener('mouseleave', onLeave)
        }
      }

      // ---- Magnetic primary CTA (subtle) -----------------------------
      const btn = primaryRef.current
      let mqx: ((v: number) => void) | null = null
      let mqy: ((v: number) => void) | null = null
      if (!reduce && canHover && btn) {
        mqx = gsap.quickTo(btn, 'x', { duration: 0.5, ease: 'power3.out' })
        mqy = gsap.quickTo(btn, 'y', { duration: 0.5, ease: 'power3.out' })
      }
      const onBtnMove = (e: MouseEvent) => {
        if (!btn || !mqx || !mqy) return
        const r = btn.getBoundingClientRect()
        mqx((e.clientX - (r.left + r.width / 2)) * 0.22)
        mqy((e.clientY - (r.top + r.height / 2)) * 0.22)
      }
      const onBtnLeave = () => {
        mqx?.(0)
        mqy?.(0)
      }
      if (!reduce && canHover && btn) {
        btn.addEventListener('mousemove', onBtnMove)
        btn.addEventListener('mouseleave', onBtnLeave)
      }

      return () => {
        if (raf) cancelAnimationFrame(raf)
        scope.current?.removeEventListener('pointermove', onSpot)
        scope.current?.removeEventListener('mousemove', onTilt)
        scope.current?.removeEventListener('mouseleave', onLeave)
        btn?.removeEventListener('mousemove', onBtnMove)
        btn?.removeEventListener('mouseleave', onBtnLeave)
      }
    },
    { scope }
  )

  return (
    <section
      ref={scope}
      id="hero"
      className="hero-canvas relative min-h-[100svh] flex items-center overflow-hidden pt-28 pb-16 lg:pt-24 border-b border-[var(--color-border)]"
      style={{ perspective: '1400px' }}
    >
      {/* --- Background system: line grid, dot field, aurora, spotlight, fades --- */}
      <div className="hero-lines absolute inset-0" aria-hidden />
      <div className="hero-dots absolute inset-0" aria-hidden />
      {/* Drifting aurora glows */}
      <div className="hero-aurora absolute w-[42rem] h-[42rem] top-[-8rem] right-[-8rem] rounded-full" aria-hidden />
      <div className="hero-aurora is-green absolute w-[32rem] h-[32rem] bottom-[-10rem] left-[-10rem] rounded-full" aria-hidden />
      <div ref={spotlightRef} className="hero-spotlight absolute inset-0" aria-hidden />
      <div
        className="absolute inset-x-0 bottom-0 h-28 pointer-events-none"
        aria-hidden
        style={{ background: 'linear-gradient(to top, var(--hero-base), transparent)' }}
      />

      {/* Ambient pixel constellation — fixed positions in the margins/gaps
          only, desktop only, so it never crowds the text or mobile layout. */}
      <div className="hidden lg:block absolute inset-0 pointer-events-none" aria-hidden>
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className={`pixel-particle ${p.tone}`}
            style={{ top: p.top, left: p.left, width: p.size, height: p.size, animationDelay: p.delay }}
          />
        ))}
      </div>

      <div className="relative w-full max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-y-14 lg:gap-x-16 items-center">
        {/* ============================ LEFT ============================ */}
        <div className="max-w-2xl">
          {/* Identity / status line */}
          <div className="hero-status flex items-center gap-2.5 mb-7">
            <span className="relative flex h-2 w-2" aria-hidden>
              <span className="absolute inline-flex h-full w-full bg-[var(--color-accent-2)] animate-ping opacity-60" />
              <span className="relative inline-flex h-2 w-2 bg-[var(--color-accent-2)]" />
            </span>
            <span className="font-pixel text-[9px] leading-none tracking-[0.2em] uppercase text-[var(--color-text-muted)]">
              IIT Madras &apos;28
            </span>
            <span className="h-3 w-px bg-[var(--color-border)]" aria-hidden />
            <span className="font-pixel text-[9px] leading-none tracking-[0.2em] uppercase text-[var(--color-accent)]">
              Founder / Builder
            </span>
          </div>

          {/* Name — the thesis. Display face, uppercase, tight. Pixel DNA
              is limited to the single blinking caret. */}
          <h1 className="font-display font-bold uppercase text-[var(--color-text)] leading-[0.92] tracking-[-0.02em] text-[clamp(2.1rem,6.4vw,4.4rem)] mb-6">
            <span className="block overflow-hidden py-[0.04em]">
              <span className="hero-name-line block whitespace-nowrap">Rohit Kumar</span>
            </span>
            <span className="block overflow-hidden py-[0.04em]">
              <span className="hero-name-line block whitespace-nowrap">
                Pulamarasetty
                <span className="hero-caret name-caret" aria-hidden />
              </span>
            </span>
          </h1>

          {/* Value proposition */}
          <p className="hero-rise font-display text-xl sm:text-2xl font-medium text-[var(--color-text)] leading-snug mb-4 max-w-md">
            I build things, then figure out what to build next.
          </p>
          <p className="hero-rise text-[15px] leading-relaxed text-[var(--color-text-muted)] mb-9 max-w-md">
            Founder of Beyond Binary Solutions. Shipped IITM Grade Suite and Findora — now
            going deeper into machine learning and quant finance.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3.5">
            <a
              ref={primaryRef}
              href="#work"
              className="hero-cta group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 pixel-corners-sm pixel-shadow-sm bg-[var(--color-accent)] text-white font-display font-semibold text-sm uppercase tracking-wide hover:brightness-105 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-[filter,transform,box-shadow] will-change-transform"
            >
              View my work
              <ArrowRight
                className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                strokeWidth={2.5}
              />
            </a>
            <a
              href="#contact"
              className="hero-cta inline-flex items-center justify-center px-6 py-3.5 pixel-corners-sm border border-[var(--color-border)] bg-[var(--color-bg-elevated)] text-[var(--color-text)] font-display font-semibold text-sm uppercase tracking-wide hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors"
            >
              Get in touch
            </a>
          </div>

          {/* Stack — quiet developer signal */}
          <div className="hero-rise flex items-center gap-4 mt-11">
            <span className="font-pixel text-[9px] uppercase tracking-[0.2em] text-[var(--color-text-muted)] whitespace-nowrap">
              Stack
            </span>
            <div className="h-px w-8 bg-[var(--color-border)]" aria-hidden />
            <div className="flex items-center gap-4">
              {TECH_STACK.map(({ Icon, label }) => (
                <Icon key={label} className="tech-icon w-[18px] h-[18px]" title={label} aria-label={label} />
              ))}
            </div>
          </div>
        </div>

        {/* ============================ RIGHT ============================ */}
        <div className="justify-self-center lg:justify-self-end w-full max-w-[340px] sm:max-w-[380px]">
          <div ref={tiltRef} className="relative" style={{ transformStyle: 'preserve-3d' }}>
            {/* System viewport */}
            <div className="hero-viewport viewport-frame pixel-corners pixel-shadow">
              {/* Window bar — window dots, live build status, signal.
                  The bar carries a real fact instead of decoration. */}
              <div className="viewport-bar">
                <div className="flex items-center gap-1.5" aria-hidden>
                  <span className="w-2 h-2 bg-[var(--color-border)]" />
                  <span className="w-2 h-2 bg-[var(--color-border)]" />
                  <span className="w-2 h-2 bg-[var(--color-accent)]" />
                </div>
                <div className="mx-auto flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[var(--color-accent-2)] animate-pulse" aria-hidden />
                  <span className="font-pixel text-[9px] tracking-[0.15em] uppercase text-[var(--color-text-muted)]">
                    Building FoundBrew
                  </span>
                </div>
                <div className="flex items-end gap-[3px] h-3" aria-hidden>
                  <span className="signal-bar h-1/3" />
                  <span className="signal-bar h-2/3" />
                  <span className="signal-bar h-full" />
                </div>
              </div>

              {/* Portrait stage */}
              <div className="portrait-stage relative aspect-[5/5] overflow-hidden">
                <div className="hero-viewport-inner portrait-drift absolute inset-0">
                  <Image
                    src="/rohit_cutout.png"
                    alt="Pixel-art portrait of Rohit Kumar Pulamarasetty"
                    fill
                    priority
                    className="object-contain object-bottom pixelated"
                    sizes="(max-width: 640px) 340px, 380px"
                  />
                </div>
                <div className="photo-scan" aria-hidden />

                {/* corner brackets */}
                {(
                  ['top-0 left-0', 'top-0 right-0 -scale-x-100', 'bottom-0 left-0 -scale-y-100', 'bottom-0 right-0 -scale-100'] as const
                ).map((pos) => (
                  <span
                    key={pos}
                    aria-hidden
                    className={`absolute w-5 h-5 border-t-2 border-l-2 border-[var(--color-accent)] ${pos} m-2.5`}
                  />
                ))}
              </div>
            </div>

            {/* HUD nameplate chips — anchored to the frame's bottom edge like
                a character nameplate. Consolidated from the old scattered
                badges: role + focus, the founder / ML+quant duality. */}
            <div className="hero-hud hud-chip pixel-corners-sm absolute -bottom-3.5 left-4">
              <Compass className="w-3.5 h-3.5 text-[var(--color-accent)]" strokeWidth={2.2} />
              <span className="text-[11px] font-semibold text-[var(--color-text)] whitespace-nowrap">Founder</span>
            </div>
            <div className="hero-hud hud-chip pixel-corners-sm absolute -bottom-3.5 right-4">
              <LineChart className="w-3.5 h-3.5 text-[var(--color-accent-2)]" strokeWidth={2.2} />
              <span className="text-[11px] font-semibold text-[var(--color-text)] whitespace-nowrap">
                ML &amp; Quant
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* HUD footer strip — anchors the bottom of the hero with a system
          readout (location) and the scroll affordance. */}
      <div className="hero-scroll absolute inset-x-0 bottom-0 z-10 border-t border-[var(--color-border)] bg-[color-mix(in_srgb,var(--hero-base)_70%,transparent)] backdrop-blur-[2px]">
        <div className="max-w-6xl mx-auto px-6 h-11 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--color-text-muted)]">
            <span className="relative flex h-1.5 w-1.5" aria-hidden>
              <span className="absolute inline-flex h-full w-full bg-[var(--color-accent-2)] animate-ping opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 bg-[var(--color-accent-2)]" />
            </span>
            <span>Bangalore</span>
            <span className="text-[var(--color-border)]" aria-hidden>&rarr;</span>
            <span>Chennai</span>
            <span className="text-[var(--color-border)]" aria-hidden>&rarr;</span>
            <span className="text-[var(--color-accent)]">Beyond</span>
          </div>

          <a
            href="#work"
            aria-label="Scroll to work"
            className="group flex items-center gap-2 font-pixel text-[9px] uppercase tracking-[0.2em] text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors"
          >
            Scroll
            <ChevronDown className="scroll-cue w-3.5 h-3.5" strokeWidth={2} aria-hidden />
          </a>
        </div>
      </div>
    </section>
  )
}
