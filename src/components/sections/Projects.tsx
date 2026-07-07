'use client'

import { motion } from 'framer-motion'
import { GitBranch, ExternalLink, Database, BarChart2, PieChart } from 'lucide-react'
import type { LucideProps } from 'lucide-react'
import { projects } from '@/lib/data'
import type { Project } from '@/types'

type LucideIcon = React.ComponentType<LucideProps>

const projectIcons: Record<string, LucideIcon> = {
  uidai: Database,
  'sales-dashboard': BarChart2,
  'pizza-sales': PieChart,
}

const projectAccents: Record<string, { iconBg: string; iconColor: string }> = {
  uidai: { iconBg: 'bg-blue-500/10', iconColor: 'text-blue-500' },
  'sales-dashboard': { iconBg: 'bg-emerald-500/10', iconColor: 'text-emerald-500' },
  'pizza-sales': { iconBg: 'bg-orange-500/10', iconColor: 'text-orange-500' },
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ProjectIcon = projectIcons[project.id]
  const accent = projectAccents[project.id]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] } }}
      className="group p-6 rounded-2xl border border-[#e8e8e8] dark:border-[#1e1e1e] bg-white dark:bg-[#111] hover:border-[#c8c8c8] dark:hover:border-[#2a2a2a] hover:shadow-[0_8px_32px_rgba(0,0,0,0.07)] dark:hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-[border-color,box-shadow] duration-200 flex flex-col cursor-default"
    >
      {/* Top row: icon + stat */}
      <div className="flex items-start justify-between mb-5">
        {ProjectIcon && accent && (
          <div
            className={`w-9 h-9 rounded-xl ${accent.iconBg} flex items-center justify-center flex-shrink-0`}
          >
            <ProjectIcon
              className={`w-4 h-4 ${accent.iconColor}`}
              strokeWidth={1.5}
            />
          </div>
        )}
        {project.stat && (
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#777] dark:text-[#888] ml-auto">
            {project.stat}
          </span>
        )}
      </div>

      <h3 className="text-[15px] font-semibold text-[#0f0f0f] dark:text-[#f2f2f2] mb-2 leading-snug">
        {project.title}
      </h3>

      <p className="text-sm text-[#666] dark:text-[#888] leading-relaxed mb-5 flex-1">
        {project.description}
      </p>

      {/* Footer: tech + links */}
      <div className="flex items-center justify-between gap-2 pt-4 border-t border-[#f0f0f0] dark:border-[#1a1a1a]">
        <div className="flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="px-2 py-1 rounded-md bg-[#f5f5f5] dark:bg-[#1a1a1a] text-[#666] dark:text-[#888] text-[10px] font-mono border border-[#e8e8e8] dark:border-[#2a2a2a]"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2 ml-2 flex-shrink-0">
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-7 h-7 flex items-center justify-center rounded-full text-[#999] dark:text-[#666] hover:text-[#0f0f0f] dark:hover:text-[#f2f2f2] hover:bg-[#f0f0f0] dark:hover:bg-[#1a1a1a] transition-all duration-150"
              aria-label="View on GitHub"
            >
              <GitBranch className="w-3.5 h-3.5" strokeWidth={1.5} />
            </a>
          )}
          {project.links.live && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="w-7 h-7 flex items-center justify-center rounded-full text-[#999] dark:text-[#666] hover:text-[#0f0f0f] dark:hover:text-[#f2f2f2] hover:bg-[#f0f0f0] dark:hover:bg-[#1a1a1a] transition-all duration-150"
              aria-label="View live"
            >
              <ExternalLink className="w-3.5 h-3.5" strokeWidth={1.5} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  return (
    <section
      id="projects"
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
            Projects
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0f0f0f] dark:text-[#f2f2f2] tracking-tight">
            Data, analytics &amp; engineering
          </h2>
          <p className="mt-3 text-base text-[#666] dark:text-[#888]">
            From national-scale datasets to interactive business dashboards.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
