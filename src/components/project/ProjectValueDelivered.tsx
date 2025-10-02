'use client'

import { motion } from 'framer-motion'

interface ValueItem {
  label: string
  value: string
}

interface ProjectValueDeliveredProps {
  values: ValueItem[]
  className?: string
}

export default function ProjectValueDelivered({ values, className = '' }: ProjectValueDeliveredProps) {
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
            <div className="w-12 h-px bg-text" />
            <h2 className="h3 text-text">Value Delivered</h2>
          </div>

          {/* Value list - responsive grid based on count */}
          <div className={`grid gap-8 ${
            values.length === 1 ? 'grid-cols-1' :
            values.length === 2 ? 'grid-cols-1 md:grid-cols-2' :
            'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
          }`}>
            {values.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex flex-col gap-2"
              >
                {/* Value */}
                <div className="text-3xl md:text-4xl font-bold text-text">
                  {item.value}
                </div>

                {/* Label */}
                <p className="p text-text-secondary">
                  {item.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}