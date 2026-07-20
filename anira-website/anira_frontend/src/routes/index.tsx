import { Routes, Route } from 'react-router'
import { lazy, Suspense } from 'react'

const Home = lazy(() => import('@/pages/Home'))
const CategoryListing = lazy(() => import('@/pages/CategoryListing'))
const ProductDetail = lazy(() => import('@/pages/ProductDetail'))
const Cart = lazy(() => import('@/pages/Cart'))
const Checkout = lazy(() => import('@/pages/Checkout'))

export const AppRoutes = () => {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center font-sans">Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
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
