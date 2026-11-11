import { Instagram, Pause, Play } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { settings } from '../config/settings'
import { videosPublicidad } from '../data/videos'
import { useInView } from '../hooks/useInView'
import { useReducedMotion } from '../hooks/useReducedMotion'
import type { AdVideo } from '../types'
import { Reveal } from './ui/Reveal'

/**
 * Tarjeta de video vertical. Se reproduce sola (en silencio y en bucle) sólo mientras está en pantalla;
 * con movimiento reducido queda detenida con su imagen de portada hasta que la persona la reproduzca.
 */
function VideoCard({ video }: { video: AdVideo }) {
  const reduced = useReducedMotion()
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.55 })
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  const [manualPause, setManualPause] = useState(false)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const el = videoRef.current
    if (!el) return
    const shouldPlay = inView && !manualPause && (!reduced || playing)
    if (shouldPlay && el.paused) {
      el.play().catch(() => setPlaying(false))
    } else if (!inView && !el.paused) {
      el.pause()
    }
  }, [inView, manualPause, reduced, playing])

  const toggle = () => {
    const el = videoRef.current
    if (!el) return
    if (el.paused) {
      setManualPause(false)
      el.play().catch(() => setFailed(true))
    } else {
      setManualPause(true)
      el.pause()
    }
  }

  return (
    <figure className="m-0 w-[14.5rem] shrink-0 snap-center sm:w-auto">
      <div ref={ref} className="group relative aspect-[9/16] overflow-hidden rounded-xl bg-black/40 shadow-[0_30px_50px_-28px_rgb(0_0_0/0.7)] ring-1 ring-white/15">
        {failed ? (
          <img src={video.poster} alt={video.titulo} className="size-full object-cover" loading="lazy" />
        ) : (
          <video
            ref={videoRef}
            src={video.src}
            poster={video.poster}
            muted
            loop
            playsInline
            preload="metadata"
            aria-label={`${video.titulo}: ${video.descripcion}`}
            className="size-full object-cover"
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onError={() => setFailed(true)}
          />
        )}

        {!failed && (
          <button
            type="button"
            onClick={toggle}
            aria-label={`${playing ? 'Pausar' : 'Reproducir'} video: ${video.titulo}`}
            className={`absolute bottom-3 right-3 grid size-11 place-items-center rounded-full bg-white/90 text-deep shadow-card backdrop-blur transition hover:bg-white ${
              playing ? 'opacity-0 focus-visible:opacity-100 group-hover:opacity-100' : 'opacity-100'
            }`}
          >
            {playing ? <Pause className="size-5" aria-hidden="true" /> : <Play className="size-5 translate-x-px" aria-hidden="true" />}
          </button>
        )}

      </div>
      <figcaption className="mt-4">
        <span className="block text-base font-extrabold text-white">{video.titulo}</span>
        <span className="block text-sm text-white/75">{video.descripcion}</span>
      </figcaption>
    </figure>
  )
}

export function AdVideos() {
  return (
    <section id="romi-en-accion" className="relative overflow-hidden bg-deep py-20 text-white sm:py-24 lg:py-32" aria-labelledby="videos-titulo">
      <div className="container-page grid items-center gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <Reveal>
          <span className="eyebrow-light">Romi en acción</span>
          <h2 id="videos-titulo" className="section-title mt-5 !text-white">
            Mirá cómo trabajamos
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-white/80 sm:text-lg">
            Un recorrido corto por nuestro reparto, la planta y el hielo Romi: así llega la frescura a cada hogar.
          </p>
          <a
            href={settings.redes.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-light mt-8 px-6 py-3"
          >
            <Instagram className="size-5" aria-hidden="true" />
            Seguinos en {settings.redes.instagram.usuario}
            <span className="sr-only">(se abre en una pestaña nueva)</span>
          </a>
        </Reveal>

        <Reveal delay={100}>
          <div className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 sm:mx-0 sm:grid sm:grid-cols-3 sm:items-start sm:gap-5 sm:overflow-visible sm:px-0 lg:gap-7 sm:[&>*:nth-child(1)]:mt-14 sm:[&>*:nth-child(3)]:mt-24">
            {videosPublicidad.map((v) => (
              <VideoCard key={v.id} video={v} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
