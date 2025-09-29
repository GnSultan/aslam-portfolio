'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

interface ModernLoaderProps {
  text?: string
  size?: 'sm' | 'md' | 'lg'
  fullscreen?: boolean
  className?: string
}

export default function ModernLoader({
  text = "Loading...",
  size = 'md',
  fullscreen = true,
  className = ""
}: ModernLoaderProps) {
  const [progress, setProgress] = useState(0)

  // Simulate loading progress
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer)
          return 100
        }
        // Realistic loading progression - faster at start, slower near end
        const increment = prev < 30 ? 8 : prev < 70 ? 4 : 2
        return Math.min(prev + increment, 100)
      })
    }, 150)

    return () => clearInterval(timer)
  }, [])

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  }

  const containerClasses = fullscreen
    ? "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
    : ""

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className={`flex flex-col items-center justify-center ${containerClasses} ${className}`}
      >
        {/* Modern spinning loader */}
        <div className="relative">
          {/* Outer ring */}
          <motion.div
            className={`${sizeClasses[size]} rounded-full border-2 border-secondary/20`}
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            }}
          />

          {/* Inner animated ring */}
          <motion.div
            className={`absolute inset-0 ${sizeClasses[size]} rounded-full border-2 border-transparent border-t-primary border-r-primary`}
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Center dot */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ scale: 0.8, opacity: 0.5 }}
            animate={{ scale: 1.2, opacity: 1 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          >
            <div className="w-1 h-1 bg-primary rounded-full" />
          </motion.div>
        </div>

        {/* Loading text with typing effect */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="mt-6 text-center"
        >
          <div className="text-text-secondary text-sm font-medium mb-2">
            {text}
          </div>

          {/* Progress bar */}
          <div className="w-32 h-px bg-secondary/30 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          </div>

          {/* Progress percentage */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xs text-text-secondary/70 mt-2"
          >
            {progress}%
          </motion.div>
        </motion.div>

        {/* Floating particles effect */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary/20 rounded-full"
              initial={{
                x: "50%",
                y: "50%",
                scale: 0,
                opacity: 0
              }}
              animate={{
                x: `${50 + (Math.cos(i * 60 * Math.PI / 180) * 60)}%`,
                y: `${50 + (Math.sin(i * 60 * Math.PI / 180) * 60)}%`,
                scale: [0, 1, 0],
                opacity: [0, 0.6, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

// Compact inline loader for smaller spaces
export function InlineLoader({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <motion.div
        className="flex space-x-1"
        initial="hidden"
        animate="visible"
      >
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="w-2 h-2 bg-primary rounded-full"
            variants={{
              hidden: { opacity: 0.3, scale: 0.8 },
              visible: { opacity: 1, scale: 1 }
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              repeatType: "reverse",
              delay: i * 0.2
            }}
          />
        ))}
      </motion.div>
    </div>
  )
}