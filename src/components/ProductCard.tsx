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
    <article className="group flex h-full flex-col" aria-label={`${product.nombre}, ${product.presentacion}`}>
      <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-mist ring-1 ring-line">
        <img
          src={product.imagen}
          alt={product.imagenAlt}
          width={720}
          height={900}
          loading="lazy"
          decoding="async"
          className="size-full object-cover transition duration-700 group-hover:scale-[1.04]"
        />
        {/* Presentación / capacidad bien visible */}
        <span className="absolute left-3 top-3 rounded-md bg-white px-3 py-1.5 text-sm font-extrabold text-deep shadow-card">
          {product.presentacion}
        </span>
        <div className="absolute right-3 top-3">
          <ProductBadges product={product} />
        </div>
        <button
          type="button"
          onClick={() => onDetail(product)}
          aria-label={`Ver detalle de ${product.nombre} ${product.presentacion}`}
          className="absolute inset-x-3 bottom-3 inline-flex items-center justify-center gap-1.5 rounded-lg bg-white/95 px-3 py-2.5 text-sm font-extrabold text-deep opacity-100 shadow-card backdrop-blur transition hover:bg-white sm:translate-y-2 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 sm:focus-visible:translate-y-0 sm:focus-visible:opacity-100"
        >
          <Eye className="size-4" aria-hidden="true" />
          Ver detalle
        </button>
      </div>

      <div className="flex flex-1 flex-col pt-5">
        <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-brand-700">{categoria?.nombre ?? "Producto"}</p>
        <h3 className="mt-1.5 text-xl font-extrabold leading-snug">{product.nombre}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{product.descripcion}</p>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-line pt-4">
          <Price product={product} />
          <AvailabilityPill value={product.disponibilidad} />
        </div>

        <button
          type="button"
          onClick={handleAdd}
          disabled={soldOut}
          className={`mt-4 w-full ${justAdded ? "btn bg-emerald-700 text-white" : "btn-primary"} disabled:bg-slate-300 disabled:text-slate-600 disabled:shadow-none`}
        >
          {justAdded ? (
            <>
              <Check className="anim-pop size-5" aria-hidden="true" />
              Agregado
            </>
          ) : (
            <>
              <ShoppingCart className="size-5" aria-hidden="true" />
              {soldOut ? "No disponible" : "Agregar al pedido"}
            </>
          )}
        </button>
      </div>
    </article>
  )
}
