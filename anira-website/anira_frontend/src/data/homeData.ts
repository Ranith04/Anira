import type {
  CategoryTile,
  CollectionTile,
  InstagramPost,
  NavLink,
  OccasionTile,
  Product,
  StyleTile,
  Testimonial,
} from '@/types'
import { PHOTOS } from '@/data/photos'

export const NAV_LINKS: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Sarees', href: '/category/sarees' },
  { label: 'Kurtas', href: '/category/kurtas' },
  { label: 'Collections', href: '/#collections' },
  { label: 'About', href: '/#about' },
  { label: 'Contact', href: '/#contact' },
]

export const CATEGORY_TILES: CategoryTile[] = [
  {
    id: 'cat-work-sarees',
    name: 'Work Sarees',
    count: '80+ Designs',
    image: PHOTOS.categories.sarees,
    href: '/category/sarees?type=work',
  },
  {
    id: 'cat-designer-sarees',
    name: 'Designer Sarees',
    count: '60+ Designs',
    image: PHOTOS.collections.nirvi,
    href: '/category/sarees',
  },
  {
    id: 'cat-daily-kurtas',
    name: 'Daily Wear Kurtas',
    count: '50+ Designs',
    image: PHOTOS.categories.kurtas,
    href: '/category/kurtas?type=daily',
  },
  {
    id: 'cat-festive-kurtas',
    name: 'Festive Kurtas',
    count: '45+ Designs',
    image: PHOTOS.products.aadhira1,
    href: '/category/kurtas?type=festive',
  },
]

export const OCCASION_TILES: OccasionTile[] = [
  {
    id: 'occ-festivals',
    name: 'Festivals',
    subtitle: 'Festive Edit',
    image: PHOTOS.collections.nirvi,
    href: '/occasion/festivals',
  },
  {
    id: 'occ-daily',
    name: 'Daily Wear',
    subtitle: 'Everyday Elegance',
    image: PHOTOS.occasions.daily,
    href: '/occasion/daily-wear',
  },
  {
    id: 'occ-party',
    name: 'Party Wear',
    subtitle: 'Evening Edit',
    image: PHOTOS.collections.shriya,
    href: '/occasion/party-wear',
  },
  {
    id: 'occ-office',
    name: 'Office Wear',
    subtitle: 'Workday Grace',
    image: PHOTOS.products.sairaSilk,
    href: '/occasion/office-wear',
  },
]

export const WORK_SAREE_PRODUCTS: Product[] = [
  {
    id: 'p-priya',
    slug: 'priya-banarasi-silk-saree',
    name: 'Priya - Banarasi Silk Saree',
    price: 3850,
    originalPrice: 5500,
    image: PHOTOS.products.priya,
    badge: 'New Arrival',
    categorySlug: 'sarees',
  },
  {
    id: 'p-vibha-saree',
    slug: 'vibha-kanjeevaram-saree',
    name: 'Vibha - Kanjeevaram Saree',
    price: 2750,
    originalPrice: 3900,
    image: PHOTOS.products.vibha,
    badge: 'Bestseller',
    categorySlug: 'sarees',
  },
  {
    id: 'p-shriya',
    slug: 'shriya-chiffon-saree',
    name: 'Shriya - Chiffon Saree',
    price: 2250,
    originalPrice: 3200,
    image: PHOTOS.products.shriya,
    badge: 'Trending',
    categorySlug: 'sarees',
  },
  {
    id: 'p-aakriti',
    slug: 'aakriti-tussar-silk-saree',
    name: 'Aakriti - Tussar Silk Saree',
    price: 1950,
    originalPrice: 2800,
    image: PHOTOS.products.aakriti,
    badge: 'New',
    categorySlug: 'sarees',
  },
]

export const DAILY_KURTA_PRODUCTS: Product[] = [
  {
    id: 'p-saira-cotton',
    slug: 'saira-cotton-kurta-set',
    name: 'Saira - Cotton Kurta Set',
    price: 1850,
    originalPrice: 2400,
    image: PHOTOS.products.sairaCotton,
    categorySlug: 'kurtas',
  },
  {
    id: 'p-saira-silk',
    slug: 'saira-silk-blend-kurta',
    name: 'Saira - Silk Blend Kurta',
    price: 2550,
    originalPrice: 3200,
    image: PHOTOS.products.sairaSilk,
    categorySlug: 'kurtas',
  },
  {
    id: 'p-saira-printed',
    slug: 'saira-printed-kurta-set',
    name: 'Saira - Printed Kurta Set',
    price: 1950,
    originalPrice: 2500,
    image: PHOTOS.products.sairaPrinted,
    categorySlug: 'kurtas',
  },
]

