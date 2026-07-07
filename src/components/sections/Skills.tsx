'use client'

import { motion } from 'framer-motion'
import {
  Target,
  Code2,
  Code,
  Database,
  BarChart2,
  Globe,
  Server,
  GitBranch,
  Layers,
  BookOpen,
  Lightbulb,
  LayoutDashboard,
  TrendingUp,
  Filter,
  Table2,
  Brain,
  FileText,
  Search,
  Cpu,
  GitMerge,
} from 'lucide-react'
import type { LucideProps } from 'lucide-react'
import { skillGroups } from '@/lib/data'

type LucideIcon = React.ComponentType<LucideProps>

const skillIcons: Record<string, LucideIcon> = {
  'Product Thinking': Lightbulb,
  'KPI Development': Target,
  'Dashboard Design': LayoutDashboard,
  'User Flows': GitMerge,
  'Business Analytics': TrendingUp,
  'Next.js': Globe,
  'TypeScript': Code,
  'JavaScript': Code2,
  'Python': Cpu,
  'HTML/CSS': Layers,
  'Supabase': Server,
  'Git': GitBranch,
  'SQL': Database,
  'PostgreSQL': Database,
  'MySQL': Database,
  'Pandas': Code2,
  'NumPy': Brain,
  'Matplotlib': BarChart2,
  'EDA': Search,
  'Reporting': FileText,
  'Reporting Automation': Filter,
  'Data Cleaning': Filter,
  'Tableau': BarChart2,
  'Power BI': BarChart2,
  'Excel': Table2,
  'Jupyter Notebook': BookOpen,
}

const categoryMeta: Record<
  string,
  { icon: LucideIcon; iconBg: string; iconColor: string }
> = {
  Product: {
    icon: Target,
    iconBg: 'bg-violet-500/10 dark:bg-violet-500/10',
    iconColor: 'text-violet-500',
  },
  Development: {
    icon: Code2,
    iconBg: 'bg-blue-500/10 dark:bg-blue-500/10',
    iconColor: 'text-blue-500',
  },
  'Data & Analytics': {
    icon: Database,
    iconBg: 'bg-emerald-500/10 dark:bg-emerald-500/10',
    iconColor: 'text-emerald-500',
  },
  'Visualization & BI': {
    icon: BarChart2,
    iconBg: 'bg-amber-500/10 dark:bg-amber-500/10',
    iconColor: 'text-amber-500',
  },
}

export default function Skills() {
  return (
    <section id="skills" className="scroll-mt-20 py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <p className="text-xs font-mono uppercase tracking-widest text-[#666] dark:text-[#777] mb-3">
            Skills
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0f0f0f] dark:text-[#f2f2f2] tracking-tight">
            Tools &amp; technologies
          </h2>
          <p className="mt-3 text-base text-[#666] dark:text-[#888] max-w-lg">
            A working stack across product, engineering, data, and analytics.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {skillGroups.map((group, gi) => {
            const meta = categoryMeta[group.category]
            if (!meta) return null
            const CategoryIcon = meta.icon
            return (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: gi * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="p-6 rounded-2xl border border-[#e8e8e8] dark:border-[#1e1e1e] bg-white dark:bg-[#111]"
              >
                {/* Category header */}
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className={`w-8 h-8 rounded-xl ${meta.iconBg} flex items-center justify-center flex-shrink-0`}
                  >
                    <CategoryIcon
                      className={`w-4 h-4 ${meta.iconColor}`}
                      strokeWidth={1.5}
                    />
                  </div>
                  <p className="text-[13px] font-semibold text-[#0f0f0f] dark:text-[#f2f2f2] tracking-tight">
                    {group.category}
                  </p>
                </div>

                {/* Skill pills */}
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill, si) => {
                    const SkillIcon = skillIcons[skill]
                    return (
                      <motion.div
                        key={skill}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          delay: gi * 0.04 + si * 0.025,
                          duration: 0.25,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#f5f5f5] dark:bg-[#1a1a1a] border border-[#e8e8e8] dark:border-[#2a2a2a] hover:border-[#c8c8c8] dark:hover:border-[#383838] transition-colors duration-150 cursor-default"
                      >
                        {SkillIcon && (
                          <SkillIcon
                            className="w-3 h-3 text-[#888] dark:text-[#777] flex-shrink-0"
                            strokeWidth={1.5}
                          />
                        )}
                        <span className="text-[12px] font-medium text-[#444] dark:text-[#bbb] whitespace-nowrap leading-none">
                          {skill}
                        </span>
                      </motion.div>
                    )
                  })}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
