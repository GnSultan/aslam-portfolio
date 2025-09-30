'use client'

import { motion } from 'framer-motion'

interface ProjectChallengeProps {
  challenge: string
  className?: string
}

export default function ProjectChallenge({ challenge, className = '' }: ProjectChallengeProps) {
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
          {/* Section header */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-px bg-text" />
            <h2 className="h3 text-text">The Challenge</h2>
          </div>

          {/* Challenge statement - large, readable, plain language */}
          <p className="p-large text-text">
            {challenge}
          </p>
        </motion.div>
      </div>
    </section>
  )
}