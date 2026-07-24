import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Eye, EyeOff, Lock, Mail } from 'lucide-react'
import { useLogin } from '@/api/auth'

export default function AdminLogin() {
  const navigate = useNavigate()
  const { mutate: login, isPending } = useLogin()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    login(formData, {
      onSuccess: (data) => {
        // Only allow admin or staff
        if (data.user.role === 'admin' || data.user.role === 'staff') {
          navigate('/admin')
        } else {
          setError('Unauthorized: Admin access required.')
        }
      },
      onError: (err: any) => {
        setError(err.message || 'Invalid credentials')
      },
    })
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background-50 p-4">
      <div className="w-full max-w-md animate-in fade-in zoom-in-95 duration-500">
        <div className="rounded-3xl bg-white p-8 shadow-2xl shadow-primary-500/10">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-primary-500 shadow-lg shadow-primary-500/25">
              <span className="font-heading text-3xl font-bold italic text-white">A</span>
            </div>
            <h1 className="font-heading text-2xl font-bold text-foreground-900">Admin Portal</h1>
            <p className="mt-2 font-body text-sm text-foreground-500">
              Sign in to manage your store
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="rounded-xl bg-red-50 p-4 text-center font-body text-sm font-medium text-red-600">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-foreground-400">
                  <Mail className="size-5" />
                </div>
                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full rounded-2xl border border-primary-500/20 bg-background-50 py-3.5 pl-12 pr-4 font-body text-sm text-foreground-900 transition-colors focus:border-primary-500/50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary-500/10"
                />
              </div>

              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-foreground-400">
                  <Lock className="size-5" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full rounded-2xl border border-primary-500/20 bg-background-50 py-3.5 pl-12 pr-12 font-body text-sm text-foreground-900 transition-colors focus:border-primary-500/50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary-500/10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center px-4 text-foreground-400 transition-colors hover:text-primary-500 focus:outline-none"
                >
                  {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full rounded-2xl bg-primary-500 py-3.5 font-body text-sm font-medium text-white shadow-lg shadow-primary-500/25 transition-all hover:bg-primary-600 hover:shadow-xl hover:shadow-primary-500/30 disabled:opacity-70"
            >
              {isPending ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
        <p className="mt-6 text-center font-body text-sm text-foreground-400">
          Protected area. Authorized personnel only.
        </p>
      </div>
    </div>
  )
}
