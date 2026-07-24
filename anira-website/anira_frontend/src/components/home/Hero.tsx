import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { PHOTOS } from '@/data/photos'
import { cn } from '@/lib/cn'

const SLIDE_MS = 5000

export function Hero() {
  const slides = PHOTOS.heroSlides
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  const goNext = () => setActive((prev) => (prev + 1) % slides.length)
  const goPrev = () => setActive((prev) => (prev - 1 + slides.length) % slides.length)

  useEffect(() => {
    if (paused || slides.length <= 1) return
    const id = window.setInterval(goNext, SLIDE_MS)
    return () => window.clearInterval(id)
  }, [paused, slides.length])

  return (
    <section
      data-no-reveal
      className="relative w-full overflow-hidden bg-primary-500"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative h-[600px] w-full md:h-[600px] lg:h-[750px]">
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

        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/90 via-primary-500/55 to-primary-500/10" />

        <div className="relative z-10 flex h-full items-center">
          <div className="w-full px-4 pt-16 md:px-8 lg:px-12 md:pt-0">
            <div className="max-w-xl animate-fade-up">
              <p className="mb-3 font-body text-xs uppercase tracking-[0.25em] text-accent-400 md:mb-4 md:text-sm lg:text-base">
                New Collection 2024
              </p>
              <h2 className="mb-4 font-heading text-5xl font-semibold leading-[1.05] text-background-50 md:mb-6 md:text-6xl lg:text-7xl xl:text-8xl">
                Elegance Woven
                <br />
                <span className="font-normal italic">in Tradition</span>
              </h2>
              <p className="mb-6 max-w-sm md:max-w-md lg:max-w-lg font-body text-sm leading-relaxed text-background-100 md:mb-8 md:text-base lg:text-lg">
                Discover exquisite work sarees and designer kurtas crafted for the modern Indian woman
                who cherishes her roots.
              </p>
              <div className="flex flex-wrap gap-3 md:gap-4">
                <Link
                  to="/category/sarees"
                  className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center gap-2 whitespace-nowrap rounded-full bg-accent-500 px-6 py-3 font-body text-sm font-medium text-background-50 transition-colors hover:bg-accent-600 md:text-base md:px-8 md:py-3.5"
                >
                  Shop Now
                </Link>
                <Link
                  to="/about"
                  className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center gap-2 whitespace-nowrap rounded-full border border-background-200/50 px-6 py-3 font-body text-sm font-medium text-background-50 transition-colors hover:bg-background-50/10 md:text-base md:px-8 md:py-3.5"
                >
                  Our Story
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Unified Navigation Controls */}
        <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 items-center gap-4 md:bottom-8 md:left-auto md:right-8 md:translate-x-0">
          <button
            onClick={goPrev}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition-all hover:bg-white/40 md:h-11 md:w-11"
            aria-label="Previous slide"
          >
            <ChevronLeft className="size-5 md:size-6 -ml-0.5" />
          </button>

          <div className="flex items-center gap-2">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                aria-label={`Show ${slide.label}`}
                aria-current={index === active}
                onClick={() => setActive(index)}
                className={cn(
                  'h-2 md:h-1.5 rounded-full transition-all duration-300 min-w-[40px] md:min-w-0 md:min-h-0',
                  index === active
                    ? 'w-10 md:w-8 bg-accent-400'
                    : 'w-10 md:w-1.5 bg-background-50/45 hover:bg-background-50/70',
                )}
              />
            ))}
          </div>

          <button
            onClick={goNext}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition-all hover:bg-white/40 md:h-11 md:w-11"
            aria-label="Next slide"
          >
            <ChevronRight className="size-5 md:size-6 -mr-0.5" />
          </button>
        </div>
      </div>
    </section>
  )
}
