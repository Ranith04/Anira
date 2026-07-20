import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Product } from '@/types'

export interface CartLine {
  product: Pick<Product, 'id' | 'slug' | 'name' | 'price' | 'image'>
  quantity: number
}

interface CartState {
  lines: CartLine[]
  wishlistIds: string[]
  addToCart: (product: CartLine['product'], quantity?: number) => void
  removeFromCart: (productId: string) => void
  toggleWishlist: (productId: string) => void
  cartCount: () => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],
      wishlistIds: [],
      addToCart: (product, quantity = 1) =>
        set((state) => {
          const existing = state.lines.find((line) => line.product.id === product.id)
          if (existing) {
            return {
              lines: state.lines.map((line) =>
                line.product.id === product.id
                  ? { ...line, quantity: line.quantity + quantity }
                  : line,
              ),
            }
          }
          return { lines: [...state.lines, { product, quantity }] }
        }),
      removeFromCart: (productId) =>
        set((state) => ({ lines: state.lines.filter((line) => line.product.id !== productId) })),
      toggleWishlist: (productId) =>
        set((state) => ({
          wishlistIds: state.wishlistIds.includes(productId)
            ? state.wishlistIds.filter((id) => id !== productId)
            : [...state.wishlistIds, productId],
        })),
      cartCount: () => get().lines.reduce((sum, line) => sum + line.quantity, 0),
    }),
    { name: 'anira-cart' },
  ),
)
