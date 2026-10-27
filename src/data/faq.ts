import type { FaqItem } from '../types'

/**
 * PREGUNTAS FRECUENTES (editables).
 * `provisional: true` = respuesta a confirmar con la empresa.
 */
export const preguntasFrecuentes: FaqItem[] = [
  {
    id: 'pedido',
    pregunta: '¿Cómo puedo realizar un pedido?',
    respuesta:
      'Elegí tus productos en el catálogo, agregalos a tu pedido, revisá el resumen y envialo por WhatsApp. También podés escribirnos directamente al 3462-15596926.',
  },
  {
    id: 'productos',
    pregunta: '¿Qué productos están disponibles?',
    respuesta:
      'Agua en bidones de 12 y 20 litros, soda retornable en sifón de 1,5 litros e hielo en bolsa. La disponibilidad se confirma al hacer el pedido.',
  },
  {
    id: 'domicilio',
    pregunta: '¿Realizan entregas a domicilio?',
    respuesta: 'Contamos con reparto. Escribinos por WhatsApp para coordinar la entrega de tu pedido.',
    provisional: true,
  },
  {
    id: 'zonas',
    pregunta: '¿Cuáles son las zonas de cobertura?',
    respuesta: 'Estamos en Villa Cañas, Santa Fe. Consultanos por WhatsApp si llegamos a tu zona.',
    provisional: true,
  },
  {
    id: 'pagos',
    pregunta: '¿Qué medios de pago aceptan?',
    respuesta:
      'Los medios de pago se coordinan al confirmar el pedido. Si sos cliente, en la app Autogestión Agua podés ver tu saldo y tus pagos.',
    provisional: true,
  },
  {
    id: 'horarios',
    pregunta: '¿Cuáles son los horarios de atención?',
    respuesta: 'Escribinos por WhatsApp y te contamos los horarios de atención y de reparto.',
    provisional: true,
  },
  {
    id: 'precios',
    pregunta: '¿Cómo puedo consultar los precios?',
    respuesta:
      'Los precios se confirman por WhatsApp al armar tu pedido. Agregá los productos al carrito y enviá la consulta: te respondemos con los importes vigentes.',
    provisional: true,
  },
  {
    id: 'app',
    pregunta: '¿Qué es la app Autogestión Agua?',
    respuesta:
      'Es una aplicación disponible en Google Play para nuestros clientes. Permite ver la hora, la cantidad, el historial, el saldo y los pagos, para una mayor transparencia.',
  },
  {
    id: 'controles',
    pregunta: '¿Los productos tienen controles de calidad?',
    respuesta:
      'Todos nuestros productos son elaborados bajo los controles de ASSAL Santa Fe. Nuestros números de habilitación (R.N.E. y R.N.P.A.) figuran en la sección «Calidad y habilitaciones».',
  },
]
