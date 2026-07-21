import { Link } from 'react-router'
import { Heart, Scissors, Sparkles } from 'lucide-react'
import { PHOTOS } from '@/data/photos'

const PILLARS = [
  {
    icon: Scissors,
    title: 'Craft First',
    text: 'Every saree and kurta is chosen for weave, finish, and how it feels through a full day.',
  },
  {
    icon: Sparkles,
    title: 'Modern Tradition',
    text: 'We honour classic Indian silhouettes while keeping cuts wearable for work, festivals, and evenings.',
  },
  {
    icon: Heart,
    title: 'Made for You',
    text: 'From Electronic City, Bangalore, we dress women who want elegance without compromise.',
  },
]

export default function About() {
  return (
    <div className="w-full bg-background-50">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={PHOTOS.collections.nirvi}
            alt=""
            className="size-full object-cover object-top opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background-50 via-background-50/92 to-background-50/75" />
        </div>
        <div className="relative px-4 py-14 md:px-8 md:py-20 lg:px-12 lg:py-24">
          <p className="mb-3 font-body text-xs uppercase tracking-[0.22em] text-foreground-500">
            Our Story
          </p>
          <h1 className="max-w-2xl font-heading text-3xl font-semibold text-foreground-900 md:text-5xl">
            ANIRA — The Ethnic Studio
          </h1>
          <p className="mt-4 max-w-xl font-body text-sm leading-relaxed text-foreground-600 md:text-base">
            A Bangalore boutique dedicated to work sarees and designer kurtas — where heritage
            weaving meets the rhythm of modern life.
          </p>
        </div>
      </section>

      <section className="w-full px-4 py-12 md:px-8 md:py-16 lg:px-12 lg:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="overflow-hidden rounded-2xl">
            <img
              src={PHOTOS.testimonial}
              alt="ANIRA ethnic wear"
              className="aspect-[4/5] w-full object-cover object-top"
            />
          </div>
          <div>
            <p className="mb-2 font-body text-xs uppercase tracking-[0.2em] text-foreground-500">
              Who We Are
            </p>
            <h2 className="mb-5 font-heading text-2xl font-semibold text-foreground-900 md:text-3xl lg:text-4xl">
              Weaving stories into every <span className="italic text-primary-500">drape</span>
            </h2>
            <p className="mb-4 font-body text-sm leading-relaxed text-foreground-700 md:text-base">
              At ANIRA, we celebrate the timeless beauty of Indian ethnic wear. Passed down through
              generations of artisans, our passion shines through in every thread. We specialise in
              work sarees and designer kurtas — pieces that feel rooted, refined, and ready for
              today.
            </p>
            <p className="font-body text-sm leading-relaxed text-foreground-700 md:text-base">
              Based in Electronic City, Bangalore, we bring centuries-old weaving traditions together
              with contemporary style. Whether you need a polished work saree, a festive drape, or a
              comfortable daily wear kurta, our edits are curated for every occasion.
            </p>
          </div>
        </div>
      </section>

      <section className="w-full bg-secondary-100 px-4 py-12 md:px-8 md:py-16 lg:px-12 lg:py-20">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <p className="mb-2 font-body text-xs uppercase tracking-[0.2em] text-foreground-500">
            What Guides Us
          </p>
          <h2 className="font-heading text-2xl font-semibold text-foreground-900 md:text-3xl">
            The ANIRA promise
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {PILLARS.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="rounded-2xl border border-primary-500/10 bg-background-50 px-6 py-8 text-center"
            >
              <span className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-primary-500/10 text-primary-500">
                <Icon className="size-5" />
              </span>
              <h3 className="font-heading text-lg font-semibold text-foreground-900">{title}</h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-foreground-600">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="w-full px-4 py-12 md:px-8 md:py-16 lg:px-12">
        <div className="overflow-hidden rounded-2xl bg-primary-500 px-6 py-12 text-center md:px-12 md:py-16">
          <h2 className="font-heading text-2xl font-semibold text-background-50 md:text-3xl">
            Ready to find your next drape?
          </h2>
          <p className="mx-auto mt-3 max-w-lg font-body text-sm text-background-100">
            Explore our curated sarees and kurtas, or write to us — we&apos;d love to help you style
            the occasion.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/category/sarees"
              className="inline-flex rounded-full bg-accent-500 px-6 py-3 font-body text-sm font-medium text-background-50 transition-colors hover:bg-accent-600"
            >
              Shop Sarees
            </Link>
            <Link
              to="/contact"
              className="inline-flex rounded-full border border-background-50/40 px-6 py-3 font-body text-sm font-medium text-background-50 transition-colors hover:bg-background-50/10"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
