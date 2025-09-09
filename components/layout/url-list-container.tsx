'use client'

import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface URLListContainerProps {
  children: ReactNode
  className?: string
}

export function URLListContainer({ children, className }: URLListContainerProps) {
  return (
    <div 
      className={cn(
        "min-h-screen bg-background",
        className
      )}
    >
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="space-y-6">
          {children}
        </div>
      </div>
    </div>
  )
}
