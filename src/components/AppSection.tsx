import { CreditCard, ExternalLink, History, Package, UserRound, Wallet } from 'lucide-react'
import { settings } from '../config/settings'
import { buildGeneralUrl } from '../lib/whatsapp'
import { Reveal } from './ui/Reveal'
import { WhatsAppIcon } from './ui/icons'

const features = [
  { icon: History, label: 'Historial de pedidos', text: 'Hora y detalle de cada entrega' },
  { icon: Package, label: 'Cantidades entregadas', text: 'Qué y cuánto recibiste' },
  { icon: Wallet, label: 'Consulta de saldo', text: 'Tu cuenta siempre al día' },
  { icon: CreditCard, label: 'Registro de pagos', text: 'Todos tus pagos registrados' },
  { icon: UserRound, label: 'Información de cuenta', text: 'Tus datos y novedades' },
]

const phones = [
  {
    src: '/images/app-1.webp',
    alt: 'Pantalla de inicio de la app Autogestión Agua',
    cls: 'w-[26%] translate-y-10 anim-float [animation-delay:-2s]',
  },
  {
    src: '/images/app-2.webp',
    alt: 'Pantalla de cuenta de la app Autogestión Agua con saldo y últimas novedades',
    cls: 'z-10 w-[34%] -translate-y-3 anim-float',
  },
  {
    src: '/images/app-3.webp',
    alt: 'Pantalla de pedidos de la app Autogestión Agua',
    cls: 'w-[26%] translate-y-14 anim-float [animation-delay:-4s]',
  },
]

/** Presentación de la app "Autogestión Agua" para clientes. */
export function AppSection() {
  const href = settings.app.enlaceGooglePlay ?? settings.app.busquedaGooglePlay

  return (
    <section id="app" className="overflow-hidden bg-mist py-20 sm:py-24 lg:py-32" aria-labelledby="app-titulo">
      <div className="container-page grid items-center gap-16 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
        <Reveal className="order-2 lg:order-1">
          <span className="eyebrow">App para clientes</span>
          <h2 id="app-titulo" className="section-title mt-5">
            Tu cuenta, siempre a la vista con <span className="text-brand">{settings.app.nombre}</span>
          </h2>
          <p className="section-lead">
            Con el fin de una mayor transparencia, todos nuestros clientes tienen disponible la app en Google Play. Desde tu celular
            podés consultar todo lo que necesitás saber de tu servicio.
          </p>

          <ul className="mt-9 grid border-t border-deep/15 sm:grid-cols-2 sm:gap-x-10">
            {features.map(({ icon: Icon, label, text }) => (
              <li key={label} className="flex items-start gap-4 border-b border-deep/15 py-4">
                <Icon className="mt-0.5 size-6 shrink-0 text-brand" strokeWidth={1.75} aria-hidden="true" />
                <span className="leading-snug">
                  <span className="block font-extrabold text-deep">{label}</span>
                  <span className="block text-sm text-ink-soft">{text}</span>
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href={href} target="_blank" rel="noopener noreferrer" className="btn-primary px-7 py-3.5">
              Buscar en Google Play
              <ExternalLink className="size-4" aria-hidden="true" />
              <span className="sr-only">(se abre en una pestaña nueva)</span>
            </a>
            <a
              href={buildGeneralUrl('Hola Agua Romi! Quisiera ayuda para usar la app Autogestión Agua.')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline px-7 py-3.5"
            >
              <WhatsAppIcon className="size-5" />
              Pedir ayuda con la app
            </a>
          </div>
          <p className="mt-5 text-sm text-ink-soft">
            App «{settings.app.nombre}», publicada en Google Play por {settings.app.publicador}.
          </p>
        </Reveal>

        <Reveal delay={120} className="order-1 lg:order-2">
          <div className="relative mx-auto max-w-xl pb-16 pt-4">
            <div className="absolute left-1/2 top-1/2 aspect-square w-[88%] -translate-x-1/2 -translate-y-[54%] rounded-full bg-white" aria-hidden="true" />
            <div className="relative flex items-start justify-center gap-[3%]">
              {phones.map((p) => (
                <img
                  key={p.src}
                  src={p.src}
                  alt={p.alt}
                  width={600}
                  height={1247}
                  loading="lazy"
                  decoding="async"
                  className={`h-auto drop-shadow-[0_26px_28px_rgba(16,59,101,0.28)] ${p.cls}`}
                />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
