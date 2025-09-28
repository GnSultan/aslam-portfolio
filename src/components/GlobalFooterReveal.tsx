'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useMemo, useRef } from 'react'
import Footer from '@/components/Footer'

interface GlobalFooterRevealProps {
  children: React.ReactNode
  animationRange?: [number, number]
  slideDistance?: number
  containerHeight?: string
}

// Page-level wrapper that creates footer reveal effect
// Wraps the last section and places footer underneath
export default function GlobalFooterReveal({
  children,
  animationRange = [0.4, 1],
  slideDistance = 350,
  containerHeight = 'calc(100vh + 400px)'
}: GlobalFooterRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end end']
  })

  const lastSectionY = useTransform(scrollYProgress, animationRange, [0, -Math.abs(slideDistance)])
  const wrapperStyle = useMemo(() => ({ height: containerHeight }), [containerHeight])

  return (
    <div ref={containerRef} className="relative" style={wrapperStyle}>
      {/* Last Section - Slides up gradually */}
      <motion.div
        style={{ y: lastSectionY, willChange: 'transform', zIndex: 10 }}
        className="relative bg-background min-h-screen"
      >
        {children}
      </motion.div>

      {/* Footer - Absolutely positioned at container bottom, never moves */}
      <div className="absolute bottom-0 left-0 w-full" style={{ zIndex: 1 }}>
        <Footer />
      </div>
    </div>
  )
}


