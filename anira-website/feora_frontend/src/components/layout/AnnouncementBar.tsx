import { useState } from 'react'
import { X } from 'lucide-react'

export function AnnouncementBar() {
  const [visible, setVisible] = useState(true)
  if (!visible) return null

  return (
    <div className="relative bg-primary-500 px-4 py-2.5 text-center font-body text-xs tracking-wide text-background-50 md:text-sm">
      <p className="px-8">
        Free Shipping Across India on Orders Above ₹2,999
        <span className="mx-2">|</span>
        International Shipping Available
      </p>
      <button
        type="button"
        aria-label="Close announcement"
        onClick={() => setVisible(false)}
        className="absolute right-3 top-1/2 flex size-6 -translate-y-1/2 items-center justify-center transition-opacity hover:opacity-70"
      >
        <X className="size-3.5" />
      </button>
    </div>
  )
}
