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
      
      {/* Footer Reveal Container */}
      <div className="relative overflow-hidden">
        <Contact />
        <Footer />
      </div>
    </main>
  )
}