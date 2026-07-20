import { useState, type FormEvent } from 'react'
import { CheckCircle2 } from 'lucide-react'

export function Newsletter() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setSubmitted(true)
    setEmail('')
  }

  return (
    <section className="w-full bg-primary-500 py-12 md:py-16">
      <div className="w-full px-4 md:px-8 lg:px-12">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-2 font-heading text-2xl font-semibold text-background-50 md:text-3xl">
            Join the ANIRA Family
          </h2>
          <p className="mb-6 font-body text-sm text-background-100">
            Subscribe to receive updates on new collections, exclusive deals, and styling inspiration.
          </p>

          {submitted ? (
            <div className="inline-flex items-center gap-2 rounded-full bg-background-50/10 px-6 py-3 font-body text-sm text-accent-400">
              <CheckCircle2 className="size-5" />
              Thank you for subscribing!
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 rounded-full border border-background-200/30 bg-background-50/10 px-4 py-3 font-body text-sm text-background-50 placeholder:text-background-200 focus:border-accent-500 focus:outline-none"
              />
              <button
                type="submit"
                className="whitespace-nowrap rounded-full bg-accent-500 px-6 py-3 font-body text-sm font-medium text-background-50 transition-colors hover:bg-accent-600"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
