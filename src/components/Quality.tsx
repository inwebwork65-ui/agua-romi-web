import { BadgeCheck, Droplets, Filter, ShieldCheck, Wind } from 'lucide-react'
import { settings } from '../config/settings'
import { calidad } from '../data/about'
import { ProvisionalTag } from './ui/ProvisionalTag'
import { Reveal } from './ui/Reveal'

const equipIcons = { osmosis: Droplets, ozono: Wind, carbon: Filter } as const

/** Calidad, habilitaciones (ASSAL / R.N.E. / R.N.P.A.) y equipamiento de la planta. */
export function Quality() {
  const { habilitaciones } = settings
  return (
    <section id="calidad" className="section-y bg-cloud" aria-labelledby="calidad-titulo">
      <div className="container-page">
        <Reveal>
          <span className="eyebrow">
            <ShieldCheck className="size-3.5" aria-hidden="true" />
            Calidad
          </span>
          <h2 id="calidad-titulo" className="section-title mt-4">
            {calidad.titulo}
          </h2>
          <p className="section-lead">{calidad.lead}</p>
        </Reveal>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
          <div className="space-y-6">
            {/* Habilitaciones */}
            <Reveal>
              <div className="card overflow-hidden">
                <div className="flex items-center gap-3 bg-deep px-5 py-4 text-white sm:px-6">
                  <BadgeCheck className="size-6 shrink-0 text-sky" aria-hidden="true" />
                  <div>
                    <p className="font-extrabold">Planta habilitada</p>
                    <p className="text-sm text-white/85">Controles de {habilitaciones.autoridad}</p>
                  </div>
                </div>
                <dl className="grid gap-px bg-sky/20 sm:grid-cols-2">
                  <div className="bg-white p-5 sm:p-6">
                    <dt className="text-xs font-bold uppercase tracking-wider text-brand-700">R.N.E.</dt>
                    <dd className="mt-1 text-2xl font-extrabold tabular-nums text-deep">N° {habilitaciones.rne}</dd>
                    <dd className="mt-1 text-sm text-ink-soft">Registro Nacional de Establecimiento</dd>
                  </div>
                  <div className="bg-white p-5 sm:p-6">
                    <dt className="text-xs font-bold uppercase tracking-wider text-brand-700">R.N.P.A.</dt>
                    <dd className="mt-1 text-2xl font-extrabold tabular-nums text-deep">N° {habilitaciones.rnpa}</dd>
                    <dd className="mt-1 text-sm text-ink-soft">Registro Nacional de Producto Alimenticio</dd>
                  </div>
                </dl>
              </div>
            </Reveal>

            {/* Equipamiento */}
            <Reveal delay={80}>
              <h3 className="text-lg font-extrabold">Equipamiento de la planta</h3>
              <ul className="mt-3 grid gap-3 sm:grid-cols-3">
                {calidad.equipamiento.map((e) => {
                  const Icon = equipIcons[e.id as keyof typeof equipIcons]
                  return (
                    <li key={e.id} className="card p-4">
                      <span className="grid size-10 place-items-center rounded-xl bg-mist text-brand-700">
                        <Icon className="size-5" aria-hidden="true" />
                      </span>
                      <h4 className="mt-3 font-extrabold text-deep">{e.titulo}</h4>
                      <p className="mt-1 text-sm leading-relaxed text-ink-soft">{e.texto}</p>
                    </li>
                  )
                })}
              </ul>
              <p className="mt-4 flex flex-wrap items-center gap-2 text-sm text-ink-soft">
                <ProvisionalTag />
                {calidad.pendiente}
              </p>
            </Reveal>
          </div>

          <Reveal delay={120}>
            <div className="grid grid-cols-2 gap-3">
              <img
                src="/images/calidad-instalaciones.webp"
                alt="Instalaciones de la planta: tanque de acero inoxidable y equipos de tratamiento de agua"
                width={1200}
                height={720}
                loading="lazy"
                className="col-span-2 aspect-[5/3] w-full rounded-3xl object-cover shadow-card"
              />
              <img
                src="/images/calidad-envasado.webp"
                alt="Sector de envasado con bidones y autoelevador"
                width={900}
                height={1200}
                loading="lazy"
                className="aspect-[3/4] w-full rounded-3xl object-cover shadow-card"
              />
              <img
                src="/images/calidad-bidones.webp"
                alt="Bidones de agua en la planta junto al tanque de acero"
                width={900}
                height={1200}
                loading="lazy"
                className="aspect-[3/4] w-full rounded-3xl object-cover shadow-card"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
