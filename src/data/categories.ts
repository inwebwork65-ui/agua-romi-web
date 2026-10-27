import type { Category } from '../types'

/**
 * CATEGORÍAS DEL CATÁLOGO
 * Se pueden agregar, quitar o renombrar libremente. Cada producto apunta a una
 * categoría con `categoriaId`.
 */
export const categorias: Category[] = [
  {
    id: 'bidones',
    nombre: 'Bidones de agua',
    descripcion: 'Agua en bidones de 12 y 20 litros para el hogar, el comercio o la empresa.',
    imagen: '/images/cat-bidones.webp',
    imagenAlt: 'Bidones de agua Romi apilados en la planta',
  },
  {
    id: 'soda',
    nombre: 'Soda y sifones',
    descripcion: 'Soda retornable en sifón de 1,5 litros.',
    imagen: '/images/cat-soda.webp',
    imagenAlt: 'Sifón de soda Romi con funda amarilla',
  },
  {
    id: 'hielo',
    nombre: 'Hielo',
    descripcion: 'Hielo Romi en bolsa, listo para tu heladera o tu comercio.',
    imagen: '/images/cat-hielo.webp',
    imagenAlt: 'Cubos de hielo cristalino',
  },
]
