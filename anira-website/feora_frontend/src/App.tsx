import { AppRoutes } from './routes'

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-cream-50 p-4 shadow-sm shrink-0">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="font-serif text-3xl font-bold text-maroon-900">ANIRA</h1>
          <nav className="hidden md:flex gap-6 font-sans">
            <a href="/" className="hover:text-maroon-700">Home</a>
            <a href="/category/sarees" className="hover:text-maroon-700">Sarees</a>
            <a href="/category/kurtas" className="hover:text-maroon-700">Kurtas</a>
          </nav>
          <div className="flex gap-4">
            <a href="/cart">Cart</a>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <AppRoutes />
      </main>

      <footer className="bg-maroon-900 text-white p-8 mt-12 shrink-0">
        <div className="container mx-auto text-center font-sans">
          <p>&copy; {new Date().getFullYear()} ANIRA. Elegance Woven in Tradition.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
