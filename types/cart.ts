export type PlanType = "one-time" | "monthly" | "yearly"

export type CartItem = {
  productId: number
  plan: PlanType
  quantity: number
}

export type CheckoutItem = {
  name: string
  price: number
  quantity: number
}