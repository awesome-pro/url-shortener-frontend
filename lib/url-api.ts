import { api } from './api'
import { URL, URLCreate, URLUpdate, URLListResponse, PaginationParams } from '@/types'

export const urlApi = {
  // Create new short URL
  create: async (urlData: URLCreate): Promise<URL> => {
    const response = await api.post<URL>('/urls/', urlData)
    return response.data
  },

  // Get user's URLs with pagination
  getList: async (params: PaginationParams = {}): Promise<URLListResponse> => {
    const queryParams = new URLSearchParams()
    if (params.page) queryParams.append('page', params.page.toString())
    if (params.per_page) queryParams.append('per_page', params.per_page.toString())
    
    const response = await api.get<URLListResponse>(`/urls/?${queryParams.toString()}`)
    return response.data
  },

  // Get specific URL by ID
  getById: async (id: number): Promise<URL> => {
    const response = await api.get<URL>(`/urls/${id}`)
    return response.data
  },

  // Update URL
  update: async (id: number, urlData: URLUpdate): Promise<URL> => {
    const response = await api.put<URL>(`/urls/${id}`, urlData)
    return response.data
  },

  // Delete URL
  delete: async (id: number): Promise<void> => {
    await api.delete(`/urls/${id}`)
  },

  // Get URL analytics
  getAnalytics: async (id: number) => {
    const response = await api.get(`/urls/${id}/analytics`)
    return response.data
  },

  // Get daily analytics
  getDailyAnalytics: async (id: number, days: number = 30) => {
    const response = await api.get(`/urls/${id}/analytics/daily?days=${days}`)
    return response.data
  },

  // Get referrer analytics
  getReferrers: async (id: number, limit: number = 10) => {
    const response = await api.get(`/urls/${id}/analytics/referrers?limit=${limit}`)
    return response.data
  },
}

// Redirect API (no auth required)
export const redirectApi = {
  // This would be called directly via window.location or <a> tag
  // Just for reference - actual redirects happen on the backend
  getRedirectUrl: (shortCode: string): string => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:8000'
    return `${baseUrl}/${shortCode}`
  }
}
