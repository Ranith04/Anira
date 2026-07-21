import { Hero } from '@/components/home/Hero'
import { ShopRange } from '@/components/home/ShopRange'
import { ProductGridSection } from '@/components/home/ProductGridSection'
import { StyleCollections } from '@/components/home/StyleCollections'
import { AboutUs } from '@/components/home/AboutUs'
import { Testimonials } from '@/components/home/Testimonials'
import { InstagramFeed } from '@/components/home/InstagramFeed'
import { Newsletter } from '@/components/home/Newsletter'
import {
  DAILY_KURTA_PRODUCTS,
  FESTIVE_KURTA_PRODUCTS,
  KURTA_STYLES,
  WORK_SAREE_PRODUCTS,
} from '@/data/homeData'

export default function Home() {
  return (
    <>
      <Hero />
      <ShopRange />

      <ProductGridSection
        overline="Handpicked For You"
        title="Work"
        highlight="Sarees"
        ctaHref="/category/sarees?type=work"
        products={WORK_SAREE_PRODUCTS}
        background="50"
        columns={4}
      />

      <ProductGridSection
        overline="Comfortable & Chic"
        title="Daily Wear"
        highlight="Kurtas"
        ctaHref="/category/kurtas?type=daily"
        products={DAILY_KURTA_PRODUCTS}
        background="100"
        columns={3}
      />

      <ProductGridSection
        overline="Celebrate In Style"
        title="Festive"
        highlight="Kurtas"
        ctaHref="/category/kurtas?type=festive"
        products={FESTIVE_KURTA_PRODUCTS}
        background="50"
        rail="right"
        columns={3}
      />

      <StyleCollections
        overline="Everyday To Occasion"
        title="Shop Kurtas By"
        highlight="Fabric"
        styles={KURTA_STYLES}
        background="100"
      />

      <AboutUs />
      <Testimonials />
      <InstagramFeed />
      <Newsletter />
    </>
  )
}
