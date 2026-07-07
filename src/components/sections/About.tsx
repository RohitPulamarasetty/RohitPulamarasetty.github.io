'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

const stats = [
  { value: '8.7', label: 'CGPA / 10' },
  { value: '1K+', label: 'Users' },
  { value: '68M+', label: 'Records' },
  { value: '3+', label: 'Products' },
]

export default function About() {
  return (
    <section id="about" className="scroll-mt-20 py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left: Photo */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="relative lg:sticky lg:top-24"
          >
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-[#f0f0f0] dark:bg-[#1a1a1a] max-w-sm">
              <Image
                src="/profile.png"
                alt="Rohit Kumar Pulamarasetty"
                fill
                className="object-cover object-[50%_8%]"
                sizes="(max-width: 1024px) 100vw, 384px"
              />
            </div>

            {/* Stats card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mt-4 p-5 rounded-2xl border border-[#e8e8e8] dark:border-[#1e1e1e] bg-white dark:bg-[#111] max-w-sm"
            >
              <div className="grid grid-cols-4 gap-3">
                {stats.map(({ value, label }) => (
                  <div key={label} className="text-center">
                    <p className="text-lg font-bold text-[#0f0f0f] dark:text-[#f2f2f2] leading-none mb-1">
                      {value}
                    </p>
                    <p className="text-[10px] font-mono text-[#666] dark:text-[#888] uppercase tracking-wide">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Text */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="pt-2"
          >
            <p className="text-xs font-mono uppercase tracking-widest text-[#666] dark:text-[#777] mb-4">
              About
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0f0f0f] dark:text-[#f2f2f2] tracking-tight mb-8 leading-tight">
              I&apos;m Rohit.
              <br />I build things.
            </h2>

            <div className="space-y-5 text-[15px] leading-[1.8] text-[#666] dark:text-[#888]">
              <p>
                I&apos;m a student at IIT Madras studying Data Science and Applications — and while most
                of my peers are doing coursework, I&apos;ve been building software that people actually
                use. It started with tools to make my own study life easier, and grew into platforms
                with real users, a company, and work at national scale.
              </p>
              <p>
                I founded{' '}
                <span className="text-[#0f0f0f] dark:text-[#f2f2f2] font-medium">
                  Beyond Binary Solutions
                </span>{' '}
                to channel everything I&apos;ve been learning into real product work. I built{' '}
                <span className="text-[#0f0f0f] dark:text-[#f2f2f2] font-medium">Findora</span>{' '}
                because lost-and-found at IIT Madras was a mess of WhatsApp groups. I built{' '}
                <span className="text-[#0f0f0f] dark:text-[#f2f2f2] font-medium">
                  IITM Grade Suite
                </span>{' '}
                because my classmates were doing CGPA calculations manually on spreadsheets.
              </p>
              <p>
                I&apos;m interested in the full stack of building — product thinking, data engineering,
                full-stack development, and the startup mechanics that turn good software into
                sustainable companies. I think the best builders understand both the code and the
                problem it&apos;s solving.
              </p>
              <p>
                When I&apos;m not building, I&apos;m reading about startups, exploring AI and automation, and
                occasionally helping run events at IIT Madras.
              </p>
            </div>

            {/* Tags */}
            <div className="mt-8 flex flex-wrap gap-2">
              {[
                'Product Thinking',
                'Full-Stack Engineering',
                'Data Science',
                'Startups',
                'Open Source',
              ].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 rounded-full bg-[#f0f0f0] dark:bg-[#1a1a1a] border border-[#e4e4e4] dark:border-[#2a2a2a] text-[#555] dark:text-[#999] text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
