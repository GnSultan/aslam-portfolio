'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'
import { useCursorStore } from '@/hooks/useCursorStore'

export default function CustomCursor() {
  const { isHovering, cursorText, cursorVariant } = useCursorStore()
  const [isVisible, setIsVisible] = useState(false)
  const cursorRef = useRef<HTMLDivElement>(null)
  const lastMousePosition = useRef({ x: 0, y: 0 })
  const velocityRef = useRef({ x: 0, y: 0 })

  // Use Framer Motion values for ultra-smooth interpolation
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Adaptive spring configuration based on cursor state and movement
  const getSpringConfig = useCallback(() => {
    const isTextState = cursorText && cursorText.trim() !== '' && isHovering
    const isClickState = cursorVariant === 'click'

    if (isTextState) {
      // Slower, more dramatic for text states
      return {
        damping: 30,
        stiffness: 200,
        mass: 1.2,
        restSpeed: 0.01,
        restDelta: 0.01,
      }
    } else if (isClickState) {
      // Quick, snappy for clicks
      return {
        damping: 25,
        stiffness: 500,
        mass: 0.6,
        restSpeed: 0.01,
        restDelta: 0.01,
      }
    } else {
      // Ultra-smooth for normal movement
      return {
        damping: 18,
        stiffness: 280,
        mass: 0.9,
        restSpeed: 0.001,
        restDelta: 0.001,
      }
    }
  }, [cursorText, isHovering, cursorVariant])

  // Springs that update their config when cursor state changes
  const [springConfig, setSpringConfig] = useState(getSpringConfig())

  const cursorX = useSpring(mouseX, springConfig)
  const cursorY = useSpring(mouseY, springConfig)

  // Update spring configuration when cursor state changes
  useEffect(() => {
    const newConfig = getSpringConfig()
    setSpringConfig(newConfig)
  }, [getSpringConfig])

  // Enhanced mouse tracking with velocity calculation for adaptive smoothness
  const mouseMove = useCallback((e: MouseEvent) => {
    const currentTime = performance.now()
    const deltaX = e.clientX - lastMousePosition.current.x
    const deltaY = e.clientY - lastMousePosition.current.y

    // Calculate velocity for potential future use (smooth cursor trails, etc.)
    velocityRef.current = { x: deltaX, y: deltaY }
    lastMousePosition.current = { x: e.clientX, y: e.clientY }

    // Direct update to motion values - bypasses React state for maximum smoothness
    mouseX.set(e.clientX)
    mouseY.set(e.clientY)

    if (!isVisible) {
      setIsVisible(true)
    }
  }, [mouseX, mouseY, isVisible])

  useEffect(() => {
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (isTouchDevice || prefersReducedMotion) {
      return
    }

    let isMouseInWindow = true

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

    // Use passive listeners for maximum performance
    window.addEventListener('mousemove', mouseMove, { passive: true })
    document.addEventListener('mouseenter', mouseEnter, { passive: true })
    document.addEventListener('mouseleave', mouseLeave, { passive: true })

    return () => {
      window.removeEventListener('mousemove', mouseMove)
      document.removeEventListener('mouseenter', mouseEnter)
      document.removeEventListener('mouseleave', mouseLeave)
    }
  }, [mouseMove])

  // Optimized willChange management for smooth motion
  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    // Set willChange for cursor movement - it's always moving so this is optimal
    cursor.style.willChange = 'transform'

    return () => {
      if (cursor) {
        cursor.style.willChange = 'auto'
      }
    }
  }, [])

  if (!isVisible) return null

  const getCircleSize = (text: string) => {
    if (!text || text.trim() === '') return 40
    return 115
  }

  const getCursorStyles = () => {
    const hasText = cursorText && cursorText.trim() !== '' && isHovering

    if (hasText) {
      const circleSize = getCircleSize(cursorText)
      return {
        size: { width: circleSize, height: circleSize },
        background: '#0F0F0F',
        color: '#FAFAFA',
        fontSize: 18,
        fontWeight: 800,
        mixBlendMode: 'normal' as const
      }
    }

    switch (cursorVariant) {
      case 'hover':
        return {
          size: { width: 50, height: 50 },
          background: '#ffffff',
          color: 'transparent',
          fontSize: 0,
          fontWeight: 'normal' as const,
          mixBlendMode: 'difference' as const
        }
      case 'click':
        return {
          size: { width: 20, height: 20 },
          background: '#ffffff',
          color: 'transparent',
          fontSize: 0,
          fontWeight: 'normal' as const,
          mixBlendMode: 'difference' as const
        }
      default:
        return {
          size: { width: 32, height: 32 },
          background: '#ffffff',
          color: 'transparent',
          fontSize: 0,
          fontWeight: 'normal' as const,
          mixBlendMode: 'difference' as const
        }
    }
  }

  const styles = getCursorStyles()
  const hasText = cursorText && cursorText.trim() !== '' && isHovering

  // Optimized transition settings for Chrome
  const getTransition = () => {
    // Reduced complexity for better Chrome performance
    const baseTransition = {
      type: 'spring' as const,
      damping: 25,
      stiffness: 200,
      mass: 0.8,
    }

    if (hasText) {
      return { ...baseTransition, damping: 30, stiffness: 160 }
    } else if (cursorVariant === 'click') {
      return { ...baseTransition, damping: 20, stiffness: 300, mass: 0.6 }
    }

    return baseTransition
  }

  return (
    <motion.div
      ref={cursorRef}
      className="fixed pointer-events-none z-[9999] custom-cursor flex items-center justify-center"
      style={{
        backgroundColor: styles.background,
        color: styles.color,
        fontSize: styles.fontSize,
        fontWeight: styles.fontWeight,
        whiteSpace: 'nowrap',
        borderRadius: '50%',
        mixBlendMode: styles.mixBlendMode,
        // Use spring-smoothed position for ultra-smooth movement
        x: cursorX,
        y: cursorY,
        // Center the cursor
        translateX: '-50%',
        translateY: '-50%',
      }}
      animate={{
        width: styles.size.width,
        height: styles.size.height,
        opacity: 1,
      }}
      transition={getTransition()}
    >
      {hasText ? cursorText : ''}
    </motion.div>
  )
}
