import { useWindowSize } from '@/hooks/useWindowSize'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Project } from '@/types/project'
import Link from 'next/link'
import ParallaxImage from './ParallaxImage'
import { useRef } from 'react'

// Separate component for project card with parallax
function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group"
    >
      <Link href={`/projects/${project.id}`}>
        <div className="relative w-full aspect-square rounded-lg overflow-hidden">
          <ParallaxImage
            src={project.image}
            alt={project.title}
            fill
            speed={-0.5}
            className="object-cover object-center scale-110 group-hover:brightness-110 group-hover:contrast-110 transition-all duration-300"
            containerClassName="relative w-full h-full"
            sizes="(max-width: 768px) 80vw, 50vw"
          />
        
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/40" />
          
          {/* Featured badge */}
          {project.featured && (
            <div className="absolute top-4 right-4 bg-primary text-background px-3 py-1 rounded-full text-xs font-medium">
              Featured
            </div>
          )}
          
          {/* Project info overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="flex items-center gap-3 mb-3">
              <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs rounded-full capitalize">
                {project.category}
              </span>
              <span className="text-white/80 text-xs">
                {project.year}
              </span>
            </div>
            <h3 className="text-2xl font-semibold text-white">
              {project.title}
            </h3>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default function HorizontalScrollCarousel({ projects, currentProjectId }: { projects: Project[], currentProjectId: string }) {
  const targetRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
  })
  const { width } = useWindowSize()

  const relatedProjects = projects
    .filter(p => p.id !== currentProjectId)
    .slice(0, 3)

  const cardWidth = width < 768 ? width * 0.8 : width * 0.5
  const totalWidth = (cardWidth * 4) + (3 * 32) // 4 cards + 3 gaps of 32px
  const scrollDistance = totalWidth - width

  const x = useTransform(scrollYProgress, [0, 1], ['0%', `-${scrollDistance}px`])

  return (
    <section ref={targetRef} className="relative h-[300vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-8">
          {relatedProjects.map((project, index) => (
            <div key={project.id} className="flex-shrink-0 w-[80vw] md:w-[50vw]">
              <ProjectCard project={project} index={index} />
            </div>
          ))}
          <div className="flex-shrink-0 w-[80vw] md:w-[50vw]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="group"
            >
              <Link href="/projects">
                <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-secondary/20 border-2 border-dashed border-text/20 hover:border-primary/40 transition-all duration-300 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                      <svg
                        className="w-8 h-8 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-text mb-2">See More</h3>
                    <p className="text-text-secondary text-sm">Explore all projects</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}