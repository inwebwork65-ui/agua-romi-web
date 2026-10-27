import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { productos } from '../data/products'
import { buildCartDetails, clampQty, computeTotals } from '../lib/cart'
import type { CartLine, CartLineDetail, CartTotals, Product } from '../types'

const STORAGE_KEY = 'agua-romi:carrito:v1'

type Action =
  | { type: 'add'; productId: string; cantidad: number }
  | { type: 'set'; productId: string; cantidad: number }
  | { type: 'remove'; productId: string }
  | { type: 'clear' }

function reducer(state: CartLine[], action: Action): CartLine[] {
  switch (action.type) {
    case 'add': {
      const existing = state.find((l) => l.productId === action.productId)
      if (existing) {
        return state.map((l) =>
          l.productId === action.productId ? { ...l, cantidad: clampQty(l.cantidad + action.cantidad) } : l,
        )
      }
      return [...state, { productId: action.productId, cantidad: clampQty(action.cantidad) }]
    }
    case 'set':
      return state.map((l) => (l.productId === action.productId ? { ...l, cantidad: clampQty(action.cantidad) } : l))
    case 'remove':
      return state.filter((l) => l.productId !== action.productId)
    case 'clear':
      return []
  }
}

/** Lee el carrito guardado validando que cada producto siga existiendo en el catálogo. */
function loadInitial(): CartLine[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    const ids = new Set(productos.map((p) => p.id))
    return parsed
      .filter(
        (l): l is CartLine =>
          typeof l === 'object' &&
          l !== null &&
          typeof (l as CartLine).productId === 'string' &&
          typeof (l as CartLine).cantidad === 'number' &&
          ids.has((l as CartLine).productId),
      )
      .map((l) => ({ productId: l.productId, cantidad: clampQty(l.cantidad) }))
  } catch {
    return []
  }
}

interface CartContextValue {
  lines: CartLine[]
  details: CartLineDetail[]
  totals: CartTotals
  add: (product: Product, cantidad?: number) => void
  setQty: (productId: string, cantidad: number) => void
  remove: (productId: string) => void
  clear: () => void
  isOpen: boolean
  openCart: () => void
  closeCart: () => void
  toast: { id: number; message: string } | null
  notify: (message: string) => void
  dismissToast: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, dispatch] = useReducer(reducer, undefined, loadInitial)
  const [isOpen, setIsOpen] = useState(false)
  const [toast, setToast] = useState<{ id: number; message: string } | null>(null)
  const toastTimer = useRef<number | undefined>(undefined)
  const toastId = useRef(0)

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines))
    } catch {
      /* Almacenamiento no disponible (modo privado): el carrito sigue funcionando en memoria. */
    }
  }, [lines])

  const dismissToast = useCallback(() => {
    window.clearTimeout(toastTimer.current)
    setToast(null)
  }, [])

  const notify = useCallback((message: string) => {
    window.clearTimeout(toastTimer.current)
    toastId.current += 1
    setToast({ id: toastId.current, message })
    toastTimer.current = window.setTimeout(() => setToast(null), 3200)
  }, [])

  useEffect(() => () => window.clearTimeout(toastTimer.current), [])

  const details = useMemo(() => buildCartDetails(lines, productos), [lines])
  const totals = useMemo(() => computeTotals(details), [details])

  const add = useCallback(
    (product: Product, cantidad = 1) => {
      dispatch({ type: 'add', productId: product.id, cantidad })
      notify(`Agregaste ${product.nombre} (${product.presentacion}) a tu pedido`)
    },
    [notify],
  )
  const setQty = useCallback((productId: string, cantidad: number) => dispatch({ type: 'set', productId, cantidad }), [])
  const remove = useCallback((productId: string) => dispatch({ type: 'remove', productId }), [])
  const clear = useCallback(() => dispatch({ type: 'clear' }), [])
  const openCart = useCallback(() => setIsOpen(true), [])
  const closeCart = useCallback(() => setIsOpen(false), [])

  const value = useMemo<CartContextValue>(
    () => ({ lines, details, totals, add, setQty, remove, clear, isOpen, openCart, closeCart, toast, notify, dismissToast }),
    [lines, details, totals, add, setQty, remove, clear, isOpen, openCart, closeCart, toast, notify, dismissToast],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart debe usarse dentro de <CartProvider>')
  return ctx
}
