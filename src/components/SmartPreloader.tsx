'use client'

import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

interface PreloadTarget {
  href: string
  priority: number
  lastHovered?: number
  viewport?: boolean
}

export default function SmartPreloader() {
  const router = useRouter()
  const preloadedUrls = useRef(new Set<string>())
  const hoverTimers = useRef(new Map<string, NodeJS.Timeout>())
  const intersectionObserver = useRef<IntersectionObserver | undefined>(undefined)

  // Preload a URL with Next.js router prefetch
  const preloadUrl = (href: string, priority: 'high' | 'low' = 'low') => {
    if (preloadedUrls.current.has(href)) return

    try {
      // Use Next.js router prefetch for faster navigation
      router.prefetch(href)
      preloadedUrls.current.add(href)

      console.log(`🚀 Preloaded: ${href} (${priority} priority)`)

      // Also preload the actual page assets
      const link = document.createElement('link')
      link.rel = 'prefetch'
      link.href = href
      link.as = 'document'
      document.head.appendChild(link)

    } catch (error) {
      console.warn('Preload failed:', href, error)
    }
  }

  // Smart hover detection with delayed preloading
  useEffect(() => {
    const handleMouseEnter = (event: MouseEvent) => {
      const rawTarget = event.target as EventTarget | null
      if (!(rawTarget instanceof Element)) return

      const link = rawTarget.closest('a[href]') as HTMLAnchorElement | null
      if (!link) return

      const rawHref = link.getAttribute('href') || ''
      if (!rawHref) return
      const href = rawHref.startsWith('http')
        ? new URL(rawHref).pathname
        : new URL(rawHref, window.location.origin).pathname

      // Only preload internal links
      if (!href.startsWith('/')) return

      // Set a timer to preload after 200ms of hover (indicates intent)
      const timer = setTimeout(() => {
        preloadUrl(href, 'high')
      }, 200)

      hoverTimers.current.set(href, timer)
    }

    const handleMouseLeave = (event: MouseEvent) => {
      const rawTarget = event.target as EventTarget | null
      if (!(rawTarget instanceof Element)) return

      const link = rawTarget.closest('a[href]') as HTMLAnchorElement | null
      if (!link) return

      const rawHref = link.getAttribute('href') || ''
      if (!rawHref) return
      const href = rawHref.startsWith('http')
        ? new URL(rawHref).pathname
        : new URL(rawHref, window.location.origin).pathname
      const timer = hoverTimers.current.get(href)

      if (timer) {
        clearTimeout(timer)
        hoverTimers.current.delete(href)
      }
    }

    // Add global event listeners
    document.addEventListener('mouseenter', handleMouseEnter, true)
    document.addEventListener('mouseleave', handleMouseLeave, true)

    return () => {
      document.removeEventListener('mouseenter', handleMouseEnter, true)
      document.removeEventListener('mouseleave', handleMouseLeave, true)

      // Clear all pending timers
      hoverTimers.current.forEach(timer => clearTimeout(timer))
      hoverTimers.current.clear()
    }
  }, [])

  // Viewport-based preloading for visible links
  useEffect(() => {
    intersectionObserver.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const link = entry.target as HTMLAnchorElement
            if (link.href) {
              const href = new URL(link.href).pathname
              if (href.startsWith('/')) {
                // Preload with low priority when links come into view
                setTimeout(() => preloadUrl(href, 'low'), 500)
              }
            }
          }
        })
      },
      {
        rootMargin: '100px', // Start preloading 100px before element enters viewport
        threshold: 0.1
      }
    )

    // Observe all internal links
    const observeLinks = () => {
      const links = document.querySelectorAll('a[href^="/"]')
      links.forEach(link => {
        intersectionObserver.current?.observe(link)
      })
    }

    // Initial observation
    observeLinks()

    // Re-observe when new content is added
    const mutationObserver = new MutationObserver(() => {
      observeLinks()
    })

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true
    })

    return () => {
      intersectionObserver.current?.disconnect()
      mutationObserver.disconnect()
    }
  }, [])

  // Predictive preloading based on common user patterns
  useEffect(() => {
    const predictivePreload = () => {
      const currentPath = window.location.pathname

      // Pattern 1: If on homepage, preload featured projects
      if (currentPath === '/') {
        setTimeout(() => {
          preloadUrl('/projects', 'low')
          // Preload individual featured projects
          const featuredLinks = document.querySelectorAll('[data-project-hover] a[href^="/projects/"]')
          featuredLinks.forEach((link, index) => {
            if (index < 3) { // Only preload first 3 featured projects
              const href = (link as HTMLAnchorElement).pathname
              setTimeout(() => preloadUrl(href, 'low'), index * 500)
            }
          })
        }, 2000)
      }

      // Pattern 2: If on project page, preload related projects
      if (currentPath.startsWith('/projects/')) {
        setTimeout(() => {
          const relatedLinks = document.querySelectorAll('.horizontal-scroll-carousel a[href^="/projects/"]')
          relatedLinks.forEach((link, index) => {
            if (index < 2) { // Preload first 2 related projects
              const href = (link as HTMLAnchorElement).pathname
              setTimeout(() => preloadUrl(href, 'low'), index * 300)
            }
          })
        }, 1500)
      }

      // Pattern 3: Preload gallery project pages based on scroll position
      const handleGalleryScroll = () => {
        const gallerySection = document.getElementById('gallery')
        if (!gallerySection) return

        const rect = gallerySection.getBoundingClientRect()
        const inView = rect.top < window.innerHeight && rect.bottom > 0

        if (inView) {
          const galleryImages = document.querySelectorAll('.gallery-container [data-magnetic]')
          galleryImages.forEach((image, index) => {
            if (index < 5) { // Preload first 5 gallery projects
              const projectId = (image as HTMLElement).onclick?.toString().match(/projects\/([^"']+)/)?.[1]
              if (projectId) {
                setTimeout(() => preloadUrl(`/projects/${projectId}`, 'low'), index * 200)
              }
            }
          })

          // Remove scroll listener after preloading
          window.removeEventListener('scroll', handleGalleryScroll)
        }
      }

      window.addEventListener('scroll', handleGalleryScroll, { passive: true })

      return () => {
        window.removeEventListener('scroll', handleGalleryScroll)
      }
    }

    const cleanup = predictivePreload()
    return cleanup
  }, [])

  // Critical resource preloading
  useEffect(() => {
    const preloadCriticalResources = () => {
      // Preload common images
      const criticalImages = [
        '/aslam-portrait.jpg',
        '/hero-bg.jpg',
        // Add other critical images
      ]

      criticalImages.forEach(src => {
        const link = document.createElement('link')
        link.rel = 'preload'
        link.href = src
        link.as = 'image'
        document.head.appendChild(link)
      })

      // Preload fonts
      const fonts = [
        '/fonts/clash-grotesk.woff2',
        // Add other critical fonts
      ]

      fonts.forEach(src => {
        const link = document.createElement('link')
        link.rel = 'preload'
        link.href = src
        link.as = 'font'
        link.type = 'font/woff2'
        link.crossOrigin = 'anonymous'
        document.head.appendChild(link)
      })
    }

    preloadCriticalResources()
  }, [])

  // Performance monitoring
  useEffect(() => {
    const logPerformance = () => {
      if ('performance' in window) {
        setTimeout(() => {
          const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
          const loadTime = navigation.loadEventEnd - navigation.loadEventStart

          console.log(`📊 Page load time: ${loadTime.toFixed(2)}ms`)
          console.log(`🔗 Preloaded URLs: ${preloadedUrls.current.size}`)
        }, 2000)
      }
    }

    logPerformance()
  }, [])

  // This component doesn't render anything - it's purely functional
  return null
}