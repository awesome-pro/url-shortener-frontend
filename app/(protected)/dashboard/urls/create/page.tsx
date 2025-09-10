'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, Link2, Copy, CheckCircle } from 'lucide-react'
import { URLCreate, URL } from '@/types'
import { urlApi } from '@/lib/url-api'
import { validateUrl, copyToClipboard, formatDateTime } from '@/lib/utils'
import { toast } from 'sonner'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import Image from 'next/image'

export default function CreateURLPage() {
  const [error, setError] = useState('')
  const [createdUrl, setCreatedUrl] = useState<URL | null>(null)
  const [copied, setCopied] = useState(false)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    reset,
    setValue,
  } = useForm<URLCreate>()

  const originalUrl = watch('original_url')

  const onSubmit = async (data: URLCreate) => {
    try {
      setError('')
      
      if (!validateUrl(data.original_url)) {
        setError('Please enter a valid URL')
        return
      }

      const urlData = {
        original_url: data.original_url.startsWith('http') 
          ? data.original_url 
          : `https://${data.original_url}`,
        title: data.title || undefined,
        description: data.description || undefined,
        custom_code: data.custom_code || undefined,
        expires_at: data.expires_at ? data.expires_at : undefined,
      }

      const result = await urlApi.create(urlData)
      setCreatedUrl(result)
      toast.success('Short URL created successfully!')
    } catch (err: any) {
     
      setError(err)
      toast.error(err) 
    }
  }

  const handleCopy = async () => {
    if (createdUrl) {
      try {
        await copyToClipboard(createdUrl.short_url)
        setCopied(true)
        toast.success('Copied to clipboard!')
        setTimeout(() => setCopied(false), 2000)
      } catch (err) {
        toast.error('Failed to copy to clipboard')
      }
    }
  }

  const createAnother = () => {
    setCreatedUrl(null)
    setError('')
    setCopied(false)
    reset()
  }

  if (createdUrl) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-100">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </div>
            <CardTitle className="text-2xl">URL Created Successfully!</CardTitle>
            <CardDescription>
              Your short URL is ready to use
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label>Short URL</Label>
              <div className="flex items-center space-x-2 mt-2">
                <Input
                  value={createdUrl.short_url}
                  readOnly
                  className="font-mono"
                />
                <Button
                  onClick={handleCopy}
                  variant="outline"
                  size="icon"
                >
                  {copied ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <div>
              <Label>Original URL</Label>
              <Input
                value={createdUrl.original_url}
                readOnly
                className="mt-2"
              />
            </div>

            {createdUrl.title && (
              <div>
                <Label>Title</Label>
                <Input
                  value={createdUrl.title}
                  readOnly
                  className="mt-2"
                />
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={createAnother} variant="outline" className="flex-1">
                Create Another
              </Button>
              <Button
                onClick={() => router.push('/dashboard/urls')}
                className="flex-1"
              >
                View All URLs
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">

      <h1 className="text-2xl lg:text-3xl font-bold mb-4 text-center">
        Shorten New URL
      </h1>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-center">
            <Image src="/logo.png" alt="LinkShort" width={132} height={32} className='mr-2' />
            
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="original_url">
                Original URL <span className="text-destructive">*</span>
              </Label>
              <Input
                id="original_url"
                type="url"
                placeholder="https://example.com/very/long/url"
                {...register('original_url', {
                  required: 'URL is required',
                })}
              />
              {errors.original_url && (
                <p className="text-sm text-destructive">{errors.original_url.message}</p>
              )}
              {originalUrl && !validateUrl(originalUrl) && (
                <p className="text-sm text-yellow-600">
                  Please enter a valid URL (with or without http://)
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Title (optional)</Label>
              <Input
                id="title"
                placeholder="Give your link a memorable title"
                {...register('title', {
                  maxLength: {
                    value: 255,
                    message: 'Title must be less than 255 characters',
                  },
                })}
              />
              {errors.title && (
                <p className="text-sm text-destructive">{errors.title.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description (optional)</Label>
              <Textarea
                id="description"
                placeholder="Add a description for your link"
                rows={3}
                {...register('description')}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="custom_code">Custom Short Code (optional)</Label>
              <Input
                id="custom_code"
                placeholder="my-custom-link"
                {...register('custom_code', {
                  minLength: {
                    value: 3,
                    message: 'Custom code must be at least 3 characters',
                  },
                  maxLength: {
                    value: 10,
                    message: 'Custom code must be less than 10 characters',
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9_-]+$/,
                    message: 'Custom code can only contain letters, numbers, hyphens, and underscores',
                  },
                })}
              />
              {errors.custom_code && (
                <p className="text-sm text-destructive">{errors.custom_code.message}</p>
              )}
              <p className="text-sm text-muted-foreground">
                Leave empty for auto-generated code
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="expires_at">Expiration Date (optional)</Label>
              <Popover>
                <PopoverTrigger asChild>  
                  <Button
                    id="expires_at"
                    type="button"
                    variant="outline"
                    className="w-full"
                  >
                    {watch('expires_at') ? formatDateTime(watch('expires_at') as Date) : 'Select expiration date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    id="expires_at"
                    mode="single"
                    defaultMonth={watch('expires_at') as Date}
                    selected={watch('expires_at') as Date}
                    onSelect={(date) => setValue('expires_at', date as Date)}
                  />
                </PopoverContent>
              </Popover>
              <p className="text-sm text-muted-foreground">
                Set when this link should stop working
              </p>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Shortening your URL...
                </>
              ) : (
                'Create Short URL'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}