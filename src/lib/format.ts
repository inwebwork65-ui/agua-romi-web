import { settings } from '../config/settings'
import type { Disponibilidad } from '../types'

const priceFormatterInt = new Intl.NumberFormat(settings.moneda.locale, {
  style: 'currency',
  currency: settings.moneda.codigo,
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
})
const priceFormatterDec = new Intl.NumberFormat(settings.moneda.locale, {
  style: 'currency',
  currency: settings.moneda.codigo,
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

/** Importes enteros sin decimales ($ 1.500); con centavos, siempre dos decimales ($ 1.250,50). */
export function formatPrice(value: number): string {
  return Number.isInteger(value) ? priceFormatterInt.format(value) : priceFormatterDec.format(value)
}

export const disponibilidadLabel: Record<Disponibilidad, string> = {
  disponible: 'Disponible',
  consultar: 'Consultar disponibilidad',
  agotado: 'Agotado',
}

/** Número de WhatsApp en formato internacional (sólo dígitos). */
export function cleanPhone(value: string): string {
  return value.replace(/\D/g, '')
}
