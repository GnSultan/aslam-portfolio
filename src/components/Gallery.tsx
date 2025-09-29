'use client'

import { motion, AnimatePresence, useMotionValue, PanInfo } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useRef, useState, useCallback } from 'react'
import { getProjects } from '@/lib/projects'
import { useCursorStore } from '@/hooks/useCursorStore'

interface GalleryImage {
  id: string
  src: string
  alt: string
  projectTitle: string
}

export default function Gallery() {
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([])
  const [fullscreenImage, setFullscreenImage] = useState<GalleryImage | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStartTime, setDragStartTime] = useState(0)
  const [dragDistance, setDragDistance] = useState(0)
  const { setIsHovering, setCursorText, setCursorVariant } = useCursorStore()

  // Direct motion value - no spring layers
  const x = useMotionValue(0)
  const animationRef = useRef<number | undefined>(undefined)



  // Load dynamic images from projects
  useEffect(() => {
    const projects = getProjects()
    const images: GalleryImage[] = []

    projects.forEach(project => {
      // Use main image
      images.push({
        id: `${project.id}-main`,
        src: project.image,
        alt: project.title,
        projectTitle: project.title
      })

      // Add gallery images if they exist
      if (project.images && project.images.length > 0) {
        project.images.forEach((img, index) => {
          if (img !== project.image) { // Avoid duplicates
            images.push({
              id: `${project.id}-gallery-${index}`,
              src: img,
              alt: `${project.title} - Gallery Image ${index + 1}`,
              projectTitle: project.title
            })
          }
        })
      }
    })

    // Create massive array for truly infinite scroll
    const duplicatedImages = [
      ...images.map(img => ({ ...img, id: `${img.id}-set1` })),
      ...images.map(img => ({ ...img, id: `${img.id}-set2` })),
      ...images.map(img => ({ ...img, id: `${img.id}-set3` })),
      ...images.map(img => ({ ...img, id: `${img.id}-set4` })),
      ...images.map(img => ({ ...img, id: `${img.id}-set5` })),
      ...images.map(img => ({ ...img, id: `${img.id}-set6` })),
      ...images.map(img => ({ ...img, id: `${img.id}-set7` })),
      ...images.map(img => ({ ...img, id: `${img.id}-set8` })),
      ...images.map(img => ({ ...img, id: `${img.id}-set9` })),
      ...images.map(img => ({ ...img, id: `${img.id}-set10` })),
    ]

    setGalleryImages(duplicatedImages)
  }, [])

  // Truly infinite auto-scroll - never resets position
  useEffect(() => {
    if (galleryImages.length === 0) return

    const animate = () => {
      // Only auto-scroll when not dragging
      if (!isDragging) {
        const currentX = x.get()
        const newX = currentX - 1.2 // Consistent speed
        x.set(newX) // Never reset, just keep going infinitely
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

  // Simple drag handlers - let Framer Motion handle physics
  const handleDragStart = useCallback(() => {
    setIsDragging(true)
    setDragStartTime(Date.now())
    setDragDistance(0)
  }, [])

  const handleDrag = useCallback((_event: any, info: PanInfo) => {
    setDragDistance(prev => prev + Math.abs(info.delta.x))
  }, [])

  const handleDragEnd = useCallback(() => {
    setIsDragging(false)
    // Let Framer Motion handle all momentum naturally - no position manipulation
  }, [])

  // Handle image click for fullscreen
  const handleImageClick = useCallback((image: GalleryImage, index: number) => {
    const dragThreshold = 5
    if (dragDistance < dragThreshold) {
      setFullscreenImage(image)
      setCurrentIndex(index)
    }
  }, [dragDistance])

  // Cursor interactions
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

  // Fullscreen navigation
  const navigateFullscreen = useCallback((direction: 'prev' | 'next') => {
    if (!fullscreenImage) return

    const newIndex = direction === 'next'
      ? (currentIndex + 1) % galleryImages.length
      : (currentIndex - 1 + galleryImages.length) % galleryImages.length

    setCurrentIndex(newIndex)
    setFullscreenImage(galleryImages[newIndex])
  }, [fullscreenImage, currentIndex, galleryImages])

  // Keyboard navigation for fullscreen
  useEffect(() => {
    if (!fullscreenImage) return

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
          navigateFullscreen('prev')
          break
        case 'ArrowRight':
          navigateFullscreen('next')
          break
        case 'Escape':
          setFullscreenImage(null)
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [fullscreenImage, navigateFullscreen])

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
            style={{
              x,
              cursor: isDragging ? 'grabbing' : 'grab',
              willChange: 'transform'
            }}
            drag="x"
            dragConstraints={false}
            dragElastic={0.1}
            dragMomentum={true}
            dragTransition={{
              power: 0.25,
              timeConstant: 250,
              bounceStiffness: 300,
              bounceDamping: 30
            }}
            onDragStart={handleDragStart}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
          >
            {galleryImages.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{
                  opacity: 1,
                  scale: isDragging ? 0.95 : 1.0
                }}
                transition={{
                  opacity: { duration: 0.6, delay: (index % 8) * 0.05 },
                  scale: {
                    type: 'spring',
                    damping: 30,
                    stiffness: 400,
                    mass: 0.8
                  }
                }}
                className="flex-shrink-0 w-[280px] sm:w-[350px] md:w-[450px] lg:w-[550px] xl:w-[600px] h-[350px] sm:h-[450px] md:h-[600px] lg:h-[700px] xl:h-[750px] group cursor-pointer"
                onClick={() => handleImageClick(image, index)}
                whileHover={{
                  scale: isDragging ? 0.95 : 1.02,
                  transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
                }}
              >
                <div className="relative w-full h-full overflow-hidden rounded-lg">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 600px, 600px"
                    quality={90}
                    priority={index < 4}
                    onError={(e) => {
                      console.error('Image failed to load:', image.src)
                      e.currentTarget.src = '/placeholders/rejuvenate-mockup.jpg'
                    }}
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

                  {/* Project info overlay */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="bg-black/80 backdrop-blur-md rounded-xl p-4 border border-white/10"
                    >
                      <p className="text-white text-sm font-semibold truncate">
                        {image.projectTitle}
                      </p>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Fullscreen Image Viewer */}
      <AnimatePresence>
        {fullscreenImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
            onClick={() => setFullscreenImage(null)}
          >
            {/* Navigation Arrows */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                navigateFullscreen('prev')
              }}
              className="absolute left-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
              data-cursor-text="Previous"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation()
                navigateFullscreen('next')
              }}
              className="absolute right-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
              data-cursor-text="Next"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Close Button */}
            <button
              onClick={() => setFullscreenImage(null)}
              className="absolute top-8 right-8 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
              data-cursor-text="Close"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Image */}
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-[90vw] max-h-[90vh] aspect-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={fullscreenImage.src}
                alt={fullscreenImage.alt}
                width={1200}
                height={800}
                className="object-contain max-w-full max-h-full"
                quality={95}
                priority
              />

              {/* Image Info */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <h3 className="text-white text-xl font-semibold mb-2">
                  {fullscreenImage.projectTitle}
                </h3>
                <p className="text-white/80 text-sm">
                  {fullscreenImage.alt}
                </p>
              </div>
            </motion.div>

            {/* Keyboard shortcuts hint */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 text-sm text-center">
              <p>Use ← → arrow keys to navigate • Press ESC to close</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
