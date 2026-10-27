import type { Product } from '../types'

/**
 * CATÁLOGO DE PRODUCTOS
 * ------------------------------------------------------------
 * Los productos y presentaciones salen de la publicidad de la empresa
 * (bidones de 12 y 20 lt, soda retornable x 1,5 lt e hielo en bolsa).
 *
 * IMPORTANTE – datos a confirmar con Agua Romi:
 *  - `precio: null`  → el sitio muestra "Consultar precio". Cuando se cargue un número
 *    (en pesos), el carrito suma los importes y se habilita el orden por precio.
 *  - `disponibilidad: 'consultar'` → se confirma al hacer el pedido. Usar 'disponible' o 'agotado' cuando corresponda.
 *  - Las fotos son ilustrativas (tomadas de la planta).
 *
 * Para agregar un producto, copiar uno de los bloques y cambiar los datos.
 * Para marcar una oferta real: `oferta: true` + `precio` + `precioAnterior`.
 */
export const productos: Product[] = [
  {
    id: 'bidon-20',
    nombre: 'Bidón de agua Romi',
    marca: 'Romi',
    presentacion: '20 litros',
    descripcion: 'Agua Romi en bidón de 20 litros, ideal para dispenser en hogares, comercios y oficinas.',
    categoriaId: 'bidones',
    imagen: '/images/prod-bidon.webp',
    imagenAlt: 'Bidón de agua Romi de 20 litros',
    precio: null,
    disponibilidad: 'consultar',
    destacado: true,
  },
  {
    id: 'bidon-12',
    nombre: 'Bidón de agua Romi',
    marca: 'Romi',
    presentacion: '12 litros',
    descripcion: 'Agua Romi en bidón de 12 litros, una opción más liviana para el día a día.',
    categoriaId: 'bidones',
    imagen: '/images/prod-bidon.webp',
    imagenAlt: 'Bidón de agua Romi (imagen ilustrativa)',
    precio: null,
    disponibilidad: 'consultar',
    destacado: true,
  },
  {
    id: 'soda-sifon-1-5',
    nombre: 'Soda retornable Romi',
    marca: 'Romi',
    presentacion: 'Sifón de 1,5 litros',
    descripcion: 'Soda en sifón retornable de 1,5 litros.',
    categoriaId: 'soda',
    imagen: '/images/prod-soda.webp',
    imagenAlt: 'Sifón de soda Romi de 1,5 litros',
    precio: null,
    disponibilidad: 'consultar',
    destacado: true,
  },
  {
    id: 'hielo-bolsa',
    nombre: 'Hielo Romi en bolsa',
    marca: 'Romi',
    presentacion: 'Bolsa (consultar peso)',
    descripcion: 'Hielo en bolsa Romi. «Congelamos pureza».',
    categoriaId: 'hielo',
    imagen: '/images/prod-hielo.webp',
    imagenAlt: 'Bolsa de hielo Romi',
    precio: null,
    disponibilidad: 'consultar',
    destacado: true,
  },
]
