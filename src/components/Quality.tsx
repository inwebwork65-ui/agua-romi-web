import { etapas, procesoIntro } from '../data/process'
import type { ProcessStage } from '../data/process'
import { Reveal } from './ui/Reveal'

const pad = (n: number) => String(n).padStart(2, '0')

/** Etapa común: fotografía real + texto breve, alternando el lado de la imagen. */
function Stage({ stage, index }: { stage: ProcessStage; index: number }) {
  const imageFirst = index % 2 === 0
  return (
    <li className="grid items-center gap-6 lg:grid-cols-12 lg:gap-14">
      <Reveal className={`lg:col-span-7 ${imageFirst ? '' : 'lg:order-2'}`}>
        <img
          src={stage.imagen}
          alt={stage.imagenAlt}
          width={1000}
          height={750}
          loading="lazy"
          decoding="async"
          className="aspect-[4/3] w-full rounded-xl object-cover shadow-card ring-1 ring-line"
        />
      </Reveal>
      <Reveal delay={100} className={`lg:col-span-5 ${imageFirst ? '' : 'lg:order-1'}`}>
        <p className="flex items-baseline gap-3">
          <span className="text-5xl font-extrabold leading-none tracking-tight text-brand/35 tabular-nums sm:text-6xl">{pad(index + 1)}</span>
          <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-ink-soft">de {pad(etapas.length)}</span>
        </p>
        <h3 className="mt-4 text-2xl font-extrabold leading-snug tracking-tight sm:text-[1.75rem]">{stage.titulo}</h3>
        <p className="mt-3 text-base leading-relaxed text-ink-soft sm:text-lg">{stage.texto}</p>
      </Reveal>
    </li>
  )
}

/** Etapa destacada (dosificación y mineralización): diferencial de la empresa. */
function HighlightStage({ stage, index }: { stage: ProcessStage; index: number }) {
  return (
    <li>
      <Reveal>
        <div className="grid overflow-hidden rounded-xl bg-deep text-white lg:grid-cols-2">
          <img
            src={stage.imagen}
            alt={stage.imagenAlt}
            width={1000}
            height={750}
            loading="lazy"
            decoding="async"
            className="aspect-[4/3] size-full object-cover lg:aspect-auto lg:min-h-[26rem]"
          />
          <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-14">
            <span className="eyebrow-light">Nuestro diferencial</span>
            <p className="mt-6 flex items-baseline gap-3">
              <span className="text-5xl font-extrabold leading-none tracking-tight text-sky/45 tabular-nums sm:text-6xl">{pad(index + 1)}</span>
              <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-white/70">de {pad(etapas.length)}</span>
            </p>
            <h3 className="mt-4 text-2xl font-extrabold leading-snug tracking-tight !text-white sm:text-3xl">{stage.titulo}</h3>
            <p className="mt-4 text-base leading-relaxed text-white/90 sm:text-lg">{stage.texto}</p>
            {stage.detalle && <p className="mt-5 border-l-2 border-sky pl-4 text-sm leading-relaxed text-white/80 sm:text-base">{stage.detalle}</p>}
          </div>
        </div>
      </Reveal>
    </li>
  )
}

/** Calidad: el proceso de purificación explicado etapa por etapa, con fotografías reales de la planta. */
export function Quality() {
  return (
    <section id="calidad" className="bg-white py-20 sm:py-24 lg:py-32" aria-labelledby="calidad-titulo">
      <div className="container-page">
        <Reveal className="max-w-3xl">
          <span className="eyebrow">Calidad</span>
          <h2 id="calidad-titulo" className="section-title mt-5">
            {procesoIntro.titulo}
          </h2>
          <p className="section-lead">{procesoIntro.lead}</p>
        </Reveal>

        <ol className="mt-14 space-y-14 lg:mt-20 lg:space-y-24">
          {etapas.map((stage, i) =>
            stage.destacada ? <HighlightStage key={stage.id} stage={stage} index={i} /> : <Stage key={stage.id} stage={stage} index={i} />,
          )}
        </ol>
      </div>
    </section>
  )
}
