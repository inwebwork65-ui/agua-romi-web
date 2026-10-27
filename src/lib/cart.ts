import type { CartLine, CartLineDetail, CartTotals, Product } from '../types'

/** Convierte las líneas del carrito (id + cantidad) en líneas con el producto y su subtotal. */
export function buildCartDetails(lines: CartLine[], products: Product[]): CartLineDetail[] {
  const byId = new Map(products.map((p) => [p.id, p]))
  const details: CartLineDetail[] = []
  for (const line of lines) {
    const product = byId.get(line.productId)
    if (!product) continue
    details.push({
      product,
      cantidad: line.cantidad,
      subtotal: product.precio == null ? null : round2(product.precio * line.cantidad),
    })
  }
  return details
}

export function computeTotals(details: CartLineDetail[]): CartTotals {
  let subtotal = 0
  let unidades = 0
  let lineasSinPrecio = 0
  for (const d of details) {
    unidades += d.cantidad
    if (d.subtotal == null) lineasSinPrecio += 1
    else subtotal += d.subtotal
  }
  return {
    subtotal: round2(subtotal),
    unidades,
    lineasSinPrecio,
    totalCompleto: details.length > 0 && lineasSinPrecio === 0,
  }
}

/** Evita errores de coma flotante al sumar importes. */
function round2(n: number): number {
  return Math.round((n + Number.EPSILON) * 100) / 100
}

export const MAX_QTY = 99
export const clampQty = (n: number): number => Math.max(1, Math.min(MAX_QTY, Math.floor(n) || 1))
