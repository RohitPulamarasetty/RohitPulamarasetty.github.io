import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import BrowserFrame from './BrowserFrame'
import type { CaseStudy } from '@/types'

function hostFromUrl(url: string) {
  try {
    return new URL(url).host
  } catch {
    return url
  }
}

export default function ProjectPreview({ project }: { project: CaseStudy }) {
  const liveUrl = project.links.live

  return (
    <BrowserFrame url={liveUrl ? hostFromUrl(liveUrl) : project.name}>
      {project.screenshot && (
        <div className="preview-pan absolute inset-0">
          <Image
            src={project.screenshot}
            alt={`Screenshot of the ${project.name} product interface`}
            fill
            className="object-cover object-top"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      )}

      <span className="absolute top-2.5 right-2.5 font-pixel text-[9px] font-semibold uppercase tracking-widest px-2 py-1 pixel-corners-sm bg-[var(--color-accent)] text-white pointer-events-none">
        {project.status}
      </span>

      {liveUrl && (
        <a
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-2.5 right-2.5 inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1.5 pixel-corners-sm bg-[var(--color-bg-elevated)]/90 backdrop-blur-sm border border-[var(--color-border)] text-[var(--color-text)] opacity-0 group-hover:opacity-100 transition-opacity"
        >
          Open <ArrowUpRight className="w-3 h-3" strokeWidth={2} />
        </a>
      )}
    </BrowserFrame>
  )
}