export const FESTIVE_KURTA_PRODUCTS: Product[] = [
  {
    id: 'p-aadhira-1',
    slug: 'aadhira-raw-silk-3-piece-suit-1',
    name: 'Aadhira - Raw Silk 3-Piece Suit',
    price: 2250,
    originalPrice: 2900,
    image: PHOTOS.products.aadhira1,
    categorySlug: 'kurtas',
  },
  {
    id: 'p-aadhira-2',
    slug: 'aadhira-raw-silk-3-piece-suit-2',
    name: 'Aadhira - Raw Silk 3-Piece Suit',
    price: 2550,
    originalPrice: 3200,
    image: PHOTOS.products.aadhira2,
    categorySlug: 'kurtas',
  },
  {
    id: 'p-aadhira-3',
    slug: 'aadhira-raw-silk-3-piece-suit-3',
    name: 'Aadhira - Raw Silk 3-Piece Suit',
    price: 2450,
    originalPrice: 3100,
    image: PHOTOS.products.aadhira3,
    categorySlug: 'kurtas',
  },
]

export const KURTA_STYLES: StyleTile[] = [
  {
    id: 'kurta-cotton',
    name: 'Cotton Kurtas',
    image: PHOTOS.products.sairaCotton,
    href: '/category/kurtas?type=cotton',
  },
  {
    id: 'kurta-silk',
    name: 'Silk Blend Kurtas',
    image: PHOTOS.products.sairaSilk,
    href: '/category/kurtas?type=silk',
  },
  {
    id: 'kurta-printed',
    name: 'Printed Kurtas',
    image: PHOTOS.products.sairaPrinted,
    href: '/category/kurtas?type=printed',
  },
  {
    id: 'kurta-raw-silk',
    name: 'Raw Silk Suits',
    image: PHOTOS.products.aadhira1,
    href: '/category/kurtas?type=raw-silk',
  },
]

export const COLLECTION_TILES: CollectionTile[] = [
  {
    id: 'coll-aaditri',
    name: 'Aaditri',
    subtitle: 'Work Saree Edit',
    image: PHOTOS.collections.aaditri,
    href: '/collection/aaditri',
  },
  {
    id: 'coll-nirvi',
    name: 'Nirvi',
    subtitle: 'Festive Saree Edit',
    image: PHOTOS.collections.nirvi,
    href: '/collection/nirvi',
  },
  {
    id: 'coll-gulabi',
    name: 'Gulabi',
    subtitle: 'Daily Kurta Edit',
    image: PHOTOS.collections.gulabi,
    href: '/collection/gulabi',
  },
  {
    id: 'coll-shriya',
    name: 'Shriya',
    subtitle: 'Party Saree Edit',
    image: PHOTOS.collections.shriya,
    href: '/collection/shriya',
  },
]

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    name: 'Priya Sharma',
    location: 'Bangalore',
    quote:
      'ANIRA has completely transformed my wardrobe for festive occasions. The work saree quality is unmatched and the designs are so unique. I get compliments every time I wear one!',
    avatar: PHOTOS.avatar,
    rating: 5,
  },
  {
    id: 't-2',
    name: 'Meera Iyer',
    location: 'Chennai',
    quote:
      'The kurta sets are so comfortable yet elegant. Perfect for office and family gatherings. ANIRA is now my go-to for every occasion.',
    avatar: PHOTOS.avatar,
    rating: 5,
  },
  {
    id: 't-3',
    name: 'Ananya Reddy',
    location: 'Hyderabad',
    quote:
      'Ordered a designer work saree for a family function and the craftsmanship was beyond expectations. Delivery was on time and the packaging felt truly premium.',
    avatar: PHOTOS.avatar,
    rating: 5,
  },
]

export const INSTAGRAM_POSTS: InstagramPost[] = PHOTOS.instagram.map((image, i) => ({
  id: `ig-${i + 1}`,
  image,
  href: 'https://instagram.com/anira.theethinicstudio',
}))
