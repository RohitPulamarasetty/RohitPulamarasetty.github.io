'use client'

import Image from 'next/image'
import { ArrowRight, Download } from 'lucide-react'
import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  }),
}

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center pt-20">
      <div className="max-w-6xl mx-auto px-6 w-full py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-16 items-center">
          {/* Left: Text */}
          <div className="max-w-2xl">
            <motion.div
              custom={0}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="mb-6"
            >
              <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#666] dark:text-[#777]">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" />
                IIT Madras · Data Science &amp; Applications
              </span>
            </motion.div>

            <motion.h1
              custom={1}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="text-[clamp(34px,7vw,84px)] font-extrabold leading-[1] tracking-tight text-[#0f0f0f] dark:text-[#f2f2f2] mb-6"
            >
              Rohit Kumar
              <br />
              Pulamarasetty.
            </motion.h1>

            <motion.p
              custom={2}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="text-lg md:text-xl text-[#333] dark:text-[#ccc] mb-4 font-semibold tracking-tight"
            >
              Builder. Founder. Engineer.
            </motion.p>

            <motion.p
              custom={3}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="text-base md:text-lg text-[#555] dark:text-[#aaa] leading-relaxed mb-10 max-w-xl"
            >
              I build products, tools, and startups — from 1,000-user academic
              apps to data systems processing 68M+ records. Currently studying
              at IIT Madras and building things that actually ship.
            </motion.p>

            <motion.div
              custom={4}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="flex flex-wrap items-center gap-3"
            >
              <a
                href="#builds"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0f0f0f] dark:bg-[#f2f2f2] text-white dark:text-[#0f0f0f] text-sm font-semibold hover:opacity-80 transition-opacity"
              >
                View My Work
                <ArrowRight className="w-4 h-4" strokeWidth={2} />
              </a>
              <a
                href="/resume.pdf"
                download
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#e0e0e0] dark:border-[#2a2a2a] text-[#0f0f0f] dark:text-[#f2f2f2] text-sm font-medium hover:bg-[#f5f5f5] dark:hover:bg-[#1a1a1a] hover:border-[#c0c0c0] dark:hover:border-[#444] transition-all duration-200"
              >
                <Download className="w-4 h-4" strokeWidth={1.5} />
                Resume
              </a>
            </motion.div>
          </div>

          {/* Right: Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:block"
          >
            <div className="relative w-64 h-[320px] xl:w-72 xl:h-[360px]">
              {/* Ambient glow behind photo */}
              <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-violet-500/10 via-blue-500/5 to-emerald-500/5 blur-2xl pointer-events-none" />
              <div className="absolute inset-0 rounded-3xl bg-[#f0f0f0] dark:bg-[#1a1a1a]" />
              <Image
                src="/profile.png"
                alt="Rohit Kumar Pulamarasetty"
                fill
                priority
                className="object-cover object-[50%_8%] rounded-3xl"
                sizes="(max-width: 1280px) 256px, 288px"
              />
            </div>

            {/* Currently building card */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="mt-3 p-4 rounded-2xl border border-[#e8e8e8] dark:border-[#1e1e1e] bg-white/80 dark:bg-[#111]/80 backdrop-blur-sm"
            >
              <p className="text-[10px] font-mono uppercase tracking-widest text-[#666] dark:text-[#888] mb-2.5">
                Currently Building
              </p>
              <div className="flex flex-col gap-2">
                {['Beyond Binary Solutions', 'Findora', 'IITM Grade Suite'].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0 animate-pulse" />
                    <span className="text-[13px] text-[#444] dark:text-[#bbb] font-medium">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
