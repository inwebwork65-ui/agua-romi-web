import { Pause, Play } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
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
    <figure className="m-0 w-[15.5rem] shrink-0 snap-center sm:w-auto">
      <div ref={ref} className="group relative aspect-[9/16] overflow-hidden rounded-[1.75rem] bg-deep ring-1 ring-white/20 shadow-lift">
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
            className={`absolute bottom-3 right-3 grid size-11 place-items-center rounded-full bg-white/90 text-deep shadow-card transition hover:bg-white ${
              playing ? 'opacity-0 focus-visible:opacity-100 group-hover:opacity-100' : 'opacity-100'
            }`}
          >
            {playing ? <Pause className="size-5" aria-hidden="true" /> : <Play className="size-5 translate-x-px" aria-hidden="true" />}
          </button>
        )}

        <figcaption className="pointer-events-none absolute inset-x-0 top-0 bg-gradient-to-b from-deep/95 via-deep/70 to-transparent px-4 pb-14 pt-4 text-white">
          <span className="block text-base font-extrabold">{video.titulo}</span>
          <span className="block text-sm text-white/85">{video.descripcion}</span>
        </figcaption>
      </div>
    </figure>
  )
}

export function AdVideos() {
  return (
    <section id="romi-en-accion" className="section-y bg-deep text-white" aria-labelledby="videos-titulo">
      <div className="container-page">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-sky">
            Romi en acción
          </span>
          <h2 id="videos-titulo" className="section-title mt-4 !text-white">
            Mirá cómo trabajamos
          </h2>
          <p className="mt-3 max-w-2xl text-base text-white/85 sm:text-lg">
            Un recorrido corto por nuestro reparto, la planta y el hielo Romi.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div className="no-scrollbar -mx-4 mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-6 sm:overflow-visible sm:px-0 lg:mx-auto lg:max-w-4xl lg:gap-8">
            {videosPublicidad.map((v) => (
              <VideoCard key={v.id} video={v} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
