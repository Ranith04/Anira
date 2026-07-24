import { AppRoutes } from './routes'
import { ScrollToTop } from '@/components/common/ScrollToTop'
import { ScrollReveal } from '@/components/common/ScrollReveal'

function App() {
  return (
    <>
      <ScrollToTop />
      <ScrollReveal />
      <AppRoutes />
    </>
  )
}

export default App
