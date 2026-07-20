import { Link } from 'react-router'
import { ArrowRight } from 'lucide-react'

interface PromoBannerProps {
  overline: string
  title: string
  highlight?: string
  ctaLabel: string
  ctaHref: string
  image: string
  align?: 'left' | 'right' | 'center'
}

export function PromoBanner({ overline, title, highlight, ctaLabel, ctaHref, image, align = 'center' }: PromoBannerProps) {
  return (
    <section className="relative h-[360px] overflow-hidden sm:h-[420px]">
      <img src={image} alt={title} loading="lazy" className="absolute inset-0 size-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-maroon-950/85 via-maroon-950/50 to-transparent" />

      <div
        className={
          align === 'center'
            ? 'container relative mx-auto flex h-full flex-col items-center justify-center px-4 text-center lg:px-8'
            : 'container relative mx-auto flex h-full flex-col items-start justify-center px-4 text-left lg:px-8'
        }
      >
        <span className="font-accent text-xl italic text-gold-400 sm:text-2xl">{overline}</span>
        <h2 className="mt-2 max-w-lg text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
          {title}
          {highlight && <span className="text-gold-500"> {highlight}</span>}
        </h2>
        <Link
          to={ctaHref}
          className="group mt-7 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-sans text-sm font-semibold text-maroon-900 shadow-card transition-all hover:bg-gold-500 hover:text-white"
        >
          {ctaLabel}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  )
}
