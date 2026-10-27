import { Dialog, DialogClose } from './ui/Dialog'
import { ProvisionalTag } from './ui/ProvisionalTag'

export type LegalKind = 'privacidad' | 'terminos'

const content: Record<LegalKind, { titulo: string; parrafos: string[] }> = {
  privacidad: {
    titulo: 'Política de privacidad',
    parrafos: [
      'Este sitio no registra tus datos en ningún servidor. Los datos que escribís en el pedido o en el formulario de contacto (nombre, teléfono, dirección, notas) se usan únicamente para armar el mensaje de WhatsApp que vos decidís enviar.',
      'Tu pedido se guarda en tu propio navegador para que no lo pierdas mientras navegás. Podés vaciarlo cuando quieras desde «Mi pedido».',
      'Al abrir WhatsApp o el mapa de Google Maps, esos servicios tienen sus propias políticas de privacidad.',
    ],
  },
  terminos: {
    titulo: 'Términos y condiciones',
    parrafos: [
      'Los precios, la disponibilidad, las zonas y los horarios de entrega se confirman por WhatsApp. Las imágenes son ilustrativas.',
      'Un pedido enviado desde este sitio queda confirmado cuando Agua Romi lo responde por WhatsApp. Por ahora el sitio no procesa pagos en línea.',
    ],
  },
}

export function LegalDialog({ kind, onClose }: { kind: LegalKind | null; onClose: () => void }) {
  if (!kind) return null
  const c = content[kind]
  return (
    <Dialog open onClose={onClose} labelledBy="legal-titulo" sizeClass="max-w-xl">
      <div className="flex items-center justify-between gap-3 border-b border-sky/20 px-5 py-3">
        <h2 id="legal-titulo" className="text-lg font-extrabold">
          {c.titulo}
        </h2>
        <DialogClose onClose={onClose} />
      </div>
      <div className="space-y-3 overflow-y-auto p-6 leading-relaxed text-ink-soft">
        <p>
          <ProvisionalTag /> <span className="text-sm">Texto provisional: debe ser revisado y completado con la información legal de la empresa.</span>
        </p>
        {c.parrafos.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
    </Dialog>
  )
}
