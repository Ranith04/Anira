import { useMemo } from 'react'
import { Link, useParams, useSearchParams } from 'react-router'
import { ProductCard } from '@/components/product/ProductCard'
import {
  DAILY_KURTA_PRODUCTS,
  FESTIVE_KURTA_PRODUCTS,
  WORK_SAREE_PRODUCTS,
} from '@/data/homeData'
import { PHOTOS } from '@/data/photos'
import { cn } from '@/lib/cn'
import type { Product } from '@/types'

type ListingType = 'category' | 'occasion' | 'collection'

interface TabDef {
  id: string
  label: string
  href: string
}

interface ListingConfig {
  title: string
  overline: string
  description: string
  image: string
  tabs: TabDef[]
  productsByTab: Record<string, Product[]>
  defaultTab: string
}

const ALL_SAREES = WORK_SAREE_PRODUCTS
/** Premium signature pieces */
const DESIGNER_SAREES = WORK_SAREE_PRODUCTS.filter((p) =>
  ['p-priya', 'p-vibha-saree'].includes(p.id),
)
/** Evening / celebration drapes */
const PARTY_SAREES = WORK_SAREE_PRODUCTS.filter((p) =>
  ['p-priya', 'p-shriya'].includes(p.id),
)
/** Everyday polished drapes */
const WORK_SAREES = WORK_SAREE_PRODUCTS.filter((p) =>
  ['p-shriya', 'p-aakriti', 'p-vibha-saree'].includes(p.id),
)

const ALL_KURTAS = [...DAILY_KURTA_PRODUCTS, ...FESTIVE_KURTA_PRODUCTS]

function getListingConfig(type: ListingType, slug: string): ListingConfig {
  if (type === 'category' && slug === 'kurtas') {
    return {
      title: 'Kurtas',
      overline: 'Everyday To Occasion',
      description: 'Comfortable silhouettes crafted for daily ease and festive moments.',
      image: PHOTOS.categories.kurtas,
      defaultTab: 'all',
      tabs: [
        { id: 'all', label: 'All Kurtas', href: '/category/kurtas' },
        { id: 'daily', label: 'Daily Wear', href: '/category/kurtas?type=daily' },
        { id: 'festive', label: 'Festive', href: '/category/kurtas?type=festive' },
      ],
      productsByTab: {
        all: ALL_KURTAS,
        daily: DAILY_KURTA_PRODUCTS,
        festive: FESTIVE_KURTA_PRODUCTS,
      },
    }
  }

  // Sarees — mirror Kurtas: stay on same page, filter via ?type=
  if (type === 'category' && (slug === 'sarees' || !slug)) {
    return {
      title: 'Sarees',
      overline: 'The ANIRA Edit',
      description: 'Handpicked drapes woven with craft, colour, and contemporary ease.',
      image: PHOTOS.categories.sarees,
      defaultTab: 'all',
      tabs: [
        { id: 'all', label: 'All Sarees', href: '/category/sarees' },
        { id: 'designer', label: 'Designer', href: '/category/sarees?type=designer' },
        { id: 'party', label: 'Party Wear', href: '/category/sarees?type=party' },
        { id: 'work', label: 'Work Sarees', href: '/category/sarees?type=work' },
      ],
      productsByTab: {
        all: ALL_SAREES,
        designer: DESIGNER_SAREES,
        party: PARTY_SAREES,
        work: WORK_SAREES,
      },
    }
  }

  // Occasion landings still work but route users back into saree/kurta filters
  if (type === 'occasion' && slug === 'party-wear') {
    return {
      title: 'Party Wear Sarees',
      overline: 'Evening Edit',
      description: 'Statement drapes made for nights that shine.',
      image: PHOTOS.collections.shriya,
      defaultTab: 'party',
      tabs: [
        { id: 'party', label: 'Party Wear', href: '/category/sarees?type=party' },
        { id: 'designer', label: 'Designer', href: '/category/sarees?type=designer' },
        { id: 'all', label: 'All Sarees', href: '/category/sarees' },
      ],
      productsByTab: {
        party: PARTY_SAREES,
        designer: DESIGNER_SAREES,
        all: ALL_SAREES,
      },
    }
  }

  if (type === 'occasion' && slug === 'office-wear') {
    return {
      title: 'Office Wear',
      overline: 'Workday Grace',
      description: 'Polished kurtas and easy drapes for the work week.',
      image: PHOTOS.products.sairaSilk,
      defaultTab: 'daily',
      tabs: [
        { id: 'daily', label: 'Daily Kurtas', href: '/category/kurtas?type=daily' },
        { id: 'work', label: 'Work Sarees', href: '/category/sarees?type=work' },
        { id: 'all', label: 'All Kurtas', href: '/category/kurtas' },
      ],
      productsByTab: {
        daily: DAILY_KURTA_PRODUCTS,
        work: WORK_SAREES,
        all: ALL_KURTAS,
      },
    }
  }

  return {
    title: slug.replace(/-/g, ' '),
    overline: 'The ANIRA Edit',
    description: 'Explore our curated collection of sarees and kurtas.',
    image: PHOTOS.categories.sarees,
    defaultTab: 'all',
    tabs: [{ id: 'all', label: 'All', href: `/category/${slug}` }],
    productsByTab: { all: ALL_SAREES },
  }
}

