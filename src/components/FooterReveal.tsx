'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

interface FooterRevealProps {
  children: React.ReactNode
  footer: React.ReactNode
}

export default function FooterReveal({ children, footer }: FooterRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  })

  // Smooth, gradual transform for the last section - restored smooth animation
  const lastSectionY = useTransform(scrollYProgress, [0.4, 1], [0, -350])

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ height: 'calc(100vh + 400px)' }} // Reduced container height to fix footer timing
    >
      {/* Last Section - Slides up gradually - FIRST to be on top */}
      <motion.div
        style={{
          y: lastSectionY,
          willChange: 'transform',
          zIndex: 10
        }}
        className="relative bg-background min-h-screen"
      >
        {children}
      </motion.div>

      {/* Footer - Absolutely positioned at container bottom, never moves - SECOND to be behind */}
      <div
        className="absolute bottom-0 left-0 w-full"
        style={{ zIndex: 1 }}
      >
        {footer}
      </div>
    </div>
  )
}