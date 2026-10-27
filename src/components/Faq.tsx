import { ChevronDown } from 'lucide-react'
import { preguntasFrecuentes } from '../data/faq'
import { buildGeneralUrl } from '../lib/whatsapp'
import { ProvisionalTag } from './ui/ProvisionalTag'
import { Reveal } from './ui/Reveal'
import { WhatsAppIcon } from './ui/icons'

export function Faq() {
  return (
    <section id="preguntas" className="section-y bg-cloud" aria-labelledby="faq-titulo">
      <div className="container-page grid gap-10 lg:grid-cols-[0.8fr_1.4fr] lg:gap-16">
        <Reveal>
          <span className="eyebrow">Preguntas frecuentes</span>
          <h2 id="faq-titulo" className="section-title mt-4">
            Resolvé tus dudas
          </h2>
          <p className="section-lead">Si no encontrás lo que buscás, escribinos y te respondemos por WhatsApp.</p>
          <a href={buildGeneralUrl('Hola Agua Romi! Tengo una consulta.')} target="_blank" rel="noopener noreferrer" className="btn-whatsapp mt-6">
            <WhatsAppIcon className="size-5" />
            Hacer otra pregunta
          </a>
        </Reveal>

        <Reveal delay={100}>
          <div className="space-y-3">
            {preguntasFrecuentes.map((f) => (
              <details key={f.id} className="card group open:shadow-lift [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 rounded-3xl px-5 py-4 text-left font-extrabold text-deep">
                  <span className="flex flex-wrap items-center gap-2">
                    {f.pregunta}
                    {f.provisional && <ProvisionalTag />}
                  </span>
                  <ChevronDown className="size-5 shrink-0 text-brand-700 transition-transform duration-300 group-open:rotate-180" aria-hidden="true" />
                </summary>
                <div className="px-5 pb-5 leading-relaxed text-ink-soft">{f.respuesta}</div>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
