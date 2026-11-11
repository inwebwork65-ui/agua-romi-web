import { ArrowUpRight, MessageCircle } from 'lucide-react'
import { categorias } from '../data/categories'
import { productos } from '../data/products'
import { buildGeneralUrl } from '../lib/whatsapp'
import { Reveal } from './ui/Reveal'

interface CategoriesProps {
  onSelect: (categoryId: string) => void
}

/** Categorías visuales: atajos con fotografía que filtran el catálogo. */
export function Categories({ onSelect }: CategoriesProps) {
  const handleSelect = (id: string) => {
    onSelect(id)
    // Esperamos al re-render del catálogo para desplazar la vista.
    window.requestAnimationFrame(() => document.getElementById('productos')?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
  }

  return (
    <section id="categorias" className="bg-cloud pb-24 sm:pb-28 lg:pb-32" aria-labelledby="categorias-titulo">
      <div className="container-page border-t border-line pt-16 lg:pt-20">
        <Reveal className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="eyebrow">Categorías</span>
            <h2 id="categorias-titulo" className="section-title mt-5">
              Encontrá lo que necesitás
            </h2>
          </div>
          <p className="max-w-sm text-ink-soft">Elegí una categoría para ver las presentaciones disponibles.</p>
        </Reveal>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categorias.map((cat, i) => {
            const count = productos.filter((p) => p.categoriaId === cat.id).length
            return (
              <li key={cat.id}>
                <Reveal delay={i * 80} className="h-full">
                  <button
                    type="button"
                    onClick={() => handleSelect(cat.id)}
                    aria-label={`Ver productos de ${cat.nombre}`}
                    className="group relative block aspect-[4/5] w-full overflow-hidden rounded-xl bg-deep text-left sm:aspect-[3/4]"
                  >
                    <img
                      src={cat.imagen}
                      alt={cat.imagenAlt}
                      width={720}
                      height={900}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 size-full object-cover transition duration-700 group-hover:scale-[1.04]"
                    />
                    <span className="absolute inset-0 bg-gradient-to-t from-deep/85 via-deep/10 to-transparent" aria-hidden="true" />
                    <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5 text-white">
                      <span>
                        <span className="block text-xl font-extrabold leading-tight">{cat.nombre}</span>
                        {count > 0 && (
                          <span className="mt-1 block text-sm font-semibold text-white/80">
                            {count} {count === 1 ? 'producto' : 'productos'}
                          </span>
                        )}
                      </span>
                      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-white text-deep transition group-hover:bg-sky">
                        <ArrowUpRight className="size-5" aria-hidden="true" />
                      </span>
                    </span>
                  </button>
                </Reveal>
              </li>
            )
          })}

          {/* Consulta por otros productos */}
          <li>
            <Reveal delay={categorias.length * 80} className="h-full">
              <div className="flex aspect-[4/5] flex-col justify-between rounded-xl bg-deep p-6 text-white sm:aspect-[3/4]">
                <MessageCircle className="size-8 text-sky" aria-hidden="true" />
                <div>
                  <h3 className="text-xl font-extrabold !text-white">¿Buscás otro producto?</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/80">Escribinos y te contamos qué más tenemos disponible.</p>
                  <a
                    href={buildGeneralUrl('Hola Agua Romi! Quisiera consultar por otros productos.')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-light mt-5"
                  >
                    Consultar por WhatsApp
                  </a>
                </div>
              </div>
            </Reveal>
          </li>
        </ul>
      </div>
    </section>
  )
}
