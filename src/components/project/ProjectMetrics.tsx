'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

interface Metric {
  label: string
  value: string
  description?: string
}

interface ProjectMetricsProps {
  metrics: Metric[]
  achievements?: string[]
  className?: string
}

export default function ProjectMetrics({ metrics, achievements, className = '' }: ProjectMetricsProps) {
  const [animatedValues, setAnimatedValues] = useState<string[]>([])

  useEffect(() => {
    // Animate numbers if they're numeric
    const timer = setTimeout(() => {
      setAnimatedValues(metrics.map(metric => metric.value))
    }, 500)

    return () => clearTimeout(timer)
  }, [metrics])

  return (
    <section className={`section-spaced bg-secondary/20 ${className}`}>
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
              <h2 className="h3 text-primary">Impact & Results</h2>
              <div className="w-12 h-px bg-primary" />
            </div>
          </div>

          {/* Metrics grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {metrics.map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center group"
              >
                {/* Large metric value */}
                <div className="mb-4">
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    className="text-4xl lg:text-5xl font-bold text-text mb-2 group-hover:text-primary transition-colors duration-300"
                  >
                    {animatedValues[index] || metric.value}
                  </motion.div>

                  <h3 className="p font-medium text-text mb-2">
                    {metric.label}
                  </h3>

                  {metric.description && (
                    <p className="p-small text-text-secondary">
                      {metric.description}
                    </p>
                  )}
                </div>

                {/* Decorative element */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.3 }}
                  className="w-12 h-px bg-primary/30 mx-auto group-hover:bg-primary transition-colors duration-300"
                />
              </motion.div>
            ))}
          </div>

          {/* Achievements */}
          {achievements && achievements.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="border-t border-secondary/30 pt-16"
            >
              <h3 className="h3 text-center mb-12">Key Achievements</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex items-start gap-4 group"
                  >
                    {/* Achievement icon */}
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-1 group-hover:bg-primary/30 transition-colors duration-300">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>

                    <p className="p text-text-secondary">
                      {achievement}
                    </p>
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