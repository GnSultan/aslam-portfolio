'use client'

import { motion } from 'framer-motion'

interface LoadingSpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg'
  color?: 'primary' | 'secondary' | 'text'
  className?: string
  text?: string
}

export default function LoadingSpinner({
  size = 'md',
  color = 'primary',
  className = '',
  text
}: LoadingSpinnerProps) {
  const sizeClasses = {
    xs: 'w-4 h-4',
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  }

  const colorClasses = {
    primary: 'border-primary',
    secondary: 'border-secondary',
    text: 'border-text'
  }

  return (
    <div className={`flex flex-col items-center justify-center gap-3 ${className}`}>
      {/* Modern spinner */}
      <div className="relative">
        {/* Background ring */}
        <div
          className={`${sizeClasses[size]} rounded-full border-2 border-secondary/20`}
        />

        {/* Animated ring */}
        <motion.div
          className={`absolute inset-0 ${sizeClasses[size]} rounded-full border-2 border-transparent border-t-current ${colorClasses[color]}`}
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Inner pulse */}
        <motion.div
          className={`absolute inset-2 rounded-full bg-current opacity-20 ${colorClasses[color]}`}
          animate={{
            scale: [0.8, 1.2, 0.8],
            opacity: [0.2, 0.1, 0.2]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Optional text */}
      {text && (
        <motion.p
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-text-secondary"
        >
          {text}
        </motion.p>
      )}
    </div>
  )
}

// Minimal dots loader for inline use
export function DotsLoader({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center space-x-1 ${className}`}>
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="w-1.5 h-1.5 bg-current rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.15,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  )
}

// Pulse loader for buttons
export function PulseLoader({ className = '' }: { className?: string }) {
  return (
    <motion.div
      className={`w-4 h-4 bg-current rounded-full ${className}`}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.7, 1, 0.7]
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  )
}