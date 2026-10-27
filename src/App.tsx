import { useState } from 'react'
import { About } from './components/About'
import { AdVideos } from './components/AdVideos'
import { AppSection } from './components/AppSection'
import { CartDrawer } from './components/CartDrawer'
import { Catalog, ALL } from './components/Catalog'
import { Categories } from './components/Categories'
import { Contact } from './components/Contact'
import { Faq } from './components/Faq'
import { FloatingActions } from './components/FloatingActions'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Promotions } from './components/Promotions'
import { Quality } from './components/Quality'
import { Services } from './components/Services'
import { Toast } from './components/ui/Toast'
import { CartProvider } from './context/CartContext'

export default function App() {
  // La categoría elegida se comparte entre las tarjetas de categorías, el catálogo y el pie de página.
  const [category, setCategory] = useState<string>(ALL)

  return (
    <CartProvider>
      <a
        href="#contenido"
        className="sr-only z-[200] rounded-full bg-deep px-5 py-3 font-bold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Saltar al contenido
      </a>
      <Header />
      <main id="contenido">
        <Hero />
        <About />
        <Categories onSelect={setCategory} />
        <Catalog category={category} onCategoryChange={setCategory} />
        <Promotions />
        <AdVideos />
        <AppSection />
        <Quality />
        <Services />
        <Faq />
        <Contact />
      </main>
      <Footer onSelectCategory={setCategory} />
      <FloatingActions />
      <CartDrawer />
      <Toast />
    </CartProvider>
  )
}
