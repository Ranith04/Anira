import { Edit, MoreHorizontal, Plus, Search, Trash2 } from 'lucide-react'
import { Link } from 'react-router'
import { useProducts } from '@/api/catalog'

export default function ProductList() {
  const { data: products, isLoading } = useProducts()

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-heading text-3xl font-bold text-foreground-900">Products</h2>
          <p className="mt-1 font-body text-sm text-foreground-500">Manage your store's inventory and catalog</p>
        </div>
        <Link
          to="/admin/products/new"
          className="inline-flex items-center gap-2 rounded-full bg-primary-600 px-6 py-2.5 font-body text-sm font-semibold text-white shadow-lg shadow-primary-500/30 transition-all hover:-translate-y-0.5 hover:bg-primary-700 hover:shadow-xl hover:shadow-primary-500/40"
        >
          <Plus className="size-4" />
          Add Product
        </Link>
      </div>

      <div className="overflow-hidden rounded-3xl border border-white/40 bg-white/60 shadow-xl backdrop-blur-xl">
        <div className="border-b border-primary-500/10 bg-white/40 p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex w-full max-w-sm items-center gap-3 rounded-full border border-primary-500/20 bg-white px-4 py-2.5 shadow-sm transition-all focus-within:border-primary-500/50 focus-within:ring-4 focus-within:ring-primary-500/10">
              <Search className="size-4 text-foreground-400" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full bg-transparent font-body text-sm text-foreground-900 placeholder:text-foreground-400 focus:outline-none"
              />
            </div>
            <div className="flex gap-3">
              <select className="rounded-full border border-primary-500/20 bg-white px-4 py-2.5 font-body text-sm font-medium text-foreground-700 shadow-sm outline-none transition-all hover:border-primary-500/40 focus:border-primary-500/50 focus:ring-4 focus:ring-primary-500/10">
                <option>All Categories</option>
                <option>Sarees</option>
                <option>Kurtas</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="p-12 text-center font-body text-foreground-500 animate-pulse">Loading products...</div>
          ) : (
            <table className="w-full text-left">
              <thead className="bg-white/40">
                <tr className="border-b border-primary-500/10">
                  <th className="py-4 pl-6 font-body text-xs font-bold uppercase tracking-widest text-foreground-500">Product</th>
                  <th className="py-4 font-body text-xs font-bold uppercase tracking-widest text-foreground-500">Category</th>
                  <th className="py-4 font-body text-xs font-bold uppercase tracking-widest text-foreground-500">Price</th>
                  <th className="py-4 font-body text-xs font-bold uppercase tracking-widest text-foreground-500">Status</th>
                  <th className="py-4 pr-6 text-right font-body text-xs font-bold uppercase tracking-widest text-foreground-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-primary-500/5 bg-transparent">
                {products?.map((product) => (
                  <tr key={product.id} className="group transition-colors hover:bg-white/60">
                    <td className="py-4 pl-6">
                      <div className="flex items-center gap-4">
                        <div className="size-14 overflow-hidden rounded-xl bg-background-100 shadow-sm border border-primary-500/10">
                          <img src={product.image} alt={product.name} className="size-full object-cover transition-transform duration-500 group-hover:scale-110" />
                        </div>
                        <div>
                          <p className="font-heading text-sm font-bold text-foreground-900 group-hover:text-primary-600 transition-colors">{product.name}</p>
                          <p className="mt-0.5 font-body text-xs font-medium text-foreground-500">SKU: ANI-{product.id.split('-')[0].toUpperCase()}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4">
                      <span className="inline-flex rounded-lg bg-background-100 px-3 py-1 font-body text-xs font-semibold text-foreground-700 shadow-sm">
                        {product.categorySlug}
                      </span>
                    </td>
                    <td className="py-4 font-heading text-sm font-bold text-foreground-900">
                      ₹{product.price.toLocaleString('en-IN')}
                    </td>
                    <td className="py-4">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 font-body text-xs font-bold text-green-700 shadow-sm ring-1 ring-inset ring-green-600/20">
                        <span className="size-1.5 rounded-full bg-green-500" />
                        Active
                      </span>
                    </td>
                    <td className="py-4 pr-6 text-right">
                      <div className="flex justify-end gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                        <Link
                          to={`/admin/products/${product.id}`}
                          className="flex size-9 items-center justify-center rounded-full bg-white text-foreground-500 shadow-md transition-all hover:bg-primary-50 hover:text-primary-600 hover:shadow-lg"
                        >
                          <Edit className="size-4" />
                        </Link>
                        <button className="flex size-9 items-center justify-center rounded-full bg-white text-foreground-500 shadow-md transition-all hover:bg-red-50 hover:text-red-600 hover:shadow-lg">
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {!products?.length && (
                  <tr>
                    <td colSpan={5} className="py-12 text-center font-body text-sm text-foreground-400">
                      No products found.
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
