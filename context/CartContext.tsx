"use client"

import { createContext, useContext, useState } from "react"
import { CartItem, PlanType } from "@/types/cart"

type CartContextType = {
  cart: CartItem[]
  addToCart: (productId: string, plan: PlanType, quantity: number) => void
  removeFromCart: (productId: string) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])

  const addToCart = (productId: string, plan: PlanType, quantity: number) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.productId === productId)

      if (existing) {
        return prev.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }

      return [...prev, { productId, plan, quantity } as CartItem]
    })
  }

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.productId !== productId))
  }

  const clearCart = () => setCart([])

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) throw new Error("useCart must be used inside CartProvider")
  return context
}
