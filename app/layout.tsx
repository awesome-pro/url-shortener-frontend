import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Toaster } from "@/components/ui/sonner"
import { defaultMetadata } from "@/lib/seo"
import "./globals.css"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: 'swap', // Optimize font loading
})

export const metadata: Metadata = defaultMetadata

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.variable} font-sans h-full antialiased`}>
        {children}
        <Toaster richColors position="top-right" duration={2000}  swipeDirections={['top', 'right']}/>
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "ShortUrl",
              "url": "https://shortenurl.abhinandan.pro",
              "logo": "https://shortenurl.abhinandan.pro/logo.png",
              "description": "Transform your long URLs into powerful short links with advanced analytics. Free URL shortener with click tracking, custom domains, and enterprise-grade security.",
              "founder": {
                "@type": "Person",
                "name": "Abhinandan",
                "url": "https://abhinandan.pro"
              }
            })
          }}
        />
      </body>
    </html>
  )
}
