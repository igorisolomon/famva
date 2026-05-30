"use client"

import { useEffect, useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { ArrowRight, CheckCircle2, XCircle, Loader2 } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

type VerifyState = "verifying" | "success" | "error" | "expired"

function EmailVerifiedContent() {
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  const [state, setState] = useState<VerifyState>("verifying")
  const [errorMsg, setErrorMsg] = useState("")

  useEffect(() => {
    if (!token) {
      setState("error")
      setErrorMsg("No verification token was provided.")
      return
    }

    async function verify() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify-email/${token}`)
        const data = await res.json()

        console.log(res)

        if (res.ok) {
          setState("success")
        } else if (res.status === 410 || data?.code === "TOKEN_EXPIRED" || data?.message?.toLowerCase().includes("expired")) {
          setState("expired")
          setErrorMsg("This verification link has expired. Please request a new one.")
        } else {
          setState("error")
          setErrorMsg(data?.message || "Verification failed. The link may be invalid.")
        }
      } catch {
        setState("error")
        setErrorMsg("Something went wrong. Please check your connection and try again.")
      }
    }

    verify()
  }, [token])

  return (
    <>
      <Navbar />
      <main className="flex flex-col">
        <section className="bg-background flex-1 flex items-center justify-center pt-32 pb-16">
          <div className="w-full max-w-md px-6">
              {state === "verifying" && (
                <div className="bg-white rounded-[16px] border border-[#e0e0e8] shadow-sm p-10 text-center flex flex-col items-center gap-5">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <Loader2 size={32} className="text-primary animate-spin" />
                  </div>
                  <div>
                    <h1 className="font-serif font-bold text-2xl text-primary mb-2">
                      Verifying your email…
                    </h1>
                    <p className="font-sans text-sm text-primary/65 leading-relaxed">
                      Please wait while we confirm your email address.
                    </p>
                  </div>
                </div>
              )}

              {state === "success" && (
                <div className="bg-white rounded-[16px] border border-[#e0e0e8] shadow-sm p-10 text-center flex flex-col items-center gap-5">
                  <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center">
                    <CheckCircle2 size={32} className="text-secondary" />
                  </div>
                  <div>
                    <h1 className="font-serif font-bold text-2xl text-primary mb-2">
                      Email verified!
                    </h1>
                    <p className="font-sans text-sm text-primary/65 leading-relaxed max-w-xs mx-auto">
                      Your email address has been confirmed. You're all set to use Famva.
                    </p>
                  </div>
                  <Link
                    href="/"
                    className="inline-flex items-center gap-2 font-sans font-semibold text-sm text-secondary hover:text-[#D9246E] transition-colors"
                  >
                    Go to home
                    <ArrowRight size={15} />
                  </Link>
                </div>
              )}

              {(state === "expired" || state === "error") && (
                <div className="bg-white rounded-[16px] border border-[#e0e0e8] shadow-sm p-10 text-center flex flex-col items-center gap-5">
                  <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center">
                    <XCircle size={32} className="text-red-500" />
                  </div>
                  <div>
                    <h1 className="font-serif font-bold text-2xl text-primary mb-2">
                      {state === "expired" ? "Link expired" : "Verification failed"}
                    </h1>
                    <p className="font-sans text-sm text-primary/65 leading-relaxed max-w-xs mx-auto">
                      {errorMsg}
                    </p>
                  </div>
                  <Link
                    href="/"
                    className="inline-flex items-center gap-2 font-sans font-semibold text-sm text-secondary hover:text-[#D9246E] transition-colors"
                  >
                    Back to home
                    <ArrowRight size={15} />
                  </Link>
                </div>
              )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default function EmailVerifiedPage() {
  return (
    <Suspense
      fallback={
        <>
          <Navbar />
          <main className="flex flex-col">
            <section className="bg-background flex-1 flex items-center justify-center pt-32 pb-16">
              <div className="w-full max-w-md px-6">
                <div className="bg-white rounded-[16px] border border-[#e0e0e8] shadow-sm p-10 text-center flex flex-col items-center gap-5">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <Loader2 size={32} className="text-primary animate-spin" />
                  </div>
                  <div>
                    <h1 className="font-serif font-bold text-2xl text-primary mb-2">
                      Verifying your email…
                    </h1>
                    <p className="font-sans text-sm text-primary/65 leading-relaxed">
                      Please wait while we confirm your email address.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </main>
          <Footer />
        </>
      }
    >
      <EmailVerifiedContent />
    </Suspense>
  )
}
