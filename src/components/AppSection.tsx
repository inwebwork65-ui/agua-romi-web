import { CreditCard, ExternalLink, History, Clock, Package, Wallet } from 'lucide-react'
import { settings } from '../config/settings'
import { buildGeneralUrl } from '../lib/whatsapp'
import { Reveal } from './ui/Reveal'
import { WhatsAppIcon } from './ui/icons'

const features = [
  { icon: Clock, label: 'Hora', text: 'Cuándo se hizo cada entrega' },
  { icon: Package, label: 'Cantidad', text: 'Qué y cuánto recibiste' },
  { icon: History, label: 'Historial', text: 'Todos tus movimientos' },
  { icon: Wallet, label: 'Saldo', text: 'Tu cuenta al día' },
  { icon: CreditCard, label: 'Pagos', text: 'Tus pagos registrados' },
]

const phones = [
  { src: '/images/app-1.webp', alt: 'Pantalla de inicio de la app Autogestión Agua', cls: 'translate-y-6 anim-float [animation-delay:-2s]' },
  { src: '/images/app-2.webp', alt: 'Pantalla de cuenta de la app Autogestión Agua con saldo y últimos movimientos', cls: '-translate-y-2 sm:-translate-y-4 anim-float' },
  { src: '/images/app-3.webp', alt: 'Pantalla de historial de pedidos de la app Autogestión Agua', cls: 'translate-y-8 anim-float [animation-delay:-4s]' },
]

/** Presentación de la app "Autogestión Agua" para clientes. */
export function AppSection() {
  const href = settings.app.enlaceGooglePlay ?? settings.app.busquedaGooglePlay

  return (
    <section id="app" className="section-y overflow-hidden bg-gradient-to-b from-white to-mist" aria-labelledby="app-titulo">
      <div className="container-page grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal className="order-2 lg:order-1">
          <span className="eyebrow">Para clientes</span>
          <h2 id="app-titulo" className="section-title mt-4">
            Tu cuenta, siempre a la vista con <span className="text-brand-700">{settings.app.nombre}</span>
          </h2>
          <p className="section-lead">
            Con el fin de una mayor transparencia, todos nuestros clientes tienen disponible la app en Google Play. Desde tu celular
            podés consultar todo lo que necesitás saber de tu servicio.
          </p>

          <ul className="mt-7 grid gap-3 sm:grid-cols-2">
            {features.map(({ icon: Icon, label, text }) => (
              <li key={label} className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-card ring-1 ring-sky/15">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-mist text-brand-700">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <span className="leading-tight">
                  <span className="block font-extrabold text-deep">{label}</span>
                  <span className="block text-sm text-ink-soft">{text}</span>
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href={href} target="_blank" rel="noopener noreferrer" className="btn-primary">
              Buscar en Google Play
              <ExternalLink className="size-4" aria-hidden="true" />
              <span className="sr-only">(se abre en una pestaña nueva)</span>
            </a>
            <a
              href={buildGeneralUrl('Hola Agua Romi! Quisiera ayuda para usar la app Autogestión Agua.')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              <WhatsAppIcon className="size-5 text-[#128c4a]" />
              Pedir ayuda con la app
            </a>
          </div>
          <p className="mt-4 text-sm text-ink-soft">
            App «{settings.app.nombre}», publicada en Google Play por {settings.app.publicador}.
          </p>
        </Reveal>

        <Reveal delay={120} className="order-1 lg:order-2">
          <div className="relative mx-auto flex max-w-lg items-center justify-center py-8">
            <div className="absolute inset-x-6 top-1/2 aspect-square -translate-y-1/2 rounded-full bg-gradient-to-br from-sky/30 to-brand/10" aria-hidden="true" />
            <div className="absolute left-2 top-4 size-16 rounded-full bg-sky/25 blur-sm" aria-hidden="true" />
            <div className="relative flex items-center justify-center gap-3 sm:gap-5">
              {phones.map((p) => (
                <img
                  key={p.src}
                  src={p.src}
                  alt={p.alt}
                  width={600}
                  height={1247}
                  loading="lazy"
                  decoding="async"
                  className={`w-[6.6rem] drop-shadow-[0_18px_22px_rgba(18,61,112,0.28)] sm:w-36 md:w-40 ${p.cls}`}
                />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
