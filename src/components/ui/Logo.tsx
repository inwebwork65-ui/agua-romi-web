import { Droplet } from 'lucide-react'
import { settings } from '../../config/settings'

interface LogoProps {
  variant?: 'color' | 'white'
  className?: string
}

/**
 * Logo de Agua Romi.
 * Provisional: ícono + texto. Para usar el logo oficial, cargar la ruta del archivo en
 * `settings.logo.url` (src/config/settings.ts) y este componente lo muestra automáticamente.
 */
export function Logo({ variant = 'color', className = '' }: LogoProps) {
  if (settings.logo.url) {
    const img = (
      <img
        src={settings.logo.url}
        alt={settings.logo.alt}
        width={585}
        height={190}
        className={`h-10 w-auto sm:h-12 ${className}`}
      />
    )
    // El logo es azul: sobre fondos oscuros va dentro de una tarjeta blanca.
    return variant === 'white' ? <span className="inline-block rounded-2xl bg-white px-3 py-2 shadow-sm">{img}</span> : img
  }
  const white = variant === 'white'
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span
        className={`grid size-10 place-items-center rounded-2xl shadow-sm ${white ? 'bg-white/15 text-white ring-1 ring-white/30' : 'bg-brand-700 text-white'}`}
        aria-hidden="true"
      >
        <Droplet className="size-5 fill-current" />
      </span>
      <span className="leading-none">
        <span className={`block text-xl font-extrabold tracking-tight ${white ? 'text-white' : 'text-deep'}`}>
          {settings.empresa.nombre}
        </span>
        <span
          className={`mt-1 block text-[11px] font-bold uppercase tracking-[0.2em] ${white ? 'text-sky' : 'text-brand-700'}`}
        >
          Hielo y agua
        </span>
      </span>
    </span>
  )
}
