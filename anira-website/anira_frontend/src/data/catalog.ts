import {
  DAILY_KURTA_PRODUCTS,
  FESTIVE_KURTA_PRODUCTS,
  WORK_SAREE_PRODUCTS,
} from '@/data/homeData'
import type { Product } from '@/types'

/** Full shoppable catalog used by search, wishlist, and account */
export const ALL_PRODUCTS: Product[] = [
  ...WORK_SAREE_PRODUCTS,
  ...DAILY_KURTA_PRODUCTS,
  ...FESTIVE_KURTA_PRODUCTS,
]

export function getProductById(id: string): Product | undefined {
  return ALL_PRODUCTS.find((p) => p.id === id)
}

export function getProductBySlug(slug: string): Product | undefined {
  return ALL_PRODUCTS.find((p) => p.slug === slug)
}

export function searchProducts(query: string): Product[] {
  const q = query.trim().toLowerCase()
  if (!q) return []
  return ALL_PRODUCTS.filter((p) => {
    const haystack = [p.name, p.categorySlug, p.badge ?? '', p.slug].join(' ').toLowerCase()
    return haystack.includes(q)
  })
}

export const FREE_SHIPPING_THRESHOLD = 2999

export function calcShipping(subtotal: number): number {
  if (subtotal <= 0) return 0
  return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 99
}
