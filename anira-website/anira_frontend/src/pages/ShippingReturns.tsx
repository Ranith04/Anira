import { Link } from 'react-router'

export default function ShippingReturns() {
  return (
    <div className="w-full bg-background-50 px-4 py-10 md:px-8 md:py-14 lg:px-12">
      <p className="mb-2 font-body text-xs uppercase tracking-[0.22em] text-foreground-500">
        Policies
      </p>
      <h1 className="font-heading text-3xl font-semibold text-foreground-900 md:text-4xl">
        Shipping & returns
      </h1>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-primary-500/10 bg-background-100 p-6">
          <h2 className="font-heading text-xl font-semibold text-foreground-900">Shipping</h2>
          <ul className="mt-4 space-y-3 font-body text-sm leading-relaxed text-foreground-600">
            <li>Free shipping on orders ₹2,999 and above across India.</li>
            <li>Standard delivery: 4–7 business days depending on your city.</li>
            <li>Orders placed before 2 PM IST usually ship the same day (weekdays).</li>
            <li>You will receive tracking once the package is handed to our courier.</li>
          </ul>
        </section>

        <section className="rounded-2xl border border-primary-500/10 bg-background-100 p-6">
          <h2 className="font-heading text-xl font-semibold text-foreground-900">Returns</h2>
          <ul className="mt-4 space-y-3 font-body text-sm leading-relaxed text-foreground-600">
            <li>Unused pieces with tags may be returned within 7 days of delivery.</li>
            <li>Custom-stitched blouses and sale items are final sale.</li>
            <li>Please share unboxing photos if the item arrives damaged.</li>
            <li>
              Write to us via{' '}
              <Link to="/contact" className="font-medium text-primary-500 hover:text-primary-600">
                Contact
              </Link>{' '}
              with your order id to start a return.
            </li>
          </ul>
        </section>
      </div>
    </div>
  )
}
