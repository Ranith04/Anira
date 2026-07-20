import { Link } from 'react-router'
import { ShieldCheck, Sparkle, Truck } from 'lucide-react'

const HIGHLIGHTS = [
  { icon: Sparkle, title: 'Touch of Quality', subtitle: 'Style in every step' },
  { icon: Truck, title: 'Shipping Worldwide', subtitle: 'Free shipping above ₹2,999' },
  { icon: ShieldCheck, title: 'Secure Checkout', subtitle: '100% Secure Payment' },
]

export function AboutUs() {
  return (
    <section id="about" className="w-full bg-secondary-100 py-12 md:py-16 lg:py-20">
      <div className="w-full px-4 md:px-8 lg:px-12">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mx-auto mb-6 flex size-20 items-center justify-center rounded-full bg-primary-500 md:size-24">
            <span className="font-heading text-2xl font-bold italic text-background-50 md:text-3xl">A</span>
          </div>
          <p className="mb-3 font-body text-xs uppercase tracking-[0.2em] text-foreground-500">About Us</p>
          <h2 className="mb-6 font-heading text-2xl font-semibold text-foreground-900 md:text-3xl lg:text-4xl">
            ANIRA - The Legacy of Ethnic Wear
          </h2>
          <p className="mx-auto mb-4 max-w-2xl font-body text-sm leading-relaxed text-foreground-700 md:text-base">
            At ANIRA, we celebrate the timeless beauty of Indian ethnic wear. Passed down through
            generations of artisans, our passion for these stunning garments shines through in every
            thread. We don&apos;t just sell sarees and kurtas — we weave stories of love, tradition,
            and craftsmanship into each piece.
          </p>
          <p className="mx-auto mb-8 max-w-2xl font-body text-sm leading-relaxed text-foreground-700 md:text-base">
            Based in the heart of Bangalore&apos;s Electronic City, ANIRA brings together
            centuries-old weaving traditions with contemporary style. Whether you&apos;re looking for
            a grand wedding saree, a comfortable daily wear kurta, or a festive lehenga for your
            little one, our curated collections promise to make every occasion memorable.
          </p>
          <Link
            to="/about"
            className="inline-flex items-center gap-2 rounded-full bg-primary-500 px-6 py-3 font-body text-sm font-medium text-background-50 transition-colors hover:bg-primary-600"
          >
            Read Our Story
          </Link>

          <div className="mt-12 grid grid-cols-1 gap-6 border-t border-primary-500/10 pt-10 sm:grid-cols-3">
            {HIGHLIGHTS.map(({ icon: Icon, title, subtitle }) => (
              <div key={title} className="flex flex-col items-center text-center">
                <span className="mb-3 flex size-12 items-center justify-center rounded-full bg-primary-500/10 text-primary-500">
                  <Icon className="size-5" />
                </span>
                <h3 className="font-heading text-base font-semibold text-foreground-900">{title}</h3>
                <p className="mt-1 font-body text-xs text-foreground-500">{subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
