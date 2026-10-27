import { formatPrice } from '../lib/format'
import type { Product } from '../types'

/** Precio de un producto. Si todavía no está cargado, muestra "Consultar precio" (nunca un valor inventado). */
export function Price({ product, size = 'md' }: { product: Product; size?: 'md' | 'lg' }) {
  if (product.precio == null) {
    return <span className={`font-extrabold text-deep ${size === 'lg' ? 'text-xl' : 'text-base'}`}>Consultar precio</span>
  }
  return (
    <span className="flex items-baseline gap-2">
      <span className={`font-extrabold tabular-nums text-deep ${size === 'lg' ? 'text-3xl' : 'text-2xl'}`}>{formatPrice(product.precio)}</span>
      {product.oferta && product.precioAnterior != null && (
        <span className="text-sm font-semibold tabular-nums text-slate-500 line-through">
          <span className="sr-only">Precio anterior </span>
          {formatPrice(product.precioAnterior)}
        </span>
      )}
    </span>
  )
}
