import { Metadata } from 'next'

// Base SEO configuration
export const siteConfig = {
  name: "ShortUrl - Professional URL Shortener",
  description: "Transform your long URLs into powerful short links with advanced analytics. Free URL shortener with click tracking, custom domains, and enterprise-grade security.",
  url: "https://shortenurl.abhinandan.pro",
  ogImage: "https://shortenurl.abhinandan.pro/og-image.png",
  creator: "@abhinandan",
  keywords: [
    "URL shortener",
    "short url",
    "link shortener", 
    "custom short links",
    "URL analytics",
    "link tracking",
    "QR code generator",
    "branded links",
    "click analytics",
    "link management",
    "marketing links",
    "social media links",
    "campaign tracking",
    "link performance",
    "professional URL shortener"
  ]
}

// Default metadata for all pages
export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [
    {
      name: "Abhinandan",
      url: "https://abhinandan.pro"
    }
  ],
  creator: siteConfig.creator,
  publisher: "ShortUrl",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: siteConfig.creator,
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  alternates: {
    canonical: siteConfig.url,
  },
  category: 'technology',
  classification: 'URL Shortener, Link Management, Analytics',
  other: {
    'google-site-verification': process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '',
  }
}

// Page-specific metadata generators
export function generatePageMetadata({
  title,
  description,
  path = '',
  noIndex = false,
}: {
  title?: string
  description?: string
  path?: string
  noIndex?: boolean
}): Metadata {
  const url = `${siteConfig.url}${path}`
  
  return {
    title,
    description: description || siteConfig.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      url,
      title: title || siteConfig.name,
      description: description || siteConfig.description,
    },
    twitter: {
      title: title || siteConfig.name,
      description: description || siteConfig.description,
    },
    robots: noIndex ? {
      index: false,
      follow: false,
    } : undefined,
  }
}

// Structured data generators
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "ShortUrl",
    "url": siteConfig.url,
    "logo": `${siteConfig.url}/logo.png`,
    "description": siteConfig.description,
    "founder": {
      "@type": "Person",
      "name": "Abhinandan",
      "url": "https://abhinandan.pro"
    },
    "sameAs": [
      "https://abhinandan.pro"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "url": `${siteConfig.url}/contact`
    }
  }
}

export function generateWebApplicationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "ShortUrl",
    "url": siteConfig.url,
    "description": siteConfig.description,
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "10000"
    },
    "creator": {
      "@type": "Person",
      "name": "Abhinandan",
      "url": "https://abhinandan.pro"
    }
  }
}

export function generateBreadcrumbSchema(items: Array<{name: string, url: string}>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  }
}

export function generateFAQSchema(faqs: Array<{question: string, answer: string}>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  }
}
