'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Mounted once at the root. Finds every [data-reveal] element on the page
// and fades/lifts it in as it enters the viewport — never touches elements
// already on screen, so nothing interferes with reading in-progress content.
export default function RevealController() {
  useEffect(() => {
    const targets = gsap.utils.toArray<HTMLElement>('[data-reveal]')
    if (!targets.length) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      gsap.set(targets, { opacity: 1, y: 0 })
      return
    }

    gsap.set(targets, { opacity: 0, y: 20 })

    const batches = ScrollTrigger.batch(targets, {
      start: 'top 88%',
      once: true,
      onEnter: (batch) =>
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          stagger: 0.08,
          overwrite: true,
        }),
    })

    return () => {
      batches.forEach((b) => b.kill())
    }
  }, [])

  return null
}
