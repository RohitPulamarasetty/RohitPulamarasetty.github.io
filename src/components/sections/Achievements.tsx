'use client'

import { motion } from 'framer-motion'
import { Trophy, Star, TrendingUp } from 'lucide-react'
import { achievements } from '@/lib/data'
import type { Achievement } from '@/types'

const typeConfig: Record<
  Achievement['type'],
  {
    icon: React.ComponentType<{ className?: string; strokeWidth?: number }>
    color: string
    bg: string
    border: string
  }
> = {
  award: {
    icon: Trophy,
    color: 'text-amber-500',
    bg: 'bg-amber-500/10',
    border: 'border-amber-200/60 dark:border-amber-500/10',
  },
  participation: {
    icon: Star,
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
    border: 'border-blue-200/60 dark:border-blue-500/10',
  },
  milestone: {
    icon: TrendingUp,
    color: 'text-emerald-500',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-200/60 dark:border-emerald-500/10',
  },
}

export default function Achievements() {
  return (
    <section
      id="achievements"
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
            Achievements
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0f0f0f] dark:text-[#f2f2f2] tracking-tight">
            Milestones &amp; recognition
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map((item, i) => {
            const { icon: Icon, color, bg, border } = typeConfig[item.type]
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                whileHover={{ y: -2, transition: { duration: 0.15 } }}
                className="flex gap-4 p-6 rounded-2xl border border-[#e8e8e8] dark:border-[#1e1e1e] bg-white dark:bg-[#111] hover:border-[#d0d0d0] dark:hover:border-[#2a2a2a] hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_4px_20px_rgba(0,0,0,0.3)] transition-[border-color,box-shadow] duration-200"
              >
                <div
                  className={`flex-shrink-0 w-11 h-11 rounded-2xl ${bg} border ${border} flex items-center justify-center`}
                >
                  <Icon className={`w-5 h-5 ${color}`} strokeWidth={1.5} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-[#0f0f0f] dark:text-[#f2f2f2] mb-0.5 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-[11px] font-mono text-[#666] dark:text-[#888] uppercase tracking-wider mb-2">
                    {item.organization}
                  </p>
                  <p className="text-sm text-[#666] dark:text-[#888] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
