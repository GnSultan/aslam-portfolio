'use client'

import { motion } from 'framer-motion'

interface KeyDecision {
  decision: string
  rationale: string
}

interface ProjectApproachProps {
  methodology?: string
  keyDecisions?: KeyDecision[]
  className?: string
}

export default function ProjectApproach({ methodology, keyDecisions, className = '' }: ProjectApproachProps) {
  if (!methodology && (!keyDecisions || keyDecisions.length === 0)) {
    return null
  }

  return (
    <section className={`section-spaced bg-secondary/10 ${className}`}>
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
            <div className="w-12 h-px bg-primary" />
            <h2 className="h3 text-primary">Approach & Strategy</h2>
          </div>

          {/* Methodology */}
          {methodology && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-16"
            >
              <h3 className="h3 text-text mb-6">Methodology</h3>
              <div className="relative pl-6 border-l-2 border-primary/20">
                <p className="p text-text-secondary">
                  {methodology}
                </p>
              </div>
            </motion.div>
          )}

          {/* Key Decisions */}
          {keyDecisions && keyDecisions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="h3 text-text mb-8">Key Strategic Decisions</h3>

              <div className="space-y-8">
                {keyDecisions.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="group"
                  >
                    <div className="relative pl-8">
                      {/* Decision indicator */}
                      <div className="absolute left-0 top-1 w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors duration-300">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                      </div>

                      {/* Content */}
                      <div className="pb-6 border-b border-secondary/20 last:border-b-0">
                        <h4 className="p font-medium text-text mb-3 group-hover:text-primary transition-colors duration-300">
                          {item.decision}
                        </h4>
                        <p className="p text-text-secondary">
                          {item.rationale}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}