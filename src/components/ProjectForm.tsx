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
    challenge: '',
    approachBullets: [],
    valueDelivered: [],
    testimonial: undefined,
    relevanceNote: '',
  })

  const [newTag, setNewTag] = useState('')
  const [newTech, setNewTech] = useState('')
  const [newApproachBullet, setNewApproachBullet] = useState('')
  const [newValueLabel, setNewValueLabel] = useState('')
  const [newValueValue, setNewValueValue] = useState('')

  useEffect(() => {
    const loadProject = async () => {
      if (mode === 'edit' && projectId) {
        const project = await getProject(projectId)
        if (project) {
          setFormData({
            title: project.title,
            description: project.description,
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
            challenge: project.challenge || '',
            approachBullets: project.approachBullets || [],
            valueDelivered: project.valueDelivered || [],
            testimonial: project.testimonial,
            relevanceNote: project.relevanceNote || '',
          })
        }
      }
    }

    loadProject()
  }, [mode, projectId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      let result
      if (mode === 'create') {
        result = await createProject(formData)
      } else if (projectId) {
        result = await updateProject(projectId, formData)
      }

      if (result) {
        router.push('/admin')
      } else {
        throw new Error('Failed to save project')
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

  const addApproachBullet = () => {
    if (newApproachBullet.trim()) {
      setFormData(prev => ({
        ...prev,
        approachBullets: [...(prev.approachBullets || []), newApproachBullet.trim()]
      }))
      setNewApproachBullet('')
    }
  }

  const removeApproachBullet = (index: number) => {
    setFormData(prev => ({
      ...prev,
      approachBullets: prev.approachBullets?.filter((_, i) => i !== index) || []
    }))
  }

  const addValueDelivered = () => {
    if (newValueLabel.trim() && newValueValue.trim()) {
      setFormData(prev => ({
        ...prev,
        valueDelivered: [...(prev.valueDelivered || []), {
          label: newValueLabel.trim(),
          value: newValueValue.trim()
        }]
      }))
      setNewValueLabel('')
      setNewValueValue('')
    }
  }

  const removeValueDelivered = (index: number) => {
    setFormData(prev => ({
      ...prev,
      valueDelivered: prev.valueDelivered?.filter((_, i) => i !== index) || []
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto p-6">
      <div className="bg-background border border-secondary rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-primary">Project Snapshot</h2>
        <p className="text-text-secondary mb-6">Basic information about the project</p>

        {/* Title */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            Project Title *
          </label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            className="w-full px-4 py-2 border border-secondary rounded-lg bg-background text-text focus:outline-none focus:border-primary"
            placeholder="e.g., Flow"
          />
        </div>

        {/* Description */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            Short Description *
          </label>
          <textarea
            required
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            className="w-full px-4 py-2 border border-secondary rounded-lg bg-background text-text focus:outline-none focus:border-primary"
            rows={3}
            placeholder="A modern productivity app that helps teams stay focused and ship faster"
          />
          <p className="text-sm text-text-secondary mt-1">Keep it under 2 sentences, plain language</p>
        </div>

        {/* Meta Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Client */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Client/Brand
            </label>
            <input
              type="text"
              value={formData.client || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, client: e.target.value }))}
              className="w-full px-4 py-2 border border-secondary rounded-lg bg-background text-text focus:outline-none focus:border-primary"
              placeholder="e.g., FlowHQ"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Type *
            </label>
            <select
              required
              value={formData.category}
              onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as Category }))}
              className="w-full px-4 py-2 border border-secondary rounded-lg bg-background text-text focus:outline-none focus:border-primary"
            >
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>
          </div>

          {/* Year */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Timeline (Year) *
            </label>
            <input
              type="number"
              required
              value={formData.year}
              onChange={(e) => setFormData(prev => ({ ...prev, year: parseInt(e.target.value) }))}
              className="w-full px-4 py-2 border border-secondary rounded-lg bg-background text-text focus:outline-none focus:border-primary"
              placeholder="2025"
            />
          </div>

          {/* Duration */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Duration
            </label>
            <input
              type="text"
              value={formData.duration || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
              className="w-full px-4 py-2 border border-secondary rounded-lg bg-background text-text focus:outline-none focus:border-primary"
              placeholder="e.g., 4 months"
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Your Role *
            </label>
            <input
              type="text"
              required
              value={formData.role}
              onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
              className="w-full px-4 py-2 border border-secondary rounded-lg bg-background text-text focus:outline-none focus:border-primary"
              placeholder="e.g., Lead Product Designer"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Status *
            </label>
            <select
              required
              value={formData.status}
              onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as Status }))}
              className="w-full px-4 py-2 border border-secondary rounded-lg bg-background text-text focus:outline-none focus:border-primary"
            >
              {statuses.map(status => (
                <option key={status.value} value={status.value}>{status.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Featured & Order */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={formData.featured}
              onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
              className="w-4 h-4 text-primary border-secondary rounded focus:ring-primary"
            />
            <label className="ml-2 text-sm font-medium">
              Featured Project
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Display Order
            </label>
            <input
              type="number"
              value={formData.order}
              onChange={(e) => setFormData(prev => ({ ...prev, order: parseInt(e.target.value) }))}
              className="w-full px-4 py-2 border border-secondary rounded-lg bg-background text-text focus:outline-none focus:border-primary"
              placeholder="0"
            />
          </div>
        </div>
      </div>

      {/* Images */}
      <div className="bg-background border border-secondary rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-primary">Visual Showcase</h2>

        {/* Hero Image */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            Hero Image *
          </label>
          <ImageUpload
            value={formData.image}
            onChange={(url) => setFormData(prev => ({ ...prev, image: url }))}
            label="Upload Hero Image"
          />
        </div>

        {/* Gallery Images */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Gallery Images
          </label>
          <MultipleImageUpload
            value={formData.images || []}
            onChange={(urls) => setFormData(prev => ({ ...prev, images: urls }))}
          />
        </div>
      </div>

      {/* The Challenge */}
      <div className="bg-background border border-secondary rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-primary">The Challenge</h2>
        <p className="text-text-secondary mb-6">One simple sentence that anyone can understand</p>

        <textarea
          value={formData.challenge || ''}
          onChange={(e) => setFormData(prev => ({ ...prev, challenge: e.target.value }))}
          className="w-full px-4 py-2 border border-secondary rounded-lg bg-background text-text focus:outline-none focus:border-primary"
          rows={3}
          placeholder="They needed a tool that felt effortless to use, without the clutter and learning curve of traditional project management software."
        />
        <p className="text-sm text-text-secondary mt-1">✨ Keep it plain language - no jargon!</p>
      </div>

      {/* Approach */}
      <div className="bg-background border border-secondary rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-primary">Approach</h2>
        <p className="text-text-secondary mb-6">2-3 key moves you made (plain language, not jargon)</p>

        {/* List of bullets */}
        {formData.approachBullets && formData.approachBullets.length > 0 && (
          <div className="space-y-2 mb-4">
            {formData.approachBullets.map((bullet, index) => (
              <div key={index} className="flex items-center gap-2 p-3 bg-secondary/10 rounded-lg">
                <span className="flex-1">{bullet}</span>
                <button
                  type="button"
                  onClick={() => removeApproachBullet(index)}
                  className="text-red-500 hover:text-red-700 px-2 py-1"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Add new bullet */}
        <div className="flex gap-2">
          <input
            type="text"
            value={newApproachBullet}
            onChange={(e) => setNewApproachBullet(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addApproachBullet())}
            className="flex-1 px-4 py-2 border border-secondary rounded-lg bg-background text-text focus:outline-none focus:border-primary"
            placeholder="e.g., Designed an ultra-minimal interface that puts tasks front and center"
          />
          <button
            type="button"
            onClick={addApproachBullet}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
          >
            Add
          </button>
        </div>
      </div>

      {/* Value Delivered */}
      <div className="bg-background border border-secondary rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-primary">Value Delivered</h2>
        <p className="text-text-secondary mb-6">Talk outcomes, not deliverables</p>

        {/* List of values */}
        {formData.valueDelivered && formData.valueDelivered.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {formData.valueDelivered.map((item, index) => (
              <div key={index} className="p-4 bg-secondary/10 rounded-lg text-center relative">
                <div className="text-3xl font-bold text-primary mb-2">{item.value}</div>
                <div className="text-sm">{item.label}</div>
                <button
                  type="button"
                  onClick={() => removeValueDelivered(index)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-sm"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Add new value */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Value/Metric</label>
            <input
              type="text"
              value={newValueValue}
              onChange={(e) => setNewValueValue(e.target.value)}
              className="w-full px-4 py-2 border border-secondary rounded-lg bg-background text-text focus:outline-none focus:border-primary"
              placeholder="e.g., 3x, 40%, 4.9/5"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Label</label>
            <input
              type="text"
              value={newValueLabel}
              onChange={(e) => setNewValueLabel(e.target.value)}
              className="w-full px-4 py-2 border border-secondary rounded-lg bg-background text-text focus:outline-none focus:border-primary"
              placeholder="e.g., Faster task completion"
            />
          </div>
        </div>
        <button
          type="button"
          onClick={addValueDelivered}
          className="mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
        >
          Add Value Metric
        </button>
      </div>

      {/* Client Perspective */}
      <div className="bg-background border border-secondary rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-primary">Client Perspective</h2>
        <p className="text-text-secondary mb-6">Short authentic feedback (optional)</p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Quote</label>
            <textarea
              value={formData.testimonial?.quote || ''}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                testimonial: {
                  quote: e.target.value,
                  author: prev.testimonial?.author || '',
                  role: prev.testimonial?.role || '',
                }
              }))}
              className="w-full px-4 py-2 border border-secondary rounded-lg bg-background text-text focus:outline-none focus:border-primary"
              rows={3}
              placeholder="Flow feels like magic. It's the first productivity tool that actually makes us more productive instead of just tracking our work."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Author Name</label>
              <input
                type="text"
                value={formData.testimonial?.author || ''}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  testimonial: {
                    quote: prev.testimonial?.quote || '',
                    author: e.target.value,
                    role: prev.testimonial?.role || '',
                  }
                }))}
                className="w-full px-4 py-2 border border-secondary rounded-lg bg-background text-text focus:outline-none focus:border-primary"
                placeholder="Sarah Chen"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Role/Title</label>
              <input
                type="text"
                value={formData.testimonial?.role || ''}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  testimonial: {
                    quote: prev.testimonial?.quote || '',
                    author: prev.testimonial?.author || '',
                    role: e.target.value,
                  }
                }))}
                className="w-full px-4 py-2 border border-secondary rounded-lg bg-background text-text focus:outline-none focus:border-primary"
                placeholder="Product Lead at FlowHQ"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Relevance Note */}
      <div className="bg-background border border-secondary rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-primary">Relevance / Personal Connection</h2>
        <p className="text-text-secondary mb-6">Connect this project to future clients</p>

        <textarea
          value={formData.relevanceNote || ''}
          onChange={(e) => setFormData(prev => ({ ...prev, relevanceNote: e.target.value }))}
          className="w-full px-4 py-2 border border-secondary rounded-lg bg-background text-text focus:outline-none focus:border-primary"
          rows={3}
          placeholder="I love building tools that get out of your way and help you do your best work. If you're looking to create software that people actually enjoy using, let's talk."
        />
      </div>

      {/* Tech Stack */}
      <div className="bg-background border border-secondary rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-primary">Tech Stack</h2>

        {/* List of technologies */}
        {formData.technologies.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {formData.technologies.map((tech, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-secondary/20 text-text rounded-lg flex items-center gap-2"
              >
                {tech}
                <button
                  type="button"
                  onClick={() => removeTechnology(tech)}
                  className="text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}

        {/* Add new technology */}
        <div className="flex gap-2">
          <input
            type="text"
            value={newTech}
            onChange={(e) => setNewTech(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology())}
            className="flex-1 px-4 py-2 border border-secondary rounded-lg bg-background text-text focus:outline-none focus:border-primary"
            placeholder="e.g., React, TypeScript, Node.js"
          />
          <button
            type="button"
            onClick={addTechnology}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
          >
            Add
          </button>
        </div>
      </div>

      {/* Tags */}
      <div className="bg-background border border-secondary rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-primary">Tags</h2>

        {/* List of tags */}
        {formData.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {formData.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-primary/10 text-primary rounded-lg flex items-center gap-2"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}

        {/* Add new tag */}
        <div className="flex gap-2">
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
            className="flex-1 px-4 py-2 border border-secondary rounded-lg bg-background text-text focus:outline-none focus:border-primary"
            placeholder="e.g., Productivity, SaaS, Collaboration"
          />
          <button
            type="button"
            onClick={addTag}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
          >
            Add
          </button>
        </div>
      </div>

      {/* Links */}
      <div className="bg-background border border-secondary rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-primary">Links</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Live URL</label>
            <input
              type="url"
              value={formData.liveUrl || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, liveUrl: e.target.value }))}
              className="w-full px-4 py-2 border border-secondary rounded-lg bg-background text-text focus:outline-none focus:border-primary"
              placeholder="https://example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">GitHub URL</label>
            <input
              type="url"
              value={formData.githubUrl || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, githubUrl: e.target.value }))}
              className="w-full px-4 py-2 border border-secondary rounded-lg bg-background text-text focus:outline-none focus:border-primary"
              placeholder="https://github.com/..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Behance URL</label>
            <input
              type="url"
              value={formData.behanceUrl || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, behanceUrl: e.target.value }))}
              className="w-full px-4 py-2 border border-secondary rounded-lg bg-background text-text focus:outline-none focus:border-primary"
              placeholder="https://behance.net/..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Website Embed URL</label>
            <input
              type="url"
              value={formData.websiteEmbed || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, websiteEmbed: e.target.value }))}
              className="w-full px-4 py-2 border border-secondary rounded-lg bg-background text-text focus:outline-none focus:border-primary"
              placeholder="https://example.com (for iframe)"
            />
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex gap-4">
        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex-1 px-8 py-4 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed font-medium text-lg"
        >
          {loading ? 'Saving...' : mode === 'create' ? 'Create Project' : 'Update Project'}
        </motion.button>

        <motion.button
          type="button"
          onClick={() => router.push('/admin')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-8 py-4 border border-secondary text-text rounded-lg hover:bg-secondary/10"
        >
          Cancel
        </motion.button>
      </div>
    </form>
  )
}