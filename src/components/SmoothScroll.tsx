'use client'

import { ReactNode, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Lenis from 'lenis'

const SmoothScroll = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname()

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
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
