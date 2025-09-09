'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Link2, Plus, Search, Zap } from 'lucide-react'

interface URLEmptyStateProps {
  isFiltered?: boolean
  searchTerm?: string
  onClearFilters?: () => void
}

export function URLEmptyState({ 
  isFiltered = false, 
  searchTerm = '',
  onClearFilters 
}: URLEmptyStateProps) {
  if (isFiltered) {
    return (
      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <div className="rounded-full bg-muted p-4 mb-4">
            <Search className="h-8 w-8 text-muted-foreground" />
          </div>
          
          <h3 className="text-xl font-semibold mb-2">No URLs found</h3>
          <p className="text-muted-foreground mb-6 max-w-md">
            {searchTerm 
              ? `No URLs match "${searchTerm}". Try adjusting your search terms or filters.`
              : "No URLs match your current filters. Try adjusting your filter criteria."
            }
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3">
            {onClearFilters && (
              <Button variant="outline" onClick={onClearFilters}>
                Clear Filters
              </Button>
            )}
            <Button asChild>
              <Link href="/dashboard/urls/create">
                <Plus className="mr-2 h-4 w-4" />
                Create New URL
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-dashed">
      <CardContent className="flex flex-col items-center justify-center py-16 text-center">
        <div className="rounded-full bg-gradient-to-br from-primary/20 to-primary/10 p-6 mb-6">
          <Link2 className="h-12 w-12 text-primary" />
        </div>
        
        <h3 className="text-2xl font-semibold mb-3">No URLs yet</h3>
        <p className="text-muted-foreground mb-8 max-w-md">
          Get started by creating your first short URL. Transform long, complex links 
          into clean, shareable URLs that are easy to remember and track.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Button size="lg" asChild>
            <Link href="/dashboard/urls/create">
              <Plus className="mr-2 h-5 w-5" />
              Create Your First URL
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/dashboard">
              <Zap className="mr-2 h-5 w-5" />
              View Dashboard
            </Link>
          </Button>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12 text-sm text-muted-foreground">
          <div className="flex flex-col items-center">
            <div className="rounded-lg bg-muted p-2 mb-2">
              <Link2 className="h-4 w-4" />
            </div>
            <span>Custom short codes</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="rounded-lg bg-muted p-2 mb-2">
              <Search className="h-4 w-4" />
            </div>
            <span>Click analytics</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="rounded-lg bg-muted p-2 mb-2">
              <Zap className="h-4 w-4" />
            </div>
            <span>Expiration dates</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
