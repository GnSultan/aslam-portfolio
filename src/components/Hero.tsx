'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export default function Hero() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })

  // Rotate asterisk on scroll
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360])

  return (
    <section
      ref={heroRef}
      id="hero"
      className="min-h-screen flex items-center w-full px-4 sm:px-6 lg:px-16 relative"
      role="main"
      aria-labelledby="hero-heading"
    >
      <div className="w-full relative">
        {/* Main Content - Diagonal/Scattered Layout */}
        <div className="relative z-10 min-h-screen flex flex-col justify-between py-32 lg:py-24">

          {/* Top Left - Name (Huge) */}
          <div className="max-w-5xl">
            <h1
              id="hero-heading"
              className="text-[clamp(5rem,15vw,12rem)] leading-[0.85] tracking-tighter font-semibold"
              tabIndex={-1}
              data-text-hover
            >
              <motion.span
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
                className="block"
              >
                Aslam
              </motion.span>
              <motion.span
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2, delay: 0.5, ease: 'easeOut' }}
                className="block"
              >
                Abdul
              </motion.span>
            </h1>
          </div>

          {/* Middle Right-Center - Asterisk (Visible Element with Scroll Rotation) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.5, delay: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ rotate }}
            className="self-center lg:self-end lg:mr-20"
            aria-hidden="true"
          >
            <svg
              width="400"
              height="400"
              viewBox="0 0 400 400"
              fill="none"
              className="text-text w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80"
            >
              <path
                d="M200 40 L200 360 M40 200 L360 200 M80 80 L320 320 M320 80 L80 320"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </motion.div>

          {/* Bottom Right - Description (Edge placement) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 1.5 }}
            className="self-end text-right max-w-md"
          >
            <p className="p text-text-secondary">
              Combining strategy, design, and code to build digital experiences that connect
            </p>
          </motion.div>

        </div>

        {/* Bottom Left - Title (Anchored) */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6, ease: 'easeOut' }}
          className="absolute bottom-24 left-0 lg:bottom-32"
        >
          <p className="text-[clamp(2rem,5vw,3.5rem)] leading-tight tracking-tight font-medium">
            Designer & Developer
          </p>
        </motion.div>
      </div>
    </section>
  )
}
