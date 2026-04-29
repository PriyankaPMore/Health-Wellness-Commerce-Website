"use client"

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react"

import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"

type AuthContextType = {
  user: any
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(
  undefined
)

export const AuthProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const router = useRouter()

  // -----------------------------
  // LOAD USER SESSION ON START
  // -----------------------------
  useEffect(() => {
    const getUser = async () => {
      setLoading(true)

      const {
        data: { user },
      } = await supabase.auth.getUser()

      setUser(user ?? null)

      setLoading(false)
    }

    getUser()

    // Listen for auth changes (login/logout)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null)
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  // -----------------------------
  // LOGIN
  // -----------------------------
  const login = async (email: string, password: string) => {
    const { error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      })

    if (error) {
      alert(error.message)
      return
    }

    router.push("/")
  }

  // -----------------------------
  // REGISTER
  // -----------------------------
  const register = async (
    email: string,
    password: string
  ) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      alert(error.message)
      return
    }

    alert("Check your email to confirm account")
  }

  // -----------------------------
  // LOGOUT
  // -----------------------------
  const logout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    router.push("/login")
  }

  // -----------------------------
  // LOADING STATE PREVENTS UI BREAKS
  // -----------------------------
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    )
  }

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error(
      "useAuth must be used within AuthProvider"
    )
  }

  return context
}