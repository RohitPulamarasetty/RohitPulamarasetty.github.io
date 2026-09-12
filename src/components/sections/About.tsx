import Image from 'next/image'
import SectionHeader from '@/components/ui/SectionHeader'

const stats = [
  { value: '8.7', label: 'CGPA / 10' },
  { value: '2K+', label: 'Students Reached' },
  { value: '68M+', label: 'Records Analyzed' },
  { value: '4', label: 'Products Shipped' },
]

const facts = [
  'Data Science & Applications student at IIT Madras, class of \'28.',
  'Founder of Beyond Binary Solutions — software studio for real businesses.',
  'Built IITM Grade Suite (2,000+ students) and Findora, IIT Madras\' lost-and-found.',
  'Building FoundBrew, a community for finding who to build with.',
  'Now going deeper into machine learning and quantitative finance.',
]

export default function About() {
  return (
    <section id="about" className="scroll-mt-24 py-24 md:py-32 bg-[var(--color-bg-elevated)] border-y border-[var(--color-border)] overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader index="02" eyebrow="The Person" heading="Who I am" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 gap-x-12">
          <div data-reveal className="lg:col-span-4 flex justify-center lg:justify-start">
            {/* Mini viewport — same language as the hero portrait */}
            <div className="viewport-frame pixel-corners pixel-shadow w-52 sm:w-60">
              <div className="viewport-bar">
                <div className="flex items-center gap-1.5" aria-hidden>
                  <span className="w-1.5 h-1.5 bg-[var(--color-border)]" />
                  <span className="w-1.5 h-1.5 bg-[var(--color-border)]" />
                  <span className="w-1.5 h-1.5 bg-[var(--color-accent)]" />
                </div>
                <span className="mx-auto font-pixel text-[8px] tracking-[0.15em] uppercase text-[var(--color-text-muted)]">
                  about.me
                </span>
                <span className="w-3" aria-hidden />
              </div>
              <div className="portrait-stage relative aspect-[4/5] overflow-hidden">
                <Image
                  src="/rohit_cutout.png"
                  alt="Pixel-art portrait of Rohit Kumar Pulamarasetty"
                  fill
                  className="object-contain object-bottom pixelated"
                  sizes="240px"
                />
              </div>
            </div>
          </div>

          <div data-reveal className="lg:col-span-8">
            <h3 className="font-display font-bold text-2xl md:text-3xl text-[var(--color-text)] leading-[1.15] tracking-tight mb-8 max-w-lg">
              A builder who ships, not just learns.
            </h3>

            <ul className="space-y-4">
              {facts.map((fact) => (
                <li key={fact} className="flex items-start gap-3.5 text-[15px] text-[var(--color-text-muted)] leading-relaxed">
                  <span className="mt-[7px] w-2 h-2 bg-[var(--color-accent)] flex-shrink-0" aria-hidden />
                  <span>{fact}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          data-reveal
          className="mt-16 pt-10 border-t border-[var(--color-border)] grid grid-cols-2 sm:grid-cols-4 gap-8"
        >
          {stats.map(({ value, label }) => (
            <div key={label} className="flex flex-col">
              <p className="font-display font-bold text-3xl md:text-4xl text-[var(--color-text)] leading-none mb-3 tracking-tight">
                {value}
              </p>
              <p className="font-pixel text-[9px] text-[var(--color-text-muted)] uppercase tracking-[0.12em]">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
