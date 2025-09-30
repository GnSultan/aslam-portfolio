'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Project } from '@/types/project'
import { getProjects } from '@/lib/projects'
import Navigation from '@/components/Navigation'
import ParallaxImage from '@/components/ParallaxImage'
import GlobalFooterReveal from '@/components/GlobalFooterReveal'

interface ProjectsByYear {
  [year: number]: Project[]
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [projectsByYear, setProjectsByYear] = useState<ProjectsByYear>({})
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const allProjects = await getProjects()
        setProjects(allProjects)

        // Group projects by year
        const grouped = allProjects.reduce((acc: ProjectsByYear, project) => {
          const year = project.year
          if (!acc[year]) {
            acc[year] = []
          }
          acc[year].push(project)
          return acc
        }, {})

        // Sort projects within each year by order/featured status
        Object.keys(grouped).forEach(year => {
          grouped[parseInt(year)].sort((a, b) => {
            if (a.featured && !b.featured) return -1
            if (!a.featured && b.featured) return 1
            return a.order - b.order
          })
        })

        setProjectsByYear(grouped)
      } catch (error) {
        console.error('Error loading projects:', error)
      } finally {
        setLoading(false)
      }
    }

    loadProjects()
  }, [])

  // Get years sorted in descending order (newest first)
  const sortedYears = Object.keys(projectsByYear)
    .map(year => parseInt(year))
    .sort((a, b) => b - a)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-text/70">Loading projects...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Header */}
      <section className="section-spaced pt-32">
        <div className="container-wide">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="h1 mb-6"
            data-text-hover
          >
            Projects
          </motion.h1>

          {/* Full-width line separator */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            className="w-full h-px bg-text mb-16 origin-left"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl text-text-secondary leading-relaxed max-w-3xl"
          >
            A chronological journey through my work—from recent projects to past explorations.
            Each year represents growth, new challenges, and creative solutions.
          </motion.p>
        </div>
      </section>

      {/* Year Timeline */}
      {sortedYears.map((year, yearIndex) => (
        <section key={year} className="relative">
          {/* Sticky Year Header */}
          <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-secondary/20">
            <div className="container-wide py-8">
              {/* Year Heading */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="h2 mb-6"
                data-text-hover
              >
                {year}
              </motion.h2>

              {/* Full-width line separator */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                className="w-full h-px bg-text origin-left"
              />
            </div>
          </div>

          {/* Projects Content */}
          <div className="section-spaced pt-8">
            <div className="container-wide">
              {/* Projects for this year - FeaturedWork Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">
              {/* Left Side - Project List */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-4"
              >
                {projectsByYear[year].map((project, projectIndex) => (
                  <motion.div
                    key={project.id}
                    onMouseEnter={() => setHoveredProject(project)}
                    onMouseLeave={() => setHoveredProject(null)}
                    data-project-hover
                    className="w-full"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: projectIndex * 0.1 }}
                  >
                    <Link
                      href={`/projects/${project.id}`}
                      className="block w-full text-left p-4 rounded-lg transition-all duration-300 relative text-text/70 hover:text-text"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-xl font-medium" data-text-hover>{project.title}</h3>
                        <div className="flex items-center gap-2">
                          {project.featured && (
                            <span className="text-xs text-background bg-primary px-2 py-1 rounded">
                              Featured
                            </span>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-text-secondary mb-1" data-text-hover>{project.description}</p>
                      <div className="flex items-center gap-2 text-xs text-text-secondary">
                        <span className="capitalize bg-secondary px-2 py-1 rounded">
                          {project.category}
                        </span>
                        {project.client && (
                          <span>• {project.client}</span>
                        )}
                        {project.role && (
                          <span>• {project.role}</span>
                        )}
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>

              {/* Right Side - Project Display (Only on Hover) */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative h-[600px] lg:h-[700px] overflow-hidden"
              >
                {hoveredProject ? (
                  <motion.div
                    key={hoveredProject.id}
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
                    exit={{
                      opacity: 0,
                      x: 50,
                      rotate: -5
                    }}
                    transition={{
                      duration: 0.6,
                      ease: [0.25, 0.1, 0.25, 1]
                    }}
                    className="relative w-[480px] lg:w-[520px] h-[600px] mx-auto"
                  >
                    <Link href={`/projects/${hoveredProject.id}`}>
                      <ParallaxImage
                        src={hoveredProject.image}
                        alt={`${hoveredProject.title} project mockup`}
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
          </div>
        </section>
      ))}

      {/* Empty State */}
      {sortedYears.length === 0 && (
        <section className="section-spaced">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <p className="text-text-secondary">No projects found. Start by adding some projects!</p>
            </motion.div>
          </div>
        </section>
      )}

      {/* Footer Reveal Effect */}
      <GlobalFooterReveal>
        <div className="section-spaced">
          <div className="container-wide text-center">
            <h2 className="h2 mb-6">Ready to work together?</h2>
            <p className="text-xl text-text-secondary leading-relaxed max-w-2xl mx-auto mb-8">
              Let&apos;s discuss your next project and bring your ideas to life.
            </p>
            <a
              href="mailto:hello@aslam.com"
              className="inline-block px-8 py-4 bg-text text-background rounded-lg hover:bg-text/90 transition-colors"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </GlobalFooterReveal>
    </div>
  )
}