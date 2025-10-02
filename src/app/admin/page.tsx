'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Project } from '@/types/project'
import { getProjects, deleteProject } from '@/lib/projects'

export default function AdminPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const allProjects = await getProjects()
        setProjects(allProjects)
      } catch (error) {
        console.error('Error loading projects:', error)
      } finally {
        setLoading(false)
      }
    }

    loadProjects()
  }, [])

  const handleDeleteProject = async (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      try {
        const success = await deleteProject(id)
        if (success) {
          setProjects(prev => prev.filter(project => project.id !== id))
        }
      } catch (error) {
        console.error('Error deleting project:', error)
        alert('Failed to delete project')
      }
    }
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth', {
        method: 'DELETE',
      })
      router.push('/admin/login')
      router.refresh()
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-text/70">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-12">
            <div>
              <h1 className="text-[clamp(2.5rem,6vw,4rem)] leading-[0.9] tracking-tighter font-medium mb-4">Project Management</h1>
              <p className="text-xl text-text-secondary">
                Manage your portfolio projects
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/admin/projects/new"
                className="px-6 py-3 text-lg bg-text text-background rounded-lg hover:bg-text/90 transition-colors"
              >
                Add New Project
              </Link>
              <button
                onClick={handleLogout}
                className="px-6 py-3 text-lg border border-secondary text-text rounded-lg hover:bg-secondary/20 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Projects List */}
          <div className="bg-background border border-secondary rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-secondary/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-lg font-medium text-text-secondary">
                      Project
                    </th>
                    <th className="px-6 py-4 text-left text-lg font-medium text-text-secondary">
                      Featured
                    </th>
                    <th className="px-6 py-4 text-left text-lg font-medium text-text-secondary">
                      Year
                    </th>
                    <th className="px-6 py-4 text-left text-lg font-medium text-text-secondary">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((project) => (
                    <tr key={project.id} className="hover:bg-secondary/20 transition-all duration-300 relative group border-b border-secondary after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-text after:scale-x-0 after:origin-left after:transition-transform after:duration-300 after:z-10 hover:after:scale-x-100">
                      <td className="px-6 py-4">
                        <Link
                          href={`/projects/${project.id}`}
                          className="block w-full text-left p-4 rounded-lg transition-all duration-300 relative group text-text/70 hover:text-text"
                          data-cursor-text="View"
                        >
                          <div>
                            <div className="text-[clamp(1.5rem,3vw,2.5rem)] font-medium text-text mb-2">{project.title}</div>
                            <div className="p">
                              {project.description}
                            </div>
                          </div>
                        </Link>
                      </td>
                      <td className="px-6 py-4">
                        {project.featured ? (
                          <span className="px-3 py-1 bg-text text-background text-sm font-medium rounded">
                            Yes
                          </span>
                        ) : (
                          <span className="text-text-secondary text-sm font-medium">No</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-medium text-text-secondary">
                          {project.year}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/admin/projects/${project.id}/edit`}
                            className="px-4 py-2 text-sm font-medium bg-secondary text-text-secondary rounded hover:bg-text/10 transition-colors"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDeleteProject(project.id)}
                            className="px-4 py-2 text-sm font-medium bg-text/10 text-text rounded hover:bg-text/20 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {projects.length === 0 && (
            <div className="text-center py-16">
              <p className="text-text-secondary mb-4">No projects found.</p>
              <Link
                href="/admin/projects/new"
                className="link-hover"
              >
                Create your first project
              </Link>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
