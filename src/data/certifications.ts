/**
 * HABILITACIONES Y CONTROLES.
 * Los documentos se muestran tal cual fueron proporcionados: no se modifican datos, fechas ni nombres.
 */
export interface CertificateDoc {
  id: string
  titulo: string
  subtitulo: string
  imagen: string
  imagenAlt: string
}

export const certificados: CertificateDoc[] = [
  {
    id: 'rne',
    titulo: 'Certificado de establecimiento',
    subtitulo: 'Registro Nacional de Establecimiento (R.N.E.)',
    imagen: '/images/cert-rne.webp',
    imagenAlt: 'Certificado ASSAL de Registro Nacional de Establecimiento (R.N.E.)',
  },
  {
    id: 'rnpa',
    titulo: 'Certificado de producto alimenticio',
    subtitulo: 'Registro Nacional de Producto Alimenticio (R.N.P.A.)',
    imagen: '/images/cert-rnpa.webp',
    imagenAlt: 'Certificado ASSAL de Registro Nacional de Producto Alimenticio (R.N.P.A.)',
  },
  {
    id: 'municipal',
    titulo: 'Habilitación municipal',
    subtitulo: 'Municipalidad de Villa Cañas',
    imagen: '/images/cert-municipal.webp',
    imagenAlt: 'Habilitación de la Municipalidad de Villa Cañas',
  },
]

export const controles = {
  titulo: 'Control y seguimiento de nuestra planta',
  texto:
    'Recibimos dos auditorías anuales, una cada seis meses, en las que se revisan los análisis de agua, la documentación del personal, los carnets de manipulación de alimentos, las instalaciones y los vehículos habilitados.',
  items: [
    'Análisis de agua',
    'Documentación del personal y carnets de manipulación de alimentos',
    'Instalaciones y sus habilitaciones',
    'Habilitaciones de los vehículos',
  ],
  cierre: 'Nuestro establecimiento se encuentra bajo el control de ASSAL y contamos con la dirección técnica de la Ingeniera Celeste Distaso.',
  directora: { rol: 'Dirección técnica', nombre: 'Ing. Celeste Distaso' },
}
