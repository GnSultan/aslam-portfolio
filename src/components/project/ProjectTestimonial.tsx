'use client'

import { motion } from 'framer-motion'

interface Testimonial {
  quote: string
  author: string
  role?: string
}

interface ProjectTestimonialProps {
  testimonial: Testimonial
  className?: string
}

export default function ProjectTestimonial({ testimonial, className = '' }: ProjectTestimonialProps) {
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
            <div className="w-12 h-px bg-text" />
            <h2 className="h3 text-text">Client Perspective</h2>
          </div>

          {/* Quote */}
          <div className="relative">
            {/* Opening quote mark */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="absolute -top-4 -left-2 text-6xl text-text/20 font-serif"
            >
              &ldquo;
            </motion.div>

            {/* Quote text */}
            <blockquote className="relative z-10 p-large text-text mb-8 pl-6">
              {testimonial.quote}
            </blockquote>

            {/* Author */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-4 pl-6"
            >
              <div className="w-12 h-px bg-text/30" />
              <div>
                <p className="p font-medium text-text">{testimonial.author}</p>
                {testimonial.role && (
                  <p className="p-small text-text-secondary">{testimonial.role}</p>
                )}
              </div>
            </motion.div>

            {/* Closing quote mark */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="absolute -bottom-8 right-0 text-6xl text-text/20 font-serif"
            >
              &rdquo;
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}