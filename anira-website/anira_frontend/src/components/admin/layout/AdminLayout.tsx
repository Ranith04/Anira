import { Outlet } from 'react-router'
import { AdminSidebar } from './AdminSidebar'
import { AdminHeader } from './AdminHeader'

export function AdminLayout() {
  return (
    <div className="min-h-screen bg-background-50">
      <AdminSidebar />
      <div className="lg:pl-64">
        <AdminHeader />
        <main className="min-h-[calc(100vh-5rem)] p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
