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
    imagen: '/images/prod-bidon-12.webp',
    imagenAlt: 'Bidón de agua Romi de 12 litros',
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
    imagen: '/images/prod-soda-sifon.webp',
    imagenAlt: 'Sifón de soda Romi de 1,5 litros en su cajón',
    precio: null,
    disponibilidad: 'consultar',
    destacado: true,
  },
  {
    id: 'hielo-bolsa-2kg',
    nombre: 'Hielo Romi en bolsa',
    marca: 'Romi',
    presentacion: '2 kg',
    descripcion: 'Hielo en bolsa Romi de 2 kg. «Congelamos pureza».',
    categoriaId: 'hielo',
    imagen: '/images/prod-hielo-2kg.webp',
    imagenAlt: 'Bolsa de hielo Romi de 2 kg',
    precio: null,
    disponibilidad: 'consultar',
  },
  {
    id: 'hielo-bolsa-4kg',
    nombre: 'Hielo Romi en bolsa',
    marca: 'Romi',
    presentacion: '4 kg',
    descripcion: 'Hielo en bolsa Romi de 4 kg. «Congelamos pureza».',
    categoriaId: 'hielo',
    imagen: '/images/prod-hielo-4kg.webp',
    imagenAlt: 'Bolsa de hielo Romi de 4 kg',
    precio: null,
    disponibilidad: 'consultar',
    destacado: true,
  },
  {
    id: 'hielo-bolsa-12kg',
    nombre: 'Hielo Romi en bolsa',
    marca: 'Romi',
    presentacion: '12 kg',
    descripcion: 'Hielo en bolsa Romi de 12 kg. «Congelamos pureza».',
    categoriaId: 'hielo',
    imagen: '/images/prod-hielo-12kg.webp',
    imagenAlt: 'Bolsa de hielo Romi de 12 kg',
    precio: null,
    disponibilidad: 'consultar',
  },
  {
    id: 'dispenser-frio-calor',
    nombre: 'Dispenser de agua frío/calor',
    marca: 'Aquadisp',
    presentacion: 'Frío y calor',
    descripcion: 'Dispenser de agua con salida de agua fría y de agua caliente, para bidones.',
    categoriaId: 'dispensers',
    imagen: '/images/prod-dispenser.webp',
    imagenAlt: 'Caja del dispenser de agua frío/calor Aquadisp',
    precio: null,
    disponibilidad: 'consultar',
  },
]
