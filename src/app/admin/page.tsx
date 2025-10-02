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
              <h1 className="text-[clamp(2.5rem,6vw,4rem)] leading-[0.9] tracking-tighter font-medium mb-4">
                Project Management
              </h1>
              <p className="text-text-secondary">
                Manage your portfolio projects
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/admin/projects/new"
                className="px-6 py-3 bg-text text-background hover:translate-x-1 transition-all duration-300"
              >
                Add New Project
              </Link>
              <button
                onClick={handleLogout}
                className="px-6 py-3 border-2 border-text text-text hover:bg-text hover:text-background transition-all duration-300"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Projects List */}
          <div className="bg-background border-2 border-text overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-text text-background">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium">
                      Project
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium">
                      Category
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium">
                      Featured
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium">
                      Year
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y-2 divide-text/10">
                  {projects.map((project) => (
                    <tr key={project.id} className="hover:bg-text/5 transition-colors duration-200">
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-medium text-text">{project.title}</div>
                          <div className="text-sm text-text-secondary line-clamp-1">
                            {project.description}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-text/10 text-text text-xs capitalize">
                          {project.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-xs ${
                          project.status === 'completed' ? 'bg-text text-background' :
                          project.status === 'in-progress' ? 'bg-text/20 text-text' :
                          'bg-text/10 text-text'
                        }`}>
                          {project.status.replace('-', ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {project.featured ? (
                          <span className="px-2 py-1 bg-text text-background text-xs">
                            Yes
                          </span>
                        ) : (
                          <span className="text-text-secondary text-xs">No</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-text-secondary">
                        {project.year}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/projects/${project.id}`}
                            className="px-3 py-1 text-xs bg-text/10 text-text hover:bg-text hover:text-background transition-all duration-300"
                            data-cursor-text="View"
                          >
                            View
                          </Link>
                          <Link
                            href={`/admin/projects/${project.id}/edit`}
                            className="px-3 py-1 text-xs border border-text text-text hover:bg-text hover:text-background transition-all duration-300"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDeleteProject(project.id)}
                            className="px-3 py-1 text-xs border border-text text-text hover:bg-text hover:text-background transition-all duration-300"
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
