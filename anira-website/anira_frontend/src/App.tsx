import { AppRoutes } from './routes'
import { AnnouncementBar } from '@/components/layout/AnnouncementBar'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ScrollToTop } from '@/components/common/ScrollToTop'
import { ScrollReveal } from '@/components/common/ScrollReveal'

function App() {
  return (
    <div className="flex min-h-screen flex-col bg-background-50">
      <ScrollToTop />
      <ScrollReveal />
      <AnnouncementBar />
      <Header />
      <main className="flex-1">
        <AppRoutes />
      </main>
      <Footer />
    </div>
  )
}

export default App
