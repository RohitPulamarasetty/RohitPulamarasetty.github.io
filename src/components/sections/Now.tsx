'use client'

import { motion } from 'framer-motion'
import { Rocket, BookOpen, Compass } from 'lucide-react'
import type { LucideProps } from 'lucide-react'
import { nowItems } from '@/lib/data'

type LucideIcon = React.ComponentType<LucideProps>

const categoryConfig: Record<
  string,
  {
    icon: LucideIcon
    iconBg: string
    iconColor: string
    dotColor: string
    pulse: boolean
  }
> = {
  Building: {
    icon: Rocket,
    iconBg: 'bg-violet-500/10',
    iconColor: 'text-violet-500',
    dotColor: 'bg-emerald-500',
    pulse: true,
  },
  Learning: {
    icon: BookOpen,
    iconBg: 'bg-cyan-500/10',
    iconColor: 'text-cyan-500',
    dotColor: 'bg-cyan-400',
    pulse: false,
  },
  Exploring: {
    icon: Compass,
    iconBg: 'bg-amber-500/10',
    iconColor: 'text-amber-500',
    dotColor: 'bg-amber-400',
    pulse: false,
  },
}

export default function Now() {
  return (
    <section id="now" className="scroll-mt-20 py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <p className="text-xs font-mono uppercase tracking-widest text-[#666] dark:text-[#777] mb-3">
            Now
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0f0f0f] dark:text-[#f2f2f2] tracking-tight">
            What I&apos;m focused on
          </h2>
          <p className="mt-2 text-xs font-mono text-[#777] dark:text-[#888]">
            Updated July 2026
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {nowItems.map((group, i) => {
            const config = categoryConfig[group.category]
            if (!config) return null
            const Icon = config.icon
            return (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="p-6 rounded-2xl border border-[#e8e8e8] dark:border-[#1e1e1e] bg-white dark:bg-[#111] flex flex-col gap-5"
              >
                {/* Header */}
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-xl ${config.iconBg} flex items-center justify-center flex-shrink-0`}
                  >
                    <Icon
                      className={`w-4 h-4 ${config.iconColor}`}
                      strokeWidth={1.5}
                    />
                  </div>
                  <p className="text-[13px] font-semibold text-[#0f0f0f] dark:text-[#f2f2f2] tracking-tight">
                    {group.category}
                  </p>
                </div>

                {/* Divider */}
                <div className="h-px bg-[#f0f0f0] dark:bg-[#1e1e1e]" />

                {/* Items */}
                <ul className="space-y-3">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-center gap-2.5">
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${config.dotColor} flex-shrink-0 ${config.pulse ? 'animate-pulse' : ''}`}
                      />
                      <span className="text-[14px] text-[#444] dark:text-[#bbb] font-medium leading-none">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
