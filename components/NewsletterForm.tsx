"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { Product } from "@/types/product"

interface Props {
  product: Product
}

export default function ProductCard({ product }: Props) {
  const router = useRouter()

  const handleClick = () => {
    router.push(`/products/${product.id}`)
  }

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-4 flex flex-col cursor-pointer text-black"
    >
      {/* Image */}
      <div className="relative w-full h-48">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover rounded-lg"
        />
      </div>

      {/* Info */}
      <h2 className="mt-3 font-semibold text-lg">{product.name}</h2>
      <p className="text-sm text-gray-500">{product.category}</p>

      {/* Price */}
      <p className="mt-2 font-bold text-blue-600">
        ${product.price.toFixed(2)}
      </p>

      {/* CTA */}
      <button
        onClick={(e) => {
          e.stopPropagation() // prevents double navigation
          handleClick()
        }}
        className="mt-auto bg-gray-900 text-white py-2 rounded-lg hover:bg-black"
      >
        Learn More
      </button>
    </div>
  )
}