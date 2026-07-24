import { useMemo, useState, type FormEvent } from 'react'
import { Link, Navigate, useSearchParams } from 'react-router'
import { Heart, MapPin, Package, User } from 'lucide-react'
import { ProductCard } from '@/components/product/ProductCard'
import { getProductById } from '@/data/catalog'
import { useCartStore } from '@/store/cartStore'
import { useQueryClient } from '@tanstack/react-query'
import { setAuthToken, authKeys } from '@/api/auth'
import { useRole } from '@/hooks/useRole'
import { Login } from './Auth/Login'
import { Register } from './Auth/Register'
import { cn } from '@/lib/cn'
import { PHOTOS } from '@/data/photos'
import type { Address } from '@/types'

type Tab = 'overview' | 'profile' | 'addresses' | 'wishlist'

const TABS: { id: Tab; label: string; icon: typeof User }[] = [
  { id: 'overview', label: 'Overview', icon: User },
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'addresses', label: 'Addresses', icon: MapPin },
  { id: 'wishlist', label: 'Wishlist', icon: Heart },
]

function isTab(value: string | null): value is Tab {
  return value === 'overview' || value === 'profile' || value === 'addresses' || value === 'wishlist'
}

export default function Account() {
  const queryClient = useQueryClient();
  const [params, setParams] = useSearchParams()
  const tabParam = params.get('tab')
  const tab: Tab = isTab(tabParam) ? tabParam : 'overview'

  const selectTab = (next: Tab) => {
    setParams(next === 'overview' ? {} : { tab: next }, { replace: true })
  }
  
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const { profile, isLoading, isAuthenticated, isAdmin, refetch } = useRole();

  const addresses = useCartStore((s) => s.addresses)
  const wishlistIds = useCartStore((s) => s.wishlistIds)
  const orders = useCartStore((s) => s.orders)
  const upsertAddress = useCartStore((s) => s.upsertAddress)
  const removeAddress = useCartStore((s) => s.removeAddress)

  const wishlistProducts = useMemo(
    () => wishlistIds.map(getProductById).filter((p): p is NonNullable<typeof p> => Boolean(p)),
    [wishlistIds],
  )

  if (isLoading) {
    return <div className="p-12 text-center font-body text-foreground-500">Loading profile...</div>;
  }

  if (!isAuthenticated || !profile) {
    return (
      <div className="relative flex min-h-[calc(100vh-80px)] w-full flex-col lg:flex-row">
        {/* Image Background (Full screen on mobile, left half on desktop) */}
        <div className="absolute inset-0 z-0 lg:relative lg:w-1/2 lg:block">
          <img
            src={PHOTOS.collections.shriya}
            alt="Elegant Saree"
            className="absolute inset-0 size-full object-cover"
          />
          {/* Mobile gets a darker overlay to make the glass card pop, Desktop gets the gradient */}
          <div className="absolute inset-0 bg-black/40 lg:bg-gradient-to-t lg:from-black/80 lg:via-black/20 lg:to-transparent" />
          
          <div className="absolute bottom-12 left-12 right-12 z-10 hidden text-white lg:block">
            <h2 className="mb-4 font-heading text-4xl font-semibold leading-tight md:text-5xl">
              Elegance Woven <br />
              <span className="font-normal italic">in Tradition</span>
            </h2>
            <p className="max-w-md font-body text-sm leading-relaxed text-white/80">
              Discover exquisite work sarees and designer kurtas crafted for the modern Indian woman who cherishes her roots.
            </p>
          </div>
        </div>

        {/* Right Side: Auth Form */}
        <div className="relative z-10 flex w-full items-center justify-center px-4 py-12 sm:px-6 lg:w-1/2 lg:bg-background-50 lg:px-12">
          {/* Glassmorphism card on mobile, flat clean layout on desktop */}
          <div className="w-full max-w-md rounded-3xl bg-background-50/95 px-6 py-10 shadow-2xl backdrop-blur-xl sm:px-10 lg:rounded-none lg:bg-transparent lg:p-0 lg:shadow-none lg:backdrop-blur-none">
            <div className="mb-8 text-center lg:mb-10 lg:text-left">
              <h1 className="font-heading text-3xl font-semibold text-foreground-900 md:text-4xl">
                {authMode === 'login' ? 'Welcome Back' : 'Create an Account'}
              </h1>
              <p className="mt-2.5 font-body text-sm text-foreground-500">
                {authMode === 'login'
                  ? 'Please enter your details to sign in.'
                  : 'Join us to explore premium ethnic wear.'}
              </p>
            </div>
            
            {authMode === 'login' ? (
              <Login onSwitchToRegister={() => setAuthMode('register')} onSuccess={() => refetch()} />
            ) : (
              <Register onSwitchToLogin={() => setAuthMode('login')} onSuccess={() => refetch()} />
            )}
          </div>
        </div>
      </div>
    )
  }

  if (isAdmin) {
    return <Navigate to="/admin" replace />
  }

  return (
    <div className="min-h-[calc(100vh-80px)] w-full bg-background-50">
      {/* Premium Header */}
      <div className="w-full border-b border-primary-500/10 bg-white px-4 py-8 md:px-8 md:py-12 lg:px-12">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-2 font-body text-xs uppercase tracking-[0.22em] text-foreground-500">My Account</p>
            <h1 className="font-heading text-3xl font-semibold text-foreground-900 md:text-4xl lg:text-5xl">
              Welcome back, {profile.name?.split(' ')[0] || profile.fullName?.split(' ')[0]}
            </h1>
            <p className="mt-3 max-w-xl font-body text-sm text-foreground-500">
              Manage your profile, addresses, and wishlist — your ANIRA edit, saved locally for now.
            </p>
          </div>
          <button
            onClick={() => {
              setAuthToken('')
              queryClient.setQueryData(authKeys.profile(), null)
            }}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-primary-500/20 bg-background-50 px-6 py-2.5 font-body text-sm font-medium text-primary-500 transition-colors hover:bg-primary-500 hover:text-white"
          >
            Sign Out
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-8 md:px-8 lg:px-12">
        {/* Sleek Tab Navigation */}
        <div className="hide-scrollbar mb-10 flex overflow-x-auto border-b border-primary-500/10 pb-4">
          <div className="flex gap-2">
            {TABS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => selectTab(id)}
                className={cn(
                  'inline-flex whitespace-nowrap items-center gap-2 rounded-full px-5 py-2.5 font-body text-sm font-medium transition-all',
                  tab === id
                    ? 'bg-primary-500 text-white shadow-md'
                    : 'text-foreground-600 hover:bg-white hover:text-primary-500',
                )}
              >
                <Icon className="size-4" />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="pb-20">
          {tab === 'overview' && (
            <Overview
              name={profile.name || profile.fullName}
              orderCount={orders.length}
              wishlistCount={wishlistIds.length}
              addressCount={addresses.length}
              onGo={selectTab}
            />
          )}
          {tab === 'profile' && (
            <ProfileForm
              initial={{ name: profile.fullName || profile.name, email: profile.email, phone: profile.phone || '' }}
              onSave={(next) => {
                // Real API integration goes here later
              }}
            />
          )}
          {tab === 'addresses' && (
            <AddressesPanel addresses={addresses} onSave={upsertAddress} onRemove={removeAddress} />
          )}
          {tab === 'wishlist' && (
            <div>
              {wishlistProducts.length === 0 ? (
                <EmptyPanel
                  title="Wishlist is empty"
                  body="Tap the heart on a saree or kurta to save it here."
                  cta={{ to: '/category/sarees', label: 'Browse Sarees' }}
                />
              ) : (
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
                  {wishlistProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function Overview({
  name,
  orderCount,
  wishlistCount,
  addressCount,
  onGo,
}: {
  name: string
  orderCount: number
  wishlistCount: number
  addressCount: number
  onGo: (t: Tab) => void
}) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <div className="rounded-3xl border border-primary-500/5 bg-white p-8 shadow-sm md:col-span-2 lg:col-span-3">
        <p className="font-heading text-2xl font-semibold text-foreground-900 md:text-3xl">
          Hello, {name}
        </p>
        <p className="mt-2 font-body text-sm text-foreground-500">
          Signed in as a demo guest. Changes stay on this device.
        </p>
        <div className="mt-6 flex flex-wrap gap-4">
          <Link
            to="/orders"
            className="inline-flex items-center gap-2 rounded-full bg-primary-500 px-6 py-3 font-body text-sm font-medium text-white shadow-sm transition-colors hover:bg-primary-600"
          >
            <Package className="size-4" />
            View Orders
          </Link>
          <button
            type="button"
            onClick={() => onGo('wishlist')}
            className="rounded-full border border-primary-500/20 bg-background-50 px-6 py-3 font-body text-sm font-medium text-primary-500 transition-colors hover:bg-primary-50"
          >
            Wishlist ({wishlistCount})
          </button>
        </div>
      </div>

      {[
        { label: 'Orders', value: String(orderCount), action: () => undefined, to: '/orders' },
        { label: 'Saved addresses', value: String(addressCount), action: () => onGo('addresses') },
        { label: 'Wishlist pieces', value: String(wishlistCount), action: () => onGo('wishlist') },
      ].map((card) =>
        'to' in card && card.to ? (
          <Link
            key={card.label}
            to={card.to}
            className="group rounded-3xl border border-primary-500/5 bg-white p-6 shadow-sm transition-all hover:border-primary-500/20 hover:shadow-md"
          >
            <p className="font-body text-xs uppercase tracking-[0.16em] text-foreground-500">
              {card.label}
            </p>
            <p className="mt-3 font-heading text-4xl font-semibold text-primary-500 transition-colors group-hover:text-primary-600">
              {card.value}
            </p>
          </Link>
        ) : (
          <button
            key={card.label}
            type="button"
            onClick={card.action}
            className="group rounded-3xl border border-primary-500/5 bg-white p-6 text-left shadow-sm transition-all hover:border-primary-500/20 hover:shadow-md"
          >
            <p className="font-body text-xs uppercase tracking-[0.16em] text-foreground-500">
              {card.label}
            </p>
            <p className="mt-3 font-heading text-4xl font-semibold text-primary-500 transition-colors group-hover:text-primary-600">
              {card.value}
            </p>
          </button>
        ),
      )}
    </div>
  )
}

function ProfileForm({
  initial,
  onSave,
}: {
  initial: { name: string; email: string; phone: string }
  onSave: (p: { name: string; email: string; phone: string }) => void
}) {
  const [form, setForm] = useState(initial)
  const [saved, setSaved] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onSave(form)
    setSaved(true)
    window.setTimeout(() => setSaved(false), 2000)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl rounded-3xl border border-primary-500/5 bg-white p-8 shadow-sm"
    >
      <h2 className="font-heading text-2xl font-semibold text-foreground-900">Profile Details</h2>
      <div className="mt-6 space-y-5">
        <Field label="Full name" value={form.name} onChange={(v) => setForm((f) => ({ ...f, name: v }))} />
        <Field
          label="Email Address"
          type="email"
          value={form.email}
          onChange={(v) => setForm((f) => ({ ...f, email: v }))}
        />
        <Field label="Phone Number" value={form.phone} onChange={(v) => setForm((f) => ({ ...f, phone: v }))} />
      </div>
      <button
        type="submit"
        className="mt-8 rounded-full bg-primary-500 px-8 py-3.5 font-body text-sm font-medium text-white shadow-sm transition-colors hover:bg-primary-600"
      >
        {saved ? 'Saved Successfully' : 'Save Changes'}
      </button>
    </form>
  )
}

function AddressesPanel({
  addresses,
  onSave,
  onRemove,
}: {
  addresses: Address[]
  onSave: (a: Address) => void
  onRemove: (id: string) => void
}) {
  const [editing, setEditing] = useState<Address | null>(null)
  const [creating, setCreating] = useState(false)

  const blank = (): Address => ({
    id: `addr-${Date.now()}`,
    label: 'Home',
    name: '',
    phone: '',
    line1: '',
    line2: '',
    city: '',
    state: '',
    pincode: '',
    isDefault: addresses.length === 0,
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h2 className="font-heading text-2xl font-semibold text-foreground-900">Saved Addresses</h2>
        <button
          type="button"
          onClick={() => {
            setCreating(true)
            setEditing(blank())
          }}
          className="rounded-full bg-primary-500 px-6 py-2.5 font-body text-sm font-medium text-white shadow-sm transition-colors hover:bg-primary-600"
        >
          Add New Address
        </button>
      </div>

      {addresses.length === 0 && !creating && (
        <EmptyPanel title="No addresses yet" body="Add a shipping address for a faster checkout experience." />
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {addresses.map((addr) => (
          <div
            key={addr.id}
            className="rounded-3xl border border-primary-500/5 bg-white p-7 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-3 border-b border-primary-500/5 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-body text-xs uppercase tracking-[0.16em] text-accent-600">
                    {addr.label}
                  </p>
                  {addr.isDefault && (
                    <span className="rounded-full bg-primary-50 px-2 py-0.5 font-body text-[10px] uppercase tracking-wider text-primary-500">
                      Default
                    </span>
                  )}
                </div>
                <p className="mt-1.5 font-heading text-xl font-semibold text-foreground-900">{addr.name}</p>
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setCreating(false)
                    setEditing(addr)
                  }}
                  className="font-body text-sm font-medium text-primary-500 hover:underline"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => onRemove(addr.id)}
                  className="font-body text-sm text-foreground-400 hover:text-red-500"
                >
                  Remove
                </button>
              </div>
            </div>
            <p className="mt-4 font-body text-sm leading-relaxed text-foreground-600">
              {addr.line1}
              {addr.line2 ? `, ${addr.line2}` : ''}
              <br />
              {addr.city}, {addr.state} {addr.pincode}
              <br />
              <span className="mt-2 block text-foreground-900">{addr.phone}</span>
            </p>
          </div>
        ))}
      </div>

      {editing && (
        <AddressForm
          address={editing}
          isNew={creating}
          onCancel={() => {
            setEditing(null)
            setCreating(false)
          }}
          onSubmit={(next) => {
            onSave(next)
            setEditing(null)
            setCreating(false)
          }}
        />
      )}
    </div>
  )
}

function AddressForm({
  address,
  isNew,
  onCancel,
  onSubmit,
}: {
  address: Address
  isNew: boolean
  onCancel: () => void
  onSubmit: (a: Address) => void
}) {
  const [form, setForm] = useState(address)

  return (
    <form
      className="mt-8 max-w-3xl rounded-3xl border border-primary-500/5 bg-white p-8 shadow-sm"
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit(form)
      }}
    >
      <h3 className="font-heading text-2xl font-semibold text-foreground-900">
        {isNew ? 'Add New Address' : 'Edit Address'}
      </h3>
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <Field label="Label (e.g. Home, Work)" value={form.label} onChange={(v) => setForm((f) => ({ ...f, label: v }))} />
        <Field label="Full Name" value={form.name} onChange={(v) => setForm((f) => ({ ...f, name: v }))} required />
        <div className="sm:col-span-2">
          <Field label="Street Address" value={form.line1} onChange={(v) => setForm((f) => ({ ...f, line1: v }))} required />
        </div>
        <div className="sm:col-span-2">
          <Field
            label="Apartment, suite, etc. (optional)"
            value={form.line2 ?? ''}
            onChange={(v) => setForm((f) => ({ ...f, line2: v }))}
          />
        </div>
        <Field label="City" value={form.city} onChange={(v) => setForm((f) => ({ ...f, city: v }))} required />
        <Field label="State / Province" value={form.state} onChange={(v) => setForm((f) => ({ ...f, state: v }))} required />
        <Field
          label="Postal / PIN Code"
          value={form.pincode}
          onChange={(v) => setForm((f) => ({ ...f, pincode: v }))}
          required
        />
        <Field label="Phone Number" value={form.phone} onChange={(v) => setForm((f) => ({ ...f, phone: v }))} required />
      </div>
      
      <label className="mt-6 flex cursor-pointer items-center gap-3 font-body text-sm text-foreground-700">
        <div className="relative flex items-center">
          <input
            type="checkbox"
            checked={Boolean(form.isDefault)}
            onChange={(e) => setForm((f) => ({ ...f, isDefault: e.target.checked }))}
            className="peer size-5 cursor-pointer appearance-none rounded border border-primary-500/30 transition-all checked:border-primary-500 checked:bg-primary-500"
          />
          <svg className="pointer-events-none absolute left-1/2 top-1/2 size-3.5 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 transition-opacity peer-checked:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        Set as default shipping address
      </label>

      <div className="mt-8 flex flex-wrap gap-4 border-t border-primary-500/10 pt-6">
        <button
          type="submit"
          className="rounded-full bg-primary-500 px-8 py-3.5 font-body text-sm font-medium text-white shadow-sm transition-colors hover:bg-primary-600"
        >
          Save Address
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-full border border-primary-500/20 px-8 py-3.5 font-body text-sm font-medium text-foreground-700 transition-colors hover:bg-background-50"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

function EmptyPanel({
  title,
  body,
  cta,
}: {
  title: string
  body: string
  cta?: { to: string; label: string }
}) {
  return (
    <div className="rounded-3xl border border-primary-500/5 bg-white px-6 py-16 text-center shadow-sm">
      <p className="font-heading text-2xl font-semibold text-foreground-900">{title}</p>
      <p className="mx-auto mt-3 max-w-md font-body text-sm leading-relaxed text-foreground-500">{body}</p>
      {cta && (
        <Link
          to={cta.to}
          className="mt-8 inline-flex rounded-full bg-primary-500 px-8 py-3.5 font-body text-sm font-medium text-white shadow-sm transition-colors hover:bg-primary-600"
        >
          {cta.label}
        </Link>
      )}
    </div>
  )
}

function Field({
  label,
  value,
  onChange,
  required,
  type = 'text',
}: {
  label: string
  value: string
  onChange: (v: string) => void
  required?: boolean
  type?: string
}) {
  return (
    <label className="block w-full">
      <span className="mb-2 block font-body text-xs uppercase tracking-wide text-foreground-500">
        {label}
      </span>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-primary-500/15 bg-white px-4 py-3.5 font-body text-sm text-foreground-900 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] outline-none transition-all placeholder:text-foreground-300 focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
      />
    </label>
  )
}
