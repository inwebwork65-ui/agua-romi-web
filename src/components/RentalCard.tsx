import { MessageCircle } from 'lucide-react'
import { categorias } from '../data/categories'
import type { RentalService } from '../data/rental'
import { buildWhatsAppUrl } from '../lib/whatsapp'
import { WhatsAppIcon } from './ui/icons'

/** Tarjeta del servicio de alquiler: mismo estilo que ProductCard, pero se consulta por WhatsApp (no se agrega al carrito). */
export function RentalCard({ service }: { service: RentalService }) {
  const categoria = categorias.find((c) => c.id === service.categoriaId)

  return (
    <article className="group flex h-full flex-col" aria-label={service.nombre}>
      <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-mist ring-1 ring-line">
        <img
          src={service.imagen}
          alt={service.imagenAlt}
          width={720}
          height={900}
          loading="lazy"
          decoding="async"
          className="size-full object-cover transition duration-700 group-hover:scale-[1.04]"
        />
        <span className="absolute left-3 top-3 rounded-md bg-white px-3 py-1.5 text-sm font-extrabold text-deep shadow-card">
          {service.etiqueta}
        </span>
      </div>

      <div className="flex flex-1 flex-col pt-5">
        <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-brand-700">{categoria?.nombre ?? 'Servicio'}</p>
        <h3 className="mt-1.5 text-xl font-extrabold leading-snug">{service.nombre}</h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">{service.descripcion}</p>
        <p className="mt-2 flex-1 text-sm font-semibold leading-relaxed text-deep">{service.detalle}</p>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-line pt-4">
          <span className="inline-flex items-center gap-1.5 text-base font-extrabold text-deep">
            <MessageCircle className="size-4 text-brand" aria-hidden="true" />
            Consultar condiciones
          </span>
          <span className="inline-flex items-center rounded-md bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-700">Servicio</span>
        </div>

        <a
          href={buildWhatsAppUrl(service.mensajeWhatsapp)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-whatsapp mt-4 w-full"
        >
          <WhatsAppIcon className="size-5" />
          Consultar por WhatsApp
          <span className="sr-only">(se abre en una pestaña nueva)</span>
        </a>
      </div>
    </article>
  )
}
