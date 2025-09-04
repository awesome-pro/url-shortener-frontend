import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  BarChart3, 
  Shield, 
  Zap, 
  Globe, 
  Users,
  Target,
  ArrowUpRight,
  CheckCircle2,
  TrendingUp,
  ArrowRight,
  PhoneCall
} from 'lucide-react'
import { Button } from '../ui/button'
import Link from 'next/link'

export function FeaturesSection() {
  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast Performance',
      description: 'Generate and redirect URLs instantly with our globally distributed infrastructure',
      badge: 'Performance',
      stats: '99.9% uptime',
      highlights: [
        'Sub-second response times',
        'Global CDN network',
        'Auto-scaling infrastructure'
      ],
      featured: true
    },
    {
      icon: BarChart3,
      title: 'Advanced Analytics Suite',
      description: 'Comprehensive insights with real-time tracking and detailed reporting',
      badge: 'Analytics',
      stats: '50+ metrics',
      highlights: [
        'Real-time click tracking',
        'Geographic & device insights',
        'Custom reporting dashboards'
      ]
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-grade security with advanced threat protection and compliance',
      badge: 'Security',
      stats: 'SOC2 Certified',
      highlights: [
        'End-to-end encryption',
        'Advanced spam detection',
        'GDPR & CCPA compliant'
      ]
    },
    {
      icon: Target,
      title: 'Smart Targeting Engine',
      description: 'AI-powered audience segmentation and personalized link experiences',
      badge: 'Intelligence',
      stats: '95% accuracy',
      highlights: [
        'Behavioral targeting',
        'A/B testing built-in',
        'Dynamic content delivery'
      ]
    },
    // {
    //   icon: Users,
    //   title: 'Team Collaboration',
    //   description: 'Seamless workflows with role-based access and team management',
    //   badge: 'Teams',
    //   stats: 'Unlimited seats',
    //   highlights: [
    //     'Role-based permissions',
    //     'Shared workspaces',
    //     'Activity monitoring'
    //   ]
    // },
    {
      icon: Globe,
      title: 'Custom Branding Hub',
      description: 'White-label solution with custom domains and branded experiences',
      badge: 'Branding',
      stats: '100+ domains',
      highlights: [
        'Custom domain integration',
        'Branded landing pages',
        'Corporate identity tools'
      ]
    }
  ]

  return (
    <section id="features" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/50 bg-muted/30 mb-6">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-medium text-muted-foreground">Platform Features</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 max-w-4xl mx-auto leading-tight">
            Enterprise-grade tools for
            <span className="bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent block mt-2">
              modern link management
            </span>
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Built for teams that demand performance, security, and insights. 
            Everything you need to scale your link operations professionally.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className={`group relative overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 ${
              feature.featured ? 'lg:col-span-2 border-primary/20' : 'border-border/50'
            }`}>
              
              {/* Featured Badge */}
              {feature.featured && (
                <div className="absolute top-4 right-4">
                  <Badge className="bg-primary/10 text-primary border-primary/20">
                    Most Popular
                  </Badge>
                </div>
              )}
              
              {/* Subtle Background Pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] via-transparent to-transparent" />
              
              <CardContent className="p-0">
                <div className={`p-8 ${feature.featured ? 'lg:flex lg:items-start lg:gap-8' : ''}`}>
                  
                  {/* Main Content */}
                  <div className={`${feature.featured ? 'lg:flex-1' : ''}`}>
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <div className="absolute inset-0 bg-primary/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                          <div className="relative flex items-center justify-center w-14 h-14 bg-gradient-to-br from-background to-muted border border-border/50 rounded-2xl group-hover:border-primary/20 transition-all duration-300">
                            <feature.icon className="w-6 h-6 text-primary" />
                          </div>
                        </div>
                        
                        <div>
                          <Badge variant="outline" className="text-xs mb-2 border-border/50">
                            {feature.badge}
                          </Badge>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <TrendingUp className="w-3 h-3" />
                            {feature.stats}
                          </div>
                        </div>
                      </div>
                      
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <ArrowUpRight className="w-5 h-5 text-muted-foreground" />
                      </div>
                    </div>

                    {/* Title & Description */}
                    <div className="mb-6">
                      <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-200">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>

                  {/* Enhanced Features List */}
                  <div className={`${feature.featured ? 'lg:flex-1 lg:pl-8 lg:border-l lg:border-border/50' : ''}`}>
                    <div className="space-y-4">
                      <div className="text-xs font-semibold text-foreground uppercase tracking-wider flex items-center gap-2">
                        <div className="w-4 h-px bg-gradient-to-r from-primary to-transparent" />
                        Key Capabilities
                      </div>
                      
                      <div className="grid gap-3">
                        {feature.highlights.map((highlight, highlightIndex) => (
                          <div key={highlightIndex} className="group/item flex items-start gap-3 p-3 rounded-lg hover:bg-muted/30 transition-colors duration-200">
                            <div className="flex-shrink-0 mt-0.5">
                              <CheckCircle2 className="w-4 h-4 text-primary/60 group-hover/item:text-primary transition-colors duration-200" />
                            </div>
                            <span className="text-sm text-muted-foreground group-hover/item:text-foreground transition-colors duration-200 leading-relaxed">
                              {highlight}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Accent Line */}
                <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Enhanced Bottom CTA */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-2xl blur-3xl" />
          <div className="relative bg-background/80 backdrop-blur-sm border border-border/50 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-3">Ready to transform your workflow?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join thousands of teams already using our platform to streamline their operations and drive better results.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              
              <Button asChild className='w-60 h-12'>
                <Link href="/auth/register">
                  Start Free Trial
                  <ArrowRight className="w-4 h-4 " />
                </Link>
              </Button>

              <Button variant="outline" className='w-60 h-12 flex'>
                <Link href="https://cal.com/awesome_v0/30min" target='_blank' className='flex items-center justify-center'>
                  <PhoneCall className="w-4 h-4 mr-2" />
                  Talk to us
                 
                </Link>
              </Button>
            </div>
            
            <div className="mt-6 flex items-center justify-center gap-6 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3 h-3 text-primary" />
                14-day free trial
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3 h-3 text-primary" />
                No credit card required
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3 h-3 text-primary" />
                Cancel anytime
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}