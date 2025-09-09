'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Plus, Link2, BarChart3, Settings } from 'lucide-react'

interface URLsHeaderProps {
  totalUrls: number
  activeUrls: number
  totalClicks: number
}

export function URLsHeader({ totalUrls, activeUrls, totalClicks }: URLsHeaderProps) {
  return (
    <div className="space-y-6">
      {/* Main Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Your <span className='text-primary'>Power Links</span></h1>
          <p className="text-muted-foreground mt-1">
            Manage and track all your shortened links
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard">
              <BarChart3 className="mr-2 h-4 w-4" />
              Dashboard
            </Link>
          </Button>
          <Button asChild>
            <Link href="/dashboard/urls/create">
              <Plus className="mr-2 h-4 w-4" />
              Create URL
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-700 dark:text-blue-300">Total URLs</p>
              <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">{totalUrls}</p>
            </div>
            <div className="rounded-full bg-blue-200 dark:bg-blue-800 p-2">
              <Link2 className="h-5 w-5 text-blue-700 dark:text-blue-300" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 rounded-lg p-4 border border-green-200 dark:border-green-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-700 dark:text-green-300">Active URLs</p>
              <p className="text-2xl font-bold text-green-900 dark:text-green-100">{activeUrls}</p>
            </div>
            <div className="rounded-full bg-green-200 dark:bg-green-800 p-2">
              <Settings className="h-5 w-5 text-green-700 dark:text-green-300" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-700 dark:text-purple-300">Total Clicks</p>
              <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">{totalClicks}</p>
            </div>
            <div className="rounded-full bg-purple-200 dark:bg-purple-800 p-2">
              <BarChart3 className="h-5 w-5 text-purple-700 dark:text-purple-300" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
