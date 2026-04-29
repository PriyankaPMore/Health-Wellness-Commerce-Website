export type Product = {
  id: number
  name: string
  description: string
  price: number
  image: string
}

export const products: Product[] = [
  {
    id: "1",
    name: "Magnesium Glycinate",
    description: "Supports sleep, relaxation, and muscle recovery.",
    price: 24.99,
    image: "/images/magnesium.jpg"
  },
  {
    id: "2",
    name: "Vitamin D3",
    description: "Supports immunity and bone health.",
    price: 19.99,
    image: "/images/vitamin-d.jpg"
  },
  {
    id: "3",
    name: "Omega 3 Fish Oil",
    description: "Supports heart and brain health.",
    price: 29.99,
    image: "/images/omega.jpg"
  }
]
