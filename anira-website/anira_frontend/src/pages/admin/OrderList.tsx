import { Check, ChevronRight, Filter, Search, X } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/cn'

const MOCK_ORDERS = [
  { id: 'ORD-001', customer: 'Ayesha Khan', email: 'ayesha.k@example.com', date: 'Oct 24, 2024', amount: '₹12,499', items: 2, status: 'Delivered', payment: 'Paid' },
  { id: 'ORD-002', customer: 'Priya Sharma', email: 'priya.s@example.com', date: 'Oct 23, 2024', amount: '₹8,999', items: 1, status: 'Shipped', payment: 'Paid' },
  { id: 'ORD-003', customer: 'Meera Reddy', email: 'meera.r@example.com', date: 'Oct 23, 2024', amount: '₹15,000', items: 3, status: 'Pending', payment: 'Pending' },
  { id: 'ORD-004', customer: 'Sarah Jacob', email: 'sarah.j@example.com', date: 'Oct 22, 2024', amount: '₹4,500', items: 1, status: 'Delivered', payment: 'Paid' },
  { id: 'ORD-005', customer: 'Neha Singh', email: 'neha.s@example.com', date: 'Oct 22, 2024', amount: '₹22,999', items: 4, status: 'Pending', payment: 'Paid' },
]

