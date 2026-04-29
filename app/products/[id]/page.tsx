"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import { supabase } from "@/lib/supabase"

import { Product } from "@/types/product"
import { useCart } from "@/context/CartContext"
import { PlanType } from "@/types/cart"

export default function ProductPage() {
  const { id } = useParams()

  const [product, setProduct] = useState<Product | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [plan, setPlan] = useState<PlanType>("one-time")
  const [showSuccess, setShowSuccess] = useState(false)

  const { addToCart } = useCart()

  /* FETCH */
  useEffect(() => {
    if (!id) return

    async function fetchProduct() {
      const { data } = await supabase
        .from("products")
        .select("*")
        .eq("id", Number(id))
        .single()

      setProduct(data)
    }

    fetchProduct()
  }, [id])

  /* ✅ EXIT EARLY */
  if (!product) {
    return (
      <div className="p-10 text-gray-500">
        Loading product...
      </div>
    )
  }

  /* ✅ DEFINE HANDLER AFTER GUARD */
  const handleAddToCart = () => {
    addToCart(productId: string, plan: PlanType, quantity: number)
    
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 2000)
  }

  return (
    <div className="max-w-6xl mx-auto p-10 grid md:grid-cols-2 gap-10">

      {showSuccess && (
        <div className="fixed top-5 right-5 bg-green-600 text-white px-5 py-3 rounded">
          ✅ {product.name} added to cart
        </div>
      )}

      <div className="relative w-full h-[400px]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover rounded-lg"
        />
      </div>

      <div>
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="text-gray-500">{product.category}</p>

        <p className="text-2xl font-bold mt-3">
          ${product.price.toFixed(2)}
        </p>

        <select
          value={plan}
          onChange={(e) =>
            setPlan(e.target.value as PlanType)
          }
          className="mt-4 border p-2 rounded w-full"
        >
          <option value="one-time">One-time</option>
          <option value="monthly">Monthly</option>
          <option value="bi-monthly">Bi-Monthly</option>
          <option value="quarterly">Quarterly</option>
        </select>

        <div className="flex gap-3 mt-4">
          <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
          <span>{quantity}</span>
          <button onClick={() => setQuantity(q => q + 1)}>+</button>
        </div>

        <button
          onClick={handleAddToCart}
          className="mt-5 bg-blue-600 text-white px-6 py-3 rounded"
        >
          Add to Cart
        </button>
      </div>
    </div>
  )
}
