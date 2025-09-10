import { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/seo'
import { Navbar } from '@/components/landing/navbar'
import { Footer } from '@/components/landing/footer'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Link2, 
  BarChart3, 
  Shield, 
  Zap, 
  Globe, 
  QrCode,
  Users,
  Smartphone,
  Target,
  Clock,
  Database,
  Lock
} from 'lucide-react'

export const metadata: Metadata = generatePageMetadata({
  title: "Features - Advanced URL Shortening & Analytics | ShortUrl",
  description: "Discover powerful features of ShortUrl: click analytics, custom domains, QR codes, bulk shortening, team collaboration, and enterprise-grade security. Free and premium plans available.",
  path: "/features"
})

const features = [
  {
    icon: Link2,
    title: "Custom Short Links",
    description: "Create branded short links with custom domains and memorable aliases",
    category: "Branding"
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description: "Real-time click tracking, geographic data, and detailed performance insights",
    category: "Analytics"
  },
  {
    icon: QrCode,
    title: "QR Code Generation",
    description: "Automatically generate QR codes for all your short links",
    category: "Tools"
  },
  {
    icon: Shield,
    title: "Link Security",
    description: "Advanced spam protection and malware detection for safe sharing",
    category: "Security"
  },
  {
    icon: Globe,
    title: "Global CDN",
    description: "Lightning-fast redirects with 99.9% uptime worldwide",
    category: "Performance"
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Share links and analytics with team members and clients",
    category: "Collaboration"
  },
  {
    icon: Smartphone,
    title: "Mobile Optimized",
    description: "Perfect experience on all devices with responsive design",
    category: "Experience"
  },
  {
    icon: Target,
    title: "Audience Targeting",
    description: "Smart redirects based on location, device, and user behavior",
    category: "Targeting"
  },
  {
    icon: Clock,
    title: "Link Expiration",
    description: "Set expiration dates and time-based access controls",
    category: "Control"
  },
  {
    icon: Database,
    title: "Bulk Operations",
    description: "Process hundreds of URLs at once with CSV import/export",
    category: "Productivity"
  },
  {
    icon: Lock,
    title: "Password Protection",
    description: "Secure sensitive links with password protection",
    category: "Security"
  },
  {
    icon: Zap,
    title: "API Access",
    description: "Integrate with your apps using our comprehensive REST API",
    category: "Integration"
  }
]

export default function FeaturesPage() {
  const categories = [...new Set(features.map(f => f.category))]

  return (
    <>
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        
        <main className="container mx-auto px-4 py-16">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Powerful Features for
              <span className="text-primary"> Modern Link Management</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Everything you need to create, manage, and analyze your short links. 
              From basic URL shortening to enterprise-grade analytics and security.
            </p>
          </div>

          {/* Feature Categories */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <Badge key={category} variant="secondary" className="px-4 py-2">
                {category}
              </Badge>
            ))}
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-lg">{feature.title}</h3>
                        <Badge variant="outline" className="text-xs">
                          {feature.category}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl p-12">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of professionals who trust ShortUrl for their link management needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/auth/sign-up"
                className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors"
              >
                Start Free Trial
              </a>
              <a 
                href="/pricing"
                className="inline-flex items-center justify-center px-8 py-3 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-lg transition-colors"
              >
                View Pricing
              </a>
            </div>
          </div>
        </main>

        <Footer />
      </div>

      {/* Structured Data for Features */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "ShortUrl Features",
            "description": "Comprehensive list of ShortUrl features including analytics, custom domains, QR codes, and security features.",
            "url": "https://shortenurl.abhinandan.pro/features",
            "mainEntity": {
              "@type": "ItemList",
              "itemListElement": features.map((feature, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "item": {
                  "@type": "SoftwareFeature",
                  "name": feature.title,
                  "description": feature.description
                }
              }))
            }
          })
        }}
      />
    </>
  )
}
