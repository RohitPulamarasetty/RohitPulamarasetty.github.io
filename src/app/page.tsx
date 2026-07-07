import Hero from '@/components/sections/Hero'
import FeaturedBuilds from '@/components/sections/FeaturedBuilds'
import Projects from '@/components/sections/Projects'
import About from '@/components/sections/About'
import Timeline from '@/components/sections/Timeline'
import Skills from '@/components/sections/Skills'
import Achievements from '@/components/sections/Achievements'
import Now from '@/components/sections/Now'
import Contact from '@/components/sections/Contact'

export default function Home() {
  return (
    <main>
      <Hero />
      <FeaturedBuilds />
      <Projects />
      <About />
      <Timeline />
      <Skills />
      <Achievements />
      <Now />
      <Contact />
    </main>
  )
}
