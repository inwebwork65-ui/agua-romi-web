interface WavesProps {
  /** Color del relleno (clase de Tailwind con `text-*`): debe coincidir con la sección siguiente. */
  className?: string
}

/**
 * Ola decorativa de borde de sección. El trazo se repite dos veces y se desplaza suavemente
 * (se detiene con "reducir movimiento"). Es sólo decorativa: aria-hidden.
 */
export function Waves({ className = 'text-white' }: WavesProps) {
  const period =
    'M0 70c120 26 240 34 360 22s240-52 360-54 240 30 360 44 240 6 360-14V120H0z'
  return (
    <div className={`pointer-events-none absolute inset-x-0 bottom-[-1px] h-14 overflow-hidden sm:h-20 ${className}`} aria-hidden="true">
      <svg className="anim-wave-slow absolute bottom-0 h-full w-[200%] opacity-40" viewBox="0 0 2880 120" preserveAspectRatio="none">
        <path fill="currentColor" d={`${period} M1440 70c120 26 240 34 360 22s240-52 360-54 240 30 360 44 240 6 360-14V120H1440z`} />
      </svg>
      <svg className="anim-wave absolute bottom-0 h-3/4 w-[200%]" viewBox="0 0 2880 120" preserveAspectRatio="none">
        <path fill="currentColor" d={`${period} M1440 70c120 26 240 34 360 22s240-52 360-54 240 30 360 44 240 6 360-14V120H1440z`} />
      </svg>
    </div>
  )
}
