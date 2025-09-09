import { PaginateResponse, Pagination } from "@/lib/pagination"
import { Country } from "country-state-city"

export enum URLStatus {
    ACTIVE = "active",
    INACTIVE = "inactive",
}

export interface URL {
    id: string
    original_url: string
    short_code: string
    title?: string
    description?: string
    status: URLStatus
    click_count: number
    created_at: Date
    updated_at: Date
    expires_at?: Date
    short_url: string
  }


export interface URLCreate {
    original_url: string
    title?: string
    description?: string
    custom_code?: string
    expires_at?: Date
}

export interface URLUpdate extends URLCreate {
    status?: URLStatus
}

export interface URLListResponse extends PaginateResponse<URL> {
    data: URL[]
    pagination: Pagination
}

export interface URLAnalytics {
    url_id: string
    total_clicks: number
    clicks_today: number
    clicks_this_week: number
    clicks_this_month: number
    daily_clicks: {
        date: Date
        clicks: number
    }[]
    referrers: {
        referrer: string
        clicks: number
    }[]
    last_clicked: Date
    created_at: Date
}

export interface ClickAnalytics {
    date: Date
    clicks: number
}

export interface URLDetailedAnalytics extends URLAnalytics {
    daily_clicks: ClickAnalytics[]
    top_referrers: Array<{
      referer: string
      count: number
    }>
    top_countries: Array<{
      country: typeof Country
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
