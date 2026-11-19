import { Check } from 'lucide-react'
import { servicios } from '../data/services'
import { buildGeneralUrl } from '../lib/whatsapp'
import { Reveal } from './ui/Reveal'
import { WhatsAppIcon, iconMap } from './ui/icons'

const beneficios = ['Llevamos agua, soda e hielo directo a tu puerta', 'Para hogares, comercios y empresas', 'Coordinás la entrega por WhatsApp']

/** Servicio de entrega y cómo trabajamos. */
export function Services() {
  return (
    <section id="servicios" className="bg-cloud py-20 sm:py-24 lg:py-32" aria-labelledby="servicios-titulo">
      <div className="container-page">
        {/* Entrega: imagen protagonista + panel superpuesto */}
        <Reveal>
          <div className="relative">
            <img
              src="/images/hero-reparto.webp"
              alt="Camión de reparto celeste de Agua Romi cargado con bidones frente al local"
              width={1400}
              height={1050}
              loading="lazy"
              className="aspect-[4/3] w-full rounded-xl object-cover shadow-card sm:aspect-[16/9] lg:aspect-[21/10] lg:w-[72%]"
            />
            <div className="relative z-10 -mt-14 mr-4 rounded-xl bg-deep p-7 text-white shadow-lift sm:mr-10 sm:p-9 lg:absolute lg:inset-y-10 lg:right-0 lg:mr-0 lg:mt-0 lg:flex lg:w-[42%] lg:flex-col lg:justify-center lg:p-11">
              <span className="eyebrow-light">Servicio de entrega</span>
              <h2 id="servicios-titulo" className="mt-4 text-[1.75rem] font-extrabold leading-[1.12] tracking-[-0.02em] !text-white sm:text-3xl lg:text-[2.1rem]">
                Llevamos Romi hasta tu casa o tu comercio
              </h2>
              <ul className="mt-6 space-y-3">
                {beneficios.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-[0.95rem] text-white/90">
                    <Check className="mt-0.5 size-[1.15rem] shrink-0 text-sky" aria-hidden="true" />
                    {b}
                  </li>
                ))}
              </ul>
              <a
                href={buildGeneralUrl('Hola Agua Romi! Quisiera coordinar una entrega.')}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp mt-8 self-start px-7 py-3.5"
              >
                <WhatsAppIcon className="size-5" />
                Coordinar entrega por WhatsApp
              </a>
            </div>
          </div>
        </Reveal>

        {/* Cómo trabajamos */}
        <Reveal className="mt-20 max-w-2xl lg:mt-28">
          <span className="eyebrow">Cómo trabajamos</span>
          <h3 className="section-title mt-5 !text-[1.9rem] sm:!text-4xl">Un servicio pensado para cada cliente</h3>
        </Reveal>

        <ul className="mt-10 grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">
          {servicios.map((s, i) => {
            const Icon = iconMap[s.icono]
            return (
              <li key={s.id}>
                <Reveal delay={(i % 4) * 70} className="h-full">
                  <div className="h-full border-t-2 border-deep/15 pt-6 transition-colors hover:border-brand">
                    <Icon className="size-7 text-brand" strokeWidth={1.75} aria-hidden="true" />
                    <h4 className="mt-4 flex flex-wrap items-center gap-2 text-lg font-extrabold text-deep">
                      {s.titulo}
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">{s.descripcion}</p>
                  </div>
                </Reveal>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
