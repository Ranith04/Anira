import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { TESTIMONIALS } from '@/data/homeData'
import { PHOTOS } from '@/data/photos'
import { cn } from '@/lib/cn'

export function Testimonials() {
  const [index, setIndex] = useState(0)
  const total = TESTIMONIALS.length
  const active = TESTIMONIALS[index]

  const go = (dir: 1 | -1) => setIndex((prev) => (prev + dir + total) % total)

  return (
    <section className="w-full bg-background-100 py-12 md:py-16 lg:py-20">
      <div className="w-full px-4 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-secondary-100 md:aspect-square md:rounded-3xl lg:aspect-[4/5]">
            <img
              src={PHOTOS.testimonial}
              alt="Happy Customer"
              loading="lazy"
              className="size-full object-cover"
            />
          </div>

          <div className="flex flex-col">
            <p className="mb-3 font-body text-xs uppercase tracking-[0.2em] text-foreground-500">
              ( Client Diaries )
            </p>
            <h2 className="mb-2 font-heading text-2xl font-semibold text-foreground-900 md:text-3xl lg:text-4xl">
              What Our
              <br />
              <span className="text-foreground-400">Customers Say</span>
            </h2>

            <div className="my-6 md:my-8">
              <p className="font-body text-sm italic leading-relaxed text-foreground-700 md:text-base">
                &ldquo; {active.quote} &rdquo;
              </p>
            </div>

            <div>
              <p className="font-heading text-base font-semibold text-foreground-900">
                — {active.name}
              </p>
              <p className="font-body text-sm text-foreground-500">{active.location}</p>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <button
                type="button"
                aria-label="Previous testimonial"
                onClick={() => go(-1)}
                className="flex size-9 items-center justify-center rounded-full border border-foreground-400/30 text-foreground-700 transition-colors hover:border-primary-500 hover:text-primary-500"
              >
                <ChevronLeft className="size-4" />
              </button>
              <button
                type="button"
                aria-label="Next testimonial"
                onClick={() => go(1)}
                className="flex size-9 items-center justify-center rounded-full border border-foreground-400/30 text-foreground-700 transition-colors hover:border-primary-500 hover:text-primary-500"
              >
                <ChevronRight className="size-4" />
              </button>
              <span className="font-body text-sm text-foreground-500">
                {index + 1} / {total}
              </span>
            </div>

            <div className="mt-4 flex gap-2">
              {TESTIMONIALS.map((t, i) => (
                <button
                  key={t.id}
                  type="button"
                  aria-label={`Go to testimonial ${i + 1}`}
                  onClick={() => setIndex(i)}
                  className={cn(
                    'h-1.5 rounded-full transition-all',
                    i === index ? 'w-6 bg-primary-500' : 'w-1.5 bg-foreground-400/30',
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
