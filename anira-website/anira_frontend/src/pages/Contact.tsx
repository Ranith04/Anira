import { useState, type FormEvent } from 'react'
import { CheckCircle2, Clock, Mail, MapPin, Phone } from 'lucide-react'
import { PHOTOS } from '@/data/photos'

const DETAILS = [
  {
    icon: Phone,
    label: 'Call Us',
    value: '+91 99622 38422',
    href: 'tel:+919962238422',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'hello@aniraethnicstudio.com',
    href: 'mailto:hello@aniraethnicstudio.com',
  },
  {
    icon: MapPin,
    label: 'Visit',
    value: 'Electronic City, Bangalore',
    href: undefined,
  },
  {
    icon: Clock,
    label: 'Hours',
    value: 'Mon–Sat · 10:00 AM – 7:00 PM',
    href: undefined,
  },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return
    setSubmitted(true)
  }

  return (
    <div className="w-full bg-background-50">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={PHOTOS.categories.kurtas}
            alt=""
            className="size-full object-cover object-top opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background-50 via-background-50/92 to-background-50/75" />
        </div>
        <div className="relative px-4 py-14 md:px-8 md:py-20 lg:px-12 lg:py-24">
          <p className="mb-3 font-body text-xs uppercase tracking-[0.22em] text-foreground-500">
            Get In Touch
          </p>
          <h1 className="max-w-2xl font-heading text-3xl font-semibold text-foreground-900 md:text-5xl">
            We&apos;d love to hear from you
          </h1>
          <p className="mt-4 max-w-xl font-body text-sm leading-relaxed text-foreground-600 md:text-base">
            Styling questions, order help, or a visit to our Bangalore studio — reach out and our
            team will respond with care.
          </p>
        </div>
      </section>

      <section className="w-full px-4 py-12 md:px-8 md:py-16 lg:px-12 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-5 lg:gap-14">
          <div className="lg:col-span-2">
            <p className="mb-2 font-body text-xs uppercase tracking-[0.2em] text-foreground-500">
              Contact Details
            </p>
            <h2 className="mb-6 font-heading text-2xl font-semibold text-foreground-900 md:text-3xl">
              ANIRA Studio
            </h2>
            <ul className="space-y-5">
              {DETAILS.map(({ icon: Icon, label, value, href }) => (
                <li key={label} className="flex gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary-500/10 text-primary-500">
                    <Icon className="size-4" />
                  </span>
                  <div>
                    <p className="font-body text-[10px] uppercase tracking-[0.16em] text-foreground-500">
                      {label}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        className="mt-1 block font-heading text-lg font-semibold text-foreground-900 transition-colors hover:text-primary-500"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="mt-1 font-heading text-lg font-semibold text-foreground-900">
                        {value}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-primary-500/10 bg-background-100 p-6 md:p-8 lg:col-span-3">
            <p className="mb-2 font-body text-xs uppercase tracking-[0.2em] text-foreground-500">
              Send a Message
            </p>
            <h2 className="mb-6 font-heading text-2xl font-semibold text-foreground-900">
              Write to us
            </h2>

            {submitted ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <span className="mb-4 flex size-14 items-center justify-center rounded-full bg-primary-500/10 text-primary-500">
                  <CheckCircle2 className="size-7" />
                </span>
                <h3 className="font-heading text-xl font-semibold text-foreground-900">
                  Message received
                </h3>
                <p className="mt-2 max-w-sm font-body text-sm text-foreground-600">
                  Thank you for writing to ANIRA. We&apos;ll get back to you within 1–2 business days.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false)
                    setForm({ name: '', email: '', phone: '', message: '' })
                  }}
                  className="mt-6 font-body text-sm font-medium text-primary-500 hover:text-primary-600"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-1.5 block font-body text-xs uppercase tracking-wide text-foreground-500">
                      Name
                    </span>
                    <input
                      required
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      className="w-full rounded-xl border border-primary-500/15 bg-background-50 px-4 py-3 font-body text-sm text-foreground-900 outline-none transition-colors focus:border-primary-500"
                      placeholder="Your name"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block font-body text-xs uppercase tracking-wide text-foreground-500">
                      Email
                    </span>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      className="w-full rounded-xl border border-primary-500/15 bg-background-50 px-4 py-3 font-body text-sm text-foreground-900 outline-none transition-colors focus:border-primary-500"
                      placeholder="you@email.com"
                    />
                  </label>
                </div>
                <label className="block">
                  <span className="mb-1.5 block font-body text-xs uppercase tracking-wide text-foreground-500">
                    Phone <span className="normal-case tracking-normal text-foreground-400">(optional)</span>
                  </span>
                  <input
                    value={form.phone}
                    onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                    className="w-full rounded-xl border border-primary-500/15 bg-background-50 px-4 py-3 font-body text-sm text-foreground-900 outline-none transition-colors focus:border-primary-500"
                    placeholder="+91"
                  />
                </label>
                <label className="block">
                  <span className="mb-1.5 block font-body text-xs uppercase tracking-wide text-foreground-500">
                    Message
                  </span>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    className="w-full resize-y rounded-xl border border-primary-500/15 bg-background-50 px-4 py-3 font-body text-sm text-foreground-900 outline-none transition-colors focus:border-primary-500"
                    placeholder="How can we help?"
                  />
                </label>
                <button
                  type="submit"
                  className="inline-flex rounded-full bg-primary-500 px-7 py-3 font-body text-sm font-medium text-background-50 transition-colors hover:bg-primary-600"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
