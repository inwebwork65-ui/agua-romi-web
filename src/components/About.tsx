import { nosotros } from '../data/about'
import { Reveal } from './ui/Reveal'

/** Quiénes somos: historia de la empresa con fotografías reales y una línea de tiempo. */
export function About() {
  return (
    <section id="nosotros" className="section-y bg-cloud" aria-labelledby="nosotros-titulo">
      <div className="container-page grid items-center gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
        <Reveal>
          <div className="relative pb-12 pr-8 sm:pr-14">
            <img
              src="/images/nosotros-planta.webp"
              alt="Integrante del equipo en la planta, con ropa de trabajo, sosteniendo bidones de agua"
              width={1000}
              height={750}
              loading="lazy"
              className="aspect-[4/5] w-full rounded-xl object-cover object-[35%_center] shadow-card"
            />
            <img
              src="/images/nosotros-local.webp"
              alt="Frente del local de Agua Romi con camionetas de reparto"
              width={1200}
              height={900}
              loading="lazy"
              className="absolute bottom-0 right-0 aspect-[4/3] w-3/5 rounded-xl border-[6px] border-cloud object-cover shadow-lift"
            />
          </div>
        </Reveal>

        <Reveal delay={120}>
          <span className="eyebrow">Quiénes somos</span>
          <h2 id="nosotros-titulo" className="section-title mt-5">
            {nosotros.titulo}
          </h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-ink-soft sm:text-lg">
            {nosotros.parrafos.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          {/* Línea de tiempo */}
          <ol className="mt-10 border-l-2 border-brand/30">
            {nosotros.hitos.map((h) => (
              <li key={h.id} className="relative pb-8 pl-8 last:pb-0">
                <span className="absolute -left-[0.6rem] top-1.5 size-4 rounded-full border-[3px] border-cloud bg-brand" aria-hidden="true" />
                <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-brand-700">{h.anio}</p>
                <h3 className="mt-1 text-lg font-extrabold leading-snug">{h.titulo}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-soft sm:text-base">{h.texto}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  )
}
