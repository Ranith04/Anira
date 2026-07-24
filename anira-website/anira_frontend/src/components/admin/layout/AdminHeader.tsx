import { Bell, Search, User } from 'lucide-react'
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
    <header className="sticky top-0 z-40 flex h-20 w-full items-center justify-between border-b border-primary-500/10 bg-white/80 px-8 shadow-sm backdrop-blur-xl">
      <div className="flex w-96 items-center gap-3 rounded-full border border-primary-500/20 bg-background-50 px-4 py-2.5 transition-colors focus-within:border-primary-500/50 focus-within:bg-white">
        <Search className="size-5 text-foreground-400" />
        <input
          type="text"
          placeholder="Search products, orders..."
          className="w-full bg-transparent font-body text-sm text-foreground-900 placeholder:text-foreground-400 focus:outline-none"
        />
      </div>

      <div className="flex items-center gap-4">
        <button className="relative flex size-10 items-center justify-center rounded-full text-foreground-600 transition-colors hover:bg-primary-50 hover:text-primary-500">
          <Bell className="size-5" />
          <span className="absolute right-2.5 top-2.5 flex size-2 rounded-full bg-red-500" />
        </button>
        <div className="h-8 w-px bg-primary-500/10" />
        <div className="group relative">
          <button className="flex items-center gap-3 rounded-full border border-primary-500/10 bg-background-50 p-1 pr-4 transition-colors hover:bg-white">
            <div className="flex size-8 items-center justify-center rounded-full bg-primary-50 text-primary-500">
              <User className="size-4" />
            </div>
            <span className="font-body text-sm font-medium text-foreground-800">
              {profile?.name?.split(' ')[0] || 'Admin'}
            </span>
          </button>
          
          <div className="absolute right-0 top-full mt-2 w-48 rounded-2xl border border-primary-500/10 bg-white opacity-0 shadow-xl transition-all duration-300 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto">
            <div className="py-2">
              <button
                onClick={handleLogout}
                className="w-full px-5 py-2.5 text-left font-body text-sm font-medium text-red-600 hover:bg-red-50"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
