import { nosotros } from '../data/about'
import { Reveal } from './ui/Reveal'
import { ProvisionalTag } from './ui/ProvisionalTag'
import { iconMap } from './ui/icons'

/** Quiénes somos: presentación institucional con fotografías reales del equipo y del local. */
export function About() {
  return (
    <section id="nosotros" className="section-y bg-white" aria-labelledby="nosotros-titulo">
      <div className="container-page grid items-center gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
        <Reveal>
          <div className="relative pb-12 pr-8 sm:pr-14">
            <img
              src="/images/nosotros-equipo.webp"
              alt="Equipo de Agua Romi con ropa de trabajo en la planta, junto a bidones apilados"
              width={1000}
              height={1333}
              loading="lazy"
              className="aspect-[4/5] w-full rounded-xl object-cover shadow-card"
            />
            <img
              src="/images/nosotros-local.webp"
              alt="Frente del local de Agua Romi con camionetas de reparto"
              width={1200}
              height={900}
              loading="lazy"
              className="absolute bottom-0 right-0 aspect-[4/3] w-3/5 rounded-xl border-[6px] border-white object-cover shadow-lift"
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

          <ul className="mt-10 grid gap-x-8 gap-y-7 border-t border-line pt-8 sm:grid-cols-3">
            {nosotros.pilares.map((p) => {
              const Icon = iconMap[p.icono]
              return (
                <li key={p.id}>
                  <Icon className="size-6 text-brand" aria-hidden="true" />
                  <h3 className="mt-3 text-base font-extrabold">{p.titulo}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{p.texto}</p>
                </li>
              )
            })}
          </ul>

          <div className="mt-8 border-l-2 border-brand/40 bg-cloud py-3 pl-5 pr-4">
            <h3 className="flex flex-wrap items-center gap-2 text-sm font-extrabold">
              {nosotros.historia.titulo}
              {nosotros.historia.provisional && <ProvisionalTag />}
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-ink-soft">{nosotros.historia.texto}</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
