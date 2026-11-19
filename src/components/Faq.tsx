import { ChevronDown } from 'lucide-react'
import { preguntasFrecuentes } from '../data/faq'
import { buildGeneralUrl } from '../lib/whatsapp'
import { Reveal } from './ui/Reveal'
import { WhatsAppIcon } from './ui/icons'

export function Faq() {
  return (
    <section id="preguntas" className="bg-white py-20 sm:py-24 lg:py-32" aria-labelledby="faq-titulo">
      <div className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.3fr] lg:gap-20">
        <Reveal>
          <span className="eyebrow">Preguntas frecuentes</span>
          <h2 id="faq-titulo" className="section-title mt-5">
            Resolvé tus dudas
          </h2>
          <p className="section-lead">Si no encontrás lo que buscás, escribinos y te respondemos por WhatsApp.</p>
          <a href={buildGeneralUrl('Hola Agua Romi! Tengo una consulta.')} target="_blank" rel="noopener noreferrer" className="btn-whatsapp mt-6">
            <WhatsAppIcon className="size-5" />
            Hacer otra pregunta
          </a>
        </Reveal>

        <Reveal delay={100}>
          <div className="border-t border-deep/15">
            {preguntasFrecuentes.map((f) => (
              <details key={f.id} className="group border-b border-deep/15 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex min-h-[4.25rem] cursor-pointer list-none items-center justify-between gap-6 py-5 text-left text-base font-extrabold text-deep transition-colors hover:text-brand-700 sm:text-lg">
                  <span className="flex flex-wrap items-center gap-2">
                    {f.pregunta}
                  </span>
                  <span className="grid size-9 shrink-0 place-items-center rounded-full border border-deep/20 text-brand-700 transition duration-300 group-open:rotate-180 group-open:border-brand group-open:bg-brand group-open:text-white">
                    <ChevronDown className="size-5" aria-hidden="true" />
                  </span>
                </summary>
                <div className="anim-fade max-w-2xl pb-6 leading-relaxed text-ink-soft">{f.respuesta}</div>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
