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
