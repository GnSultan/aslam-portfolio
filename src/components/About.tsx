'use client'

import { motion } from 'framer-motion'
import ParallaxImage from './ParallaxImage'

export default function About() {
  return (
    <section id="about" className="section-spaced">
      <div className="container-wide">
        {/* Heading and Line */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="h2 mb-6"
          data-text-hover
        >
          About Me
        </motion.h2>
        
        {/* Full-width line separator */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          className="w-full h-px bg-text mb-16 origin-left"
        />

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-16 lg:gap-20 items-start">
            {/* 30% - Content */}
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-2 lg:order-1 lg:col-span-3"
            >
            <div className="space-y-6 content-text">
              <p className="text-body leading-relaxed text-text-secondary" data-text-hover>
              Hi, I&apos;m Aslam—a <span className="text-emphasis">brand strategist, designer, and developer</span>. I build digital products that unite strategy, design, and technology, helping ideas grow into experiences that truly matter.
              </p>
              <p className="text-body leading-relaxed text-text-secondary" data-text-hover>
With a foundation in branding and storytelling, I bring clarity and intention to every project. By combining that with technical expertise, I transform ideas into <span className="text-emphasis">custom websites and full-scale web applications</span> that are not only functional but purposeful.
              </p>
              <p className="text-body leading-relaxed text-text-secondary" data-text-hover>
My approach is simple: <span className="text-emphasis">start with why, design with empathy, and build with precision</span>. Whether it&apos;s shaping a brand identity, crafting a user experience, or developing a product from the ground up, I focus on creating digital solutions that inspire trust, foster connection, and deliver lasting impact.
              </p>
            </div>
          </motion.div>

          {/* 70% - Photo */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2 lg:col-span-7 relative"
          >
            <ParallaxImage
              src="/aslam-portrait.jpg"
              alt="Portrait photo of Aslam, art director and product designer"
              fill
              speed={-0.6}
              className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
              containerClassName="relative aspect-[3/4] rounded-lg overflow-hidden parallax-container"
              sizes="(max-width: 768px) 100vw, 70vw"
              priority
              quality={90}
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
