import { BadgeCheck, Check, Search } from 'lucide-react'
import { useState } from 'react'
import { settings } from '../config/settings'
import { certificados, controles } from '../data/certifications'
import type { CertificateDoc } from '../data/certifications'
import { Dialog, DialogClose } from './ui/Dialog'
import { Reveal } from './ui/Reveal'

/** Habilitaciones y certificaciones (ASSAL / R.N.E. / R.N.P.A. / municipal) y controles que recibe la planta. */
export function Certifications() {
  const { habilitaciones } = settings
  const [doc, setDoc] = useState<CertificateDoc | null>(null)

  return (
    <section id="habilitaciones" className="bg-white py-20 sm:py-24 lg:py-32" aria-labelledby="habilitaciones-titulo">
      <div className="container-page">
        <Reveal className="grid gap-6 lg:grid-cols-[1fr_0.8fr] lg:items-end lg:gap-16">
          <div>
            <span className="eyebrow">Habilitaciones</span>
            <h2 id="habilitaciones-titulo" className="section-title mt-5">
              Habilitaciones y certificaciones
            </h2>
          </div>
          <p className="text-base leading-relaxed text-ink-soft sm:text-lg">
            Todos nuestros productos son elaborados bajo los controles de ASSAL Santa Fe. Estos son los números de habilitación y los documentos de nuestra planta.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <div className="flex h-full flex-col justify-between rounded-xl bg-deep p-8 text-white sm:p-10">
              <div className="flex items-center gap-3">
                <BadgeCheck className="size-8 shrink-0 text-sky" aria-hidden="true" />
                <div>
                  <p className="text-lg font-extrabold">Planta habilitada</p>
                  <p className="text-sm text-white/80">Controles de {habilitaciones.autoridad}</p>
                </div>
              </div>

              {/* Logo institucional ASSAL, centrado y sin tarjeta */}
              <div className="mt-8 flex justify-center">
                <img
                  src="/images/logo-assal.png"
                  alt="ASSAL – Agencia Santafesina de Seguridad Alimentaria"
                  width={368}
                  height={108}
                  loading="lazy"
                  decoding="async"
                  className="h-14 w-auto sm:h-16"
                />
              </div>

              <dl className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                <div>
                  <dt className="text-xs font-extrabold uppercase tracking-[0.18em] text-sky">R.N.E.</dt>
                  <dd className="mt-2 whitespace-nowrap text-[1.6rem] font-extrabold leading-none tabular-nums sm:text-[1.75rem]">N° {habilitaciones.rne}</dd>
                  <dd className="mt-2 text-sm leading-snug text-white/75">Registro Nacional de Establecimiento</dd>
                </div>
                <div>
                  <dt className="text-xs font-extrabold uppercase tracking-[0.18em] text-sky">R.N.P.A.</dt>
                  <dd className="mt-2 whitespace-nowrap text-[1.6rem] font-extrabold leading-none tabular-nums sm:text-[1.75rem]">N° {habilitaciones.rnpa}</dd>
                  <dd className="mt-2 text-sm leading-snug text-white/75">Registro Nacional de Producto Alimenticio</dd>
                </div>
              </dl>
            </div>
          </Reveal>

          {/* Documentos originales, con ampliación al hacer clic */}
          <Reveal delay={100} className="lg:col-span-7">
            <ul className="grid grid-cols-3 gap-3 sm:gap-5">
              {certificados.map((c) => (
                <li key={c.id}>
                  <button
                    type="button"
                    onClick={() => setDoc(c)}
                    aria-label={`Ampliar: ${c.titulo}`}
                    className="group block w-full text-left"
                  >
                    <span className="relative block aspect-[3/4] overflow-hidden rounded-lg bg-cloud shadow-card ring-1 ring-line transition group-hover:ring-brand">
                      <img
                        src={c.imagen}
                        alt={c.imagenAlt}
                        width={720}
                        height={1280}
                        loading="lazy"
                        decoding="async"
                        className="size-full object-cover object-top transition duration-500 group-hover:scale-[1.03]"
                      />
                      <span className="absolute bottom-2 right-2 grid size-9 place-items-center rounded-full bg-white/95 text-deep shadow-card">
                        <Search className="size-4" aria-hidden="true" />
                      </span>
                    </span>
                    <span className="mt-3 block text-sm font-extrabold leading-snug text-deep">{c.titulo}</span>
                    <span className="mt-0.5 block text-xs leading-snug text-ink-soft sm:text-[0.8rem]">{c.subtitulo}</span>
                  </button>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm text-ink-soft">Tocá cada documento para verlo ampliado.</p>
          </Reveal>
        </div>

        {/* Auditorías y control */}
        <Reveal className="mt-16 lg:mt-24">
          <div className="grid gap-10 border-t border-line pt-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <span className="eyebrow">Controles</span>
              <h3 className="mt-5 text-[1.75rem] font-extrabold leading-tight tracking-tight sm:text-3xl">{controles.titulo}</h3>
              <p className="mt-4 text-base leading-relaxed text-ink-soft sm:text-lg">{controles.texto}</p>
            </div>

            <div className="lg:col-span-7">
              <ul className="grid border-t border-line sm:grid-cols-2 sm:gap-x-10">
                {controles.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 border-b border-line py-4">
                    <Check className="mt-0.5 size-5 shrink-0 text-brand" aria-hidden="true" />
                    <span className="font-semibold leading-snug text-deep">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 rounded-xl bg-cloud p-6">
                <p className="leading-relaxed text-ink">{controles.cierre}</p>
                <p className="mt-3 text-sm text-ink-soft">
                  <span className="font-extrabold uppercase tracking-[0.16em] text-brand-700">{controles.directora.rol}</span>
                  <span className="mx-2" aria-hidden="true">
                    ·
                  </span>
                  <span className="font-bold text-deep">{controles.directora.nombre}</span>
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {doc && (
        <Dialog open onClose={() => setDoc(null)} labelledBy="documento-titulo" sizeClass="max-w-xl">
          <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-3">
            <div className="min-w-0">
              <p id="documento-titulo" className="truncate text-sm font-extrabold text-deep">
                {doc.titulo}
              </p>
              <p className="truncate text-xs text-ink-soft">{doc.subtitulo}</p>
            </div>
            <DialogClose onClose={() => setDoc(null)} label="Cerrar documento" />
          </div>
          <div className="overflow-y-auto bg-cloud p-3 sm:p-5">
            <img src={doc.imagen} alt={doc.imagenAlt} width={720} height={1280} className="mx-auto h-auto w-full max-w-md rounded-md shadow-card" />
          </div>
        </Dialog>
      )}
    </section>
  )
}
