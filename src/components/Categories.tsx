import { ArrowRight, MessageCircle } from 'lucide-react'
import { categorias } from '../data/categories'
import { productos } from '../data/products'
import { buildGeneralUrl } from '../lib/whatsapp'
import { Reveal } from './ui/Reveal'

interface CategoriesProps {
  onSelect: (categoryId: string) => void
}

export function Categories({ onSelect }: CategoriesProps) {
  const handleSelect = (id: string) => {
    onSelect(id)
    // Esperamos al re-render del catálogo para desplazar la vista.
    window.requestAnimationFrame(() => document.getElementById('productos')?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
  }

  return (
    <section id="categorias" className="section-y bg-white" aria-labelledby="categorias-titulo">
      <div className="container-page">
        <Reveal>
          <span className="eyebrow">Categorías</span>
          <h2 id="categorias-titulo" className="section-title mt-4">
            Encontrá lo que necesitás
          </h2>
          <p className="section-lead">Elegí una categoría para ver las presentaciones disponibles.</p>
        </Reveal>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categorias.map((cat, i) => {
            const count = productos.filter((p) => p.categoriaId === cat.id).length
            return (
              <li key={cat.id}>
                <Reveal delay={i * 80} className="h-full">
                  <article className="card card-hover group flex h-full flex-col overflow-hidden">
                    <div className="aspect-[4/3] overflow-hidden bg-mist">
                      <img
                        src={cat.imagen}
                        alt={cat.imagenAlt}
                        width={720}
                        height={540}
                        loading="lazy"
                        decoding="async"
                        className="size-full object-cover object-[center_40%] transition duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="text-lg font-extrabold">{cat.nombre}</h3>
                      <p className="mt-1.5 flex-1 text-sm leading-relaxed text-ink-soft">{cat.descripcion}</p>
                      <button
                        type="button"
                        onClick={() => handleSelect(cat.id)}
                        aria-label={`Ver productos de ${cat.nombre}`}
                        className="mt-4 inline-flex items-center gap-1.5 self-start rounded-full text-sm font-extrabold text-brand-700 transition hover:gap-2.5 hover:text-deep"
                      >
                        Ver productos{count > 0 && <span className="font-semibold text-ink-soft">({count})</span>}
                        <ArrowRight className="size-4" aria-hidden="true" />
                      </button>
                    </div>
                  </article>
                </Reveal>
              </li>
            )
          })}

          {/* Tarjeta de consulta para otros productos */}
          <li>
            <Reveal delay={categorias.length * 80} className="h-full">
              <article className="card card-hover flex h-full flex-col justify-between border-dashed bg-mist/60 p-6">
                <div>
                  <span className="grid size-12 place-items-center rounded-2xl bg-white text-brand-700 shadow-card">
                    <MessageCircle className="size-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-lg font-extrabold">¿Buscás otro producto?</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                    Escribinos y te contamos qué más tenemos disponible.
                  </p>
                </div>
                <a
                  href={buildGeneralUrl('Hola Agua Romi! Quisiera consultar por otros productos.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline mt-5 self-start"
                >
                  Consultar por WhatsApp
                </a>
              </article>
            </Reveal>
          </li>
        </ul>
      </div>
    </section>
  )
}
