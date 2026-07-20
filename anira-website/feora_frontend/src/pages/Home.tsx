import { Hero } from '@/components/home/Hero'
import { ShopByCategory } from '@/components/home/ShopByCategory'
import { ShopByOccasion } from '@/components/home/ShopByOccasion'
import { ProductGridSection } from '@/components/home/ProductGridSection'
import { BlouseCollections } from '@/components/home/BlouseCollections'
import { MomDaughterCombos } from '@/components/home/MomDaughterCombos'
import { ShopByCollections } from '@/components/home/ShopByCollections'
import { AboutUs } from '@/components/home/AboutUs'
import { Testimonials } from '@/components/home/Testimonials'
import { InstagramFeed } from '@/components/home/InstagramFeed'
import { Newsletter } from '@/components/home/Newsletter'
import {
  DAILY_KURTA_PRODUCTS,
  DRESS_PRODUCTS,
  FESTIVE_PRODUCTS,
  HALF_SAREE_PRODUCTS,
  KIDS_PRODUCTS,
  TRADITIONAL_KURTA_PRODUCTS,
} from '@/data/homeData'

export default function Home() {
  return (
    <>
      <Hero />
      <ShopByCategory />
      <ShopByOccasion />

      <ProductGridSection
        overline="Handpicked For You"
        title="Festive"
        highlight="Collections"
        ctaHref="/category/sarees"
        products={FESTIVE_PRODUCTS}
        background="50"
        columns={4}
      />

      <ProductGridSection
        overline="Little Ones"
        title="Kids"
        highlight="Collections"
        ctaHref="/category/kids"
        products={KIDS_PRODUCTS}
        background="100"
        columns={4}
      />

      <BlouseCollections />

      <ProductGridSection
        overline="Comfortable & Chic"
        title="Daily Wear"
        highlight="Kurtas"
        ctaHref="/category/kurtas"
        products={DAILY_KURTA_PRODUCTS}
        background="100"
        columns={3}
      />

      <ProductGridSection
        overline="Timeless Heritage"
        title="Traditional"
        highlight="Kurtas"
        ctaHref="/category/kurtas?type=traditional"
        products={TRADITIONAL_KURTA_PRODUCTS}
        background="50"
        rail="right"
        columns={3}
      />

      <MomDaughterCombos />

      <ProductGridSection
        overline="Effortless Style"
        title="Daily Wear"
        highlight="Dresses"
        ctaHref="/category/dresses"
        products={DRESS_PRODUCTS.slice(0, 3)}
        background="50"
        columns={3}
      />

      <ProductGridSection
        overline="Graceful Drapes"
        title="Half Sarees"
        highlight="& Skirts"
        ctaHref="/category/half-sarees"
        products={HALF_SAREE_PRODUCTS}
        background="100"
        rail="right"
        columns={3}
      />

      <ShopByCollections />
      <AboutUs />
      <Testimonials />
      <InstagramFeed />
      <Newsletter />
    </>
  )
}
