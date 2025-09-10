import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://shortenurl.abhinandan.pro'
  
  // Static pages
  const routes = [
    '',
    '/auth/sign-in',
    '/auth/sign-up',
    '/dashboard',
    '/features',
    '/pricing',
    '/about',
    '/contact',
    '/privacy',
    '/terms',
    '/help',
    '/blog'
  ]

  const staticPages = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' as const : 'weekly' as const,
    priority: route === '' ? 1 : route.includes('auth') ? 0.8 : 0.7,
  }))

  return staticPages
}
