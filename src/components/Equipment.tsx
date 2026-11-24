import { equipamientoIntro, fotosEquipamiento } from '../data/equipment'
import type { EquipmentPhoto } from '../data/equipment'
import { Reveal } from './ui/Reveal'

function Photo({ photo, className = '', width, height }: { photo: EquipmentPhoto; className?: string; width: number; height: number }) {
  return (
    <figure className={`group relative m-0 overflow-hidden rounded-xl bg-deep ${className}`}>
      <img
        src={photo.imagen}
        alt={photo.imagenAlt}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 size-full object-cover transition duration-700 group-hover:scale-[1.03]"
      />
      <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-deep/85 via-deep/40 to-transparent px-5 pb-4 pt-14 text-white">
        <span className="block text-base font-extrabold">{photo.titulo}</span>
        {photo.texto && <span className="block text-sm text-white/85">{photo.texto}</span>}
      </figcaption>
    </figure>
  )
}

/** Equipamiento e instalaciones: fotografías reales de la planta en una composición editorial. */
export function Equipment() {
  const { productora, lavadora, equipo, personal } = fotosEquipamiento
  return (
    <section id="equipamiento" className="bg-cloud py-20 sm:py-24 lg:py-32" aria-labelledby="equipamiento-titulo">
      <div className="container-page">
        <Reveal className="max-w-3xl">
          <span className="eyebrow">Planta</span>
          <h2 id="equipamiento-titulo" className="section-title mt-5">
            {equipamientoIntro.titulo}
          </h2>
          <p className="section-lead">{equipamientoIntro.lead}</p>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-12 grid gap-4 lg:grid-cols-12">
            <Photo photo={equipo} width={800} height={1067} className="aspect-[4/5] lg:col-span-4 lg:row-span-2 lg:aspect-auto" />
            <Photo photo={productora} width={1000} height={563} className="aspect-[16/9] lg:col-span-8 lg:aspect-[16/8]" />
            <Photo photo={lavadora} width={1000} height={563} className="aspect-[16/10] lg:col-span-4 lg:aspect-[4/3]" />
            <Photo photo={personal} width={1000} height={750} className="aspect-[16/10] lg:col-span-4 lg:aspect-[4/3]" />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