function resolveActiveTab(config: ListingConfig, typeParam: string | null): string {
  if (typeParam && config.productsByTab[typeParam]) return typeParam
  return config.defaultTab
}

export default function CategoryListing({ type = 'category' }: { type?: ListingType }) {
  const { slug = 'sarees' } = useParams()
  const [searchParams] = useSearchParams()
  const typeParam = searchParams.get('type')

  const config = useMemo(() => getListingConfig(type, slug), [type, slug])
  const activeTab = resolveActiveTab(config, typeParam)
  const products = config.productsByTab[activeTab] ?? []

  return (
    <div className="w-full bg-background-50">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={config.image}
            alt=""
            className="size-full object-cover object-top opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background-50 via-background-50/90 to-background-50/70" />
        </div>

        <div className="relative px-4 py-12 md:px-8 md:py-16 lg:px-12 lg:py-20">
          <p className="mb-2 font-body text-xs uppercase tracking-[0.22em] text-foreground-500">
            {config.overline}
          </p>
          <h1 className="font-heading text-3xl font-semibold capitalize text-foreground-900 md:text-4xl lg:text-5xl">
            {config.title}
          </h1>
          <p className="mt-3 max-w-xl font-body text-sm leading-relaxed text-foreground-600 md:text-base">
            {config.description}
          </p>
        </div>
      </section>

      <div className="sticky top-16 z-30 border-b border-primary-500/10 bg-background-50/95 backdrop-blur-md md:top-20">
        <div className="w-full px-4 md:px-8 lg:px-12">
          <div
            role="tablist"
            aria-label={`${config.title} filters`}
            className="flex gap-1 overflow-x-auto py-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {config.tabs.map((tab) => {
              const isActive = tab.id === activeTab
              return (
                <Link
                  key={tab.id}
                  to={tab.href}
                  role="tab"
                  aria-selected={isActive}
                  className={cn(
                    'relative shrink-0 whitespace-nowrap px-4 py-2.5 font-body text-sm transition-colors duration-300',
                    isActive
                      ? 'font-medium text-primary-500'
                      : 'text-foreground-600 hover:text-primary-500',
                  )}
                >
                  {tab.label}
                  <span
                    className={cn(
                      'absolute inset-x-3 bottom-0 h-0.5 origin-center rounded-full bg-accent-500 transition-transform duration-300',
                      isActive ? 'scale-x-100' : 'scale-x-0',
                    )}
                  />
                </Link>
              )
            })}
          </div>
        </div>
      </div>

      <section className="w-full px-4 py-10 md:px-8 md:py-14 lg:px-12">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="font-body text-xs uppercase tracking-[0.18em] text-foreground-500">
              {products.length} pieces
            </p>
            <h2 className="mt-1 font-heading text-2xl font-semibold text-foreground-900 md:text-3xl">
              {config.tabs.find((t) => t.id === activeTab)?.label ?? config.title}
            </h2>
          </div>
          <Link
            to="/"
            className="hidden font-body text-sm text-primary-500 transition-colors hover:text-primary-600 sm:inline"
          >
            ← Back to home
          </Link>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={`${activeTab}-${product.id}`} product={product} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-primary-500/10 bg-background-100 px-6 py-16 text-center">
            <p className="font-heading text-xl font-semibold text-foreground-900">
              Pieces arriving soon
            </p>
            <p className="mt-2 font-body text-sm text-foreground-500">
              Explore our sarees and kurtas while we curate this edit.
            </p>
            <Link
              to="/category/sarees"
              className="mt-6 inline-flex rounded-full bg-primary-500 px-5 py-2.5 font-body text-sm font-medium text-background-50"
            >
              Browse Sarees
            </Link>
          </div>
        )}
      </section>
    </div>
  )
}
