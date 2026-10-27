import type { Disponibilidad, Product } from '../types'
import { disponibilidadLabel } from '../lib/format'

/** Etiquetas Destacado / Oferta / Novedad de un producto. */
export function ProductBadges({ product }: { product: Product }) {
  const badges: { text: string; cls: string }[] = []
  if (product.oferta) badges.push({ text: 'Oferta', cls: 'bg-red-700 text-white' })
  if (product.novedad) badges.push({ text: 'Novedad', cls: 'bg-sky text-deep' })
  if (product.destacado) badges.push({ text: 'Destacado', cls: 'bg-deep text-white' })
  if (badges.length === 0) return null
  return (
    <div className="flex flex-wrap gap-1.5">
      {badges.map((b) => (
        <span key={b.text} className={`rounded-full px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wide shadow-sm ${b.cls}`}>
          {b.text}
        </span>
      ))}
    </div>
  )
}

const availabilityStyle: Record<Disponibilidad, string> = {
  disponible: 'bg-emerald-100 text-emerald-900',
  consultar: 'bg-slate-100 text-slate-700',
  agotado: 'bg-red-100 text-red-900',
}

export function AvailabilityPill({ value }: { value: Disponibilidad }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold ${availabilityStyle[value]}`}>
      {disponibilidadLabel[value]}
    </span>
  )
}
