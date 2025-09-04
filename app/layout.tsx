import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Toaster } from "@/components/ui/sonner"
import "./globals.css"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "URL Shortener - Fast & Secure Link Management",
  description: "Create short links, track clicks, and manage your URLs with our powerful URL shortener platform.",
  keywords: "URL shortener, link shortener, analytics, click tracking",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.variable} font-sans h-full antialiased`}>
        {children}
        <Toaster
          richColors
        />
      </body>
    </html>
  )
}
