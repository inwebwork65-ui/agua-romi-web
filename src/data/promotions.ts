import type { Promotion } from '../types'

/**
 * PROMOCIONES Y COMBOS VIGENTES
 * ------------------------------------------------------------
 * Está vacío a propósito: no se muestran descuentos que no existan.
 * Mientras no haya promociones cargadas, la sección invita a consultarlas por WhatsApp.
 *
 * Ejemplo para cargar una real:
 * {
 *   id: 'combo-hogar',
 *   etiqueta: 'Combo',
 *   titulo: 'Combo hogar',
 *   descripcion: '2 bidones de 20 litros + 1 bolsa de hielo.',
 *   productIds: ['bidon-20', 'hielo-bolsa'],
 * },
 */
export const promociones: Promotion[] = []
