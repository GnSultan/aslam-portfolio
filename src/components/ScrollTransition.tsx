'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Hero from './Hero'

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export default function ScrollTransition() {
  const [showTyping, setShowTyping] = useState(false)
  const [isScrollLocked, setIsScrollLocked] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [typedText, setTypedText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [showFallingCursor, setShowFallingCursor] = useState(false)
  const [cursorHasLanded, setCursorHasLanded] = useState(false)

  const heroRef = useRef<HTMLDivElement>(null)
  const scrollPositionRef = useRef(0)

  // Comprehensive scroll locking
  const disableScroll = useCallback(() => {
    // Store current scroll position
    scrollPositionRef.current = window.pageYOffset

    // Prevent default scroll behaviors
    const preventDefault = (e: Event) => e.preventDefault()
    const preventScrollKeys = (e: KeyboardEvent) => {
      const keys = ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' ', 'Tab']
      if (keys.includes(e.key)) {
        e.preventDefault()
      }
    }

    // Add event listeners
    window.addEventListener('wheel', preventDefault, { passive: false })
    window.addEventListener('touchmove', preventDefault, { passive: false })
    window.addEventListener('keydown', preventScrollKeys, { passive: false })

    // CSS method as backup
    document.body.style.overflow = 'hidden'
    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollPositionRef.current}px`
    document.body.style.left = '0px'
    document.body.style.width = '100%'
    document.body.style.height = '100%'

    setIsScrollLocked(true)
  }, [])

  const enableScroll = useCallback(() => {
    // Remove event listeners
    const preventDefault = (e: Event) => e.preventDefault()
    const preventScrollKeys = (e: KeyboardEvent) => {
      const keys = ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' ', 'Tab']
      if (keys.includes(e.key)) {
        e.preventDefault()
      }
    }

    window.removeEventListener('wheel', preventDefault)
    window.removeEventListener('touchmove', preventDefault)
    window.removeEventListener('keydown', preventScrollKeys)

    // Restore CSS
    document.body.style.position = ''
    document.body.style.top = ''
    document.body.style.left = ''
    document.body.style.width = ''
    document.body.style.height = ''
    document.body.style.overflow = ''

    // Restore scroll position
    window.scrollTo(0, scrollPositionRef.current)
    setIsScrollLocked(false)
  }, [])

  const startTypingAnimation = useCallback(() => {
    return new Promise<void>(resolve => {
      const textLines = [
        "In a world where technology often overwhelms,",
        "I believe true impact comes from creating tools and experiences",
        "that empower people, foster clarity, and inspire meaningful connection.",
        "<br />",
        "<br />",
        "My work is driven by the belief that design and technology should not just exist—",
        "they should make life easier, amplify creativity, and bring people closer together."
      ]

      setIsTyping(true)
      const fullText = textLines.join(' ').replace(/<br \/>/g, '<br /> ')
      let currentText = ''
      let i = 0
      let animationFrameId: number

      const type = () => {
        if (i < fullText.length) {
          const char = fullText.charAt(i)
          currentText += char
          setTypedText(currentText)
          i++
          animationFrameId = requestAnimationFrame(type)
        } else {
          setIsTyping(false)
          resolve()
        }
      }

      type()

      return () => {
        cancelAnimationFrame(animationFrameId)
      }
    })
  }, [])

  const startTransition = useCallback(async () => {
    if (isAnimating) return

    console.log('Starting transition')
    setIsAnimating(true)
    disableScroll()

    // Show the falling cursor at bottom of hero
    setShowFallingCursor(true)
    console.log('Falling cursor shown')

    // Show typing section when cursor is halfway down
    await wait(500)
    console.log('Showing typing section')
    setShowTyping(true)

    // Cursor lands and typing begins
    await wait(500)
    console.log('Cursor landed, starting typing')
    setCursorHasLanded(true)
    setShowFallingCursor(false)
    await startTypingAnimation()

    // Wait a moment then unlock scroll
    await wait(1000)
    enableScroll()
    setIsAnimating(false)
  }, [isAnimating, disableScroll, startTypingAnimation, enableScroll])

  // Scroll detection for immediate trigger
  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 50 && !showFallingCursor && !isAnimating) {
        console.log('Scroll detected, starting transition')
        startTransition()
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [showFallingCursor, isAnimating, startTransition])

  return (
    <div className="relative">
      {/* Show hero when no transition, typing section when transition happens */}
      {!showTyping ? (
        <motion.div
          ref={heroRef}
          initial={{ opacity: 1 }}
          animate={{
            opacity: showFallingCursor ? 0.3 : 1,
          }}
          transition={{
            duration: 1.0,
            ease: [0.16, 1, 0.3, 1]
          }}
          className="relative z-10 min-h-screen"
        >
          <Hero />
        </motion.div>
      ) : (
        <motion.div
          key="typing"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="min-h-screen flex items-center justify-center bg-background"
        >
          <div className="container-wide">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div></div>
              <div className="max-w-2xl">
                <div className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-tight text-text-secondary">
                  <span dangerouslySetInnerHTML={{ __html: typedText }} />
                  {(isTyping || cursorHasLanded) && (
                    <motion.span
                      className="inline-block ml-1 text-primary"
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: 'easeInOut'
                      }}
                    >
                      _
                    </motion.span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Falling Cursor - The storytelling device */}
      <AnimatePresence>
        {showFallingCursor && (
          <motion.div
            className="fixed z-30 pointer-events-none"
            initial={{
              x: '50vw',
              y: '80vh', // Start at bottom of hero
              opacity: 1,
              scale: 1
            }}
            animate={{
              x: '50vw', // Stay centered horizontally
              y: '150vh', // Fall down to next section
              opacity: 1,
              scale: [1, 1.2, 0.8, 1.1, 1], // Bounce on landing
            }}
            exit={{
              opacity: 0,
              scale: 1.5
            }}
            transition={{
              duration: 1.0,
              ease: [0.25, 0.46, 0.45, 0.94], // Gravity easing
              scale: {
                duration: 0.2,
                delay: 0.8, // Bounce when landing
                ease: 'easeOut'
              }
            }}
            style={{
              left: '50%',
              top: 0,
              transform: 'translateX(-50%)'
            }}
          >
            <motion.div
              className="text-primary text-6xl font-bold"
              animate={{
                opacity: [1, 0, 1],
                rotateZ: [0, 5, -5, 0] // Slight wobble during fall
              }}
              transition={{
                opacity: {
                  duration: 0.6,
                  repeat: Infinity,
                  ease: 'easeInOut'
                },
                rotateZ: {
                  duration: 0.8,
                  ease: 'easeInOut'
                }
              }}
            >
              |
            </motion.div>

            {/* Landing dust effect */}
            <motion.div
              className="absolute -bottom-2 left-1/2 transform -translate-x-1/2"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1.5, 2],
                rotate: [0, 180]
              }}
              transition={{
                duration: 0.3,
                delay: 0.8, // Appears when cursor lands
                ease: 'easeOut'
              }}
            >
              <div className="w-8 h-1 bg-primary/30 rounded-full" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll Lock Indicator */}
      {isScrollLocked && (
        <motion.div
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
        >
          <div className="flex items-center gap-2 bg-background/95 backdrop-blur-sm rounded-full px-4 py-2 text-sm text-text-secondary border border-text/10 shadow-lg">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            Typing in progress...
          </div>
        </motion.div>
      )}
    </div>
  )
}
