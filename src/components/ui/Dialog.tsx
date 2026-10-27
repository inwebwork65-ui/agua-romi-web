import { X } from 'lucide-react'
import type { ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { useDialog } from '../../hooks/useDialog'

interface DialogProps {
  open: boolean
  onClose: () => void
  /** id del elemento que titula el diálogo. */
  labelledBy: string
  variant?: 'center' | 'drawer'
  /** Clases de ancho máximo para el modo centrado. */
  sizeClass?: string
  children: ReactNode
}

/** Diálogo modal accesible (foco atrapado, Escape, clic afuera). Se renderiza en un portal. */
export function Dialog({ open, onClose, labelledBy, variant = 'center', sizeClass = 'max-w-3xl', children }: DialogProps) {
  const ref = useDialog<HTMLDivElement>(open, onClose)
  if (!open) return null

  const isDrawer = variant === 'drawer'
  return createPortal(
    <div className={`fixed inset-0 z-[100] flex ${isDrawer ? 'justify-end' : 'items-end justify-center p-0 sm:items-center sm:p-6'}`}>
      <div className="anim-fade absolute inset-0 bg-deep/55 backdrop-blur-[2px]" onClick={onClose} aria-hidden="true" />
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        tabIndex={-1}
        className={
          isDrawer
            ? 'anim-drawer relative flex h-full w-full max-w-md flex-col bg-white shadow-2xl outline-none'
            : `anim-rise relative flex max-h-[92dvh] w-full ${sizeClass} flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl outline-none sm:rounded-3xl`
        }
      >
        {children}
      </div>
    </div>,
    document.body,
  )
}

export function DialogClose({ onClose, label = 'Cerrar' }: { onClose: () => void; label?: string }) {
  return (
    <button
      type="button"
      onClick={onClose}
      aria-label={label}
      className="grid size-10 shrink-0 place-items-center rounded-full text-deep transition hover:bg-mist"
    >
      <X className="size-5" aria-hidden="true" />
    </button>
  )
}
