import { api } from '../lib/api'
import { DashboardStats } from '@/types'

export const analyticsApi = {
  getDashboardStats: async (): Promise<DashboardStats> => {
    const response = await api.get<DashboardStats>('/analytics/dashboard')
    return response.data
  },
}
