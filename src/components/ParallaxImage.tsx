'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'

interface ParallaxImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  fill?: boolean
  speed?: number // -1 to 1, negative = slower, positive = faster
  className?: string
  containerClassName?: string
  sizes?: string
  priority?: boolean
  quality?: number
  loading?: 'lazy' | 'eager'
  placeholder?: 'blur' | 'empty'
  blurDataURL?: string
}

export default function ParallaxImage({
  src,
  alt,
  width,
  height,
  fill = false,
  speed = -0.5, // Default: moves slower than scroll
  className = '',
  containerClassName = '',
  sizes,
  priority = false,
  quality = 90,
  loading = 'lazy',
  placeholder = 'empty',
  blurDataURL,
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isInitialized, setIsInitialized] = useState(false)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end -0.2"] // Extend the scroll range beyond viewport
  })

  // Apply parallax with extended range to prevent reset
  const y = useTransform(scrollYProgress, [0, 1], [speed * 100, speed * -100])

  // Check if element is in viewport for performance optimization
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isInitialized) {
          setIsInitialized(true)
        }
      },
      {
        threshold: 0.1,
        rootMargin: "50% 0px 50% 0px" // Extend the intersection area
      }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [isInitialized])

  // Initialize on mount to handle page load scenarios
  useEffect(() => {
    // Small delay to ensure proper initialization
    const timer = setTimeout(() => {
      setIsInitialized(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])
  
  return (
    <div 
      ref={containerRef}
      className={`relative overflow-hidden ${containerClassName}`}
    >
      <motion.div
        style={{ y: isInitialized ? y : 0 }}
        className="w-full h-full"
      >
        {!src ? null : fill ? (
          <Image
            src={src}
            alt={alt}
            fill
            className={`object-cover ${className}`}
            sizes={sizes}
            priority={priority}
            quality={quality}
            loading={priority ? 'eager' : loading}
            placeholder={placeholder}
            blurDataURL={blurDataURL}
          />
        ) : (
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className={`w-full h-auto object-cover ${className}`}
            sizes={sizes}
            priority={priority}
            quality={quality}
            loading={priority ? 'eager' : loading}
            placeholder={placeholder}
            blurDataURL={blurDataURL}
          />
        )}
      </motion.div>
    </div>
  )
}
