import type {
  BlouseType,
  CategoryTile,
  CollectionTile,
  ComboTile,
  InstagramPost,
  NavLink,
  OccasionTile,
  Product,
  Testimonial,
} from '@/types'
import { PHOTOS } from '@/data/photos'

export const NAV_LINKS: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Sarees', href: '/category/sarees' },
  { label: 'Kurtas', href: '/category/kurtas' },
  { label: 'Blouses', href: '/category/blouses' },
  { label: 'Dresses', href: '/category/dresses' },
  { label: 'Kids', href: '/category/kids' },
  { label: 'About', href: '/#about' },
  { label: 'Contact', href: '/#contact' },
]

export const CATEGORY_TILES: CategoryTile[] = [
  { id: 'cat-sarees', name: 'Designer Sarees', count: '120+ Designs', image: PHOTOS.categories.sarees, href: '/category/sarees' },
  { id: 'cat-kurtas', name: 'Designer Kurtas', count: '85+ Designs', image: PHOTOS.categories.kurtas, href: '/category/kurtas' },
  { id: 'cat-blouses', name: 'Blouse Collections', count: '60+ Designs', image: PHOTOS.categories.blouses, href: '/category/blouses' },
  { id: 'cat-dresses', name: 'Ethnic Dresses', count: '45+ Designs', image: PHOTOS.categories.dresses, href: '/category/dresses' },
]

export const OCCASION_TILES: OccasionTile[] = [
  { id: 'occ-wedding', name: 'Wedding', subtitle: 'Bridal Edit', image: PHOTOS.occasions.wedding, href: '/occasion/wedding' },
  { id: 'occ-festivals', name: 'Festivals', subtitle: 'Festive Edit', image: PHOTOS.occasions.festivals, href: '/occasion/festivals' },
  { id: 'occ-daily', name: 'Daily Wear', subtitle: 'Everyday Elegance', image: PHOTOS.occasions.daily, href: '/occasion/daily-wear' },
  { id: 'occ-party', name: 'Party Wear', subtitle: 'Party Edit', image: PHOTOS.occasions.party, href: '/occasion/party-wear' },
]

export const FESTIVE_PRODUCTS: Product[] = [
  { id: 'p-priya', slug: 'priya-banarasi-silk-saree', name: 'Priya - Banarasi Silk Saree', price: 3850, originalPrice: 5500, image: PHOTOS.products.priya, badge: 'New Arrival', categorySlug: 'sarees' },
  { id: 'p-vibha-saree', slug: 'vibha-kanjeevaram-saree', name: 'Vibha - Kanjeevaram Saree', price: 2750, originalPrice: 3900, image: PHOTOS.products.vibha, badge: 'Bestseller', categorySlug: 'sarees' },
  { id: 'p-shriya', slug: 'shriya-chiffon-saree', name: 'Shriya - Chiffon Saree', price: 2250, originalPrice: 3200, image: PHOTOS.products.shriya, badge: 'Trending', categorySlug: 'sarees' },
  { id: 'p-aakriti', slug: 'aakriti-tussar-silk-saree', name: 'Aakriti - Tussar Silk Saree', price: 1950, originalPrice: 2800, image: PHOTOS.products.aakriti, badge: 'New', categorySlug: 'sarees' },
]

export const KIDS_PRODUCTS: Product[] = [
  { id: 'p-vaani', slug: 'vaani-kids-lehenga-set', name: 'Vaani - Kids Lehenga Set', price: 2850, originalPrice: 3600, image: PHOTOS.products.vaani, badge: 'Kids', categorySlug: 'kids' },
  { id: 'p-vibha-kids', slug: 'vibha-kids-anarkali', name: 'Vibha - Kids Anarkali', price: 2750, originalPrice: 3400, image: PHOTOS.products.vibhaKids, badge: 'Kids', categorySlug: 'kids' },
  { id: 'p-baby-frock', slug: 'baby-girl-silk-frock', name: 'Baby Girl - Silk Frock', price: 1850, originalPrice: 2400, image: PHOTOS.products.babyFrock, badge: 'Kids', categorySlug: 'kids' },
  { id: 'p-baby-gown', slug: 'baby-girl-ethnic-gown', name: 'Baby Girl - Ethnic Gown', price: 1550, originalPrice: 2000, image: PHOTOS.products.babyGown, badge: 'Kids', categorySlug: 'kids' },
]

export const BLOUSE_TYPES: BlouseType[] = [
  { id: 'b-hakoba', name: 'Hakoba Blouse', image: PHOTOS.blouses.hakoba, href: '/category/blouses?type=hakoba' },
  { id: 'b-daily', name: 'Daily Wear Blouse', image: PHOTOS.blouses.daily, href: '/category/blouses?type=daily' },
  { id: 'b-maggam', name: 'Maggam Work Blouse', image: PHOTOS.blouses.maggam, href: '/category/blouses?type=maggam' },
  { id: 'b-traditional', name: 'Traditional Blouse', image: PHOTOS.blouses.traditional, href: '/category/blouses?type=traditional' },
]

