import { Link } from 'react-router'
import { formatInr } from '@/lib/image'
import { useCartStore } from '@/store/cartStore'
import type { Order, OrderStatus } from '@/types'

const STATUS_LABEL: Record<OrderStatus, string> = {
  placed: 'Placed',
  packed: 'Packed',
  shipped: 'Shipped',
  delivered: 'Delivered',
}

export default function Orders() {
  const orders = useCartStore((s) => s.orders)

  if (orders.length === 0) {
    return (
      <div className="w-full bg-background-50 px-4 py-16 md:px-8 lg:px-12">
        <div className="mx-auto max-w-lg rounded-2xl border border-primary-500/10 bg-background-100 px-6 py-16 text-center">
          <h1 className="font-heading text-2xl font-semibold text-foreground-900">No orders yet</h1>
          <p className="mt-2 font-body text-sm text-foreground-500">
            When you place an order, it will appear here with tracking status.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              to="/category/sarees"
              className="rounded-full bg-primary-500 px-5 py-2.5 font-body text-sm font-medium text-background-50"
            >
              Shop Sarees
            </Link>
            <Link
              to="/account"
              className="rounded-full border border-primary-500/20 px-5 py-2.5 font-body text-sm font-medium text-primary-500"
            >
              Back to Account
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full bg-background-50 px-4 py-10 md:px-8 md:py-14 lg:px-12">
      <p className="mb-2 font-body text-xs uppercase tracking-[0.22em] text-foreground-500">Orders</p>
      <h1 className="mb-8 font-heading text-3xl font-semibold text-foreground-900 md:text-4xl">
        Your orders
      </h1>
      <ul className="space-y-4">
        {orders.map((order) => (
          <OrderRow key={order.id} order={order} />
        ))}
      </ul>
    </div>
  )
}

function OrderRow({ order }: { order: Order }) {
  const date = new Date(order.createdAt).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })

  return (
    <li>
      <Link
        to={`/orders/${order.id}`}
        className="block rounded-2xl border border-primary-500/10 bg-background-100 p-4 transition-colors hover:border-primary-500/25 sm:p-5"
      >
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="font-body text-xs uppercase tracking-[0.16em] text-foreground-500">
              {order.id}
            </p>
            <p className="mt-1 font-heading text-lg font-semibold text-foreground-900">
              {STATUS_LABEL[order.status]} · {date}
            </p>
            <p className="mt-1 font-body text-sm text-primary-500">{formatInr(order.total)}</p>
          </div>
          <div className="flex -space-x-2">
            {order.items.slice(0, 4).map((item) => (
              <img
                key={item.id}
                src={item.image}
                alt=""
                className="size-12 rounded-lg border-2 border-background-100 object-cover sm:size-14"
              />
            ))}
            {order.items.length > 4 && (
              <span className="flex size-12 items-center justify-center rounded-lg border-2 border-background-100 bg-background-50 font-body text-xs text-foreground-600 sm:size-14">
                +{order.items.length - 4}
              </span>
            )}
          </div>
        </div>
      </Link>
    </li>
  )
}
