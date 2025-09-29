'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'
import { useCursorStore } from '@/hooks/useCursorStore'

interface ClickRipple {
  id: string
  x: number
  y: number
  timestamp: number
  type: 'click' | 'navigation' // Different types for different effects
}

export default function CustomCursor() {
  const { isHovering, cursorText, cursorVariant } = useCursorStore()
  const [isVisible, setIsVisible] = useState(false)
  const [clickRipples, setClickRipples] = useState<ClickRipple[]>([])
  const [isClicking, setIsClicking] = useState(false)
  const activeTimeoutsRef = useRef<Set<NodeJS.Timeout>>(new Set())
  const cursorRef = useRef<HTMLDivElement>(null)
  const lastMousePosition = useRef({ x: 0, y: 0 })
  const velocityRef = useRef({ x: 0, y: 0 })
  const rippleIdCounter = useRef(0)

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

  // Initialize cursor position on mount
  useEffect(() => {
    const initializeCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      lastMousePosition.current = { x: e.clientX, y: e.clientY }
      setIsVisible(true)
    }

    // Set initial position if mouse is already over the window
    const handleInitialMouseMove = (e: MouseEvent) => {
      initializeCursor(e)
      window.removeEventListener('mousemove', handleInitialMouseMove)
    }

    window.addEventListener('mousemove', handleInitialMouseMove, { passive: true, once: true })

    return () => {
      window.removeEventListener('mousemove', handleInitialMouseMove)
    }
  }, [mouseX, mouseY])

  // Handle click ripple effects
  const createClickRipple = useCallback((x: number, y: number, type: 'click' | 'navigation' = 'click') => {
    const rippleId = `ripple-${rippleIdCounter.current++}`
    const newRipple: ClickRipple = {
      id: rippleId,
      x,
      y,
      timestamp: performance.now(),
      type
    }

    setClickRipples(prev => [...prev, newRipple])

    // Remove ripple after animation completes
    const duration = type === 'navigation' ? 1000 : 700
    const timeout = setTimeout(() => {
      setClickRipples(prev => prev.filter(ripple => ripple.id !== rippleId))
      activeTimeoutsRef.current.delete(timeout)
    }, duration)

    // Track timeout for cleanup
    activeTimeoutsRef.current.add(timeout)
  }, [])

  // Clear all ripples and timeouts when navigating
  const clearAllRipples = useCallback(() => {
    setClickRipples([])
    // Clear all pending timeouts
    activeTimeoutsRef.current.forEach(timeout => clearTimeout(timeout))
    activeTimeoutsRef.current.clear()
  }, [])

  // Listen for click events to create ripples and cursor feedback
  useEffect(() => {
    const handleClick = (e: MouseEvent | TouchEvent) => {
      const target = e.target as HTMLElement
      const isInteractive = target.closest('a, button, [data-cursor-hover], [role="button"], [role="link"]')

      if (isInteractive) {
        let clientX, clientY

        if (e.type === 'touchend' && 'changedTouches' in e) {
          // Handle touch events
          clientX = e.changedTouches[0].clientX
          clientY = e.changedTouches[0].clientY
        } else if ('clientX' in e) {
          // Handle mouse events
          clientX = e.clientX
          clientY = e.clientY
        } else {
          return
        }

        // Determine ripple type based on element
        const isLink = target.closest('a[href]')
        const rippleType = isLink ? 'navigation' : 'click'

        // Create ripple on click (supports both mouse and trackpad)
        createClickRipple(clientX, clientY, rippleType)
      }
    }

    const handleMouseDown = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isInteractive = target.closest('a, button, [data-cursor-hover], [role="button"], [role="link"]')

      if (isInteractive) {
        setIsClicking(true)
      }
    }

    const handleMouseUp = () => {
      setIsClicking(false)
    }

    const handleTouchStart = (e: TouchEvent) => {
      const target = e.target as HTMLElement
      const isInteractive = target.closest('a, button, [data-cursor-hover], [role="button"], [role="link"]')

      if (isInteractive) {
        setIsClicking(true)
      }
    }

    const handleTouchEnd = () => {
      setIsClicking(false)
    }

    // Simple pointer events for universal support
    const handlePointerDown = (e: PointerEvent) => {
      const target = e.target as HTMLElement
      const isInteractive = target.closest('a, button, [data-cursor-hover], [data-cursor-text], [role="button"], [role="link"]')

      if (isInteractive) {
        // Use cursor's current position for better alignment
        const cursorX = mouseX.get()
        const cursorY = mouseY.get()

        setIsClicking(true)

        // Determine ripple type based on element - improved detection
        const isLink = target.closest('a[href]') || target.closest('[data-cursor-text]')
        const rippleType = isLink ? 'navigation' : 'click'

        // Create ripple using cursor position for perfect alignment
        createClickRipple(cursorX, cursorY, rippleType)
      }
    }

    const handlePointerUp = () => {
      setIsClicking(false)
    }

    // Use pointer events which work for mouse, trackpad, and touch
    window.addEventListener('pointerdown', handlePointerDown, { passive: true })
    window.addEventListener('pointerup', handlePointerUp, { passive: true })

    // Keep the original click event as fallback
    window.addEventListener('click', handleClick as EventListener, { passive: true })

    return () => {
      window.removeEventListener('pointerdown', handlePointerDown)
      window.removeEventListener('pointerup', handlePointerUp)
      window.removeEventListener('click', handleClick as EventListener)
    }
  }, [createClickRipple])

  // Clear ripples on navigation events
  useEffect(() => {
    const handleBeforeUnload = () => {
      clearAllRipples()
    }

    const handleVisibilityChange = () => {
      if (document.hidden) {
        clearAllRipples()
      }
    }

    // Clear ripples when navigation starts
    const handleNavigationStart = () => {
      clearAllRipples()
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    document.addEventListener('visibilitychange', handleVisibilityChange)

    // Listen for hash changes (internal navigation)
    window.addEventListener('hashchange', handleNavigationStart)

    // Listen for popstate (browser navigation)
    window.addEventListener('popstate', handleNavigationStart)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('hashchange', handleNavigationStart)
      window.removeEventListener('popstate', handleNavigationStart)
      clearAllRipples() // Clean up on unmount
    }
  }, [clearAllRipples])

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
    <>
      {/* Click Ripple Effects */}
      {clickRipples.map((ripple) => (
        <motion.div
          key={ripple.id}
          className="fixed pointer-events-none z-[9998]"
          style={{
            left: ripple.x,
            top: ripple.y,
            translateX: '-50%',
            translateY: '-50%',
          }}
          initial={{
            width: 0,
            height: 0,
            opacity: ripple.type === 'navigation' ? 0.8 : 0.5,
            scale: 0.8,
          }}
          animate={{
            width: ripple.type === 'navigation' ? 140 : 120,
            height: ripple.type === 'navigation' ? 140 : 120,
            opacity: 0,
            scale: 1,
          }}
          transition={{
            duration: ripple.type === 'navigation' ? 0.8 : 0.6,
            ease: ripple.type === 'navigation'
              ? [0.16, 1, 0.3, 1] // More dramatic easing for navigation
              : [0.25, 0.46, 0.45, 0.94],
          }}
        >
          <div
            className="w-full h-full rounded-full border-2"
            style={{
              borderColor: ripple.type === 'navigation'
                ? (hasText ? '#0F0F0F' : '#ffffff')
                : (hasText ? '#0F0F0F' : '#ffffff'),
              mixBlendMode: hasText ? 'normal' : 'difference',
              borderWidth: ripple.type === 'navigation' ? '3px' : '2px',
              opacity: ripple.type === 'navigation' ? 0.8 : 0.6,
            }}
          />
        </motion.div>
      ))}

      {/* Main Cursor */}
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
          scale: isClicking ? 0.85 : 1, // Subtle scale down on click
        }}
        transition={{
          ...getTransition(),
          scale: {
            duration: 0.15,
            ease: [0.25, 0.46, 0.45, 0.94]
          }
        }}
      >
        {hasText ? cursorText : ''}
      </motion.div>
    </>
  )
}
