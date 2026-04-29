"use client"

import { useState } from "react"
import { useCart } from "@/context/CartContext"
import CheckoutSteps from "@/components/CheckoutSteps"

export default function CheckoutPage() {
  const { cart } = useCart()

  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [loading, setLoading] = useState(false)

  // SHIPPING (LOCAL ONLY)
  const [address, setAddress] = useState("")
  const [shippingMethod, setShippingMethod] =
    useState<"standard" | "express">("standard")

  const nextStep = () =>
    setStep((prev) => (prev + 1) as 1 | 2 | 3)

  // -------------------------
  // PRICING (TEMP)
  // -------------------------
  const subtotal = cart.reduce((sum, item) => {
    const price = 10
    return sum + price * item.quantity
  }, 0)

  const shippingCost =
    shippingMethod === "express" ? 15 : 5

  const total = subtotal + shippingCost

  // -------------------------
  // STRIPE CHECKOUT
  // -------------------------
  const handlePayNow = async () => {
    try {
      setLoading(true)

      const payload = cart.map((item) => ({
        name: `Product ${item.productId}`,
        price: 10,
        quantity: item.quantity,
      }))

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cart: payload }),
      })

      const data = await res.json()

      if (!res.ok) throw new Error(data.error)

      window.location.href = data.url
    } catch (err) {
      console.error(err)
      alert("Checkout failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-8">

      {/* STEP INDICATOR */}
      <CheckoutSteps step={step} />

      {/* ===================== */}
      {/* STEP 1 - REVIEW CART */}
      {/* ===================== */}
      {step === 1 && (
        <div>
          <h2 className="text-xl font-bold mb-4">
            Review Cart
          </h2>

          <div className="border p-4 rounded space-y-2">
            {cart.map((item) => (
              <div
                key={`${item.productId}-${item.plan}`}
                className="flex justify-between"
              >
                <span>
                  Product #{item.productId} × {item.quantity}
                </span>

                <span>
                  ${(10 * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-4 font-semibold">
            Subtotal: ${subtotal.toFixed(2)}
          </div>

          <button
            onClick={nextStep}
            className="mt-6 bg-blue-600 text-white px-6 py-2 rounded"
          >
            Continue
          </button>
        </div>
      )}

      {/* ===================== */}
      {/* STEP 2 - SHIPPING (UI ONLY) */}
      {/* ===================== */}
      {step === 2 && (
        <div>
          <h2 className="text-xl font-bold mb-4">
            Shipping Details
          </h2>

          {/* ADDRESS */}
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter shipping address"
            className="w-full border p-2 rounded mb-4"
          />

          {/* METHOD */}
          <select
            value={shippingMethod}
            onChange={(e) =>
              setShippingMethod(
                e.target.value as "standard" | "express"
              )
            }
            className="w-full border p-2 rounded"
          >
            <option value="standard">
              Standard ($5)
            </option>
            <option value="express">
              Express ($15)
            </option>
          </select>

          <button
            onClick={nextStep}
            className="mt-6 bg-blue-600 text-white px-6 py-2 rounded"
          >
            Continue to Payment
          </button>
        </div>
      )}

      {/* ===================== */}
      {/* STEP 3 - PAYMENT */}
      {/* ===================== */}
      {step === 3 && (
        <div>
          <h2 className="text-xl font-bold mb-4">
            Order Summary
          </h2>

          <div className="border p-4 rounded space-y-2">
            <div className="flex justify-between">
              <span>Items</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>
              <span>${shippingCost.toFixed(2)}</span>
            </div>

            <div className="flex justify-between font-bold border-t pt-2">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={handlePayNow}
            disabled={loading}
            className="w-full mt-6 bg-green-600 text-white py-3 rounded-lg"
          >
            {loading ? "Processing..." : "Pay Now"}
          </button>
        </div>
      )}

    </div>
  )
}