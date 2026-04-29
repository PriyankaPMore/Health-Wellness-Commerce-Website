"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { Product } from "@/types/product"

import ProductGrid from "@/components/ProductGrid"
import Categories from "@/components/Categories"
import SearchBar from "@/components/SearchBar"

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [category, setCategory] = useState("All")
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)

  const searchParams = useSearchParams()

  useEffect(() => {
    fetchProducts()
  }, [])

  useEffect(() => {
    const cat = searchParams.get("category")
    if (cat) setCategory(cat)
  }, [searchParams])

  async function fetchProducts() {
    const { data } = await supabase
      .from("products")
      .select("*")

    setProducts(data || [])
    setLoading(false)
  }

  const categories = [
    "All",
    "Protein",
    "Vitamins",
    "Minerals",
    "Probiotics",
    "Herbal Supplements",
    "Performance",
    "Hydration",
    "Weight Management",
  ]

  const filteredProducts = products.filter((p) => {
    const matchCategory =
      category === "All" || p.category === category

    const matchSearch = p.name
      .toLowerCase()
      .includes(search.toLowerCase())

    return matchCategory && matchSearch
  })

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-6">

        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          All Products
        </h1>

        <SearchBar value={search} onChange={setSearch} />

        <Categories
          categories={categories}
          selected={category}
          onSelect={setCategory}
        />

        {loading ? (
          <p className="text-gray-500 mt-6">
            Loading products...
          </p>
        ) : (
          <ProductGrid products={filteredProducts} />
        )}

      </div>
    </div>
  )
}