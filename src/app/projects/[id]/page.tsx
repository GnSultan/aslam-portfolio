'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Project } from '@/types/project'
import { getProject, getProjects } from '@/lib/projects'
import Navigation from '@/components/Navigation'
import ParallaxImage from '@/components/ParallaxImage'

export default function ProjectPage() {
  const params = useParams()
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  

  useEffect(() => {
    const loadProject = () => {
      try {
        const projectData = getProject(params.id as string)
        setProject(projectData)
      } catch (error) {
        console.error('Error loading project:', error)
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      loadProject()
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-text/70">Loading project...</div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="h2 mb-4">Project Not Found</h1>
          <p className="text-text-secondary mb-8">The project you're looking for doesn't exist.</p>
          <Link href="/projects" className="link-hover">
            ← Back to Projects
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
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

      {/* Main Project Image */}
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

      {/* Technologies */}
      <section className="section-spaced bg-secondary/30">
        <div className="container-30-70">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="content-70"
          >
            <h3 className="h3 mb-6" data-text-hover>Technologies Used</h3>
            <div className="flex flex-wrap gap-3">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 bg-background border border-secondary text-text-secondary text-sm rounded-lg"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Case Study */}
      {project.caseStudy && (
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

                {project.caseStudy.process && project.caseStudy.process.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    <h3 className="h3 mb-6" data-text-hover>The Process</h3>
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, ease: 'easeOut', delay: 0.5 }}
                      className="w-full h-px bg-text mb-6 origin-left"
                    />
                    <div className="space-y-4">
                      {project.caseStudy.process.map((step, index) => (
                        <div key={index} className="flex items-start gap-4">
                          <div className="flex-shrink-0 w-8 h-8 bg-primary text-background rounded-full flex items-center justify-center text-sm font-medium">
                            {index + 1}
                          </div>
                          <p className="text-lg text-text-secondary leading-relaxed pt-1">
                            {step}
                          </p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {project.caseStudy.results && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <h3 className="h3 mb-6" data-text-hover>Results & Impact</h3>
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, ease: 'easeOut', delay: 0.6 }}
                      className="w-full h-px bg-text mb-6 origin-left"
                    />
                    <p className="text-lg text-text-secondary leading-relaxed">
                      {project.caseStudy.results}
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* More Projects Preview */}
      <section className="section-spaced bg-secondary/30">
        <div className="container-30-70">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="content-70"
          >
            <h2 className="h2 mb-12" data-text-hover>More Projects</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {getProjects()
                .filter(p => p.id !== project.id)
                .slice(0, 4)
                .map((relatedProject, index) => (
                  <motion.div
                    key={relatedProject.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="group"
                  >
                    <Link href={`/projects/${relatedProject.id}`}>
                      <div className="bg-background border border-secondary rounded-lg overflow-hidden hover:border-primary/50 transition-colors">
                        <div className="relative h-48 overflow-hidden">
                          <Image
                            src={relatedProject.image}
                            alt={relatedProject.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                          {relatedProject.featured && (
                            <div className="absolute top-4 right-4 bg-primary text-background px-3 py-1 rounded-full text-xs font-medium">
                              Featured
                            </div>
                          )}
                        </div>
                        <div className="p-6">
                          <div className="flex items-center gap-3 mb-3">
                            <span className="px-3 py-1 bg-secondary text-text-secondary text-xs rounded-full capitalize">
                              {relatedProject.category}
                            </span>
                            <span className="text-text-secondary text-xs">
                              {relatedProject.year}
                            </span>
                          </div>
                          <h3 className="text-lg font-medium mb-3 group-hover:text-primary transition-colors" data-text-hover>
                            {relatedProject.title}
                          </h3>
                          <p className="text-text-secondary text-sm line-clamp-3 leading-relaxed">
                            {relatedProject.description}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
            </div>
            
            <div className="text-center mt-12">
              <Link 
                href="/projects" 
                className="px-8 py-4 bg-text text-background rounded-lg hover:bg-text/90 transition-colors inline-block"
              >
                View All Projects
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
