'use client'

import { motion, useMotionValue, PanInfo, useSpring } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useRef, useState, useCallback } from 'react'
import { getProjects } from '@/lib/projects'
import { useCursorStore } from '@/hooks/useCursorStore'

interface GalleryImage {
  id: string
  src: string
  alt: string
  projectTitle: string
  projectId: string
  imageIndex: number
}

export default function Gallery() {
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const { setIsHovering, setCursorText, setCursorVariant } = useCursorStore()

  // Direct motion value - no spring layers
  const x = useMotionValue(0)
  const animationRef = useRef<number | undefined>(undefined)
  const trackRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<HTMLDivElement[]>([])

  // Parallax effect motion values with smooth spring
  const parallaxTarget = useMotionValue(0)
  const parallaxOffset = useSpring(parallaxTarget, {
    damping: 32,
    stiffness: 160,
    mass: 0.9,
    restSpeed: 0.05,
    restDelta: 0.05
  })



  // Load dynamic images from projects (use project.images when available)
  useEffect(() => {
    const loadProjects = async () => {
      const projects = await getProjects()
      const images: GalleryImage[] = []

      projects.forEach(project => {
        const sourceImages = Array.isArray(project.images) && project.images.length > 0
          ? project.images
          : (project.image ? [project.image] : [])

        sourceImages.forEach((img, index) => {
          images.push({
            id: `${project.id}-${index}`,
            projectId: project.id,
            imageIndex: index,
            src: img,
            alt: `${project.title} - ${index === 0 ? 'Cover' : 'Image ' + (index + 1)}`,
            projectTitle: project.title,
          })
        })
      })

      setGalleryImages(images)
    }

    loadProjects()
  }, [])

  // Truly infinite auto-scroll with modulo wrapping
  useEffect(() => {
    if (galleryImages.length === 0) return

    const animate = () => {
      // Only auto-scroll when not dragging
      if (!isDragging) {
        const currentX = x.get()
        const newX = currentX - 0.8 // slightly slower for smoother feel
        x.set(newX)
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [galleryImages, isDragging, x])

  // Measure total track width for precise wrapping
  const totalWidthRef = useRef(0)
  useEffect(() => {
    if (!trackRef.current) return
    const children = itemRefs.current
    const total = children.reduce((sum, el) => sum + (el?.offsetWidth || 0), 0)
    totalWidthRef.current = total
  }, [galleryImages])

  // Wrap x value precisely on change
  useEffect(() => {
    const unsub = x.on("change", (val) => {
      const total = totalWidthRef.current
      if (total <= 0) return
      if (val <= -total) x.set(val + total)
      else if (val >= 0) x.set(val - total)
    })
    return () => unsub()
  }, [x])

  // Simple drag handlers - let Framer Motion handle physics
  const handleDragStart = useCallback(() => {
    setIsDragging(true)
  }, [])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDrag = useCallback((_event: any, info: PanInfo) => {
    // Apply subtle parallax offset (opposite direction, minimal for natural depth effect)
    const maxParallaxOffset = 6
    const parallaxMultiplier = 0.12
    const newParallaxOffset = Math.max(-maxParallaxOffset, Math.min(maxParallaxOffset, -info.delta.x * parallaxMultiplier))
    parallaxTarget.set(parallaxTarget.get() + newParallaxOffset)
  }, [parallaxTarget])

  const handleDragEnd = useCallback(() => {
    setIsDragging(false)
    // Smoothly return parallax offset to center using Framer Motion's spring
    parallaxTarget.set(0)
  }, [parallaxTarget])

  // Cursor interactions - just show drag text
  const handleMouseEnter = useCallback(() => {
    setIsHovering(true)
    setCursorText('Drag')
    setCursorVariant('hover')
  }, [setIsHovering, setCursorText, setCursorVariant])

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false)
    setCursorText('')
    setCursorVariant('default')
  }, [setIsHovering, setCursorText, setCursorVariant])


  if (galleryImages.length === 0) {
    return null // Don't render if no images
  }

  return (
    <>
      <section id="gallery" className="section-spaced">
        <div className="container-wide">
          {/* Heading and Line */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="h2 mb-6"
          >
            Gallery
          </motion.h2>

          {/* Full-width line separator */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            className="w-full h-px bg-text mb-16 origin-left"
          />
        </div>

        {/* Drag-Enabled Gallery - Smooth Implementation */}
        <div
          className="overflow-hidden w-full relative gallery-container"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          data-cursor-text="Drag"
        >
          <motion.div
            className="flex gap-4 sm:gap-6 md:gap-8 pb-4 px-4 sm:px-6 lg:px-16"
            ref={trackRef}
            style={{
              x,
              cursor: isDragging ? 'grabbing' : 'grab',
              willChange: 'transform',
              transform: 'translate3d(0,0,0)'
            }}
            drag="x"
            dragConstraints={false}
            dragElastic={0.08}
            dragMomentum={true}
            dragTransition={{
              power: 0.2,
              timeConstant: 220,
              bounceStiffness: 280,
              bounceDamping: 28
            }}
            onDragStart={handleDragStart}
            onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          >
            {[...galleryImages, ...galleryImages].map((image, index) => (
              <motion.div
                key={image.id + '-' + index}
                ref={(el) => { if (el) itemRefs.current[index] = el }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{
                  opacity: 1,
                  scale: isDragging ? 0.975 : 1.0
                }}
                transition={{
                  opacity: { duration: 0.5, delay: (index % 8) * 0.03 },
                  scale: {
                    type: 'spring',
                    damping: 26,
                    stiffness: 360,
                    mass: 0.85
                  }
                }}
                className="flex-shrink-0 w-[280px] sm:w-[350px] md:w-[450px] lg:w-[550px] xl:w-[600px] h-[350px] sm:h-[450px] md:h-[600px] lg:h-[700px] xl:h-[750px] group"
                data-magnetic
              >
                <div className="relative w-full h-full overflow-hidden rounded-lg">
                  <motion.div
                    className="w-full h-full"
                    style={{
                      x: parallaxOffset,
                      scale: 1.04, // smaller to reduce perceived wobble
                    }}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover transition-transform duration-700"
                      sizes="(max-width: 768px) 600px, 600px"
                      quality={90}
                      priority={index < 4}
                      onError={(e) => {
                        console.error('Image failed to load:', image.src)
                        e.currentTarget.src = '/portrait.jpg'
                      }}
                    />
                  </motion.div>

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

                  {/* Project info overlay removed for cleaner presentation */}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  )
}
