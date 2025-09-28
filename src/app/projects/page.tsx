'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

import Link from 'next/link'
import { Project, ProjectFilters } from '@/types/project'
import { getProjects, getProjectsByCategory } from '@/lib/projects'
import Navigation from '@/components/Navigation'
import ParallaxImage from '@/components/ParallaxImage'
import GlobalFooterReveal from '@/components/GlobalFooterReveal'

const categories = [
  { value: 'all', label: 'All Projects' },
  { value: 'web', label: 'Web Design' },
  { value: 'mobile', label: 'Mobile Apps' },
  { value: 'branding', label: 'Branding' },
  { value: 'ui-ux', label: 'UI/UX' },
  { value: 'other', label: 'Other' },
]

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([])
  const [filters, setFilters] = useState<ProjectFilters>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProjects = () => {
      try {
        const allProjects = getProjects()
        setProjects(allProjects)
        setFilteredProjects(allProjects)
      } catch (error) {
        console.error('Error loading projects:', error)
      } finally {
        setLoading(false)
      }
    }

    loadProjects()
  }, [])

  useEffect(() => {
    let filtered = projects

    if (filters.category && filters.category !== 'all') {
      filtered = getProjectsByCategory(filters.category)
    }

    if (filters.featured !== undefined) {
      filtered = filtered.filter(project => project.featured === filters.featured)
    }

    if (filters.status) {
      filtered = filtered.filter(project => project.status === filters.status)
    }

    if (filters.year) {
      filtered = filtered.filter(project => project.year === filters.year)
    }

    if (filters.tags && filters.tags.length > 0) {
      filtered = filtered.filter(project =>
        filters.tags!.some(tag => project.tags.includes(tag))
      )
    }

    setFilteredProjects(filtered)
  }, [projects, filters])

  const handleCategoryChange = (category: string) => {
    setFilters(prev => ({ ...prev, category }))
  }

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
        <div className="container-70-30">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="content-70-left mb-16"
          >
            <h1 className="h1 mb-6 link-hover" data-text-hover>Projects</h1>
            <p className="text-xl text-text-secondary leading-relaxed">
              A collection of my recent work spanning web design, mobile apps, branding, and user experience design.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="content-70"
          >
            {/* Filters */}
            <div className="flex flex-wrap gap-3 mb-12">
              {categories.map((category) => (
                <button
                  key={category.value}
                  onClick={() => handleCategoryChange(category.value)}
                  className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                    filters.category === category.value || (!filters.category && category.value === 'all')
                      ? 'bg-text text-background'
                      : 'bg-secondary text-text hover:bg-text/10'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>

            {/* 70% width line separator */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
              className="w-full h-px bg-text mb-16 origin-left"
            />
          </motion.div>
        </div>
      </section>

      {/* Projects Grid - Full Width */}
      <section className="section">
        <div className="w-full px-4 sm:px-6 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <Link href={`/projects/${project.id}`}>
                  <div className="bg-background border border-secondary rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 group-hover:scale-[1.02]">
                    {/* Project Image */}
                    <div className="relative h-64 overflow-hidden parallax-container">
                      <ParallaxImage
                        src={project.image}
                        alt={project.title}
                        fill
                        speed={-0.5}
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        containerClassName="w-full h-full"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      {project.featured && (
                        <div className="absolute top-4 left-4 bg-primary text-background px-3 py-1 rounded-full text-xs font-medium">
                          Featured
                        </div>
                      )}
                    </div>

                    {/* Project Info */}
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-text-secondary capitalize">
                          {project.category}
                        </span>
                        <span className="text-sm text-text-secondary">
                          {project.year}
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-medium mb-2 group-hover:text-primary transition-colors" data-text-hover>
                        {project.title}
                      </h3>
                      
                      <p className="text-text-secondary text-sm mb-4 line-clamp-2">
                        {project.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {project.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-secondary text-text-secondary text-xs rounded"
                          >
                            {tag}
                          </span>
                        ))}
                        {project.tags.length > 3 && (
                          <span className="px-2 py-1 bg-secondary text-text-secondary text-xs rounded">
                            +{project.tags.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <p className="text-text-secondary">No projects found matching your filters.</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Footer Reveal Effect */}
      <GlobalFooterReveal>
        <div className="section-spaced">
          <div className="container-wide text-center">
            <h2 className="h2 mb-6">Ready to work together?</h2>
            <p className="text-xl text-text-secondary leading-relaxed max-w-2xl mx-auto mb-8">
              Let's discuss your next project and bring your ideas to life.
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