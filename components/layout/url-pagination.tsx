'use client'

import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginationInfo {
  page: number
  limit: number
  total: number
  total_pages: number
  has_previous: boolean
  has_next: boolean
}

interface URLPaginationProps {
  pagination: PaginationInfo
  onPageChange: (page: number) => void
  onLimitChange: (limit: number) => void
  loading?: boolean
}

export function URLPagination({
  pagination,
  onPageChange,
  onLimitChange,
  loading = false,
}: URLPaginationProps) {
  const { page, limit, total, total_pages, has_previous, has_next } = pagination

  // Generate page numbers to display
  const getPageNumbers = () => {
    const delta = 2
    const range = []
    const rangeWithDots = []

    for (
      let i = Math.max(2, page - delta);
      i <= Math.min(total_pages - 1, page + delta);
      i++
    ) {
      range.push(i)
    }

    if (page - delta > 2) {
      rangeWithDots.push(1, '...')
    } else {
      rangeWithDots.push(1)
    }

    rangeWithDots.push(...range)

    if (page + delta < total_pages - 1) {
      rangeWithDots.push('...', total_pages)
    } else if (total_pages > 1) {
      rangeWithDots.push(total_pages)
    }

    return rangeWithDots
  }

  const startItem = (page - 1) * limit + 1
  const endItem = Math.min(page * limit, total)

  if (total_pages <= 1) {
    return null
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
      {/* Results Info and Items Per Page */}
      <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-muted-foreground">
        <span>
          Showing {startItem}-{endItem} of {total} URLs
        </span>
        
        <div className="flex items-center space-x-2">
          <span>Show:</span>
          <Select
            value={limit.toString()}
            onValueChange={(value) => onLimitChange(Number(value))}
            disabled={loading}
          >
            <SelectTrigger className="w-20 h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
          <span>per page</span>
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center space-x-2">
        {/* Mobile Pagination */}
        <div className="flex sm:hidden items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(page - 1)}
            disabled={!has_previous || loading}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <span className="text-sm font-medium px-3">
            {page} of {total_pages}
          </span>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(page + 1)}
            disabled={!has_next || loading}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Desktop Pagination */}
        <div className="hidden sm:block">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => onPageChange(page - 1)}
                  className={
                    !has_previous || loading
                      ? 'pointer-events-none opacity-50'
                      : 'cursor-pointer hover:bg-accent'
                  }
                />
              </PaginationItem>

              {getPageNumbers().map((pageNumber, index) => (
                <PaginationItem key={index}>
                  {pageNumber === '...' ? (
                    <PaginationEllipsis />
                  ) : (
                    <PaginationLink
                      onClick={() => onPageChange(Number(pageNumber))}
                      isActive={page === pageNumber}
                      className="cursor-pointer hover:bg-accent"
                    //   disabled={loading}
                    >
                      {pageNumber}
                    </PaginationLink>
                  )}
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  onClick={() => onPageChange(page + 1)}
                  className={
                    !has_next || loading
                      ? 'pointer-events-none opacity-50'
                      : 'cursor-pointer hover:bg-accent'
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>

        {/* Quick Jump to Page */}
        {total_pages > 10 && (
          <div className="hidden md:flex items-center space-x-2 ml-4">
            <span className="text-sm text-muted-foreground">Go to:</span>
            <Select
              value={page.toString()}
              onValueChange={(value) => onPageChange(Number(value))}
              disabled={loading}
            >
              <SelectTrigger className="w-16 h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: total_pages }, (_, i) => i + 1).map((p) => (
                  <SelectItem key={p} value={p.toString()}>
                    {p}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
    </div>
  )
}