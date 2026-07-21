import { useMemo, useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router'
import { calcShipping } from '@/data/catalog'
import { formatInr } from '@/lib/image'
import { useCartStore } from '@/store/cartStore'

export default function Checkout() {
  const navigate = useNavigate()
  const lines = useCartStore((s) => s.lines)
  const profile = useCartStore((s) => s.profile)
  const addresses = useCartStore((s) => s.addresses)
  const placeOrder = useCartStore((s) => s.placeOrder)

  const defaultAddress = addresses.find((a) => a.isDefault) ?? addresses[0]

  const [contact, setContact] = useState({
    name: profile.name,
    email: profile.email,
    phone: profile.phone,
  })
  const [address, setAddress] = useState({
    name: defaultAddress?.name ?? profile.name,
    phone: defaultAddress?.phone ?? profile.phone,
    line1: defaultAddress?.line1 ?? '',
    line2: defaultAddress?.line2 ?? '',
    city: defaultAddress?.city ?? '',
    state: defaultAddress?.state ?? '',
    pincode: defaultAddress?.pincode ?? '',
  })
  const [paymentMethod, setPaymentMethod] = useState('cod')
  const [submitting, setSubmitting] = useState(false)

  const subtotal = useMemo(
    () => lines.reduce((sum, line) => sum + line.product.price * line.quantity, 0),
    [lines],
  )
  const shipping = calcShipping(subtotal)
  const total = subtotal + shipping

  if (lines.length === 0) {
    return (
      <div className="w-full bg-background-50 px-4 py-16 md:px-8 lg:px-12">
        <div className="mx-auto max-w-lg rounded-2xl border border-primary-500/10 bg-background-100 px-6 py-16 text-center">
          <h1 className="font-heading text-2xl font-semibold text-foreground-900">Nothing to checkout</h1>
          <p className="mt-2 font-body text-sm text-foreground-500">
            Your bag is empty. Add pieces before placing an order.
          </p>
          <Link
            to="/cart"
            className="mt-6 inline-flex rounded-full bg-primary-500 px-5 py-2.5 font-body text-sm font-medium text-background-50"
          >
            Go to Cart
          </Link>
        </div>
      </div>
    )
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    const order = placeOrder({ contact, address, paymentMethod })
    setSubmitting(false)
    if (order) navigate(`/orders/${order.id}`, { replace: true })
  }

  return (
    <div className="w-full bg-background-50 px-4 py-10 md:px-8 md:py-14 lg:px-12">
      <p className="mb-2 font-body text-xs uppercase tracking-[0.22em] text-foreground-500">Checkout</p>
      <h1 className="mb-8 font-heading text-3xl font-semibold text-foreground-900 md:text-4xl">
        Complete your order
      </h1>

      <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-5 lg:gap-12">
        <div className="space-y-6 lg:col-span-3">
          <section className="rounded-2xl border border-primary-500/10 bg-background-100 p-5 md:p-6">
            <h2 className="font-heading text-xl font-semibold text-foreground-900">Contact</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <Field
                label="Full name"
                value={contact.name}
                onChange={(v) => setContact((c) => ({ ...c, name: v }))}
                required
              />
              <Field
                label="Phone"
                value={contact.phone}
                onChange={(v) => setContact((c) => ({ ...c, phone: v }))}
                required
              />
              <div className="sm:col-span-2">
                <Field
                  label="Email"
                  type="email"
                  value={contact.email}
                  onChange={(v) => setContact((c) => ({ ...c, email: v }))}
                  required
                />
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-primary-500/10 bg-background-100 p-5 md:p-6">
            <h2 className="font-heading text-xl font-semibold text-foreground-900">Shipping address</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Field
                  label="Address line 1"
                  value={address.line1}
                  onChange={(v) => setAddress((a) => ({ ...a, line1: v }))}
                  required
                />
              </div>
              <div className="sm:col-span-2">
                <Field
                  label="Address line 2"
                  value={address.line2}
                  onChange={(v) => setAddress((a) => ({ ...a, line2: v }))}
                />
              </div>
              <Field
                label="City"
                value={address.city}
                onChange={(v) => setAddress((a) => ({ ...a, city: v }))}
                required
              />
              <Field
                label="State"
                value={address.state}
                onChange={(v) => setAddress((a) => ({ ...a, state: v }))}
                required
              />
              <Field
                label="Pincode"
                value={address.pincode}
                onChange={(v) => setAddress((a) => ({ ...a, pincode: v }))}
                required
              />
              <Field
                label="Recipient phone"
                value={address.phone}
                onChange={(v) => setAddress((a) => ({ ...a, phone: v }))}
                required
              />
            </div>
          </section>

          <section className="rounded-2xl border border-primary-500/10 bg-background-100 p-5 md:p-6">
            <h2 className="font-heading text-xl font-semibold text-foreground-900">Payment</h2>
            <div className="mt-4 space-y-3">
              {[
                { id: 'cod', label: 'Cash on Delivery', hint: 'Pay when your order arrives' },
                { id: 'upi', label: 'UPI', hint: 'Mock UPI — no real charge' },
                { id: 'card', label: 'Card', hint: 'Mock card — no real charge' },
              ].map((opt) => (
                <label
                  key={opt.id}
                  className="flex cursor-pointer items-start gap-3 rounded-xl border border-primary-500/10 bg-background-50 px-4 py-3"
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === opt.id}
                    onChange={() => setPaymentMethod(opt.id)}
                    className="mt-1 accent-[oklch(0.42_0.15_15)]"
                  />
                  <span>
                    <span className="block font-body text-sm font-medium text-foreground-900">
                      {opt.label}
                    </span>
                    <span className="font-body text-xs text-foreground-500">{opt.hint}</span>
                  </span>
                </label>
              ))}
            </div>
          </section>
        </div>

        <aside className="h-fit rounded-2xl border border-primary-500/10 bg-background-100 p-6 lg:col-span-2">
          <h2 className="font-heading text-xl font-semibold text-foreground-900">Order summary</h2>
          <ul className="mt-4 space-y-3">
            {lines.map((line) => (
              <li key={line.product.id} className="flex gap-3">
                <img
                  src={line.product.image}
                  alt=""
                  className="size-14 rounded-lg object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-body text-sm text-foreground-800">{line.product.name}</p>
                  <p className="font-body text-xs text-foreground-500">Qty {line.quantity}</p>
                </div>
                <p className="font-body text-sm font-medium text-foreground-900">
                  {formatInr(line.product.price * line.quantity)}
                </p>
              </li>
            ))}
          </ul>
          <dl className="mt-5 space-y-2 border-t border-primary-500/10 pt-4 font-body text-sm">
            <div className="flex justify-between text-foreground-600">
              <dt>Subtotal</dt>
              <dd>{formatInr(subtotal)}</dd>
            </div>
            <div className="flex justify-between text-foreground-600">
              <dt>Shipping</dt>
              <dd>{shipping === 0 ? 'Free' : formatInr(shipping)}</dd>
            </div>
            <div className="flex justify-between pt-1 text-base">
              <dt className="font-heading font-semibold text-foreground-900">Total</dt>
              <dd className="font-heading font-semibold text-primary-500">{formatInr(total)}</dd>
            </div>
          </dl>
          <button
            type="submit"
            disabled={submitting}
            className="mt-6 w-full rounded-full bg-primary-500 px-6 py-3 font-body text-sm font-medium text-background-50 transition-colors hover:bg-primary-600 disabled:opacity-60"
          >
            {submitting ? 'Placing order…' : 'Place Order'}
          </button>
        </aside>
      </form>
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
