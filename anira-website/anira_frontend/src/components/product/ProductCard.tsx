import { Link } from 'react-router'
import { ShoppingBag } from 'lucide-react'
import type { Product } from '@/types'
import { formatInr, getDiscountPercent } from '@/lib/image'
import { useCartStore } from '@/store/cartStore'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const discount = getDiscountPercent(product.price, product.originalPrice)
  const addToCart = useCartStore((state) => state.addToCart)

  return (
    <div className="group block">
      <Link to={`/product/${product.slug}`}>
        <div className="relative mb-3 aspect-[4/5] overflow-hidden rounded-lg bg-background-100 md:rounded-xl">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {product.badge && (
            <span className="absolute left-3 top-3 rounded-full bg-primary-500 px-2.5 py-1 font-body text-[10px] font-medium text-background-50">
              {product.badge}
            </span>
          )}
          {discount > 0 && (
            <span className="absolute right-3 top-3 rounded-full bg-accent-500 px-2.5 py-1 font-body text-[10px] font-medium text-background-50">
              {discount}% OFF
            </span>
          )}
          <button
            type="button"
            aria-label="Add to cart"
            onClick={(e) => {
              e.preventDefault()
              addToCart({
                id: product.id,
                slug: product.slug,
                name: product.name,
                price: product.price,
                image: product.image,
              })
            }}
            className="absolute bottom-3 right-3 flex size-9 items-center justify-center rounded-full bg-background-50/90 text-primary-500 opacity-0 backdrop-blur-sm transition-opacity duration-300 hover:bg-primary-500 hover:text-background-50 group-hover:opacity-100"
          >
            <ShoppingBag className="size-3.5" />
          </button>
        </div>
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
