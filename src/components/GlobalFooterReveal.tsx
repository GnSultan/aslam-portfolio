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
  children
}: GlobalFooterRevealProps) {
  const footerHeight = 590

  return (
    <>
      {/* Contact Section - scrolls normally */}
      <div className="relative bg-background">
        {children}
      </div>

      {/* Footer Reveal Container */}
      <div
        className="relative"
        style={{
          height: `${footerHeight}px`,
          clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)"
        }}
      >
        <div
          className="sticky w-full"
          style={{
            height: `${footerHeight}px`,
            top: `calc(100vh - ${footerHeight}px)`
          }}
        >
          <Footer />
        </div>
      </div>
    </>
  )
}


