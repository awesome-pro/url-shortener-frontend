import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Link2, BarChart3, Shield, Zap } from 'lucide-react'

export default function Home() {
  return (
      <div className="flex flex-col min-h-[calc(100vh-3.5rem)]">
        {/* Hero Section */}
        <section className="flex-1 flex items-center justify-center px-4 py-16 sm:py-24">
          <div className="container max-w-6xl mx-auto text-center">
            <div className="flex justify-center mb-8">
              <div className="flex items-center justify-center w-20 h-20 rounded-full bg-primary/10">
                <Link2 className="w-10 h-10 text-primary" />
              </div>
            </div>
            
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-6">
              Shorten URLs,
              <br />
              <span className="text-primary">Track Everything</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Create short, memorable links and get detailed analytics on every click. 
              Perfect for social media, marketing campaigns, and link management.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/auth/register">Get Started Free</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/auth/login">Sign In</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-muted/50">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Choose LinkShort?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Powerful features to help you manage, track, and optimize your links
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4">
                    <Zap className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>Lightning Fast</CardTitle>
                  <CardDescription>
                    Create short links in seconds with our optimized platform
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• Instant link generation</li>
                    <li>• Custom short codes</li>
                    <li>• Bulk link creation</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4">
                    <BarChart3 className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>Detailed Analytics</CardTitle>
                  <CardDescription>
                    Track clicks, locations, devices, and referrers in real-time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• Real-time click tracking</li>
                    <li>• Geographic insights</li>
                    <li>• Referrer analysis</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>Secure & Reliable</CardTitle>
                  <CardDescription>
                    Enterprise-grade security with 99.9% uptime guarantee
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• SSL encryption</li>
                    <li>• Spam protection</li>
                    <li>• Link expiration</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="container max-w-4xl mx-auto text-center px-4">
            <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of users who trust LinkShort for their link management needs.
              Start shortening and tracking your links today.
            </p>
            <Button size="lg" asChild>
              <Link href="/auth/register">Create Your Account</Link>
            </Button>
          </div>
        </section>
      </div>

  )
}