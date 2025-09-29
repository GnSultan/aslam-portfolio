'use client'

import { ReactNode, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Lenis from '@studio-freight/lenis'

const SmoothScroll = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname()

  useEffect(() => {
    const prefersReduced = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const lenis = new Lenis({
      duration: prefersReduced ? 0.6 : 1.5,
      easing: prefersReduced
        ? (t: number) => t
        : (t: number) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      wheelMultiplier: prefersReduced ? 1.0 : 1.12,
    })

    // Make Lenis globally available
    ;(window as unknown as { lenis?: Lenis }).lenis = lenis

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
      delete (window as unknown as { lenis?: Lenis }).lenis
    }
  }, [])

  // Handle scroll to top on route change
  useEffect(() => {
    // Small delay to ensure page content is loaded
    const timer = setTimeout(() => {
      const lenis = (window as unknown as { lenis?: Lenis }).lenis
      if (lenis) {
        lenis.scrollTo(0, { immediate: true })
      } else {
        // Fallback if lenis isn't ready
        window.scrollTo(0, 0)
      }
    }, 50)

    return () => clearTimeout(timer)
  }, [pathname])

  return <>{children}</>
}

export default SmoothScroll
