import { useEffect, useRef, useState } from 'react'

/** Indica si el elemento está visible en pantalla. `once` = se queda en true tras la primera vez. */
export function useInView<T extends HTMLElement>(options: { once?: boolean; threshold?: number; rootMargin?: string } = {}) {
  const { once = false, threshold = 0.15, rootMargin = '0px' } = options
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (once) observer.disconnect()
        } else if (!once) {
          setInView(false)
        }
      },
      { threshold, rootMargin },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [once, threshold, rootMargin])

  return { ref, inView }
}
