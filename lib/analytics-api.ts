import { api } from './api'
import { DashboardStats } from '@/types'

export const analyticsApi = {
  // Get dashboard statistics
  getDashboardStats: async (): Promise<DashboardStats> => {
    const response = await api.get<DashboardStats>('/analytics/dashboard')
    return response.data
  },
}
