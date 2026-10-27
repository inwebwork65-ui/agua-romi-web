import { CheckCircle2, X } from 'lucide-react'
import { useCart } from '../../context/CartContext'

/** Mensaje de confirmación (por ejemplo, al agregar un producto). Anunciado a lectores de pantalla. */
export function Toast() {
  const { toast, dismissToast, openCart, isOpen } = useCart()

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-24 z-[90] flex justify-center px-4 sm:bottom-8" role="status" aria-live="polite">
      {toast && !isOpen && (
        <div
          key={toast.id}
          className="anim-rise pointer-events-auto flex max-w-md items-center gap-3 rounded-2xl bg-deep px-4 py-3 text-sm font-semibold text-white shadow-lift"
        >
          <CheckCircle2 className="size-5 shrink-0 text-sky" aria-hidden="true" />
          <span className="min-w-0 flex-1">{toast.message}</span>
          <button
            type="button"
            onClick={() => {
              dismissToast()
              openCart()
            }}
            className="shrink-0 rounded-full bg-white/15 px-3 py-1 text-xs font-bold transition hover:bg-white/25"
          >
            Ver pedido
          </button>
          <button type="button" onClick={dismissToast} aria-label="Cerrar aviso" className="shrink-0 rounded-full p-1 hover:bg-white/15">
            <X className="size-4" aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  )
}
