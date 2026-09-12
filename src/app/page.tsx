import Hero from '@/components/sections/Hero'
import Work from '@/components/sections/Work'
import About from '@/components/sections/About'
import Currently from '@/components/sections/Currently'
import Skills from '@/components/sections/Skills'
import Journey from '@/components/sections/Journey'
import Achievements from '@/components/sections/Achievements'
import Contact from '@/components/sections/Contact'

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <Work />
      <About />
      <Currently />
      <Skills />
      <Journey />
      <Achievements />
      <Contact />
    </main>
  )
}
