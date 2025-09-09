'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Badge } from '@/components/ui/badge'
import {
  Search,
  Filter,
  X,
  Calendar,
  SortAsc,
  SortDesc,
} from 'lucide-react'
import { URLStatus } from '@/types'

export interface FilterOptions {
  search: string
  status: URLStatus | 'all'
  sortBy: 'created_at' | 'click_count' | 'title'
  sortOrder: 'asc' | 'desc'
  dateRange: 'all' | '7d' | '30d' | '90d'
}

interface URLSearchFilterProps {
  filters: FilterOptions
  onFiltersChange: (filters: FilterOptions) => void
  totalCount: number
  filteredCount: number
}

export function URLSearchFilter({
  filters,
  onFiltersChange,
  totalCount,
  filteredCount,
}: URLSearchFilterProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const updateFilter = (key: keyof FilterOptions, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    })
  }

  const clearFilters = () => {
    onFiltersChange({
      search: '',
      status: 'all',
      sortBy: 'created_at',
      sortOrder: 'desc',
      dateRange: 'all',
    })
  }

  const hasActiveFilters = filters.search || 
    filters.status !== 'all' || 
    filters.dateRange !== 'all' ||
    filters.sortBy !== 'created_at' ||
    filters.sortOrder !== 'desc'

  const getActiveFilterCount = () => {
    let count = 0
    if (filters.search) count++
    if (filters.status !== 'all') count++
    if (filters.dateRange !== 'all') count++
    if (filters.sortBy !== 'created_at' || filters.sortOrder !== 'desc') count++
    return count
  }

  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="space-y-4">
          {/* Search and Filter Toggle */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search by title, URL, or short code..."
                value={filters.search}
                onChange={(e) => updateFilter('search', e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex space-x-2">
              <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="relative">
                    <Filter className="mr-2 h-4 w-4" />
                    Filters
                    {hasActiveFilters && (
                      <Badge
                        variant="secondary"
                        className="ml-2 h-5 w-5 p-0 text-xs flex items-center justify-center"
                      >
                        {getActiveFilterCount()}
                      </Badge>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80" align="end">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Filters</h4>
                      {hasActiveFilters && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={clearFilters}
                        >
                          <X className="mr-1 h-3 w-3" />
                          Clear
                        </Button>
                      )}
                    </div>

                    {/* Status Filter */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Status</label>
                      <Select
                        value={filters.status}
                        onValueChange={(value) => updateFilter('status', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Status</SelectItem>
                          <SelectItem value={URLStatus.ACTIVE}>Active</SelectItem>
                          <SelectItem value={URLStatus.INACTIVE}>Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Date Range */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Date Range</label>
                      <Select
                        value={filters.dateRange}
                        onValueChange={(value) => updateFilter('dateRange', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Time</SelectItem>
                          <SelectItem value="7d">Last 7 Days</SelectItem>
                          <SelectItem value="30d">Last 30 Days</SelectItem>
                          <SelectItem value="90d">Last 90 Days</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Sort Options */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Sort By</label>
                      <div className="flex space-x-2">
                        <Select
                          value={filters.sortBy}
                          onValueChange={(value) => updateFilter('sortBy', value)}
                        >
                          <SelectTrigger className="flex-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="created_at">Date Created</SelectItem>
                            <SelectItem value="click_count">Click Count</SelectItem>
                            <SelectItem value="title">Title</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => 
                            updateFilter('sortOrder', filters.sortOrder === 'asc' ? 'desc' : 'asc')
                          }
                          className="px-3"
                        >
                          {filters.sortOrder === 'asc' ? (
                            <SortAsc className="h-4 w-4" />
                          ) : (
                            <SortDesc className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>

              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="px-3"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Active Filters Display */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t">
              <span className="text-sm text-muted-foreground">Active filters:</span>
              
              {filters.search && (
                <Badge variant="secondary" className="gap-1">
                  Search: {filters.search}
                  <button
                    onClick={() => updateFilter('search', '')}
                    className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}

              {filters.status !== 'all' && (
                <Badge variant="secondary" className="gap-1">
                  Status: {filters.status}
                  <button
                    onClick={() => updateFilter('status', 'all')}
                    className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}

              {filters.dateRange !== 'all' && (
                <Badge variant="secondary" className="gap-1">
                  Date: {filters.dateRange === '7d' ? 'Last 7 days' : 
                         filters.dateRange === '30d' ? 'Last 30 days' : 
                         'Last 90 days'}
                  <button
                    onClick={() => updateFilter('dateRange', 'all')}
                    className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
            </div>
          )}

          {/* Results Count */}
          <div className="text-sm text-muted-foreground">
            {filteredCount === totalCount ? (
              `Showing all ${totalCount} URLs`
            ) : (
              `Showing ${filteredCount} of ${totalCount} URLs`
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}