import { settings } from '../../config/settings'

/** Etiqueta "A confirmar" para textos provisionales. Se oculta con `settings.mostrarAvisosProvisorios = false`. */
export function ProvisionalTag({ className = '' }: { className?: string }) {
  if (!settings.mostrarAvisosProvisorios) return null
  return (
    <span
      className={`inline-flex items-center rounded-full bg-amber-100 px-2 py-0.5 text-xs font-bold text-amber-900 ${className}`}
      title="Texto provisional: se ajustará con la información oficial de Agua Romi"
    >
      A confirmar
    </span>
  )
}
