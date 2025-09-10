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
    <section id="testimonials" className="py-24 bg-gradient-to-br from-slate-50 to-purple-50/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 px-4 py-2 bg-primary hover:bg-primary/90 text-white border-0 font-medium">
            Testimonials
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
            Loved by thousands of <br />
            <span className="text-primary">
              professionals worldwide
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            See what our customers have to say about their experience with LinkShort.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-5">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="group hover:shadow-2xl hover:shadow-purple-100/50 transition-all duration-300 border border-gray-200 bg-white backdrop-blur-sm relative overflow-hidden hover:-translate-y-2">
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-purple-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <Quote className="w-8 h-8 text-primary" />
              </div>
              
              <CardContent className="p-8 relative z-10">
                {/* Rating */}
                <div className="flex items-center space-x-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Content */}
                <blockquote className="text-gray-700 mb-8 leading-relaxed text-lg font-medium">
                  &ldquo;{testimonial.content}&rdquo;
                </blockquote>

                {/* Author */}
                <div className="flex items-center space-x-4 mb-6">
                  <Avatar className="w-12 h-12 ring-2 ring-primary">
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback className="bg-primary text-primary-foreground font-semibold text-lg">
                      {getInitials(testimonial.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-bold text-gray-900 text-lg">{testimonial.name}</div>
                    <div className="text-gray-600 font-medium">
                      {testimonial.role} at <span className="text-primary">{testimonial.company}</span>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="pt-6 border-t border-gray-200">
                  <div className="text-sm font-bold text-primary bg-primary/10 px-3 py-2 rounded-full inline-block">
                    {testimonial.stats}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

       
        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <p className="text-gray-700 mb-8 text-lg font-medium">
            Join thousands of satisfied customers
          </p>
          <Button asChild className='w-60 h-12 rounded-full'>
            <Link href="/auth/sign-up">
              Start Your Success Story
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}