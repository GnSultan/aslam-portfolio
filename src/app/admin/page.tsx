'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Project } from '@/types/project'
import { getProjects, deleteProject } from '@/lib/projects'

export default function AdminPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProjects = () => {
      try {
        const allProjects = getProjects()
        setProjects(allProjects)
      } catch (error) {
        console.error('Error loading projects:', error)
      } finally {
        setLoading(false)
      }
    }

    loadProjects()
  }, [])

  const handleDeleteProject = (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      try {
        const success = deleteProject(id)
        if (success) {
          setProjects(prev => prev.filter(project => project.id !== id))
        }
      } catch (error) {
        console.error('Error deleting project:', error)
        alert('Failed to delete project')
      }
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
              <h1 className="h1 mb-4">Project Management</h1>
              <p className="text-text-secondary">
                Manage your portfolio projects
              </p>
            </div>
            <Link
              href="/admin/projects/new"
              className="px-6 py-3 bg-text text-background rounded-lg hover:bg-text/90 transition-colors"
            >
              Add New Project
            </Link>
          </div>

          {/* Projects List */}
          <div className="bg-background border border-secondary rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-secondary/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-text-secondary">
                      Project
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-text-secondary">
                      Category
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-text-secondary">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-text-secondary">
                      Featured
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-text-secondary">
                      Year
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-text-secondary">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-secondary">
                  {projects.map((project) => (
                    <tr key={project.id} className="hover:bg-secondary/20">
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-medium text-text">{project.title}</div>
                          <div className="text-sm text-text-secondary">
                            {project.description}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-secondary text-text-secondary text-xs rounded capitalize">
                          {project.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-xs rounded ${
                          project.status === 'completed' ? 'bg-green-100 text-green-800' :
                          project.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {project.status.replace('-', ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {project.featured ? (
                          <span className="px-2 py-1 bg-primary text-background text-xs rounded">
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
                            href={`/admin/projects/${project.id}/edit`}
                            className="px-3 py-1 text-xs bg-secondary text-text-secondary rounded hover:bg-text/10 transition-colors"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDeleteProject(project.id)}
                            className="px-3 py-1 text-xs bg-red-100 text-red-800 rounded hover:bg-red-200 transition-colors"
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
