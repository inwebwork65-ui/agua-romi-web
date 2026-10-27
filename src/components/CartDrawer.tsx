import { AlertCircle, ArrowLeft, CheckCircle2, ShoppingBag, Trash2 } from 'lucide-react'
import { useEffect, useId, useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../lib/format'
import { buildOrderMessage, openExternal } from '../lib/whatsapp'
import { getOrderService } from '../services/orders'
import { Dialog, DialogClose } from './ui/Dialog'
import { QtyStepper } from './ui/QtyStepper'
import { WhatsAppIcon } from './ui/icons'

type Step = 'carrito' | 'revision' | 'enviado'

export function CartDrawer() {
  const { isOpen, closeCart, details, totals, setQty, remove, clear } = useCart()
  const uid = useId()
  const [step, setStep] = useState<Step>('carrito')
  const [nombre, setNombre] = useState('')
  const [direccion, setDireccion] = useState('')
  const [notas, setNotas] = useState('')
  const [message, setMessage] = useState('')
  const [messageEdited, setMessageEdited] = useState(false)
  const [errors, setErrors] = useState<{ nombre?: string; mensaje?: string; envio?: string }>({})
  const [sending, setSending] = useState(false)

  // Al abrir el panel siempre se arranca en el resumen del carrito.
  useEffect(() => {
    if (isOpen) {
      setStep('carrito')
      setErrors({})
    }
  }, [isOpen])

  // Si se vacía el carrito en el paso de revisión, volvemos al carrito.
  useEffect(() => {
    if (details.length === 0 && step === 'revision') setStep('carrito')
  }, [details.length, step])

  const autoMessage = useMemo(
    () => buildOrderMessage(details, totals, { nombre: nombre || '(completar nombre)', direccion, notas }),
    [details, totals, nombre, direccion, notas],
  )

  // El texto se actualiza solo hasta que la persona lo edita a mano.
  useEffect(() => {
    if (!messageEdited) setMessage(autoMessage)
  }, [autoMessage, messageEdited])

  const goReview = () => {
    setMessageEdited(false)
    setStep('revision')
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const next: typeof errors = {}
    if (nombre.trim().length < 2) next.nombre = 'Ingresá tu nombre para que podamos identificar el pedido.'
    if (message.trim().length < 10) next.mensaje = 'El mensaje no puede estar vacío.'
    if (details.length === 0) next.envio = 'Tu pedido está vacío. Agregá al menos un producto.'
    setErrors(next)
    if (Object.keys(next).length > 0) return

    setSending(true)
    try {
      const result = await getOrderService().submit({
        items: details.map((d) => ({ producto: d.product, cantidad: d.cantidad })),
        cliente: { nombre: nombre.trim() },
        entrega: direccion.trim() ? { calle: direccion.trim(), localidad: '' } : undefined,
        notas: notas.trim() || undefined,
        mensajePersonalizado: messageEdited ? message : undefined,
      })
      if (result.tipo === 'whatsapp') {
        openExternal(result.url)
        setStep('enviado')
      }
    } catch (err) {
      setErrors({ envio: err instanceof Error ? err.message : 'No pudimos preparar el pedido. Probá de nuevo.' })
    } finally {
      setSending(false)
    }
  }

  const titleId = `${uid}-titulo`
  const titles: Record<Step, string> = { carrito: 'Mi pedido', revision: 'Revisá tu pedido', enviado: 'Pedido preparado' }

  const nonePriced = details.length > 0 && totals.lineasSinPrecio === details.length
  const TotalsBlock = (
    <div className="space-y-1 rounded-2xl bg-mist p-4 text-sm">
      <div className="flex items-center justify-between gap-3">
        <span className="font-bold text-deep">
          {totals.totalCompleto || nonePriced ? 'Total' : 'Subtotal (productos con precio)'}
        </span>
        <span className="text-lg font-extrabold tabular-nums text-deep" data-testid="cart-subtotal">
          {nonePriced ? 'A confirmar' : formatPrice(totals.subtotal)}
        </span>
      </div>
      {totals.lineasSinPrecio > 0 && (
        <p className="text-ink-soft">
          {totals.lineasSinPrecio === 1 ? '1 producto tiene' : `${totals.lineasSinPrecio} productos tienen`} el precio a confirmar por Agua Romi.
          El total final se confirma por WhatsApp.
        </p>
      )}
    </div>
  )

  return (
    <Dialog open={isOpen} onClose={closeCart} labelledBy={titleId} variant="drawer">
      <div className="flex items-center justify-between gap-3 border-b border-sky/20 px-5 py-3">
        <div className="flex items-center gap-2">
          {step === 'revision' && (
            <button
              type="button"
              onClick={() => setStep('carrito')}
              aria-label="Volver al resumen del pedido"
              className="grid size-10 place-items-center rounded-full text-deep hover:bg-mist"
            >
              <ArrowLeft className="size-5" aria-hidden="true" />
            </button>
          )}
          <h2 id={titleId} className="text-xl font-extrabold">
            {titles[step]}
          </h2>
        </div>
        <DialogClose onClose={closeCart} label="Cerrar mi pedido" />
      </div>

      {/* PASO 1: carrito */}
      {step === 'carrito' && (
        <>
          {details.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
              <span className="grid size-20 place-items-center rounded-full bg-mist text-brand-700">
                <ShoppingBag className="size-9" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-xl font-extrabold">Tu pedido está vacío</h3>
              <p className="mt-2 text-ink-soft">Agregá bidones, soda o hielo desde el catálogo.</p>
              <a href="#productos" onClick={closeCart} className="btn-primary mt-6" data-autofocus>
                Ver productos
              </a>
            </div>
          ) : (
            <>
              <ul className="min-h-0 flex-1 divide-y divide-sky/15 overflow-y-auto px-5">
                {details.map(({ product, cantidad, subtotal }) => (
                  <li key={product.id} className="flex gap-4 py-4">
                    <img src={product.imagen} alt="" width={80} height={100} className="size-20 shrink-0 rounded-2xl bg-mist object-cover" />
                    <div className="min-w-0 flex-1">
                      <p className="font-extrabold leading-snug text-deep">{product.nombre}</p>
                      <p className="text-sm text-ink-soft">{product.presentacion}</p>
                      <p className="mt-1 text-sm font-bold text-deep">
                        {product.precio == null ? 'Precio a confirmar' : `${formatPrice(product.precio)} c/u`}
                      </p>
                      <div className="mt-2 flex items-center justify-between gap-2">
                        <QtyStepper value={cantidad} onChange={(n) => setQty(product.id, n)} label={`${product.nombre} ${product.presentacion}`} />
                        <button
                          type="button"
                          onClick={() => remove(product.id)}
                          aria-label={`Quitar ${product.nombre} ${product.presentacion} del pedido`}
                          className="grid size-9 place-items-center rounded-full text-red-700 transition hover:bg-red-50"
                        >
                          <Trash2 className="size-[18px]" aria-hidden="true" />
                        </button>
                      </div>
                      {subtotal != null && (
                        <p className="mt-1 text-right text-sm font-extrabold tabular-nums text-deep">{formatPrice(subtotal)}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>

              <div className="space-y-3 border-t border-sky/20 bg-white p-5">
                {TotalsBlock}
                <button type="button" onClick={goReview} className="btn-primary w-full" data-autofocus>
                  Confirmar pedido
                </button>
                <div className="flex items-center justify-between">
                  <button type="button" onClick={closeCart} className="btn-ghost btn-sm">
                    Continuar comprando
                  </button>
                  <button type="button" onClick={clear} className="btn-ghost btn-sm text-red-700 hover:bg-red-50">
                    Vaciar pedido
                  </button>
                </div>
              </div>
            </>
          )}
        </>
      )}

      {/* PASO 2: revisión y envío por WhatsApp */}
      {step === 'revision' && (
        <form onSubmit={handleSubmit} noValidate className="flex min-h-0 flex-1 flex-col">
          <div className="flex-1 space-y-5 overflow-y-auto px-5 py-5">
            <p className="text-sm text-ink-soft">
              Completá tus datos, revisá el mensaje y enviá el pedido por WhatsApp. Se confirma cuando Agua Romi te responda.
            </p>

            <div>
              <label htmlFor={`${uid}-nombre`} className="label">
                Tu nombre <span aria-hidden="true">*</span>
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
                data-autofocus
              />
              {errors.nombre && (
                <p id={`${uid}-nombre-err`} className="error-text" role="alert">
                  {errors.nombre}
                </p>
              )}
            </div>

            <div>
              <label htmlFor={`${uid}-dir`} className="label">
                Dirección o zona de entrega <span className="font-medium text-ink-soft">(opcional)</span>
              </label>
              <input id={`${uid}-dir`} value={direccion} onChange={(e) => setDireccion(e.target.value)} autoComplete="street-address" className="field" />
            </div>

            <div>
              <label htmlFor={`${uid}-notas`} className="label">
                Notas <span className="font-medium text-ink-soft">(opcional)</span>
              </label>
              <input id={`${uid}-notas`} value={notas} onChange={(e) => setNotas(e.target.value)} placeholder="Ej.: horario preferido" className="field" />
            </div>

            <div>
              <div className="flex items-center justify-between gap-2">
                <label htmlFor={`${uid}-msg`} className="label !mb-0">
                  Mensaje que se enviará
                </label>
                {messageEdited && (
                  <button type="button" onClick={() => setMessageEdited(false)} className="text-xs font-extrabold text-brand-700 underline underline-offset-2">
                    Restablecer texto
                  </button>
                )}
              </div>
              <textarea
                id={`${uid}-msg`}
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value)
                  setMessageEdited(true)
                }}
                rows={11}
                aria-invalid={errors.mensaje ? true : undefined}
                className="field mt-1.5 font-mono text-[13px] leading-relaxed"
              />
              {errors.mensaje && (
                <p className="error-text" role="alert">
                  {errors.mensaje}
                </p>
              )}
            </div>

            {TotalsBlock}

            {errors.envio && (
              <p className="flex items-start gap-2 rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-800" role="alert">
                <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                {errors.envio}
              </p>
            )}
          </div>

          <div className="space-y-2 border-t border-sky/20 bg-white p-5">
            <button type="submit" disabled={sending} className="btn-whatsapp w-full">
              <WhatsAppIcon className="size-5" />
              {sending ? 'Preparando…' : 'Enviar pedido por WhatsApp'}
            </button>
            <button type="button" onClick={() => setStep('carrito')} className="btn-ghost w-full">
              Volver al pedido
            </button>
          </div>
        </form>
      )}

      {/* PASO 3: aviso posterior al envío */}
      {step === 'enviado' && (
        <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
          <span className="grid size-20 place-items-center rounded-full bg-emerald-100 text-emerald-800">
            <CheckCircle2 className="size-10" aria-hidden="true" />
          </span>
          <h3 className="mt-5 text-xl font-extrabold">Abrimos WhatsApp con tu pedido</h3>
          <p className="mt-2 text-ink-soft">
            Para terminar, enviá el mensaje desde WhatsApp. Tu pedido queda confirmado cuando Agua Romi te responda.
          </p>
          <div className="mt-6 grid w-full gap-2">
            <button
              type="button"
              onClick={() => {
                clear()
                setNombre('')
                setDireccion('')
                setNotas('')
                closeCart()
              }}
              className="btn-primary"
              data-autofocus
            >
              Ya lo envié: vaciar pedido
            </button>
            <button type="button" onClick={() => setStep('revision')} className="btn-outline">
              Volver a revisar
            </button>
            <button type="button" onClick={closeCart} className="btn-ghost">
              Seguir viendo productos
            </button>
          </div>
        </div>
      )}
    </Dialog>
  )
}
