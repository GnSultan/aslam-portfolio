'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

interface PortfolioLoaderProps {
  text?: string
  subtitle?: string
  fullscreen?: boolean
  className?: string
}

export default function PortfolioLoader({
  text = "Loading Project",
  subtitle = "Preparing your experience",
  fullscreen = true,
  className = ""
}: PortfolioLoaderProps) {
  const [loadingStep, setLoadingStep] = useState(0)
  const [progress, setProgress] = useState(0)

  const loadingSteps = [
    "Initializing...",
    "Loading assets...",
    "Preparing layout...",
    "Almost ready..."
  ]

  useEffect(() => {
    const stepTimer = setInterval(() => {
      setLoadingStep(prev => {
        if (prev >= loadingSteps.length - 1) {
          clearInterval(stepTimer)
          return prev
        }
        return prev + 1
      })
    }, 800)

    const progressTimer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressTimer)
          return 100
        }
        return prev + 2
      })
    }, 50)

    return () => {
      clearInterval(stepTimer)
      clearInterval(progressTimer)
    }
  }, [loadingSteps.length])

  const containerClasses = fullscreen
    ? "fixed inset-0 z-50 bg-background/95 backdrop-blur-md"
    : ""

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className={`flex flex-col items-center justify-center min-h-screen ${containerClasses} ${className}`}
      >
        {/* Main content container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-center space-y-8"
        >
          {/* Animated logo/brand area */}
          <motion.div
            className="relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
          >
            {/* Geometric loading animation */}
            <div className="relative w-20 h-20 mx-auto">
              {/* Outer rotating square */}
              <motion.div
                className="absolute inset-0 border-2 border-text/10 rotate-45"
                animate={{ rotate: 405 }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />

              {/* Inner rotating square */}
              <motion.div
                className="absolute inset-2 border-2 border-primary/30"
                animate={{ rotate: -360 }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />

              {/* Center animated dot */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.2, 1] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="w-2 h-2 bg-primary rounded-full" />
              </motion.div>

              {/* Orbiting elements */}
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1.5 h-1.5 bg-text/20 rounded-full"
                  style={{
                    top: '50%',
                    left: '50%',
                    transformOrigin: '0 0'
                  }}
                  animate={{
                    rotate: 360,
                    x: Math.cos(i * 90 * Math.PI / 180) * 30,
                    y: Math.sin(i * 90 * Math.PI / 180) * 30
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear",
                    delay: i * 0.25
                  }}
                />
              ))}
            </div>
          </motion.div>

          {/* Loading text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="space-y-2"
          >
            <h2 className="text-2xl font-medium text-text">
              {text}
            </h2>
            <p className="text-text-secondary">
              {subtitle}
            </p>
          </motion.div>

          {/* Progress indicator */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="space-y-4"
          >
            {/* Progress bar */}
            <div className="relative w-64 h-px bg-secondary/30 mx-auto overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-primary"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />

              {/* Glow effect */}
              <motion.div
                className="absolute inset-y-0 right-0 w-8 bg-gradient-to-r from-transparent to-primary/30 blur-sm"
                style={{ left: `${Math.max(0, progress - 12)}%` }}
                animate={{ opacity: progress > 5 ? [0.5, 1, 0.5] : 0 }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>

            {/* Loading steps */}
            <motion.div
              key={loadingStep}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="text-sm text-text-secondary/70"
            >
              {loadingSteps[loadingStep]}
            </motion.div>

            {/* Progress percentage */}
            <div className="text-xs text-text-secondary/50 font-mono">
              {progress.toString().padStart(2, '0')}%
            </div>
          </motion.div>
        </motion.div>

        {/* Background ambient animation */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-px h-px bg-primary/10 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 0.6, 0]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}