'use client'

import { motion } from 'framer-motion'

interface ProjectApproachBulletsProps {
  bullets: string[]
  className?: string
}

export default function ProjectApproachBullets({ bullets, className = '' }: ProjectApproachBulletsProps) {
  return (
    <section className={`section-spaced bg-secondary/20 ${className}`}>
      <div className="container-30-70">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="content-70"
        >
          {/* Section header */}
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-px bg-text" />
            <h2 className="h3 text-text">Approach</h2>
          </div>

          {/* Approach bullets - clean, simple, no jargon */}
          <div className="space-y-6">
            {bullets.map((bullet, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex items-start gap-4 group"
              >
                {/* Bullet indicator */}
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-text/10 flex items-center justify-center mt-1 group-hover:bg-text/20 transition-colors duration-300">
                  <div className="w-3 h-3 rounded-full bg-text" />
                </div>

                {/* Bullet text */}
                <p className="p text-text pt-1">
                  {bullet}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}