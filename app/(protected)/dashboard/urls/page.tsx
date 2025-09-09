'use client'

import { useEffect, useState, useCallback } from 'react'
import { URL, URLListResponse, URLStatus } from '@/types'
import { urlApi } from '@/lib/url-api'
import { copyToClipboard, formatNumber } from '@/lib/utils'
import { toast } from 'sonner'

// Import new modular components
import { URLsHeader } from '@/components/layout/urls-header'
import { URLSearchFilter, FilterOptions } from '@/components/layout/url-filter'
import { URLCard } from '@/components/layout/url-card'
import { URLPagination } from '@/components/layout/url-pagination'
import { URLSkeleton } from '@/components/layout/url-skeleton'
import { URLEmptyState } from '@/components/layout/url-empty-state'
import { URLListContainer } from '@/components/layout/url-list-container'

export default function URLsPage() {
  const [urls, setUrls] = useState<URLListResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [filters, setFilters] = useState<FilterOptions>({
    search: '',
    status: 'all',
    sortBy: 'created_at',
    sortOrder: 'desc',
    dateRange: 'all',
  })

  const fetchUrls = useCallback(async (page: number = 1, limit: number = 10) => {
    try {
      setLoading(true)
      const data = await urlApi.getList({ page, limit })
      setUrls(data)
    } catch (error) {
      console.error('Failed to fetch URLs:', error)
      toast.error('Failed to load URLs')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchUrls(currentPage, pageSize)
  }, [currentPage, pageSize, fetchUrls])

  // Filter and sort URLs client-side
  const filteredUrls = urls?.data.filter(url => {
    // Search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase()
      const matchesSearch = 
        url.original_url.toLowerCase().includes(searchTerm) ||
        url.short_code.toLowerCase().includes(searchTerm) ||
        url.title?.toLowerCase().includes(searchTerm) ||
        url.description?.toLowerCase().includes(searchTerm)
      if (!matchesSearch) return false
    }

    // Status filter
    if (filters.status !== 'all' && url.status !== filters.status) {
      return false
    }

    // Date range filter
    if (filters.dateRange !== 'all') {
      const createdAt = new Date(url.created_at)
      const now = new Date()
      const daysAgo = {
        '7d': 7,
        '30d': 30,
        '90d': 90,
      }[filters.dateRange]
      
      if (daysAgo) {
        const cutoffDate = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000)
        if (createdAt < cutoffDate) return false
      }
    }

    return true
  }).sort((a, b) => {
    // Sorting logic
    let comparison = 0
    
    switch (filters.sortBy) {
      case 'created_at':
        comparison = new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        break
      case 'click_count':
        comparison = a.click_count - b.click_count
        break
      case 'title':
        const titleA = a.title || a.short_code
        const titleB = b.title || b.short_code
        comparison = titleA.localeCompare(titleB)
        break
    }

    return filters.sortOrder === 'desc' ? -comparison : comparison
  }) || []

  // Calculate stats for header
  const totalUrls = urls?.data.length || 0
  const activeUrls = urls?.data.filter(url => url.status === URLStatus.ACTIVE).length || 0
  const totalClicks = urls?.data.reduce((sum, url) => sum + url.click_count, 0) || 0

  const handleCopy = useCallback(async (shortUrl: string) => {
    try {
      await copyToClipboard(shortUrl)
      toast.success('Copied to clipboard!')
    } catch (err) {
      toast.error('Failed to copy to clipboard')
    }
  }, [])

  const handleDelete = useCallback(async (id: string) => {
    try {
      await urlApi.delete(id)
      toast.success('URL deleted successfully')
      await fetchUrls(currentPage, pageSize)
    } catch (error) {
      toast.error('Failed to delete URL')
      throw error // Re-throw to let URLCard handle loading state
    }
  }, [currentPage, pageSize, fetchUrls])

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page)
  }, [])

  const handleLimitChange = useCallback((limit: number) => {
    setPageSize(limit)
    setCurrentPage(1) // Reset to first page when changing page size
  }, [])

  const handleFiltersChange = useCallback((newFilters: FilterOptions) => {
    setFilters(newFilters)
    setCurrentPage(1) // Reset to first page when filters change
  }, [])

  const clearFilters = useCallback(() => {
    setFilters({
      search: '',
      status: 'all',
      sortBy: 'created_at',
      sortOrder: 'desc',
      dateRange: 'all',
    })
    setCurrentPage(1)
  }, [])

  const hasActiveFilters = filters.search || 
    filters.status !== 'all' || 
    filters.dateRange !== 'all' ||
    filters.sortBy !== 'created_at' ||
    filters.sortOrder !== 'desc'

  return (
    <URLListContainer>
      {/* Header with Stats */}
      <URLsHeader 
        totalUrls={totalUrls}
        activeUrls={activeUrls}
        totalClicks={totalClicks}
      />

      {/* Search and Filters */}
      <URLSearchFilter
        filters={filters}
        onFiltersChange={handleFiltersChange}
        totalCount={totalUrls}
        filteredCount={filteredUrls.length}
      />

      {/* Main Content */}
      <main className="space-y-6" role="main" aria-label="URLs management">
        {loading ? (
          <URLSkeleton count={pageSize} />
        ) : filteredUrls.length > 0 ? (
          <>
            {/* URLs List */}
            <section 
              className="space-y-4" 
              aria-label={`${filteredUrls.length} URL${filteredUrls.length === 1 ? '' : 's'} found`}
            >
              {filteredUrls.map((url) => (
                <URLCard 
                  key={url.id} 
                  url={url} 
                  onDelete={handleDelete}
                  onCopy={handleCopy}
                />
              ))}
            </section>

            {/* Pagination */}
            {urls && urls.pagination.total_pages > 1 && (
              <nav aria-label="URLs pagination">
                <URLPagination
                  pagination={urls.pagination}
                  onPageChange={handlePageChange}
                  onLimitChange={handleLimitChange}
                  loading={loading}
                />
              </nav>
            )}
          </>
        ) : (
          <URLEmptyState
            isFiltered={Boolean(hasActiveFilters)}
            searchTerm={filters.search}
            onClearFilters={clearFilters}
          />
        )}
      </main>
    </URLListContainer>
  )
}