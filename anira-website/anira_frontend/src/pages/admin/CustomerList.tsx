import { ExternalLink, Search } from 'lucide-react'

const MOCK_CUSTOMERS = [
  { id: 'CUS-001', name: 'Ayesha Khan', email: 'ayesha.k@example.com', phone: '+91 98765 43210', orders: 12, spent: '₹45,900', lastActive: '2 hours ago' },
  { id: 'CUS-002', name: 'Priya Sharma', email: 'priya.s@example.com', phone: '+91 87654 32109', orders: 5, spent: '₹22,450', lastActive: '1 day ago' },
  { id: 'CUS-003', name: 'Meera Reddy', email: 'meera.r@example.com', phone: '+91 76543 21098', orders: 1, spent: '₹15,000', lastActive: '3 days ago' },
  { id: 'CUS-004', name: 'Sarah Jacob', email: 'sarah.j@example.com', phone: '+91 65432 10987', orders: 8, spent: '₹34,500', lastActive: '1 week ago' },
  { id: 'CUS-005', name: 'Neha Singh', email: 'neha.s@example.com', phone: '+91 54321 09876', orders: 2, spent: '₹28,999', lastActive: '1 month ago' },
]

export default function CustomerList() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-heading text-3xl font-bold text-foreground-900">Customers</h2>
          <p className="mt-1 font-body text-sm text-foreground-500">View and manage your registered customers</p>
        </div>
      </div>

      <div className="rounded-3xl bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <div className="mb-6 flex w-full max-w-sm items-center gap-3 rounded-full border border-primary-500/20 bg-background-50 px-4 py-2 transition-colors focus-within:border-primary-500/50 focus-within:bg-white">
          <Search className="size-4 text-foreground-400" />
          <input
            type="text"
            placeholder="Search customers by name, email..."
            className="w-full bg-transparent font-body text-sm text-foreground-900 placeholder:text-foreground-400 focus:outline-none"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-primary-500/10">
                <th className="pb-4 pl-4 font-body text-xs font-semibold uppercase tracking-wider text-foreground-500">Customer Name</th>
                <th className="pb-4 font-body text-xs font-semibold uppercase tracking-wider text-foreground-500">Contact Details</th>
                <th className="pb-4 font-body text-xs font-semibold uppercase tracking-wider text-foreground-500">Total Orders</th>
                <th className="pb-4 font-body text-xs font-semibold uppercase tracking-wider text-foreground-500">Total Spent</th>
                <th className="pb-4 font-body text-xs font-semibold uppercase tracking-wider text-foreground-500">Last Active</th>
                <th className="pb-4 pr-4 font-body text-xs font-semibold uppercase tracking-wider text-foreground-500"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary-500/5">
              {MOCK_CUSTOMERS.map((customer) => (
                <tr key={customer.id} className="group transition-colors hover:bg-background-50/50">
                  <td className="py-4 pl-4">
                    <div className="flex items-center gap-3">
                      <div className="flex size-10 items-center justify-center rounded-full bg-primary-50 text-primary-500">
                        <span className="font-heading text-lg font-semibold">{customer.name.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="font-heading text-sm font-semibold text-foreground-900">{customer.name}</p>
                        <p className="font-body text-xs text-foreground-500">{customer.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4">
                    <p className="font-body text-sm font-medium text-foreground-700">{customer.email}</p>
                    <p className="font-body text-xs text-foreground-500">{customer.phone}</p>
                  </td>
                  <td className="py-4 font-body text-sm font-medium text-foreground-900">{customer.orders}</td>
                  <td className="py-4 font-heading text-sm font-semibold text-primary-500">{customer.spent}</td>
                  <td className="py-4 font-body text-xs text-foreground-500">{customer.lastActive}</td>
                  <td className="py-4 pr-4 text-right">
                    <button className="inline-flex items-center gap-2 rounded-full border border-primary-500/20 bg-white px-3 py-1.5 font-body text-xs font-medium text-primary-500 opacity-0 shadow-sm transition-all hover:bg-background-50 group-hover:opacity-100">
                      View Profile
                      <ExternalLink className="size-3" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
