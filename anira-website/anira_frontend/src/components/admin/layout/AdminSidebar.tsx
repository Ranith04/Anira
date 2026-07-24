import { Link, useLocation } from 'react-router'
import { LayoutDashboard, Package, ShoppingCart, Users, LogOut, ExternalLink } from 'lucide-react'
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
    <aside className="fixed inset-y-0 left-0 z-50 w-72 border-r border-primary-900/5 bg-white/70 shadow-[4px_0_24px_rgba(0,0,0,0.02)] backdrop-blur-2xl transition-transform lg:translate-x-0">
      <div className="flex h-24 items-center px-8">
        <Link to="/admin" className="flex items-center gap-3 group">
          <div className="flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary-600 to-primary-800 shadow-lg shadow-primary-500/30 transition-transform group-hover:scale-105">
            <span className="font-heading text-2xl font-bold italic text-white leading-none mt-1">A</span>
          </div>
          <div>
            <h1 className="font-heading text-2xl font-bold text-foreground-900 leading-none tracking-tight group-hover:text-primary-600 transition-colors">Anira</h1>
            <p className="font-body text-[11px] font-semibold uppercase tracking-[0.2em] text-primary-600/70 mt-1">Admin Studio</p>
          </div>
        </Link>
      </div>

      <div className="px-6 py-4">
        <p className="mb-4 ml-2 font-body text-xs font-bold uppercase tracking-widest text-foreground-400">Menu</p>
        <nav className="flex flex-col gap-2">
          {ADMIN_LINKS.map((link) => {
            const isActive = location.pathname === link.href || (link.href !== '/admin' && location.pathname.startsWith(link.href))
            return (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  'group relative flex items-center gap-3 rounded-2xl px-4 py-3.5 font-body text-sm font-semibold transition-all duration-300',
                  isActive
                    ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/25 hover:bg-primary-700 hover:shadow-xl hover:shadow-primary-500/30'
                    : 'text-foreground-600 hover:bg-white hover:text-primary-600 hover:shadow-md'
                )}
              >
                <link.icon className={cn('size-5 transition-transform duration-300', isActive ? 'text-white' : 'text-foreground-400 group-hover:text-primary-600 group-hover:scale-110')} />
                {link.label}
                {isActive && (
                  <span className="absolute right-3 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                )}
              </Link>
            )
          })}
        </nav>
      </div>

      <div className="absolute bottom-0 left-0 w-full p-6">
        <div className="rounded-2xl border border-primary-900/5 bg-white/50 p-4 backdrop-blur-md">
          <Link
            to="/"
            className="group flex w-full items-center justify-between rounded-xl bg-white px-4 py-3 font-body text-sm font-semibold text-foreground-700 shadow-sm transition-all hover:text-primary-600 hover:shadow-md"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="size-4 text-foreground-400 group-hover:text-primary-600" />
              Storefront
            </span>
          </Link>
        </div>
      </div>
    </aside>
  )
}
