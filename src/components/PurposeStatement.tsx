'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export default function PurposeStatement() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  // Smooth fade out and shrink as you scroll away
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.95, 1, 1, 0.95])

  return (
    <motion.section
      ref={sectionRef}
      style={{ opacity, scale }}
      transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
      className="section-spaced py-32 lg:py-40"
    >
      <div className="container-wide">
        {/* Asymmetric Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Quote indicator - Top Left - Longer, bolder line */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="lg:col-span-2 lg:col-start-1"
            aria-hidden="true"
          >
            {/* Longer, bolder vertical line */}
            <div className="flex flex-col gap-1">
              <div className="w-16 h-[2px] bg-text" />
              <div className="w-[2px] h-48 bg-text self-start" />
            </div>
          </motion.div>

          {/* Quote Text - Column 4-10 (pushed right by longer line) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="lg:col-span-7 lg:col-start-4"
          >
            <blockquote>
              {/* Main statement */}
              <div className="text-[clamp(2rem,5vw,3.5rem)] leading-[1.15] tracking-tight text-text font-medium mb-8">
                I believe design and technology should bring clarity to complexity, and create tools that empower people to do meaningful work.
              </div>

              {/* Attribution */}
              <footer className="pt-4">
                <cite className="p text-text-secondary not-italic">
                  Purpose
                </cite>
              </footer>
            </blockquote>
          </motion.div>

        </div>
      </div>
    </motion.section>
  )
}
