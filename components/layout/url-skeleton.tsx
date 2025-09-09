'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

interface URLSkeletonProps {
  count?: number
}

export function URLSkeleton({ count = 5 }: URLSkeletonProps) {
  return (
    <div className="space-y-4" role="status" aria-label="Loading URLs">
      {Array.from({ length: count }, (_, i) => (
        <Card key={i} className="animate-pulse">
          <CardContent className="p-4 sm:p-6">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3 min-w-0 flex-1">
                <Skeleton className="h-10 w-10 rounded-lg" />
                <div className="min-w-0 flex-1">
                  <Skeleton className="h-5 w-3/4 mb-2" />
                  <div className="flex items-center space-x-2">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-12" />
                  </div>
                </div>
              </div>
              <Skeleton className="h-8 w-8" />
            </div>

            {/* Description */}
            <Skeleton className="h-4 w-full mb-4" />

            {/* URLs */}
            <div className="space-y-3 mb-4">
              <div className="space-y-2">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t">
              {Array.from({ length: 4 }, (_, j) => (
                <div key={j} className="flex items-center space-x-2">
                  <Skeleton className="h-4 w-4" />
                  <div>
                    <Skeleton className="h-4 w-12 mb-1" />
                    <Skeleton className="h-3 w-8" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
