import { ArrowRight, BadgeCheck, MapPin } from 'lucide-react'
import { settings } from '../config/settings'
import { buildGeneralUrl } from '../lib/whatsapp'
import { Waves } from './ui/Waves'
import { WhatsAppIcon } from './ui/icons'

/** Portada: imagen institucional de Agua Romi como protagonista + propuesta comercial. */
export function Hero() {
  const { empresa, habilitaciones } = settings

  return (
    <section id="inicio" className="relative isolate overflow-hidden bg-mist" aria-labelledby="hero-titulo">
      {/* Fondo: círculo suave de color, una sola forma */}
      <div className="pointer-events-none absolute -right-40 -top-40 -z-10 size-[44rem] rounded-full bg-white/70" aria-hidden="true" />

      <div className="container-page grid items-center gap-10 pb-28 pt-8 sm:gap-12 sm:pt-16 lg:min-h-[calc(100svh-7.25rem)] lg:grid-cols-[1fr_1.02fr] lg:gap-10 lg:pb-32 lg:pt-16 xl:gap-16">
        <div className="hero-copy">
          <p className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.2em] text-brand-700">
            <MapPin className="size-4" aria-hidden="true" />
            {empresa.localidad}
          </p>

          <h1
            id="hero-titulo"
            className="mt-5 text-[2.3rem] font-extrabold leading-[1.06] tracking-[-0.03em] sm:text-6xl lg:text-[3.3rem] xl:text-[4rem]"
          >
            Agua, soda e hielo.
            <span className="mt-1 block text-brand">La frescura que llega a tu hogar.</span>
          </h1>

          <p className="mt-5 max-w-lg text-base leading-relaxed text-ink-soft sm:mt-6 sm:text-xl">
            Productos de calidad y atención cercana para hogares, comercios y empresas.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:mt-9 sm:flex-row">
            <a href="#productos" className="btn-primary group px-8 py-3.5 text-base">
              Ver productos
              <ArrowRight className="size-[1.1rem] transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </a>
            <a href={buildGeneralUrl()} target="_blank" rel="noopener noreferrer" className="btn-whatsapp px-8 py-3.5 text-base">
              <WhatsAppIcon className="size-5" />
              Hacer un pedido
            </a>
          </div>

          <dl className="mt-12 hidden max-w-xl grid-cols-3 sm:grid divide-x divide-deep/15 border-t border-deep/15 pt-6">
            {[
              ['Agua', 'bidones de 12 y 20 L'],
              ['Soda', 'retornable de 1,5 L'],
              ['Hielo', 'en bolsa'],
            ].map(([t, d]) => (
              <div key={t} className="px-4 first:pl-0 last:pr-0">
                <dt className="text-lg font-extrabold text-deep">{t}</dt>
                <dd className="mt-0.5 text-[0.8rem] leading-snug text-ink-soft">{d}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Imagen protagonista: flota suavemente (se detiene con "reducir movimiento") */}
        <div className="relative mx-auto w-full max-w-[40rem] lg:max-w-none">
          <div className="anim-float-slow relative">
            <div className="absolute -bottom-5 -left-5 hidden size-3/4 rounded-xl bg-brand/15 sm:block" aria-hidden="true" />
            <figure className="relative m-0 overflow-hidden rounded-xl bg-white shadow-[0_30px_60px_-30px_rgb(16_59_101/0.55)] ring-1 ring-deep/10">
              <img
                src="/images/hero-romi.webp"
                alt="Hielo y Agua Romi: una niña sostiene un vaso de agua junto al dispenser, bidones, sifón de soda y bolsa de hielo"
                width={1080}
                height={978}
                fetchPriority="high"
                decoding="async"
                className="block h-auto w-full"
              />
            </figure>
          </div>

          {/* Habilitación: detalle tipográfico, sin tarjeta y fuera de la fotografía */}
          <p className="mt-8 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-deep/70 lg:justify-end">
            <BadgeCheck className="size-4 text-brand" aria-hidden="true" />
            Planta habilitada · {habilitaciones.autoridadCorta}
          </p>
        </div>
      </div>

      <Waves className="text-cloud" />
    </section>
  )
}
