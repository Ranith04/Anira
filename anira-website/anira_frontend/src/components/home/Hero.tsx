import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { PHOTOS } from '@/data/photos'
import { cn } from '@/lib/cn'

const SLIDE_MS = 5000

export function Hero() {
  const slides = PHOTOS.heroSlides
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused || slides.length <= 1) return
    const id = window.setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length)
    }, SLIDE_MS)
    return () => window.clearInterval(id)
  }, [paused, slides.length])

  return (
    <section
      className="relative w-full overflow-hidden bg-primary-500"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative h-[500px] w-full md:h-[600px] lg:h-[700px]">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={cn(
              'absolute inset-0 transition-opacity duration-1000 ease-in-out',
              index === active ? 'opacity-100' : 'opacity-0',
            )}
            aria-hidden={index !== active}
          >
            <img
              src={slide.image}
              alt={slide.label}
              className="size-full object-cover"
              style={{ objectPosition: slide.objectPosition ?? 'center' }}
              fetchPriority={index === 0 ? 'high' : 'low'}
            />
          </div>
        ))}

        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/90 via-primary-500/55 to-primary-500/25" />

        <div className="relative z-10 flex h-full items-center">
          <div className="w-full px-4 md:px-8 lg:px-12">
            <div className="max-w-xl animate-fade-up">
              <p className="mb-3 font-body text-sm uppercase tracking-[0.25em] text-accent-400 md:mb-4 md:text-base">
                New Collection 2024
              </p>
              <h2 className="mb-4 font-heading text-4xl font-semibold leading-[1.1] text-background-50 md:mb-6 md:text-5xl lg:text-6xl">
                Elegance Woven
                <br />
                <span className="font-normal italic">in Tradition</span>
              </h2>
              <p className="mb-6 max-w-md font-body text-sm leading-relaxed text-background-100 md:mb-8 md:text-base">
                Discover exquisite work sarees and designer kurtas crafted for the modern Indian woman
                who cherishes her roots.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/category/sarees"
                  className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-accent-500 px-6 py-3 font-body text-sm font-medium text-background-50 transition-colors hover:bg-accent-600"
                >
                  Shop Now
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-background-200/50 px-6 py-3 font-body text-sm font-medium text-background-50 transition-colors hover:bg-background-50/10"
                >
                  Our Story
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 md:bottom-8 md:left-auto md:right-8 md:translate-x-0">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              aria-label={`Show ${slide.label}`}
              aria-current={index === active}
              onClick={() => setActive(index)}
              className={cn(
                'h-1.5 rounded-full transition-all duration-300',
                index === active
                  ? 'w-8 bg-accent-400'
                  : 'w-1.5 bg-background-50/45 hover:bg-background-50/70',
              )}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
