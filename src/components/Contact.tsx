'use client'

import { motion } from 'framer-motion'

export default function Contact() {
  return (
    <section
      className="section-spaced py-32 lg:py-40"
      id="contact"
    >
      <div className="container-wide">
        {/* Heading and Line */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="h2 mb-6"
        >
          Let&apos;s Talk
        </motion.h2>

        {/* Full-width line separator */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          className="w-full h-px bg-text mb-16 origin-left"
        />

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-16 lg:gap-20">
          {/* 30% - Description */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <p className="p">
              Ready to collaborate? Reach out and let&apos;s discuss your next project.
            </p>
          </motion.div>

          {/* 70% - Contact Links */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-7"
          >
            <div className="flex flex-col sm:flex-row gap-8 sm:gap-12">
              <a
                href="mailto:hello@imaslam.com"
                className="p-large text-text-secondary hover:text-text transition-colors duration-300"
              >
                Email
              </a>
              <a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="p-large text-text-secondary hover:text-text transition-colors duration-300"
              >
                WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
