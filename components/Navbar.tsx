"use client"

import Link from "next/link"
import { useAuth } from "@/context/AuthContext"
import { useCart } from "@/context/CartContext"

export default function Navbar() {
  const { user, logout } = useAuth()
  const { cart } = useCart()

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center text-green-600">
      <Link href="/" className="text-2xl font-bold">
        Health & Wellness
      </Link>

      <div className="flex items-center gap-6 text-gray-700">
        {user && (
          <>
            <span className="font-medium">Hello, {user.name}</span>
            <Link href="/products" className="hover:text-green-600 transition-colors">
              Products
            </Link>
            <Link href="/quiz" className="hover:text-green-600 transition-colors">
              Quiz
            </Link>
            <Link href="/subscriptions" className="hover:text-green-600 transition-colors">
              Subscriptions
            </Link>
            <Link href="/blog" className="hover:text-green-600 transition-colors">
              Blog
            </Link>
            <Link href="/cart" className="hover:text-green-600">
              Cart ({cartCount})
            </Link>
            <button
              onClick={logout}
              className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </>
        )}

        {!user && (
          <Link
            href="/login"
            className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700 transition-colors"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  )
}