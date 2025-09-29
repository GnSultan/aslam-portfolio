'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useParams } from 'next/navigation'
import { Project } from '@/types/project'
import { getProject, getProjects } from '@/lib/projects'
import Navigation from '@/components/Navigation'
import ParallaxImage from '@/components/ParallaxImage'
import GlobalFooterReveal from '@/components/GlobalFooterReveal'
import HorizontalScrollCarousel from '@/components/HorizontalScrollCarousel'
import PortfolioLoader from '@/components/ui/PortfolioLoader'
import ProjectNotFound from '@/components/ui/ProjectNotFound'
import ErrorBoundary from '@/components/ui/ErrorBoundary'
import ProjectOverview from '@/components/project/ProjectOverview'
import ProjectFeatures from '@/components/project/ProjectFeatures'
import ProjectMetrics from '@/components/project/ProjectMetrics'
import ProjectApproach from '@/components/project/ProjectApproach'
import ProjectLearnings from '@/components/project/ProjectLearnings'



export default function ProjectPage() {
  const params = useParams()
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [allProjects, setAllProjects] = useState<Project[]>([])

  useEffect(() => {
    const loadData = () => {
      try {
        const projectData = getProject(params.id as string)
        const allProjectsData = getProjects()
        setProject(projectData)
        setAllProjects(allProjectsData)
      } catch (error) {
        console.error('Error loading data:', error)
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      loadData()
    }
  }, [params.id])

  // Filter out empty or invalid image URLs (only if project exists)
  const allImages = project?.images || (project?.image ? [project.image] : [])
  const images = allImages.filter(img => img && typeof img === 'string' && img.trim() !== '')
  const validImages = images.length > 0 ? images : ['/placeholders/rejuvenate-mockup.jpg']
  
  // Reset selectedImage if it's out of bounds
  useEffect(() => {
    if (project && selectedImage >= validImages.length) {
      setSelectedImage(0)
    }
  }, [validImages.length, selectedImage, project])

  if (loading) {
    return (
      <PortfolioLoader
        text="Loading Project"
        subtitle="Preparing an amazing experience"
        fullscreen={true}
      />
    )
  }

  if (!project) {
    return <ProjectNotFound />
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen" id="main-content">

      <Navigation />
      
      {/* Hero Section */}
      <section className="section-spaced pt-32">
        <div className="container-70-30">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="content-70-left"
          >

            {/* Project Header */}
            <div className="mb-16">
              <h1 className="h1 mb-6" data-text-hover>{project.title}</h1>
              
              <p className="text-xl text-text-secondary mb-8 leading-relaxed">
                {project.longDescription || project.description}
              </p>

              {/* Project Tags */}
              <div className="flex items-center gap-4 mb-8">
                <span className="px-3 py-1 border border-text-secondary text-text-secondary text-sm rounded-full capitalize">
                  {project.category}
                </span>
                <span className="px-3 py-1 border border-text-secondary text-text-secondary text-sm rounded-full">
                  {project.year}
                </span>
                {project.featured && (
                  <span className="px-3 py-1 border border-primary text-primary text-sm rounded-full">
                    Featured
                  </span>
                )}
              </div>


              {/* Project Meta */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {project.client && (
                  <div>
                    <span className="text-sm text-text-secondary block mb-1">Client</span>
                    <span className="font-medium">{project.client}</span>
                  </div>
                )}
                
                <div>
                  <span className="text-sm text-text-secondary block mb-1">Role</span>
                  <span className="font-medium">{project.role}</span>
                </div>

                {project.duration && (
                  <div>
                    <span className="text-sm text-text-secondary block mb-1">Duration</span>
                    <span className="font-medium">{project.duration}</span>
                  </div>
                )}
              </div>
            </div>

          </motion.div>
        </div>
      </section>

      {/* Main Project Image with shared layoutId target */}
      <section className="section">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative w-full aspect-[2/1] rounded-lg overflow-hidden parallax-container"
          >
            <ParallaxImage
              src={validImages[selectedImage]}
              alt={`${project.title} - Main showcase`}
              fill
              speed={-1.2}
              className="object-cover"
              containerClassName="w-full h-full"
              sizes="100vw"
              priority
            />
          </motion.div>
        </div>
      </section>

      {/* Website Embed Section */}
      {project.websiteEmbed && (
        <section className="section-spaced">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="h2 mb-8 text-center link-hover" data-text-hover>Live Preview</h2>
              
              <div className="relative w-full h-[60vh] lg:h-[80vh] rounded-lg overflow-hidden border border-secondary">
                <iframe
                  src={project.websiteEmbed}
                  className="w-full h-full"
                  title={`${project.title} - Live Preview`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* Project Links Below Embed */}
              <div className="flex flex-wrap gap-4 mt-8 justify-center">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-text text-background rounded-lg hover:bg-text/90 transition-colors"
                  >
                    View Live Site
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 border border-text text-text rounded-lg hover:bg-text hover:text-background transition-colors"
                  >
                    View Code
                  </a>
                )}
                {project.behanceUrl && (
                  <a
                    href={project.behanceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 border border-text text-text rounded-lg hover:bg-text hover:text-background transition-colors"
                  >
                    View on Behance
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Image Gallery */}
      {validImages.length > 1 && (
        <section className="section-spaced">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="h2 mb-12 text-center link-hover" data-text-hover>Project Gallery</h2>
              
              <div className="masonry">
                {validImages.map((image, index) => {
                  // Smart layout based on total image count
                  const getSmartLayout = (index: number, totalImages: number) => {
                    if (totalImages === 3) {
                      // 3 images: full-width at top, two equal square cards below
                      if (index === 0) return 'full-width'
                      return 'square' // Both remaining cards are square
                    }
                    
                    if (totalImages === 6) {
                      // 6 images: two equal cards, full-width, single equal, two split-height
                      if (index === 0 || index === 1) return 'square' // First two equal
                      if (index === 2) return 'full-width' // Third is full-width
                      if (index === 3) return 'square' // Fourth is single equal
                      return 'half-height' // Last two are half-height
                    }
                    
                    // Default pattern for other counts
                    const patterns = ['square', 'square', 'full-width', 'square', 'half-height', 'half-height']
                    return patterns[index % patterns.length]
                  }
                  
                  const itemSize = getSmartLayout(index, validImages.length)
                  
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className={`masonry-item ${itemSize} relative group cursor-pointer parallax-container`}
                      onClick={() => setSelectedImage(index)}
                    >
                      <ParallaxImage
                        src={image}
                        alt={`${project.title} - Gallery ${index + 1}`}
                        fill
                        speed={-0.8}
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        containerClassName="relative w-full h-full"
                        sizes="(max-width: 640px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Modern Tech Stack */}
      <section className="section-spaced bg-secondary/30">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Section header */}
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="w-12 h-px bg-primary" />
                <h2 className="h3 text-primary">Tech Stack</h2>
                <div className="w-12 h-px bg-primary" />
              </div>
            </div>

            {/* Interactive tech grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {project.technologies.map((tech, index) => (
                <motion.div
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  whileHover={{
                    scale: 1.05,
                    rotate: [0, -1, 1, 0],
                    transition: { duration: 0.3 }
                  }}
                  className="group"
                >
                  <div className="relative p-4 bg-background rounded-lg border border-secondary/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 text-center">
                    {/* Tech name */}
                    <span className="text-sm font-medium text-text group-hover:text-primary transition-colors duration-300">
                      {tech}
                    </span>

                    {/* Hover glow effect */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className="absolute inset-0 bg-primary/5 rounded-lg -z-10"
                    />

                    {/* Animated border */}
                    <motion.div
                      initial={{ pathLength: 0 }}
                      whileHover={{ pathLength: 1 }}
                      transition={{ duration: 0.6 }}
                      className="absolute inset-0"
                    >
                      <svg className="absolute inset-0 w-full h-full">
                        <rect
                          x="1"
                          y="1"
                          width="calc(100% - 2px)"
                          height="calc(100% - 2px)"
                          rx="8"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1"
                          className="text-primary/50"
                          pathLength="1"
                        />
                      </svg>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Tech stack footer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-12 text-center"
            >
              <p className="text-text-secondary text-sm">
                Hover over each technology to explore the stack
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Modern Content Sections */}

      {/* Project Overview */}
      {project.overview && (
        <ProjectOverview overview={project.overview} />
      )}

      {/* Key Features */}
      {project.keyFeatures && project.keyFeatures.length > 0 && (
        <ProjectFeatures features={project.keyFeatures} />
      )}

      {/* Impact & Metrics */}
      {project.impact && (project.impact.metrics || project.impact.achievements) && (
        <ProjectMetrics
          metrics={project.impact.metrics || []}
          achievements={project.impact.achievements}
        />
      )}

      {/* Approach & Strategy */}
      {project.approach && (
        <ProjectApproach
          methodology={project.approach.methodology}
          keyDecisions={project.approach.keyDecisions}
        />
      )}

      {/* Key Learnings */}
      {project.learnings && project.learnings.length > 0 && (
        <ProjectLearnings learnings={project.learnings} />
      )}

      {/* Legacy Case Study (fallback) */}
      {!project.overview && !project.keyFeatures && !project.impact && !project.approach && !project.learnings && project.caseStudy && (
        <section className="section-spaced">
          <div className="container-30-70">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="content-70"
            >
              <div className="space-y-16">
                {project.caseStudy.challenge && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                  >
                    <h3 className="h3 mb-6" data-text-hover>The Challenge</h3>
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
                      className="w-full h-px bg-text mb-6 origin-left"
                    />
                    <p className="text-lg text-text-secondary leading-relaxed">
                      {project.caseStudy.challenge}
                    </p>
                  </motion.div>
                )}

                {project.caseStudy.solution && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <h3 className="h3 mb-6" data-text-hover>The Solution</h3>
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
                      className="w-full h-px bg-text mb-6 origin-left"
                    />
                    <p className="text-lg text-text-secondary leading-relaxed">
                      {project.caseStudy.solution}
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* See More Projects Preview */}
      <section className="section-spaced bg-secondary/30">
        {/* Full Width Scrolling Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 overflow-hidden w-full"
        >
          <div className="relative w-full">
            {/* Scrolling text container */}
            <div className="flex animate-scroll-right-to-left w-full">
              {/* First set of words */}
              <div className="flex items-center gap-12 whitespace-nowrap">
                <span className="text-8xl md:text-9xl lg:text-[12rem] font-bold text-text/10 flex items-center gap-6">
                  <span className="text-primary/20">*</span>
                  SEE
                </span>
                <span className="text-8xl md:text-9xl lg:text-[12rem] font-bold text-text/10 flex items-center gap-6">
                  <span className="text-primary/20">*</span>
                  MORE
                </span>
                <span className="text-8xl md:text-9xl lg:text-[12rem] font-bold text-text/10 flex items-center gap-6">
                  <span className="text-primary/20">*</span>
                  SEE
                </span>
                <span className="text-8xl md:text-9xl lg:text-[12rem] font-bold text-text/10 flex items-center gap-6">
                  <span className="text-primary/20">*</span>
                  MORE
                </span>
              </div>
              
              {/* Duplicate set for seamless loop */}
              <div className="flex items-center gap-12 whitespace-nowrap ml-24">
                <span className="text-8xl md:text-9xl lg:text-[12rem] font-bold text-text/10 flex items-center gap-6">
                  <span className="text-primary/20">*</span>
                  SEE
                </span>
                <span className="text-8xl md:text-9xl lg:text-[12rem] font-bold text-text/10 flex items-center gap-6">
                  <span className="text-primary/20">*</span>
                  MORE
                </span>
                <span className="text-8xl md:text-9xl lg:text-[12rem] font-bold text-text/10 flex items-center gap-6">
                  <span className="text-primary/20">*</span>
                  SEE
                </span>
                <span className="text-8xl md:text-9xl lg:text-[12rem] font-bold text-text/10 flex items-center gap-6">
                  <span className="text-primary/20">*</span>
                  MORE
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        <HorizontalScrollCarousel projects={allProjects} currentProjectId={project.id} />
      </section>

      {/* Footer Reveal Effect for project pages */}
      <GlobalFooterReveal>
        <section className="section-spaced">
          <div className="container-wide text-center">
            <h2 className="h2 mb-6">Let’s build something great</h2>
            <p className="text-xl text-text-secondary leading-relaxed max-w-2xl mx-auto mb-8">
              Have a project like this in mind? I’d love to hear about it.
            </p>
            <a 
              href="mailto:hello@aslam.com" 
              className="inline-block px-8 py-4 bg-text text-background rounded-lg hover:bg-text/90 transition-colors"
            >
              Get in Touch
            </a>
          </div>
        </section>
      </GlobalFooterReveal>
      </div>
    </ErrorBoundary>
  )
}
