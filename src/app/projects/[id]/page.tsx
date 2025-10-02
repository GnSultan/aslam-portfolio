'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useParams } from 'next/navigation'
import { Project } from '@/types/project'
import { getProject, getProjects } from '@/lib/projects'
import Navigation from '@/components/Navigation'
import ParallaxImage from '@/components/ParallaxImage'
import Footer from '@/components/Footer'
import FooterReveal from '@/components/FooterReveal'
import HorizontalScrollCarousel from '@/components/HorizontalScrollCarousel'
import PortfolioLoader from '@/components/ui/PortfolioLoader'
import ProjectNotFound from '@/components/ui/ProjectNotFound'
import ErrorBoundary from '@/components/ui/ErrorBoundary'
import ProjectChallenge from '@/components/project/ProjectChallenge'
import ProjectApproachBullets from '@/components/project/ProjectApproachBullets'
import ProjectValueDelivered from '@/components/project/ProjectValueDelivered'
import ProjectTestimonial from '@/components/project/ProjectTestimonial'
import ProjectRelevance from '@/components/project/ProjectRelevance'

export default function ProjectPage() {
  const params = useParams()
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [allProjects, setAllProjects] = useState<Project[]>([])

  useEffect(() => {
    const loadData = async () => {
      try {
        const projectData = await getProject(params.id as string)
        const allProjectsData = await getProjects()
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

  // Filter out empty or invalid image URLs
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

        {/* 1. PROJECT SNAPSHOT - Hero Section */}
        <section className="section-spaced pt-32">
          <div className="container-70-30">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="content-70-left"
            >
              {/* Title */}
              <h1 className="h1 mb-6" data-text-hover>{project.title}</h1>

              {/* Short description */}
              <p className="p-large mb-12">
                {project.description}
              </p>

              {/* Project Meta - Clean snapshot */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                {project.client && (
                  <div>
                    <span className="p-small text-text-secondary block mb-1">Client</span>
                    <span className="p font-semibold text-text">{project.client}</span>
                  </div>
                )}

                <div>
                  <span className="p-small text-text-secondary block mb-1">Type</span>
                  <span className="p font-semibold text-text capitalize">{project.category}</span>
                </div>

                <div>
                  <span className="p-small text-text-secondary block mb-1">Timeline</span>
                  <span className="p font-semibold text-text">{project.year}</span>
                </div>

                {project.duration && (
                  <div>
                    <span className="p-small text-text-secondary block mb-1">Duration</span>
                    <span className="p font-semibold text-text">{project.duration}</span>
                  </div>
                )}
              </div>

              {/* Project Links */}
              {(project.liveUrl || project.githubUrl || project.behanceUrl) && (
                <div className="flex flex-wrap gap-4">
                  {project.liveUrl && (
                    <motion.a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-3 bg-text text-background rounded-lg hover:bg-text/90 transition-colors"
                    >
                      View Live Site
                    </motion.a>
                  )}
                  {project.githubUrl && (
                    <motion.a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-3 border border-text text-text rounded-lg hover:bg-text hover:text-background transition-colors"
                    >
                      View Code
                    </motion.a>
                  )}
                  {project.behanceUrl && (
                    <motion.a
                      href={project.behanceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-3 border border-text text-text rounded-lg hover:bg-text hover:text-background transition-colors"
                    >
                      View on Behance
                    </motion.a>
                  )}
                </div>
              )}
            </motion.div>
          </div>
        </section>

        {/* Hero Image */}
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

        {/* 2. THE CHALLENGE - One simple sentence */}
        {project.challenge && (
          <ProjectChallenge challenge={project.challenge} />
        )}

        {/* 3. APPROACH - 2-3 key moves */}
        {project.approachBullets && project.approachBullets.length > 0 && (
          <ProjectApproachBullets bullets={project.approachBullets} />
        )}

        {/* 4. THE SOLUTION - Visual Showcase (Masonry Gallery) */}
        {validImages.length > 1 && (
          <section className="section-spaced">
            <div className="container-wide">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="mb-16">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-px bg-text" />
                    <h2 className="h3 text-text">Visual Showcase</h2>
                  </div>
                </div>

                <div className="masonry">
                  {validImages.map((image, index) => {
                    // Repeating pattern: square, square, full-width (- -, ---, - -, ---, ...)
                    const getSmartLayout = (index: number) => {
                      const patterns = ['square', 'square', 'full-width']
                      return patterns[index % patterns.length]
                    }

                    const itemSize = getSmartLayout(index)

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

        {/* Website Embed Section */}
        {project.websiteEmbed && (
          <section className="section-spaced bg-secondary/10">
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
              </motion.div>
            </div>
          </section>
        )}

        {/* Tech Stack */}
        {project.technologies && project.technologies.length > 0 && (
          <section className="section-spaced">
            <div className="container-30-70">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="content-70"
              >
                <div className="flex items-center gap-4 mb-12">
                  <div className="w-12 h-px bg-text" />
                  <h2 className="h3 text-text">Tech Stack</h2>
                </div>

                <div className="flex flex-wrap gap-3">
                  {project.technologies.map((tech, index) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                      className="px-4 py-2 border border-secondary text-text p-small rounded-full"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>
        )}

        {/* 5. VALUE DELIVERED - Outcomes not deliverables */}
        {project.valueDelivered && project.valueDelivered.length > 0 && (
          <ProjectValueDelivered values={project.valueDelivered} />
        )}

        {/* 6. CLIENT PERSPECTIVE - Testimonial */}
        {project.testimonial && (
          <ProjectTestimonial testimonial={project.testimonial} />
        )}

        {/* 7. RELEVANCE - Personal connection */}
        {project.relevanceNote && (
          <ProjectRelevance note={project.relevanceNote} />
        )}

        <FooterReveal footer={<Footer />}>
          <section className="section-spaced bg-secondary/30">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-16 overflow-hidden w-full"
            >
              <div className="relative w-full">
                <div className="flex animate-scroll-right-to-left w-full">
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
        </FooterReveal>

        {/* Footer */}
      </div>
    </ErrorBoundary>
  )
}