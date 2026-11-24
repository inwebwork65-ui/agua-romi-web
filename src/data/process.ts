/**
 * PROCESO DE PURIFICACIÓN (en el orden informado por la empresa).
 * Cada etapa usa una fotografía real de la planta. `destacada` resalta el diferencial de la empresa.
 * No se agregan datos técnicos que no hayan sido informados.
 */
export interface ProcessStage {
  id: string
  titulo: string
  texto: string
  /** Texto adicional explicado por la empresa. */
  detalle?: string
  imagen: string
  imagenAlt: string
  destacada?: boolean
}

export const procesoIntro = {
  titulo: 'Nuestro proceso de purificación',
  lead: 'Trabajamos con diferentes etapas de tratamiento y equipamiento especializado para garantizar un proceso de purificación y acondicionamiento del agua.',
}

export const etapas: ProcessStage[] = [
  {
    id: 'agua-cruda',
    titulo: 'Extracción y almacenamiento de agua cruda',
    texto: 'El agua se extrae de la napa y se almacena inicialmente en un tanque de agua cruda.',
    imagen: '/images/proc-1-agua-cruda.webp',
    imagenAlt: 'Tanque de almacenamiento de agua cruda de la planta',
  },
  {
    id: 'ultravioleta',
    titulo: 'Tratamiento con luz ultravioleta',
    texto: 'El agua pasa por un sistema de luz ultravioleta para eliminar bacterias.',
    imagen: '/images/proc-2-ultravioleta.webp',
    imagenAlt: 'Lámpara de luz ultravioleta instalada en la planta',
  },
  {
    id: 'carbon-activado',
    titulo: 'Filtrado con carbón activado',
    texto: 'Luego pasa por un filtro de carbón activado, que permite retener sólidos disueltos.',
    imagen: '/images/proc-3-carbon-activado.webp',
    imagenAlt: 'Filtro de carbón activado de la planta, con su cartel identificatorio',
  },
  {
    id: 'osmosis-inversa',
    titulo: 'Ósmosis inversa',
    texto: 'El agua pasa por el equipo de ósmosis inversa, donde se eliminan metales y minerales.',
    imagen: '/images/proc-4-osmosis.webp',
    imagenAlt: 'Equipo de ósmosis inversa de la planta',
  },
  {
    id: 'mineralizacion',
    titulo: 'Dosificación y mineralización',
    texto: 'Volvemos a incorporar minerales al agua después del proceso de ósmosis inversa, como parte de nuestro tratamiento.',
    detalle: 'Es un paso importante: la ósmosis inversa elimina tanto los minerales buenos como los malos.',
    imagen: '/images/proc-5-dosificador.webp',
    imagenAlt: 'Dosificador de minerales de la planta',
    destacada: true,
  },
  {
    id: 'agua-tratada',
    titulo: 'Almacenamiento de agua tratada',
    texto: 'Una vez mineralizada, el agua se almacena en el tanque de agua tratada.',
    imagen: '/images/proc-6-agua-tratada.webp',
    imagenAlt: 'Tanque de acero inoxidable donde se almacena el agua tratada',
  },
  {
    id: 'ozonizacion',
    titulo: 'Ozonización',
    texto:
      'El último tratamiento es la ozonización: permite eliminar bacterias que pudieran haber quedado en etapas anteriores y mejorar la calidad del agua.',
    imagen: '/images/proc-7-ozonizacion.webp',
    imagenAlt: 'Equipo de ozonización de la planta',
  },
  {
    id: 'envasado',
    titulo: 'Envasado',
    texto: 'Finalmente, el agua pasa al proceso de envasado en nuestra envasadora automática.',
    imagen: '/images/proc-8-envasado.webp',
    imagenAlt: 'Envasadora automática de Agua Romi, con bidones en la línea de llenado',
  },
]
