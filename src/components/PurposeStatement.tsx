'use client'

import { motion } from 'framer-motion'

export default function PurposeStatement() {
  return (
    <section className="section-spaced py-32 lg:py-40">
      <div className="container-wide">
        {/* Asymmetric Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Quote indicator - Top Left */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="lg:col-span-1 lg:col-start-1"
            aria-hidden="true"
          >
            {/* Square bracket style quote */}
            <div className="flex flex-col gap-1">
              <div className="w-12 h-px bg-text" />
              <div className="w-px h-16 bg-text self-start" />
            </div>
          </motion.div>

          {/* Quote Text - Column 2-9 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
            className="lg:col-span-8 lg:col-start-2"
          >
            <blockquote>
              {/* Main statement */}
              <p className="text-[clamp(2rem,5vw,3.5rem)] leading-[1.15] tracking-tight text-text font-medium mb-8">
                I believe design and technology should bring clarity to complexity,
                and create tools that empower people to do meaningful work.
              </p>

              {/* Attribution */}
              <footer className="flex items-center gap-4 pt-4">
                <div className="h-px w-12 bg-text-secondary/30" />
                <cite className="p text-text-secondary not-italic">
                  Purpose
                </cite>
              </footer>
            </blockquote>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
