import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Link2, BarChart3, Share2, ArrowRight } from 'lucide-react'
import { Button } from '../ui/button'
import Link from 'next/link'

export function HowItWorksSection() {
  const steps = [
    {
      step: '01',
      icon: Link2,
      title: 'Paste Your URL',
      description: 'Simply paste your long URL into our shortening tool. No registration required for basic use.',
      features: ['Instant processing', 'Custom short codes', 'Bulk URL support']
    },
    {
      step: '02',
      icon: Share2,
      title: 'Share & Track',
      description: 'Share your short link anywhere and watch the analytics come in as people click your link.',
      features: ['Social media ready', 'QR code generation', 'Campaign tracking']
    },
    {
      step: '03',
      icon: BarChart3,
      title: 'Get Analytics',
      description: 'Receive detailed insights about your link performance, including clicks, locations, and referrers.',
      features: ['Real-time tracking', 'Geographic data', 'Device analytics']
    },
    
  ]

  return (
    <section id="how-it-works" className="py-24 bg-muted/30">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 px-3 text-white ">
            How It Works
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            3 simple steps to <br />
            <span className="text-primary mx-2">
              powerful links
            </span>
          </h2>
          <p className="text-md text-muted-foreground max-w-3xl mx-auto">
            Get started in seconds with our intuitive platform. 
            No complex setup or technical knowledge required.
          </p>
        </div>

        {/* Steps */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-4 px-5">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              <Card className="h-full overflow-hidden transition-all hover:shadow-lg hover:z-50">
                {/* Gradient Border Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/5 to-transparent rounded-lg" />
                
                {/* Card Content */}
                <CardContent className="relative p-0 h-full">
                  {/* Header Section with Step Number and Icon */}
                  <div className="relative px-8 pt-8 pb-6">
                    {/* Background Pattern */}
                    <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
                      <div className="w-full h-full bg-gradient-to-br from-primary to-primary/20 rounded-full transform rotate-12" />
                    </div>
                    
                    <div className="relative flex items-start justify-between">
                      {/* Step Number with Enhanced Design */}
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <div className="absolute inset-0 bg-primary/10 rounded-2xl blur-xl" />
                          <div className="relative flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-2xl shadow-lg">
                            <span className="text-xl font-bold text-white">
                              {step.step}
                            </span>
                          </div>
                        </div>
                        
                        {/* Process Flow Indicator */}
                        <div className="hidden sm:flex items-center space-x-2">
                          <div className="w-8 h-0.5 bg-gradient-to-r from-primary/60 to-transparent" />
                          <div className="text-xs font-medium text-primary/60 uppercase tracking-wider">
                            Step {step.step}
                          </div>
                        </div>
                      </div>
                      
                      {/* Icon with Improved Styling */}
                      <div className="relative">
                        <div className="absolute inset-0 bg-primary/5 rounded-full blur-md" />
                        <div className="relative flex items-center justify-center w-14 h-14 bg-background/80 backdrop-blur-sm border border-primary/10 rounded-full shadow-sm group-hover:border-primary/20 transition-colors duration-300">
                          <step.icon className="w-6 h-6 text-primary" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="px-8 pb-8">
                    {/* Title with Better Typography */}
                    <h3 className="text-xl font-bold mb-3 text-foreground leading-tight">
                      {step.title}
                    </h3>
                    
                    {/* Description with Improved Readability */}
                    <p className="text-muted-foreground mb-6 leading-relaxed text-sm">
                      {step.description}
                    </p>

                    {/* Enhanced Features List */}
                    <div className="space-y-3">
                      <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-3">
                        Key Features
                      </div>
                      <ul className="space-y-3">
                        {step.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="group/feature flex items-start space-x-3">
                            {/* Enhanced Bullet Point */}
                            <div className="flex-shrink-0 mt-1.5">
                              <div className="relative">
                                <div className="absolute inset-0 bg-primary/20 rounded-full blur-sm group-hover/feature:blur-md transition-all duration-200" />
                                <div className="relative w-2 h-2 bg-gradient-to-br from-primary to-primary/80 rounded-full" />
                              </div>
                            </div>
                            
                            {/* Feature Text */}
                            <span className="text-sm text-muted-foreground leading-relaxed group-hover/feature:text-foreground transition-colors duration-200">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Bottom Accent */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/60 via-primary to-primary/60 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />
                </CardContent>
              </Card>

              {/* Enhanced Arrow Connector */}
              {index < steps.length - 1 && (
                <div className="hidden lg:flex absolute top-1/2 -right-6 transform -translate-y-1/2 z-20">
                  <div className="relative">
                    {/* Glow Effect */}
                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-lg scale-150" />
                    
                    {/* Arrow Container */}
                    <div className="relative flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-full shadow-xl border-4 border-background">
                      <ArrowRight className="w-5 h-5 text-white" />
                    </div>
                    
                    {/* Connection Line */}
                    <div className="absolute top-1/2 -right-6 w-6 h-0.5 bg-gradient-to-r from-primary/60 to-transparent transform -translate-y-1/2" />
                  </div>
                </div>
    )}

    {/* Mobile Flow Indicator */}
    {index < steps.length - 1 && (
      <div className="lg:hidden flex justify-center py-4">
        <div className="flex flex-col items-center space-y-2">
          <div className="w-0.5 h-6 bg-gradient-to-b from-primary/40 to-transparent" />
          <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full">
            <ArrowRight className="w-3 h-3 text-primary transform rotate-90" />
          </div>
          <div className="w-0.5 h-6 bg-gradient-to-b from-transparent to-primary/40" />
        </div>
      </div>
    )}
  </div>
))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 flex flex-col items-center">
          
          <span className="text-black mb-6">Ready to get started?</span>
          <Button asChild className='w-60 rounded-full'> 
            <Link href="/auth/register">
              Create Your First Link
              
              <ArrowRight className="w-5 h-5 ml-2 inline" />
            </Link>
          </Button>
        </div>
          
       
    </section>
  )
}
