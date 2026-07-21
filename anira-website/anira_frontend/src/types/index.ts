export interface Product {
  id: string
  slug: string
  name: string
  price: number
  originalPrice: number
  image: string
  hoverImage?: string
  badge?: string
  categorySlug: string
}

export interface ShopRangeTile {
  id: string
  name: string
  subtitle: string
  image: string
  href: string
  featured?: boolean
}

export interface CategoryTile {
  id: string
  name: string
  count: string
  image: string
  href: string
}

export interface OccasionTile {
  id: string
  name: string
  subtitle: string
  image: string
  href: string
}

export interface CollectionTile {
  id: string
  name: string
  subtitle: string
  image: string
  href: string
}

export interface StyleTile {
  id: string
  name: string
  image: string
  href: string
}

export interface Testimonial {
  id: string
  name: string
  location: string
  quote: string
  avatar: string
  rating: number
}

export interface InstagramPost {
  id: string
  image: string
  href: string
}

export interface NavChild {
  label: string
  href: string
  description?: string
  image?: string
}

export interface NavLink {
  label: string
  href: string
  children?: NavChild[]
}

export type OrderStatus = 'placed' | 'packed' | 'shipped' | 'delivered'

export interface Address {
  id: string
  label: string
  name: string
  phone: string
  line1: string
  line2?: string
  city: string
  state: string
  pincode: string
  isDefault?: boolean
}

export interface UserProfile {
  name: string
  email: string
  phone: string
}

export interface OrderItem {
  id: string
  slug: string
  name: string
  price: number
  image: string
  quantity: number
}

export interface Order {
  id: string
  createdAt: string
  status: OrderStatus
  items: OrderItem[]
  subtotal: number
  shipping: number
  total: number
  contact: { name: string; email: string; phone: string }
  address: Omit<Address, 'id' | 'label' | 'isDefault'>
  paymentMethod: string
}
