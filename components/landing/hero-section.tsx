'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  ArrowRight, 
  Link2, 
  Zap, 
  Shield, 
  BarChart3,
  Play,
  CheckCircle,
  PhoneCall
} from 'lucide-react'
import { validateUrl } from '@/lib/utils'

export function HeroSection() {
  const [demoUrl, setDemoUrl] = useState('')
  const [isValidUrl, setIsValidUrl] = useState(false)

  const handleUrlChange = (value: string) => {
    setDemoUrl(value)
    setIsValidUrl(validateUrl(value))
  }

  return (
    <section className="relative min-h-screen flex flex-col items-center text-center justify-center">

          {/* Main Heading */}
          <h1 className="text-4xl lg:text-6xl font-bold tracking-tight mb-6">
            Transform Your Long URLs <br />
            <span className="text-primary font-bold mx-2">into Power Links</span>
          </h1>

          {/* Subheading */}
          <p className="text-md md:text-lg text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed px-4">
            Create short, memorable links with advanced analytics. 
            Perfect for marketing campaigns, social media, and professional use.
          </p>

          {/* Demo URL Input */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="flex flex-col md:flex-row gap-4 p-2 bg-background/50 backdrop-blur-sm border rounded-2xl shadow-lg">
              
            </div>
            {demoUrl && (
              <p className="text-sm text-muted-foreground mt-2 text-left">
                {isValidUrl ? (
                  <span className="text-green-600 flex items-center">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Valid URL - Ready to shorten
                  </span>
                ) : (
                  <span className="text-destructive">Please enter a valid URL</span>
                )}
              </p>
            )}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col md:flex-row gap-4 justify-center mb-12 w-full px-5">
            <Button asChild className="h-12 w-full md:w-60 rounded-full">
              <Link href="/auth/sign-up">
                Get Started
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button variant="outline" asChild className="h-12 w-full md:w-60 rounded-full">
              <Link href="https://cal.com/awesome_v0/30min" target='_blank' className='flex items-center justify-center'>
                <PhoneCall className="w-5 h-5 mr-2" />
                Contact The Founder
              </Link>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="flex items-center justify-center space-x-10 md:space-x-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <div className="text-left">
                <div className="font-semibold">Lightning Fast</div>
                <div className="text-sm text-muted-foreground">Instant URL generation</div>
              </div>
            </div>
            
            <div className="flex items-center justify-center space-x-10 md:space-x-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <div className="text-left">
                <div className="font-semibold">Secure & Reliable</div>
                <div className="text-sm text-muted-foreground">99.9% uptime guarantee</div>
              </div>
            </div>
            
            <div className="flex items-center justify-center space-x-10 md:space-x-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                <BarChart3 className="w-6 h-6 text-primary" />
              </div>
              <div className="text-left">
                <div className="font-semibold">Advanced Analytics</div>
                <div className="text-sm text-muted-foreground">Real-time insights</div>
              </div>
            </div>
          </div>
    </section>
  )
}
