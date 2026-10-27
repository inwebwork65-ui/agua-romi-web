import { nosotros } from '../data/about'
import { Reveal } from './ui/Reveal'
import { ProvisionalTag } from './ui/ProvisionalTag'
import { iconMap } from './ui/icons'

/** Quiénes somos. */
export function About() {
  return (
    <section id="nosotros" className="section-y bg-white" aria-labelledby="nosotros-titulo">
      <div className="container-page grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <div className="grid h-[24rem] grid-cols-5 grid-rows-2 gap-3 sm:h-[32rem]">
            <img
              src="/images/nosotros-equipo.webp"
              alt="Equipo de Agua Romi con ropa de trabajo en la planta, junto a bidones apilados"
              width={1000}
              height={1333}
              loading="lazy"
              className="col-span-3 row-span-2 size-full rounded-3xl object-cover shadow-card"
            />
            <img
              src="/images/nosotros-local.webp"
              alt="Frente del local de Agua Romi con camionetas de reparto"
              width={1200}
              height={900}
              loading="lazy"
              className="col-span-2 size-full rounded-3xl object-cover shadow-card"
            />
            <img
              src="/images/nosotros-planta.webp"
              alt="Integrante del equipo en la planta sosteniendo bidones de agua"
              width={1000}
              height={750}
              loading="lazy"
              className="col-span-2 size-full rounded-3xl object-cover object-[35%_center] shadow-card"
            />
          </div>
        </Reveal>

        <Reveal delay={120}>
          <span className="eyebrow">Quiénes somos</span>
          <h2 id="nosotros-titulo" className="section-title mt-4">
            {nosotros.titulo}
          </h2>
          <div className="mt-4 space-y-3 text-base leading-relaxed text-ink-soft sm:text-lg">
            {nosotros.parrafos.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-dashed border-sky/60 bg-mist/60 p-4">
            <h3 className="flex flex-wrap items-center gap-2 text-base font-extrabold">
              {nosotros.historia.titulo}
              {nosotros.historia.provisional && <ProvisionalTag />}
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{nosotros.historia.texto}</p>
          </div>

          <ul className="mt-6 grid gap-3 sm:grid-cols-3">
            {nosotros.pilares.map((p) => {
              const Icon = iconMap[p.icono]
              return (
                <li key={p.id} className="card p-4">
                  <span className="grid size-10 place-items-center rounded-xl bg-mist text-brand-700">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-3 text-base font-extrabold">{p.titulo}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-soft">{p.texto}</p>
                </li>
              )
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
