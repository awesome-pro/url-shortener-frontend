import { api } from './api'
import { AuthResponse, User, UserCreate, UserLogin, UserProfile } from '@/types'

export const authApi = {
  // Register new user
  register: async (userData: UserCreate): Promise<User> => {
    const response = await api.post<User>('/auth/register', userData)
    return response.data
  },

  // Login user
  login: async (credentials: UserLogin): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', credentials)
    return response.data
  },

  // Get current user profile
  getProfile: async (): Promise<UserProfile> => {
    const response = await api.get<UserProfile>('/auth/me')
    return response.data
  },

  // Logout (client-side token removal)
  logout: () => {
    // Token removal is handled by the auth store
    return Promise.resolve()
  },
}
