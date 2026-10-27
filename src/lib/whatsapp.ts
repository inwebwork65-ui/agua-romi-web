import { settings } from '../config/settings'
import type { CartLineDetail, CartTotals, Product } from '../types'
import { cleanPhone, formatPrice } from './format'

export interface OrderContact {
  nombre: string
  direccion?: string
  notas?: string
}

/** Arma el texto del pedido que se envía por WhatsApp. */
export function buildOrderMessage(details: CartLineDetail[], totals: CartTotals, contact: OrderContact): string {
  const out: string[] = [settings.pedidos.saludoWhatsapp, '']

  for (const { product, cantidad, subtotal } of details) {
    const nombre = `${product.nombre} (${product.presentacion})`
    if (product.precio == null || subtotal == null) {
      out.push(`• ${cantidad} x ${nombre} – precio a confirmar`)
    } else {
      out.push(`• ${cantidad} x ${nombre} – ${formatPrice(product.precio)} c/u = ${formatPrice(subtotal)}`)
    }
  }

  out.push('')
  if (details.length > 0 && totals.lineasSinPrecio === details.length) {
    out.push('Precios a confirmar por Agua Romi.')
  } else if (totals.totalCompleto) {
    out.push(`Total estimado: ${formatPrice(totals.subtotal)}`)
  } else {
    out.push(`Subtotal de productos con precio: ${formatPrice(totals.subtotal)} (hay productos con precio a confirmar)`)
  }

  out.push('')
  out.push(`Nombre: ${contact.nombre.trim()}`)
  if (contact.direccion?.trim()) out.push(`Dirección / zona de entrega: ${contact.direccion.trim()}`)
  if (contact.notas?.trim()) out.push(`Notas: ${contact.notas.trim()}`)

  return out.join('\n')
}

export function buildWhatsAppUrl(text: string, number: string = settings.contacto.whatsapp): string {
  return `https://wa.me/${cleanPhone(number)}?text=${encodeURIComponent(text)}`
}

/** Enlace para consultar por un producto puntual. */
export function buildProductInquiryUrl(product: Product): string {
  const text = `Hola Agua Romi! Quisiera consultar por: ${product.nombre} (${product.presentacion}). ¿Tienen disponibilidad y cuál es el precio?`
  return buildWhatsAppUrl(text)
}

/** Enlace genérico para empezar una conversación. */
export function buildGeneralUrl(text = 'Hola Agua Romi! Quisiera hacer un pedido.'): string {
  return buildWhatsAppUrl(text)
}

/**
 * Abre un enlace en una pestaña nueva. No se usa la opción "noopener" de window.open porque con ella el
 * navegador siempre devuelve null y no se puede saber si la ventana fue bloqueada; en su lugar se corta
 * el vínculo con la página de origen a mano. Si el navegador bloquea la ventana, se navega en la misma pestaña.
 */
export function openExternal(url: string): void {
  const win = window.open(url, '_blank')
  if (win) {
    win.opener = null
  } else {
    window.location.href = url
  }
}
