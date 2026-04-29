"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { useCart } from "@/context/CartContext"
import { PlanType } from "@/types/cart"

export default function ProductPage() {
  const { id } = useParams()
  const { addToCart } = useCart()

  const [plan, setPlan] = useState<PlanType>("one-time")
  const [quantity, setQuantity] = useState(1)
  const [showSuccess, setShowSuccess] = useState(false)

  const product = {
    id: String(id),
    name: "Sample Product",
    price: 29.99,
    description: "High quality supplement"
  }

  const handleAddToCart = () => {
    addToCart(product.id, plan, quantity)

    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 2000)
  }

  return (
    <div className="p-10 max-w-4xl mx-auto">

      <h1 className="text-3xl font-bold">{product.name}</h1>

      <p className="mt-2 text-gray-500">{product.description}</p>

      <p className="mt-4 text-xl font-semibold">
        ${product.price}
      </p>

      <div className="mt-6">
        <select
          value={plan}
          onChange={(e) => setPlan(e.target.value as PlanType)}
          className="border p-2"
        >
          <option value="one-time">One-time</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>

        <input
          type="number"
          min={1}
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="border p-2 ml-2 w-20"
        />
      </div>

      <button
        onClick={handleAddToCart}
        className="mt-6 bg-green-600 text-white px-6 py-3 rounded"
      >
        Add to Cart
      </button>

      {showSuccess && (
        <p className="text-green-600 mt-3">Added to cart!</p>
      )}
    </div>
  )
}
