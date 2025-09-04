import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import Cookies from 'js-cookie'
import { User, UserLogin, UserCreate } from '@/types'
import { authApi } from '@/lib/auth-api'
import { toast } from 'sonner'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (credentials: UserLogin) => Promise<void>
  register: (userData: UserCreate) => Promise<void>
  logout: () => void
  loadUser: () => Promise<void>
  clearError: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (credentials: UserLogin) => {
        set({ isLoading: true })
        try {
          const authResponse = await authApi.login(credentials)
          
          // Store token in cookie
          Cookies.set('access_token', authResponse.access_token, {
            expires: 1, // 1 day
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
          })

          // Load user profile
          await get().loadUser()
          
          toast.success('Login successful!')
        } catch (error: any) {
          console.error('Login error:', error)
          toast.error(error.response?.data?.detail || 'Login failed. Please try again.')
          // throw error
        } finally {
          set({ isLoading: false })
        }
      },

      register: async (userData: UserCreate) => {
        set({ isLoading: true })
        try {
          const user = await authApi.register(userData)
          
          // After successful registration, login automatically
          await get().login({
            email: userData.email,
            password: userData.password
          })
          
          toast.success('Registration successful!')
        } catch (error: any) {
          console.error('Registration error:', error)
          toast.error(error.response?.data?.detail || 'Registration failed. Please try again.')
          // throw error
        } finally {
          set({ isLoading: false })
        }
      },

      logout: () => {
        Cookies.remove('access_token')
        set({
          user: null,
          isAuthenticated: false
        })
        toast.success('Logged out successfully')
        
        // Redirect to home page
        if (typeof window !== 'undefined') {
          window.location.href = '/'
        }
      },

      loadUser: async () => {
        const token = Cookies.get('access_token')
        if (!token) {
          set({ user: null, isAuthenticated: false })
          return
        }

        set({ isLoading: true })
        try {
          const user = await authApi.getProfile()
          set({
            user,
            isAuthenticated: true
          })
        } catch (error) {
          console.error('Load user error:', error)
          // If token is invalid, remove it
          Cookies.remove('access_token')
          set({
            user: null,
            isAuthenticated: false
          })
        } finally {
          set({ isLoading: false })
        }
      },

      clearError: () => {
        // For future error state management
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)
