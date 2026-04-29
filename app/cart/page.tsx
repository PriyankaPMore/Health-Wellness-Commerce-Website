"use client"

import { useRouter } from "next/navigation"
import { useCart } from "@/context/CartContext"

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useCart()
  const router = useRouter()

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="max-w-5xl mx-auto p-8">

      <h1 className="text-2xl font-bold mb-6">
        Your Cart
      </h1>

      {/* EMPTY STATE */}
      {cart.length === 0 && (
        <p className="text-gray-500">Cart is empty</p>
      )}

      {/* CART ITEMS */}
      {cart.map((item) => (
        <div
          key={`${item.productId}-${item.plan}`}
          className="flex justify-between border-b py-4"
        >
          <div>
            <p className="font-semibold">
              Product #{item.productId}
            </p>

            <p className="text-sm text-gray-500">
              Plan: {item.plan}
            </p>

            {/* QUANTITY CONTROLS */}
            <div className="flex gap-2 mt-2 items-center">

              <button
                onClick={() =>
                  updateQuantity(
                    item.productId,
                    item.quantity - 1
                  )
                }
                className="px-2 border"
              >
                -
              </button>

              <span>{item.quantity}</span>

              <button
                onClick={() =>
                  updateQuantity(
                    item.productId,
                    item.quantity + 1
                  )
                }
                className="px-2 border"
              >
                +
              </button>

            </div>
          </div>

          {/* REMOVE */}
          <button
            onClick={() => removeFromCart(item.productId)}
            className="text-red-500"
          >
            Remove
          </button>
        </div>
      ))}

      {/* CHECKOUT */}
      {cart.length > 0 && (
        <div className="mt-10 border-t pt-6">

          <button
            onClick={() => router.push("/checkout")}
            className="w-full bg-blue-600 text-white py-3 rounded-lg"
          >
            Proceed to Checkout ({totalItems})
          </button>

        </div>
      )}

    </div>
  )
}
