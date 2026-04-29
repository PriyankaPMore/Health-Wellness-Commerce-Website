"use client"

import { useCart } from "@/context/CartContext"

type Props = {
  recommendedStack: { name: string; price: number; image: string }[]
}

export default function QuizResult({ recommendedStack }: Props) {
  const { addToCart } = useCart()

  const handleAddStack = () => {
    recommendedStack.forEach((product) => {
      addToCart(product.id, "one-time", 1) // cast as Product type if needed
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-6 text-gray-700">
      <h2 className="text-2xl font-bold mb-4">Your Recommended Stack</h2>

      <ul className="space-y-2">
        {recommendedStack.map((item, index) => (
          <li key={index} className="flex justify-between">
            <span>{item.name}</span>
            <span>${item.price.toFixed(2)}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={handleAddStack}
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
      >
        Add Stack to Cart
      </button>
    </div>
  )
}
