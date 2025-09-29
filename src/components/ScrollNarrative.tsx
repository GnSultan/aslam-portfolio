'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState, useEffect, useMemo } from 'react'

interface NarrativeSegment {
  id: string
  title: string
  content: string
  highlight?: string
  position: 'left' | 'right' | 'center'
}

const narrativeSegments: NarrativeSegment[] = [
  {
    id: 'vision',
    title: 'The Vision',
    content: 'Every pixel, every interaction, every line of code serves a purpose—to bridge the gap between human needs and digital solutions.',
    highlight: 'bridge the gap',
    position: 'left'
  },
  {
    id: 'craft',
    title: 'The Craft',
    content: 'Design is not just about aesthetics. It\'s about understanding, empathy, and creating experiences that feel effortless yet powerful.',
    highlight: 'effortless yet powerful',
    position: 'right'
  },
  {
    id: 'impact',
    title: 'The Impact',
    content: 'True success isn\'t measured in metrics alone, but in the moments when technology fades into the background and people can simply be human.',
    highlight: 'simply be human',
    position: 'center'
  },
  {
    id: 'journey',
    title: 'The Journey',
    content: 'Each project is a story waiting to be told. Every challenge an opportunity to push boundaries and redefine what\'s possible.',
    highlight: 'redefine what\'s possible',
    position: 'left'
  }
]

export default function ScrollNarrative() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // Continuous progress value for per-segment opacity/position
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const unsub = scrollYProgress.on('change', (p) => setProgress(p))
    return unsub
  }, [scrollYProgress])

  const derivedActiveSegment = useMemo(() => {
    const count = narrativeSegments.length
    let nearestIndex = 0
    let nearestDist = Infinity
    for (let i = 0; i < count; i++) {
      const center = (i + 0.5) / count
      const d = Math.abs(progress - center)
      if (d < nearestDist) {
        nearestDist = d
        nearestIndex = i
      }
    }
    return nearestIndex
  }, [progress])

  // Background parallax
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [1, 1, 1, 1])

  const prefersReducedMotion = useMemo(() =>
    typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  [])

  // Stable particle positions
  const particles = useMemo(() => {
    return Array.from({ length: 20 }).map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 3 + Math.random() * 2,
      delay: Math.random() * 2,
    }))
  }, [])

  const sectionMinHeight = useMemo(() => `${narrativeSegments.length * 100}vh`, [])

  return (
    <motion.section
      ref={containerRef}
      className="relative overflow-hidden bg-background"
      style={{ opacity: sectionOpacity, minHeight: sectionMinHeight }}
    >
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/10"
        style={{ y: backgroundY }}
      />

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((p, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/20 rounded-full"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
            }}
            animate={prefersReducedMotion ? undefined : {
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={prefersReducedMotion ? undefined : {
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: 'easeInOut'
            }}
          />
        ))}
      </div>

      {/* Progress Indicator */}
      <div className="fixed left-8 top-1/2 transform -translate-y-1/2 z-20 hidden lg:block">
        <div className="flex flex-col space-y-4">
          {narrativeSegments.map((_, index) => (
            <motion.div
              key={index}
              className="w-2 h-8 bg-text/20 rounded-full overflow-hidden"
            >
              <motion.div
                className="w-full bg-primary rounded-full origin-bottom"
                initial={{ scaleY: 0 }}
                animate={{
                  scaleY: derivedActiveSegment >= index ? 1 : 0,
                  transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Sticky Narrative Container */}
      <div className="sticky top-0 h-screen flex items-center justify-center">
        <div className="container-wide">
          {narrativeSegments.map((segment, index) => {
            const count = narrativeSegments.length
            const center = (index + 0.5) / count
            // Snap window around center: reveal only when within deadzone
            const deadzone = 0.08 // tighter center window
            const distance = Math.abs(progress - center)
            const isActive = distance <= deadzone
            return (
            <motion.div
              key={segment.id}
              className={`absolute inset-0 flex items-center ${
                segment.position === 'center' ? 'justify-center' :
                segment.position === 'right' ? 'justify-end' :
                'justify-start'
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: isActive ? 1 : 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.div
                className={`max-w-2xl ${
                  segment.position === 'center' ? 'text-center' :
                  segment.position === 'right' ? 'text-right' :
                  'text-left'
                }`}
                initial={{ y: 24, opacity: 0 }}
                animate={{ y: isActive ? 0 : 24, opacity: isActive ? 1 : 0 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              >
                <motion.h3
                  className="text-sm uppercase tracking-wider text-primary mb-4 font-medium"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: isActive ? 1 : 0.2, y: isActive ? 0 : 10 }}
                  transition={{ duration: 0.2 }}
                >
                  {segment.title}
                </motion.h3>

                <motion.p
                  className="text-2xl md:text-3xl lg:text-4xl leading-relaxed text-text-secondary"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 12 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                >
                  {segment.content.split(segment.highlight || '').map((part, i, arr) => (
                    <span key={i}>
                      {part}
                      {i < arr.length - 1 && segment.highlight && (
                        <motion.span
                          className="text-primary font-semibold relative"
                          animate={{
                            backgroundSize: isActive ? '100% 100%' : '0% 100%'
                          }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                          style={{
                            backgroundImage: 'linear-gradient(120deg, rgba(0, 102, 255, 0.1) 0%, rgba(0, 102, 255, 0.2) 100%)',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: '0% 0%'
                          }}
                        >
                          {segment.highlight}
                        </motion.span>
                      )}
                    </span>
                  ))}
                </motion.p>

                {/* Decorative Element */}
                <motion.div
                  className="mt-8 flex justify-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.95 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="w-12 h-[1px] bg-primary" />
                </motion.div>
              </motion.div>
            </motion.div>
            )
          })}
        </div>
      </div>
    </motion.section>
  )
}