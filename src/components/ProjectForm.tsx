'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { ProjectFormData, Category, Status } from '@/types/project'
import { createProject, updateProject, getProject } from '@/lib/projects'
import ImageUpload from './ImageUpload'
import MultipleImageUpload from './MultipleImageUpload'

interface ProjectFormProps {
  projectId?: string
  mode: 'create' | 'edit'
}

const categories = [
  { value: 'web', label: 'Web Design' },
  { value: 'mobile', label: 'Mobile Apps' },
  { value: 'branding', label: 'Branding' },
  { value: 'ui-ux', label: 'UI/UX' },
  { value: 'other', label: 'Other' },
]

const statuses = [
  { value: 'completed', label: 'Completed' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'concept', label: 'Concept' },
]

export default function ProjectForm({ projectId, mode }: ProjectFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<ProjectFormData>({
    title: '',
    description: '',
    longDescription: '',
    image: '',
    images: [],
    category: 'web',
    tags: [],
    technologies: [],
    year: new Date().getFullYear(),
    client: '',
    role: '',
    duration: '',
    status: 'completed',
    featured: false,
    order: 0,
    liveUrl: '',
    githubUrl: '',
    behanceUrl: '',
    websiteEmbed: '',
    caseStudy: {
      challenge: '',
      solution: '',
      process: [''],
      results: [''],
    },
  })

  const [newTag, setNewTag] = useState('')
  const [newTech, setNewTech] = useState('')
  const [newProcessStep, setNewProcessStep] = useState('')
  const [newResult, setNewResult] = useState('')

  useEffect(() => {
    if (mode === 'edit' && projectId) {
      const project = getProject(projectId)
      if (project) {
        setFormData({
          title: project.title,
          description: project.description,
          longDescription: project.longDescription || '',
          image: project.image,
          images: project.images || [],
          category: project.category,
          tags: project.tags,
          technologies: project.technologies,
          year: project.year,
          client: project.client || '',
          role: project.role,
          duration: project.duration || '',
          status: project.status,
          featured: project.featured,
          order: project.order,
          liveUrl: project.liveUrl || '',
          githubUrl: project.githubUrl || '',
          behanceUrl: project.behanceUrl || '',
          websiteEmbed: project.websiteEmbed || '',
          caseStudy: project.caseStudy || {
            challenge: '',
            solution: '',
            process: [''],
            results: [''],
          },
        })
      }
    }
  }, [mode, projectId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      let result
      if (mode === 'create') {
        console.log('Creating project with data:', formData)
        result = createProject(formData)
        console.log('Project created:', result)
      } else if (projectId) {
        console.log('Updating project:', projectId, 'with data:', formData)
        result = updateProject(projectId, formData)
        console.log('Project updated:', result)
      }

      if (result) {
        console.log('Project saved successfully, redirecting to admin...')
        router.push('/admin')
      } else {
        throw new Error('Failed to save project - no result returned')
      }
    } catch (error) {
      console.error('Error saving project:', error)
      alert(`Failed to save project: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setLoading(false)
    }
  }

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }))
      setNewTag('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  const addTechnology = () => {
    if (newTech.trim() && !formData.technologies.includes(newTech.trim())) {
      setFormData(prev => ({
        ...prev,
        technologies: [...prev.technologies, newTech.trim()]
      }))
      setNewTech('')
    }
  }

  const removeTechnology = (techToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.filter(tech => tech !== techToRemove)
    }))
  }

  const addProcessStep = () => {
    if (newProcessStep.trim()) {
      setFormData(prev => ({
        ...prev,
        caseStudy: {
          ...prev.caseStudy!,
          process: [...prev.caseStudy!.process, newProcessStep.trim()]
        }
      }))
      setNewProcessStep('')
    }
  }

  const removeProcessStep = (index: number) => {
    setFormData(prev => ({
      ...prev,
      caseStudy: {
        ...prev.caseStudy!,
        process: prev.caseStudy!.process.filter((_, i) => i !== index)
      }
    }))
  }

  const addResult = () => {
    if (newResult.trim()) {
      setFormData(prev => ({
        ...prev,
        caseStudy: {
          ...prev.caseStudy!,
          results: [...prev.caseStudy!.results, newResult.trim()]
        }
      }))
      setNewResult('')
    }
  }

  const removeResult = (index: number) => {
    setFormData(prev => ({
      ...prev,
      caseStudy: {
        ...prev.caseStudy!,
        results: prev.caseStudy!.results.filter((_, i) => i !== index)
      }
    }))
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="container max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-8">
            <h1 className="h1 mb-4">
              {mode === 'create' ? 'Create New Project' : 'Edit Project'}
            </h1>
            <p className="text-text-secondary">
              {mode === 'create' 
                ? 'Add a new project to your portfolio' 
                : 'Update project information'
              }
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div className="bg-background border border-secondary rounded-lg p-6">
              <h2 className="text-xl font-medium mb-6">Basic Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-text mb-2">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-4 py-3 border border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text mb-2">
                    Category *
                  </label>
                  <select
                    required
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as Category }))}
                    className="w-full px-4 py-3 border border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {categories.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text mb-2">
                    Year *
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.year}
                    onChange={(e) => setFormData(prev => ({ ...prev, year: parseInt(e.target.value) }))}
                    className="w-full px-4 py-3 border border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text mb-2">
                    Status *
                  </label>
                  <select
                    required
                    value={formData.status}
                    onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as Status }))}
                    className="w-full px-4 py-3 border border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {statuses.map((status) => (
                      <option key={status.value} value={status.value}>
                        {status.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-text mb-2">
                  Short Description *
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-4 py-3 border border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-text mb-2">
                  Long Description
                </label>
                <textarea
                  rows={4}
                  value={formData.longDescription}
                  onChange={(e) => setFormData(prev => ({ ...prev, longDescription: e.target.value }))}
                  className="w-full px-4 py-3 border border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-text mb-2">
                  Main Image *
                </label>
                <ImageUpload
                  value={formData.image}
                  onChange={(url) => setFormData(prev => ({ ...prev, image: url }))}
                  placeholder="Enter image URL or upload file"
                />
              </div>
            </div>

            {/* Additional Images */}
            <div className="bg-background border border-secondary rounded-lg p-6">
              <h2 className="text-xl font-medium mb-6">Additional Images</h2>
              <div>
                <label className="block text-sm font-medium text-text mb-2">
                  Gallery Images
                </label>
                <MultipleImageUpload
                  value={formData.images || []}
                  onChange={(images) => setFormData(prev => ({ ...prev, images }))}
                  maxImages={10}
                />
              </div>
            </div>

            {/* Project Details */}
            <div className="bg-background border border-secondary rounded-lg p-6">
              <h2 className="text-xl font-medium mb-6">Project Details</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-text mb-2">
                    Client
                  </label>
                  <input
                    type="text"
                    value={formData.client}
                    onChange={(e) => setFormData(prev => ({ ...prev, client: e.target.value }))}
                    className="w-full px-4 py-3 border border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text mb-2">
                    Your Role *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.role}
                    onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                    className="w-full px-4 py-3 border border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text mb-2">
                    Duration
                  </label>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                    placeholder="e.g., 3 months"
                    className="w-full px-4 py-3 border border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text mb-2">
                    Order (for featured projects)
                  </label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData(prev => ({ ...prev, order: parseInt(e.target.value) || 0 }))}
                    className="w-full px-4 py-3 border border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="mt-6 flex items-center">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                  className="mr-3"
                />
                <label htmlFor="featured" className="text-sm font-medium text-text">
                  Featured Project
                </label>
              </div>
            </div>

            {/* Tags and Technologies */}
            <div className="bg-background border border-secondary rounded-lg p-6">
              <h2 className="text-xl font-medium mb-6">Tags & Technologies</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-text mb-2">
                    Tags
                  </label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {formData.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-secondary text-text-secondary text-sm rounded flex items-center gap-2"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="text-text-secondary hover:text-text"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                      placeholder="Add a tag"
                      className="flex-1 px-4 py-2 border border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <button
                      type="button"
                      onClick={addTag}
                      className="px-4 py-2 bg-secondary text-text-secondary rounded-lg hover:bg-text/10 transition-colors"
                    >
                      Add
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text mb-2">
                    Technologies
                  </label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {formData.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-secondary text-text-secondary text-sm rounded flex items-center gap-2"
                      >
                        {tech}
                        <button
                          type="button"
                          onClick={() => removeTechnology(tech)}
                          className="text-text-secondary hover:text-text"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newTech}
                      onChange={(e) => setNewTech(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology())}
                      placeholder="Add a technology"
                      className="flex-1 px-4 py-2 border border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <button
                      type="button"
                      onClick={addTechnology}
                      className="px-4 py-2 bg-secondary text-text-secondary rounded-lg hover:bg-text/10 transition-colors"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Links */}
            <div className="bg-background border border-secondary rounded-lg p-6">
              <h2 className="text-xl font-medium mb-6">Links</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text mb-2">
                    Website Embed URL
                  </label>
                  <input
                    type="url"
                    value={formData.websiteEmbed}
                    onChange={(e) => setFormData(prev => ({ ...prev, websiteEmbed: e.target.value }))}
                    placeholder="https://example.com (for iframe embedding)"
                    className="w-full px-4 py-3 border border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <p className="text-sm text-text-secondary mt-1">
                    URL for live website preview embedding
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text mb-2">
                    Live URL
                  </label>
                  <input
                    type="url"
                    value={formData.liveUrl}
                    onChange={(e) => setFormData(prev => ({ ...prev, liveUrl: e.target.value }))}
                    className="w-full px-4 py-3 border border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text mb-2">
                    GitHub URL
                  </label>
                  <input
                    type="url"
                    value={formData.githubUrl}
                    onChange={(e) => setFormData(prev => ({ ...prev, githubUrl: e.target.value }))}
                    className="w-full px-4 py-3 border border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text mb-2">
                    Behance URL
                  </label>
                  <input
                    type="url"
                    value={formData.behanceUrl}
                    onChange={(e) => setFormData(prev => ({ ...prev, behanceUrl: e.target.value }))}
                    className="w-full px-4 py-3 border border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
            </div>

            {/* Case Study */}
            <div className="bg-background border border-secondary rounded-lg p-6">
              <h2 className="text-xl font-medium mb-6">Case Study</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-text mb-2">
                    Challenge
                  </label>
                  <textarea
                    rows={3}
                    value={formData.caseStudy?.challenge || ''}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      caseStudy: { ...prev.caseStudy!, challenge: e.target.value }
                    }))}
                    className="w-full px-4 py-3 border border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text mb-2">
                    Solution
                  </label>
                  <textarea
                    rows={3}
                    value={formData.caseStudy?.solution || ''}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      caseStudy: { ...prev.caseStudy!, solution: e.target.value }
                    }))}
                    className="w-full px-4 py-3 border border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text mb-2">
                    Process Steps
                  </label>
                  <div className="space-y-2 mb-3">
                    {formData.caseStudy?.process.map((step, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <span className="w-6 h-6 bg-primary text-background rounded-full flex items-center justify-center text-sm font-medium">
                          {index + 1}
                        </span>
                        <span className="flex-1 text-text-secondary">{step}</span>
                        <button
                          type="button"
                          onClick={() => removeProcessStep(index)}
                          className="text-text-secondary hover:text-text"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newProcessStep}
                      onChange={(e) => setNewProcessStep(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addProcessStep())}
                      placeholder="Add a process step"
                      className="flex-1 px-4 py-2 border border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <button
                      type="button"
                      onClick={addProcessStep}
                      className="px-4 py-2 bg-secondary text-text-secondary rounded-lg hover:bg-text/10 transition-colors"
                    >
                      Add
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text mb-2">
                    Results
                  </label>
                  <div className="space-y-2 mb-3">
                    {formData.caseStudy?.results.map((result, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-primary rounded-full"></span>
                        <span className="flex-1 text-text-secondary">{result}</span>
                        <button
                          type="button"
                          onClick={() => removeResult(index)}
                          className="text-text-secondary hover:text-text"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newResult}
                      onChange={(e) => setNewResult(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addResult())}
                      placeholder="Add a result"
                      className="flex-1 px-4 py-2 border border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <button
                      type="button"
                      onClick={addResult}
                      className="px-4 py-2 bg-secondary text-text-secondary rounded-lg hover:bg-text/10 transition-colors"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex items-center gap-4">
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3 bg-text text-background rounded-lg hover:bg-text/90 transition-colors disabled:opacity-50"
              >
                {loading ? 'Saving...' : mode === 'create' ? 'Create Project' : 'Update Project'}
              </button>
              <button
                type="button"
                onClick={() => router.push('/admin')}
                className="px-8 py-3 border border-text text-text rounded-lg hover:bg-text hover:text-background transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  )
}
