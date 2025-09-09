import { api } from './api'
import { URL, URLCreate, URLUpdate, URLListResponse} from '@/types'
import { PaginateQuery } from './pagination'

export const urlApi = {
  // Create new short URL
  create: async (urlData: URLCreate): Promise<URL> => {
    const response = await api.post<URL>('/urls/', urlData) 
    return response.data
  },

  // Get user's URLs with pagination
  getList: async (params: PaginateQuery): Promise<URLListResponse> => {
    const queryParams = new URLSearchParams()
    if (params.page) queryParams.append('page', params.page.toString())
    if (params.limit) queryParams.append('limit', params.limit.toString())
    
    const response = await api.get<URLListResponse>(`/urls/?${queryParams.toString()}`)
    return response.data
  },

  // Get specific URL by ID
  getById: async (id: string): Promise<URL> => {
    const response = await api.get<URL>(`/urls/${id}`)
    return response.data
  },

  // Update URL
  update: async (id: string, urlData: URLUpdate): Promise<URL> => {
    const response = await api.put<URL>(`/urls/${id}`, urlData)
    return response.data
  },

  // Delete URL
  delete: async (id: string): Promise<void> => {
    await api.delete(`/urls/${id}`)
  },

  // Get URL analytics
  getAnalytics: async (id: string) => {
    const response = await api.get(`/urls/${id}/analytics`)
    return response.data
  },

  // Get daily analytics
  getDailyAnalytics: async (id: string, days: number = 30) => {
    const response = await api.get(`/urls/${id}/analytics/daily?days=${days}`)
    return response.data
  },

  // Get referrer analytics
  getReferrers: async (id: string, limit: number = 10) => {
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
