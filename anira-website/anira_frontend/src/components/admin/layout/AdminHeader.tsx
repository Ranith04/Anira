import { Bell, Search, User, ChevronDown } from 'lucide-react'
import { Link } from 'react-router'
import { useProfile, setAuthToken, authKeys } from '@/api/auth'
import { useQueryClient } from '@tanstack/react-query'

export function AdminHeader() {
  const { data: profile } = useProfile()
  const queryClient = useQueryClient()

  const handleLogout = () => {
    setAuthToken('')
    queryClient.setQueryData(authKeys.profile(), null)
    window.location.href = '/'
  }

  return (
    <header className="sticky top-0 z-40 flex h-24 w-full items-center justify-between border-b border-primary-900/5 bg-white/40 px-8 lg:px-12 backdrop-blur-2xl">
      <div className="flex w-[28rem] items-center gap-3 rounded-2xl border border-white/60 bg-white/60 px-5 py-3 shadow-[0_2px_10px_rgba(0,0,0,0.02)] backdrop-blur-xl transition-all focus-within:border-primary-500/30 focus-within:bg-white focus-within:shadow-[0_8px_30px_rgba(154,27,63,0.08)]">
        <Search className="size-5 text-foreground-400" />
        <input
          type="text"
          placeholder="Search products, orders, or customers..."
          className="w-full bg-transparent font-body text-sm font-medium text-foreground-900 placeholder:text-foreground-400 focus:outline-none"
        />
      </div>

      <div className="flex items-center gap-6">
        <button className="relative flex size-12 items-center justify-center rounded-2xl border border-white/60 bg-white/60 text-foreground-600 shadow-[0_2px_10px_rgba(0,0,0,0.02)] backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:text-primary-600 hover:shadow-lg">
          <Bell className="size-5" />
          <span className="absolute right-3 top-3 flex size-2.5 rounded-full bg-red-500 ring-2 ring-white" />
        </button>
        <div className="h-8 w-px bg-primary-900/10" />
        <div className="group relative">
          <button className="flex items-center gap-3 rounded-2xl border border-white/60 bg-white/60 p-1.5 pr-4 shadow-[0_2px_10px_rgba(0,0,0,0.02)] backdrop-blur-xl transition-all hover:bg-white hover:shadow-lg">
            <div className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary-50 to-primary-100 text-primary-600 ring-1 ring-primary-500/20">
              <User className="size-4" />
            </div>
            <div className="text-left leading-tight hidden sm:block">
              <p className="font-body text-sm font-bold text-foreground-900">
                {profile?.name?.split(' ')[0] || 'Admin'}
              </p>
              <p className="font-body text-[10px] font-semibold uppercase text-primary-600/70">
                {profile?.role || 'Store Manager'}
              </p>
            </div>
            <ChevronDown className="ml-2 size-4 text-foreground-400 transition-transform group-hover:rotate-180" />
          </button>
          
          <div className="absolute right-0 top-full mt-3 w-56 rounded-2xl border border-white/60 bg-white/80 p-2 opacity-0 shadow-[0_20px_40px_rgba(0,0,0,0.08)] backdrop-blur-2xl transition-all duration-300 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto origin-top-right scale-95 group-hover:scale-100">
            <div className="mb-2 border-b border-primary-900/5 px-3 pb-2 pt-1">
              <p className="font-body text-sm font-bold text-foreground-900">{profile?.name || 'Administrator'}</p>
              <p className="font-body text-xs text-foreground-500">{profile?.email || 'admin@anirastudio.com'}</p>
            </div>
            <button
              onClick={handleLogout}
              className="w-full rounded-xl px-3 py-2 text-left font-body text-sm font-semibold text-red-600 transition-colors hover:bg-red-50"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
