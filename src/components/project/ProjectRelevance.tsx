'use client'

import { motion } from 'framer-motion'

interface ProjectRelevanceProps {
  note: string
  className?: string
}

export default function ProjectRelevance({ note, className = '' }: ProjectRelevanceProps) {
  return (
    <section className={`section-spaced ${className}`}>
      <div className="container-30-70">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="content-70"
        >
          {/* Personal connection note */}
          <div className="relative p-8 md:p-12 rounded-lg border border-text/20 bg-secondary/10">
            {/* Decorative corner accent */}
            <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-text rounded-tl-lg" />
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-text rounded-br-lg" />

            {/* Content */}
            <div className="relative z-10">
              <p className="p-large text-text mb-6">
                {note}
              </p>

              {/* CTA */}
              <motion.a
                href="mailto:hello@aslam.com"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 text-text font-medium group"
              >
                <span>Let&apos;s talk</span>
                <motion.svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </motion.svg>
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}