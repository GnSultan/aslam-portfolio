'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState, useEffect, useRef, useCallback } from 'react'
import { Project } from '@/types/project'
import { getFeaturedProjects } from '@/lib/projects'
import ParallaxImage from './ParallaxImage'

export default function FeaturedWork() {
  const [projects, setProjects] = useState<Project[]>([])
  const [activeProject, setActiveProject] = useState<Project | null>(null)
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null)
  const currentHoveredProject = useRef<Project | null>(null)
  const mousePositionRef = useRef({ x: 0, y: 0, lastMoveTime: 0 })
  const mouseMoveCountRef = useRef(0)
  const lastActiveProjectRef = useRef<Project | null>(null)

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setIsLoading(true)
        const featuredProjects = await getFeaturedProjects()
        setProjects(featuredProjects)
        if (featuredProjects.length > 0) {
          setActiveProject(featuredProjects[0])
          lastActiveProjectRef.current = featuredProjects[0]
          // Reset hover states when projects load
          setHoveredProject(null)
          currentHoveredProject.current = null
        }
      } catch (error) {
        console.error('Error loading featured projects:', error)
        // Set empty state on error
        setProjects([])
        setActiveProject(null)
        setHoveredProject(null)
        lastActiveProjectRef.current = null
      } finally {
        setIsLoading(false)
      }
    }

    loadProjects()
  }, [])

  // Simplified mouse movement tracking
  const handleMouseMove = useCallback((event: React.MouseEvent) => {
    const now = Date.now()
    const currentPos = { x: event.clientX, y: event.clientY }
    const lastPos = mousePositionRef.current

    // Calculate movement distance
    const distance = Math.sqrt(
      Math.pow(currentPos.x - lastPos.x, 2) + Math.pow(currentPos.y - lastPos.y, 2)
    )

    // Update position tracking
    mousePositionRef.current = { ...currentPos, lastMoveTime: now }

    // Only reset timer if there's significant movement (more than 10px)
    if (distance > 10) {
      mouseMoveCountRef.current++
      
      // Only reset timer if there's excessive movement
      if (mouseMoveCountRef.current > 5) {
        if (hoverTimerRef.current) {
          clearTimeout(hoverTimerRef.current)
          hoverTimerRef.current = null
        }
        mouseMoveCountRef.current = 0
      }
    }
  }, [])

  // Simplified hover handler for better reliability
  const handleProjectHover = useCallback((project: Project, event: React.MouseEvent) => {
    // Don't process hover if already active or if it's the same project
    if (activeProject?.id === project.id || lastActiveProjectRef.current?.id === project.id) {
      return
    }

    // Set immediate hover state for visual feedback
    setHoveredProject(project)

    // Initialize mouse tracking
    mousePositionRef.current = {
      x: event.clientX,
      y: event.clientY,
      lastMoveTime: Date.now()
    }
    mouseMoveCountRef.current = 0

    // Clear any existing timer
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current)
    }

    currentHoveredProject.current = project

    // Shorter delay for better responsiveness
    hoverTimerRef.current = setTimeout(() => {
      // Only update if user is still hovering the same project and it's different from current
      if (currentHoveredProject.current === project && activeProject?.id !== project.id) {
        setActiveProject(project)
        lastActiveProjectRef.current = project
      }
    }, 300) // Reduced from 500ms to 300ms for better responsiveness
  }, [activeProject])

  const handleProjectLeave = useCallback(() => {
    // Clear immediate hover state
    setHoveredProject(null)

    // Clear the timer when leaving
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current)
      hoverTimerRef.current = null
    }
    currentHoveredProject.current = null
    mouseMoveCountRef.current = 0
  }, [])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (hoverTimerRef.current) {
        clearTimeout(hoverTimerRef.current)
      }
    }
  }, [])

  // Show loading state while projects are loading
  if (isLoading) {
    return (
      <section 
        id="projects" 
        className="section-spaced"
        aria-labelledby="projects-heading"
      >
        <div className="container-wide">
          <div className="flex items-center justify-center h-[600px]">
            <div className="text-center">
              <div className="animate-spin w-12 h-12 border-4 border-text/20 border-t-text/50 rounded-full mx-auto mb-4"></div>
              <p className="text-text/50">Loading featured work...</p>
            </div>
          </div>
        </div>
      </section>
    )
  }

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
                data-project-hover
                className="w-full"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link
                  href={`/projects/${project.id}`}
                  onMouseEnter={(e) => handleProjectHover(project, e)}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleProjectLeave}
                  className={`block w-full text-left p-4 rounded-lg transition-all duration-300 relative group ${
                    activeProject?.id === project.id
                      ? 'text-text bg-secondary/10'
                      : hoveredProject?.id === project.id
                        ? 'text-text bg-secondary/5'
                        : 'text-text/70 hover:text-text'
                  }`}
                  data-cursor-text="View"
                  data-magnetic
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-2xl font-semibold mb-2" data-text-hover>{project.title}</h3>
                      <p className="text-body text-text-secondary" data-text-hover>{project.description}</p>
                    </div>
                    {project.liveUrl && (
                      <motion.div
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        initial={{ scale: 0.8 }}
                        whileHover={{ scale: 1 }}
                      >
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* Active bar like navigation */}
                  <div className={`absolute bottom-0 left-0 h-[1px] bg-current transition-all duration-300 ${
                    activeProject?.id === project.id
                      ? 'w-full'
                      : hoveredProject?.id === project.id
                        ? 'w-1/3 opacity-50'
                        : 'w-0'
                  }`} />

                  {/* Hover intent indicator - shows "charging" */}
                  {hoveredProject?.id === project.id && activeProject?.id !== project.id && (
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="absolute bottom-0 left-0 w-full h-[1px] bg-primary/50 origin-left"
                    />
                  )}

                  {/* Hover progress indicator */}
                  {hoveredProject?.id === project.id && activeProject?.id !== project.id && (
                    <motion.div
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 0.5, ease: "linear" }}
                      className="absolute bottom-0 left-0 h-[2px] bg-primary origin-left"
                    />
                  )}
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
              <span className="text-xl font-semibold">Explore Work</span>
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
                <Link
                  href={`/projects/${activeProject.id}`}
                  data-cursor-text="View"
                  className="block w-full h-full rounded-lg overflow-hidden"
                >
                  <ParallaxImage
                    src={activeProject.image}
                    alt={`${activeProject.title} project mockup`}
                    fill
                    speed={-0.8}
                    className="object-cover hover:scale-105 transition-transform duration-500"
                    containerClassName="relative w-full h-full"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    quality={90}
                    priority={activeProject.id === projects[0]?.id}
                  />
                </Link>
              </motion.div>
            ) : (
              <div className="relative w-[480px] lg:w-[520px] h-[600px] mx-auto flex items-center justify-center bg-secondary/10 rounded-lg">
                <div className="text-text/50 text-center">
                  <div className="animate-spin w-8 h-8 border-2 border-text/20 border-t-text/50 rounded-full mx-auto mb-4"></div>
                  <p>Loading project...</p>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
      
    </section>
  )
}