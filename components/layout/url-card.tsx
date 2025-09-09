'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  MoreHorizontal,
  Copy,
  BarChart3,
  Edit,
  Trash2,
  ExternalLink,
  Eye,
  Calendar,
  Clock,
} from 'lucide-react'
import { URL, URLStatus } from '@/types'
import { formatDateTime, formatNumber, shortenUrl } from '@/lib/utils'

interface URLCardProps {
  url: URL
  onDelete: (id: string) => Promise<void>
  onCopy: (shortUrl: string) => Promise<void>
}

export function URLCard({ url, onDelete, onCopy }: URLCardProps) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this URL? This action cannot be undone.')) {
      return
    }

    try {
      setIsDeleting(true)
      await onDelete(url.id)
    } finally {
      setIsDeleting(false)
    }
  }

  const getStatusColor = (status: URLStatus) => {
    switch (status) {
      case URLStatus.ACTIVE:
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
      case URLStatus.INACTIVE:
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
    }
  }

  const isExpired = url.expires_at && new Date(url.expires_at) < new Date()

  return (
    <Card className="group hover:shadow-md transition-all duration-200 border-l-4 border-l-primary/20 hover:border-l-primary">
      <CardContent className="p-4 sm:p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3 min-w-0 flex-1">
          <h3 className="font-semibold text-lg truncate">
                {url.title || url.short_code}
              </h3>
              <div className="flex items-center space-x-2 mt-1">
                <Badge 
                  variant="secondary" 
                  className={getStatusColor(url.status)}
                >
                  {url.status}
                </Badge>
                {isExpired && (
                  <Badge variant="destructive" className="text-xs">
                    Expired
                  </Badge>
                )}
              </div>
           
          </div>

         <div className="hidden lg:flex items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href={`/dashboard/urls/${url.id}/edit`}>
                <Edit className="mr-1 h-3 w-3" />
                Edit
              </Link>
            </Button>
            <Button size="sm" asChild>
              <Link href={`/dashboard/urls/${url.id}/analytics`}>
                <BarChart3 className="mr-1 h-3 w-3" />
                Analytics
              </Link>
            </Button>
            <Button variant="destructive" size="sm" asChild>
              <Link href={`/dashboard/urls/${url.id}/analytics`} onClick={handleDelete}>
                <Trash2 className="mr-1 h-3 w-3" />
                Delete
              </Link>
            </Button>
         </div>
        </div>

        {/* Description */}
        {url.description && (
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {url.description}
          </p>
        )}

        {/* URLs */}
        <div className="flex flex-col lg:flex-row gap-2">
          {/* Short URL */}
        
            
            <div className="flex items-center space-x-2 p-2 bg-muted/50 rounded-lg">
              <code className="text-base font-mono text-primary flex-1 truncate font-bold">
                {url.short_url}
              </code>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onCopy(url.short_url)}
                className="h-6 w-6 p-0"
              >
                <Copy className="h-3 w-3" />
              </Button>
            
          </div>

          {/* Original URL */}
          
            <div className="flex items-center space-x-2 p-2 bg-muted/30 rounded-lg">
              <Link
                href={url.original_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-foreground hover:text-primary truncate flex-1 transition-colors"
                title={url.original_url}
              >
                {shortenUrl(url.original_url, 50)}
              </Link>
              <ExternalLink className="h-3 w-3 text-muted-foreground flex-shrink-0" />
          </div>
        </div>

        {/* Stats & Info */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t">
          <div className="flex items-center gap-1 text-xs">
            <Eye className="h-4 w-4 text-muted-foreground" />
            {formatNumber(url.click_count)}
          </div>
          
          <div className="flex items-center text-blue-600 gap-1 text-xs">
            <Calendar className="h-4 w-4 text-blue-600" />
            {formatDateTime(url.created_at)}
          </div>

          {url.expires_at && (
            <div className="flex items-center gap-1 text-red-500 text-xs">
                <Clock className="h-4 w-4 text-red-500" />
                {formatDateTime(url.expires_at)}
            </div>
          )}
        </div>

        {/* Mobile Actions */}
        <div className="flex sm:hidden mt-4 pt-4 border-t space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onCopy(url.short_url)}
            className="flex-1"
          >
            <Copy className="mr-1 h-3 w-3" />
            Copy
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link href={`/dashboard/urls/${url.id}/analytics`}>
              <BarChart3 className="mr-1 h-3 w-3" />
              Analytics
            </Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link href={`/dashboard/urls/${url.id}/edit`}>
              <Edit className="mr-1 h-3 w-3" />
              Edit
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}