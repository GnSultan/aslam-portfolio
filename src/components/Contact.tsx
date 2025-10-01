'use client'

import { motion } from 'framer-motion'
import { siteConfig } from '@/config/site'

export default function Contact() {
  return (
    <section
      className="section-spaced relative"
      id="contact"
    >
      <div className="min-h-screen flex items-start lg:items-center">
        <div className="container-wide w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 py-16 lg:py-20">
          {/* Left - Let's Talk */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <h2 className="text-[clamp(4rem,12vw,10rem)] leading-[0.9] tracking-tighter text-text font-medium">
              Let&apos;s Talk
            </h2>
          </motion.div>

          {/* Right - Contact Links */}
          <div className="flex items-center justify-center lg:justify-end">
            <div className="space-y-16 w-full max-w-xl">
              {/* Email */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <div className="text-sm text-text-secondary mb-4 uppercase tracking-wider">
                  Email
                </div>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="group block cursor-pointer"
                >
                  <div className="text-[clamp(1.5rem,4vw,3rem)] font-medium text-text mb-3 group-hover:translate-x-2 transition-transform duration-300">
                    {siteConfig.email}
                  </div>
                  <p className="text-text-secondary mb-4 group-hover:text-text transition-colors duration-300">
                    I&apos;d love to hear about your project
                  </p>
                  <motion.div
                    className="h-[2px] bg-text origin-left"
                    initial={{ scaleX: 1 }}
                    whileHover={{ scaleX: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                </a>
              </motion.div>

              {/* WhatsApp */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <div className="text-sm text-text-secondary mb-4 uppercase tracking-wider">
                  WhatsApp
                </div>
                <a
                  href="https://wa.me/+255777893633"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block cursor-pointer"
                >
                  <div className="text-[clamp(1.5rem,4vw,3rem)] font-medium text-text mb-3 group-hover:translate-x-2 transition-transform duration-300">
                    +255 777 893 633
                  </div>
                  <p className="text-text-secondary mb-4 group-hover:text-text transition-colors duration-300">
                    Let&apos;s chat - I typically respond within the hour
                  </p>
                  <motion.div
                    className="h-[2px] bg-text origin-left"
                    initial={{ scaleX: 1 }}
                    whileHover={{ scaleX: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
