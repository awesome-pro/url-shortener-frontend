'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer} from 'recharts'
import {
  MousePointerClick,
  Calendar,
  TrendingUp,
  ExternalLink,
  Copy,
  ArrowLeft,
  Eye,
  Globe,
  Clock,
  Users,
  Activity,
  Share2
} from 'lucide-react'
import { copyToClipboard, formatDate, formatDateTime, formatNumber, shortenUrl } from '@/lib/utils'
import MetricCard from './metric-card'
import { ClickAnalytics, URLAnalytics, URL } from '@/types'
import { useParams } from 'next/navigation'
import { urlApi } from '@/lib/url-api'
import { toast } from 'sonner'
import Link from 'next/link'


export default function URLAnalyticsPage() {
  const params = useParams()
  const urlId = params.id as string
  
  const [url, setUrl] = useState<URL | null>(null)
  const [analytics, setAnalytics] = useState<URLAnalytics | null>(null)
  const [dailyClicks, setDailyClicks] = useState<ClickAnalytics[]>([])
  const [referrers, setReferrers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)

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
      setCopied(true)
      toast.success('Copied to clipboard')
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      toast.error('Failed to copy')
      console.error('Failed to copy')
    }
  }

  if (loading || !url || !analytics) {
    return (
      <div className="min-h-screen bg-gray-50/30 p-4">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="space-y-4">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-96" />
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="p-6">
                <Skeleton className="h-6 w-6 mb-4" />
                <Skeleton className="h-8 w-16 mb-2" />
                <Skeleton className="h-4 w-20" />
              </Card>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Mobile-first header */}
      <div className="z-10 bg-white/80 backdrop-blur-sm border-b border-gray-200/60">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-bold text-gray-900 truncate">
              {url.title || url.short_code}
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant={url.status === 'active' ? 'success' : 'secondary'} className="text-xs">
                {url.status}
              </Badge>
              <span className="text-xs text-gray-500">
                Created {formatDate(url.created_at)}
              </span>
            </div>
        </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 space-y-6">
        {/* URL Info Card - Mobile Optimized */}
        <Card className="border-0 shadow-sm bg-white">
          <CardContent className="p-4 sm:p-6">
            <div className="space-y-4">
              {/* Short URL */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Short URL</label>
                <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-xl border border-blue-100">
                  <code className="flex-1 text-sm font-mono text-blue-700 truncate">
                    {url.short_url}
                  </code>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCopy(url.short_url)}
                    className="shrink-0 h-8 w-8 p-0 hover:bg-blue-100"
                  >
                    {copied ? (
                      <span className="text-xs text-green-600 font-medium">✓</span>
                    ) : (
                      <Copy className="h-4 w-4 text-blue-600" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Original URL */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Original URL</label>
                <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <span className="flex-1 text-sm text-gray-600 truncate">
                    {shortenUrl(url.original_url, 60)}
                  </span>
                  <ExternalLink className="h-4 w-4 text-gray-400 shrink-0" />
                </div>
              </div>

              {/* Description */}
              {url.description && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Description</label>
                  <p className="text-sm text-gray-600 leading-relaxed">{url.description}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Key Metrics - Mobile Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <MetricCard
            title="Total Clicks"
            value={analytics.total_clicks}
            subtitle="All time"
            icon={<MousePointerClick className="h-5 w-5" />}
            trend={0}
            color="blue"
          />
          <MetricCard
            title="Today"
            value={analytics.clicks_today}
            subtitle="Last 24h"
            icon={<Calendar className="h-5 w-5" />}
            trend={0}
            color="green"
          />
          <MetricCard
            title="This Week"
            value={analytics.clicks_this_week}
            subtitle="Last 7 days"
            icon={<TrendingUp className="h-5 w-5" />}
            trend={0}
            color="purple"
          />
          <MetricCard
            title="This Month"
            value={analytics.clicks_this_month}
            subtitle="Last 30 days"
            icon={<Activity className="h-5 w-5" />}
            trend={0}
            color="orange"
          />
        </div>

        {/* Charts Section */}
        <div className="space-y-6">
          {/* Daily Clicks Chart */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <CardTitle className="text-lg font-semibold">Click Activity</CardTitle>
                  <p className="text-sm text-gray-500 mt-1">Daily clicks over time</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span className="text-xs text-gray-600">Clicks</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {dailyClicks && dailyClicks.length > 0 ? (
                <div className="h-64 sm:h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={dailyClicks} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis
                        dataKey="date"
                        tickFormatter={(value) => formatDate(value)}
                        fontSize={12}
                        tick={{ fill: '#666' }}
                        axisLine={{ stroke: '#e0e0e0' }}
                      />
                      <YAxis
                        fontSize={12}
                        tick={{ fill: '#666' }}
                        axisLine={{ stroke: '#e0e0e0' }}
                      />
                      <Tooltip
                        labelFormatter={(value) => formatDate(value)}
                        contentStyle={{
                          backgroundColor: 'white',
                          border: '1px solid #e0e0e0',
                          borderRadius: '8px',
                          fontSize: '14px'
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="clicks"
                        stroke="#3b82f6"
                        strokeWidth={3}
                        dot={{ fill: '#3b82f6', strokeWidth: 0, r: 4 }}
                        activeDot={{ r: 6, fill: '#1d4ed8' }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="h-64 flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <Activity className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-sm">No click data available yet</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Top Referrers */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Top Traffic Sources</CardTitle>
              <p className="text-sm text-gray-500">Where your clicks are coming from</p>
            </CardHeader>
            <CardContent>
              {referrers && referrers.length > 0 ? (
                <div className="space-y-3">
                  {referrers.map((referrer: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="flex items-center justify-center w-8 h-8 bg-white rounded-lg border">
                          {referrer.referer === 'Direct' ? (
                            <Globe className="h-4 w-4 text-gray-600" />
                          ) : (
                            <ExternalLink className="h-4 w-4 text-gray-600" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 truncate">
                            {referrer.referer === 'Direct' ? 'Direct Traffic' : referrer.referer}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">{formatNumber(referrer.count)}</p>
                        <p className="text-xs text-gray-500">clicks</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Users className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-sm">No referrer data available</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions - Mobile Optimized */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <Link className="w-full" href={`/dashboard/urls/${url.id}/share`} >
               <Button variant="default">
                <Share2 className="h-4 w-4 mr-2" />
                Share Link
               </Button>
              </Link>
              <Link className="w-full" href={`${url.short_url}`}>
               <Button variant="outline">
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
               </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Footer Info */}
        <Card className="border-0 shadow-sm bg-gradient-to-r from-blue-50 to-purple-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-blue-600">
                <Clock className="h-4 w-4" />
                <span>Last clicked {formatDateTime(analytics.last_clicked)}</span>
              </div>
              <Badge variant="success">
                Active
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}