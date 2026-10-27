/**
 * TEXTOS INSTITUCIONALES: "Quiénes somos" y "Calidad y habilitaciones".
 * Sólo se afirma lo que figura en la publicidad de la empresa. La historia y la
 * filosofía quedan como texto provisional hasta recibir la información real.
 */
export const nosotros = {
  titulo: 'Hielo y agua con atención cercana',
  parrafos: [
    'Agua Romi es una planta purificadora y embotelladora de agua en bidones de 12 y 20 litros, con soda retornable e hielo en bolsa, ubicada en Villa Cañas, Santa Fe.',
    'Trabajamos para que cada hogar, comercio y empresa tenga agua, soda e hielo a mano, con atención directa por WhatsApp.',
  ],
  historia: {
    titulo: 'Historia y trayectoria',
    texto:
      'Acá vamos a contar cómo nació Agua Romi y cómo fue creciendo junto a sus clientes. Texto a completar con la historia real de la empresa.',
    provisional: true,
  },
  pilares: [
    {
      id: 'atencion',
      icono: 'message' as const,
      titulo: 'Atención directa',
      texto: 'Pedidos y consultas por WhatsApp, hablando con quien prepara tu pedido.',
    },
    {
      id: 'transparencia',
      icono: 'smartphone' as const,
      titulo: 'Transparencia',
      texto: 'Una app para que cada cliente vea hora, cantidad, historial, saldo y pagos.',
    },
    {
      id: 'controles',
      icono: 'shield' as const,
      titulo: 'Controles oficiales',
      texto: 'Productos elaborados bajo los controles de ASSAL Santa Fe.',
    },
  ],
}

export const calidad = {
  titulo: 'Calidad y habilitaciones',
  lead: 'Todos nuestros productos son elaborados bajo los controles de ASSAL Santa Fe. Estos son los números de habilitación de nuestra planta.',
  equipamiento: [
    {
      id: 'osmosis',
      titulo: 'Ósmosis inversa',
      texto: 'Equipo de ósmosis inversa en el tratamiento del agua de nuestra planta.',
    },
    {
      id: 'ozono',
      titulo: 'Ozonizador',
      texto: 'Ozonizador incorporado al tratamiento del agua de nuestra planta.',
    },
    {
      id: 'carbon',
      titulo: 'Filtro de carbón activado',
      texto: 'Filtro de carbón activado en la línea de tratamiento de la planta.',
    },
  ],
  /** Información a sumar cuando la empresa la confirme (descripción del proceso, controles, análisis). */
  pendiente: 'Próximamente: descripción del proceso de tratamiento y controles de calidad.',
}
