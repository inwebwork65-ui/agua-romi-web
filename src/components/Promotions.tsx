import { Gift, Plus, Tag } from 'lucide-react'
import { productos } from '../data/products'
import { promociones } from '../data/promotions'
import { useCart } from '../context/CartContext'
import { buildGeneralUrl } from '../lib/whatsapp'
import { Price } from './Price'
import { Reveal } from './ui/Reveal'
import { WhatsAppIcon } from './ui/icons'

/** Productos destacados + promociones vigentes (editables en src/data/promotions.ts). */
export function Promotions() {
  const { add } = useCart()
  const destacados = productos.filter((p) => p.destacado)

  return (
    <section id="promociones" className="section-y bg-white" aria-labelledby="promos-titulo">
      <div className="container-page">
        <Reveal>
          <span className="eyebrow">
            <Tag className="size-3.5" aria-hidden="true" />
            Destacados y promociones
          </span>
          <h2 id="promos-titulo" className="section-title mt-4">
            Para pedir más rápido
          </h2>
          <p className="section-lead">Los productos que más te pueden servir, a un toque de tu pedido.</p>
        </Reveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.35fr_1fr]">
          <Reveal>
            <div className="card h-full p-5 sm:p-6">
              <h3 className="text-lg font-extrabold">Productos destacados</h3>
              {destacados.length === 0 ? (
                <p className="mt-3 text-ink-soft">Pronto vas a ver acá los productos destacados.</p>
              ) : (
                <ul className="mt-4 divide-y divide-sky/15">
                  {destacados.map((p) => (
                    <li key={p.id} className="flex items-center gap-4 py-3.5">
                      <img src={p.imagen} alt={p.imagenAlt} width={64} height={80} loading="lazy" className="size-16 shrink-0 rounded-2xl bg-mist object-cover" />
                      <div className="min-w-0 flex-1">
                        <p className="font-extrabold leading-snug text-deep">{p.nombre}</p>
                        <p className="text-sm text-ink-soft">{p.presentacion}</p>
                        <div className="mt-0.5 text-sm">
                          <Price product={p} />
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => add(p)}
                        disabled={p.disponibilidad === 'agotado'}
                        aria-label={`Agregar ${p.nombre} ${p.presentacion} al pedido`}
                        className="btn-outline btn-sm shrink-0 disabled:border-slate-300 disabled:text-slate-500"
                      >
                        <Plus className="size-4" aria-hidden="true" />
                        <span className="hidden sm:inline">Agregar</span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="relative flex h-full flex-col justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-brand-700 to-deep p-6 text-white shadow-lift sm:p-8">
              <div className="pointer-events-none absolute -right-10 -top-10 size-44 rounded-full bg-white/10" aria-hidden="true" />
              <Gift className="size-10 text-sky" aria-hidden="true" />
              <h3 className="mt-3 text-xl font-extrabold !text-white">Promociones y combos</h3>

              {promociones.length === 0 ? (
                <>
                  <p className="mt-2 leading-relaxed text-white/90">
                    Consultanos por las promociones vigentes, combos y precios por cantidad para hogares, comercios y empresas.
                  </p>
                  <a
                    href={buildGeneralUrl('Hola Agua Romi! Quisiera saber qué promociones o combos tienen vigentes.')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn mt-6 self-start bg-white text-deep hover:bg-mist"
                  >
                    <WhatsAppIcon className="size-5 text-[#128c4a]" />
                    Preguntar por promociones
                  </a>
                </>
              ) : (
                <ul className="mt-4 space-y-3">
                  {promociones.map((promo) => (
                    <li key={promo.id} className="rounded-2xl bg-white/10 p-4">
                      <span className="text-xs font-extrabold uppercase tracking-wider text-sky">{promo.etiqueta}</span>
                      <p className="mt-0.5 font-extrabold">{promo.titulo}</p>
                      <p className="mt-1 text-sm text-white/90">{promo.descripcion}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
