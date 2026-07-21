import { Routes, Route } from 'react-router'
import { lazy, Suspense } from 'react'

const Home = lazy(() => import('@/pages/Home'))
const CategoryListing = lazy(() => import('@/pages/CategoryListing'))
const ProductDetail = lazy(() => import('@/pages/ProductDetail'))
const Cart = lazy(() => import('@/pages/Cart'))
const Checkout = lazy(() => import('@/pages/Checkout'))
const About = lazy(() => import('@/pages/About'))
const Contact = lazy(() => import('@/pages/Contact'))
const Search = lazy(() => import('@/pages/Search'))
const Account = lazy(() => import('@/pages/Account'))
const Orders = lazy(() => import('@/pages/Orders'))
const OrderDetail = lazy(() => import('@/pages/OrderDetail'))
const SizeGuide = lazy(() => import('@/pages/SizeGuide'))
const ShippingReturns = lazy(() => import('@/pages/ShippingReturns'))

export const AppRoutes = () => {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center font-sans">Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/search" element={<Search />} />
        <Route path="/account" element={<Account />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/orders/:id" element={<OrderDetail />} />
        <Route path="/size-guide" element={<SizeGuide />} />
        <Route path="/shipping-returns" element={<ShippingReturns />} />
        <Route path="/category/:slug" element={<CategoryListing type="category" />} />
        <Route path="/occasion/:slug" element={<CategoryListing type="occasion" />} />
        <Route path="/collection/:slug" element={<CategoryListing type="collection" />} />
        <Route path="/product/:slug" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </Suspense>
  )
}
