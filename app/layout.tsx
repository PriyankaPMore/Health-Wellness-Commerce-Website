import "./globals.css"
import { ReactNode } from "react"
import { AuthProvider } from "@/context/AuthContext"
import { CartProvider } from "@/context/CartContext"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

export const metadata = {
  title: "Health & Wellness Platform",
  description: "E-commerce platform",
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-800">

        <AuthProvider>
          <CartProvider>

            {/* ALWAYS visible layout */}
            <Navbar />

            <main className="min-h-screen container mx-auto px-6 py-8">
              {children}
            </main>

            <Footer />

          </CartProvider>
        </AuthProvider>

      </body>
    </html>
  )
}