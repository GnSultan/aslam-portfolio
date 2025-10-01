'use client'

import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import PurposeStatement from '@/components/PurposeStatement'
import FeaturedWork from '@/components/FeaturedWork'
import About from '@/components/About'
import Services from '@/components/Services'
import Gallery from '@/components/Gallery'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import FooterReveal from '@/components/FooterReveal'

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

      <FooterReveal footer={<Footer />}>
        <Contact />
      </FooterReveal>
    </main>
  )
}