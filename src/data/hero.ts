import type { HeroSlide } from '../types'

/** Las 3 imágenes dinámicas de la portada. Cambiar `imagen` por otra de /public/images para reemplazarlas. */
export const heroSlides: HeroSlide[] = [
  {
    id: 'productos',
    imagen: '/images/hero-productos.webp',
    alt: 'Bidón de agua, sifón de soda y bolsas de hielo Romi sobre la mesa de la planta',
    etiqueta: 'Nuestros productos',
    titulo: 'Agua, soda e hielo Romi',
    posicion: 'center',
  },
  {
    id: 'planta',
    imagen: '/images/hero-planta.webp',
    alt: 'Línea de envasado de bidones en la planta de Agua Romi',
    etiqueta: 'Nuestra planta',
    titulo: 'Purificadora y embotelladora',
    posicion: 'center',
  },
  {
    id: 'reparto',
    imagen: '/images/hero-reparto.webp',
    alt: 'Camioneta de reparto de Agua Romi cargada con bidones frente al local',
    etiqueta: 'Reparto',
    titulo: 'Llegamos con tu pedido',
    posicion: 'center 60%',
  },
]
