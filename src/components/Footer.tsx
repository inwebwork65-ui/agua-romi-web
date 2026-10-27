import { Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react'
import { useState } from 'react'
import { settings } from '../config/settings'
import { categorias } from '../data/categories'
import { buildGeneralUrl } from '../lib/whatsapp'
import { navLinks } from './Header'
import { LegalDialog } from './LegalDialog'
import type { LegalKind } from './LegalDialog'
import { Logo } from './ui/Logo'
import { WhatsAppIcon } from './ui/icons'

interface FooterProps {
  onSelectCategory: (id: string) => void
}

export function Footer({ onSelectCategory }: FooterProps) {
  const { empresa, contacto, redes, habilitaciones } = settings
  const [legal, setLegal] = useState<LegalKind | null>(null)

  const linkCls = 'rounded text-white/85 transition hover:text-white hover:underline underline-offset-4'

  return (
    <footer className="bg-deep text-white" aria-labelledby="footer-titulo">
      <h2 id="footer-titulo" className="sr-only">
        Información de Agua Romi
      </h2>
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
        <div>
          <Logo variant="white" />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/85">{empresa.descripcionCorta}</p>
          <p className="mt-2 text-sm font-bold text-sky">«{empresa.eslogan}»</p>
          <div className="mt-5 flex items-center gap-2">
            <a
              href={redes.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Instagram ${redes.instagram.usuario} (se abre en una pestaña nueva)`}
              className="grid size-11 place-items-center rounded-full bg-white/10 transition hover:bg-white/20"
            >
              <Instagram className="size-5" aria-hidden="true" />
            </a>
            {redes.facebook && (
              <a
                href={redes.facebook.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Facebook ${redes.facebook.usuario} (se abre en una pestaña nueva)`}
                className="grid size-11 place-items-center rounded-full bg-white/10 transition hover:bg-white/20"
              >
                <Facebook className="size-5" aria-hidden="true" />
              </a>
            )}
            <a
              href={buildGeneralUrl()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp (se abre en una pestaña nueva)"
              className="grid size-11 place-items-center rounded-full bg-white/10 transition hover:bg-white/20"
            >
              <WhatsAppIcon className="size-5" />
            </a>
          </div>
        </div>

        <nav aria-label="Enlaces del sitio">
          <h3 className="text-sm font-extrabold uppercase tracking-wider text-sky">Navegación</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className={linkCls}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Categorías de productos">
          <h3 className="text-sm font-extrabold uppercase tracking-wider text-sky">Productos</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {categorias.map((c) => (
              <li key={c.id}>
                <a
                  href="#productos"
                  onClick={() => onSelectCategory(c.id)}
                  className={linkCls}
                >
                  {c.nombre}
                </a>
              </li>
            ))}
            <li>
              <a href="#app" className={linkCls}>
                App Autogestión Agua
              </a>
            </li>
          </ul>
        </nav>

        <div>
          <h3 className="text-sm font-extrabold uppercase tracking-wider text-sky">Contacto</h3>
          <ul className="mt-4 space-y-3 text-sm text-white/90">
            <li className="flex items-start gap-2.5">
              <Phone className="mt-0.5 size-4 shrink-0 text-sky" aria-hidden="true" />
              <a href={`tel:${contacto.telefonoTel}`} className={linkCls}>
                {contacto.telefonoVisible}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <Mail className="mt-0.5 size-4 shrink-0 text-sky" aria-hidden="true" />
              <a href={`mailto:${contacto.email}`} className={`${linkCls} break-all`}>
                {contacto.email}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 size-4 shrink-0 text-sky" aria-hidden="true" />
              <span>
                {empresa.direccion}
                <br />
                {empresa.localidad}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="container-page flex flex-col gap-4 py-6 text-xs text-white/80 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <p>
              Planta habilitada · R.N.E. N° {habilitaciones.rne} · R.N.P.A. N° {habilitaciones.rnpa} · Controles {habilitaciones.autoridadCorta}
            </p>
            <p>© {new Date().getFullYear()} {empresa.nombreCompleto}. Todos los derechos reservados.</p>
          </div>
          <ul className="flex flex-wrap gap-x-5 gap-y-2 font-bold">
            <li>
              <button type="button" onClick={() => setLegal('privacidad')} className={linkCls}>
                Política de privacidad
              </button>
            </li>
            <li>
              <button type="button" onClick={() => setLegal('terminos')} className={linkCls}>
                Términos y condiciones
              </button>
            </li>
          </ul>
        </div>
      </div>

      <LegalDialog kind={legal} onClose={() => setLegal(null)} />
    </footer>
  )
}
