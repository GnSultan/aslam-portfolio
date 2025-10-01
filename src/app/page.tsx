'use client'

import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import PurposeStatement from '@/components/PurposeStatement'
import FeaturedWork from '@/components/FeaturedWork'
import About from '@/components/About'
import Services from '@/components/Services'
import Gallery from '@/components/Gallery'
import Contact from '@/components/Contact'
import GlobalFooterReveal from '@/components/GlobalFooterReveal'

export default function Home() {
  return (
    <main id="main-content">
      <Navigation />
      <Hero />
      <PurposeStatement />
      <FeaturedWork />
      <About />
      <Services />
      <Gallery />

      {/* Footer Reveal Effect */}
      <GlobalFooterReveal>
        <Contact />
      </GlobalFooterReveal>
    </main>
  )
}