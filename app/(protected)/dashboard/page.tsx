'use client'

import { useEffect, useState } from 'react'
import { AuthGuard } from '@/components/auth/auth-guard'
import { MainLayout } from '@/components/layout/main-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Link2, BarChart3, MousePointerClick, TrendingUp } from 'lucide-react'
import { analyticsApi } from '@/lib/analytics-api'
import { DashboardStats } from '@/types'
import { formatNumber } from '@/lib/utils'
import Link from 'next/link'

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await analyticsApi.getDashboardStats()
        setStats(data)
      } catch (error) {
        console.error('Failed to fetch dashboard stats:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  const StatCard = ({ title, value, description, icon: Icon, loading }: {
    title: string
    value: number
    description: string
    icon: any
    loading: boolean
  }) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {loading ? <Skeleton className="h-8 w-16" /> : formatNumber(value)}
        </div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )

  return (
    <AuthGuard>
      <MainLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <p className="text-muted-foreground">
                Overview of your URL shortening activity
              </p>
            </div>
            <Button asChild>
              <Link href="/urls/create">Create Short Link</Link>
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Total URLs"
              value={stats?.total_urls || 0}
              description="Links you've created"
              icon={Link2}
              loading={loading}
            />
            <StatCard
              title="Total Clicks"
              value={stats?.total_clicks || 0}
              description="All-time clicks"
              icon={MousePointerClick}
              loading={loading}
            />
            <StatCard
              title="Active URLs"
              value={stats?.active_urls || 0}
              description="Currently active links"
              icon={TrendingUp}
              loading={loading}
            />
            <StatCard
              title="Avg. Clicks"
              value={stats ? Math.round((stats.total_clicks / stats.total_urls) || 0) : 0}
              description="Per link average"
              icon={BarChart3}
              loading={loading}
            />
          </div>

          {/* Top Performing URLs */}
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Links</CardTitle>
              <CardDescription>
                Your most clicked URLs this month
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex items-center space-x-4">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div className="space-y-2 flex-1">
                        <Skeleton className="h-4 w-full max-w-sm" />
                        <Skeleton className="h-3 w-full max-w-xs" />
                      </div>
                      <Skeleton className="h-4 w-16" />
                    </div>
                  ))}
                </div>
              ) : stats?.top_urls && stats.top_urls.length > 0 ? (
                <div className="space-y-4">
                  {stats.top_urls.map((url, index) => (
                    <div key={url.short_code} className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-sm font-medium">
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          /{url.short_code}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {url.original_url}
                        </p>
                      </div>
                      <div className="text-sm font-medium">
                        {formatNumber(url.clicks)} clicks
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Link2 className="mx-auto h-12 w-12 text-muted-foreground/50" />
                  <h3 className="mt-4 text-lg font-semibold">No URLs yet</h3>
                  <p className="text-muted-foreground">
                    Create your first short URL to see analytics here.
                  </p>
                  <Button className="mt-4" asChild>
                    <Link href="/urls/create">Create Short Link</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Link2 className="mr-2 h-5 w-5" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button asChild className="w-full justify-start">
                  <Link href="/urls/create">Create New Short Link</Link>
                </Button>
                <Button variant="outline" asChild className="w-full justify-start">
                  <Link href="/urls">Manage All URLs</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="mr-2 h-5 w-5" />
                  Analytics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" asChild className="w-full justify-start">
                  <Link href="/urls">View Detailed Analytics</Link>
                </Button>
                <Button variant="outline" asChild className="w-full justify-start">
                  <Link href="/profile">Account Settings</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </MainLayout>
    </AuthGuard>
  )
}
