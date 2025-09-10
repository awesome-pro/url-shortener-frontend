import { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/seo'
import { Navbar } from '@/components/landing/navbar'
import { Footer } from '@/components/landing/footer'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CalendarDays, Clock, User, ArrowRight } from 'lucide-react'

export const metadata: Metadata = generatePageMetadata({
  title: "Blog - URL Shortening Tips & Digital Marketing Insights | ShortUrl",
  description: "Learn URL shortening best practices, digital marketing strategies, and link management tips. Expert insights on social media marketing, analytics, and online branding.",
  path: "/blog"
})

const blogPosts = [
  {
    title: "The Ultimate Guide to URL Shortening for Social Media Marketing",
    excerpt: "Discover how to leverage short URLs to boost your social media engagement, track campaign performance, and build brand recognition across platforms.",
    category: "Social Media",
    author: "Marketing Team",
    date: "2025-09-10",
    readTime: "8 min read",
    slug: "url-shortening-social-media-guide",
    featured: true
  },
  {
    title: "Why Click Analytics Matter for Your Digital Marketing Strategy",
    excerpt: "Learn how to use link analytics to understand your audience, optimize campaigns, and make data-driven marketing decisions.",
    category: "Analytics",
    author: "Data Team",
    date: "2025-09-10",
    readTime: "6 min read",
    slug: "click-analytics-digital-marketing"
  },
  {
    title: "Custom Domains vs. Generic Short URLs: Which is Better?",
    excerpt: "Compare the benefits of branded short links versus generic URLs for building trust, improving click-through rates, and brand recognition.",
    category: "Branding",
    author: "Brand Team",
    date: "2025-09-10",
    readTime: "5 min read",
    slug: "custom-domains-vs-generic-urls"
  },
  {
    title: "QR Codes and Short URLs: The Perfect Marketing Combination",
    excerpt: "Explore how combining QR codes with short URLs creates seamless offline-to-online experiences and trackable marketing campaigns.",
    category: "Marketing",
    author: "Growth Team",
    date: "2025-09-10",
    readTime: "7 min read",
    slug: "qr-codes-short-urls-marketing"
  },
  {
    title: "Security Best Practices for Link Sharing",
    excerpt: "Protect your audience and brand reputation with these essential security practices for sharing links online.",
    category: "Security",
    author: "Security Team",
    date: "2025-09-10",
    readTime: "4 min read",
    slug: "security-best-practices-link-sharing"
  },
  {
    title: "A/B Testing Your Short URLs for Better Conversion Rates",
    excerpt: "Learn how to set up and analyze A/B tests for your short URLs to optimize conversion rates and campaign performance.",
    category: "Optimization",
    author: "Growth Team",
    date: "2025-09-10",
    readTime: "9 min read",
    slug: "ab-testing-short-urls-conversion"
  }
]

const categories = [...new Set(blogPosts.map(post => post.category))]

export default function BlogPage() {
  const featuredPost = blogPosts.find(post => post.featured)
  const otherPosts = blogPosts.filter(post => !post.featured)

  return (
    <>
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        
        <main className="container mx-auto px-4 py-16">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              ShortUrl <span className="text-primary">Blog</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Expert insights on URL shortening, digital marketing, analytics, and link management. 
              Stay updated with the latest trends and best practices.
            </p>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <Badge variant="default" className="px-4 py-2">All Posts</Badge>
            {categories.map((category) => (
              <Badge key={category} variant="secondary" className="px-4 py-2 cursor-pointer hover:bg-secondary/80">
                {category}
              </Badge>
            ))}
          </div>

          {/* Featured Post */}
          {featuredPost && (
            <div className="mb-16">
              <h2 className="text-2xl font-bold mb-6">Featured Article</h2>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-0">
                  <div className="bg-gradient-to-r from-primary/10 to-primary/5 h-48 flex items-center justify-center">
                    <div className="text-center">
                      <Badge className="mb-4">{featuredPost.category}</Badge>
                      <h3 className="text-2xl font-bold px-6">{featuredPost.title}</h3>
                    </div>
                  </div>
                  <div className="p-8">
                    <p className="text-lg text-muted-foreground mb-6">{featuredPost.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-2" />
                          {featuredPost.author}
                        </div>
                        <div className="flex items-center">
                          <CalendarDays className="h-4 w-4 mr-2" />
                          {new Date(featuredPost.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2" />
                          {featuredPost.readTime}
                        </div>
                      </div>
                      <a 
                        href={`/blog/${featuredPost.slug}`}
                        className="inline-flex items-center text-primary hover:text-primary/80 font-medium"
                      >
                        Read More
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Blog Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {otherPosts.map((post, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="secondary">{post.category}</Badge>
                    <span className="text-sm text-muted-foreground">{post.readTime}</span>
                  </div>
                  
                  <h3 className="font-bold text-lg mb-3 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      {post.author}
                    </div>
                    <div className="flex items-center">
                      <CalendarDays className="h-4 w-4 mr-2" />
                      {new Date(post.date).toLocaleDateString()}
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t">
                    <a 
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center text-primary hover:text-primary/80 font-medium"
                    >
                      Read Article
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Newsletter Signup */}
          <div className="text-center bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl p-12">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Get the latest insights on URL shortening, digital marketing, and link analytics delivered to your inbox.
            </p>
            <div className="max-w-md mx-auto flex gap-4">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border border-input bg-background"
              />
              <button className="px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </main>

        <Footer />
      </div>

      {/* Structured Data for Blog */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "ShortUrl Blog",
            "description": "Expert insights on URL shortening, digital marketing, analytics, and link management.",
            "url": "https://shortenurl.abhinandan.pro/blog",
            "author": {
              "@type": "Organization",
              "name": "ShortUrl"
            },
            "blogPost": blogPosts.map(post => ({
              "@type": "BlogPosting",
              "headline": post.title,
              "description": post.excerpt,
              "url": `https://shortenurl.abhinandan.pro/blog/${post.slug}`,
              "datePublished": post.date,
              "author": {
                "@type": "Person",
                "name": post.author
              },
              "publisher": {
                "@type": "Organization",
                "name": "ShortUrl"
              }
            }))
          })
        }}
      />
    </>
  )
}
