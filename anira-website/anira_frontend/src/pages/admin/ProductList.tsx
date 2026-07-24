import { Edit, MoreHorizontal, Plus, Search, Trash2 } from 'lucide-react'
import { Link } from 'react-router'
import { MOCK_SAREES, MOCK_KURTAS } from '@/data/homeData'

const MOCK_PRODUCTS = [...MOCK_SAREES, ...MOCK_KURTAS].map((p, i) => ({
  id: p.id,
  title: p.title,
  price: p.price,
  category: i < 4 ? 'Sarees' : 'Kurtas',
  stock: Math.floor(Math.random() * 50) + 10,
  image: p.image,
  status: Math.random() > 0.2 ? 'Active' : 'Low Stock',
}))

export default function ProductList() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-heading text-3xl font-bold text-foreground-900">Products</h2>
          <p className="mt-1 font-body text-sm text-foreground-500">Manage your store's inventory and catalog</p>
        </div>
        <Link
          to="/admin/products/new"
          className="inline-flex items-center gap-2 rounded-full bg-primary-500 px-6 py-2.5 font-body text-sm font-medium text-white transition-all hover:bg-primary-600 hover:shadow-lg hover:shadow-primary-500/25"
        >
          <Plus className="size-4" />
          Add Product
        </Link>
      </div>

      <div className="rounded-3xl bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex w-full max-w-sm items-center gap-3 rounded-full border border-primary-500/20 bg-background-50 px-4 py-2 transition-colors focus-within:border-primary-500/50 focus-within:bg-white">
            <Search className="size-4 text-foreground-400" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full bg-transparent font-body text-sm text-foreground-900 placeholder:text-foreground-400 focus:outline-none"
            />
          </div>
          <div className="flex gap-3">
            <select className="rounded-full border border-primary-500/20 bg-white px-4 py-2 font-body text-sm text-foreground-700 outline-none hover:border-primary-500/40 focus:border-primary-500/50">
              <option>All Categories</option>
              <option>Sarees</option>
              <option>Kurtas</option>
            </select>
            <select className="rounded-full border border-primary-500/20 bg-white px-4 py-2 font-body text-sm text-foreground-700 outline-none hover:border-primary-500/40 focus:border-primary-500/50">
              <option>Status</option>
              <option>Active</option>
              <option>Low Stock</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-primary-500/10">
                <th className="pb-4 pl-4 font-body text-xs font-semibold uppercase tracking-wider text-foreground-500">Product</th>
                <th className="pb-4 font-body text-xs font-semibold uppercase tracking-wider text-foreground-500">Category</th>
                <th className="pb-4 font-body text-xs font-semibold uppercase tracking-wider text-foreground-500">Price</th>
                <th className="pb-4 font-body text-xs font-semibold uppercase tracking-wider text-foreground-500">Stock</th>
                <th className="pb-4 font-body text-xs font-semibold uppercase tracking-wider text-foreground-500">Status</th>
                <th className="pb-4 pr-4 text-right font-body text-xs font-semibold uppercase tracking-wider text-foreground-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary-500/5">
              {MOCK_PRODUCTS.map((product) => (
                <tr key={product.id} className="group transition-colors hover:bg-background-50/50">
                  <td className="py-4 pl-4">
                    <div className="flex items-center gap-4">
                      <div className="size-12 overflow-hidden rounded-lg bg-background-100">
                        <img src={product.image} alt={product.title} className="size-full object-cover" />
                      </div>
                      <div>
                        <p className="font-heading text-sm font-semibold text-foreground-900">{product.title}</p>
                        <p className="font-body text-xs text-foreground-500">SKU: ANI-{product.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4">
                    <span className="rounded-md bg-background-100 px-2 py-1 font-body text-xs font-medium text-foreground-700">
                      {product.category}
                    </span>
                  </td>
                  <td className="py-4 font-heading text-sm font-semibold text-foreground-900">
                    {product.price}
                  </td>
                  <td className="py-4 font-body text-sm text-foreground-600">
                    {product.stock} in stock
                  </td>
                  <td className="py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-body text-xs font-medium ${
                        product.status === 'Active'
                          ? 'bg-green-50 text-green-700'
                          : 'bg-amber-50 text-amber-700'
                      }`}
                    >
                      <span className={`size-1.5 rounded-full ${product.status === 'Active' ? 'bg-green-500' : 'bg-amber-500'}`} />
                      {product.status}
                    </span>
                  </td>
                  <td className="py-4 pr-4 text-right">
                    <div className="flex justify-end gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                      <Link
                        to={`/admin/products/${product.id}`}
                        className="flex size-8 items-center justify-center rounded-full bg-white text-foreground-500 shadow-sm transition-colors hover:text-primary-500"
                      >
                        <Edit className="size-4" />
                      </Link>
                      <button className="flex size-8 items-center justify-center rounded-full bg-white text-foreground-500 shadow-sm transition-colors hover:text-red-500">
                        <Trash2 className="size-4" />
                      </button>
                    </div>
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
