import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Address, Order, OrderItem, Product, UserProfile } from '@/types'
import { calcShipping } from '@/data/catalog'

export interface CartLine {
  product: Pick<Product, 'id' | 'slug' | 'name' | 'price' | 'image'>
  quantity: number
}

interface CartState {
  lines: CartLine[]
  wishlistIds: string[]
  orders: Order[]
  profile: UserProfile
  addresses: Address[]

  addToCart: (product: CartLine['product'], quantity?: number) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  toggleWishlist: (productId: string) => void

  updateProfile: (profile: UserProfile) => void
  upsertAddress: (address: Address) => void
  removeAddress: (addressId: string) => void

  placeOrder: (input: {
    contact: Order['contact']
    address: Order['address']
    paymentMethod: string
  }) => Order | null

  getOrder: (id: string) => Order | undefined
  cartSubtotal: () => number
  cartCount: () => number
}

const DEFAULT_PROFILE: UserProfile = {
  name: 'Priya Sharma',
  email: 'priya@example.com',
  phone: '+91 98765 43210',
}

const DEFAULT_ADDRESSES: Address[] = [
  {
    id: 'addr-home',
    label: 'Home',
    name: 'Priya Sharma',
    phone: '+91 98765 43210',
    line1: '12th Cross, Electronic City Phase 1',
    line2: 'Near Tech Park',
    city: 'Bangalore',
    state: 'Karnataka',
    pincode: '560100',
    isDefault: true,
  },
]

function createOrderId() {
  const stamp = Date.now().toString(36).toUpperCase()
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase()
  return `ANR-${stamp.slice(-4)}${rand}`
}

function asLines(value: unknown): CartLine[] {
  return Array.isArray(value) ? (value as CartLine[]) : []
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],
      wishlistIds: [],
      orders: [],
      profile: DEFAULT_PROFILE,
      addresses: DEFAULT_ADDRESSES,

      addToCart: (product, quantity = 1) => {
        const qty = Math.max(1, quantity)
        set((state) => {
          const lines = asLines(state.lines)
          const existing = lines.find((line) => line.product.id === product.id)
          if (existing) {
            return {
              lines: lines.map((line) =>
                line.product.id === product.id
                  ? { ...line, quantity: line.quantity + qty }
                  : line,
              ),
            }
          }
          return { lines: [...lines, { product, quantity: qty }] }
        })
      },

      removeFromCart: (productId) =>
        set((state) => ({
          lines: asLines(state.lines).filter((line) => line.product.id !== productId),
        })),

      updateQuantity: (productId, quantity) =>
        set((state) => {
          const lines = asLines(state.lines)
          if (quantity <= 0) {
            return { lines: lines.filter((line) => line.product.id !== productId) }
          }
          return {
            lines: lines.map((line) =>
              line.product.id === productId ? { ...line, quantity } : line,
            ),
          }
        }),

      clearCart: () => set({ lines: [] }),

      toggleWishlist: (productId) =>
        set((state) => {
          const ids = Array.isArray(state.wishlistIds) ? state.wishlistIds : []
          return {
            wishlistIds: ids.includes(productId)
              ? ids.filter((id) => id !== productId)
              : [...ids, productId],
          }
        }),

      updateProfile: (profile) => set({ profile }),

      upsertAddress: (address) =>
        set((state) => {
          const current = Array.isArray(state.addresses) ? state.addresses : []
          const exists = current.some((a) => a.id === address.id)
          let addresses = exists
            ? current.map((a) => (a.id === address.id ? address : a))
            : [...current, address]
          if (address.isDefault) {
            addresses = addresses.map((a) => ({
              ...a,
              isDefault: a.id === address.id,
            }))
          }
          return { addresses }
        }),

      removeAddress: (addressId) =>
        set((state) => ({
          addresses: (Array.isArray(state.addresses) ? state.addresses : []).filter(
            (a) => a.id !== addressId,
          ),
        })),

      placeOrder: ({ contact, address, paymentMethod }) => {
        const lines = asLines(get().lines)
        if (lines.length === 0) return null

        const items: OrderItem[] = lines.map((line) => ({
          ...line.product,
          quantity: line.quantity,
        }))
        const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
        const shipping = calcShipping(subtotal)
        const order: Order = {
          id: createOrderId(),
          createdAt: new Date().toISOString(),
          status: 'placed',
          items,
          subtotal,
          shipping,
          total: subtotal + shipping,
          contact,
          address,
          paymentMethod,
        }

        set((state) => ({
          orders: [order, ...(Array.isArray(state.orders) ? state.orders : [])],
          lines: [],
        }))
        return order
      },

      getOrder: (id) => (Array.isArray(get().orders) ? get().orders : []).find((o) => o.id === id),

      cartSubtotal: () =>
        asLines(get().lines).reduce((sum, line) => sum + line.product.price * line.quantity, 0),

      cartCount: () => asLines(get().lines).reduce((sum, line) => sum + line.quantity, 0),
    }),
    {
      name: 'anira-cart',
      version: 1,
      merge: (persisted, current) => {
        const p = (persisted ?? {}) as Partial<CartState>
        return {
          ...current,
          ...p,
          lines: asLines(p.lines),
          wishlistIds: Array.isArray(p.wishlistIds) ? p.wishlistIds : [],
          orders: Array.isArray(p.orders) ? p.orders : [],
          profile: p.profile ?? current.profile,
          addresses: Array.isArray(p.addresses) ? p.addresses : current.addresses,
        }
      },
    },
  ),
)
