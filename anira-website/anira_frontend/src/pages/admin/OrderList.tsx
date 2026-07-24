import { Search, Eye, Filter } from 'lucide-react'
import { Link } from 'react-router'
import { useAdminOrders } from '@/api/admin'

export default function OrderList() {
  const { data: orders, isLoading } = useAdminOrders()

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-heading text-3xl font-bold text-foreground-900">Orders</h2>
          <p className="mt-1 font-body text-sm text-foreground-500">View and manage customer orders</p>
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl border border-white/40 bg-white/60 shadow-xl backdrop-blur-xl">
        <div className="border-b border-primary-500/10 bg-white/40 p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex w-full max-w-sm items-center gap-3 rounded-full border border-primary-500/20 bg-white px-4 py-2.5 shadow-sm transition-all focus-within:border-primary-500/50 focus-within:ring-4 focus-within:ring-primary-500/10">
              <Search className="size-4 text-foreground-400" />
              <input
                type="text"
                placeholder="Search orders..."
                className="w-full bg-transparent font-body text-sm text-foreground-900 placeholder:text-foreground-400 focus:outline-none"
              />
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 rounded-full border border-primary-500/20 bg-white px-4 py-2.5 font-body text-sm font-medium text-foreground-700 shadow-sm transition-all hover:bg-primary-50 hover:text-primary-600">
                <Filter className="size-4" />
                Filters
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="p-12 text-center font-body text-foreground-500 animate-pulse">Loading orders...</div>
          ) : (
            <table className="w-full text-left">
              <thead className="bg-white/40">
                <tr className="border-b border-primary-500/10">
                  <th className="py-4 pl-6 font-body text-xs font-bold uppercase tracking-widest text-foreground-500">Order</th>
                  <th className="py-4 font-body text-xs font-bold uppercase tracking-widest text-foreground-500">Date</th>
                  <th className="py-4 font-body text-xs font-bold uppercase tracking-widest text-foreground-500">Customer</th>
                  <th className="py-4 font-body text-xs font-bold uppercase tracking-widest text-foreground-500">Total</th>
                  <th className="py-4 font-body text-xs font-bold uppercase tracking-widest text-foreground-500">Payment</th>
                  <th className="py-4 font-body text-xs font-bold uppercase tracking-widest text-foreground-500">Status</th>
                  <th className="py-4 pr-6 text-right font-body text-xs font-bold uppercase tracking-widest text-foreground-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-primary-500/5 bg-transparent">
                {orders?.map((order) => (
                  <tr key={order.id} className="group transition-colors hover:bg-white/60">
                    <td className="py-4 pl-6">
                      <p className="font-heading text-sm font-bold text-foreground-900 group-hover:text-primary-600 transition-colors">{order.id}</p>
                      <p className="font-body text-xs text-foreground-500">{order.items} items</p>
                    </td>
                    <td className="py-4 font-body text-sm text-foreground-700">{order.date}</td>
                    <td className="py-4">
                      <p className="font-body text-sm font-medium text-foreground-900">{order.customer}</p>
                      <p className="font-body text-xs text-foreground-500">{order.email}</p>
                    </td>
                    <td className="py-4 font-heading text-sm font-bold text-foreground-900">{order.amount}</td>
                    <td className="py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 font-body text-xs font-bold uppercase tracking-wider ${
                          order.payment === 'Paid'
                            ? 'bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20'
                            : 'bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20'
                        }`}
                      >
                        {order.payment}
                      </span>
                    </td>
                    <td className="py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 font-body text-xs font-bold uppercase tracking-wider ${
                          order.status === 'Delivered'
                            ? 'bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-600/20'
                            : order.status === 'Shipped'
                            ? 'bg-purple-50 text-purple-700 ring-1 ring-inset ring-purple-600/20'
                            : 'bg-orange-50 text-orange-700 ring-1 ring-inset ring-orange-600/20'
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="py-4 pr-6 text-right">
                      <div className="flex justify-end opacity-0 transition-opacity group-hover:opacity-100">
                        <Link
                          to={`/admin/orders/${order.id}`}
                          className="flex size-9 items-center justify-center rounded-full bg-white text-foreground-500 shadow-md transition-all hover:bg-primary-50 hover:text-primary-600 hover:shadow-lg"
                        >
                          <Eye className="size-4" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
                {!orders?.length && (
                  <tr>
                    <td colSpan={7} className="py-12 text-center font-body text-sm text-foreground-400">
                      No orders found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}
