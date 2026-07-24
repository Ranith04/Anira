import { Routes, Route } from 'react-router'
import { lazy, Suspense } from 'react'
import { MainLayout } from '@/components/layout/MainLayout'
import { AdminLayout } from '@/components/admin/layout/AdminLayout'
import { AdminGuard } from '@/components/admin/layout/AdminGuard'

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

// Admin Pages
const AdminDashboard = lazy(() => import('@/pages/admin/AdminDashboard'))
const ProductList = lazy(() => import('@/pages/admin/ProductList'))
const ProductForm = lazy(() => import('@/pages/admin/ProductForm'))
const OrderList = lazy(() => import('@/pages/admin/OrderList'))
const CustomerList = lazy(() => import('@/pages/admin/CustomerList'))

export const AppRoutes = () => {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center font-sans">Loading...</div>}>
      <Routes>
        <Route element={<MainLayout />}>
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
        </Route>
        
        <Route path="/admin">
          <Route element={<AdminGuard />}>
            <Route element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="products" element={<ProductList />} />
              <Route path="products/new" element={<ProductForm />} />
              <Route path="products/:id" element={<ProductForm />} />
              <Route path="orders" element={<OrderList />} />
              <Route path="customers" element={<CustomerList />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </Suspense>
  )
}
