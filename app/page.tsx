"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { Product } from "@/types/product"

import Hero from "@/components/Hero"
import CategorySection from "@/components/CategorySection"
import ProductGrid from "@/components/ProductGrid"
import TrustSection from "@/components/TrustSection"
import Footer from "@/components/Footer"

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  const router = useRouter()

  useEffect(() => {
    fetchProducts()
  }, [])

  async function fetchProducts() {
    const { data } = await supabase
      .from("products")
      .select("*")

    setProducts(data || [])
    setLoading(false)
  }

  const featuredProducts = [...products]
    .sort(() => 0.5 - Math.random())
    .slice(0, 4)

  return (
    <div className="bg-gray-100 min-h-screen text-gray-800 font-sans">

      <div className="max-w-7xl mx-auto px-6 py-6">

        {/* HERO */}
        <Hero />

        {/* CATEGORY GRID */}
        <CategorySection />

        {/* FEATURED PRODUCTS */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold mb-6">
            Featured Products
          </h2>

          {loading ? (
            <p>Loading products...</p>
          ) : (
            <ProductGrid products={featuredProducts} />
          )}

          {/* VIEW ALL BUTTON */}
          <div className="mt-6 text-center">
            <button
              onClick={() => router.push("/products")}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              View All Products
            </button>
          </div>
        </section>

        {/* TRUST */}
        <TrustSection />

      </div>

      <Footer />
    </div>
  )
}