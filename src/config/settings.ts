/**
 * AJUSTES GENERALES DE AGUA ROMI
 * ------------------------------------------------------------
 * Este es el único archivo que hay que tocar para cambiar los datos de contacto,
 * redes, habilitaciones y comportamiento del pedido. Los textos de cada sección
 * están en la carpeta `src/data/`.
 *
 * Los datos de contacto y habilitaciones provienen de la publicidad impresa de la
 * empresa (flyer, bolsas de hielo y vehículos). Confirmar antes de publicar.
 */
export const settings = {
  empresa: {
    nombre: 'Agua Romi',
    nombreCompleto: 'Hielo y Agua Romi',
    eslogan: 'Congelamos pureza',
    descripcionCorta:
      'Planta purificadora y embotelladora de agua en bidones de 12 y 20 litros. También elaboramos soda retornable e hielo en bolsa.',
    localidad: 'Villa Cañas, Santa Fe',
    direccion: 'Calle 44 Bis N° 132',
  },

  /** Logo oficial: poné acá la ruta del archivo (ej. '/images/logo-romi.svg') y el sitio lo usa solo. */
  logo: {
    url: '/images/logo-romi.png' as string | null,
    alt: 'Agua Romi – Hielo y agua',
  },

  contacto: {
    /** Número de WhatsApp en formato internacional, SOLO dígitos (Argentina celular: 549 + código de área + número sin el 15). */
    whatsapp: '5493462596926',
    whatsappVisible: '3462-15596926',
    telefonoVisible: '03462 15596926',
    telefonoTel: '+5493462596926',
    email: 'aguahieloromi@gmail.com',
    /** `null` = "A confirmar". Ejemplo: 'Lunes a sábados de 8 a 18 h'. */
    horarios: null as string | null,
    /** Texto usado para el mapa embebido y el botón "Cómo llegar". */
    mapaConsulta: 'Calle 44 Bis 132, Villa Cañas, Santa Fe, Argentina',
  },

  redes: {
    instagram: {
      url: 'https://www.instagram.com/agua_hielo_romi/',
      usuario: '@agua_hielo_romi',
    },
    /** Completar cuando exista: { url: 'https://facebook.com/…', usuario: '…' } */
    facebook: null as { url: string; usuario: string } | null,
  },

  /** Habilitaciones que figuran en la publicidad de la empresa. */
  habilitaciones: {
    autoridad: 'ASSAL (Agencia Santafesina de Seguridad Alimentaria)',
    autoridadCorta: 'ASSAL Santa Fe',
    rne: '21-114386',
    rnpa: '21-113132',
  },

  /** Aplicación para clientes "Autogestión Agua". */
  app: {
    nombre: 'Autogestión Agua',
    publicador: 'StartApp Argentina',
    /**
     * Enlace directo a la ficha de Google Play. Mientras esté en `null` el botón
     * abre una búsqueda en Google Play. Reemplazar por el enlace exacto de la app.
     */
    enlaceGooglePlay: null as string | null,
    busquedaGooglePlay: 'https://play.google.com/store/search?q=Autogesti%C3%B3n%20Agua%20StartApp&c=apps',
  },

  pedidos: {
    /** 'whatsapp' = pedido armado en el sitio y enviado por WhatsApp (versión actual). */
    modo: 'whatsapp' as 'whatsapp' | 'online',
    saludoWhatsapp: 'Hola Agua Romi! Quiero hacer el siguiente pedido:',
  },

  /**
   * Modalidad 2 (tienda online con pago). Está APAGADA: no hay backend ni pasarela
   * conectados. Ver README.md → "Pasar a tienda online con Mercado Pago".
   */
  ventaOnline: {
    habilitada: false,
    proveedorPago: 'mercadopago' as const,
  },

  catalogo: {
    /** Muestra el aviso de catálogo de demostración (precios y disponibilidad a confirmar). */
    avisoDemo: true,
  },

  /** Muestra etiquetas "A confirmar" en los textos provisionales. Poner en false para publicar. */
  mostrarAvisosProvisorios: true,

  moneda: { locale: 'es-AR', codigo: 'ARS' },
}

export type Settings = typeof settings
