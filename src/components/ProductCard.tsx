import { Check, Eye, ShoppingCart } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { categorias } from '../data/categories'
import { useCart } from '../context/CartContext'
import type { Product } from '../types'
import { Price } from './Price'
import { AvailabilityPill, ProductBadges } from './ProductBadges'

interface ProductCardProps {
  product: Product
  onDetail: (product: Product) => void
}

export function ProductCard({ product, onDetail }: ProductCardProps) {
  const { add } = useCart()
  const [justAdded, setJustAdded] = useState(false)
  const timer = useRef<number | undefined>(undefined)
  const categoria = categorias.find((c) => c.id === product.categoriaId)
  const soldOut = product.disponibilidad === 'agotado'

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const handleAdd = () => {
    add(product)
    setJustAdded(true)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setJustAdded(false), 1600)
  }

  return (
    <article className="card card-hover group flex h-full flex-col overflow-hidden" aria-label={`${product.nombre}, ${product.presentacion}`}>
      <div className="relative aspect-[4/5] overflow-hidden bg-mist">
        <img
          src={product.imagen}
          alt={product.imagenAlt}
          width={720}
          height={900}
          loading="lazy"
          decoding="async"
          className="size-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3">
          <ProductBadges product={product} />
        </div>
        <button
          type="button"
          onClick={() => onDetail(product)}
          aria-label={`Ver detalle de ${product.nombre} ${product.presentacion}`}
          className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-extrabold text-deep shadow-card transition hover:bg-white"
        >
          <Eye className="size-4" aria-hidden="true" />
          Ver detalle
        </button>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-bold uppercase tracking-wider text-brand-700">{categoria?.nombre ?? 'Producto'}</p>
        <h3 className="mt-1 text-lg font-extrabold leading-snug">{product.nombre}</h3>
        <p className="text-sm font-semibold text-ink-soft">
          {product.marca} · {product.presentacion}
        </p>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{product.descripcion}</p>

        <div className="mt-4 flex flex-col items-start gap-2">
          <Price product={product} />
          <AvailabilityPill value={product.disponibilidad} />
        </div>

        <button
          type="button"
          onClick={handleAdd}
          disabled={soldOut}
          className={`mt-4 w-full ${justAdded ? 'btn bg-emerald-700 text-white' : 'btn-primary'} disabled:bg-slate-300 disabled:text-slate-600 disabled:shadow-none`}
        >
          {justAdded ? (
            <>
              <Check className="anim-pop size-5" aria-hidden="true" />
              Agregado
            </>
          ) : (
            <>
              <ShoppingCart className="size-5" aria-hidden="true" />
              {soldOut ? 'No disponible' : 'Agregar al pedido'}
            </>
          )}
        </button>
      </div>
    </article>
  )
}
