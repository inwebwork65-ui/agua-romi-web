import { servicios } from '../data/services'
import { buildGeneralUrl } from '../lib/whatsapp'
import { ProvisionalTag } from './ui/ProvisionalTag'
import { Reveal } from './ui/Reveal'
import { WhatsAppIcon, iconMap } from './ui/icons'

/** Servicios de distribución y cómo trabajamos. */
export function Services() {
  return (
    <section id="servicios" className="section-y bg-white" aria-labelledby="servicios-titulo">
      <div className="container-page">
        <Reveal>
          <span className="eyebrow">Servicios</span>
          <h2 id="servicios-titulo" className="section-title mt-4">
            Cómo trabajamos
          </h2>
          <p className="section-lead">Distribución de agua, soda e hielo para hogares, comercios y empresas.</p>
        </Reveal>

        <div className="mt-10 grid gap-8 lg:grid-cols-[0.8fr_1.4fr] lg:gap-12">
          <Reveal>
            <div className="relative h-full min-h-[22rem] overflow-hidden rounded-3xl shadow-lift lg:sticky lg:top-24 lg:h-[34rem]">
              <img
                src="/images/servicios-reparto.webp"
                alt="Camión de reparto celeste de Agua Romi cargado con bidones"
                width={900}
                height={1200}
                loading="lazy"
                className="absolute inset-0 size-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-deep/90 via-deep/60 to-transparent p-6 pt-20 text-white">
                <p className="text-lg font-extrabold">¿Querés que te llevemos tu pedido?</p>
                <p className="mt-1 text-sm text-white/90">Escribinos y coordinamos la entrega.</p>
                <a href={buildGeneralUrl('Hola Agua Romi! Quisiera coordinar una entrega.')} target="_blank" rel="noopener noreferrer" className="btn-whatsapp mt-4">
                  <WhatsAppIcon className="size-5" />
                  Coordinar por WhatsApp
                </a>
              </div>
            </div>
          </Reveal>

          <ul className="grid gap-4 sm:grid-cols-2">
            {servicios.map((s, i) => {
              const Icon = iconMap[s.icono]
              return (
                <li key={s.id}>
                  <Reveal delay={(i % 2) * 80} className="h-full">
                    <article className="card card-hover h-full p-5">
                      <span className="grid size-12 place-items-center rounded-2xl bg-mist text-brand-700">
                        <Icon className="size-6" aria-hidden="true" />
                      </span>
                      <h3 className="mt-4 flex flex-wrap items-center gap-2 text-lg font-extrabold">
                        {s.titulo}
                        {s.provisional && <ProvisionalTag />}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{s.descripcion}</p>
                    </article>
                  </Reveal>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
