import { Link } from 'react-router'
import { SectionHeading } from '@/components/common/SectionHeading'
import { OCCASION_TILES } from '@/data/homeData'

export function ShopByOccasion() {
  return (
    <section className="w-full bg-background-100 py-12 md:py-16 lg:py-20">
      <div className="w-full px-4 md:px-8 lg:px-12">
        <SectionHeading overline="Find Your Perfect Look" title="Shop By" highlight="Occasion" />

        <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
          {OCCASION_TILES.map((tile) => (
            <Link
              key={tile.id}
              to={tile.href}
              className="group relative aspect-[3/4] overflow-hidden rounded-xl bg-background-200 md:rounded-2xl"
            >
              <img
                src={tile.image}
                alt={tile.name}
                loading="lazy"
                className="size-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-500/80 via-primary-500/15 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
                <p className="font-body text-[10px] uppercase tracking-wide text-accent-400 md:text-xs">
                  {tile.subtitle}
                </p>
                <h3 className="mt-1 font-heading text-lg font-semibold text-background-50 md:text-xl">
                  {tile.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