export const DAILY_KURTA_PRODUCTS: Product[] = [
  { id: 'p-saira-cotton', slug: 'saira-cotton-kurta-set', name: 'Saira - Cotton Kurta Set', price: 1850, originalPrice: 2400, image: PHOTOS.products.sairaCotton, categorySlug: 'kurtas' },
  { id: 'p-saira-silk', slug: 'saira-silk-blend-kurta', name: 'Saira - Silk Blend Kurta', price: 2550, originalPrice: 3200, image: PHOTOS.products.sairaSilk, categorySlug: 'kurtas' },
  { id: 'p-saira-printed', slug: 'saira-printed-kurta-set', name: 'Saira - Printed Kurta Set', price: 1950, originalPrice: 2500, image: PHOTOS.products.sairaPrinted, categorySlug: 'kurtas' },
  { id: 'p-aadhira-1', slug: 'aadhira-raw-silk-3-piece-suit-1', name: 'Aadhira - Raw Silk 3-Piece Suit', price: 2250, originalPrice: 2900, image: PHOTOS.products.aadhira1, categorySlug: 'kurtas' },
  { id: 'p-aadhira-2', slug: 'aadhira-raw-silk-3-piece-suit-2', name: 'Aadhira - Raw Silk 3-Piece Suit', price: 2550, originalPrice: 3200, image: PHOTOS.products.aadhira2, categorySlug: 'kurtas' },
  { id: 'p-aadhira-3', slug: 'aadhira-raw-silk-3-piece-suit-3', name: 'Aadhira - Raw Silk 3-Piece Suit', price: 2450, originalPrice: 3100, image: PHOTOS.products.aadhira3, categorySlug: 'kurtas' },
]

export const TRADITIONAL_KURTA_PRODUCTS: Product[] = DAILY_KURTA_PRODUCTS.slice(3)

export const COMBO_TILES: ComboTile[] = [
  { id: 'combo-mother-daughter', name: 'Mother Daughter Saree Set', image: PHOTOS.combos.motherDaughter, href: '/collection/mother-daughter-saree' },
  { id: 'combo-twinning-kurta', name: 'Twinning Kurta Collection', image: PHOTOS.combos.twinning, href: '/collection/twinning-kurta' },
  { id: 'combo-festive-family', name: 'Festive Family Set', image: PHOTOS.combos.festive, href: '/collection/festive-family-set' },
]

export const DRESS_PRODUCTS: Product[] = [
  { id: 'p-vaishnava', slug: 'vaishnava-traditional-skirt-set', name: 'Vaishnava - Traditional Skirt Set', price: 4100, originalPrice: 5200, image: PHOTOS.products.vaishnava, categorySlug: 'dresses' },
  { id: 'p-sohvi-crop', slug: 'sohvi-hakoba-crop-top-skirt', name: 'Sohvi - Hakoba Crop Top & Skirt', price: 3850, originalPrice: 4800, image: PHOTOS.products.sohviCrop, categorySlug: 'dresses' },
  { id: 'p-sohvi-dress', slug: 'sohvi-ethnic-dress', name: 'Sohvi - Ethnic Dress', price: 5000, originalPrice: 6200, image: PHOTOS.products.sohviDress, categorySlug: 'dresses' },
  { id: 'p-parvathamalli-1', slug: 'parvathamalli-half-saree-1', name: 'Parvathamalli - Half Saree', price: 5850, originalPrice: 7200, image: PHOTOS.products.parvathamalli1, categorySlug: 'half-sarees' },
  { id: 'p-parvathamalli-2', slug: 'parvathamalli-half-saree-2', name: 'Parvathamalli - Half Saree', price: 5850, originalPrice: 7200, image: PHOTOS.products.parvathamalli2, categorySlug: 'half-sarees' },
  { id: 'p-brhinda', slug: 'brhinda-pure-chiffon-half-saree', name: 'Brhinda - Pure Chiffon Half Saree', price: 4850, originalPrice: 6000, image: PHOTOS.products.brhinda, categorySlug: 'half-sarees' },
]

export const HALF_SAREE_PRODUCTS: Product[] = DRESS_PRODUCTS.slice(3)

export const COLLECTION_TILES: CollectionTile[] = [
  { id: 'coll-aaditri', name: 'Aaditri', subtitle: 'Wedding Collection', image: PHOTOS.collections.aaditri, href: '/collection/aaditri' },
  { id: 'coll-nirvi', name: 'Nirvi', subtitle: 'Festive Collection', image: PHOTOS.collections.nirvi, href: '/collection/nirvi' },
  { id: 'coll-gulabi', name: 'Gulabi', subtitle: 'Daily Wear Collection', image: PHOTOS.collections.gulabi, href: '/collection/gulabi' },
  { id: 'coll-shriya', name: 'Shriya', subtitle: 'Party Wear Collection', image: PHOTOS.collections.shriya, href: '/collection/shriya' },
]

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    name: 'Priya Sharma',
    location: 'Bangalore',
    quote:
      'ANIRA has completely transformed my wardrobe for festive occasions. The saree quality is unmatched and the designs are so unique. I get compliments every time I wear one!',
    avatar: PHOTOS.testimonial,
    rating: 5,
  },
  {
    id: 't-2',
    name: 'Meera Iyer',
    location: 'Chennai',
    quote:
      'The kurta sets are so comfortable yet elegant. I ordered for my daughter and me for Diwali and both sets fit perfectly. ANIRA is now our go-to for every festival.',
    avatar: PHOTOS.testimonial,
    rating: 5,
  },
  {
    id: 't-3',
    name: 'Ananya Reddy',
    location: 'Hyderabad',
    quote:
      "Ordered a bridal lehenga for my sister's wedding and the craftsmanship was beyond expectations. Delivery was on time and the packaging felt truly premium.",
    avatar: PHOTOS.testimonial,
    rating: 5,
  },
]

export const INSTAGRAM_POSTS: InstagramPost[] = PHOTOS.instagram.map((image, i) => ({
  id: `ig-${i + 1}`,
  image,
  href: 'https://instagram.com/anira.theethinicstudio',
}))
