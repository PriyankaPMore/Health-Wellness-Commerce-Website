"use client"

import { useAuth } from "@/context/AuthContext"
import { usePathname, useRouter } from "next/navigation"
import { useEffect } from "react"

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, loading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  const publicRoutes = ["/login"]

  useEffect(() => {
    if (!loading && !user && !publicRoutes.includes(pathname)) {
      router.push("/login")
    }
  }, [user, loading, pathname])

  // IMPORTANT: prevent blank screen
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    )
  }

  return <>{children}</>
}