import type { Service } from '../types'

/**
 * SERVICIOS DE DISTRIBUCIÓN
 * `provisional: true` marca textos que hay que confirmar con la empresa
 * (se ve una etiqueta "A confirmar" mientras `settings.mostrarAvisosProvisorios` sea true).
 * No se informan zonas, horarios ni frecuencias hasta tener los datos oficiales.
 */
export const servicios: Service[] = [
  {
    id: 'domicilio',
    icono: 'truck',
    titulo: 'Entrega a domicilio',
    descripcion: 'Llevamos tu pedido de agua, soda e hielo. Escribinos por WhatsApp para coordinar la entrega.',
    provisional: true,
  },
  {
    id: 'hogares',
    icono: 'home',
    titulo: 'Para hogares',
    descripcion: 'Bidones de 12 y 20 litros para tener agua siempre a mano en casa.',
  },
  {
    id: 'comercios',
    icono: 'store',
    titulo: 'Para comercios',
    descripcion: 'Hielo, agua y soda para tu local. Consultanos por pedidos frecuentes o por cantidad.',
    provisional: true,
  },
  {
    id: 'empresas',
    icono: 'building',
    titulo: 'Para empresas',
    descripcion: 'Abastecimiento de agua en bidones para oficinas y empresas.',
    provisional: true,
  },
  {
    id: 'whatsapp',
    icono: 'message',
    titulo: 'Pedidos por WhatsApp',
    descripcion: 'Armá tu pedido en el sitio o escribinos directamente: te respondemos por el mismo chat.',
  },
  {
    id: 'autogestion',
    icono: 'smartphone',
    titulo: 'App de autogestión',
    descripcion: 'Los clientes ven hora, cantidad, historial, saldo y pagos desde su celular.',
  },
  {
    id: 'zonas',
    icono: 'map',
    titulo: 'Zonas de cobertura',
    descripcion: 'Estamos en Villa Cañas, Santa Fe. Consultá por WhatsApp si llegamos a tu zona.',
    provisional: true,
  },
  {
    id: 'frecuencia',
    icono: 'clock',
    titulo: 'Frecuencia de reparto',
    descripcion: 'Los días y horarios de reparto se coordinan con cada cliente.',
    provisional: true,
  },
]
