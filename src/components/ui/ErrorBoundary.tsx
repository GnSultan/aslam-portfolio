'use client'

import { Component, ErrorInfo, ReactNode } from 'react'
import { motion } from 'framer-motion'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || <DefaultErrorFallback error={this.state.error} />
    }

    return this.props.children
  }
}

function DefaultErrorFallback({ error }: { error?: Error }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-lg mx-auto"
      >
        <div className="mb-8">
          <div className="text-6xl mb-4">⚠️</div>
          <div className="w-16 h-px bg-primary mx-auto mb-6" />
        </div>

        <h1 className="h2 mb-4 text-text">Something went wrong</h1>
        <p className="text-lg text-text-secondary mb-8 leading-relaxed">
          We encountered an unexpected error. Please try refreshing the page or contact support if the problem persists.
        </p>

        {process.env.NODE_ENV === 'development' && error && (
          <details className="mb-8 text-left">
            <summary className="cursor-pointer text-sm text-text-secondary mb-2">
              Error Details (Development)
            </summary>
            <pre className="text-xs bg-secondary/20 p-4 rounded overflow-auto text-text-secondary">
              {error.message}
              {error.stack && `\n\n${error.stack}`}
            </pre>
          </details>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-text text-background rounded-lg hover:bg-text/90 transition-colors"
          >
            Refresh Page
          </button>

          <button
            onClick={() => window.location.href = '/'}
            className="px-6 py-3 border border-text text-text rounded-lg hover:bg-text hover:text-background transition-colors"
          >
            Go Home
          </button>
        </div>
      </motion.div>
    </div>
  )
}