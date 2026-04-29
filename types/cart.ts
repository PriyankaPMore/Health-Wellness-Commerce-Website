export type PlanType = "one-time" | "monthly" | "yearly"

export type CartItem = {
  productId: string
  name: string
  price: number
  quantity: number
  plan: PlanType
}
