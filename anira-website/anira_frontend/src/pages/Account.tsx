import { useMemo, useState, type FormEvent } from 'react'
import { Link, useSearchParams } from 'react-router'
import { Heart, MapPin, Package, User } from 'lucide-react'
import { ProductCard } from '@/components/product/ProductCard'
import { getProductById } from '@/data/catalog'
import { useCartStore } from '@/store/cartStore'
import { useQueryClient } from '@tanstack/react-query'
import { useProfile, setAuthToken, authKeys } from '@/api/auth'
import { Login } from './Auth/Login'
import { Register } from './Auth/Register'
import { cn } from '@/lib/cn'
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
  const { data: profile, isLoading, refetch } = useProfile();

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

  if (!profile) {
    return (
      <div className="w-full bg-background-50 px-4 py-10 md:px-8 md:py-14 lg:px-12 min-h-[60vh]">
        {authMode === 'login' ? (
          <Login onSwitchToRegister={() => setAuthMode('register')} onSuccess={() => refetch()} />
        ) : (
          <Register onSwitchToLogin={() => setAuthMode('login')} onSuccess={() => refetch()} />
        )}
      </div>
    );
  }

  return (
    <div className="w-full bg-background-50 px-4 py-10 md:px-8 md:py-14 lg:px-12">
      <div className="flex justify-between items-center mb-2">
        <p className="font-body text-xs uppercase tracking-[0.22em] text-foreground-500">Account</p>
        <button 
          onClick={() => { 
            setAuthToken(''); 
            queryClient.removeQueries({ queryKey: authKeys.all }); 
          }}
          className="font-body text-xs text-primary-500 hover:underline"
        >
          Sign Out
        </button>
      </div>
      <h1 className="font-heading text-3xl font-semibold text-foreground-900 md:text-4xl">
        Welcome back, {profile.name?.split(' ')[0] || profile.fullName?.split(' ')[0]}
      </h1>
      <p className="mt-2 max-w-xl font-body text-sm text-foreground-500">
        Manage your profile, addresses, and wishlist — your ANIRA edit, saved locally for now.
      </p>

      <div className="mt-8 flex flex-wrap gap-2 border-b border-primary-500/10 pb-4">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => selectTab(id)}
            className={cn(
              'inline-flex items-center gap-2 rounded-full px-4 py-2 font-body text-sm transition-colors',
              tab === id
                ? 'bg-primary-500 text-background-50'
                : 'border border-primary-500/15 text-foreground-700 hover:border-primary-500/30 hover:text-primary-500',
            )}
          >
            <Icon className="size-3.5" />
            {label}
          </button>
        ))}
      </div>

      <div className="mt-8">
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
          <AddressesPanel
            addresses={addresses}
            onSave={upsertAddress}
            onRemove={removeAddress}
          />
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
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <div className="rounded-2xl border border-primary-500/10 bg-background-100 p-6 md:col-span-2 lg:col-span-3">
        <p className="font-heading text-2xl font-semibold text-foreground-900">
          Hello, {name}
        </p>
        <p className="mt-1 font-body text-sm text-foreground-500">
          Signed in as a demo guest. Changes stay on this device.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            to="/orders"
            className="inline-flex items-center gap-2 rounded-full bg-primary-500 px-5 py-2.5 font-body text-sm font-medium text-background-50"
          >
            <Package className="size-4" />
            View Orders
          </Link>
          <button
            type="button"
            onClick={() => onGo('wishlist')}
            className="rounded-full border border-primary-500/20 px-5 py-2.5 font-body text-sm font-medium text-primary-500"
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
            className="rounded-2xl border border-primary-500/10 bg-background-100 p-5 transition-colors hover:border-primary-500/25"
          >
            <p className="font-body text-xs uppercase tracking-[0.16em] text-foreground-500">
              {card.label}
            </p>
            <p className="mt-2 font-heading text-3xl font-semibold text-primary-500">{card.value}</p>
          </Link>
        ) : (
          <button
            key={card.label}
            type="button"
            onClick={card.action}
            className="rounded-2xl border border-primary-500/10 bg-background-100 p-5 text-left transition-colors hover:border-primary-500/25"
          >
            <p className="font-body text-xs uppercase tracking-[0.16em] text-foreground-500">
              {card.label}
            </p>
            <p className="mt-2 font-heading text-3xl font-semibold text-primary-500">{card.value}</p>
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
      className="max-w-lg rounded-2xl border border-primary-500/10 bg-background-100 p-6"
    >
      <h2 className="font-heading text-xl font-semibold text-foreground-900">Profile details</h2>
      <div className="mt-5 space-y-3">
        <Field label="Full name" value={form.name} onChange={(v) => setForm((f) => ({ ...f, name: v }))} />
        <Field
          label="Email"
          type="email"
          value={form.email}
          onChange={(v) => setForm((f) => ({ ...f, email: v }))}
        />
        <Field label="Phone" value={form.phone} onChange={(v) => setForm((f) => ({ ...f, phone: v }))} />
      </div>
      <button
        type="submit"
        className="mt-6 rounded-full bg-primary-500 px-6 py-2.5 font-body text-sm font-medium text-background-50"
      >
        {saved ? 'Saved' : 'Save changes'}
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
    label: 'Other',
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
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-heading text-xl font-semibold text-foreground-900">Saved addresses</h2>
        <button
          type="button"
          onClick={() => {
            setCreating(true)
            setEditing(blank())
          }}
          className="rounded-full border border-primary-500/20 px-4 py-2 font-body text-sm font-medium text-primary-500"
        >
          Add address
        </button>
      </div>

      {addresses.length === 0 && !creating && (
        <EmptyPanel title="No addresses yet" body="Add a shipping address for faster checkout." />
      )}

      <div className="grid gap-4 md:grid-cols-2">
        {addresses.map((addr) => (
          <div
            key={addr.id}
            className="rounded-2xl border border-primary-500/10 bg-background-100 p-5"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-body text-xs uppercase tracking-[0.16em] text-accent-600">
                  {addr.label}
                  {addr.isDefault ? ' · Default' : ''}
                </p>
                <p className="mt-1 font-heading text-lg font-semibold text-foreground-900">{addr.name}</p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setCreating(false)
                    setEditing(addr)
                  }}
                  className="font-body text-xs text-primary-500"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => onRemove(addr.id)}
                  className="font-body text-xs text-foreground-400 hover:text-primary-500"
                >
                  Remove
                </button>
              </div>
            </div>
            <p className="mt-2 font-body text-sm text-foreground-600">
              {addr.line1}
              {addr.line2 ? `, ${addr.line2}` : ''}
              <br />
              {addr.city}, {addr.state} {addr.pincode}
              <br />
              {addr.phone}
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
      className="rounded-2xl border border-primary-500/10 bg-background-100 p-6"
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit(form)
      }}
    >
      <h3 className="font-heading text-lg font-semibold text-foreground-900">
        {isNew ? 'Add address' : 'Edit address'}
      </h3>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <Field label="Label" value={form.label} onChange={(v) => setForm((f) => ({ ...f, label: v }))} />
        <Field label="Name" value={form.name} onChange={(v) => setForm((f) => ({ ...f, name: v }))} required />
        <div className="sm:col-span-2">
          <Field label="Line 1" value={form.line1} onChange={(v) => setForm((f) => ({ ...f, line1: v }))} required />
        </div>
        <div className="sm:col-span-2">
          <Field
            label="Line 2"
            value={form.line2 ?? ''}
            onChange={(v) => setForm((f) => ({ ...f, line2: v }))}
          />
        </div>
        <Field label="City" value={form.city} onChange={(v) => setForm((f) => ({ ...f, city: v }))} required />
        <Field label="State" value={form.state} onChange={(v) => setForm((f) => ({ ...f, state: v }))} required />
        <Field
          label="Pincode"
          value={form.pincode}
          onChange={(v) => setForm((f) => ({ ...f, pincode: v }))}
          required
        />
        <Field label="Phone" value={form.phone} onChange={(v) => setForm((f) => ({ ...f, phone: v }))} required />
      </div>
      <label className="mt-4 flex items-center gap-2 font-body text-sm text-foreground-700">
        <input
          type="checkbox"
          checked={Boolean(form.isDefault)}
          onChange={(e) => setForm((f) => ({ ...f, isDefault: e.target.checked }))}
          className="accent-[oklch(0.42_0.15_15)]"
        />
        Set as default
      </label>
      <div className="mt-5 flex gap-3">
        <button
          type="submit"
          className="rounded-full bg-primary-500 px-5 py-2.5 font-body text-sm font-medium text-background-50"
        >
          Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-full border border-primary-500/20 px-5 py-2.5 font-body text-sm text-foreground-700"
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
    <div className="rounded-2xl border border-primary-500/10 bg-background-100 px-6 py-14 text-center">
      <p className="font-heading text-xl font-semibold text-foreground-900">{title}</p>
      <p className="mx-auto mt-2 max-w-md font-body text-sm text-foreground-500">{body}</p>
      {cta && (
        <Link
          to={cta.to}
          className="mt-6 inline-flex rounded-full bg-primary-500 px-5 py-2.5 font-body text-sm font-medium text-background-50"
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
    <label className="block">
      <span className="mb-1.5 block font-body text-xs uppercase tracking-wide text-foreground-500">
        {label}
      </span>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-primary-500/15 bg-background-50 px-4 py-3 font-body text-sm text-foreground-900 outline-none transition-colors focus:border-primary-500"
      />
    </label>
  )
}
