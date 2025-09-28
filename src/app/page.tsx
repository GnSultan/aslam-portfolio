'use client'

import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import FeaturedWork from '@/components/FeaturedWork'
import About from '@/components/About'
import Experience from '@/components/Experience'
import Services from '@/components/Services'
import Gallery from '@/components/Gallery'
import Contact from '@/components/Contact'
import GlobalFooterReveal from '@/components/GlobalFooterReveal'

export default function Home() {
  return (
    <main>
      <Navigation />
      <Hero />
      <FeaturedWork />
      <About />
      <Experience />
      <Services />
      <Gallery />

      {/* Footer Reveal Effect */}
      <GlobalFooterReveal>
        <Contact />
      </GlobalFooterReveal>
    </main>
  )
}