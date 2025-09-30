'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export default function Hero() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })
  const x = useTransform(scrollYProgress, [0, 1], [0, -200])
  const xRight = useTransform(scrollYProgress, [0, 1], [0, 200])

  return (
    <section 
      ref={heroRef}
      id="hero" 
      className="min-h-screen flex items-center w-full px-4 sm:px-6 lg:px-16"
      role="main"
      aria-labelledby="hero-heading"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeInOut' }}
        className="w-full"
      >
          <h1
            id="hero-heading"
            className="h1 mb-0"
            tabIndex={-1}
            data-text-hover
          >
            <motion.div className="text-center font-semibold" style={{ x }}>I&apos;m Aslam</motion.div>
            <div className="text-center font-medium">a designer /</div>
            <motion.div className="text-center font-semibold" style={{ x: xRight }}>developer<span className="cursor-blink">_</span></motion.div>
          </h1>
      </motion.div>
    </section>
  )
}
