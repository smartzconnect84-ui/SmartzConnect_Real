import Hero from '@/components/Hero'
import Features from '@/components/Features'
import SmartzTVPreview from '@/components/SmartzTVPreview'
import MarketplacePreview from '@/components/MarketplacePreview'
import RidePreview from '@/components/RidePreview'
import Testimonials from '@/components/Testimonials'
import Pricing from '@/components/Pricing'
import FAQ from '@/components/FAQ'

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Features />
      <SmartzTVPreview />
      <MarketplacePreview />
      <RidePreview />
      <Testimonials />
      <Pricing />
      <FAQ />
    </main>
  )
}
