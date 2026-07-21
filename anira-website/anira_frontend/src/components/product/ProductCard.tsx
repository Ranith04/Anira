import { Link } from 'react-router'
import { Heart, ShoppingBag } from 'lucide-react'
import type { MouseEvent } from 'react'
import type { Product } from '@/types'
import { formatInr, getDiscountPercent } from '@/lib/image'
import { useCartStore } from '@/store/cartStore'
import { cn } from '@/lib/cn'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const discount = getDiscountPercent(product.price, product.originalPrice)
  const toggleWishlist = useCartStore((state) => state.toggleWishlist)
  const wished = useCartStore((state) =>
    (Array.isArray(state.wishlistIds) ? state.wishlistIds : []).includes(product.id),
  )

  const handleAdd = (e: MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    useCartStore.getState().addToCart({
      id: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.image,
    })
  }

  return (
    <div className="group block">
      <div className="relative mb-3 aspect-[4/5] overflow-hidden rounded-lg bg-background-100 md:rounded-xl">
        <Link to={`/product/${product.slug}`} className="absolute inset-0 block">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </Link>
        {product.badge && (
          <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-primary-500 px-2.5 py-1 font-body text-[10px] font-medium text-background-50">
            {product.badge}
          </span>
        )}
        {discount > 0 && (
          <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-accent-500 px-2.5 py-1 font-body text-[10px] font-medium text-background-50">
            {discount}% OFF
          </span>
        )}
        <button
          type="button"
          aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            toggleWishlist(product.id)
          }}
          className={cn(
            'absolute bottom-3 left-3 z-10 flex size-9 items-center justify-center rounded-full backdrop-blur-sm transition-all duration-300',
            wished
              ? 'bg-primary-500 text-background-50 opacity-100'
              : 'bg-background-50/90 text-primary-500 opacity-0 group-hover:opacity-100 hover:bg-primary-500 hover:text-background-50',
          )}
        >
          <Heart className={cn('size-3.5', wished && 'fill-current')} />
        </button>
        <button
          type="button"
          aria-label="Add to cart"
          onClick={handleAdd}
          className="absolute bottom-3 right-3 z-10 flex size-9 items-center justify-center rounded-full bg-background-50/90 text-primary-500 opacity-0 backdrop-blur-sm transition-opacity duration-300 hover:bg-primary-500 hover:text-background-50 group-hover:opacity-100"
        >
          <ShoppingBag className="size-3.5" />
        </button>
      </div>
      <Link to={`/product/${product.slug}`}>
        <h3 className="mb-1 font-body text-sm font-medium text-foreground-800 transition-colors group-hover:text-primary-500">
          {product.name}
        </h3>
        <div className="flex items-center gap-2">
          <span className="font-body text-sm font-semibold text-primary-500">{formatInr(product.price)}</span>
          {discount > 0 && (
            <span className="font-body text-xs text-foreground-400 line-through">
              {formatInr(product.originalPrice)}
            </span>
          )}
        </div>
      </Link>
    </div>
  )
}
