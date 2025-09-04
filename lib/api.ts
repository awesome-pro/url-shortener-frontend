import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import Cookies from 'js-cookie'
import { toast } from 'sonner'

// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = Cookies.get('access_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      Cookies.remove('access_token')
      if (typeof window !== 'undefined') {
        window.location.href = '/auth/login'
      }
    } else if (error.response?.status >= 500) {
      toast.error('Server error. Please try again later.')
    } else if (error.response?.data?.detail) {
      toast.error(error.response.data.detail)
    } else if (error.message) {
      toast.error(error.message)
    }
    return Promise.reject(error)
  }
)

// Generic API methods
export const api = {
  get: <T>(url: string, config?: AxiosRequestConfig) => 
    apiClient.get<T>(url, config),
  
  post: <T>(url: string, data?: any, config?: AxiosRequestConfig) => 
    apiClient.post<T>(url, data, config),
  
  put: <T>(url: string, data?: any, config?: AxiosRequestConfig) => 
    apiClient.put<T>(url, data, config),
  
  delete: <T>(url: string, config?: AxiosRequestConfig) => 
    apiClient.delete<T>(url, config),
  
  patch: <T>(url: string, data?: any, config?: AxiosRequestConfig) => 
    apiClient.patch<T>(url, data, config),
}

export default apiClient
