import { Link } from 'react-router'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { FREE_SHIPPING_THRESHOLD, calcShipping } from '@/data/catalog'
import { formatInr } from '@/lib/image'
import { useCartStore } from '@/store/cartStore'

export default function Cart() {
  const lines = useCartStore((s) => s.lines)
  const updateQuantity = useCartStore((s) => s.updateQuantity)
  const removeFromCart = useCartStore((s) => s.removeFromCart)

  const subtotal = lines.reduce((sum, line) => sum + line.product.price * line.quantity, 0)
  const shipping = calcShipping(subtotal)
  const total = subtotal + shipping
  const remainingForFreeShip = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal)

  if (lines.length === 0) {
    return (
      <div className="w-full bg-background-50 px-4 py-16 md:px-8 lg:px-12" data-reveal>
        <div className="mx-auto max-w-lg rounded-2xl border border-primary-500/10 bg-background-100 px-6 py-16 text-center">
          <h1 className="font-heading text-2xl font-semibold text-foreground-900">Your bag is empty</h1>
          <p className="mt-2 font-body text-sm text-foreground-500">
            Add a work saree or designer kurta to begin your ANIRA edit.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              to="/category/sarees"
              className="rounded-full bg-primary-500 px-5 py-2.5 font-body text-sm font-medium text-background-50"
            >
              Shop Sarees
            </Link>
            <Link
              to="/category/kurtas"
              className="rounded-full border border-primary-500/20 px-5 py-2.5 font-body text-sm font-medium text-primary-500"
            >
              Shop Kurtas
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full bg-background-50 px-4 py-10 md:px-8 md:py-14 lg:px-12" data-reveal>
      <p className="mb-2 font-body text-xs uppercase tracking-[0.22em] text-foreground-500">Bag</p>
      <h1 className="mb-8 font-heading text-3xl font-semibold text-foreground-900 md:text-4xl">
        Your selection
      </h1>

      <div className="grid gap-8 lg:grid-cols-5 lg:gap-12">
        <div className="space-y-4 lg:col-span-3">
          {lines.map((line) => (
            <div
              key={line.product.id}
              className="flex gap-4 rounded-2xl border border-primary-500/10 bg-background-100 p-3 sm:p-4"
            >
              <Link to={`/product/${line.product.slug}`} className="shrink-0">
                <img
                  src={line.product.image}
                  alt={line.product.name}
                  className="size-24 rounded-xl object-cover sm:size-28"
                />
              </Link>
              <div className="flex min-w-0 flex-1 flex-col justify-between">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <Link
                      to={`/product/${line.product.slug}`}
                      className="font-heading text-lg font-semibold text-foreground-900 hover:text-primary-500"
                    >
                      {line.product.name}
                    </Link>
                    <p className="mt-1 font-body text-sm font-medium text-primary-500">
                      {formatInr(line.product.price)}
                    </p>
                  </div>
                  <button
                    type="button"
                    aria-label="Remove item"
                    onClick={() => removeFromCart(line.product.id)}
                    className="text-foreground-400 transition-colors hover:text-primary-500"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
                <div className="mt-3 flex items-center gap-3">
                  <div className="inline-flex items-center rounded-full border border-primary-500/15 bg-background-50">
                    <button
                      type="button"
                      aria-label="Decrease quantity"
                      onClick={() => updateQuantity(line.product.id, line.quantity - 1)}
                      className="flex size-8 items-center justify-center text-foreground-700 hover:text-primary-500"
                    >
                      <Minus className="size-3.5" />
                    </button>
                    <span className="min-w-8 text-center font-body text-sm font-medium">
                      {line.quantity}
                    </span>
                    <button
                      type="button"
                      aria-label="Increase quantity"
                      onClick={() => updateQuantity(line.product.id, line.quantity + 1)}
                      className="flex size-8 items-center justify-center text-foreground-700 hover:text-primary-500"
                    >
                      <Plus className="size-3.5" />
                    </button>
                  </div>
                  <p className="font-body text-sm text-foreground-600">
                    Line total{' '}
                    <span className="font-medium text-foreground-900">
                      {formatInr(line.product.price * line.quantity)}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <aside className="h-fit rounded-2xl border border-primary-500/10 bg-background-100 p-6 lg:col-span-2">
          <h2 className="font-heading text-xl font-semibold text-foreground-900">Order summary</h2>
          <dl className="mt-5 space-y-3 font-body text-sm">
            <div className="flex justify-between text-foreground-600">
              <dt>Subtotal</dt>
              <dd className="font-medium text-foreground-900">{formatInr(subtotal)}</dd>
            </div>
            <div className="flex justify-between text-foreground-600">
              <dt>Shipping</dt>
              <dd className="font-medium text-foreground-900">
                {shipping === 0 ? 'Free' : formatInr(shipping)}
              </dd>
            </div>
            {remainingForFreeShip > 0 && (
              <p className="rounded-xl bg-accent-500/10 px-3 py-2 text-xs text-foreground-700">
                Add {formatInr(remainingForFreeShip)} more for free shipping across India.
              </p>
            )}
            <div className="flex justify-between border-t border-primary-500/10 pt-3 text-base">
              <dt className="font-heading font-semibold text-foreground-900">Total</dt>
              <dd className="font-heading font-semibold text-primary-500">{formatInr(total)}</dd>
            </div>
          </dl>
          <Link
            to="/checkout"
            className="mt-6 flex w-full items-center justify-center rounded-full bg-primary-500 px-6 py-3 font-body text-sm font-medium text-background-50 transition-colors hover:bg-primary-600"
          >
            Proceed to Checkout
          </Link>
        </aside>
      </div>
    </div>
  )
}
