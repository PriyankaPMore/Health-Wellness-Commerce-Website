"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"

export default function Hero() {
  const router = useRouter()

  return (
    <section className="bg-gradient-to-br from-blue-50 to-white rounded-2xl px-8 py-16 mb-10">
      
      <div className="grid md:grid-cols-2 gap-10 items-center">
        
        {/* LEFT CONTENT */}
        <div>
          <p className="text-2xl md:text-xl text-green-700 font-semibold mb-3">
            Premium Wellness Store
          </p>

          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4 text-blue-800">
            Build Your Health <br />
            <span className="text-blue-900">
              One Supplement at a Time
            </span>
          </h1>

          <p className="text-gray-600 mb-6 text-lg">
            Discover scientifically-backed supplements designed to
            support your fitness, immunity, and overall well-being.
          </p>

          {/* CTA Buttons */}
           <div className="flex gap-4">
        <button
          onClick={() => router.push("/products")}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg"
        >
          Shop Now
        </button>

        <button
          onClick={() => {
            document
              .getElementById("categories")
              ?.scrollIntoView({ behavior: "smooth" })
          }}
          className="border px-6 py-3 rounded-lg"
        >
          Explore Categories
        </button>
      </div>

          {/* Trust Indicators */}
          <div className="flex gap-6 mt-8 text-sm text-gray-500">
            <span>✔ 100+ Products</span>
            <span>✔ Trusted Brands</span>
            <span>✔ Fast Delivery</span>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative w-full h-[400px]">
          <Image
            src="/images/Logo.jpg"
            alt="Supplements"
            fill
            className="object-cover rounded-xl shadow-lg"
            priority
          />
        </div>

      </div>
    </section>
  )
}