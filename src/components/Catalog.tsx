import { Info, Search, SearchX, X } from 'lucide-react'
import { useId, useMemo, useState } from 'react'
import { settings } from '../config/settings'
import { categorias } from '../data/categories'
import { productos } from '../data/products'
import type { Product } from '../types'
import { ProductCard } from './ProductCard'
import { ProductDetail } from './ProductDetail'
import { Reveal } from './ui/Reveal'

export const ALL = 'todos'

type SortKey = 'relevancia' | 'precio-asc' | 'precio-desc' | 'nombre'
type FlagKey = 'todos' | 'destacado' | 'oferta' | 'novedad'

const normalize = (s: string) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim()

interface CatalogProps {
  category: string
  onCategoryChange: (id: string) => void
}

export function Catalog({ category, onCategoryChange }: CatalogProps) {
  const uid = useId()
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState<SortKey>('relevancia')
  const [flag, setFlag] = useState<FlagKey>('todos')
  const [detail, setDetail] = useState<Product | null>(null)

  const hasPrices = productos.some((p) => p.precio != null)
  const availableFlags = useMemo(() => {
    const flags: { key: FlagKey; label: string }[] = []
    if (productos.some((p) => p.destacado)) flags.push({ key: 'destacado', label: 'Destacados' })
    if (productos.some((p) => p.oferta)) flags.push({ key: 'oferta', label: 'Ofertas' })
    if (productos.some((p) => p.novedad)) flags.push({ key: 'novedad', label: 'Novedades' })
    return flags
  }, [])

  const visible = useMemo(() => {
    const q = normalize(query)
    let list = productos.filter((p) => {
      if (category !== ALL && p.categoriaId !== category) return false
      if (flag !== 'todos' && !p[flag]) return false
      if (!q) return true
      const cat = categorias.find((c) => c.id === p.categoriaId)?.nombre ?? ''
      return normalize(`${p.nombre} ${p.marca} ${p.presentacion} ${p.descripcion} ${cat}`).includes(q)
    })
    if (sort === 'nombre') {
      list = [...list].sort((a, b) => a.nombre.localeCompare(b.nombre, 'es') || a.presentacion.localeCompare(b.presentacion, 'es', { numeric: true }))
    } else if (sort === 'precio-asc' || sort === 'precio-desc') {
      const dir = sort === 'precio-asc' ? 1 : -1
      list = [...list].sort((a, b) => {
        if (a.precio == null && b.precio == null) return 0
        if (a.precio == null) return 1 // sin precio siempre al final
        if (b.precio == null) return -1
        return (a.precio - b.precio) * dir
      })
    }
    return list
  }, [category, query, sort, flag])

  const filtersActive = category !== ALL || query.trim() !== '' || flag !== 'todos' || sort !== 'relevancia'
  const resetFilters = () => {
    onCategoryChange(ALL)
    setQuery('')
    setFlag('todos')
    setSort('relevancia')
  }

  const chip = (active: boolean) =>
    `shrink-0 rounded-full border px-4 py-2 text-sm font-bold transition ${
      active ? 'border-brand-700 bg-brand-700 text-white' : 'border-slate-300 bg-white text-deep hover:border-brand hover:bg-mist'
    }`

  return (
    <section id="productos" className="section-y bg-cloud" aria-labelledby="catalogo-titulo">
      <div className="container-page">
        <Reveal>
          <span className="eyebrow">Catálogo</span>
          <h2 id="catalogo-titulo" className="section-title mt-4">
            Nuestros productos
          </h2>
          <p className="section-lead">Agregá lo que necesitás a tu pedido y envialo por WhatsApp.</p>
        </Reveal>

        {settings.catalogo.avisoDemo && (
          <p className="mt-6 flex items-start gap-2.5 rounded-2xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-950">
            <Info className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
            <span>
              Catálogo de demostración: los precios y la disponibilidad se confirman por WhatsApp al enviar tu pedido.
            </span>
          </p>
        )}

        {/* Barra de filtros */}
        <div className="card mt-6 space-y-4 p-4 sm:p-5">
          <div className="grid gap-4 md:grid-cols-[1fr_16rem]">
            <div>
              <label htmlFor={`${uid}-buscar`} className="label">
                Buscar productos
              </label>
              <div className="relative">
                <Search className="pointer-events-none absolute left-3.5 top-1/2 size-5 -translate-y-1/2 text-slate-500" aria-hidden="true" />
                <input
                  id={`${uid}-buscar`}
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Ej.: bidón, soda, hielo"
                  autoComplete="off"
                  className="field pl-11 pr-10"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery('')}
                    aria-label="Borrar búsqueda"
                    className="absolute right-2 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-full text-slate-600 hover:bg-mist"
                  >
                    <X className="size-4" aria-hidden="true" />
                  </button>
                )}
              </div>
            </div>
            <div>
              <label htmlFor={`${uid}-orden`} className="label">
                Ordenar por
              </label>
              <select id={`${uid}-orden`} value={sort} onChange={(e) => setSort(e.target.value as SortKey)} className="field">
                <option value="relevancia">Orden sugerido</option>
                <option value="nombre">Nombre (A–Z)</option>
                <option value="precio-asc" disabled={!hasPrices}>
                  Precio: menor a mayor{!hasPrices ? ' (precios a confirmar)' : ''}
                </option>
                <option value="precio-desc" disabled={!hasPrices}>
                  Precio: mayor a menor{!hasPrices ? ' (precios a confirmar)' : ''}
                </option>
              </select>
            </div>
          </div>

          <div>
            <p className="label" id={`${uid}-cats`}>
              Categoría
            </p>
            <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-1" role="group" aria-labelledby={`${uid}-cats`}>
              <button type="button" className={chip(category === ALL)} aria-pressed={category === ALL} onClick={() => onCategoryChange(ALL)}>
                Todos
              </button>
              {categorias.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  className={chip(category === c.id)}
                  aria-pressed={category === c.id}
                  onClick={() => onCategoryChange(c.id)}
                >
                  {c.nombre}
                </button>
              ))}
            </div>
          </div>

          {availableFlags.length > 0 && (
            <div>
              <p className="label" id={`${uid}-flags`}>
                Mostrar
              </p>
              <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-1" role="group" aria-labelledby={`${uid}-flags`}>
                <button type="button" className={chip(flag === 'todos')} aria-pressed={flag === 'todos'} onClick={() => setFlag('todos')}>
                  Todos
                </button>
                {availableFlags.map((f) => (
                  <button key={f.key} type="button" className={chip(flag === f.key)} aria-pressed={flag === f.key} onClick={() => setFlag(f.key)}>
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 flex items-center justify-between gap-3">
          <p className="text-sm font-bold text-ink-soft" role="status" aria-live="polite">
            {visible.length === 0
              ? 'Sin resultados'
              : `${visible.length} ${visible.length === 1 ? 'producto' : 'productos'}`}
          </p>
          {filtersActive && (
            <button type="button" onClick={resetFilters} className="text-sm font-extrabold text-brand-700 underline underline-offset-4 hover:text-deep">
              Limpiar filtros
            </button>
          )}
        </div>

        {visible.length > 0 ? (
          <ul className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {visible.map((p, i) => (
              <li key={p.id}>
                <Reveal delay={Math.min(i, 3) * 70} className="h-full">
                  <ProductCard product={p} onDetail={setDetail} />
                </Reveal>
              </li>
            ))}
          </ul>
        ) : (
          <div className="card mt-4 flex flex-col items-center px-6 py-14 text-center">
            <span className="grid size-16 place-items-center rounded-full bg-mist text-brand-700">
              <SearchX className="size-8" aria-hidden="true" />
            </span>
            <h3 className="mt-4 text-xl font-extrabold">No encontramos productos</h3>
            <p className="mt-2 max-w-md text-ink-soft">Probá con otra palabra o quitá los filtros para ver todo el catálogo.</p>
            <button type="button" onClick={resetFilters} className="btn-primary mt-5">
              Ver todos los productos
            </button>
          </div>
        )}
      </div>

      <ProductDetail product={detail} onClose={() => setDetail(null)} />
    </section>
  )
}
