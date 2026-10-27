import { Minus, Plus } from 'lucide-react'
import { MAX_QTY } from '../../lib/cart'

interface QtyStepperProps {
  value: number
  onChange: (next: number) => void
  /** Texto para lectores de pantalla, ej. el nombre del producto. */
  label: string
  /** Si es true, con cantidad 1 el botón "menos" sigue activo (el padre decide qué hacer, ej. quitar). */
  allowZero?: boolean
}

export function QtyStepper({ value, onChange, label, allowZero = false }: QtyStepperProps) {
  const dec = () => onChange(value - 1)
  const inc = () => onChange(Math.min(MAX_QTY, value + 1))
  return (
    <div className="inline-flex items-center rounded-full border border-slate-300 bg-white" role="group" aria-label={`Cantidad de ${label}`}>
      <button
        type="button"
        onClick={dec}
        disabled={!allowZero && value <= 1}
        aria-label={`Disminuir cantidad de ${label}`}
        className="grid size-9 place-items-center rounded-full text-deep transition hover:bg-mist disabled:opacity-40 disabled:hover:bg-transparent"
      >
        <Minus className="size-4" aria-hidden="true" />
      </button>
      <span className="min-w-8 text-center text-sm font-extrabold tabular-nums text-deep" aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        onClick={inc}
        disabled={value >= MAX_QTY}
        aria-label={`Aumentar cantidad de ${label}`}
        className="grid size-9 place-items-center rounded-full text-deep transition hover:bg-mist disabled:opacity-40 disabled:hover:bg-transparent"
      >
        <Plus className="size-4" aria-hidden="true" />
      </button>
    </div>
  )
}
