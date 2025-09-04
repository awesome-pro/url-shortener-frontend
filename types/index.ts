// User Types
export enum UserRole {
  ADMIN = 'admin',
  USER = 'user'
}

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive'
}

export interface User {
  id: number
  email: string
  username: string
  status: UserStatus
  created_at: string
}

export interface UserProfile extends User {
  updated_at: string
  total_urls?: number
  total_clicks?: number
}

export interface UserCreate {
  email: string
  username: string
  password: string
}

export interface UserLogin {
  email: string
  password: string
}

export interface AuthResponse {
  access_token: string
  token_type: string
}

// URL Types
export enum URLStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive'
}

export interface URL {
  id: number
  original_url: string
  short_code: string
  title?: string
  description?: string
  status: URLStatus
  click_count: number
  created_at: string
  updated_at: string
  expires_at?: string
  short_url: string
}

export interface URLCreate {
  original_url: string
  title?: string
  description?: string
  custom_code?: string
  expires_at?: string
}

export interface URLUpdate {
  title?: string
  description?: string
  status?: URLStatus
  expires_at?: string
}

export interface URLListResponse {
  urls: URL[]
  total: number
  page: number
  per_page: number
  pages: number
}

// Analytics Types
export interface URLAnalytics {
  url_id: number
  short_code: string
  original_url: string
  total_clicks: number
  clicks_today: number
  clicks_this_week: number
  clicks_this_month: number
  created_at: string
  last_clicked?: string
}

export interface ClickAnalytics {
  date: string
  clicks: number
}

export interface URLDetailedAnalytics extends URLAnalytics {
  daily_clicks: ClickAnalytics[]
  top_referrers: Array<{
    referer: string
    count: number
  }>
  top_countries: Array<{
    country: string
    count: number
  }>
}

export interface DashboardStats {
  total_urls: number
  total_clicks: number
  active_urls: number
  top_urls: Array<{
    short_code: string
    original_url: string
    clicks: number
  }>
}

// API Response Types
export interface ApiResponse<T> {
  data?: T
  message?: string
  error?: any
}

export interface PaginationParams {
  page?: number
  per_page?: number
}

// Form Types
export interface LoginFormData {
  email: string
  password: string
}

export interface RegisterFormData {
  email: string
  username: string
  password: string
  confirmPassword: string
}

export interface CreateURLFormData {
  original_url: string
  title?: string
  description?: string
  custom_code?: string
  expires_at?: Date
}
