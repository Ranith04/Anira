import { Link, useLocation } from 'react-router'
import { LayoutDashboard, Package, ShoppingCart, Users } from 'lucide-react'
import { cn } from '@/lib/cn'

const ADMIN_LINKS = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/products', label: 'Products', icon: Package },
  { href: '/admin/orders', label: 'Orders', icon: ShoppingCart },
  { href: '/admin/customers', label: 'Customers', icon: Users },
]

export function AdminSidebar() {
  const location = useLocation()

  return (
    <aside className="fixed inset-y-0 left-0 z-50 w-64 border-r border-primary-500/10 bg-white/80 shadow-2xl backdrop-blur-xl transition-transform lg:translate-x-0">
      <div className="flex h-20 items-center justify-center border-b border-primary-500/10 px-6">
        <Link to="/admin" className="flex items-center gap-2">
          <div className="flex size-10 items-center justify-center rounded-full bg-primary-500">
            <span className="font-heading text-lg font-bold italic text-white">A</span>
          </div>
          <div>
            <h1 className="font-heading text-xl font-semibold text-primary-500 leading-none tracking-tight">Anira</h1>
            <p className="font-body text-[10px] uppercase tracking-[0.2em] text-foreground-500">Admin</p>
          </div>
        </Link>
      </div>

      <nav className="flex flex-col gap-2 p-4">
        {ADMIN_LINKS.map((link) => {
          const isActive = location.pathname === link.href || (link.href !== '/admin' && location.pathname.startsWith(link.href))
          return (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                'flex items-center gap-3 rounded-xl px-4 py-3 font-body text-sm font-medium transition-all duration-300',
                isActive
                  ? 'bg-primary-50 text-primary-500 shadow-sm'
                  : 'text-foreground-600 hover:bg-background-50 hover:text-primary-500'
              )}
            >
              <link.icon className={cn('size-5', isActive ? 'text-primary-500' : 'text-foreground-400')} />
              {link.label}
            </Link>
          )
        })}
      </nav>

      <div className="absolute bottom-0 left-0 w-full border-t border-primary-500/10 p-4">
        <Link
          to="/"
          className="flex items-center gap-3 rounded-xl px-4 py-3 font-body text-sm font-medium text-foreground-600 transition-all duration-300 hover:bg-background-50 hover:text-primary-500"
        >
          <svg className="size-5 text-foreground-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/></svg>
          Go to Store
        </Link>
      </div>
    </aside>
  )
}
