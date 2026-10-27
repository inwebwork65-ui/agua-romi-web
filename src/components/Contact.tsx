import { CheckCircle2, Clock, Instagram, Mail, MapPin, Navigation, Phone } from 'lucide-react'
import { useId, useState } from 'react'
import type { FormEvent } from 'react'
import { settings } from '../config/settings'
import { buildGeneralUrl, buildWhatsAppUrl, openExternal } from '../lib/whatsapp'
import { ProvisionalTag } from './ui/ProvisionalTag'
import { Reveal } from './ui/Reveal'
import { WhatsAppIcon } from './ui/icons'

interface FormErrors {
  nombre?: string
  telefono?: string
  mensaje?: string
}

export function Contact() {
  const uid = useId()
  const { contacto, empresa, redes } = settings
  const [nombre, setNombre] = useState('')
  const [telefono, setTelefono] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [errors, setErrors] = useState<FormErrors>({})
  const [sent, setSent] = useState(false)

  const mapEmbed = `https://www.google.com/maps?q=${encodeURIComponent(contacto.mapaConsulta)}&output=embed`
  const mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contacto.mapaConsulta)}`

  const validate = (): FormErrors => {
    const e: FormErrors = {}
    if (nombre.trim().length < 2) e.nombre = 'Ingresá tu nombre.'
    if (telefono.trim() && telefono.replace(/\D/g, '').length < 6) e.telefono = 'Revisá el teléfono: parece incompleto.'
    if (mensaje.trim().length < 10) e.mensaje = 'Escribí tu consulta (mínimo 10 caracteres).'
    return e
  }

  const handleSubmit = (ev: FormEvent) => {
    ev.preventDefault()
    const e = validate()
    setErrors(e)
    setSent(false)
    if (Object.keys(e).length > 0) return

    const text = [
      'Hola Agua Romi! Les escribo desde el sitio web.',
      '',
      `Nombre: ${nombre.trim()}`,
      telefono.trim() ? `Teléfono: ${telefono.trim()}` : '',
      '',
      mensaje.trim(),
    ]
      .filter((l, i, arr) => !(l === '' && arr[i - 1] === ''))
      .join('\n')
    openExternal(buildWhatsAppUrl(text))
    setSent(true)
  }

  const info = [
    { icon: Phone, label: 'Teléfono', value: contacto.telefonoVisible, href: `tel:${contacto.telefonoTel}`, wide: false },
    { icon: Instagram, label: 'Instagram', value: redes.instagram.usuario, href: redes.instagram.url, external: true, wide: false },
    { icon: Mail, label: 'Correo electrónico', value: contacto.email, href: `mailto:${contacto.email}`, wide: true },
    { icon: MapPin, label: 'Dirección', value: `${empresa.direccion}, ${empresa.localidad}`, href: mapLink, external: true, wide: false },
  ]

  return (
    <section id="contacto" className="section-y bg-white" aria-labelledby="contacto-titulo">
      <div className="container-page">
        <Reveal>
          <span className="eyebrow">Contacto</span>
          <h2 id="contacto-titulo" className="section-title mt-4">
            Hablemos
          </h2>
          <p className="section-lead">Escribinos para hacer tu pedido, consultar precios o coordinar una entrega.</p>
        </Reveal>

        <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Datos */}
          <Reveal>
            <div className="space-y-4">
              <a href={buildGeneralUrl()} target="_blank" rel="noopener noreferrer" className="btn-whatsapp w-full !py-4 text-lg">
                <WhatsAppIcon className="size-6" />
                Pedir por WhatsApp · {contacto.whatsappVisible}
              </a>

              <ul className="grid gap-3 sm:grid-cols-2">
                {info.map(({ icon: Icon, label, value, href, external, wide }) => (
                  <li key={label} className={wide ? 'sm:col-span-2' : ''}>
                    <a
                      href={href}
                      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="card card-hover flex h-full items-start gap-3 p-4"
                    >
                      <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-mist text-brand-700">
                        <Icon className="size-5" aria-hidden="true" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-xs font-bold uppercase tracking-wider text-ink-soft">{label}</span>
                        <span className="block font-extrabold text-deep [overflow-wrap:anywhere]">{value}</span>
                      </span>
                    </a>
                  </li>
                ))}
                <li>
                  <div className="card flex h-full items-start gap-3 p-4">
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-mist text-brand-700">
                      <Clock className="size-5" aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs font-bold uppercase tracking-wider text-ink-soft">Horarios de atención</span>
                      {contacto.horarios ? (
                        <span className="block font-extrabold text-deep">{contacto.horarios}</span>
                      ) : (
                        <span className="flex flex-wrap items-center gap-2 font-extrabold text-deep">
                          Consultanos por WhatsApp <ProvisionalTag />
                        </span>
                      )}
                    </span>
                  </div>
                </li>
              </ul>

            </div>
          </Reveal>

          {/* Formulario */}
          <Reveal delay={100}>
            <form onSubmit={handleSubmit} noValidate className="card p-6 sm:p-8" aria-labelledby={`${uid}-form-titulo`}>
              <h3 id={`${uid}-form-titulo`} className="text-xl font-extrabold">
                Enviá tu consulta
              </h3>
              <p className="mt-1 text-sm text-ink-soft">Al enviarla se abre WhatsApp con tu mensaje listo para mandar.</p>

              <div className="mt-6 space-y-5">
                <div>
                  <label htmlFor={`${uid}-nombre`} className="label">
                    Nombre <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id={`${uid}-nombre`}
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    autoComplete="name"
                    required
                    aria-required="true"
                    aria-invalid={errors.nombre ? true : undefined}
                    aria-describedby={errors.nombre ? `${uid}-nombre-err` : undefined}
                    className="field"
                  />
                  {errors.nombre && (
                    <p id={`${uid}-nombre-err`} className="error-text" role="alert">
                      {errors.nombre}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor={`${uid}-tel`} className="label">
                    Teléfono <span className="font-medium text-ink-soft">(opcional)</span>
                  </label>
                  <input
                    id={`${uid}-tel`}
                    type="tel"
                    inputMode="tel"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    autoComplete="tel"
                    aria-invalid={errors.telefono ? true : undefined}
                    aria-describedby={errors.telefono ? `${uid}-tel-err` : undefined}
                    className="field"
                  />
                  {errors.telefono && (
                    <p id={`${uid}-tel-err`} className="error-text" role="alert">
                      {errors.telefono}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor={`${uid}-msg`} className="label">
                    Tu consulta <span aria-hidden="true">*</span>
                  </label>
                  <textarea
                    id={`${uid}-msg`}
                    value={mensaje}
                    onChange={(e) => setMensaje(e.target.value)}
                    rows={5}
                    required
                    aria-required="true"
                    aria-invalid={errors.mensaje ? true : undefined}
                    aria-describedby={errors.mensaje ? `${uid}-msg-err` : undefined}
                    className="field"
                  />
                  {errors.mensaje && (
                    <p id={`${uid}-msg-err`} className="error-text" role="alert">
                      {errors.mensaje}
                    </p>
                  )}
                </div>

                <button type="submit" className="btn-whatsapp w-full">
                  <WhatsAppIcon className="size-5" />
                  Enviar consulta por WhatsApp
                </button>

                {sent && (
                  <p className="flex items-start gap-2 rounded-xl bg-emerald-50 p-3 text-sm font-semibold text-emerald-900" role="status">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                    Abrimos WhatsApp con tu consulta. Enviá el mensaje desde allí para que lleguemos a responderte.
                  </p>
                )}
              </div>
            </form>
          </Reveal>
        </div>

        {/* Mapa */}
        <Reveal className="mt-8">
              <div className="card overflow-hidden">
                <iframe
                  title={`Mapa con la ubicación de Agua Romi en ${empresa.localidad}`}
                  src={mapEmbed}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="block h-72 sm:h-80 w-full border-0"
                  allowFullScreen
                />
                <div className="flex items-center justify-between gap-3 bg-mist/60 px-4 py-3 text-sm">
                  <span className="font-bold text-deep">
                    {empresa.direccion}, {empresa.localidad}
                  </span>
                  <a href={mapLink} target="_blank" rel="noopener noreferrer" className="inline-flex shrink-0 items-center gap-1.5 font-extrabold text-brand-700 hover:text-deep">
                    <Navigation className="size-4" aria-hidden="true" />
                    Cómo llegar
                  </a>
                </div>
              </div>
        </Reveal>
      </div>
    </section>
  )
}
