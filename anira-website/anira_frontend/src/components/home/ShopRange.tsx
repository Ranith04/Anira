import { Link } from 'react-router'
import { ArrowUpRight } from 'lucide-react'
import { SectionHeading } from '@/components/common/SectionHeading'
import { SAREE_RANGE_TILES, KURTA_RANGE_TILES } from '@/data/homeData'
import { cn } from '@/lib/cn'
import type { ShopRangeTile } from '@/types'

function RangeTile({ tile, className }: { tile: ShopRangeTile; className?: string }) {
  return (
    <Link
      to={tile.href}
      className={cn(
        'group relative overflow-hidden rounded-xl bg-background-100 md:rounded-2xl',
        className,
      )}
    >
      <img
        src={tile.image}
        alt={tile.name}
        loading="lazy"
        className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
      />
      <div
        className={cn(
          'absolute inset-0 bg-gradient-to-t from-primary-500/85 via-primary-500/25 to-transparent'
        )}
      />

      <div
        className={cn(
          'absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5 md:p-7 lg:p-8'
        )}
      >
        <div>
          <p
            className={cn(
              'font-body uppercase tracking-[0.18em] text-accent-400 text-xs md:text-sm'
            )}
          >
            {tile.subtitle}
          </p>
          <h3
            className={cn(
              'mt-1.5 font-heading font-semibold text-background-50 text-2xl md:text-3xl'
            )}
          >
            {tile.name}
          </h3>
          <span
            className={cn(
              'mt-2.5 inline-flex items-center gap-1.5 font-body font-medium tracking-wide text-background-50/95 transition-colors group-hover:text-accent-400 text-sm md:text-base'
            )}
          >
            Shop Now
            <ArrowUpRight
              className={cn(
                'transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 size-4'
              )}
            />
          </span>
        </div>
        <span
          className={cn(
            'flex shrink-0 items-center justify-center rounded-full border border-background-50/30 bg-background-50/10 text-background-50 backdrop-blur-sm transition-all duration-300 group-hover:border-accent-400 group-hover:bg-accent-500 size-11 md:size-12'
          )}
        >
          <ArrowUpRight
            className={cn(
              'transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 size-5'
            )}
          />
        </span>
      </div>
    </Link>
  )
}

export function ShopRange() {
  return (
    <>
      {/* Sarees Section */}
      <section className="w-full bg-background-50 py-10 md:py-16 lg:py-20">
        <div className="w-full px-4 md:px-8 lg:px-12">
          <SectionHeading overline="Explore Our Range" title="Shop By" highlight="Style" />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 mt-8 md:mt-12">
            {SAREE_RANGE_TILES.map((tile) => (
              <RangeTile key={tile.id} tile={tile} className="min-h-[350px] sm:min-h-[400px] md:min-h-[500px]" />
            ))}
          </div>
        </div>
      </section>

      {/* Kurtas Section */}
      <section className="w-full bg-background-100 py-10 md:py-16 lg:py-20">
        <div className="w-full px-4 md:px-8 lg:px-12">
          <SectionHeading overline="Comfortable & Chic" title="Daily Wear" highlight="Kurtas" />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 mt-8 md:mt-12">
            {KURTA_RANGE_TILES.map((tile) => (
              <RangeTile key={tile.id} tile={tile} className="min-h-[350px] sm:min-h-[400px] md:min-h-[500px]" />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
