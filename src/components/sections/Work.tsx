import { ArrowUpRight } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import Badge from '@/components/ui/Badge'
import ProjectPreview from '@/components/ui/ProjectPreview'
import { GitHubIcon } from '@/components/ui/BrandIcons'
import { caseStudies, dataProjects } from '@/lib/data'

export default function Work() {
  return (
    <section id="work" className="scroll-mt-24 py-24 md:py-32 bg-[var(--color-bg)]">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          index="01"
          eyebrow="What I've Built"
          heading="Things I've built"
          sub="Real products with real users."
        />

        {/* Every project gets the same treatment — no featured favorite */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {caseStudies.map((project) => {
            const primary = project.links.live ?? project.links.github
            return (
              <div
                key={project.id}
                data-reveal
                className="pixel-card group pixel-corners pixel-shadow-sm p-5"
              >
                {/* whole-card link */}
                {primary && (
                  <a
                    href={primary}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${project.name}`}
                    className="stretch-link"
                  />
                )}

                {/* corner brackets appear on hover — HUD detail */}
                <span className="pixel-bracket border-t-2 border-l-2 top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden />
                <span className="pixel-bracket border-t-2 border-r-2 top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden />

                <div className="mb-5">
                  <ProjectPreview project={project} />
                </div>

                <div className="flex items-start justify-between gap-3 mb-1.5">
                  <div className="min-w-0">
                    <p className="font-pixel text-[8px] uppercase tracking-[0.2em] text-[var(--color-text-muted)] mb-1.5">
                      {project.role}
                    </p>
                    <h3 className="font-display font-bold text-lg text-[var(--color-text)] leading-tight tracking-tight group-hover:text-[var(--color-accent)] transition-colors">
                      {project.name}
                    </h3>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0 pt-1">
                    {project.links.github && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.name} on GitHub`}
                        className="above-stretch text-[var(--color-text-muted)] hover:text-[var(--color-accent)] hover:scale-110 transition-all"
                      >
                        <GitHubIcon className="w-4 h-4" />
                      </a>
                    )}
                    <ArrowUpRight className="icon-shift w-4 h-4 text-[var(--color-text-muted)] group-hover:text-[var(--color-accent)]" strokeWidth={2} aria-hidden />
                  </div>
                </div>

                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-4">{project.blurb}</p>

                <div className="flex items-center justify-between gap-3 pt-4 border-t border-[var(--color-border)]">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((t) => (
                      <Badge key={t}>{t}</Badge>
                    ))}
                  </div>
                  <span className="flex items-baseline gap-1.5 whitespace-nowrap pl-2">
                    <span className="font-display font-bold text-sm text-[var(--color-accent)]">
                      {project.stat.value}
                    </span>
                    <span className="font-pixel text-[8px] uppercase tracking-wider text-[var(--color-text-muted)]">
                      {project.stat.label}
                    </span>
                  </span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Data & analytics — same card language as the products, smaller scale */}
        <div className="mt-14 pt-14 border-t border-[var(--color-border)]">
          <div className="flex items-center gap-3 mb-6">
            <span className="font-pixel text-[10px] uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
              Data &amp; Analytics
            </span>
            <span className="h-px flex-1 bg-[var(--color-border)]" aria-hidden />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {dataProjects.map((p) => (
              <div
                key={p.id}
                data-reveal
                className="pixel-card group pixel-corners pixel-shadow-sm p-5 flex flex-col"
              >
                {p.links.github && (
                  <a
                    href={p.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${p.title} on GitHub`}
                    className="stretch-link"
                  />
                )}
                <p className="font-display font-bold text-2xl text-[var(--color-accent)] leading-none mb-3.5 tracking-tight">
                  {p.stat}
                </p>
                <h4 className="font-display font-semibold text-base text-[var(--color-text)] mb-2 leading-snug group-hover:text-[var(--color-accent)] transition-colors">{p.title}</h4>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-4 flex-1">{p.description}</p>
                <div className="flex items-center justify-between pt-3 border-t border-[var(--color-border)]">
                  <div className="flex flex-wrap gap-1.5">
                    {p.tech.map((t) => (
                      <Badge key={t}>{t}</Badge>
                    ))}
                  </div>
                  {p.links.github && (
                    <GitHubIcon className="icon-shift w-4 h-4 text-[var(--color-text-muted)] group-hover:text-[var(--color-accent)]" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
