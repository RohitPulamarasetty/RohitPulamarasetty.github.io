'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight, GitBranch } from 'lucide-react'
import { featuredBuilds } from '@/lib/data'
import type { Project } from '@/types'

const buildVisuals: Record<string, { bg: string; accentDot: string; gridColor: string; glow: string }> = {
  bbs: {
    bg: 'from-[#0a0a0a] via-[#0f0f0f] to-[#171717]',
    accentDot: 'bg-violet-500',
    gridColor: 'rgba(255,255,255,0.03)',
    glow: 'bg-violet-500/5',
  },
  findora: {
    bg: 'from-[#050d1a] via-[#091220] to-[#0f1f35]',
    accentDot: 'bg-cyan-400',
    gridColor: 'rgba(56,189,248,0.04)',
    glow: 'bg-cyan-400/5',
  },
  'grade-suite': {
    bg: 'from-[#120800] via-[#1a0f00] to-[#241500]',
    accentDot: 'bg-amber-400',
    gridColor: 'rgba(251,191,36,0.04)',
    glow: 'bg-amber-400/5',
  },
}

function BBSCard({ build, index }: { build: Project; index: number }) {
  const visual = buildVisuals[build.id]!

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ delay: index * 0.12, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className={`relative rounded-3xl bg-gradient-to-br ${visual.bg} overflow-hidden`}
    >
      {/* Grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(${visual.gridColor} 1px, transparent 1px), linear-gradient(90deg, ${visual.gridColor} 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />
      {/* Radial glow */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-violet-500/5 blur-3xl pointer-events-none" />

      <div className="relative z-10 p-8 md:p-12 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 md:gap-16 items-start">
        {/* Left */}
        <div className="flex flex-col h-full">
          <div className="flex items-center gap-3 mb-8">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 border border-white/10">
              <span className={`w-1.5 h-1.5 rounded-full ${visual.accentDot}`} />
              <span className="text-[10px] font-mono uppercase tracking-widest text-white/60">
                {build.role}
              </span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.06] border border-white/[0.07]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-mono uppercase tracking-widest text-white/50">
                Currently Building
              </span>
            </span>
          </div>

          <h3 className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight leading-tight">
            {build.title}
          </h3>
          <p className="text-base text-white/50 mb-5 font-medium">{build.description}</p>
          <p className="text-[15px] text-white/60 leading-relaxed max-w-lg flex-1">
            {build.longDescription}
          </p>

          <div className="flex items-end justify-between flex-wrap gap-4 mt-10 pt-6 border-t border-white/[0.07]">
            <div className="flex flex-wrap gap-1.5">
              {build.tech.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 rounded-full bg-white/[0.07] text-white/45 text-[11px] font-mono border border-white/[0.06]"
                >
                  {t}
                </span>
              ))}
            </div>
            {build.stat && (
              <span className="text-[11px] font-mono text-white/50 uppercase tracking-wider">
                {build.stat}
              </span>
            )}
          </div>
        </div>

        {/* Right: stat block */}
        <div className="hidden md:flex flex-col items-end gap-4 min-w-[140px]">
          <div className="text-right">
            <p className="text-[10px] font-mono uppercase tracking-widest text-white/50 mb-1">Founded</p>
            <p className="text-2xl font-bold text-white/80 leading-none">July</p>
            <p className="text-2xl font-bold text-white/55 leading-none">2026</p>
          </div>
          <div className="w-px h-12 bg-white/10 mx-auto" />
          <div className="text-right">
            <p className="text-[10px] font-mono uppercase tracking-widest text-white/50 mb-1">Status</p>
            <p className="text-sm font-semibold text-white/60">Building</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function BuildCard({ build, index }: { build: Project; index: number }) {
  const visual = buildVisuals[build.id] ?? {
    bg: 'from-[#111] to-[#1a1a1a]',
    accentDot: 'bg-gray-400',
    gridColor: 'rgba(255,255,255,0.03)',
    glow: 'bg-white/5',
  }

  const primaryLink = build.links.live ?? build.links.github
  const hasLinks = Boolean(build.links.live || build.links.github)

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ delay: index * 0.12, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -3, transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] } }}
      className={`relative rounded-3xl bg-gradient-to-br ${visual.bg} overflow-hidden group`}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(${visual.gridColor} 1px, transparent 1px), linear-gradient(90deg, ${visual.gridColor} 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />
      {/* Hover glow */}
      <div
        className={`absolute top-0 right-0 w-64 h-64 rounded-full ${visual.glow} blur-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
      />

      <div className="relative z-10 p-8 md:p-10 flex flex-col h-full">
        <div className="flex items-start justify-between mb-8">
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${visual.accentDot}`} />
            <span className="text-[11px] font-mono uppercase tracking-widest text-white/55">
              {build.role}
            </span>
          </div>
          {hasLinks && (
            <div className="flex items-center gap-1.5">
              {build.links.github && (
                <a
                  href={build.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-white/[0.07] text-white/55 hover:bg-white/15 hover:text-white transition-all duration-200"
                  aria-label="View on GitHub"
                >
                  <GitBranch className="w-3.5 h-3.5" strokeWidth={1.5} />
                </a>
              )}
              {build.links.live && (
                <a
                  href={build.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-white/[0.07] text-white/55 hover:bg-white/15 hover:text-white transition-all duration-200"
                  aria-label={`Open ${build.title}`}
                >
                  <ArrowUpRight className="w-4 h-4" strokeWidth={1.5} />
                </a>
              )}
            </div>
          )}
        </div>

        <div className="flex-1">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight leading-tight">
            {build.title}
          </h3>
          <p className="text-sm text-white/60 mb-4 font-medium">{build.description}</p>
          <p className="text-[14px] text-white/55 leading-relaxed">{build.longDescription}</p>
        </div>

        <div className="flex items-end justify-between flex-wrap gap-4 mt-8 pt-6 border-t border-white/[0.07]">
          <div className="flex flex-wrap gap-1.5">
            {build.tech.map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 rounded-full bg-white/[0.08] text-white/50 text-[11px] font-mono border border-white/[0.06]"
              >
                {t}
              </span>
            ))}
          </div>
          {build.stat && (
            <span className="text-[11px] font-mono text-white/50 uppercase tracking-wider">
              {build.stat}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default function FeaturedBuilds() {
  return (
    <section id="builds" className="scroll-mt-20 py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <p className="text-xs font-mono uppercase tracking-widest text-[#666] dark:text-[#777] mb-3">
            Featured Builds
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0f0f0f] dark:text-[#f2f2f2] tracking-tight">
            Products I&apos;ve built and shipped
          </h2>
          <p className="mt-3 text-base text-[#666] dark:text-[#888] max-w-lg">
            Not side projects. Real platforms with real users and real problems solved.
          </p>
        </motion.div>

        <div className="flex flex-col gap-4">
          <BBSCard build={featuredBuilds[0]!} index={0} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {featuredBuilds.slice(1).map((build, i) => (
              <BuildCard key={build.id} build={build} index={i + 1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
