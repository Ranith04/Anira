import { Link } from 'react-router'
import { ArrowUpRight } from 'lucide-react'
import { SectionHeading } from '@/components/common/SectionHeading'
import { SHOP_RANGE_TILES } from '@/data/homeData'
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
          'absolute inset-0 bg-gradient-to-t from-primary-500/85 via-primary-500/25 to-transparent',
          tile.featured && 'via-primary-500/35',
        )}
      />

      <div
        className={cn(
          'absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 md:p-5',
          tile.featured && 'p-5 md:p-7 lg:p-8',
        )}
      >
        <div>
          <p
            className={cn(
              'font-body uppercase tracking-[0.18em] text-accent-400',
              tile.featured ? 'text-xs md:text-sm' : 'text-[10px] md:text-xs',
            )}
          >
            {tile.subtitle}
          </p>
          <h3
            className={cn(
              'mt-1.5 font-heading font-semibold text-background-50',
              tile.featured ? 'text-2xl md:text-3xl lg:text-4xl' : 'text-base md:text-xl',
            )}
          >
            {tile.name}
          </h3>
        </div>
        <span
          className={cn(
            'flex shrink-0 items-center justify-center rounded-full border border-background-50/30 bg-background-50/10 text-background-50 backdrop-blur-sm transition-all duration-300 group-hover:border-accent-400 group-hover:bg-accent-500',
            tile.featured ? 'size-11 md:size-12' : 'size-9 md:size-10',
          )}
        >
          <ArrowUpRight
            className={cn(
              'transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5',
              tile.featured ? 'size-5' : 'size-4',
            )}
          />
        </span>
      </div>
    </Link>
  )
}

export function ShopRange() {
  const featured = SHOP_RANGE_TILES.find((t) => t.featured)
  const rest = SHOP_RANGE_TILES.filter((t) => !t.featured)

  return (
    <section className="w-full bg-background-50 py-12 md:py-16 lg:py-20">
      <div className="w-full px-4 md:px-8 lg:px-12">
        <SectionHeading overline="Explore Our Range" title="Shop By" highlight="Style" />

        {/* Mobile: featured + 2×2 */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:hidden">
          {featured && (
            <RangeTile tile={featured} className="col-span-2 aspect-[16/10] min-h-[220px]" />
          )}
          {rest.map((tile) => (
            <RangeTile key={tile.id} tile={tile} className="aspect-[3/4]" />
          ))}
        </div>

        {/* Desktop: bento dashboard — 1 featured + 4 supporting */}
        <div className="hidden gap-5 lg:grid lg:grid-cols-4 lg:grid-rows-2 lg:gap-6">
          {featured && (
            <RangeTile tile={featured} className="col-span-2 row-span-2 min-h-[560px]" />
          )}
          {rest.map((tile) => (
            <RangeTile key={tile.id} tile={tile} className="min-h-[270px]" />
          ))}
        </div>
      </div>
    </section>
  )
}