export default function OrderList() {
  const [selectedOrder, setSelectedOrder] = useState<typeof MOCK_ORDERS[0] | null>(null)

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-heading text-3xl font-bold text-foreground-900">Orders</h2>
          <p className="mt-1 font-body text-sm text-foreground-500">Manage customer orders and fulfillment</p>
        </div>
      </div>

      <div className="rounded-3xl bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex w-full max-w-sm items-center gap-3 rounded-full border border-primary-500/20 bg-background-50 px-4 py-2 transition-colors focus-within:border-primary-500/50 focus-within:bg-white">
            <Search className="size-4 text-foreground-400" />
            <input
              type="text"
              placeholder="Search orders by ID or customer..."
              className="w-full bg-transparent font-body text-sm text-foreground-900 placeholder:text-foreground-400 focus:outline-none"
            />
          </div>
          <button className="flex items-center gap-2 rounded-full border border-primary-500/20 bg-white px-4 py-2 font-body text-sm font-medium text-foreground-700 transition-colors hover:bg-background-50 hover:text-primary-500">
            <Filter className="size-4" />
            Filter
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-primary-500/10">
                <th className="pb-4 pl-4 font-body text-xs font-semibold uppercase tracking-wider text-foreground-500">Order ID</th>
                <th className="pb-4 font-body text-xs font-semibold uppercase tracking-wider text-foreground-500">Customer</th>
                <th className="pb-4 font-body text-xs font-semibold uppercase tracking-wider text-foreground-500">Date</th>
                <th className="pb-4 font-body text-xs font-semibold uppercase tracking-wider text-foreground-500">Total</th>
                <th className="pb-4 font-body text-xs font-semibold uppercase tracking-wider text-foreground-500">Payment</th>
                <th className="pb-4 font-body text-xs font-semibold uppercase tracking-wider text-foreground-500">Fulfillment</th>
                <th className="pb-4 pr-4 font-body text-xs font-semibold uppercase tracking-wider text-foreground-500"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary-500/5">
              {MOCK_ORDERS.map((order) => (
                <tr
                  key={order.id}
                  onClick={() => setSelectedOrder(order)}
                  className="group cursor-pointer transition-colors hover:bg-background-50/50"
                >
                  <td className="py-4 pl-4 font-body text-sm font-semibold text-primary-500">{order.id}</td>
                  <td className="py-4">
                    <p className="font-heading text-sm font-semibold text-foreground-900">{order.customer}</p>
                    <p className="font-body text-xs text-foreground-500">{order.email}</p>
                  </td>
                  <td className="py-4 font-body text-sm text-foreground-600">{order.date}</td>
                  <td className="py-4">
                    <p className="font-heading text-sm font-semibold text-foreground-900">{order.amount}</p>
                    <p className="font-body text-xs text-foreground-500">{order.items} items</p>
                  </td>
                  <td className="py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-body text-xs font-medium ${
                        order.payment === 'Paid' ? 'bg-green-50 text-green-700' : 'bg-background-100 text-foreground-700'
                      }`}
                    >
                      {order.payment}
                    </span>
                  </td>
                  <td className="py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-body text-xs font-medium ${
                        order.status === 'Delivered'
                          ? 'bg-green-50 text-green-700'
                          : order.status === 'Shipped'
                          ? 'bg-blue-50 text-blue-700'
                          : 'bg-amber-50 text-amber-700'
                      }`}
                    >
                      <span
                        className={`size-1.5 rounded-full ${
                          order.status === 'Delivered'
                            ? 'bg-green-500'
                            : order.status === 'Shipped'
                            ? 'bg-blue-500'
                            : 'bg-amber-500'
                        }`}
                      />
                      {order.status}
                    </span>
                  </td>
                  <td className="py-4 pr-4 text-right">
                    <ChevronRight className="ml-auto size-5 text-foreground-400 transition-colors group-hover:text-primary-500" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Slide-out Order Details Panel */}
      <div
        className={cn(
          'fixed inset-0 z-[200] bg-black/20 backdrop-blur-sm transition-opacity duration-300',
          selectedOrder ? 'opacity-100' : 'pointer-events-none opacity-0'
        )}
        onClick={() => setSelectedOrder(null)}
      />
      <div
        className={cn(
          'fixed inset-y-0 right-0 z-[210] w-[450px] max-w-full bg-white shadow-2xl transition-transform duration-500',
          selectedOrder ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {selectedOrder && (
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between border-b border-primary-500/10 px-6 py-4">
              <div>
                <h3 className="font-heading text-lg font-semibold text-foreground-900">{selectedOrder.id}</h3>
                <p className="font-body text-sm text-foreground-500">{selectedOrder.date}</p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="flex size-8 items-center justify-center rounded-full bg-background-50 text-foreground-500 transition-colors hover:bg-background-100 hover:text-foreground-900"
              >
                <X className="size-4" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6">
              <div className="mb-8 rounded-2xl bg-background-50 p-5">
                <h4 className="mb-4 font-heading text-sm font-semibold uppercase tracking-wider text-foreground-500">
                  Customer
                </h4>
                <p className="font-body text-base font-medium text-foreground-900">{selectedOrder.customer}</p>
                <p className="font-body text-sm text-foreground-600">{selectedOrder.email}</p>
                <p className="mt-2 font-body text-sm text-foreground-600">
                  123 Ethnic Studio Lane<br />
                  Bangalore, Karnataka 560001
                </p>
              </div>

              <div className="mb-8 space-y-4">
                <h4 className="font-heading text-sm font-semibold uppercase tracking-wider text-foreground-500">
                  Fulfillment Status
                </h4>
                <div className="relative pl-6">
                  <div className="absolute left-[11px] top-3 h-full w-px bg-primary-500/20" />
                  <div className="relative mb-6 flex items-start gap-4">
                    <div className="absolute -left-[30px] flex size-6 items-center justify-center rounded-full bg-green-500 text-white ring-4 ring-white">
                      <Check className="size-3.5" />
                    </div>
                    <div>
                      <p className="font-body text-sm font-medium text-foreground-900">Order Confirmed</p>
                      <p className="font-body text-xs text-foreground-500">Oct 24, 2024, 10:30 AM</p>
                    </div>
                  </div>
                  <div className="relative flex items-start gap-4">
                    <div className="absolute -left-[30px] flex size-6 items-center justify-center rounded-full border-2 border-primary-500 bg-white ring-4 ring-white">
                      <div className="size-2 rounded-full bg-primary-500" />
                    </div>
                    <div>
                      <p className="font-body text-sm font-medium text-foreground-900">Processing</p>
                      <button className="mt-2 text-left font-body text-sm font-medium text-primary-500 hover:underline">
                        Mark as Shipped
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-primary-500/10 bg-background-50 p-6">
              <div className="flex items-center justify-between font-heading text-lg font-semibold text-foreground-900">
                <span>Total</span>
                <span>{selectedOrder.amount}</span>
              </div>
              <p className="text-right font-body text-xs text-foreground-500">{selectedOrder.payment}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
