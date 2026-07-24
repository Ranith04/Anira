import { ArrowLeft, Image as ImageIcon, Upload } from 'lucide-react'
import { Link, useNavigate } from 'react-router'
import { useState } from 'react'
import { cn } from '@/lib/cn'

export default function ProductForm() {
  const navigate = useNavigate()
  const [dragActive, setDragActive] = useState(false)
  const [images, setImages] = useState<string[]>([])

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    // Mock image drop
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const url = URL.createObjectURL(e.dataTransfer.files[0])
      setImages((prev) => [...prev, url])
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0])
      setImages((prev) => [...prev, url])
    }
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="flex size-10 items-center justify-center rounded-full border border-primary-500/10 bg-white text-foreground-600 shadow-sm transition-colors hover:bg-background-50 hover:text-primary-500"
        >
          <ArrowLeft className="size-5" />
        </button>
        <div>
          <h2 className="font-heading text-2xl font-bold text-foreground-900">Add New Product</h2>
          <p className="font-body text-sm text-foreground-500">Create a new product listing in your catalog</p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          {/* General Information */}
          <div className="overflow-hidden rounded-3xl border border-white/40 bg-white/60 p-6 shadow-xl backdrop-blur-xl">
            <h3 className="mb-6 font-heading text-lg font-semibold text-foreground-900">General Information</h3>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="font-body text-sm font-medium text-foreground-700">Product Title</label>
                <input
                  type="text"
                  placeholder="e.g., Crimson Silk Banarasi Saree"
                  className="w-full rounded-xl border border-primary-500/20 bg-white/50 px-4 py-3 font-body text-sm text-foreground-900 placeholder:text-foreground-400 backdrop-blur-md transition-colors focus:border-primary-500/50 focus:bg-white/80 focus:outline-none focus:ring-4 focus:ring-primary-500/10"
                />
              </div>
              <div className="space-y-2">
                <label className="font-body text-sm font-medium text-foreground-700">Description</label>
                <textarea
                  rows={5}
                  placeholder="Describe the product details, fabric, and styling..."
                  className="w-full rounded-xl border border-primary-500/20 bg-white/50 px-4 py-3 font-body text-sm text-foreground-900 placeholder:text-foreground-400 backdrop-blur-md transition-colors focus:border-primary-500/50 focus:bg-white/80 focus:outline-none focus:ring-4 focus:ring-primary-500/10"
                />
              </div>
            </div>
          </div>

          {/* Media */}
          <div className="overflow-hidden rounded-3xl border border-white/40 bg-white/60 p-6 shadow-xl backdrop-blur-xl">
            <h3 className="mb-6 font-heading text-lg font-semibold text-foreground-900">Product Media</h3>
            
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={cn(
                "relative flex h-64 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed transition-colors",
                dragActive
                  ? "border-primary-500 bg-primary-50"
                  : "border-primary-500/20 bg-background-50 hover:border-primary-500/40 hover:bg-background-50/80"
              )}
            >
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                className="absolute inset-0 z-50 cursor-pointer opacity-0"
              />
              <div className="rounded-full bg-white p-4 shadow-sm">
                <Upload className="size-6 text-primary-500" />
              </div>
              <p className="mt-4 font-body text-sm font-medium text-foreground-900">
                Drag and drop images here, or <span className="text-primary-500">browse</span>
              </p>
              <p className="mt-1 font-body text-xs text-foreground-500">
                Supports JPG, PNG, WEBP (Max 5MB)
              </p>
            </div>

            {images.length > 0 && (
              <div className="mt-6 grid grid-cols-4 gap-4">
                {images.map((src, i) => (
                  <div key={i} className="group relative aspect-square overflow-hidden rounded-xl border border-primary-500/10 bg-background-100">
                    <img src={src} alt="" className="size-full object-cover transition-transform group-hover:scale-110" />
                    <button
                      onClick={() => setImages((prev) => prev.filter((_, index) => index !== i))}
                      className="absolute right-2 top-2 rounded-full bg-black/50 p-1.5 text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100 hover:bg-red-500"
                    >
                      <Trash2 className="size-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-8">
          {/* Pricing & Inventory */}
          <div className="overflow-hidden rounded-3xl border border-white/40 bg-white/60 p-6 shadow-xl backdrop-blur-xl">
            <h3 className="mb-6 font-heading text-lg font-semibold text-foreground-900">Pricing & Inventory</h3>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="font-body text-sm font-medium text-foreground-700">Price (₹)</label>
                <input
                  type="text"
                  placeholder="0.00"
                  className="w-full rounded-xl border border-primary-500/20 bg-white/50 px-4 py-3 font-body text-sm text-foreground-900 placeholder:text-foreground-400 backdrop-blur-md transition-colors focus:border-primary-500/50 focus:bg-white/80 focus:outline-none focus:ring-4 focus:ring-primary-500/10"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="font-body text-sm font-medium text-foreground-700">SKU</label>
                  <input
                    type="text"
                    placeholder="ANI-001"
                    className="w-full rounded-xl border border-primary-500/20 bg-white/50 px-4 py-3 font-body text-sm text-foreground-900 placeholder:text-foreground-400 backdrop-blur-md transition-colors focus:border-primary-500/50 focus:bg-white/80 focus:outline-none focus:ring-4 focus:ring-primary-500/10"
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-body text-sm font-medium text-foreground-700">Stock Qty</label>
                  <input
                    type="number"
                    placeholder="0"
                    className="w-full rounded-xl border border-primary-500/20 bg-white/50 px-4 py-3 font-body text-sm text-foreground-900 placeholder:text-foreground-400 backdrop-blur-md transition-colors focus:border-primary-500/50 focus:bg-white/80 focus:outline-none focus:ring-4 focus:ring-primary-500/10"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Organization */}
          <div className="overflow-hidden rounded-3xl border border-white/40 bg-white/60 p-6 shadow-xl backdrop-blur-xl">
            <h3 className="mb-6 font-heading text-lg font-semibold text-foreground-900">Organization</h3>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="font-body text-sm font-medium text-foreground-700">Category</label>
                <select className="w-full rounded-xl border border-primary-500/20 bg-background-50 px-4 py-3 font-body text-sm text-foreground-900 focus:border-primary-500/50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary-500/10">
                  <option value="">Select Category</option>
                  <option value="sarees">Sarees</option>
                  <option value="kurtas">Kurtas</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="font-body text-sm font-medium text-foreground-700">Sub-Category</label>
                <select className="w-full rounded-xl border border-primary-500/20 bg-background-50 px-4 py-3 font-body text-sm text-foreground-900 focus:border-primary-500/50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary-500/10">
                  <option value="">Select Sub-Category</option>
                  <option value="festive">Festive Wear</option>
                  <option value="daily">Daily Wear</option>
                  <option value="office">Office Wear</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-4 border-t border-primary-500/10 pt-6">
        <button
          onClick={() => navigate('/admin/products')}
          className="rounded-full px-6 py-2.5 font-body text-sm font-medium text-foreground-600 transition-colors hover:bg-background-100 hover:text-foreground-900"
        >
          Cancel
        </button>
        <button className="rounded-full bg-primary-600 px-8 py-2.5 font-body text-sm font-semibold text-white shadow-lg shadow-primary-500/30 transition-all hover:-translate-y-0.5 hover:bg-primary-700 hover:shadow-xl hover:shadow-primary-500/40">
          Save Product
        </button>
      </div>
    </div>
  )
}
