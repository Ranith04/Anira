import { useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { Check, Heart, Minus, Plus, ShoppingBag, Truck } from 'lucide-react'
import { ProductCard } from '@/components/product/ProductCard'
import { ALL_PRODUCTS, FREE_SHIPPING_THRESHOLD, getProductBySlug } from '@/data/catalog'
import { formatInr, getDiscountPercent } from '@/lib/image'
import { useCartStore } from '@/store/cartStore'
import { cn } from '@/lib/cn'

const FABRIC_HINTS: Record<string, string> = {
  sarees: 'Handpicked weave with a standard blouse piece. Drape-ready for work and occasion.',
  kurtas: 'Soft ethnic silhouette with easy everyday comfort and festive polish.',
}

export default function ProductDetail() {
  const { slug = '' } = useParams()
  const navigate = useNavigate()
  const product = getProductBySlug(slug)
  const [qty, setQty] = useState(1)
  const [justAdded, setJustAdded] = useState(false)

  const toggleWishlist = useCartStore((s) => s.toggleWishlist)
  const wished = useCartStore((s) =>
    product ? s.wishlistIds.includes(product.id) : false,
  )

  const related = useMemo(() => {
    if (!product) return []
    return ALL_PRODUCTS.filter(
      (p) => p.categorySlug === product.categorySlug && p.id !== product.id,
    ).slice(0, 4)
  }, [product])

  if (!product) {
    return (
      <div className="w-full bg-background-50 px-4 py-16 md:px-8 lg:px-12">
        <div className="mx-auto max-w-lg rounded-2xl border border-primary-500/10 bg-background-100 px-6 py-16 text-center">
          <h1 className="font-heading text-2xl font-semibold text-foreground-900">
            Product not found
          </h1>
          <p className="mt-2 font-body text-sm text-foreground-500">
            This piece may have moved. Browse sarees or kurtas instead.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              to="/category/sarees"
              className="rounded-full bg-primary-500 px-5 py-2.5 font-body text-sm font-medium text-background-50"
            >
              Shop Sarees
            </Link>
            <Link
              to="/category/kurtas"
              className="rounded-full border border-primary-500/20 px-5 py-2.5 font-body text-sm font-medium text-primary-500"
            >
              Shop Kurtas
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const discount = getDiscountPercent(product.price, product.originalPrice)
  const categoryLabel = product.categorySlug === 'kurtas' ? 'Kurtas' : 'Sarees'
  const fabricHint =
    FABRIC_HINTS[product.categorySlug] ??
    'Crafted for the ANIRA edit — timeless ethnic wear with contemporary ease.'

  const handleAdd = () => {
    useCartStore.getState().addToCart(
      {
        id: product.id,
        slug: product.slug,
        name: product.name,
        price: product.price,
        image: product.image,
      },
      qty,
    )
    setJustAdded(true)
    window.setTimeout(() => setJustAdded(false), 2000)
  }

  const handleShopNow = () => {
    handleAdd()
    navigate('/cart')
  }

  return (
    <div className="w-full bg-background-50">
      <div className="w-full px-4 py-8 md:px-8 md:py-12 lg:px-12">
        <nav className="mb-6 font-body text-xs text-foreground-500">
          <Link to="/" className="hover:text-primary-500">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link to={`/category/${product.categorySlug}`} className="hover:text-primary-500">
            {categoryLabel}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground-800">{product.name}</span>
        </nav>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-14" data-reveal>
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-background-100">
            <img
              src={product.image}
              alt={product.name}
              className="size-full object-cover"
            />
            {product.badge && (
              <span className="absolute left-4 top-4 rounded-full bg-primary-500 px-3 py-1.5 font-body text-xs font-medium text-background-50">
                {product.badge}
              </span>
            )}
            {discount > 0 && (
              <span className="absolute right-4 top-4 rounded-full bg-accent-500 px-3 py-1.5 font-body text-xs font-medium text-background-50">
                {discount}% OFF
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <p className="font-body text-xs uppercase tracking-[0.22em] text-foreground-500">
              {categoryLabel}
            </p>
            <h1 className="mt-2 font-heading text-3xl font-semibold text-foreground-900 md:text-4xl">
              {product.name}
            </h1>

            <div className="mt-4 flex flex-wrap items-baseline gap-3">
              <span className="font-heading text-2xl font-semibold text-primary-500">
                {formatInr(product.price)}
              </span>
              {discount > 0 && (
                <span className="font-body text-base text-foreground-400 line-through">
                  {formatInr(product.originalPrice)}
                </span>
              )}
              {discount > 0 && (
                <span className="rounded-full bg-accent-500/15 px-2.5 py-1 font-body text-xs font-medium text-accent-700">
                  Save {formatInr(product.originalPrice - product.price)}
                </span>
              )}
            </div>

            <p className="mt-5 max-w-lg font-body text-sm leading-relaxed text-foreground-600">
              {fabricHint} Inclusive of taxes. Free shipping on orders{' '}
              {formatInr(FREE_SHIPPING_THRESHOLD)} and above.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <div className="inline-flex items-center rounded-full border border-primary-500/15 bg-background-100">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="flex size-10 items-center justify-center text-foreground-700 hover:text-primary-500"
                >
                  <Minus className="size-3.5" />
                </button>
                <span className="min-w-10 text-center font-body text-sm font-medium">{qty}</span>
                <button
                  type="button"
                  aria-label="Increase quantity"
                  onClick={() => setQty((q) => q + 1)}
                  className="flex size-10 items-center justify-center text-foreground-700 hover:text-primary-500"
                >
                  <Plus className="size-3.5" />
                </button>
              </div>

              <button
                type="button"
                onClick={handleAdd}
                className={cn(
                  'inline-flex flex-1 items-center justify-center gap-2 rounded-full px-6 py-3 font-body text-sm font-medium transition-colors sm:flex-none sm:min-w-[200px]',
                  justAdded
                    ? 'bg-accent-500 text-background-50'
                    : 'bg-primary-500 text-background-50 hover:bg-primary-600',
                )}
              >
                {justAdded ? (
                  <>
                    <Check className="size-4" />
                    Added to Bag
                  </>
                ) : (
                  <>
                    <ShoppingBag className="size-4" />
                    Add to Bag
                  </>
                )}
              </button>

              <button
                type="button"
                aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
                onClick={() => toggleWishlist(product.id)}
                className={cn(
                  'flex size-11 items-center justify-center rounded-full border transition-colors',
                  wished
                    ? 'border-primary-500 bg-primary-500 text-background-50'
                    : 'border-primary-500/20 text-primary-500 hover:bg-primary-500 hover:text-background-50',
                )}
              >
                <Heart className={cn('size-4', wished && 'fill-current')} />
              </button>
            </div>

            <div className="mt-4 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleShopNow}
                className="inline-flex items-center justify-center rounded-full border border-primary-500/20 px-6 py-3 font-body text-sm font-medium text-primary-500 transition-colors hover:border-primary-500 hover:bg-primary-500 hover:text-background-50"
              >
                Shop Now
              </button>
              <Link
                to="/size-guide"
                className="inline-flex items-center font-body text-sm text-foreground-600 underline-offset-4 hover:text-primary-500 hover:underline"
              >
                Size guide
              </Link>
            </div>

            <ul className="mt-8 space-y-3 rounded-2xl border border-primary-500/10 bg-background-100 p-5 font-body text-sm text-foreground-600">
              <li className="flex gap-3">
                <Truck className="mt-0.5 size-4 shrink-0 text-primary-500" />
                <span>
                  Free shipping above {formatInr(FREE_SHIPPING_THRESHOLD)}. Standard delivery 4–7
                  business days.
                </span>
              </li>
              <li>
                <span className="font-medium text-foreground-800">Details — </span>
                {product.badge ? `${product.badge}. ` : ''}
                Part of the ANIRA {categoryLabel.toLowerCase()} edit. Easy returns within 7 days on
                unused pieces with tags.
              </li>
              <li>
                <Link to="/shipping-returns" className="text-primary-500 hover:text-primary-600">
                  Shipping & returns →
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-16 md:mt-20">
            <p className="font-body text-xs uppercase tracking-[0.22em] text-foreground-500">
              You may also like
            </p>
            <h2 className="mt-1 font-heading text-2xl font-semibold text-foreground-900 md:text-3xl">
              More from {categoryLabel}
            </h2>
            <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
