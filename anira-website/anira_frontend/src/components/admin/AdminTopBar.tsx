import { Link } from 'react-router'
import { LayoutDashboard, LogOut } from 'lucide-react'
import { useQueryClient } from '@tanstack/react-query'
import { setAuthToken, authKeys } from '@/api/auth'

export function AdminTopBar() {
  const queryClient = useQueryClient()

  const handleLogout = () => {
    setAuthToken('')
    queryClient.setQueryData(authKeys.profile(), null)
    window.location.href = '/'
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-[200] flex h-10 w-full items-center justify-between bg-black px-4 font-body text-xs text-white sm:px-6 md:px-8">
      <div className="flex items-center gap-4">
        <span className="font-semibold text-accent-400">Anira Admin</span>
        <span className="hidden text-white/50 sm:inline">You are viewing the storefront as an admin.</span>
      </div>
      <div className="flex items-center gap-4">
        <Link
          to="/admin"
          className="flex items-center gap-1.5 transition-colors hover:text-accent-400"
        >
          <LayoutDashboard className="size-3.5" />
          Dashboard
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 transition-colors hover:text-red-400"
        >
          <LogOut className="size-3.5" />
          Logout
        </button>
      </div>
    </div>
  )
}
