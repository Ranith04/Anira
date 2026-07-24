import { Link } from 'react-router'
import { ArrowRight } from 'lucide-react'
import type { Product } from '@/types'
import { SectionHeading, ShopNowButton } from '@/components/common/SectionHeading'
import { ProductCard } from '@/components/product/ProductCard'
import { cn } from '@/lib/cn'

interface ProductGridSectionProps {
  overline: string
  title: string
  highlight?: string
  ctaHref: string
  products: Product[]
  background?: '50' | '100'
  /** text left (default) or text right (products first) */
  rail?: 'left' | 'right'
  columns?: 3 | 4
}

export function ProductGridSection({
  overline,
  title,
  highlight,
  ctaHref,
  products,
  background = '50',
  rail = 'left',
  columns = 4,
}: ProductGridSectionProps) {
  const railBlock = (
    <div className="flex flex-col justify-center lg:col-span-1">
      <SectionHeading
        overline={overline}
        title={title}
        highlight={highlight}
        align="left"
        titleBreak
      />
      <div className="mt-4 md:mt-6">
        <ShopNowButton href={ctaHref} />
      </div>
    </div>
  )

  const gridBlock = (
    <div
      className={cn(
        'lg:col-span-4 min-w-0',
        'flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-4 px-4 hide-scrollbar',
        'md:mx-0 md:px-0 md:pb-0 md:grid md:overflow-x-visible md:snap-none md:gap-5',
        columns === 4 ? 'md:grid-cols-4' : 'md:grid-cols-3',
        rail === 'right' && 'order-2 lg:order-1',
      )}
    >
      {products.map((product) => (
        <div key={product.id} className="min-w-[75vw] snap-center sm:min-w-[45vw] md:min-w-0 md:w-auto shrink-0">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  )

  return (
    <section
      className={cn(
        'w-full py-8 md:py-16 lg:py-20 overflow-hidden',
        background === '50' ? 'bg-background-50' : 'bg-background-100',
      )}
    >
      <div className="w-full px-4 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-8">
          {rail === 'left' ? (
            <>
              {railBlock}
              {gridBlock}
            </>
          ) : (
            <>
              {gridBlock}
              <div className="order-1 flex flex-col justify-center lg:order-2 lg:col-span-1">
                <SectionHeading
                  overline={overline}
                  title={title}
                  highlight={highlight}
                  align="left"
                  titleBreak
                />
                <div className="mt-4 md:mt-6">
                  <ShopNowButton href={ctaHref} />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}

/** Compact mobile-friendly view-all link used inside rail */
export function ViewAllLink({ href }: { href: string }) {
  return (
    <Link to={href} className="inline-flex items-center gap-1 font-body text-sm text-primary-500">
      View More <ArrowRight className="size-3.5" />
    </Link>
  )
}
