'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Project } from '@/types/project'
import { getFeaturedProjects } from '@/lib/projects'
import ParallaxImage from './ParallaxImage'

export default function FeaturedWork() {
  const [projects, setProjects] = useState<Project[]>([])
  const [activeProject, setActiveProject] = useState<Project | null>(null)

  useEffect(() => {
    const loadProjects = () => {
      try {
        const featuredProjects = getFeaturedProjects()
        setProjects(featuredProjects)
        if (featuredProjects.length > 0) {
          setActiveProject(featuredProjects[0])
        }
      } catch (error) {
        console.error('Error loading featured projects:', error)
      }
    }

    loadProjects()
  }, [])

  // Don't render if no projects
  if (projects.length === 0) {
    return null
  }

  return (
    <section 
      id="projects" 
      className="section-spaced"
      aria-labelledby="projects-heading"
    >
      <div className="container-wide">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="h2 mb-6"
          data-text-hover
        >
          Featured Work
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

      {/* Project List and Card Display - Full Width */}
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">
          {/* Left Side - Project List */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                onMouseEnter={() => setActiveProject(project)}
                data-project-hover
                className="w-full"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link
                  href={`/projects/${project.id}`}
                  className={`block w-full text-left p-4 rounded-lg transition-all duration-300 relative ${
                    activeProject?.id === project.id 
                      ? 'text-text' 
                      : 'text-text/70 hover:text-text'
                  }`}
                >
                  <h3 className="text-xl font-medium mb-1" data-text-hover>{project.title}</h3>
                  <p className="text-sm text-text-secondary" data-text-hover>{project.description}</p>
                  
                  {/* Active bar like navigation */}
                  <div className={`absolute bottom-0 left-0 w-0 h-[1px] bg-current transition-all duration-300 ${
                    activeProject?.id === project.id ? 'w-full' : ''
                  }`} />
                </Link>
              </motion.div>
            ))}
            
            {/* Explore Work Button */}
            <motion.a
              href="/projects"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: projects.length * 0.1 }}
              data-cursor-hover
              data-cursor-text="Explore"
              className="w-full mt-8 p-4 text-text/70 hover:text-text transition-colors duration-300 text-left flex items-center gap-2 group"
            >
              <span className="text-lg font-medium">Explore Work</span>
              <svg 
                className="w-4 h-4 transition-transform duration-300 rotate-0 group-hover:rotate-45" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </motion.a>
          </motion.div>

          {/* Right Side - Project Card Display */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative h-[600px] lg:h-[700px] overflow-hidden"
          >
            {activeProject ? (
              <motion.div
                key={activeProject.id}
                initial={{ 
                  opacity: 0, 
                  x: 50,
                  rotate: -5
                }}
                animate={{ 
                  opacity: 1, 
                  x: 0,
                  rotate: -5
                }}
                transition={{ 
                  duration: 0.6, 
                  ease: [0.25, 0.1, 0.25, 1]
                }}
                className="relative w-[480px] lg:w-[520px] h-[600px] mx-auto"
              >
                <Link href={`/projects/${activeProject.id}`}>
                  <ParallaxImage
                    src={activeProject.image}
                    alt={`${activeProject.title} project mockup`}
                    fill
                    speed={-0.8}
                    className="object-cover hover:scale-105 transition-transform duration-300"
                    containerClassName="relative w-full h-full"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    quality={90}
                  />
                </Link>
              </motion.div>
            ) : null}
          </motion.div>
        </div>
      </div>
    </section>
  )
}