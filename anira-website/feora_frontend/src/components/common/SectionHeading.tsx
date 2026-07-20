import { Link } from 'react-router'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/cn'

interface SectionHeadingProps {
  overline: string
  title: string
  highlight?: string
  align?: 'center' | 'left'
  className?: string
  titleBreak?: boolean
}

export function SectionHeading({
  overline,
  title,
  highlight,
  align = 'center',
  className,
  titleBreak = false,
}: SectionHeadingProps) {
  return (
    <div className={cn(align === 'center' ? 'mb-8 text-center md:mb-12' : '', className)}>
      <p className="mb-2 font-body text-xs uppercase tracking-[0.2em] text-foreground-500 md:text-sm">
        {overline}
      </p>
      <h2
        className={cn(
          'font-heading font-semibold text-foreground-900',
          align === 'center' ? 'text-2xl md:text-3xl lg:text-4xl' : 'mb-4 text-2xl md:text-3xl',
        )}
      >
        {title}
        {titleBreak && highlight ? <br /> : ' '}
        {highlight && <span className="italic text-primary-500">{highlight}</span>}
      </h2>
    </div>
  )
}

export function ShopNowButton({ href }: { href: string }) {
  return (
    <Link
      to={href}
      className="inline-flex w-fit items-center gap-2 whitespace-nowrap rounded-full bg-primary-500 px-5 py-2.5 font-body text-sm font-medium text-background-50 transition-colors hover:bg-primary-600"
    >
      Shop Now
      <ArrowRight className="size-4" />
    </Link>
  )
}
