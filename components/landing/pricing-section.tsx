import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Check, Star, Crown, Zap } from 'lucide-react'

export function PricingSection() {
  const plans = [
    {
      name: 'Free',
      description: 'Perfect for personal use and getting started',
      price: '$0',
      period: 'forever',
      icon: Zap,
      badge: null,
      features: [
        '100 links per month',
        'Basic analytics',
        'Standard short domains',
        '7-day link history',
        'Basic support'
      ],
      notIncluded: [
        'Custom domains',
        'Advanced analytics',
        'Team collaboration',
        'API access'
      ],
      buttonText: 'Get Started',
      buttonVariant: 'outline' as const,
      popular: false
    },
    {
      name: 'Pro',
      description: 'Best for professionals and growing businesses',
      price: '$12',
      period: 'per month',
      icon: Star,
      badge: 'Most Popular',
      features: [
        '10,000 links per month',
        'Advanced analytics',
        'Custom domains (3)',
        'Unlimited link history',
        'Priority support',
        'Team collaboration (5 users)',
        'API access',
        'Custom QR codes'
      ],
      notIncluded: [
        'White-label solution',
        'Advanced integrations'
      ],
      buttonText: 'Start Free Trial',
      buttonVariant: 'default' as const,
      popular: true
    },
    {
      name: 'Enterprise',
      description: 'For large organizations with advanced needs',
      price: '$49',
      period: 'per month',
      icon: Crown,
      badge: 'Enterprise',
      features: [
        'Unlimited links',
        'Advanced analytics & reporting',
        'Unlimited custom domains',
        'Unlimited link history',
        '24/7 dedicated support',
        'Unlimited team members',
        'Full API access',
        'Custom QR codes',
        'White-label solution',
        'Advanced integrations',
        'SSO & SAML',
        'Custom SLA'
      ],
      notIncluded: [],
      buttonText: 'Contact Sales',
      buttonVariant: 'outline' as const,
      popular: false
    }
  ]

  return (
    <section id="pricing" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Pricing
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Simple, transparent
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent block">
              pricing for everyone
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Choose the plan that's right for you. Upgrade or downgrade at any time.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative overflow-hidden transition-all duration-300 ${
                plan.popular 
                  ? 'border-primary shadow-xl scale-105 bg-background' 
                  : 'border-border hover:shadow-lg bg-background/80 backdrop-blur-sm'
              }`}
            >
              {/* Popular Badge */}
              {plan.badge && (
                <div className="absolute top-0 right-0">
                  <Badge 
                    className={`rounded-none rounded-bl-lg px-3 py-1 ${
                      plan.popular ? 'bg-primary' : 'bg-secondary'
                    }`}
                  >
                    {plan.badge}
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-8">
                {/* Icon */}
                <div className="flex justify-center mb-4">
                  <div className={`flex items-center justify-center w-16 h-16 rounded-2xl ${
                    plan.popular ? 'bg-primary/10' : 'bg-muted'
                  }`}>
                    <plan.icon className={`w-8 h-8 ${
                      plan.popular ? 'text-primary' : 'text-muted-foreground'
                    }`} />
                  </div>
                </div>

                {/* Plan Name */}
                <CardTitle className="text-2xl font-bold mb-2">
                  {plan.name}
                </CardTitle>
                
                {/* Description */}
                <CardDescription className="text-base">
                  {plan.description}
                </CardDescription>

                {/* Price */}
                <div className="mt-6">
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground ml-2">/{plan.period}</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                {/* Features */}
                <div className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center">
                      <Check className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                  
                  {plan.notIncluded.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center opacity-50">
                      <div className="w-5 h-5 mr-3 flex-shrink-0 flex items-center justify-center">
                        <div className="w-3 h-3 border border-muted-foreground rounded-full" />
                      </div>
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <Button 
                  variant={plan.buttonVariant} 
                  className="w-full h-12 text-base font-semibold"
                  size="lg"
                >
                  {plan.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-4">
            Have questions? We're here to help.
          </p>
          <Button variant="outline" size="lg">
            View FAQ
          </Button>
        </div>

        {/* Money Back Guarantee */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-2 text-sm text-muted-foreground bg-muted/50 px-4 py-2 rounded-full">
            <Check className="w-4 h-4 text-green-600" />
            <span>30-day money-back guarantee</span>
          </div>
        </div>
      </div>
    </section>
  )
}
