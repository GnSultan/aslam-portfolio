'use client'

import { motion } from 'framer-motion'

interface ProjectLearningsProps {
  learnings: string[]
  className?: string
}

export default function ProjectLearnings({ learnings, className = '' }: ProjectLearningsProps) {
  if (!learnings || learnings.length === 0) {
    return null
  }

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
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-px bg-primary" />
            <h2 className="h3 text-primary">Key Insights & Learnings</h2>
          </div>

          {/* Learnings grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {learnings.map((learning, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative"
              >
                {/* Quote-style design */}
                <div className="relative p-6 rounded-lg bg-secondary/10 border border-secondary/20 hover:border-primary/20 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
                  {/* Quote mark */}
                  <div className="absolute -top-2 -left-2 w-8 h-8 bg-primary text-background rounded-full flex items-center justify-center text-lg font-bold">
                    &quot;
                  </div>

                  {/* Learning content */}
                  <div className="pt-4">
                    <p className="p text-text italic group-hover:text-text/90 transition-colors duration-300">
                      {learning}
                    </p>
                  </div>

                  {/* Decorative corner */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                    className="absolute bottom-2 right-2 w-3 h-3 border-r-2 border-b-2 border-primary/30 origin-bottom-right"
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom decoration */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 text-center"
          >
            <div className="inline-flex items-center gap-3">
              <div className="w-8 h-px bg-primary/30" />
              <div className="w-2 h-2 rounded-full bg-primary" />
              <div className="w-8 h-px bg-primary/30" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}