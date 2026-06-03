"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type FormState = "idle" | "loading" | "error"

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [formState, setFormState] = useState<FormState>("idle")
  const [errorMsg, setErrorMsg] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setFormState("loading")
    setErrorMsg("")

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        setFormState("error")
        setErrorMsg(data?.message || "Invalid credentials. Please try again.")
        return
      }

      if (data?.data?.user?.role !== "admin") {
        setFormState("error")
        setErrorMsg("Access denied. This portal is restricted to administrators.")
        return
      }

      if (typeof window !== "undefined") {
        localStorage.setItem("admin_token", data.token)
        localStorage.setItem("admin_refresh_token", data.refreshToken)
      }

      router.push("/admin/dashboard")
    } catch {
      setFormState("error")
      setErrorMsg("Something went wrong. Please check your connection and try again.")
    }
  }

  const isLoading = formState === "loading"
  const isDisabled = isLoading || !email.trim() || !password.trim()

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo / Brand */}
        <div className="flex flex-col items-center mb-8 gap-3">
          <Link href="/">
            <div className="rounded-[16px] bg-transparent flex items-center justify-center">
              <Image src="/logo-icon.png" alt="Famva" width={75} height={75} />
            </div>
          </Link>
          <div className="text-center">
            <h1 className="font-serif font-bold text-2xl text-primary">Famva Admin Portal</h1>
            <p className="font-sans text-sm text-primary/60 mt-1">Sign in to manage Famva</p>
          </div>
        </div>

        {/* Card */}
        <div className="bg-white rounded-[16px] border border-[#e0e0e8] shadow-sm p-8">
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="email"
                className="font-sans text-sm font-medium text-primary"
              >
                Email address
              </label>
              <Input
                id="email"
                type="email"
                placeholder="admin@famva.com"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                className="h-11 text-sm"
                aria-invalid={formState === "error"}
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="password"
                className="font-sans text-sm font-medium text-primary"
              >
                Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  className="h-11 text-sm pr-10"
                  aria-invalid={formState === "error"}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-primary/40 hover:text-primary/70 transition-colors"
                  tabIndex={-1}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Error message */}
            {formState === "error" && errorMsg && (
              <div className="bg-red-50 border border-red-200 rounded-[8px] px-4 py-3">
                <p className="font-sans text-sm text-red-600">{errorMsg}</p>
              </div>
            )}

            {/* Submit */}
            <Button
              type="submit"
              disabled={isDisabled}
              className="h-11 w-full bg-primary hover:bg-[#3D1A6D] text-white font-sans font-semibold text-sm rounded-[8px] transition-colors mt-1"
            >
              {isLoading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Signing in…
                </>
              ) : (
                "Sign in"
              )}
            </Button>
          </form>
        </div>

        <p className="font-sans text-xs text-primary/40 text-center mt-6">
          Famva Admin Portal · Restricted access
        </p>
      </div>
    </div>
  )
}
