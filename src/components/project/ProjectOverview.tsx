'use client'

import { motion } from 'framer-motion'

interface ProjectOverviewProps {
  overview: string
  className?: string
}

export default function ProjectOverview({ overview, className = '' }: ProjectOverviewProps) {
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
          {/* Modern heading with accent */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-px bg-primary" />
            <h2 className="h3 text-primary">Project Overview</h2>
          </div>

          {/* Content with modern typography */}
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-text leading-relaxed font-light">
              {overview}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}