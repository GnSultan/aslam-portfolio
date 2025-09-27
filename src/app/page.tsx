'use client'

import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import FeaturedWork from '@/components/FeaturedWork'
import About from '@/components/About'
import Experience from '@/components/Experience'
import Services from '@/components/Services'
import Gallery from '@/components/Gallery'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import FooterReveal from '@/components/FooterReveal'

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
      <FooterReveal footer={<Footer />}>
        <Contact />
      </FooterReveal>
    </main>
  )
}