import { Link, useParams } from 'react-router'
import { formatInr } from '@/lib/image'
import { useCartStore } from '@/store/cartStore'
import { cn } from '@/lib/cn'
import type { OrderStatus } from '@/types'

const TIMELINE: OrderStatus[] = ['placed', 'packed', 'shipped', 'delivered']

const STATUS_LABEL: Record<OrderStatus, string> = {
  placed: 'Placed',
  packed: 'Packed',
  shipped: 'Shipped',
  delivered: 'Delivered',
}

/** Demo progression: older orders appear further along */
function mockStatusForOrder(createdAt: string, stored: OrderStatus): OrderStatus {
  const ageHours = (Date.now() - new Date(createdAt).getTime()) / 3_600_000
  if (ageHours > 72) return 'delivered'
  if (ageHours > 24) return 'shipped'
  if (ageHours > 2) return 'packed'
  return stored
}

export default function OrderDetail() {
  const { id } = useParams<{ id: string }>()
  const order = useCartStore((s) => (id ? s.getOrder(id) : undefined))

  if (!order) {
    return (
      <div className="w-full bg-background-50 px-4 py-16 md:px-8 lg:px-12">
        <div className="mx-auto max-w-lg rounded-2xl border border-primary-500/10 bg-background-100 px-6 py-16 text-center">
          <h1 className="font-heading text-2xl font-semibold text-foreground-900">Order not found</h1>
          <p className="mt-2 font-body text-sm text-foreground-500">
            This order id is missing or was cleared from local storage.
          </p>
          <Link
            to="/orders"
            className="mt-6 inline-flex rounded-full bg-primary-500 px-5 py-2.5 font-body text-sm font-medium text-background-50"
          >
            View all orders
          </Link>
        </div>
      </div>
    )
  }

  const status = mockStatusForOrder(order.createdAt, order.status)
  const statusIndex = TIMELINE.indexOf(status)
  const date = new Date(order.createdAt).toLocaleString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <div className="w-full bg-background-50 px-4 py-10 md:px-8 md:py-14 lg:px-12">
      <Link
        to="/orders"
        className="font-body text-sm text-primary-500 transition-colors hover:text-primary-600"
      >
        ← All orders
      </Link>
      <p className="mt-4 font-body text-xs uppercase tracking-[0.22em] text-foreground-500">
        Order {order.id}
      </p>
      <h1 className="mt-1 font-heading text-3xl font-semibold text-foreground-900 md:text-4xl">
        {STATUS_LABEL[status]}
      </h1>
      <p className="mt-1 font-body text-sm text-foreground-500">Placed on {date}</p>

      <div className="mt-8 grid gap-8 lg:grid-cols-5 lg:gap-12">
        <div className="space-y-6 lg:col-span-3">
          <section className="rounded-2xl border border-primary-500/10 bg-background-100 p-5 md:p-6">
            <h2 className="font-heading text-xl font-semibold text-foreground-900">Status</h2>
            <ol className="mt-6 flex flex-col gap-0 sm:flex-row sm:items-start sm:justify-between">
              {TIMELINE.map((step, i) => {
                const done = i <= statusIndex
                return (
                  <li key={step} className="relative flex flex-1 items-start gap-3 sm:flex-col sm:items-center sm:text-center">
                    {i < TIMELINE.length - 1 && (
                      <span
                        className={cn(
                          'absolute left-3 top-3 hidden h-px w-full sm:block',
                          i < statusIndex ? 'bg-primary-500' : 'bg-primary-500/15',
                        )}
                        style={{ transform: 'translateX(50%)', width: 'calc(100% - 1.5rem)' }}
                      />
                    )}
                    <span
                      className={cn(
                        'relative z-10 flex size-6 shrink-0 items-center justify-center rounded-full border-2 font-body text-[10px]',
                        done
                          ? 'border-primary-500 bg-primary-500 text-background-50'
                          : 'border-primary-500/20 bg-background-50 text-foreground-400',
                      )}
                    >
                      {i + 1}
                    </span>
                    <span
                      className={cn(
                        'pb-6 font-body text-sm sm:pb-0 sm:pt-2',
                        done ? 'font-medium text-foreground-900' : 'text-foreground-400',
                      )}
                    >
                      {STATUS_LABEL[step]}
                    </span>
                  </li>
                )
              })}
            </ol>
          </section>

          <section className="rounded-2xl border border-primary-500/10 bg-background-100 p-5 md:p-6">
            <h2 className="font-heading text-xl font-semibold text-foreground-900">Items</h2>
            <ul className="mt-4 space-y-4">
              {order.items.map((item) => (
                <li key={item.id} className="flex gap-4">
                  <Link to={`/product/${item.slug}`}>
                    <img src={item.image} alt="" className="size-20 rounded-xl object-cover" />
                  </Link>
                  <div className="min-w-0 flex-1">
                    <Link
                      to={`/product/${item.slug}`}
                      className="font-heading text-lg font-semibold text-foreground-900 hover:text-primary-500"
                    >
                      {item.name}
                    </Link>
                    <p className="mt-1 font-body text-sm text-foreground-500">Qty {item.quantity}</p>
                    <p className="mt-1 font-body text-sm font-medium text-primary-500">
                      {formatInr(item.price * item.quantity)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="space-y-4 lg:col-span-2">
          <div className="rounded-2xl border border-primary-500/10 bg-background-100 p-6">
            <h2 className="font-heading text-xl font-semibold text-foreground-900">Summary</h2>
            <dl className="mt-4 space-y-2 font-body text-sm">
              <div className="flex justify-between text-foreground-600">
                <dt>Subtotal</dt>
                <dd>{formatInr(order.subtotal)}</dd>
              </div>
              <div className="flex justify-between text-foreground-600">
                <dt>Shipping</dt>
                <dd>{order.shipping === 0 ? 'Free' : formatInr(order.shipping)}</dd>
              </div>
              <div className="flex justify-between border-t border-primary-500/10 pt-3 text-base">
                <dt className="font-heading font-semibold text-foreground-900">Total</dt>
                <dd className="font-heading font-semibold text-primary-500">
                  {formatInr(order.total)}
                </dd>
              </div>
              <div className="pt-2 text-foreground-500">
                Payment: <span className="uppercase text-foreground-800">{order.paymentMethod}</span>
              </div>
            </dl>
          </div>

          <div className="rounded-2xl border border-primary-500/10 bg-background-100 p-6">
            <h2 className="font-heading text-xl font-semibold text-foreground-900">Shipping to</h2>
            <p className="mt-3 font-body text-sm text-foreground-700">
              {order.address.name}
              <br />
              {order.address.line1}
              {order.address.line2 ? (
                <>
                  <br />
                  {order.address.line2}
                </>
              ) : null}
              <br />
              {order.address.city}, {order.address.state} {order.address.pincode}
              <br />
              {order.address.phone}
            </p>
            <p className="mt-3 font-body text-xs text-foreground-500">
              Contact: {order.contact.email} · {order.contact.phone}
            </p>
          </div>
        </aside>
      </div>
    </div>
  )
}
