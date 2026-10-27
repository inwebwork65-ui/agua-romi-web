/**
 * SERVICIO DE PEDIDOS
 * ------------------------------------------------------------
 * Define una interfaz única (`OrderService`) con dos implementaciones posibles:
 *
 *  1) `whatsappOrderService` (ACTIVA): arma el mensaje y devuelve el enlace de WhatsApp.
 *     No guarda nada ni confirma pagos: el pedido queda confirmado cuando Agua Romi
 *     responde el mensaje.
 *
 *  2) `onlineOrderService` (PREPARADA, APAGADA): punto de enganche para la tienda con pago.
 *     Para habilitarla hace falta un backend propio que:
 *       - registre el pedido (cliente, dirección de entrega, opciones de envío);
 *       - cree la preferencia de pago de Mercado Pago con las credenciales en el SERVIDOR;
 *       - reciba el webhook de confirmación de pago y actualice el estado del pedido;
 *       - ofrezca un panel para gestionar pedidos.
 *     Hasta entonces, este servicio NO simula transacciones ni confirmaciones de pago.
 *
 * El resto del sitio sólo conoce `getOrderService()`, por lo que migrar de modalidad
 * no obliga a reescribir los componentes.
 */
import { settings } from '../config/settings'
import { buildOrderMessage, buildWhatsAppUrl } from '../lib/whatsapp'
import type { CartLineDetail, CartTotals, OrderDraft, OrderResult } from '../types'

export interface OrderService {
  readonly modo: 'whatsapp' | 'online'
  submit(draft: OrderDraft): Promise<OrderResult>
}

export class OnlineOrdersNotEnabledError extends Error {
  constructor() {
    super('La tienda online con pago todavía no está habilitada.')
    this.name = 'OnlineOrdersNotEnabledError'
  }
}

/** Convierte un borrador de pedido en las líneas que usa el generador de mensajes. */
function draftToDetails(draft: OrderDraft): { details: CartLineDetail[]; totals: CartTotals } {
  const details: CartLineDetail[] = draft.items.map(({ producto, cantidad }) => ({
    product: producto,
    cantidad,
    subtotal: producto.precio == null ? null : Math.round(producto.precio * cantidad * 100) / 100,
  }))
  let subtotal = 0
  let lineasSinPrecio = 0
  let unidades = 0
  for (const d of details) {
    unidades += d.cantidad
    if (d.subtotal == null) lineasSinPrecio += 1
    else subtotal += d.subtotal
  }
  return {
    details,
    totals: {
      subtotal: Math.round(subtotal * 100) / 100,
      unidades,
      lineasSinPrecio,
      totalCompleto: details.length > 0 && lineasSinPrecio === 0,
    },
  }
}

export const whatsappOrderService: OrderService = {
  modo: 'whatsapp',
  async submit(draft) {
    const { details, totals } = draftToDetails(draft)
    const direccion = draft.entrega
      ? [draft.entrega.calle, draft.entrega.numero, draft.entrega.localidad, draft.entrega.referencias]
          .filter(Boolean)
          .join(', ')
      : undefined
    const mensaje =
      draft.mensajePersonalizado?.trim() ||
      buildOrderMessage(details, totals, {
        nombre: draft.cliente.nombre,
        direccion,
        notas: draft.notas,
      })
    return { tipo: 'whatsapp', url: buildWhatsAppUrl(mensaje), mensaje }
  },
}

export const onlineOrderService: OrderService = {
  modo: 'online',
  async submit() {
    // TODO (etapa 2): POST /api/orders  →  { pedidoId, urlPago } (Mercado Pago, credenciales sólo en el servidor).
    throw new OnlineOrdersNotEnabledError()
  },
}

export function getOrderService(): OrderService {
  if (settings.pedidos.modo === 'online' && settings.ventaOnline.habilitada) return onlineOrderService
  return whatsappOrderService
}
