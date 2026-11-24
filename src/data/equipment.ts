/** EQUIPAMIENTO E INSTALACIONES: fotografías reales de la planta. */
export interface EquipmentPhoto {
  id: string
  titulo: string
  texto?: string
  imagen: string
  imagenAlt: string
}

export const equipamientoIntro = {
  titulo: 'Equipamiento e instalaciones',
  lead: 'Instalaciones reales y equipos que forman parte del trabajo diario de nuestra planta.',
}

export const fotosEquipamiento: Record<'productora' | 'lavadora' | 'equipo' | 'personal', EquipmentPhoto> = {
  productora: {
    id: 'productora-hielo',
    titulo: 'Productora de hielo',
    texto: 'Donde se elabora el hielo en bolsa.',
    imagen: '/images/eq-productora-hielo.webp',
    imagenAlt: 'Productora de hielo de la planta',
  },
  lavadora: {
    id: 'lavadora-bidones',
    titulo: 'Lavadora de bidones',
    texto: 'Limpieza y preparación de los envases.',
    imagen: '/images/eq-lavadora-bidones.webp',
    imagenAlt: 'Lavadora de bidones de acero inoxidable',
  },
  equipo: {
    id: 'equipo-planta',
    titulo: 'Equipo de trabajo',
    texto: 'En el sector de elaboración y envasado.',
    imagen: '/images/eq-equipo-planta.webp',
    imagenAlt: 'Tres integrantes del equipo con ropa de trabajo junto al tanque y la línea de envasado',
  },
  personal: {
    id: 'personal-planta',
    titulo: 'Trabajo en la planta',
    texto: 'Higiene y cuidado en cada paso.',
    imagen: '/images/eq-personal-planta.webp',
    imagenAlt: 'Personal de la planta con ropa de trabajo y bidones al fondo',
  },
}
