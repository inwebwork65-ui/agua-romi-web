import { ShoppingCart } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../lib/format'
import { buildGeneralUrl } from '../lib/whatsapp'
import { WhatsAppIcon } from './ui/icons'

/**
 * Botones flotantes: WhatsApp (abajo a la derecha) y acceso rápido al pedido
 * (abajo a la izquierda, sólo cuando hay productos). Ambos dejan libre el contenido y el carrito.
 */
export function FloatingActions() {
  const { totals, openCart, isOpen } = useCart()
  if (isOpen) return null

  return (
    <>
      {totals.unidades > 0 && (
        <button
          type="button"
          onClick={openCart}
          className="anim-rise fixed bottom-4 left-4 z-[60] inline-flex min-h-12 items-center gap-2 rounded-full bg-deep px-4 py-2 text-sm font-bold text-white shadow-lift transition hover:bg-brand-700 sm:bottom-6 sm:left-6"
        >
          <ShoppingCart className="size-5" aria-hidden="true" />
          <span>
            Ver mi pedido ({totals.unidades})
            {totals.subtotal > 0 && <span className="ml-1 hidden font-semibold text-sky sm:inline">· {formatPrice(totals.subtotal)}</span>}
          </span>
        </button>
      )}

      <a
        href={buildGeneralUrl()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Escribinos por WhatsApp (se abre en una pestaña nueva)"
        className="fixed bottom-4 right-4 z-[60] grid size-14 place-items-center rounded-full bg-[#128c4a] text-white shadow-lift transition hover:scale-105 hover:bg-[#0d6e3a] sm:bottom-6 sm:right-6"
      >
        <WhatsAppIcon className="size-7" />
      </a>
    </>
  )
}
