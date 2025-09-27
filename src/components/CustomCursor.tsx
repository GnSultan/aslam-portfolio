'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useCursorStore } from '@/hooks/useCursorStore'

export default function CustomCursor() {
  const { isHovering, cursorText, cursorVariant } = useCursorStore()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (isTouchDevice || prefersReducedMotion) {
      return
    }

    let isMouseInWindow = true

    const mouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })

      if (!isVisible) {
        setIsVisible(true)
      }
      isMouseInWindow = true
    }

    const mouseEnter = () => {
      isMouseInWindow = true
      setIsVisible(true)
    }

    const mouseLeave = () => {
      isMouseInWindow = false
      setTimeout(() => {
        if (!isMouseInWindow) {
          setIsVisible(false)
        }
      }, 100)
    }

    setIsVisible(true)

    window.addEventListener('mousemove', mouseMove, { passive: true })
    document.addEventListener('mouseenter', mouseEnter)
    document.addEventListener('mouseleave', mouseLeave)

    return () => {
      window.removeEventListener('mousemove', mouseMove)
      document.removeEventListener('mouseenter', mouseEnter)
      document.removeEventListener('mouseleave', mouseLeave)
    }
  }, [isVisible])

  if (!isVisible) return null

  const getCircleSize = (text: string) => {
    // Unified large size for all interactive elements with text
    if (!text || text.trim() === '') return 48

    // Much larger size for dramatic effect
    return 140
  }

  const getCursorStyles = () => {
    // Show text if we have text and are hovering over an interactive element
    const hasText = cursorText && cursorText.trim() !== '' && isHovering

    if (hasText) {
      const circleSize = getCircleSize(cursorText)
      return {
        size: { width: `${circleSize}px`, height: `${circleSize}px`, padding: '0' },
        background: '#ffffff',
        color: '#000000',
        borderRadius: '50%',
        fontSize: '18px',
        fontWeight: '800',
        border: 'none',
        boxShadow: 'none',
        mixBlendMode: 'normal' as const
      }
    }

    switch (cursorVariant) {
      case 'hover':
        return {
          size: { width: '60px', height: '60px', padding: '0' },
          background: '#ffffff',
          color: 'transparent',
          borderRadius: '50%',
          fontSize: '0',
          fontWeight: 'normal',
          border: 'none',
          boxShadow: 'none',
          mixBlendMode: 'difference' as const
        }
      case 'click':
        return {
          size: { width: '20px', height: '20px', padding: '0' },
          background: '#ffffff',
          color: 'transparent',
          borderRadius: '50%',
          fontSize: '0',
          fontWeight: 'normal',
          border: 'none',
          boxShadow: 'none',
          mixBlendMode: 'difference' as const
        }
      default:
        return {
          size: { width: '32px', height: '32px', padding: '0' },
          background: '#ffffff',
          color: 'transparent',
          borderRadius: '50%',
          fontSize: '0',
          fontWeight: 'normal',
          border: 'none',
          boxShadow: 'none',
          mixBlendMode: 'difference' as const
        }
    }
  }

  const styles = getCursorStyles()
  const hasText = cursorText && cursorText.trim() !== '' && isHovering

  // Different transition settings based on state
  const getTransition = () => {
    if (hasText) {
      // Slower, more dramatic for text appearance
      return {
        type: 'spring' as const,
        damping: 25,
        stiffness: 150,
        mass: 1.2,
      }
    } else if (cursorVariant === 'click') {
      // Quick, snappy for click feedback
      return {
        type: 'spring' as const,
        damping: 15,
        stiffness: 400,
        mass: 0.5,
      }
    } else {
      // Medium speed for hover states
      return {
        type: 'spring' as const,
        damping: 20,
        stiffness: 250,
        mass: 0.8,
      }
    }
  }

  return (
    <motion.div
      className="fixed pointer-events-none z-[9999] custom-cursor flex items-center justify-center"
      style={{
        left: mousePosition.x,
        top: mousePosition.y,
        backgroundColor: styles.background,
        color: styles.color,
        fontSize: styles.fontSize,
        fontWeight: styles.fontWeight,
        whiteSpace: 'nowrap',
        transform: 'translate(-50%, -50%)',
        borderRadius: styles.borderRadius,
        border: styles.border,
        boxShadow: styles.boxShadow,
        mixBlendMode: styles.mixBlendMode,
        willChange: 'transform, width, height',
        transition: 'left 0.12s cubic-bezier(0.25, 0.46, 0.45, 0.94), top 0.12s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      }}
      animate={{
        ...styles.size,
        opacity: 1,
      }}
      transition={getTransition()}
    >
      {hasText ? cursorText : ''}
    </motion.div>
  )
}
