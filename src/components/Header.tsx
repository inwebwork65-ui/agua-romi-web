import { Menu, ShoppingCart, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useCart } from '../context/CartContext'
import { buildGeneralUrl } from '../lib/whatsapp'
import { Logo } from './ui/Logo'
import { WhatsAppIcon } from './ui/icons'

export const navLinks = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#nosotros', label: 'Nosotros' },
  { href: '#productos', label: 'Productos' },
  { href: '#servicios', label: 'Servicios' },
  { href: '#preguntas', label: 'Preguntas frecuentes' },
  { href: '#contacto', label: 'Contacto' },
]

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { totals, openCart } = useCart()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false)
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [menuOpen])

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-shadow duration-300 ${
        scrolled || menuOpen ? 'border-sky/20 bg-white shadow-card' : 'border-transparent bg-white/90 backdrop-blur'
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between gap-3 sm:h-[4.5rem]">
        <a href="#inicio" aria-label="Agua Romi – ir al inicio" className="shrink-0 rounded-xl">
          <Logo />
        </a>

        <nav aria-label="Navegación principal" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="rounded-full px-3.5 py-2 text-sm font-bold text-deep transition hover:bg-mist hover:text-brand-700 xl:px-4"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <a
            href={buildGeneralUrl()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Escribinos por WhatsApp (se abre en una pestaña nueva)"
            className="hidden size-11 place-items-center rounded-full text-[#128c4a] transition hover:bg-[#128c4a]/10 sm:grid"
          >
            <WhatsAppIcon className="size-6" />
          </a>

          <button
            type="button"
            onClick={openCart}
            aria-label={`Abrir mi pedido, ${totals.unidades} ${totals.unidades === 1 ? 'producto' : 'productos'}`}
            className="relative grid size-11 place-items-center rounded-full text-deep transition hover:bg-mist"
          >
            <ShoppingCart className="size-6" aria-hidden="true" />
            {totals.unidades > 0 && (
              <span
                key={totals.unidades}
                className="anim-pop absolute -right-0.5 -top-0.5 grid min-w-5 place-items-center rounded-full bg-brand-700 px-1 text-[11px] font-extrabold leading-5 text-white ring-2 ring-white"
              >
                {totals.unidades}
              </span>
            )}
          </button>

          <a href="#productos" className="btn-primary btn-sm hidden md:inline-flex">
            Hacer pedido
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="menu-movil"
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            className="grid size-11 place-items-center rounded-full text-deep transition hover:bg-mist lg:hidden"
          >
            {menuOpen ? <X className="size-6" aria-hidden="true" /> : <Menu className="size-6" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div id="menu-movil" className="anim-fade border-t border-sky/20 bg-white lg:hidden">
          <nav aria-label="Menú móvil" className="container-page py-3">
            <ul className="flex flex-col">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex min-h-12 items-center rounded-xl px-3 text-base font-bold text-deep hover:bg-mist"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-3 grid gap-2 pb-2 sm:grid-cols-2">
              <a href="#productos" onClick={() => setMenuOpen(false)} className="btn-primary">
                Hacer pedido
              </a>
              <a href={buildGeneralUrl()} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
                <WhatsAppIcon className="size-5" />
                Escribinos por WhatsApp
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
