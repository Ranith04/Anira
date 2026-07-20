import { Link } from 'react-router'
import { SectionHeading } from '@/components/common/SectionHeading'
import { cn } from '@/lib/cn'
import type { StyleTile } from '@/types'

interface StyleCollectionsProps {
  overline: string
  title: string
  highlight: string
  styles: StyleTile[]
  background?: '50' | '100'
}

export function StyleCollections({
  overline,
  title,
  highlight,
  styles,
  background = '50',
}: StyleCollectionsProps) {
  return (
    <section
      className={cn(
        'w-full py-12 md:py-16 lg:py-20',
        background === '50' ? 'bg-background-50' : 'bg-background-100',
      )}
    >
      <div className="w-full px-4 md:px-8 lg:px-12">
        <SectionHeading overline={overline} title={title} highlight={highlight} />

        <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
          {styles.map((style) => (
            <Link
              key={style.id}
              to={style.href}
              className="group relative aspect-[4/5] overflow-hidden rounded-xl bg-background-100 md:rounded-2xl"
            >
              <img
                src={style.image}
                alt={style.name}
                loading="lazy"
                className="size-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-500/70 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <h3 className="font-heading text-base font-semibold text-background-50 md:text-lg">
                  {style.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
