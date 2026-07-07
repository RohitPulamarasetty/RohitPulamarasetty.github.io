'use client'

import { motion } from 'framer-motion'
import { Mail, Download, ArrowUpRight } from 'lucide-react'

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  )
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

const links = [
  {
    icon: GitHubIcon,
    label: 'GitHub',
    handle: '@RohitPulamarasetty',
    href: 'https://github.com/RohitPulamarasetty',
    external: true,
    iconBg: 'bg-[#f5f5f5] dark:bg-[#1a1a1a]',
    iconColor: 'text-[#555] dark:text-[#aaa]',
  },
  {
    icon: LinkedInIcon,
    label: 'LinkedIn',
    handle: 'rohit-kumar-pulamarasetty',
    href: 'https://linkedin.com/in/rohit-kumar-pulamarasetty',
    external: true,
    iconBg: 'bg-blue-500/10',
    iconColor: 'text-blue-500',
  },
  {
    icon: Mail,
    label: 'Email',
    handle: 'rohitpulamarasetty@gmail.com',
    href: 'mailto:rohitpulamarasetty@gmail.com',
    external: false,
    iconBg: 'bg-emerald-500/10',
    iconColor: 'text-emerald-500',
  },
]

export default function Contact() {
  return (
    <section
      id="contact"
      className="scroll-mt-20 py-24 md:py-32 bg-[#f9f9f9] dark:bg-[#0d0d0d]"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Heading */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xs font-mono uppercase tracking-widest text-[#666] dark:text-[#777] mb-4">
              Contact
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0f0f0f] dark:text-[#f2f2f2] tracking-tight leading-tight mb-6">
              Let&apos;s
              <br />
              connect.
            </h2>
            <p className="text-base text-[#666] dark:text-[#888] leading-relaxed max-w-sm">
              I&apos;m always open to conversations about building products, data systems,
              startups, or anything interesting. Reach out on any of these channels.
            </p>

            <div className="mt-8">
              <a
                href="/resume.pdf"
                download
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0f0f0f] dark:bg-[#f2f2f2] text-white dark:text-[#0f0f0f] text-sm font-semibold hover:opacity-80 transition-opacity"
              >
                <Download className="w-4 h-4" strokeWidth={2} />
                Download Resume
              </a>
            </div>
          </motion.div>

          {/* Right: Links */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="space-y-3"
          >
            {links.map(({ icon: Icon, label, handle, href, external, iconBg, iconColor }, i) => (
              <motion.a
                key={label}
                href={href}
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.08, duration: 0.4 }}
                whileHover={{ y: -2, transition: { duration: 0.15, ease: [0.22, 1, 0.36, 1] } }}
                className="flex items-center gap-4 p-5 rounded-2xl border border-[#e8e8e8] dark:border-[#1e1e1e] bg-white dark:bg-[#111] hover:border-[#c8c8c8] dark:hover:border-[#2a2a2a] hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_4px_20px_rgba(0,0,0,0.3)] transition-[border-color,box-shadow] duration-200 group"
              >
                <div
                  className={`w-10 h-10 rounded-full ${iconBg} flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-110`}
                >
                  <Icon className={`w-4 h-4 ${iconColor}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-mono text-[#666] dark:text-[#888] uppercase tracking-wider mb-0.5">
                    {label}
                  </p>
                  <p className="text-sm font-medium text-[#0f0f0f] dark:text-[#f2f2f2] truncate">
                    {handle}
                  </p>
                </div>
                <ArrowUpRight
                  className="w-4 h-4 text-[#999] dark:text-[#666] group-hover:text-[#555] dark:group-hover:text-[#bbb] flex-shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-150"
                  strokeWidth={1.5}
                />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
