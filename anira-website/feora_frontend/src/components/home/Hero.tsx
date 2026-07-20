import { Link } from 'react-router'
import { PHOTOS } from '@/data/photos'

export function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-primary-500">
      <div className="relative h-[500px] w-full md:h-[600px] lg:h-[700px]">
        <div className="absolute inset-0 flex">
          <div className="relative h-full w-1/2 overflow-hidden">
            <img
              src={PHOTOS.heroSaree}
              alt="ANIRA Work Saree"
              className="size-full object-cover object-top"
            />
          </div>
          <div className="relative h-full w-1/2 overflow-hidden">
            <img
              src={PHOTOS.heroKurta}
              alt="ANIRA Designer Kurta"
              className="size-full object-cover object-top"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500/95 via-primary-500/70 to-primary-500/40" />
        </div>

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
                  to="/#about"
                  className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-background-200/50 px-6 py-3 font-body text-sm font-medium text-background-50 transition-colors hover:bg-background-50/10"
                >
                  Our Story
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
