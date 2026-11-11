import { Plus } from 'lucide-react'
import { productos } from '../data/products'
import { promociones } from '../data/promotions'
import { useCart } from '../context/CartContext'
import { buildGeneralUrl } from '../lib/whatsapp'
import { Price } from './Price'
import { Reveal } from './ui/Reveal'
import { WhatsAppIcon } from './ui/icons'

/** Promociones vigentes (src/data/promotions.ts) y pedido rápido de productos destacados. */
export function Promotions() {
  const { add } = useCart()
  const destacados = productos.filter((p) => p.destacado)

  return (
    <section id="promociones" className="bg-white py-20 sm:py-24 lg:py-28" aria-labelledby="promos-titulo">
      <div className="container-page">
        {/* Banda principal: fotografía + propuesta */}
        <Reveal>
          <div className="relative grid overflow-hidden rounded-xl bg-deep text-white lg:grid-cols-[1.05fr_1fr]">
            <div className="relative z-10 flex flex-col justify-center p-8 sm:p-12 lg:p-16">
              <span className="eyebrow-light">Promociones y combos</span>
              <h2 id="promos-titulo" className="mt-5 text-[2rem] font-extrabold leading-[1.1] tracking-[-0.02em] !text-white sm:text-4xl lg:text-[2.6rem]">
                {promociones.length === 0 ? 'Consultá las promociones vigentes' : 'Promociones vigentes'}
              </h2>

              {promociones.length === 0 ? (
                <>
                  <p className="mt-5 max-w-md text-base leading-relaxed text-white/85 sm:text-lg">
                    Combos y precios por cantidad para hogares, comercios y empresas. Escribinos y te contamos qué tenemos hoy.
                  </p>
                  <a
                    href={buildGeneralUrl('Hola Agua Romi! Quisiera saber qué promociones o combos tienen vigentes.')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-whatsapp mt-8 self-start px-7 py-3.5"
                  >
                    <WhatsAppIcon className="size-5" />
                    Preguntar por promociones
                  </a>
                </>
              ) : (
                <ul className="mt-6 divide-y divide-white/15 border-y border-white/15">
                  {promociones.map((promo) => (
                    <li key={promo.id} className="py-4">
                      <span className="text-xs font-extrabold uppercase tracking-[0.16em] text-sky">{promo.etiqueta}</span>
                      <p className="mt-0.5 text-lg font-extrabold">{promo.titulo}</p>
                      <p className="mt-1 text-sm text-white/85">{promo.descripcion}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="relative min-h-[16rem] lg:min-h-full">
              <img
                src="/images/hero-productos.webp"
                alt="Bidón de agua, sifón de soda y bolsas de hielo Romi sobre la mesa de la planta"
                width={1400}
                height={1050}
                loading="lazy"
                className="absolute inset-0 size-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep/70 to-transparent lg:bg-gradient-to-r lg:from-deep lg:via-deep/20 lg:to-transparent" aria-hidden="true" />
            </div>
          </div>
        </Reveal>

        {/* Pedido rápido */}
        {destacados.length > 0 && (
          <Reveal delay={100} className="mt-14">
            <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
              <h3 className="text-xl font-extrabold">Pedí en un toque</h3>
              <p className="text-sm text-ink-soft">Los productos más pedidos, directo a tu pedido.</p>
            </div>
            <ul className="mt-5 grid border-t border-line sm:grid-cols-2 sm:gap-x-12">
              {destacados.map((p) => (
                <li key={p.id} className="flex items-center gap-4 border-b border-line py-4">
                  <img
                    src={p.imagen}
                    alt={p.imagenAlt}
                    width={64}
                    height={80}
                    loading="lazy"
                    className="size-16 shrink-0 rounded-lg bg-mist object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-base font-extrabold leading-snug text-deep">{p.nombre}</p>
                    <p className="text-sm text-ink-soft">{p.presentacion}</p>
                    <div className="mt-0.5 text-xs">
                      <Price product={p} />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => add(p)}
                    disabled={p.disponibilidad === 'agotado'}
                    aria-label={`Agregar ${p.nombre} ${p.presentacion} al pedido`}
                    className="grid size-10 shrink-0 place-items-center rounded-lg border border-deep/25 text-deep transition hover:border-deep hover:bg-deep hover:text-white disabled:border-slate-300 disabled:text-slate-500"
                  >
                    <Plus className="size-5" aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>
          </Reveal>
        )}
      </div>
    </section>
  )
}
