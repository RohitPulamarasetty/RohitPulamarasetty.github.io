'use client'

import { motion } from 'framer-motion'
import { GraduationCap, Rocket, Users } from 'lucide-react'
import { timeline } from '@/lib/data'
import type { TimelineItem } from '@/types'

const typeConfig: Record<
  TimelineItem['type'],
  {
    icon: React.ComponentType<{ className?: string; strokeWidth?: number }>
    color: string
    bg: string
    ring: string
    glow: string
  }
> = {
  education: {
    icon: GraduationCap,
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
    ring: 'border-blue-200 dark:border-blue-900/50',
    glow: 'shadow-blue-500/20',
  },
  work: {
    icon: Rocket,
    color: 'text-violet-500',
    bg: 'bg-violet-500/10',
    ring: 'border-violet-200 dark:border-violet-900/50',
    glow: 'shadow-violet-500/20',
  },
  activity: {
    icon: Users,
    color: 'text-emerald-500',
    bg: 'bg-emerald-500/10',
    ring: 'border-emerald-200 dark:border-emerald-900/50',
    glow: 'shadow-emerald-500/20',
  },
}

export default function Timeline() {
  return (
    <section
      id="journey"
      className="scroll-mt-20 py-24 md:py-32 bg-[#f9f9f9] dark:bg-[#0d0d0d]"
    >
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <p className="text-xs font-mono uppercase tracking-widest text-[#666] dark:text-[#777] mb-3">
            Journey
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0f0f0f] dark:text-[#f2f2f2] tracking-tight">
            Builder journey
          </h2>
          <p className="mt-3 text-base text-[#666] dark:text-[#888]">
            From studying to shipping real products.
          </p>
        </motion.div>

        <div className="relative max-w-2xl">
          {/* Animated vertical connector line */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            style={{ originY: 0 }}
            className="absolute left-[19px] top-5 bottom-5 w-px bg-gradient-to-b from-[#c8c8c8] via-[#e0e0e0] to-transparent dark:from-[#3a3a3a] dark:via-[#282828] dark:to-transparent hidden md:block"
          />

          <div className="space-y-10">
            {timeline.map((item, i) => {
              const { icon: Icon, color, bg, ring, glow } = typeConfig[item.type]
              const isLast = i === timeline.length - 1
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="flex gap-6 md:gap-8"
                >
                  {/* Icon circle */}
                  <div className="hidden md:flex flex-col items-center flex-shrink-0">
                    <div
                      className={`w-10 h-10 rounded-full border ${ring} ${bg} flex items-center justify-center shadow-lg ${glow} ${isLast ? 'ring-2 ring-offset-2 ring-offset-[#f9f9f9] dark:ring-offset-[#0d0d0d] ring-violet-500/30' : ''}`}
                    >
                      <Icon className={`w-4 h-4 ${color}`} strokeWidth={1.5} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-1.5 pb-2">
                    <span className="inline-block text-[10px] font-mono text-[#666] dark:text-[#aaa] uppercase tracking-widest mb-2 bg-[#f5f5f5] dark:bg-[#1e1e1e] border border-[#d5d5d5] dark:border-[#3a3a3a] rounded-full px-2.5 py-0.5">
                      {item.year}
                    </span>
                    <h3 className="text-[15px] font-semibold text-[#0f0f0f] dark:text-[#f2f2f2] mb-0.5 leading-snug mt-2">
                      {item.title}
                    </h3>
                    <p className="text-[13px] font-medium text-[#555] dark:text-[#999] mb-2">
                      {item.organization}
                    </p>
                    <p className="text-[14px] text-[#555] dark:text-[#999] leading-relaxed">
                      {item.description}
                    </p>
                    {isLast && (
                      <span className="inline-flex items-center gap-1.5 mt-3 text-[10px] font-mono uppercase tracking-widest text-emerald-500">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Current
                      </span>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
