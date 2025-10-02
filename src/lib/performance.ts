// Performance optimization utilities

/**
 * Debounce function to limit function calls
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func(...args), delay)
  }
}

/**
 * Throttle function to limit function calls to once per interval
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let lastCall = 0
  return (...args: Parameters<T>) => {
    const now = Date.now()
    if (now - lastCall >= delay) {
      lastCall = now
      func(...args)
    }
  }
}

/**
 * Check if device supports lazy loading
 */
export function supportsLazyLoading(): boolean {
  return 'loading' in HTMLImageElement.prototype
}

/**
 * Preload images for better performance
 */
export function preloadImages(urls: string[]): Promise<void[]> {
  return Promise.all(
    urls.map(url =>
      new Promise<void>((resolve, reject) => {
        const img = new Image()
        img.onload = () => resolve()
        img.onerror = reject
        img.src = url
      })
    )
  )
}

/**
 * Generate blur data URL for images
 */
export function generateBlurDataURL(width = 10, height = 10): string {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height

  const ctx = canvas.getContext('2d')
  if (!ctx) return ''

  // Create a simple gradient
  const gradient = ctx.createLinearGradient(0, 0, width, height)
  gradient.addColorStop(0, '#f0f0f0')
  gradient.addColorStop(1, '#e0e0e0')

  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, width, height)

  return canvas.toDataURL()
}

/**
 * Optimize image sizes for responsive design
 */
export function getOptimizedImageSizes(breakpoints: { [key: string]: number }) {
  return Object.entries(breakpoints)
    .sort(([, a], [, b]) => a - b)
    .map(([, width], index, arr) => {
      if (index === arr.length - 1) {
        return `${width}px`
      }
      return `(max-width: ${arr[index + 1][1] - 1}px) ${width}px`
    })
    .join(', ')
}

/**
 * Check if device prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Performance monitoring helper
 */
export class PerformanceMonitor {
  private static marks: Map<string, number> = new Map()

  static mark(name: string) {
    this.marks.set(name, performance.now())
  }

  static measure(name: string, startMark?: string): number {
    const end = performance.now()
    const start = startMark ? this.marks.get(startMark) || 0 : 0
    const duration = end - start

    if (process.env.NODE_ENV === 'development') {
      console.log(`Performance: ${name} took ${duration.toFixed(2)}ms`)
    }

    return duration
  }

  static clearMarks() {
    this.marks.clear()
  }
}