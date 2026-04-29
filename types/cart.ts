export type PlanType = "one-time" | "monthly" | "yearly"

export type CartItem = {
  productId: string
  name: string
  price: number
  quantity: number
  plan: PlanType
}

export type CartContextType = {
  cart: CartItem[]
  addToCart: (productId: string, plan: PlanType, quantity: number) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
}
