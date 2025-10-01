'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState, useLayoutEffect } from 'react'

interface FooterRevealProps {
  children: React.ReactNode
  footer: React.ReactNode
}

export default function FooterReveal({ children, footer }: FooterRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const footerRef = useRef<HTMLDivElement>(null)
  const [footerHeight, setFooterHeight] = useState(0)

  useLayoutEffect(() => {
    const measure = () => {
      if (footerRef.current) {
        setFooterHeight(footerRef.current.offsetHeight)
      }
    }

    measure()

    // Use native ResizeObserver (available in all modern browsers)
    if (typeof window !== 'undefined' && 'ResizeObserver' in window) {
      const resizeObserver = new window.ResizeObserver(measure)
      if (footerRef.current) {
        resizeObserver.observe(footerRef.current)
      }

      return () => {
        resizeObserver.disconnect()
      }
    }
  }, [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end end']
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 1])
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1])

  return (
    <>
      {/* Contact Section - scrolls normally */}
      <div className="relative">
        {children}
      </div>

      {/* Footer Reveal Container - sticky footer method with scroll animation */}
      <div
        ref={containerRef}
        className="relative"
        style={{
          height: footerHeight || 'auto',
          clipPath: 'polygon(0% 0, 100% 0%, 100% 100%, 0 100%)'
        }}
      >
        <div
          className="relative"
          style={{
            height: footerHeight ? `calc(100vh + ${footerHeight}px)` : '100vh',
            top: '-100vh'
          }}
        >
          <motion.div
            ref={footerRef}
            className="sticky w-full"
            style={{
              height: footerHeight || 'auto',
              top: footerHeight ? `calc(100vh - ${footerHeight}px)` : '0',
              opacity,
              scale
            }}
          >
            {footer}
          </motion.div>
        </div>
      </div>
    </>
  )
}