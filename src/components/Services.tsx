'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const services = [
  {
    icon: '/icons/brand-strategy.svg',
    title: 'Brand Strategy & Identity',
    description: 'Defining purpose, vision, and crafting cohesive visual systems that connect.',
  },
  {
    icon: '/icons/product-design.svg',
    title: 'Product Design',
    description: 'Designing intuitive and engaging digital experiences for web and applications.',
  },
  {
    icon: '/icons/web-development.svg',
    title: 'Web & Product Development',
    description: 'Building custom websites and scalable web applications from front-end to back-end.',
  },
  {
    icon: '/icons/digital-experiences.svg',
    title: 'Digital Experiences',
    description: 'Creating polished, modern, and user-friendly web solutions that reflect your brand.',
  },
]

export default function Services() {
  return (
    <section id="services" className="section-spaced bg-secondary/10">
      <div className="container-wide">
        {/* Heading and Line */}
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="h2 mb-6"
        >
          Services
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
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-16 lg:gap-20">
            {/* 30% - Description */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-3"
            >
            <p className="p content-text">
              I provide <span className="text-emphasis">comprehensive design services</span> that combine creativity with strategic thinking to deliver exceptional results for your projects.
            </p>
          </motion.div>

          {/* 70% - Services Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-7"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="text-left">
                    <div className="w-16 h-16 relative mb-6 flex items-center justify-center">
                      <Image
                        src={service.icon}
                        alt={`${service.title} icon`}
                        width={32}
                        height={32}
                        className="text-text-secondary/40 group-hover:text-text-secondary transition-colors duration-300"
                        loading="lazy"
                      />
                    </div>
                    <h3 className="text-xl font-medium text-text mb-4">{service.title}</h3>
                    <p className="p">{service.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}