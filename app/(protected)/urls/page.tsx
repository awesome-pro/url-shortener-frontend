'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import {
  Link2,
  MoreHorizontal,
  Copy,
  BarChart3,
  Edit,
  Trash2,
  ExternalLink,
  Search,
  Plus,
} from 'lucide-react'
import { URL, URLListResponse, URLStatus } from '@/types'
import { urlApi, redirectApi } from '@/lib/url-api'
import { formatDateTime, formatNumber, copyToClipboard, shortenUrl } from '@/lib/utils'
import { toast }from 'sonner'

export default function URLsPage() {
  const [urls, setUrls] = useState<URLListResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')

  const fetchUrls = async (page: number = 1) => {
    try {
      setLoading(true)
      const data = await urlApi.getList({ page, limit: 10 })
      setUrls(data)
    } catch (error) {
      console.error('Failed to fetch URLs:', error)
      toast.error('Failed to load URLs')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUrls(currentPage)
  }, [currentPage])

  const handleCopy = async (shortUrl: string) => {
    try {
      await copyToClipboard(shortUrl)
      toast.success('Copied to clipboard!')
    } catch (err) {
      toast.error('Failed to copy to clipboard')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this URL?')) {
      return
    }

    try {
      await urlApi.delete(id)
      toast.success('URL deleted successfully')
      fetchUrls(currentPage)
    } catch (error) {
      toast.error('Failed to delete URL')
    }
  }

  const filteredUrls = urls?.data.filter(url =>
    url.original_url.toLowerCase().includes(searchTerm.toLowerCase()) ||
    url.short_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    url.title?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || []

  const URLCard = ({ url }: { url: URL }) => (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-2">
              <Link2 className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <h3 className="font-semibold truncate">
                {url.title || `/${url.short_code}`}
              </h3>
              <Badge variant={url.status === URLStatus.ACTIVE ? 'default' : 'secondary'}>
                {url.status}
              </Badge>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">Short:</span>
                <code className="text-sm bg-muted px-2 py-1 rounded font-mono">
                  {url.short_url}
                </code>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleCopy(url.short_url)}
                >
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">Original:</span>
                <a
                  href={url.original_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline truncate flex-1"
                >
                  {shortenUrl(url.original_url, 60)}
                </a>
                <ExternalLink className="h-3 w-3 text-muted-foreground flex-shrink-0" />
              </div>
            </div>

            <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
              <span>{formatNumber(url.click_count)} clicks</span>
              <span>Created {formatDateTime(url.created_at)}</span>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => handleCopy(url.short_url)}>
                <Copy className="mr-2 h-4 w-4" />
                Copy Link
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/urls/${url.id}/analytics`}>
                  <BarChart3 className="mr-2 h-4 w-4" />
                  View Analytics
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/urls/${url.id}/edit`}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => handleDelete(url.id)}
                className="text-destructive"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Your URLs</h1>
          <p className="text-muted-foreground">
            Manage and track all your shortened links
          </p>
        </div>
        <Button asChild>
          <Link href="/urls/create">
            <Plus className="mr-2 h-4 w-4" />
            Create URL
          </Link>
        </Button>
      </div>

      {/* Search */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search URLs by title, code, or original URL..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* URLs List */}
      {loading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="space-y-3">
                  <Skeleton className="h-4 w-full max-w-md" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full max-w-lg" />
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : filteredUrls.length > 0 ? (
        <>
          <div className="space-y-4 mb-8">
            {filteredUrls.map((url) => (
              <URLCard key={url.id} url={url} />
            ))}
          </div>

          {/* Pagination */}
          {urls && urls.pagination.total_pages > 1 && (
            <div className="flex justify-center">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    />
                  </PaginationItem>
                  
                  {[...Array(Math.min(5, urls.pagination.total_pages))].map((_, i) => {
                    const page = i + 1
                    return (
                      <PaginationItem key={page}>
                        <PaginationLink
                          onClick={() => setCurrentPage(page)}
                          isActive={currentPage === page}
                          className="cursor-pointer"
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    )
                  })}
                  
                  {urls.pagination.total_pages > 5 && (
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )}
                  
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => setCurrentPage(Math.min(urls.pagination.total_pages, currentPage + 1))}
                      className={currentPage === urls.pagination.total_pages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </>
      ) : (
        <Card>
          <CardContent className="text-center py-12">
            <Link2 className="mx-auto h-12 w-12 text-muted-foreground/50" />
            <h3 className="mt-4 text-lg font-semibold">
              {searchTerm ? 'No URLs found' : 'No URLs yet'}
            </h3>
            <p className="text-muted-foreground mt-2">
              {searchTerm
                ? 'Try adjusting your search terms'
                : 'Create your first short URL to get started'
              }
            </p>
            {!searchTerm && (
              <Button className="mt-4" asChild>
                <Link href="/urls/create">Create Short URL</Link>
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}