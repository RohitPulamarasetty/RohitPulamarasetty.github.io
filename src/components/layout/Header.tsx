'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import ThemeToggle from '@/components/ui/ThemeToggle'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Builds', href: '#builds', section: 'builds' },
  { label: 'Projects', href: '#projects', section: 'projects' },
  { label: 'About', href: '#about', section: 'about' },
  { label: 'Journey', href: '#journey', section: 'journey' },
  { label: 'Now', href: '#now', section: 'now' },
]

export default function Header() {
  const [activeSection, setActiveSection] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        }
      },
      { threshold: 0.15, rootMargin: '-5% 0px -70% 0px' }
    )
    navLinks.forEach(({ section }) => {
      const el = document.getElementById(section)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 80) setActiveSection('')
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const close = () => setMenuOpen(false)
    window.addEventListener('scroll', close, { once: true, passive: true })
    return () => window.removeEventListener('scroll', close)
  }, [menuOpen])

  return (
    <>
      <header className="fixed top-4 left-0 right-0 z-50 px-6 pointer-events-none">
        <div className="flex items-center">

          {/* Zone 1 — Brand */}
          <div className="flex-1 flex items-center pointer-events-auto">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault()
                window.scrollTo({ top: 0, behavior: 'smooth' })
                setActiveSection('')
              }}
              className="text-[13px] font-semibold text-[#0f0f0f] dark:text-[#f2f2f2] hover:opacity-50 transition-opacity tracking-tight"
            >
              Rohit P.
            </a>
          </div>

          {/* Zone 2 — Navigation capsule (desktop only) */}
          <nav className="hidden md:flex pointer-events-auto items-center h-10 px-1.5 rounded-full bg-white/90 dark:bg-[#0d0d0d]/90 backdrop-blur-xl border border-[#e4e4e4] dark:border-[#242424] shadow-[0_2px_16px_rgba(0,0,0,0.07),0_0_0_0.5px_rgba(0,0,0,0.03)] dark:shadow-[0_2px_16px_rgba(0,0,0,0.5),0_0_0_0.5px_rgba(255,255,255,0.02)]">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                aria-current={activeSection === link.section ? 'page' : undefined}
              className={`px-3 py-1.5 rounded-full text-[13px] font-medium transition-all duration-200 whitespace-nowrap ${
                  activeSection === link.section
                    ? 'bg-[#0f0f0f] dark:bg-[#f2f2f2] text-white dark:text-[#0f0f0f]'
                    : 'text-[#666] dark:text-[#777] hover:text-[#0f0f0f] dark:hover:text-[#f2f2f2] hover:bg-[#f5f5f5] dark:hover:bg-[#1a1a1a]'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3 — Actions */}
          <div className="flex-1 flex items-center justify-end gap-2 pointer-events-auto">
            <ThemeToggle />
            <a
              href="#contact"
              className="hidden md:inline-flex items-center text-[13px] font-semibold px-4 py-2 rounded-full bg-[#0f0f0f] dark:bg-[#f2f2f2] text-white dark:text-[#0f0f0f] hover:opacity-70 transition-opacity"
            >
              Contact
            </a>
            <button
              onClick={() => setMenuOpen((o) => !o)}
              className="md:hidden w-8 h-8 flex items-center justify-center rounded-full text-[#555] dark:text-[#999] hover:bg-[#f0f0f0] dark:hover:bg-[#1a1a1a] transition-all duration-200"
              aria-label="Toggle menu"
            >
              {menuOpen
                ? <X className="w-[15px] h-[15px]" strokeWidth={2} />
                : <Menu className="w-[15px] h-[15px]" strokeWidth={2} />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="fixed inset-x-4 top-[68px] z-40 rounded-2xl bg-white dark:bg-[#111] border border-[#e8e8e8] dark:border-[#1e1e1e] shadow-[0_8px_40px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_40px_rgba(0,0,0,0.6)] p-2">
          <nav className="flex flex-col gap-0.5">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="flex items-center px-4 py-3 rounded-xl text-[14px] font-medium text-[#0f0f0f] dark:text-[#f2f2f2] hover:bg-[#f5f5f5] dark:hover:bg-[#1a1a1a] transition-colors duration-150"
              >
                {link.label}
              </a>
            ))}
            <div className="h-px bg-[#f0f0f0] dark:bg-[#1e1e1e] my-1 mx-2" />
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-center px-4 py-3 rounded-xl text-[14px] font-semibold bg-[#0f0f0f] dark:bg-[#f2f2f2] text-white dark:text-[#0f0f0f] hover:opacity-80 transition-opacity"
            >
              Contact
            </a>
          </nav>
        </div>
      )}
    </>
  )
}
