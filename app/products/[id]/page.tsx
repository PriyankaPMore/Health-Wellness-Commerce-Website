"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import { useCart } from "@/context/CartContext"
import { Product } from "@/types/product"

export default function ProductPage() {
  const { id } = useParams()
  const { addToCart } = useCart()

  const [plan, setPlan] = useState<"one-time" | "monthly">("one-time")
  const [quantity, setQuantity] = useState(1)
  const [showSuccess, setShowSuccess] = useState(false)

  // Mock product (replace with Supabase later)
  const product: Product = {
    id: String(id),
    name: "Sample Product",
    price: 29.99,
    description: "High quality wellness supplement",
    category: "Health",
    image: "/images/placeholder.jpg"
  }

  const handleAddToCart = () => {
    addToCart(product.id, plan, quantity)

    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 2000)
  }

  return (
    <div className="max-w-5xl mx-auto p-10">

      {/* PRODUCT IMAGE */}
      <div className="relative w-full h-[400px] mb-6">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover rounded-lg"
        />
      </div>

      {/* PRODUCT INFO */}
      <h1 className="text-3xl font-bold">{product.name}</h1>
      <p className="text-gray-500 mt-1">{product.category}</p>

      <p className="text-xl font-semibold mt-3">
        ${product.price.toFixed(2)}
      </p>

      <p className="mt-4 text-gray-700">
        {product.description}
      </p>

      {/* PLAN SELECT */}
      <div className="mt-6">
        <label className="font-medium">Plan:</label>

        <select
          className="border p-2 ml-2"
          value={plan}
          onChange={(e) =>
            setPlan(e.target.value as "one-time" | "monthly")
          }
        >
          <option value="one-time">One-time</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>

      {/* QUANTITY */}
      <div className="mt-4">
        <label className="font-medium">Quantity:</label>

        <input
          type="number"
          min={1}
          className="border p-2 ml-2 w-20"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />
      </div>

      {/* ADD TO CART BUTTON */}
      <button
        onClick={handleAddToCart}
        className="mt-6 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
      >
        Add to Cart
      </button>

      {/* SUCCESS MESSAGE */}
      {showSuccess && (
        <p className="mt-4 text-green-600 font-medium">
          Added to cart!
        </p>
      )}
    </div>
  )
}
