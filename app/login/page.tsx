"use client"

import { useState } from "react"
import { useAuth } from "@/context/AuthContext"

export default function LoginPage() {
  const { login, register } = useAuth()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [mode, setMode] = useState<"login" | "register">("login")

  const handleSubmit = () => {
  if (!email || !password) return

  if (mode === "login") {
    login(email, password)
  } else {
    register(email, password)
  }
}

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">

      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">

        {/* HEADER */}
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Health & Wellness
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-6">
          {mode === "login"
            ? "Welcome back 👋"
            : "Create your account"}
        </p>

        {/* EMAIL */}
        <input
          className="w-full border rounded-lg p-3 mb-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* PASSWORD */}
        <input
          type="password"
          className="w-full border rounded-lg p-3 mb-5 focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* BUTTON */}
        <button
          onClick={handleSubmit}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium transition"
        >
          {mode === "login" ? "Login" : "Create Account"}
        </button>

        {/* SWITCH MODE */}
        <p
          className="text-center text-sm mt-4 text-blue-600 cursor-pointer"
          onClick={() =>
            setMode(mode === "login" ? "register" : "login")
          }
        >
          {mode === "login"
            ? "Don't have an account? Create one"
            : "Already have an account? Login"}
        </p>

      </div>

    </div>
  )
}