import { Navigate, Outlet, useLocation } from 'react-router'
import { useRole } from '@/hooks/useRole'

export function CustomerGuard() {
  const { isAdmin, isAuthenticated, isLoading } = useRole()
  const location = useLocation()

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background-50">
        <div className="size-8 animate-spin rounded-full border-4 border-primary-500/20 border-t-primary-500" />
      </div>
    )
  }

  if (isAdmin) {
    // Admins have no business accessing the consumer cart, checkout, or profile pages.
    return <Navigate to="/admin" replace />
  }

  if (!isAuthenticated) {
    // Redirect unauthenticated users to the consumer login
    return <Navigate to="/account" state={{ from: location }} replace />
  }

  return <Outlet />
}
