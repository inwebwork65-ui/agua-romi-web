import { Menu, MapPin, ShoppingCart, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useCart } from '../context/CartContext'
import { settings } from '../config/settings'
import { buildGeneralUrl } from '../lib/whatsapp'
import { Logo } from './ui/Logo'
import { WhatsAppIcon } from './ui/icons'

export const navLinks = [
  { href: '#nosotros', label: 'Nosotros' },
  { href: '#productos', label: 'Productos' },
  { href: '#servicios', label: 'Servicios' },
  { href: '#calidad', label: 'Calidad' },
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
    <>
      {/* Franja superior: contacto directo */}
      <div className="bg-deep text-white">
        <div className="container-page flex h-9 items-center justify-between gap-4 text-xs font-semibold">
          <span className="inline-flex items-center gap-1.5 text-white/85">
            <MapPin className="size-3.5 text-sky" aria-hidden="true" />
            {settings.empresa.localidad}
          </span>
          <a
            href={buildGeneralUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 transition hover:text-sky"
          >
            <WhatsAppIcon className="size-3.5" />
            <span className="hidden sm:inline">Pedidos por WhatsApp</span>
            <span className="font-extrabold">{settings.contacto.whatsappVisible}</span>
          </a>
        </div>
      </div>

      <header
        className={`sticky top-0 z-50 border-b bg-white/95 backdrop-blur transition-shadow duration-300 ${
          scrolled || menuOpen ? "border-line shadow-[0_8px_24px_-18px_rgb(16_59_101/0.45)]" : "border-transparent"
        }`}
      >
        <div className="container-page flex h-[4.25rem] items-center justify-between gap-4 sm:h-20">
          <a href="#inicio" aria-label="Agua Romi – ir al inicio" className="shrink-0 rounded-md">
            <Logo />
          </a>

          <nav aria-label="Navegación principal" className="hidden lg:block">
            <ul className="flex items-center gap-9">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="nav-link py-2 text-sm font-bold tracking-wide text-deep transition hover:text-brand-700">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-1 sm:gap-2">
            <button
              type="button"
              onClick={openCart}
              aria-label={`Abrir mi pedido, ${totals.unidades} ${totals.unidades === 1 ? "producto" : "productos"}`}
              className="relative grid size-11 place-items-center rounded-lg text-deep transition hover:bg-mist"
            >
              <ShoppingCart className="size-[1.4rem]" aria-hidden="true" />
              {totals.unidades > 0 && (
                <span
                  key={totals.unidades}
                  className="anim-pop absolute right-0.5 top-0.5 grid min-w-5 place-items-center rounded-full bg-brand-700 px-1 text-[11px] font-extrabold leading-5 text-white ring-2 ring-white"
                >
                  {totals.unidades}
                </span>
              )}
            </button>

            <a href="#productos" className="btn-primary btn-sm ml-1 hidden !min-h-11 !px-5 md:inline-flex">
              Hacer un pedido
            </a>

            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="menu-movil"
              aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
              className="grid size-11 place-items-center rounded-lg text-deep transition hover:bg-mist lg:hidden"
            >
              {menuOpen ? <X className="size-6" aria-hidden="true" /> : <Menu className="size-6" aria-hidden="true" />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div id="menu-movil" className="anim-fade absolute inset-x-0 top-full border-t border-line bg-white shadow-lift lg:hidden">
            <nav aria-label="Menú móvil" className="container-page py-4">
              <ul className="flex flex-col">
                {navLinks.map((l) => (
                  <li key={l.href} className="border-b border-line last:border-0">
                    <a
                      href={l.href}
                      onClick={() => setMenuOpen(false)}
                      className="flex min-h-14 items-center justify-between text-lg font-extrabold text-deep"
                    >
                      {l.label}
                      <span className="text-brand" aria-hidden="true">
                        →
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-4 grid gap-2.5 pb-2 sm:grid-cols-2">
                <a href="#productos" onClick={() => setMenuOpen(false)} className="btn-primary">
                  Hacer un pedido
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
    </>
  )
}
