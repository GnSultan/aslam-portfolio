'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function ProjectNotFound() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-lg mx-auto px-4"
      >
        {/* 404 Illustration */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8 relative"
        >
          {/* Animated 404 */}
          <div className="text-8xl font-bold text-text/10 mb-4 relative">
            <motion.span
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              4
            </motion.span>
            <motion.span
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="inline-block"
            >
              0
            </motion.span>
            <motion.span
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            >
              4
            </motion.span>
          </div>

          {/* Animated line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            className="w-24 h-px bg-primary mx-auto mb-6 origin-left"
          />

          {/* Floating elements */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-primary/20 rounded-full"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${30 + (i % 2) * 40}%`
                }}
                animate={{
                  y: [-10, 10, -10],
                  opacity: [0.2, 0.6, 0.2]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Error Content */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h1 className="h2 mb-4 text-text">Project Not Found</h1>
          <p className="text-lg text-text-secondary mb-8 leading-relaxed">
            The project you&apos;re looking for doesn&apos;t exist or may have been moved.
            Let&apos;s get you back to exploring my work.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/"
            className="px-6 py-3 bg-text text-background rounded-lg hover:bg-text/90 transition-colors inline-flex items-center justify-center group"
          >
            <span>← Back to Home</span>
          </Link>

          <Link
            href="/#projects"
            className="px-6 py-3 border border-text text-text rounded-lg hover:bg-text hover:text-background transition-colors inline-flex items-center justify-center"
          >
            View All Projects
          </Link>
        </motion.div>

        {/* Suggestion */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 pt-8 border-t border-secondary/30"
        >
          <p className="text-sm text-text-secondary">
            Looking for something specific?{' '}
            <a
              href="mailto:hello@aslam.com"
              className="text-primary hover:underline"
            >
              Get in touch
            </a>
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}