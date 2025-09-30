'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { siteConfig } from '@/config/site'

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isNavigating, setIsNavigating] = useState(false)
  const [currentSection, setCurrentSection] = useState('hero')

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const navigateToSection = (sectionId: string) => {
    // Check if we're on the home page
    const isOnHomePage = window.location.pathname === '/'

    if (!isOnHomePage) {
      // If not on home page, navigate to home page with hash
      window.location.href = `/#${sectionId}`
      return
    }

    if (sectionId === currentSection) return

    // Reset navigation state to ensure transition works every time
    setIsNavigating(false)
    setTimeout(() => {
      setIsNavigating(true)
      setCurrentSection(sectionId)
      setIsMobileMenuOpen(false)
    }, 10)

    // Create page-like transition effect
    setTimeout(() => {
      const element = document.getElementById(sectionId)
      if (element) {
        // Disable Lenis temporarily for instant positioning
        if (typeof window !== 'undefined' && (window as unknown as { lenis?: { stop: () => void, start: () => void } }).lenis) {
          (window as unknown as { lenis: { stop: () => void, start: () => void } }).lenis.stop()
        }

        // Instantly position to the section
        window.scrollTo({
          top: element.offsetTop - 80,
          behavior: 'instant'
        })

        // Re-enable Lenis after positioning
        setTimeout(() => {
          if (typeof window !== 'undefined' && (window as unknown as { lenis?: { start: () => void } }).lenis) {
            (window as unknown as { lenis: { start: () => void } }).lenis.start()
          }
          setIsNavigating(false)
        }, 100)
      }
        }, 260) // Half of transition duration + reset delay
  }

  // Handle hash navigation on page load
  useEffect(() => {
    const handleHashNavigation = () => {
      const hash = window.location.hash.replace('#', '')
      if (hash && ['hero', 'projects', 'about'].includes(hash)) {
        // Small delay to ensure page is loaded
        setTimeout(() => {
          navigateToSection(hash)
        }, 100)
      }
    }

    // Handle initial load
    handleHashNavigation()

    // Handle hash changes
    window.addEventListener('hashchange', handleHashNavigation)
    return () => window.removeEventListener('hashchange', handleHashNavigation)
  }, [])

  useEffect(() => {
    const controlNavbar = () => {
      // Don't hide header when navigating
      if (isNavigating) {
        return
      }
      
      const currentScrollY = window.scrollY
      
      if (currentScrollY < 10) {
        // Always show at the top
        setIsVisible(true)
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down & past 100px
        setIsVisible(false)
      } else {
        // Scrolling up
        setIsVisible(true)
      }
      
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', controlNavbar)
    return () => window.removeEventListener('scroll', controlNavbar)
  }, [lastScrollY, isNavigating])

  return (
    <>
      {/* Staggered Children Reveal Transition */}
      <AnimatePresence>
        {isNavigating && (
          <motion.div
            initial="hidden"
            animate="show"
            exit="hidden"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.1 }
              }
            }}
            className="fixed top-0 left-0 w-full h-full bg-background z-[60] flex items-center justify-center"
          >
            {/* First element - background overlay */}
            <motion.div
              variants={{
                hidden: { scale: 0.98, y: 30, opacity: 0 },
                show: { scale: 1, y: 0, opacity: 1 }
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute inset-0 bg-background"
            />
            
            {/* Second element - subtle accent */}
            <motion.div
              variants={{
                hidden: { opacity: 0, scaleX: 0 },
                show: { opacity: 1, scaleX: 1 }
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-24 h-px bg-text/30"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <header 
        className={`fixed top-0 left-0 right-0 z-50 bg-background border-b border-secondary/20 transition-all duration-500 ease-in-out ${ 
          isVisible 
            ? 'translate-y-0 opacity-100' 
            : '-translate-y-full opacity-0'
        }`}
        role="banner"
      >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link
            href="/"
            className={`text-xl font-semibold text-text focus:outline-none rounded transition-all duration-500 ease-out ${
              isVisible ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'
            }`}
            aria-label="Aslam - Home"
            data-cursor-text="Home"
            data-magnetic
          >
            {siteConfig.name}
          </Link>
          
          {/* Desktop Navigation */}
          <nav 
            className={`hidden md:flex items-center space-x-8 transition-all duration-500 ease-out delay-100 ${ 
              isVisible ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'
            }`}
            role="navigation"
            aria-label="Main navigation"
          >
            <Link
              href="/#hero"
              className={`text-lg text-text/70 hover:text-text transition-colors focus:outline-none rounded px-3 py-2 relative ${
                currentSection === 'hero'
                  ? 'text-text font-medium after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-current'
                  : 'link-hover'
              }`}
              aria-label="Navigate to Home section"
              data-cursor-text="Go to Home"
              data-magnetic
              onClick={(e) => {
                e.preventDefault()
                navigateToSection('hero')
              }}
            >
              Home
            </Link>
            <Link
              href="/#projects"
              className={`text-lg text-text/70 hover:text-text transition-colors focus:outline-none rounded px-3 py-2 relative ${
                currentSection === 'projects'
                  ? 'text-text font-medium after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-current'
                  : 'link-hover'
              }`}
              aria-label="Navigate to Work section"
              data-cursor-text="View Work"
              data-magnetic
              onClick={(e) => {
                e.preventDefault()
                navigateToSection('projects')
              }}
            >
              Work
            </Link>
            <Link
              href="/#about"
              className={`text-lg text-text/70 hover:text-text transition-colors focus:outline-none rounded px-3 py-2 relative ${
                currentSection === 'about'
                  ? 'text-text font-medium after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-current'
                  : 'link-hover'
              }`}
              aria-label="Navigate to About section"
              data-cursor-text="About Me"
              data-magnetic
              onClick={(e) => {
                e.preventDefault()
                navigateToSection('about')
              }}
            >
              About
            </Link>
          </nav>

          {/* Desktop Social Links & Contact */}
          <div 
            className={`hidden md:flex items-center space-x-6 transition-all duration-500 ease-out delay-200 ${ 
              isVisible ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'
            }`}
            role="complementary"
            aria-label="Social links and contact"
          >
            <a
              href={siteConfig.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg text-text/70 hover:text-text transition-colors focus:outline-none rounded px-3 py-2"
              aria-label="Visit GitHub profile (opens in new tab)"
              data-cursor-text="GitHub"
              data-magnetic
            >
              Github
            </a>
            <a
              href={siteConfig.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg text-text/70 hover:text-text transition-colors focus:outline-none rounded px-3 py-2"
              aria-label="Visit LinkedIn profile (opens in new tab)"
              data-cursor-text="LinkedIn"
              data-magnetic
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-lg text-text/70 hover:text-primary transition-colors duration-300 link-hover focus:outline-none rounded px-3 py-2"
              aria-label="Send email"
              data-cursor-text="Say Hello"
              data-magnetic
            >
              Contact
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className={`md:hidden p-2 rounded-lg hover:bg-secondary/50 focus:outline-none transition-all duration-500 ease-out delay-100 ${ 
              isVisible ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'
            }`}
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-secondary/20 bg-background animate-in slide-in-from-top-2 duration-300 ease-out">
            <nav className="py-4 space-y-2" role="navigation" aria-label="Mobile navigation">
              <Link
                href="/#hero"
                className={`block w-full text-left px-4 py-3 text-lg text-text/70 hover:text-text hover:bg-secondary/50 transition-colors rounded-lg ${
                  currentSection === 'hero' ? 'text-text font-medium bg-secondary/20' : ''
                }`}
                onClick={(e) => {
                  e.preventDefault()
                  navigateToSection('hero')
                  setIsMobileMenuOpen(false)
                }}
              >
                Home
              </Link>
              <Link
                href="/#projects"
                className={`block w-full text-left px-4 py-3 text-lg text-text/70 hover:text-text hover:bg-secondary/50 transition-colors rounded-lg ${
                  currentSection === 'projects' ? 'text-text font-medium bg-secondary/20' : ''
                }`}
                onClick={(e) => {
                  e.preventDefault()
                  navigateToSection('projects')
                  setIsMobileMenuOpen(false)
                }}
              >
                Work
              </Link>
              <Link
                href="/#about"
                className={`block w-full text-left px-4 py-3 text-lg text-text/70 hover:text-text hover:bg-secondary/50 transition-colors rounded-lg ${
                  currentSection === 'about' ? 'text-text font-medium bg-secondary/20' : ''
                }`}
                onClick={(e) => {
                  e.preventDefault()
                  navigateToSection('about')
                  setIsMobileMenuOpen(false)
                }}
              >
                About
              </Link>
              <div className="border-t border-secondary/20 mt-4 pt-4">
                <a
                  href={siteConfig.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-3 text-lg text-text/70 hover:text-text hover:bg-secondary/50 transition-colors rounded-lg"
                >
                  Github
                </a>
                <a
                  href={siteConfig.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-3 text-lg text-text/70 hover:text-text hover:bg-secondary/50 transition-colors rounded-lg"
                >
                  LinkedIn
                </a>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="block px-4 py-3 text-lg text-text/70 hover:text-primary hover:bg-secondary/50 transition-colors duration-300 rounded-lg"
                  aria-label="Send email"
                >
                  Contact
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
    </>
  )
}
