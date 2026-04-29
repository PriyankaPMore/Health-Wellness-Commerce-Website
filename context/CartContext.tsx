"use client"

import { createContext, useContext, useState } from "react"
import { CartItem, CartContextType, PlanType } from "@/types/cart"

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])

  const addToCart = (
    productId: string,
    plan: PlanType,
    quantity: number
  ) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.productId === productId)

      if (existing) {
        return prev.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }

      return [
        ...prev,
        {
          productId,
          plan,
          quantity,
          name: "",
          price: 0
        }
      ]
    })
  }

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.productId !== productId))
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }

    setCart((prev) =>
      prev.map((item) =>
        item.productId === productId
          ? { ...item, quantity }
          : item
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
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error("useCart must be used inside CartProvider")
  return context
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) throw new Error("useCart must be used inside CartProvider")
  return context
}
