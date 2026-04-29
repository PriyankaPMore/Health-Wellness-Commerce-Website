"use client"

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react"

import { CartItem, PlanType } from "@/types/cart"

type CartContextType = {
  cart: CartItem[]
  addToCart: (productId: number, plan: PlanType, quantity: number) => void
  removeFromCart: (productId: number, plan: PlanType) => void
  updateQuantity: (productId: number, plan: PlanType, quantity: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([])

  useEffect(() => {
    const stored = localStorage.getItem("cart")
    if (stored) setCart(JSON.parse(stored))
  }, [])

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  const addToCart = (productId: number, plan: PlanType, quantity: number) => {
    setCart((prev) => {
      const existing = prev.find(
        (i) => i.productId === productId && i.plan === plan
      )

      if (existing) {
        return prev.map((i) =>
          i.productId === productId && i.plan === plan
            ? { ...i, quantity: i.quantity + quantity }
            : i
        )
      }

      return [...prev, { productId, plan, quantity }]
    })
  }

  const removeFromCart = (productId: number, plan: PlanType) => {
    setCart((prev) =>
      prev.filter((i) => !(i.productId === productId && i.plan === plan))
    )
  }

  const updateQuantity = (
    productId: number,
    plan: PlanType,
    quantity: number
  ) => {
    if (quantity < 1) return

    setCart((prev) =>
      prev.map((i) =>
        i.productId === productId && i.plan === plan
          ? { ...i, quantity }
          : i
      )
    )
  }

  const clearCart = () => setCart([])

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used within CartProvider")
  return ctx
}