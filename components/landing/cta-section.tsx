import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles, Users, TrendingUp, Shield, Zap, CheckCircle2, Star, PhoneCall } from 'lucide-react'

export function CTASection() {
  const stats = [
    {
      icon: Users,
      value: '50,000+',
      label: 'Active Users',
      subtext: 'trusted globally'
    },
    {
      icon: TrendingUp,
      value: '99.9%',
      label: 'Uptime',
      subtext: 'guaranteed SLA'
    },
    {
      icon: Sparkles,
      value: '10M+',
      label: 'Links Created',
      subtext: 'and counting'
    }
  ]

  const highlights = [
    { icon: Shield, text: 'Enterprise Security', premium: true },
    { icon: TrendingUp, text: 'Advanced Analytics', premium: true },
    { icon: Zap, text: 'Lightning Fast', premium: false },
    { icon: Users, text: 'Team Collaboration', premium: false }
  ]

  return (
    <section className="relative py-32 overflow-hidden bg-primary">
      {/* Sophisticated Background */}
     
      
      {/* Subtle Geometric Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-gradient-to-tl from-primary/5 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          
          {/* Premium Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-background/80 backdrop-blur-sm border border-primary/20 mb-8">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-primary text-primary" />
                ))}
              </div>
              <span className="text-sm font-medium text-muted-foreground">Rated 4.9/5 by 10,000+ users</span>
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight text-slate-300">
              Transform your workflow with <br />
              <span className="text-white">
                professional link management
              </span>
            </h2>
            
            <p className="text-xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
              Join industry leaders who rely on our platform for mission-critical URL operations. 
              Experience enterprise-grade performance with startup agility.
            </p>
          </div>

          {/* Enhanced Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                <div className="relative bg-background/60 backdrop-blur-sm border border-border/90 rounded-2xl p-8 text-center group-hover:border-primary/50 transition-all duration-300">
                  
                  <div className="flex justify-center mb-4">
                    <div className="relative">
                      <div className="absolute inset-0 bg-primary/10 rounded-full blur-md" />
                      <div className="relative flex items-center justify-center w-16 h-16 bg-gradient-to-br from-background to-muted border border-border/50 rounded-full">
                        <stat.icon className="w-7 h-7 text-primary" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-3xl font-bold mb-2 group-hover:text-primary transition-colors duration-200">
                    {stat.value}
                  </div>
                  <div className="text-base font-medium text-foreground mb-1">
                    {stat.label}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.subtext}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Premium CTA Buttons */}
          <div className="text-center mb-16">
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button variant="outline"  asChild className='w-full md:w-60 h-12 rounded-full'>
                <Link href="/auth/sign-in">
                  Start Free Trial
                  <ArrowRight className="w-4 h-4 " />
                </Link>
              </Button>

              <Button asChild className='w-full md:w-60 h-12 flex rounded-full text-white hover:bg-white/90 hover:text-black  border-2 border-white'>
                <Link href="https://cal.com/awesome_v0/30min" target='_blank' className='flex items-center justify-center'>
                  <PhoneCall className="w-4 h-4 mr-2" />
                  Talk to us
                 
                </Link>
              </Button>
            </div>
            
            <div className="mt-6 flex  items-center justify-center gap-8 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                14-day free trial
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                No credit card required
              </div>
              
            </div>
          </div>

          {/* Sophisticated Feature Showcase */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-3xl blur-3xl" />
            <div className="relative bg-background/80 backdrop-blur-md border border-border/50 rounded-3xl p-10 shadow-2xl">
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-3">Everything you need to scale</h3>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  From individual creators to enterprise teams, our platform adapts to your needs with professional-grade tools.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {highlights.map((highlight, index) => (
                  <div key={index} className="group flex items-center gap-4 p-4 rounded-xl hover:bg-muted/30 transition-all duration-200">
                    <div className="relative flex-shrink-0">
                      <div className="absolute inset-0 bg-primary/10 rounded-xl blur-md group-hover:blur-lg transition-all duration-200" />
                      <div className="relative flex items-center justify-center w-12 h-12 bg-gradient-to-br from-background to-muted border border-border/50 rounded-xl group-hover:border-primary/20 transition-colors duration-200">
                        <highlight.icon className="w-5 h-5 text-primary" />
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <span className="font-semibold group-hover:text-primary transition-colors duration-200">
                          {highlight.text}
                        </span>
                        {highlight.premium && (
                          <div className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full border border-primary/20">
                            Pro
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
                  </div>
                ))}
              </div>

              {/* Enhanced Trust Indicators */}
              <div className="mt-10 pt-8 border-t border-border/50">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <Shield className="w-6 h-6 text-primary mb-1" />
                    <span className="font-semibold text-sm">SOC2 Certified</span>
                    <span className="text-xs text-muted-foreground">Enterprise security</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Zap className="w-6 h-6 text-primary mb-1" />
                    <span className="font-semibold text-sm">99.9% Uptime SLA</span>
                    <span className="text-xs text-muted-foreground">Guaranteed availability</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Users className="w-6 h-6 text-primary mb-1" />
                    <span className="font-semibold text-sm">24/7 Support</span>
                    <span className="text-xs text-muted-foreground">Always here to help</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Final Assurance */}
          <div className="text-center mt-12">
            <p className="text-slate-300">
              <span className="font-medium">30-day money-back guarantee</span> • Trusted by Fortune 500 companies • GDPR compliant
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}