'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useRef } from 'react'

const originalGalleryItems = [
  {
    id: 1,
    src: '/placeholders/rejuvenate-mockup.jpg',
    alt: 'Rejuvenate - Mental health platform',
  },
  {
    id: 2,
    src: '/placeholders/job-portal-mockup.jpg',
    alt: 'Job Portal - Modern job search platform',
  },
  {
    id: 3,
    src: '/placeholders/desserts-mockup.jpg',
    alt: 'Desserts - E-commerce for artisanal desserts',
  },
]

// Create infinite loop by duplicating items multiple times
const galleryItems = [
  ...originalGalleryItems.map((item) => ({ ...item, id: `${item.id}-1` })),
  ...originalGalleryItems.map((item) => ({ ...item, id: `${item.id}-2` })),
  ...originalGalleryItems.map((item) => ({ ...item, id: `${item.id}-3` })),
  ...originalGalleryItems.map((item) => ({ ...item, id: `${item.id}-4` })),
]

export default function Gallery() {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    let scrollAmount = 0
    let animationId: number

    // Calculate the width of one set of original items (3 items)
    const itemWidth = 600 + 32 // 600px width + 32px gap (gap-8)
    const originalSetWidth = itemWidth * originalGalleryItems.length

    const animate = () => {
      scrollAmount += 0.5
      scrollContainer.scrollLeft = scrollAmount
      
      // Reset to create seamless loop when we've scrolled past one complete set
      if (scrollAmount >= originalSetWidth) {
        scrollAmount = 0
      }
      
      animationId = requestAnimationFrame(animate)
    }

    // Start animation immediately
    console.log('Starting infinite auto-scroll animation')
    animationId = requestAnimationFrame(animate)

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [])

  return (
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

      {/* Horizontal Auto-Scrolling Gallery - Full Width */}
      <div className="overflow-hidden w-full horizontal-gallery">
        <div 
          ref={scrollRef}
          className="flex gap-4 sm:gap-6 md:gap-8 pb-4 hide-scrollbar overflow-x-auto px-4 sm:px-6 lg:px-16"
          style={{ scrollBehavior: 'auto' }}
        >
            {galleryItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex-shrink-0 w-[280px] sm:w-[350px] md:w-[450px] lg:w-[550px] xl:w-[600px] h-[350px] sm:h-[450px] md:h-[600px] lg:h-[700px] xl:h-[750px] group cursor-pointer"
              >
                <div className="relative w-full h-full overflow-hidden rounded-lg">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 600px, 600px"
                    quality={90}
                    onError={(e) => {
                      console.error('Image failed to load:', item.src)
                      // Fallback to a working image
                      e.currentTarget.src = '/placeholders/rejuvenate-mockup.jpg'
                    }}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                </div>
              </motion.div>
            ))}
        </div>
      </div>
    </section>
  )
}
