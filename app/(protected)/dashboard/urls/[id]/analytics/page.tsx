'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts'
import {
  ArrowLeft,
  MousePointerClick,
  Calendar,
  TrendingUp,
  ExternalLink,
  Copy,
} from 'lucide-react'
import { urlApi } from '@/lib/url-api'
import { URL, URLAnalytics, ClickAnalytics } from '@/types'
import { formatNumber, formatDateTime, copyToClipboard, shortenUrl } from '@/lib/utils'
import {toast }from 'sonner'

export default function URLAnalyticsPage() {
  const params = useParams()
  const urlId = params.id as string
  
  const [url, setUrl] = useState<URL | null>(null)
  const [analytics, setAnalytics] = useState<URLAnalytics | null>(null)
  const [dailyClicks, setDailyClicks] = useState<ClickAnalytics[]>([])
  const [referrers, setReferrers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [urlData, analyticsData, dailyData, referrerData] = await Promise.all([
          urlApi.getById(urlId),
          urlApi.getAnalytics(urlId),
          urlApi.getDailyAnalytics(urlId, 30),
          urlApi.getReferrers(urlId, 10),
        ])
        
        setUrl(urlData)
        setAnalytics(analyticsData as URLAnalytics)
        setDailyClicks(dailyData as ClickAnalytics[] || [])
        setReferrers((referrerData as any).referrers || [])
      } catch (error) {
        console.error('Failed to fetch analytics:', error)
        toast.error('Failed to load analytics data')
      } finally {
        setLoading(false)
      }
    }

    if (urlId) {
      fetchData()
    }
  }, [urlId])

  const handleCopy = async (shortUrl: string) => {
    try {
      await copyToClipboard(shortUrl)
      toast.success('Copied to clipboard!')
    } catch (err) {
      toast.error('Failed to copy to clipboard')
    }
  }

  const StatCard = ({ title, value, description, icon: Icon, loading }: {
    title: string
    value: number | string
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
          {loading ? <Skeleton className="h-8 w-16" /> : value}
        </div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )

  if (loading) {
    return (

          <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
              <Skeleton className="h-8 w-64 mb-2" />
              <Skeleton className="h-4 w-96" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              {[...Array(4)].map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-6">
                    <Skeleton className="h-4 w-20 mb-2" />
                    <Skeleton className="h-8 w-16 mb-2" />
                    <Skeleton className="h-3 w-24" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

    )
  }

  if (!url || !analytics) {
    return (
     
          <div className="container mx-auto px-4 py-8">
            <Card>
              <CardContent className="text-center py-12">
                <h3 className="text-lg font-semibold">URL not found</h3>
                <p className="text-muted-foreground mt-2">
                  The URL you&apos;re looking for doesn&apos;t exist or you don&apos;t have access to it.
                </p>
                <Button asChild className="mt-4">
                  <Link href="/urls">Back to URLs</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
       
    )
  }

  return (

        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-4 mb-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/urls">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to URLs
                </Link>
              </Button>
            </div>
            
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <h1 className="text-3xl font-bold mb-2">
                  {url.title || `/${url.short_code}`}
                </h1>
                
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">Short URL:</span>
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
                    <span className="text-sm text-muted-foreground">Original URL:</span>
                    <a
                      href={url.original_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline"
                    >
                      {shortenUrl(url.original_url, 80)}
                    </a>
                    <ExternalLink className="h-3 w-3 text-muted-foreground" />
                  </div>
                </div>
              </div>
              
              <Badge variant={url.status === 'active' ? 'default' : 'secondary'}>
                {url.status}
              </Badge>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Total Clicks"
              value={formatNumber(analytics.total_clicks)}
              description="All-time clicks"
              icon={MousePointerClick}
              loading={false}
            />
            <StatCard
              title="Today"
              value={formatNumber(analytics.clicks_today)}
              description="Clicks today"
              icon={Calendar}
              loading={false}
            />
            <StatCard
              title="This Week"
              value={formatNumber(analytics.clicks_this_week)}
              description="Clicks this week"
              icon={TrendingUp}
              loading={false}
            />
            <StatCard
              title="This Month"
              value={formatNumber(analytics.clicks_this_month)}
              description="Clicks this month"
              icon={TrendingUp}
              loading={false}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Daily Clicks Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Daily Clicks (Last 30 Days)</CardTitle>
                <CardDescription>
                  Click activity over the past month
                </CardDescription>
              </CardHeader>
              <CardContent>
                {dailyClicks.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={dailyClicks}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="date"
                        tickFormatter={(value) => new Date(value).toLocaleDateString()}
                      />
                      <YAxis />
                      <Tooltip
                        labelFormatter={(value) => new Date(value).toLocaleDateString()}
                      />
                      <Line
                        type="monotone"
                        dataKey="clicks"
                        stroke="hsl(var(--primary))"
                        strokeWidth={2}
                        dot={{ fill: 'hsl(var(--primary))' }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-[300px] text-muted-foreground">
                    No click data available
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Top Referrers */}
            <Card>
              <CardHeader>
                <CardTitle>Top Referrers</CardTitle>
                <CardDescription>
                  Where your clicks are coming from
                </CardDescription>
              </CardHeader>
              <CardContent>
                {referrers.length > 0 ? (
                  <div className="space-y-4">
                    {referrers.slice(0, 10).map((referrer, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">
                            {referrer.referer === 'Direct' 
                              ? 'Direct Traffic' 
                              : referrer.referer
                            }
                          </p>
                        </div>
                        <div className="text-sm font-medium">
                          {formatNumber(referrer.count)} clicks
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    No referrer data available
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* URL Details */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>URL Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-2">Created</h4>
                  <p className="text-muted-foreground">
                    {formatDateTime(analytics.created_at)}
                  </p>
                </div>
                
                {analytics.last_clicked && (
                  <div>
                    <h4 className="font-medium mb-2">Last Clicked</h4>
                    <p className="text-muted-foreground">
                      {formatDateTime(analytics.last_clicked)}
                    </p>
                  </div>
                )}
                
                {url.description && (
                  <div className="md:col-span-2">
                    <h4 className="font-medium mb-2">Description</h4>
                    <p className="text-muted-foreground">{url.description}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

  )
}
