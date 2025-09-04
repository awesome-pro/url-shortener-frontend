import { useEffect } from 'react'
import { useAuthStore } from '@/store/auth-store'

export function useAuth() {
  const {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    loadUser,
  } = useAuthStore()

  // Load user on hook initialization
  useEffect(() => {
    if (!user && !isLoading) {
      loadUser()
    }
  }, [user, isLoading, loadUser])

  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    loadUser,
  }
}

// Hook for protected routes
export function useRequireAuth() {
  const { isAuthenticated, isLoading } = useAuth()

  return {
    isAuthenticated,
    isLoading,
    shouldRedirect: !isLoading && !isAuthenticated,
  }
}
