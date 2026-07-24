import { useProfile } from '@/api/auth'
import { useMemo } from 'react'

export function useRole() {
  const { data: profile, isLoading, refetch } = useProfile()

  return useMemo(() => {
    const role = profile?.role?.toLowerCase()
    
    return {
      profile,
      isLoading,
      refetch,
      isAuthenticated: !!profile,
      isAdmin: role === 'admin' || role === 'staff',
      isCustomer: role === 'customer',
      role,
    }
  }, [profile, isLoading, refetch])
}
