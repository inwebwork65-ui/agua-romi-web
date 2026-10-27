import type { AdVideo } from '../types'

/**
 * VIDEOS DE PUBLICIDAD (formato vertical 9:16, sin audio, en bucle).
 * Para cambiarlos: copiar el .mp4 a /public/videos y la imagen de portada (poster) a /public/images.
 */
export const videosPublicidad: AdVideo[] = [
  {
    id: 'reparto',
    titulo: 'Reparto Romi',
    descripcion: 'Nuestro camión de reparto, listo para salir.',
    src: '/videos/reparto.mp4',
    poster: '/images/video-reparto.webp',
  },
  {
    id: 'planta',
    titulo: 'Recorrido por la planta',
    descripcion: 'Un vistazo a las instalaciones donde elaboramos el agua.',
    src: '/videos/planta.mp4',
    poster: '/images/video-planta.webp',
  },
  {
    id: 'hielo',
    titulo: 'Hielo Romi',
    descripcion: 'Congelamos pureza.',
    src: '/videos/hielo.mp4',
    poster: '/images/video-hielo.webp',
  },
]
