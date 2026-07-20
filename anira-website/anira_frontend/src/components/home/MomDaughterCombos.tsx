import { Link } from 'react-router'
import { ArrowRight } from 'lucide-react'
import { SectionHeading } from '@/components/common/SectionHeading'
import { COMBO_TILES } from '@/data/homeData'

export function MomDaughterCombos() {
  return (
    <section className="w-full bg-background-100 py-12 md:py-16 lg:py-20">
      <div className="w-full px-4 md:px-8 lg:px-12">
        <SectionHeading overline="Twin in Tradition" title="Mom & Daughter" highlight="Combos" />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
          {COMBO_TILES.map((combo) => (
            <Link
              key={combo.id}
              to={combo.href}
              className="group relative aspect-[4/5] overflow-hidden rounded-xl bg-background-200 md:aspect-[3/4] md:rounded-2xl"
            >
              <img
                src={combo.image}
                alt={combo.name}
                loading="lazy"
                className="size-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-500/70 via-primary-500/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <h3 className="font-heading text-xl font-semibold text-background-50">{combo.name}</h3>
                <span className="mt-2 inline-flex items-center gap-1.5 font-body text-sm font-medium text-accent-400">
                  View More
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
