import { BadgeCheck, Droplets, Filter, Wind } from 'lucide-react'
import { settings } from '../config/settings'
import { calidad } from '../data/about'
import { ProvisionalTag } from './ui/ProvisionalTag'
import { Reveal } from './ui/Reveal'

const equipIcons = { osmosis: Droplets, ozono: Wind, carbon: Filter } as const

/** Calidad, habilitaciones (ASSAL / R.N.E. / R.N.P.A.) y equipamiento de la planta. */
export function Quality() {
  const { habilitaciones } = settings
  return (
    <section id="calidad" className="bg-white py-20 sm:py-24 lg:py-32" aria-labelledby="calidad-titulo">
      <div className="container-page">
        <Reveal className="grid gap-6 lg:grid-cols-[1fr_0.8fr] lg:items-end lg:gap-16">
          <div>
            <span className="eyebrow">Calidad</span>
            <h2 id="calidad-titulo" className="section-title mt-5">
              {calidad.titulo}
            </h2>
          </div>
          <p className="text-base leading-relaxed text-ink-soft sm:text-lg">{calidad.lead}</p>
        </Reveal>

        {/* Planta + habilitaciones */}
        <div className="mt-12 grid gap-5 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <img
              src="/images/calidad-instalaciones.webp"
              alt="Instalaciones de la planta: tanque de acero inoxidable y equipos de tratamiento de agua"
              width={1200}
              height={720}
              loading="lazy"
              className="aspect-[4/3] size-full rounded-xl object-cover lg:aspect-auto"
            />
          </Reveal>

          <Reveal delay={100} className="lg:col-span-5">
            <div className="flex h-full flex-col justify-between rounded-xl bg-deep p-8 text-white sm:p-10">
              <div className="flex items-center gap-3">
                <BadgeCheck className="size-8 shrink-0 text-sky" aria-hidden="true" />
                <div>
                  <p className="text-lg font-extrabold">Planta habilitada</p>
                  <p className="text-sm text-white/80">Controles de {habilitaciones.autoridad}</p>
                </div>
              </div>

              {/* Logo institucional ASSAL, centrado y sin tarjeta */}
              <div className="mt-8 flex justify-center">
                <img
                  src="/images/logo-assal.png"
                  alt="ASSAL – Agencia Santafesina de Seguridad Alimentaria"
                  width={368}
                  height={108}
                  loading="lazy"
                  decoding="async"
                  className="h-14 w-auto sm:h-16"
                />
              </div>

              <dl className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                <div>
                  <dt className="text-xs font-extrabold uppercase tracking-[0.18em] text-sky">R.N.E.</dt>
                  <dd className="mt-2 whitespace-nowrap text-[1.6rem] font-extrabold leading-none tabular-nums sm:text-[1.75rem]">N° {habilitaciones.rne}</dd>
                  <dd className="mt-2 text-sm leading-snug text-white/75">Registro Nacional de Establecimiento</dd>
                </div>
                <div>
                  <dt className="text-xs font-extrabold uppercase tracking-[0.18em] text-sky">R.N.P.A.</dt>
                  <dd className="mt-2 whitespace-nowrap text-[1.6rem] font-extrabold leading-none tabular-nums sm:text-[1.75rem]">N° {habilitaciones.rnpa}</dd>
                  <dd className="mt-2 text-sm leading-snug text-white/75">Registro Nacional de Producto Alimenticio</dd>
                </div>
              </dl>
            </div>
          </Reveal>
        </div>

        {/* Equipamiento + fotos del envasado */}
        <div className="mt-16 grid gap-10 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-5">
            <h3 className="text-2xl font-extrabold tracking-tight">Equipamiento de la planta</h3>
            <ul className="mt-6 divide-y divide-line border-y border-line">
              {calidad.equipamiento.map((e) => {
                const Icon = equipIcons[e.id as keyof typeof equipIcons]
                return (
                  <li key={e.id} className="flex gap-5 py-5">
                    <span className="grid size-12 shrink-0 place-items-center rounded-lg bg-mist text-brand-700">
                      <Icon className="size-6" strokeWidth={1.75} aria-hidden="true" />
                    </span>
                    <div>
                      <h4 className="font-extrabold text-deep">{e.titulo}</h4>
                      <p className="mt-1 text-sm leading-relaxed text-ink-soft">{e.texto}</p>
                    </div>
                  </li>
                )
              })}
            </ul>
            <p className="mt-5 flex flex-wrap items-center gap-2 text-sm text-ink-soft">
              <ProvisionalTag />
              {calidad.pendiente}
            </p>
          </Reveal>

          <Reveal delay={100} className="lg:col-span-7">
            <div className="grid grid-cols-2 gap-4 pb-8">
              <img
                src="/images/calidad-envasado.webp"
                alt="Sector de envasado con bidones y autoelevador"
                width={900}
                height={1200}
                loading="lazy"
                className="aspect-[3/4] w-full rounded-xl object-cover"
              />
              <img
                src="/images/calidad-bidones.webp"
                alt="Bidones de agua en la planta junto al tanque de acero"
                width={900}
                height={1200}
                loading="lazy"
                className="aspect-[3/4] w-full translate-y-8 rounded-xl object-cover"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
