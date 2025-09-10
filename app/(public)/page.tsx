import { Metadata } from 'next'
import { FeaturesSection } from '@/components/landing/features-section'
import { HeroSection } from '@/components/landing/hero-section'
import { Navbar } from '@/components/landing/navbar'
import { StatsSection } from '@/components/landing/stats-section'
import { HowItWorksSection } from '@/components/landing/how-it-works-section'
import { TestimonialsSection } from '@/components/landing/testimonials-section'
import { CTASection } from '@/components/landing/cta-section'
import { Footer } from '@/components/landing/footer'
import { generatePageMetadata, generateWebApplicationSchema, generateFAQSchema } from '@/lib/seo'

export const metadata: Metadata = generatePageMetadata({
  title: "Free URL Shortener - Create Short Links with Analytics | ShortUrl",
  description: "Transform long URLs into powerful short links with advanced analytics. Free URL shortener with click tracking, QR codes, and custom domains. Start shortening URLs today!",
  path: "/"
})

export default function LandingPage() {
  const webAppSchema = generateWebApplicationSchema()
  const faqSchema = generateFAQSchema([
    {
      question: "What is a URL shortener?",
      answer: "A URL shortener is a tool that takes a long URL and creates a shorter, more manageable link that redirects to the original URL. It's perfect for social media, marketing campaigns, and professional communications."
    },
    {
      question: "Is ShortUrl free to use?",
      answer: "Yes! ShortUrl offers a free tier with generous limits for personal and small business use. We also offer premium plans with advanced features for enterprises."
    },
    {
      question: "Can I track clicks on my short links?",
      answer: "Absolutely! Every short link comes with detailed analytics including click counts, geographic data, referrer information, and device statistics."
    },
    {
      question: "Can I use custom domains?",
      answer: "Yes, our premium plans include custom domain support, allowing you to create branded short links using your own domain."
    },
    {
      question: "Are the short links permanent?",
      answer: "Yes, all short links created with ShortUrl are permanent and will continue to work indefinitely, unless you choose to delete them."
    }
  ])

  return (
    <>
      <div className="min-h-screen bg-slate-100">
        <Navbar />
        <main>
          <HeroSection />
          <StatsSection />
          <FeaturesSection />
          <HowItWorksSection />
          <TestimonialsSection />
          <CTASection />
        </main>
        <Footer />
      </div>
      
      {/* Enhanced Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  )
}