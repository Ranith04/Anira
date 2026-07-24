import { Outlet } from 'react-router'
import { AnnouncementBar } from '@/components/layout/AnnouncementBar'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { AdminTopBar } from '@/components/admin/AdminTopBar'
import { useRole } from '@/hooks/useRole'
import { cn } from '@/lib/cn'

export function MainLayout() {
  const { isAdmin } = useRole()

  return (
    <div className={cn('relative min-h-screen flex flex-col', isAdmin && 'pt-10')}>
      {isAdmin && <AdminTopBar />}
      {!isAdmin && <AnnouncementBar />}
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
