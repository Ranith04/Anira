import { Activity, CreditCard, DollarSign, Package, TrendingUp, Users } from 'lucide-react'

const SUMMARY_STATS = [
  { id: 1, name: 'Total Revenue', value: '₹12,34,500', change: '+12.5%', trend: 'up', icon: DollarSign },
  { id: 2, name: 'Active Orders', value: '45', change: '+5.2%', trend: 'up', icon: Package },
  { id: 3, name: 'Total Customers', value: '1,204', change: '+18.1%', trend: 'up', icon: Users },
  { id: 4, name: 'Products Sold', value: '3,842', change: '-2.4%', trend: 'down', icon: CreditCard },
]

const RECENT_ORDERS = [
  { id: 'ORD-001', customer: 'Ayesha Khan', date: 'Oct 24, 2024', amount: '₹12,499', status: 'Delivered' },
  { id: 'ORD-002', customer: 'Priya Sharma', date: 'Oct 23, 2024', amount: '₹8,999', status: 'Shipped' },
  { id: 'ORD-003', customer: 'Meera Reddy', date: 'Oct 23, 2024', amount: '₹15,000', status: 'Pending' },
  { id: 'ORD-004', customer: 'Sarah Jacob', date: 'Oct 22, 2024', amount: '₹4,500', status: 'Delivered' },
  { id: 'ORD-005', customer: 'Neha Singh', date: 'Oct 22, 2024', amount: '₹22,999', status: 'Pending' },
]

export default function AdminDashboard() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="font-heading text-3xl font-bold text-foreground-900">Dashboard</h2>
        <p className="mt-1 font-body text-sm text-foreground-500">Overview of your store's performance</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {SUMMARY_STATS.map((stat) => (
          <div
            key={stat.id}
            className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-body text-sm font-medium text-foreground-500">{stat.name}</p>
                <p className="mt-2 font-heading text-3xl font-semibold text-foreground-900">{stat.value}</p>
              </div>
              <div className="flex size-12 items-center justify-center rounded-full bg-primary-50 text-primary-500 transition-transform group-hover:scale-110">
                <stat.icon className="size-6" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <span
                className={`flex items-center gap-1 font-body text-xs font-medium ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                <TrendingUp className={`size-3 ${stat.trend === 'down' && 'rotate-180'}`} />
                {stat.change}
              </span>
              <span className="font-body text-xs text-foreground-400">vs last month</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-2xl bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="font-heading text-lg font-semibold text-foreground-900">Sales Overview</h3>
            <select className="rounded-lg border border-primary-500/10 bg-background-50 px-3 py-1.5 font-body text-sm text-foreground-700 outline-none focus:border-primary-500/30">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>This Year</option>
            </select>
          </div>
          <div className="flex h-[300px] items-center justify-center rounded-xl border border-dashed border-primary-500/20 bg-background-50/50">
            <div className="text-center">
              <Activity className="mx-auto size-8 text-primary-500/40" />
              <p className="mt-2 font-body text-sm text-foreground-500">Sales Chart Placeholder</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="font-heading text-lg font-semibold text-foreground-900">Recent Orders</h3>
            <button className="font-body text-sm font-medium text-primary-500 hover:text-primary-600">View All</button>
          </div>
          <div className="space-y-6">
            {RECENT_ORDERS.map((order) => (
              <div key={order.id} className="flex items-center justify-between">
                <div>
                  <p className="font-body text-sm font-medium text-foreground-900">{order.customer}</p>
                  <div className="mt-1 flex items-center gap-2 font-body text-xs text-foreground-500">
                    <span>{order.id}</span>
                    <span>•</span>
                    <span>{order.date}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-heading text-sm font-semibold text-foreground-900">{order.amount}</p>
                  <p
                    className={`mt-1 font-body text-xs font-medium ${
                      order.status === 'Delivered'
                        ? 'text-green-600'
                        : order.status === 'Shipped'
                        ? 'text-blue-600'
                        : 'text-amber-600'
                    }`}
                  >
                    {order.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
