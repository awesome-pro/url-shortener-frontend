import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Star, Quote } from 'lucide-react'
import { Button } from '../ui/button'
import Link from 'next/link'

export function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Marketing Director',
      company: 'TechFlow Inc.',
      avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
      content: 'LinkShort has revolutionized our marketing campaigns. The analytics are incredibly detailed and help us understand our audience better than ever before.',
      rating: 5,
      stats: '2.5M clicks tracked'
    },
    
    {
      name: 'David Park',
      role: 'E-commerce Manager',
      company: 'ShopSmart',
      avatar: 'https://img.freepik.com/free-photo/horizontal-portrait-smiling-happy-young-pleasant-looking-female-wears-denim-shirt-stylish-glasses-with-straight-blonde-hair-expresses-positiveness-poses_176420-13176.jpg',
      content: 'The bulk URL processing feature saves us hours every week. Perfect for managing large product catalogs and promotional campaigns.',
      rating: 5,
      stats: '10K+ products tracked'
    },
    {
      name: 'Lisa Thompson',
      role: 'Digital Strategist',
      company: 'Growth Labs',
      avatar: 'https://media.istockphoto.com/id/1406233756/photo/smiling-young-woman-choosing-eyeglasses-in-optical-store.jpg?s=612x612&w=0&k=20&c=bPuslHvx5Mlnk3uvw9u9i2zjeMorGp9LVu7pOKxWMtA=',
      content: 'The real-time analytics and geographic insights help us optimize our global campaigns. ROI has increased by 40% since switching to LinkShort.',
      rating: 5,
      stats: '40% ROI increase'
    },
    {
      name: 'Alex Kumar',
      role: 'Startup Founder',
      company: 'InnovateNow',
      avatar: 'https://www.harleytherapy.co.uk/counselling/wp-content/uploads/16297800391_5c6e812832.jpg',
      content: 'LinkShort scales with our business perfectly. From a few links to thousands, the platform handles everything seamlessly.',
      rating: 5,
      stats: '50K+ links created'
    }
  ]

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  return (
    <section id="testimonials" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge  className="mb-4 px-3 text-white ">
            Testimonials
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-black">
            Loved by thousands of <br />
            <span className="text-primary">
              professionals worldwide
            </span>
          </h2>
          <p className="text-xl text-black max-w-3xl mx-auto">
            See what our customers have to say about their experience with LinkShort.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-5">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 bg-slate-300 backdrop-blur-sm relative overflow-hidden">
              {/* Quote Icon */}
              <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Quote className="w-8 h-8" />
              </div>
              
              <CardContent className="p-6">
                {/* Rating */}
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Content */}
                <blockquote className="text-muted-foreground mb-6 leading-relaxed">
                  &ldquo;{testimonial.content}&rdquo;
                </blockquote>

                {/* Author */}
                <div className="flex items-center space-x-3 mb-4">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {getInitials(testimonial.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role} at {testimonial.company}
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="pt-4 border-t border-border">
                  <div className="text-sm font-medium text-primary">
                    {testimonial.stats}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-2 text-slate-300 mb-8">
            <div className="w-12 h-px bg-slate-300" />
            <span>Trusted by leading companies</span>
            <div className="w-12 h-px bg-slate-300" />
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60">
            {['TechFlow', 'Creative Agency', 'ShopSmart', 'Growth Labs'].map((company, index) => (
              <div key={index} className="text-2xl font-bold text-white transition-colors font-italic">
                {company}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-slate-200 mb-6">
            Join thousands of satisfied customers
          </p>
          <Button variant="outline" asChild className='w-60 rounded-full'>
            <Link href="/auth/register">
              Start Your Success Story
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
