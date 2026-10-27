/* Tipos compartidos del sitio de Agua Romi. */

export type Disponibilidad = 'disponible' | 'consultar' | 'agotado'

export interface Category {
  id: string
  nombre: string
  descripcion: string
  imagen: string
  imagenAlt: string
}

export interface Product {
  id: string
  nombre: string
  marca: string
  /** Presentación o capacidad: "20 litros", "Sifón de 1,5 litros", etc. */
  presentacion: string
  descripcion: string
  categoriaId: string
  imagen: string
  imagenAlt: string
  /** Precio en pesos. `null` = precio a confirmar (se muestra "Consultar precio"). */
  precio: number | null
  /** Solo para ofertas reales: precio anterior tachado. */
  precioAnterior?: number | null
  disponibilidad: Disponibilidad
  destacado?: boolean
  oferta?: boolean
  novedad?: boolean
}

export interface Promotion {
  id: string
  etiqueta: string
  titulo: string
  descripcion: string
  /** Productos vinculados (opcional). */
  productIds?: string[]
}

export interface Service {
  id: string
  icono: 'truck' | 'home' | 'store' | 'building' | 'message' | 'smartphone' | 'clock' | 'map'
  titulo: string
  descripcion: string
  /** `true` = texto provisional hasta recibir la información oficial. */
  provisional?: boolean
}

export interface FaqItem {
  id: string
  pregunta: string
  respuesta: string
  provisional?: boolean
}

export interface HeroSlide {
  id: string
  imagen: string
  alt: string
  etiqueta: string
  titulo: string
  /** Posición del recorte de la imagen (CSS object-position). */
  posicion?: string
}

export interface AdVideo {
  id: string
  titulo: string
  descripcion: string
  src: string
  poster: string
}

/* ------------------------------------------------------------------ */
/* Carrito y pedidos                                                    */
/* ------------------------------------------------------------------ */

export interface CartLine {
  productId: string
  cantidad: number
}

export interface CartLineDetail {
  product: Product
  cantidad: number
  /** `null` si el producto no tiene precio configurado. */
  subtotal: number | null
}

export interface CartTotals {
  /** Suma de los productos que tienen precio. */
  subtotal: number
  /** Cantidad de unidades en el carrito. */
  unidades: number
  /** Cantidad de líneas sin precio configurado. */
  lineasSinPrecio: number
  /** `true` si todas las líneas tienen precio (el total es completo). */
  totalCompleto: boolean
}

/* --- Arquitectura preparada para la tienda online con pago (Modalidad 2) --- */

export interface CustomerData {
  nombre: string
  telefono?: string
  email?: string
}

export interface DeliveryAddress {
  calle: string
  numero?: string
  localidad: string
  referencias?: string
}

export interface ShippingOption {
  id: string
  nombre: string
  costo: number | null
}

export type OrderStatus = 'borrador' | 'enviado-whatsapp' | 'pendiente-pago' | 'pagado' | 'en-preparacion' | 'en-reparto' | 'entregado' | 'cancelado'

export interface OrderDraft {
  items: { producto: Product; cantidad: number }[]
  cliente: CustomerData
  entrega?: DeliveryAddress
  envio?: ShippingOption
  notas?: string
  /** Texto final del mensaje, si la persona lo editó antes de enviarlo. */
  mensajePersonalizado?: string
}

export type OrderResult =
  | { tipo: 'whatsapp'; url: string; mensaje: string }
  | { tipo: 'online'; pedidoId: string; urlPago: string }
