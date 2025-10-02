'use client'

import { Suspense, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'

function LoginForm() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        // Redirect to admin or the page they were trying to access
        const redirect = searchParams.get('redirect') || '/admin'
        router.push(redirect)
        router.refresh()
      } else {
        setError('Invalid password')
      }
    } catch {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="bg-background border-2 border-text p-8">
          <h1 className="text-[clamp(2rem,5vw,3rem)] leading-[0.9] tracking-tighter font-medium mb-2">
            Admin Login
          </h1>
          <p className="text-text-secondary mb-8">
            Enter your password to access the CMS
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border-2 border-secondary bg-background text-text focus:outline-none focus:border-text transition-colors duration-300"
                placeholder="Enter admin password"
                required
                autoFocus
              />
            </div>

            {error && (
              <div className="p-3 bg-text/5 border-2 border-text">
                <p className="text-sm text-text">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 bg-text text-background hover:translate-x-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-x-0 transition-all duration-300 font-medium"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  )
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-text/70">Loading...</div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  )
}
