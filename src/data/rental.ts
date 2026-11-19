/**
 * SERVICIO DE ALQUILER DE DISPENSERS
 * ------------------------------------------------------------
 * No es un producto de venta (no se agrega al carrito): se consulta por WhatsApp.
 * Es distinto de la venta del dispenser frío/calor, que está en `products.ts`.
 *
 * No se informan precios, plazos, depósitos ni requisitos hasta tener los datos oficiales.
 */
export interface RentalService {
  id: string
  categoriaId: string
  etiqueta: string
  nombre: string
  descripcion: string
  /** Detalle del servicio tal como lo informó la empresa. */
  detalle: string
  imagen: string
  imagenAlt: string
  mensajeWhatsapp: string
}

export const alquilerDispensers: RentalService = {
  id: 'alquiler-dispensers',
  categoriaId: 'dispensers',
  etiqueta: 'Alquiler mensual',
  nombre: 'Alquiler de dispensers',
  descripcion: 'Contá con un dispenser de agua en tu hogar o comercio. Consultanos por las opciones de alquiler.',
  detalle: 'Alquiler mensual de dispenser frío/calor más bidones de agua purificada.',
  imagen: '/images/alquiler-dispenser.webp',
  imagenAlt: 'Dispenser de agua frío/calor con bidón de agua Romi',
  mensajeWhatsapp:
    'Hola Agua Romi! Quisiera consultar por el alquiler mensual de dispenser frío/calor con bidones de agua purificada.',
}
