'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ThemeToggle from '@/components/ui/ThemeToggle'
import { Menu, X } from 'lucide-react'

gsap.registerPlugin(useGSAP)

const navLinks = [
  { label: 'Work', href: '#work', section: 'work' },
  { label: 'About', href: '#about', section: 'about' },
  { label: 'Learning', href: '#currently', section: 'currently' },
  { label: 'Skills', href: '#skills', section: 'skills' },
  { label: 'Journey', href: '#journey', section: 'journey' },
]

const OFFSET = 140

export default function Header() {
  const [activeSection, setActiveSection] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const pillRef = useRef<HTMLSpanElement>(null)
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({})

  // Scroll-based active section — deterministic (last section whose top has
  // passed the offset line), rAF-throttled so it never lags or double-fires.
  useEffect(() => {
    let ticking = false

    const compute = () => {
      ticking = false
      const y = window.scrollY

      if (y < 80) {
        setActiveSection('')
        return
      }

      let current = ''
      let bestTop = -Infinity
      for (const link of navLinks) {
        const el = document.getElementById(link.section)
        if (el && el.offsetTop - OFFSET <= y && el.offsetTop > bestTop) {
          current = link.section
          bestTop = el.offsetTop
        }
      }
      setActiveSection(current)
    }

    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(compute)
      }
    }

    compute()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  // Slide the pill indicator behind the active link
  useGSAP(
    () => {
      const pill = pillRef.current
      const nav = navRef.current
      if (!pill || !nav) return

      const activeEl = activeSection ? linkRefs.current[activeSection] : null

      if (!activeEl) {
        gsap.to(pill, { opacity: 0, duration: 0.25 })
        return
      }

      const navRect = nav.getBoundingClientRect()
      const linkRect = activeEl.getBoundingClientRect()

      gsap.to(pill, {
        opacity: 1,
        x: linkRect.left - navRect.left,
        width: linkRect.width,
        duration: 0.4,
        ease: 'power3.out',
      })
    },
    { dependencies: [activeSection] }
  )

  useEffect(() => {
    if (!menuOpen) return
    const close = () => setMenuOpen(false)
    window.addEventListener('scroll', close, { once: true, passive: true })
    return () => window.removeEventListener('scroll', close)
  }, [menuOpen])

  return (
    <>
      <header className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-6 pointer-events-none">
        <div className="flex items-center">
          <div className="flex-1 flex items-center pointer-events-auto">
            <Link
              href="/"
              onClick={(e) => {
                e.preventDefault()
                window.scrollTo({ top: 0, behavior: 'smooth' })
                window.history.pushState(null, '', '/')
                setActiveSection('')
              }}
              className="font-pixel text-base text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors active:scale-95"
            >
              RP.
            </Link>
          </div>

          <nav
            ref={navRef}
            className="hidden md:flex relative pointer-events-auto items-center h-12 px-2 gap-0.5 rounded-full bg-[var(--color-bg-elevated)]/90 backdrop-blur-xl border border-[var(--color-border)] shadow-[0_2px_16px_rgba(0,0,0,0.08)]"
            aria-label="Primary"
          >
            <span ref={pillRef} className="nav-pill opacity-0" aria-hidden />
            {navLinks.map((link) => (
              <a
                key={link.href}
                ref={(el) => {
                  linkRefs.current[link.section] = el
                }}
                href={link.href}
                aria-current={activeSection === link.section ? 'page' : undefined}
                className={`relative z-[1] px-4 py-2 rounded-full font-mono font-medium text-[11px] uppercase tracking-[0.12em] transition-colors duration-200 whitespace-nowrap active:scale-95 ${
                  activeSection === link.section
                    ? 'text-white'
                    : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex-1 flex items-center justify-end gap-2 pointer-events-auto">
            <ThemeToggle />
            <a
              href="#contact"
              className="hidden md:inline-flex items-center font-mono font-medium text-[11px] uppercase tracking-[0.12em] px-4 py-2.5 rounded-full bg-[var(--color-text)] text-[var(--color-bg)] hover:bg-[var(--color-accent)] hover:text-white active:scale-95 transition-all"
            >
              Contact
            </a>
            <button
              onClick={() => setMenuOpen((o) => !o)}
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-full text-[var(--color-text-muted)] hover:bg-[var(--color-bg-elevated)] active:scale-90 transition-all duration-200"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              <span className={`transition-transform duration-300 ${menuOpen ? 'rotate-90' : 'rotate-0'}`}>
                {menuOpen ? <X className="w-[18px] h-[18px]" strokeWidth={2} /> : <Menu className="w-[18px] h-[18px]" strokeWidth={2} />}
              </span>
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} activeSection={activeSection} onClose={() => setMenuOpen(false)} />
    </>
  )
}

function MobileMenu({
  open,
  activeSection,
  onClose,
}: {
  open: boolean
  activeSection: string
  onClose: () => void
}) {
  const panelRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!panelRef.current) return
      if (open) {
        gsap.set(panelRef.current, { display: 'flex' })
        gsap.fromTo(panelRef.current, { opacity: 0 }, { opacity: 1, duration: 0.25 })
        gsap.fromTo(
          '.mobile-link',
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.4, stagger: 0.06, delay: 0.1, ease: 'power2.out' }
        )
      } else {
        gsap.to(panelRef.current, {
          opacity: 0,
          duration: 0.2,
          onComplete: () => gsap.set(panelRef.current, { display: 'none' }),
        })
      }
    },
    { dependencies: [open] }
  )

  return (
    <div
      ref={panelRef}
      className="fixed inset-0 z-40 hidden flex-col bg-[var(--color-bg)]/98 backdrop-blur-xl md:hidden"
      style={{ display: 'none' }}
    >
      <nav className="flex-1 flex flex-col items-center justify-center gap-2 px-6" aria-label="Mobile">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={onClose}
            className={`mobile-link font-pixel text-xl px-4 py-3 transition-colors ${
              activeSection === link.section ? 'text-[var(--color-accent)]' : 'text-[var(--color-text)]'
            }`}
          >
            {link.label}
          </a>
        ))}
        <a
          href="#contact"
          onClick={onClose}
          className="mobile-link mt-4 inline-flex items-center justify-center px-8 py-3.5 pixel-corners-sm pixel-shadow-sm bg-[var(--color-accent)] text-white font-pixel text-sm"
        >
          Contact
        </a>
      </nav>
    </div>
  )
}
