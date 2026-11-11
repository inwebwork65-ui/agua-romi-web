import { Menu, MapPin, ShoppingCart, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useCart } from '../context/CartContext'
import { settings } from '../config/settings'
import { buildGeneralUrl } from '../lib/whatsapp'
import { WhatsAppIcon } from './ui/icons'

export const navLinks = [
  { href: '#productos', label: 'Productos' },
  { href: '#servicios', label: 'Servicios' },
  { href: '#calidad', label: 'Calidad' },
  { href: '#nosotros', label: 'Nosotros' },
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
      <div className="bg-[#041a33] text-white">
        <div className="container-page flex h-8 items-center justify-between gap-4 text-[11px] font-semibold sm:text-xs">
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
        className={`sticky top-0 z-50 border-b bg-[#06223f]/95 text-white backdrop-blur transition-shadow duration-300 ${
          scrolled || menuOpen ? 'border-white/15 shadow-[0_10px_28px_-16px_rgb(0_0_0/0.7)]' : 'border-white/10'
        }`}
      >
        <div className="container-page flex h-14 items-center justify-between gap-4 sm:h-[3.75rem]">
          <a href="#inicio" aria-label="Agua Romi – ir al inicio" className="shrink-0 rounded-md">
            <img src="/images/logo-romi-claro.png" alt={settings.logo.alt} width={585} height={190} className="h-8 w-auto sm:h-9" />
          </a>

          <nav aria-label="Navegación principal" className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="nav-link py-1.5 text-[0.82rem] font-bold tracking-wide text-white/90 transition hover:text-sky">
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
              aria-label={`Abrir mi pedido, ${totals.unidades} ${totals.unidades === 1 ? 'producto' : 'productos'}`}
              className="relative grid size-10 place-items-center rounded-lg text-white transition hover:bg-white/10"
            >
              <ShoppingCart className="size-5" aria-hidden="true" />
              {totals.unidades > 0 && (
                <span
                  key={totals.unidades}
                  className="anim-pop absolute right-0 top-0 grid min-w-[1.15rem] place-items-center rounded-full bg-sky px-1 text-[10px] font-extrabold leading-[1.15rem] text-[#06223f] ring-2 ring-[#06223f]"
                >
                  {totals.unidades}
                </span>
              )}
            </button>

            <a href="#productos" className="btn-primary btn-sm ml-1 hidden !min-h-9 !px-4 text-[0.82rem] md:inline-flex">
              Hacer un pedido
            </a>

            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="menu-movil"
              aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
              className="grid size-10 place-items-center rounded-lg text-white transition hover:bg-white/10 lg:hidden"
            >
              {menuOpen ? <X className="size-6" aria-hidden="true" /> : <Menu className="size-6" aria-hidden="true" />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div id="menu-movil" className="anim-fade absolute inset-x-0 top-full border-t border-white/10 bg-[#06223f] shadow-lift lg:hidden">
            <nav aria-label="Menú móvil" className="container-page py-3">
              <ul className="flex flex-col">
                {navLinks.map((l) => (
                  <li key={l.href} className="border-b border-white/10 last:border-0">
                    <a
                      href={l.href}
                      onClick={() => setMenuOpen(false)}
                      className="flex min-h-12 items-center justify-between text-base font-extrabold text-white"
                    >
                      {l.label}
                      <span className="text-sky" aria-hidden="true">
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
