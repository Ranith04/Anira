import { Link } from 'react-router'
import { Mail, MapPin, Phone } from 'lucide-react'
import { FacebookIcon, InstagramIcon, YoutubeIcon } from '@/components/common/SocialIcons'

const COLLECTIONS = [
  { label: 'Designer Sarees', href: '/category/sarees' },
  { label: 'Kurtas & Suits', href: '/category/kurtas' },
  { label: 'Blouses', href: '/category/blouses' },
  { label: 'Ethnic Dresses', href: '/category/dresses' },
  { label: 'Kids Wear', href: '/category/kids' },
  { label: 'Half Sarees', href: '/category/half-sarees' },
]

const QUICK_LINKS = [
  { label: 'About ANIRA', href: '/#about' },
  { label: 'Contact Us', href: '/#contact' },
  { label: 'Shipping Policy', href: '/shipping-returns' },
  { label: 'Return & Exchange', href: '/shipping-returns' },
  { label: 'Size Guide', href: '/size-guide' },
  { label: 'FAQs', href: '/faqs' },
]

export function Footer() {
  return (
    <footer id="contact" className="bg-background-100">
      <div className="w-full px-4 py-12 md:px-8 md:py-16 lg:px-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="mb-4 flex items-center gap-2">
              <div className="flex size-10 items-center justify-center rounded-full bg-primary-500">
                <span className="font-heading text-lg font-bold italic text-background-50">A</span>
              </div>
              <div>
                <h3 className="font-heading text-xl font-semibold leading-none text-primary-500">
                  Anira
                </h3>
                <p className="font-body text-[10px] uppercase tracking-[0.2em] text-foreground-600">
                  The Ethnic Studio
                </p>
              </div>
            </Link>
            <p className="mb-4 max-w-xs font-body text-sm leading-relaxed text-foreground-600">
              ANIRA combines centuries-old weaving traditions with contemporary style. Based in
              Bangalore, we present a stunning collection of traditional South Indian ethnic wear for
              women.
            </p>
            <div className="space-y-1.5">
              <p className="flex items-center gap-2 font-body text-sm text-foreground-600">
                <Phone className="size-4 text-primary-500" />
                +91 99622 38422
              </p>
              <p className="flex items-center gap-2 font-body text-sm text-foreground-600">
                <Mail className="size-4 text-primary-500" />
                hello@aniraethnicstudio.com
              </p>
              <p className="flex items-center gap-2 font-body text-sm text-foreground-600">
                <MapPin className="size-4 text-primary-500" />
                Electronic City, Bangalore
              </p>
            </div>
          </div>

          <div>
            <h4 className="mb-4 font-heading text-base font-semibold uppercase tracking-wider text-primary-500">
              Our Collections
            </h4>
            <ul className="space-y-2.5">
              {COLLECTIONS.map((l) => (
                <li key={l.href}>
                  <Link
                    to={l.href}
                    className="font-body text-sm text-foreground-600 transition-colors hover:text-primary-500"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-heading text-base font-semibold uppercase tracking-wider text-primary-500">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.href}
                    className="font-body text-sm text-foreground-600 transition-colors hover:text-primary-500"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-heading text-base font-semibold uppercase tracking-wider text-primary-500">
              Newsletter
            </h4>
            <p className="mb-4 font-body text-sm text-foreground-600">
              Subscribe for exclusive deals, new arrivals, and style inspiration.
            </p>
            <div className="mb-5 flex items-center gap-3">
              {[
                { icon: InstagramIcon, href: 'https://instagram.com/anira.theethinicstudio', label: 'Instagram' },
                { icon: FacebookIcon, href: 'https://facebook.com', label: 'Facebook' },
                { icon: YoutubeIcon, href: 'https://youtube.com', label: 'YouTube' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex size-9 items-center justify-center rounded-full border border-foreground-400/20 text-foreground-600 transition-colors hover:border-primary-500 hover:text-primary-500"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
            <div className="flex gap-3 text-xs text-foreground-500">
              <Link to="/privacy-policy" className="hover:text-primary-500">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-primary-500">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-foreground-400/10">
        <div className="w-full px-4 py-5 text-center font-body text-xs text-foreground-500 md:px-8 lg:px-12">
          © 2024 - {new Date().getFullYear()} ANIRA - The Ethnic Studio. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
