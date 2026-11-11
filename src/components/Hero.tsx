import '@fontsource-variable/montserrat/wght.css'
import '@fontsource-variable/montserrat/wght-italic.css'
import { ArrowRight, BadgeCheck, MapPin } from 'lucide-react'
import { settings } from '../config/settings'
import { buildGeneralUrl } from '../lib/whatsapp'
import { Waves } from './ui/Waves'
import { WhatsAppIcon } from './ui/icons'

/** Portada: imagen institucional de Agua Romi como protagonista + propuesta comercial. */
export function Hero() {
  const { empresa, habilitaciones } = settings

  return (
    <section id="inicio" className="relative isolate overflow-hidden bg-[#06223f]" aria-labelledby="hero-titulo">
      {/* Fondo: agua en movimiento con salpicadura + capa azul marino semitransparente para legibilidad */}
      <img
        src="/images/hero-agua-splash.webp"
        alt=""
        width={1920}
        height={1080}
        decoding="async"
        className="pointer-events-none absolute inset-0 -z-20 size-full object-cover"
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[#041a33]/45" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-[#041a33]/55 via-[#041a33]/10 to-transparent" aria-hidden="true" />

      <div className="container-page grid items-center gap-10 pb-28 pt-8 sm:gap-12 sm:pt-16 lg:min-h-[calc(100svh-5.75rem)] lg:grid-cols-[1fr_1.02fr] lg:gap-10 lg:pb-32 lg:pt-16 xl:gap-16">
        <div className="hero-copy">
          <p className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.2em] text-sky">
            <MapPin className="size-4" aria-hidden="true" />
            {empresa.localidad}
          </p>

          <h1 id="hero-titulo" className="mt-5 text-white">
            <span className="block text-[2.4rem] font-extrabold uppercase leading-[1.02] tracking-[-0.01em] [font-family:'Montserrat_Variable','Manrope_Variable',sans-serif] sm:text-6xl lg:text-[3.4rem] xl:text-[4.1rem]">
              Agua, soda
              <br />e hielo.
            </span>
            <span className="mt-3 block text-[1.7rem] font-medium italic leading-[1.15] tracking-[-0.005em] text-sky [font-family:'Montserrat_Variable','Manrope_Variable',sans-serif] sm:text-4xl lg:text-[2.4rem] xl:text-[2.9rem]">
              La frescura que
              <br />llega a tu hogar.
            </span>
          </h1>

          <p className="mt-6 max-w-lg text-base leading-relaxed text-white/85 sm:text-xl">
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

          <dl className="mt-12 hidden max-w-xl grid-cols-3 sm:grid divide-x divide-white/20 border-t border-white/20 pt-6">
            {[
              ['Agua', 'bidones de 12 y 20 L'],
              ['Soda', 'retornable de 1,5 L'],
              ['Hielo', 'en bolsa'],
            ].map(([t, d]) => (
              <div key={t} className="px-4 first:pl-0 last:pr-0">
                <dt className="text-lg font-extrabold text-white">{t}</dt>
                <dd className="mt-0.5 text-[0.8rem] leading-snug text-white/70">{d}</dd>
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
          <p className="mt-8 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-white/75 lg:justify-end">
            <BadgeCheck className="size-4 text-sky" aria-hidden="true" />
            Planta habilitada · {habilitaciones.autoridadCorta}
          </p>
        </div>
      </div>

      <Waves className="text-cloud" />
    </section>
  )
}
