import { Link } from 'react-router'

export default function SizeGuide() {
  return (
    <div className="w-full bg-background-50 px-4 py-10 md:px-8 md:py-14 lg:px-12">
      <p className="mb-2 font-body text-xs uppercase tracking-[0.22em] text-foreground-500">
        Fit guide
      </p>
      <h1 className="font-heading text-3xl font-semibold text-foreground-900 md:text-4xl">
        Size guide
      </h1>
      <p className="mt-3 max-w-2xl font-body text-sm text-foreground-500">
        ANIRA pieces are finished for a graceful drape. Use these reference charts as a starting
        point — for custom blouse or kurta adjustments, write to us with your measurements.
      </p>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-primary-500/10 bg-background-100 p-6">
          <h2 className="font-heading text-xl font-semibold text-foreground-900">Kurtas</h2>
          <table className="mt-4 w-full font-body text-sm">
            <thead>
              <tr className="border-b border-primary-500/10 text-left text-foreground-500">
                <th className="pb-2 font-medium">Size</th>
                <th className="pb-2 font-medium">Bust (in)</th>
                <th className="pb-2 font-medium">Waist (in)</th>
              </tr>
            </thead>
            <tbody className="text-foreground-800">
              {[
                ['S', '34–35', '28–29'],
                ['M', '36–37', '30–31'],
                ['L', '38–40', '32–34'],
                ['XL', '41–43', '35–37'],
              ].map(([size, bust, waist]) => (
                <tr key={size} className="border-b border-primary-500/5">
                  <td className="py-2.5 font-medium">{size}</td>
                  <td className="py-2.5">{bust}</td>
                  <td className="py-2.5">{waist}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="rounded-2xl border border-primary-500/10 bg-background-100 p-6">
          <h2 className="font-heading text-xl font-semibold text-foreground-900">Sarees</h2>
          <p className="mt-3 font-body text-sm leading-relaxed text-foreground-600">
            Most ANIRA sarees are 5.5 metres with a standard blouse piece. Blouse stitching is
            available on request — share your bust, waist, and preferred sleeve length after
            checkout.
          </p>
          <Link
            to="/contact"
            className="mt-5 inline-flex font-body text-sm font-medium text-primary-500 hover:text-primary-600"
          >
            Ask about blouse stitching →
          </Link>
        </section>
      </div>
    </div>
  )
}
