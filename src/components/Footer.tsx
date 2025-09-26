'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const footerRef = useRef<HTMLElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"],
  })

  // Shift the footer upward as scroll progresses
  const y = useTransform(scrollYProgress, [0, 1], ["100%", "0%"])

  return (
    <motion.footer
      ref={footerRef}
      style={{
        y,
        backgroundColor: 'var(--footer)',
        backgroundImage: 'linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px)',
        backgroundSize: '200px 200px',
        backgroundAttachment: 'fixed',
        backgroundPosition: '0 0'
      }}
      className="sticky bottom-0 text-white py-48 z-10"
    >
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32">
          <div>
            <h2 className="h2 mb-6">Work together Let&apos;s</h2>
            <p className="text-white/80 mb-8 text-xl leading-relaxed max-w-lg">
              I&apos;m always open to new work, and new ideas. If you&apos;re looking for a designer, I&apos;d love to hear about your next project.
            </p>
          </div>

          <div className="lg:text-right">
            <div className="space-y-4 mb-8">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-white/80 hover:text-white transition-colors"
              >
                Company
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-white/80 hover:text-white transition-colors"
              >
                Twitter
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-white/80 hover:text-white transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="https://dribbble.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-white/80 hover:text-white transition-colors"
              >
                Dribbble
              </a>
            </div>
          </div>
        </div>

        <div className="mt-32 pt-8 border-t border-white/10">
          <p className="text-white/60 text-sm">
            © {currentYear} Aslam. All rights reserved.
          </p>
        </div>
      </div>
    </motion.footer>
  )
}
