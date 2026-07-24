import { Activity, CreditCard, DollarSign, Package, TrendingUp, Users } from 'lucide-react'
import { useAdminDashboard } from '@/api/admin'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Link } from 'react-router'

const CHART_DATA = [
  { name: 'Mon', sales: 4000 },
  { name: 'Tue', sales: 3000 },
  { name: 'Wed', sales: 5000 },
  { name: 'Thu', sales: 2780 },
  { name: 'Fri', sales: 8890 },
  { name: 'Sat', sales: 12390 },
  { name: 'Sun', sales: 9490 },
]

export default function AdminDashboard() {
  const { data: stats, isLoading } = useAdminDashboard();

  if (isLoading || !stats) {
    return <div className="p-12 text-center font-body text-foreground-500 animate-pulse">Loading dashboard...</div>;
  }

  const summaryStats = [
    { id: 1, name: 'Total Revenue', value: stats.totalRevenue, change: stats.totalRevenueChange.value, trend: stats.totalRevenueChange.trend, icon: DollarSign },
    { id: 2, name: 'Active Orders', value: stats.activeOrders, change: stats.activeOrdersChange.value, trend: stats.activeOrdersChange.trend, icon: Package },
    { id: 3, name: 'Total Customers', value: stats.totalCustomers, change: stats.totalCustomersChange.value, trend: stats.totalCustomersChange.trend, icon: Users },
    { id: 4, name: 'Products Sold', value: stats.productsSold, change: stats.productsSoldChange.value, trend: stats.productsSoldChange.trend, icon: CreditCard },
  ]

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h2 className="font-heading text-4xl font-bold text-foreground-900 tracking-tight">Dashboard</h2>
        <p className="mt-1.5 font-body text-sm font-medium text-foreground-500">Monitor your store's performance and recent activity.</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {summaryStats.map((stat) => (
          <div
            key={stat.id}
            className="group relative overflow-hidden rounded-3xl border border-white/60 bg-white/60 p-7 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/80 hover:shadow-[0_20px_40px_rgb(154,27,63,0.08)] hover:border-primary-200"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="font-body text-sm font-bold tracking-wide text-foreground-500 uppercase">{stat.name}</p>
                <p className="mt-2 font-heading text-4xl font-bold text-foreground-900">{stat.value}</p>
              </div>
              <div className="flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-white to-primary-50 text-primary-600 shadow-sm ring-1 ring-primary-500/10 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-md">
                <stat.icon className="size-6" />
              </div>
            </div>
            <div className="mt-6 flex items-center gap-2">
              <span
                className={`flex items-center gap-1 rounded-full px-2.5 py-1 font-body text-xs font-bold ${
                  stat.trend === 'up' 
                    ? 'bg-green-50 text-green-700 ring-1 ring-green-600/20' 
                    : 'bg-red-50 text-red-700 ring-1 ring-red-600/20'
                }`}
              >
                <TrendingUp className={`size-3.5 ${stat.trend === 'down' && 'rotate-180'}`} />
                {stat.change}
              </span>
              <span className="font-body text-xs font-semibold text-foreground-400">vs last month</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-3xl border border-white/60 bg-white/60 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-2xl">
          <div className="mb-8 flex items-center justify-between">
            <h3 className="font-heading text-xl font-bold text-foreground-900">Sales Overview</h3>
            <select className="rounded-xl border border-white/80 bg-white/50 px-4 py-2 font-body text-sm font-semibold text-foreground-700 shadow-sm outline-none backdrop-blur-md transition-colors focus:border-primary-500/30 focus:ring-4 focus:ring-primary-500/10">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>This Year</option>
            </select>
          </div>
          <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={CHART_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#9a1b3f" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#9a1b3f" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" opacity={0.5} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12, fontWeight: 600 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12, fontWeight: 600 }} tickFormatter={(val) => `₹${val/1000}k`} />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: '1px solid rgba(255,255,255,0.6)', backgroundColor: 'rgba(255,255,255,0.9)', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', backdropFilter: 'blur(12px)' }}
                  itemStyle={{ color: '#9a1b3f', fontWeight: '700' }}
                  labelStyle={{ color: '#374151', fontWeight: '700', marginBottom: '4px' }}
                  formatter={(value: number) => [`₹${value}`, 'Sales']}
                />
                <Area type="monotone" dataKey="sales" stroke="#9a1b3f" strokeWidth={4} fillOpacity={1} fill="url(#colorSales)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-3xl border border-white/60 bg-white/60 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-2xl">
          <div className="mb-8 flex items-center justify-between">
            <h3 className="font-heading text-xl font-bold text-foreground-900">Recent Orders</h3>
            <Link to="/admin/orders" className="rounded-full bg-primary-50 px-4 py-1.5 font-body text-sm font-bold text-primary-600 transition-colors hover:bg-primary-100 hover:text-primary-700">View All</Link>
          </div>
          <div className="space-y-4">
            {stats.recentOrders.map((order) => (
              <div key={order.id} className="group flex items-center justify-between rounded-2xl border border-white/40 bg-white/40 p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary-200 hover:bg-white/80 hover:shadow-md">
                <div>
                  <p className="font-body text-sm font-bold text-foreground-900">{order.customer}</p>
                  <div className="mt-1 flex items-center gap-2 font-body text-xs font-semibold text-foreground-500">
                    <span className="text-primary-600/80">{order.id}</span>
                    <span>•</span>
                    <span>{order.date}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-heading text-sm font-bold text-foreground-900">{order.amount}</p>
                  <p
                    className={`mt-1 font-body text-[10px] font-bold uppercase tracking-wider ${
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
            {stats.recentOrders.length === 0 && (
              <div className="flex h-40 flex-col items-center justify-center rounded-2xl border border-dashed border-primary-900/10 bg-white/30">
                <p className="font-body text-sm font-medium text-foreground-400">No recent orders found.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
