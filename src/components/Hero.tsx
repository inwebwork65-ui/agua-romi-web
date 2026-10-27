import { ChevronLeft, ChevronRight, MapPin, Pause, Play, ShieldCheck, Snowflake } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { settings } from '../config/settings'
import { heroSlides } from '../data/hero'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { buildGeneralUrl } from '../lib/whatsapp'
import { WhatsAppIcon } from './ui/icons'

const INTERVAL_MS = 6000

export function Hero() {
  const reduced = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [userPaused, setUserPaused] = useState(false)
  const [hovered, setHovered] = useState(false)
  const total = heroSlides.length

  const go = useCallback((next: number) => setIndex((next + total) % total), [total])
  const autoplay = !reduced && !userPaused && !hovered && total > 1

  useEffect(() => {
    if (!autoplay) return
    const id = window.setInterval(() => setIndex((i) => (i + 1) % total), INTERVAL_MS)
    return () => window.clearInterval(id)
  }, [autoplay, total, index])

  return (
    <section
      id="inicio"
      className="relative isolate flex min-h-[34rem] items-center overflow-hidden bg-deep text-white h-[calc(100svh-4.5rem)] max-h-[52rem]"
      role="group"
      aria-roledescription="carrusel"
      aria-label="Fotos de Agua Romi"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      {/* Imágenes dinámicas a todo el ancho y alto de la sección */}
      {heroSlides.map((slide, i) => (
        <figure
          key={slide.id}
          className={`absolute inset-0 -z-10 m-0 transition-opacity duration-1000 ease-in-out ${i === index ? "opacity-100" : "pointer-events-none opacity-0"}`}
          aria-hidden={i !== index}
          aria-roledescription="diapositiva"
          aria-label={`${i + 1} de ${total}`}
        >
          <img
            src={slide.imagen}
            alt={slide.alt}
            width={1400}
            height={1050}
            loading={i === 0 ? "eager" : "lazy"}
            fetchPriority={i === 0 ? "high" : "auto"}
            decoding="async"
            className="size-full object-cover"
            style={{ objectPosition: slide.posicion ?? "center" }}
          />
        </figure>
      ))}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-deep/85 via-deep/45 to-transparent" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-deep/70 to-transparent" aria-hidden="true" />

      <div className="container-page relative py-12">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-widest text-white ring-1 ring-white/30 backdrop-blur">
            <MapPin className="size-3.5" aria-hidden="true" />
            Villa Cañas, Santa Fe
          </span>
          <h1 className="mt-5 text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
            Agua y frescura <span className="text-sky">para todos los días</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/90">
            Conocé nuestros productos y encontrá la opción ideal para tu hogar, comercio o empresa.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#productos" className="btn-primary px-7 py-3 text-base">
              Ver productos
            </a>
            <a href={buildGeneralUrl()} target="_blank" rel="noopener noreferrer" className="btn-whatsapp px-7 py-3 text-base">
              <WhatsAppIcon className="size-5" />
              Hacer un pedido
            </a>
          </div>

          <ul className="mt-9 grid gap-3 text-sm font-bold text-white sm:grid-cols-3">
            <li className="flex items-center gap-2.5">
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-white/15 ring-1 ring-white/30 backdrop-blur">
                <Snowflake className="size-[18px]" aria-hidden="true" />
              </span>
              Agua, soda e hielo
            </li>
            <li className="flex items-center gap-2.5">
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-white/15 ring-1 ring-white/30 backdrop-blur">
                <ShieldCheck className="size-[18px]" aria-hidden="true" />
              </span>
              Controles {settings.habilitaciones.autoridadCorta}
            </li>
            <li className="flex items-center gap-2.5">
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-white/15 ring-1 ring-white/30 backdrop-blur">
                <WhatsAppIcon className="size-[18px]" />
              </span>
              Pedidos por WhatsApp
            </li>
          </ul>
        </div>
      </div>

      {total > 1 && (
        <div className="absolute inset-x-0 bottom-4 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => go(index - 1)}
            aria-label="Foto anterior"
            className="grid size-10 place-items-center rounded-full bg-white/90 text-deep shadow-card transition hover:bg-white"
          >
            <ChevronLeft className="size-5" aria-hidden="true" />
          </button>
          <div className="flex items-center gap-2">
            {heroSlides.map((slide, i) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => go(i)}
                aria-label={`Ver foto ${i + 1}: ${slide.etiqueta}`}
                aria-current={i === index}
                className="grid size-6 place-items-center"
              >
                <span className={`block h-2.5 rounded-full transition-all duration-300 ${i === index ? "w-8 bg-white" : "w-2.5 bg-white/50 hover:bg-white/80"}`} />
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => go(index + 1)}
            aria-label="Foto siguiente"
            className="grid size-10 place-items-center rounded-full bg-white/90 text-deep shadow-card transition hover:bg-white"
          >
            <ChevronRight className="size-5" aria-hidden="true" />
          </button>
          {!reduced && (
            <button
              type="button"
              onClick={() => setUserPaused((v) => !v)}
              aria-label={userPaused ? "Reanudar cambio automático de fotos" : "Pausar cambio automático de fotos"}
              className="grid size-9 place-items-center rounded-full bg-white/20 text-white transition hover:bg-white/30"
            >
              {userPaused ? <Play className="size-4" aria-hidden="true" /> : <Pause className="size-4" aria-hidden="true" />}
            </button>
          )}
        </div>
      )}
    </section>
  )
}
