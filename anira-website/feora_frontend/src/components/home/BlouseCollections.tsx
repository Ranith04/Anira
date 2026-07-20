import { Link } from 'react-router'
import { SectionHeading } from '@/components/common/SectionHeading'
import { BLOUSE_TYPES } from '@/data/homeData'

export function BlouseCollections() {
  return (
    <section className="w-full bg-background-50 py-12 md:py-16 lg:py-20">
      <div className="w-full px-4 md:px-8 lg:px-12">
        <SectionHeading overline="Perfect Pairings" title="Our Blouse" highlight="Collections" />

        <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
          {BLOUSE_TYPES.map((blouse) => (
            <Link
              key={blouse.id}
              to={blouse.href}
              className="group relative aspect-[4/5] overflow-hidden rounded-xl bg-background-100 md:rounded-2xl"
            >
              <img
                src={blouse.image}
                alt={blouse.name}
                loading="lazy"
                className="size-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-500/70 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <h3 className="font-heading text-base font-semibold text-background-50 md:text-lg">
                  {blouse.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
