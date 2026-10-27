import { ShoppingCart } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useCart } from '../context/CartContext'
import { categorias } from '../data/categories'
import { buildProductInquiryUrl } from '../lib/whatsapp'
import type { Product } from '../types'
import { Price } from './Price'
import { AvailabilityPill, ProductBadges } from './ProductBadges'
import { Dialog, DialogClose } from './ui/Dialog'
import { QtyStepper } from './ui/QtyStepper'
import { WhatsAppIcon } from './ui/icons'

interface ProductDetailProps {
  product: Product | null
  onClose: () => void
}

/** Detalle del producto en un diálogo. */
export function ProductDetail({ product, onClose }: ProductDetailProps) {
  const { add } = useCart()
  const [qty, setQty] = useState(1)

  useEffect(() => setQty(1), [product?.id])

  if (!product) return null
  const categoria = categorias.find((c) => c.id === product.categoriaId)
  const soldOut = product.disponibilidad === 'agotado'

  return (
    <Dialog open onClose={onClose} labelledBy="detalle-titulo" sizeClass="max-w-4xl">
      <div className="flex items-center justify-between gap-3 border-b border-sky/20 px-5 py-3">
        <p className="text-sm font-bold text-ink-soft">Detalle del producto</p>
        <DialogClose onClose={onClose} label="Cerrar detalle del producto" />
      </div>

      <div className="grid flex-1 overflow-y-auto md:grid-cols-2">
        <div className="relative bg-mist">
          <img
            src={product.imagen}
            alt={product.imagenAlt}
            width={720}
            height={900}
            className="aspect-[4/5] size-full object-cover md:aspect-auto md:min-h-[26rem]"
          />
          <div className="absolute left-4 top-4">
            <ProductBadges product={product} />
          </div>
        </div>

        <div className="flex flex-col p-6 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-wider text-brand-700">{categoria?.nombre}</p>
          <h2 id="detalle-titulo" className="mt-1 text-2xl font-extrabold sm:text-3xl">
            {product.nombre}
          </h2>
          <p className="mt-1 font-semibold text-ink-soft">
            {product.marca} · {product.presentacion}
          </p>
          <p className="mt-4 leading-relaxed text-ink-soft">{product.descripcion}</p>

          <dl className="mt-5 grid grid-cols-[auto_1fr] gap-x-5 gap-y-2 text-sm">
            <dt className="font-bold text-deep">Marca</dt>
            <dd>{product.marca}</dd>
            <dt className="font-bold text-deep">Presentación</dt>
            <dd>{product.presentacion}</dd>
            <dt className="font-bold text-deep">Categoría</dt>
            <dd>{categoria?.nombre}</dd>
            <dt className="font-bold text-deep">Disponibilidad</dt>
            <dd>
              <AvailabilityPill value={product.disponibilidad} />
            </dd>
          </dl>

          <div className="mt-6">
            <Price product={product} size="lg" />
            {product.precio == null && (
              <p className="mt-1 text-sm text-ink-soft">El precio se confirma por WhatsApp al enviar tu pedido.</p>
            )}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <QtyStepper value={qty} onChange={setQty} label={product.nombre} />
            <button
              type="button"
              disabled={soldOut}
              onClick={() => {
                add(product, qty)
                onClose()
              }}
              className="btn-primary flex-1 disabled:bg-slate-300 disabled:text-slate-600 disabled:shadow-none"
            >
              <ShoppingCart className="size-5" aria-hidden="true" />
              Agregar al pedido
            </button>
          </div>

          <a
            href={buildProductInquiryUrl(product)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline mt-3 w-full"
          >
            <WhatsAppIcon className="size-5 text-[#128c4a]" />
            Consultar por WhatsApp
          </a>
        </div>
      </div>
    </Dialog>
  )
}
