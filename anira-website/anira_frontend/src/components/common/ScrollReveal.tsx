import { useEffect } from 'react'
import { useLocation } from 'react-router'

/**
 * Soft fade-up for page sections as they enter the viewport.
 * Observes existing <section> nodes — no layout wrappers required.
 */
export function ScrollReveal() {
  const { pathname, search } = useLocation()

  useEffect(() => {
    const root = document.querySelector('main')
    if (!root) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const seen = new WeakSet<Element>()

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.add('is-inview')
          observer.unobserve(entry.target)
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -6% 0px',
      },
    )

    const prepare = (el: Element) => {
      if (seen.has(el)) return
      if (!(el instanceof HTMLElement)) return
      if (el.hasAttribute('data-no-reveal')) return

      seen.add(el)
      el.classList.add('scroll-reveal')

      if (reduced) {
        el.classList.add('is-inview')
        return
      }

      observer.observe(el)
    }

    const scan = () => {
      root.querySelectorAll('section, [data-reveal]').forEach(prepare)
    }

    scan()
    const raf = requestAnimationFrame(scan)
    const t1 = window.setTimeout(scan, 80)
    const t2 = window.setTimeout(scan, 320)

    const mo = new MutationObserver(scan)
    mo.observe(root, { childList: true, subtree: true })

    return () => {
      cancelAnimationFrame(raf)
      window.clearTimeout(t1)
      window.clearTimeout(t2)
      mo.disconnect()
      observer.disconnect()
    }
  }, [pathname, search])

  return null
}
