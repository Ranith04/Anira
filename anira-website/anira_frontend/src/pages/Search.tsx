import { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router'
import { Search as SearchIcon } from 'lucide-react'
import { ProductCard } from '@/components/product/ProductCard'
import { searchProducts } from '@/data/catalog'

export default function SearchPage() {
  const [params, setParams] = useSearchParams()
  const q = params.get('q') ?? ''

  const results = useMemo(() => searchProducts(q), [q])

  return (
    <div className="w-full bg-background-50">
      <section className="border-b border-primary-500/10 px-4 py-10 md:px-8 md:py-14 lg:px-12">
        <p className="mb-2 font-body text-xs uppercase tracking-[0.22em] text-foreground-500">
          Search
        </p>
        <h1 className="font-heading text-3xl font-semibold text-foreground-900 md:text-4xl">
          Find your next drape
        </h1>
        <form
          className="mt-6 flex max-w-xl items-center gap-3 rounded-full border border-primary-500/15 bg-background-100 px-4 py-2.5"
          onSubmit={(e) => {
            e.preventDefault()
            const data = new FormData(e.currentTarget)
            const next = String(data.get('q') ?? '').trim()
            setParams(next ? { q: next } : {})
          }}
        >
          <SearchIcon className="size-5 shrink-0 text-primary-500" />
          <input
            name="q"
            defaultValue={q}
            key={q}
            placeholder="Search sarees, kurtas, fabrics..."
            className="w-full bg-transparent font-body text-sm text-foreground-900 placeholder:text-foreground-400 focus:outline-none"
          />
          <button
            type="submit"
            className="shrink-0 rounded-full bg-primary-500 px-4 py-2 font-body text-xs font-medium text-background-50"
          >
            Search
          </button>
        </form>
      </section>

      <section className="px-4 py-10 md:px-8 md:py-14 lg:px-12">
        {q ? (
          <>
            <p className="mb-6 font-body text-sm text-foreground-600">
              {results.length} result{results.length === 1 ? '' : 's'} for{' '}
              <span className="font-medium text-primary-500">&ldquo;{q}&rdquo;</span>
            </p>
            {results.length > 0 ? (
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
                {results.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <EmptySearch query={q} />
            )}
          </>
        ) : (
          <EmptySearch query="" />
        )}
      </section>
    </div>
  )
}

function EmptySearch({ query }: { query: string }) {
  return (
    <div className="rounded-2xl border border-primary-500/10 bg-background-100 px-6 py-16 text-center">
      <p className="font-heading text-xl font-semibold text-foreground-900">
        {query ? 'No pieces matched' : 'Start searching'}
      </p>
      <p className="mx-auto mt-2 max-w-md font-body text-sm text-foreground-500">
        {query
          ? `Try a broader word like “silk”, “kurta”, or “saree”.`
          : 'Search by style, fabric, or product name across our sarees and kurtas.'}
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link
          to="/category/sarees"
          className="rounded-full bg-primary-500 px-5 py-2.5 font-body text-sm font-medium text-background-50"
        >
          Browse Sarees
        </Link>
        <Link
          to="/category/kurtas"
          className="rounded-full border border-primary-500/20 px-5 py-2.5 font-body text-sm font-medium text-primary-500"
        >
          Browse Kurtas
        </Link>
      </div>
    </div>
  )
}
