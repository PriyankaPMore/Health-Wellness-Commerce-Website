"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { Product } from "@/types/product"

interface Props {
  product: Product
}

export default function ProductCard({ product }: Props) {
  const router = useRouter()

  return (
    <div
      onClick={() => router.push(`/products/${product.id}`)}
      className="bg-white rounded-xl shadow-md hover:shadow-lg transition duration-200 p-4 flex flex-col h-full cursor-pointer hover:scale-[1.02]"
    >
      {/* IMAGE */}
      <div className="relative w-full h-48 mb-3">
      <Image
  src={product.image ?? "/images/placeholder.jpg"}
  alt={product.name}
  fill
  className="object-cover rounded-lg"
/>
          className="object-cover rounded-lg"
        />
      </div>

      {/* CONTENT */}
      <div className="flex flex-col flex-grow">
        <h2 className="font-semibold text-lg text-gray-900 line-clamp-2 min-h-[48px]">
          {product.name}
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          {product.category}
        </p>

        <p className="mt-2 font-bold text-blue-600">
          ${product.price.toFixed(2)}
        </p>

        <div className="mt-auto pt-4">
          <button
            onClick={(e) => {
              e.stopPropagation()
              router.push(`/products/${product.id}`)
            }}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Learn More
          </button>
        </div>
      </div>
    </div>
  )
}
