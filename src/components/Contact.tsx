'use client'

import { motion } from 'framer-motion'

export default function Contact() {
  return (
    <section
      className="section-spaced bg-background relative"
      id="contact"
    >
      <div className="container-wide flex flex-col min-h-screen py-16 lg:py-20">
        {/* Large bold heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-[clamp(3rem,8vw,6rem)] leading-[1.1] tracking-tight text-text font-medium mb-8"
        >
          Let&apos;s Talk
        </motion.h2>

        {/* Short description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="p mb-auto max-w-2xl"
        >
          Ready to collaborate? Reach out and let&apos;s discuss your next project.
        </motion.p>

        {/* Grid Layout - 30% empty, 70% links at bottom */}
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-16 lg:gap-20 mt-auto">
          {/* 30% - Empty space */}
          <div className="lg:col-span-3"></div>

          {/* 70% - Contact Links at bottom */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-7"
          >
            <div className="space-y-12">
              {/* Email Link */}
              <div>
                <a
                  href="mailto:hello@imaslam.com"
                  className="p-large text-text-secondary hover:text-text transition-colors duration-300 inline-block"
                >
                  Email
                </a>
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
                  className="h-px bg-text mt-3 origin-left"
                />
              </div>

              {/* WhatsApp Link */}
              <div>
                <a
                  href="https://wa.me/1234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-large text-text-secondary hover:text-text transition-colors duration-300 inline-block"
                >
                  WhatsApp
                </a>
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: 'easeOut', delay: 0.6 }}
                  className="h-px bg-text mt-3 origin-left"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
