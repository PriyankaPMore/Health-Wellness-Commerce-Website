"use client"

import { useRouter } from "next/navigation"

export default function CategorySection() {
  const router = useRouter()

  const categories = [
    "Protein",
    "Vitamins",
    "Minerals",
    "Probiotics",
    "Herbal Supplements",
    "Performance",
  ]

  function handleClick(category: string) {
    router.push(`/products?category=${encodeURIComponent(category)}`)
  }

  return (
    <section id="categories" className="mb-12">
      <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleClick(cat)}
            className="bg-white rounded-xl p-6 shadow hover:shadow-md transition text-center"
          >
            {cat}
          </button>
        ))}
      </div>
    </section>
  )
}