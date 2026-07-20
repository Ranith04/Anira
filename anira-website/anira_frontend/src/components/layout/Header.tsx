import { useEffect, useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router'
import { Menu, Search, ShoppingBag, User, X } from 'lucide-react'
import { NAV_LINKS } from '@/data/homeData'
import { useCartStore } from '@/store/cartStore'
import { cn } from '@/lib/cn'

function Logo() {
  return (
    <Link to="/" className="flex shrink-0 items-center gap-2">
      <div className="flex size-10 items-center justify-center rounded-full bg-primary-500 md:size-12">
        <span className="font-heading text-lg font-bold italic text-background-50 md:text-xl">A</span>
      </div>
      <div className="hidden sm:block">
        <h1 className="font-heading text-xl font-semibold leading-none tracking-tight text-primary-500 md:text-2xl">
          Anira
        </h1>
        <p className="font-body text-[10px] uppercase tracking-[0.2em] text-foreground-600 md:text-xs">
          The Ethnic Studio
        </p>
      </div>
    </Link>
  )
}

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  const cartCount = useCartStore((state) => state.lines.reduce((sum, l) => sum + l.quantity, 0))

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return
    navigate(`/category/search?q=${encodeURIComponent(searchQuery.trim())}`)
    setIsSearchOpen(false)
  }

  return (
    <header
      className={cn(
        'sticky top-0 z-50 transition-all duration-500',
        isScrolled ? 'bg-background-50/95 shadow-sm backdrop-blur-md' : 'bg-transparent',
      )}
    >
      <div className="w-full px-4 md:px-8 lg:px-12">
        <div className="flex h-16 items-center justify-between md:h-20">
          <Logo />

          <nav className="hidden items-center gap-6 lg:flex xl:gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="whitespace-nowrap font-body text-sm text-foreground-700 transition-colors duration-300 hover:text-primary-500"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3 md:gap-4">
            <button
              type="button"
              aria-label="Search"
              onClick={() => setIsSearchOpen((v) => !v)}
              className="flex size-9 items-center justify-center text-foreground-700 transition-colors hover:text-primary-500"
            >
              <Search className="size-[18px]" />
            </button>
            <Link
              to="/account"
              aria-label="Account"
              className="hidden size-9 items-center justify-center text-foreground-700 transition-colors hover:text-primary-500 sm:flex"
            >
              <User className="size-[18px]" />
            </Link>
            <Link
              to="/cart"
              aria-label="Cart"
              className="relative flex size-9 items-center justify-center text-foreground-700 transition-colors hover:text-primary-500"
            >
              <ShoppingBag className="size-[18px]" />
              <span className="absolute -right-0.5 -top-0.5 flex size-4 items-center justify-center rounded-full bg-primary-500 font-body text-[10px] font-medium text-background-50">
                {cartCount}
              </span>
            </Link>
            <button
              type="button"
              aria-label="Open menu"
              className="flex size-9 items-center justify-center text-foreground-700 lg:hidden"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="size-5" />
            </button>
          </div>
        </div>
      </div>

      {isSearchOpen && (
        <div className="border-t border-background-200 bg-background-50 px-4 py-3 md:px-8 lg:px-12">
          <form onSubmit={handleSearchSubmit} className="flex items-center gap-3">
            <Search className="size-5 shrink-0 text-primary-500" />
            <input
              autoFocus
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for sarees, kurtas..."
              className="w-full bg-transparent font-body text-sm text-foreground-900 placeholder:text-foreground-400 focus:outline-none"
            />
            <button type="button" aria-label="Close search" onClick={() => setIsSearchOpen(false)}>
              <X className="size-5 text-foreground-500" />
            </button>
          </form>
        </div>
      )}

      <div
        className={cn(
          'fixed inset-0 z-[60] bg-black/40 transition-opacity lg:hidden',
          isMobileMenuOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
        onClick={() => setIsMobileMenuOpen(false)}
      />
      <aside
        className={cn(
          'fixed inset-y-0 right-0 z-[70] w-[80%] max-w-sm translate-x-full bg-background-50 shadow-2xl transition-transform duration-300 lg:hidden',
          isMobileMenuOpen && 'translate-x-0',
        )}
      >
        <div className="flex items-center justify-between border-b border-background-200 px-5 py-4">
          <Logo />
          <button type="button" aria-label="Close menu" onClick={() => setIsMobileMenuOpen(false)}>
            <X className="size-6 text-foreground-900" />
          </button>
        </div>
        <nav className="flex flex-col divide-y divide-background-200 font-body">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-5 py-4 text-base font-medium text-foreground-800 hover:bg-background-100 hover:text-primary-500"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>
    </header>
  )
}
