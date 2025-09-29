'use client'

import { motion } from 'framer-motion'

interface ProjectFeaturesProps {
  features: string[]
  className?: string
}

export default function ProjectFeatures({ features, className = '' }: ProjectFeaturesProps) {
  return (
    <section className={`section-spaced ${className}`}>
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Section header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-12 h-px bg-primary" />
              <h2 className="h3 text-primary">Key Features</h2>
              <div className="w-12 h-px bg-primary" />
            </div>
          </div>

          {/* Features grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <div className="relative p-6 rounded-lg border border-secondary/30 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
                  {/* Feature number */}
                  <div className="absolute -top-3 -left-3 w-8 h-8 bg-primary text-background rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>

                  {/* Feature content */}
                  <div className="pt-2">
                    <p className="text-text leading-relaxed group-hover:text-text/90 transition-colors duration-300">
                      {feature}
                    </p>
                  </div>

                  {/* Hover effect line */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    className="absolute bottom-0 left-0 w-full h-px bg-primary origin-left"
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Decorative pattern */}
          <div className="mt-16 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="inline-flex items-center gap-2"
            >
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                  className="w-2 h-2 rounded-full bg-primary/20"
                />
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}