import { useEffect, useId, useRef, useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router'
import { ChevronDown, Menu, Search, ShoppingBag, User, X } from 'lucide-react'
import { NAV_LINKS } from '@/data/homeData'
import { useCartStore } from '@/store/cartStore'
import { cn } from '@/lib/cn'
import type { NavLink as NavLinkType } from '@/types'

function Logo({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <Link to="/" onClick={onNavigate} className="flex shrink-0 items-center gap-2">
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

function DesktopNavItem({ link }: { link: NavLinkType }) {
  const [open, setOpen] = useState(false)
  const closeTimer = useRef<number | null>(null)
  const panelId = useId()
  const hasChildren = Boolean(link.children?.length)

  const clearClose = () => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current)
      closeTimer.current = null
    }
  }

  const scheduleClose = () => {
    clearClose()
    closeTimer.current = window.setTimeout(() => setOpen(false), 140)
  }

  useEffect(() => () => clearClose(), [])

  if (!hasChildren) {
    return (
      <Link
        to={link.href}
        className="whitespace-nowrap font-body text-sm text-foreground-700 transition-colors duration-300 hover:text-primary-500"
      >
        {link.label}
      </Link>
    )
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => {
        clearClose()
        setOpen(true)
      }}
      onMouseLeave={scheduleClose}
      onFocus={() => {
        clearClose()
        setOpen(true)
      }}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setOpen(false)
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        className={cn(
          'inline-flex items-center gap-1 whitespace-nowrap font-body text-sm transition-colors duration-300',
          open ? 'text-primary-500' : 'text-foreground-700 hover:text-primary-500',
        )}
        onClick={() => setOpen((v) => !v)}
      >
        {link.label}
        <ChevronDown
          className={cn('size-3.5 transition-transform duration-300', open && 'rotate-180')}
        />
      </button>

      <div
        id={panelId}
        className={cn(
          'absolute left-1/2 top-full z-50 w-[min(92vw,560px)] -translate-x-1/2 pt-4 transition-all duration-300',
          open
            ? 'pointer-events-auto translate-y-0 opacity-100'
            : 'pointer-events-none -translate-y-1 opacity-0',
        )}
      >
        <div className="overflow-hidden rounded-2xl border border-primary-500/10 bg-background-50 shadow-[0_20px_50px_-20px_rgba(90,30,40,0.35)]">
          <div className="border-b border-primary-500/10 bg-background-100/70 px-5 py-3">
            <p className="font-body text-[10px] uppercase tracking-[0.22em] text-foreground-500">
              Shop {link.label}
            </p>
            <p className="mt-0.5 font-heading text-lg font-semibold text-primary-500">
              Curated for every occasion
            </p>
          </div>

          <div
            className={cn(
              'grid gap-3 p-4',
              (link.children?.length ?? 0) >= 3 ? 'grid-cols-3' : 'grid-cols-2',
            )}
          >
            {link.children!.map((child) => (
              <Link
                key={child.href}
                to={child.href}
                onClick={() => setOpen(false)}
                className="group relative overflow-hidden rounded-xl bg-background-100"
              >
                {child.image ? (
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <img
                      src={child.image}
                      alt={child.label}
                      className="size-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-500/85 via-primary-500/20 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-3">
                      <p className="font-body text-[10px] uppercase tracking-[0.16em] text-accent-400">
                        {child.description}
                      </p>
                      <h3 className="mt-1 font-heading text-base font-semibold text-background-50">
                        {child.label}
                      </h3>
                    </div>
                  </div>
                ) : (
                  <div className="px-3 py-4">
                    <h3 className="font-heading text-base font-semibold text-foreground-900 group-hover:text-primary-500">
                      {child.label}
                    </h3>
                    {child.description && (
                      <p className="mt-1 font-body text-xs text-foreground-500">{child.description}</p>
                    )}
                  </div>
                )}
              </Link>
            ))}
          </div>

          <div className="border-t border-primary-500/10 px-5 py-3">
            <Link
              to={link.href}
              onClick={() => setOpen(false)}
              className="font-body text-xs font-medium uppercase tracking-[0.16em] text-primary-500 transition-colors hover:text-primary-600"
            >
              View all {link.label} →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

function MobileNavItem({
  link,
  onNavigate,
}: {
  link: NavLinkType
  onNavigate: () => void
}) {
  const [expanded, setExpanded] = useState(false)
  const hasChildren = Boolean(link.children?.length)

  if (!hasChildren) {
    return (
      <Link
        to={link.href}
        onClick={onNavigate}
        className="block px-5 py-4 text-base font-medium text-foreground-800 hover:bg-background-100 hover:text-primary-500"
      >
        {link.label}
      </Link>
    )
  }

  return (
    <div className="border-b border-background-200 last:border-b-0">
      <button
        type="button"
        aria-expanded={expanded}
        onClick={() => setExpanded((v) => !v)}
        className="flex w-full items-center justify-between px-5 py-4 text-left text-base font-medium text-foreground-800 hover:bg-background-100 hover:text-primary-500"
      >
        {link.label}
        <ChevronDown
          className={cn('size-4 text-foreground-500 transition-transform', expanded && 'rotate-180')}
        />
      </button>

      <div
        className={cn(
          'grid transition-[grid-template-rows] duration-300',
          expanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
        )}
      >
        <div className="overflow-hidden">
          <div className="space-y-2 bg-background-100/60 px-4 pb-4 pt-1">
            <Link
              to={link.href}
              onClick={onNavigate}
              className="block rounded-lg px-3 py-2 font-body text-sm font-medium text-primary-500"
            >
              All {link.label}
            </Link>
            {link.children!.map((child) => (
              <Link
                key={child.href}
                to={child.href}
                onClick={onNavigate}
                className="flex items-center gap-3 rounded-xl bg-background-50 p-2 shadow-sm transition-colors hover:bg-background-50/80"
              >
                {child.image && (
                  <img
                    src={child.image}
                    alt=""
                    className="size-14 shrink-0 rounded-lg object-cover"
                  />
                )}
                <div>
                  <p className="font-heading text-base font-semibold text-foreground-900">
                    {child.label}
                  </p>
                  {child.description && (
                    <p className="font-body text-xs text-foreground-500">{child.description}</p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
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

  const closeMobile = () => setIsMobileMenuOpen(false)

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
              <DesktopNavItem key={link.href} link={link} />
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
        onClick={closeMobile}
      />
      <aside
        className={cn(
          'fixed inset-y-0 right-0 z-[70] w-[80%] max-w-sm translate-x-full bg-background-50 shadow-2xl transition-transform duration-300 lg:hidden',
          isMobileMenuOpen && 'translate-x-0',
        )}
      >
        <div className="flex items-center justify-between border-b border-background-200 px-5 py-4">
          <Logo onNavigate={closeMobile} />
          <button type="button" aria-label="Close menu" onClick={closeMobile}>
            <X className="size-6 text-foreground-900" />
          </button>
        </div>
        <nav className="flex flex-col font-body">
          {NAV_LINKS.map((link) => (
            <MobileNavItem key={link.href} link={link} onNavigate={closeMobile} />
          ))}
        </nav>
      </aside>
    </header>
  )
}
