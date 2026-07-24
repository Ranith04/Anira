import { Outlet } from 'react-router'
import { AdminSidebar } from './AdminSidebar'
import { AdminHeader } from './AdminHeader'

export function AdminLayout() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] relative overflow-hidden selection:bg-primary-500/20">
      {/* Decorative blurred blobs to make the glassmorphism pop */}
      <div className="absolute -left-[10%] top-0 h-[500px] w-[500px] rounded-full bg-primary-400/10 blur-[100px] pointer-events-none" />
      <div className="absolute -right-[5%] top-[20%] h-[600px] w-[600px] rounded-full bg-orange-300/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-[20%] h-[400px] w-[400px] rounded-full bg-rose-300/10 blur-[100px] pointer-events-none" />

      <div className="relative z-10 flex">
        <AdminSidebar />
        <div className="flex-1 lg:pl-72 flex flex-col min-h-screen">
          <AdminHeader />
          <main className="flex-1 p-6 sm:p-8 lg:p-10 xl:p-12 overflow-x-hidden">
            <div className="mx-auto max-w-7xl">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
