import type { CSSProperties, ReactNode } from 'react'
import { useInView } from '../../hooks/useInView'

interface RevealProps {
  children: ReactNode
  className?: string
  /** Retraso en milisegundos para escalonar la aparición. */
  delay?: number
}

/** Aparición progresiva (fade + desplazamiento corto) cuando el bloque entra en pantalla. */
export function Reveal({ children, className = '', delay = 0 }: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>({ once: true, threshold: 0.1, rootMargin: '0px 0px -40px 0px' })
  return (
    <div
      ref={ref}
      className={`reveal ${inView ? 'is-visible' : ''} ${className}`}
      style={{ '--reveal-delay': `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  )
}
