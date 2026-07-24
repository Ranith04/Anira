import { Navigate, Outlet, useLocation } from 'react-router'
import { useProfile } from '@/api/auth'

export function AdminGuard() {
  const { data: profile, isLoading } = useProfile()
  const location = useLocation()

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background-50">
        <div className="size-8 animate-spin rounded-full border-4 border-primary-500/20 border-t-primary-500" />
      </div>
    )
  }

  // If no profile or not admin/staff, redirect to login
  if (!profile || (profile.role !== 'admin' && profile.role !== 'staff')) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />
  }

  return <Outlet />
}
