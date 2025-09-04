'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useRequireAuth } from '@/hooks/use-auth'
import { Loader2 } from 'lucide-react'

interface AuthGuardProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function AuthGuard({ children, fallback }: AuthGuardProps) {
  const { isAuthenticated, isLoading, shouldRedirect } = useRequireAuth()
  const router = useRouter()

  useEffect(() => {
    if (shouldRedirect) {
      router.push('/auth/login')
    }
  }, [shouldRedirect, router])

  if (isLoading) {
    return fallback || (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return null // Will redirect via useEffect
  }

  return <>{children}</>
}

// HOC version for page components
export function withAuthGuard<P extends object>(
  Component: React.ComponentType<P>,
  fallback?: React.ReactNode
) {
  return function AuthGuardedComponent(props: P) {
    return (
      <AuthGuard fallback={fallback}>
        <Component {...props} />
      </AuthGuard>
    )
  }
}
