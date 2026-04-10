"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

type FormState = "idle" | "submitting" | "success" | "error"

const benefits = [
  "Free access during the entire beta period",
  "Be first to try AI-powered Nigerian wellness plans",
  "Shape the product with your feedback",
  "Priority support when we launch",
]

export default function WaitlistPage() {
  const [form, setForm] = useState({ name: "", email: "", role: "", location: "" })
  const [state, setState] = useState<FormState>("idle")
  const [errorMsg, setErrorMsg] = useState("")

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name.trim() || !form.email.trim()) {
      setErrorMsg("Please fill in your name and email.")
      return
    }
    setState("submitting")
    setErrorMsg("")

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error("Failed")
      setState("success")
    } catch {
      setState("error")
      setErrorMsg("Something went wrong. Please try again.")
    }
  }

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-background pt-32 pb-20 md:pb-24">
          <div className="max-w-6xl mx-auto px-6 lg:px-10 relative">
            <div className="max-w-2xl mx-auto text-center">
              <p className="font-sans text-sm font-semibold text-secondary uppercase tracking-widest mb-4">Early Access</p>
              <h1 className="font-serif font-bold text-4xl lg:text-5xl text-balance leading-tight">
                Be the first to experience{" "}
                <span className="text-secondary">Famva.</span>
              </h1>
              <p className="mt-5 font-sans text-lg text-foreground/70 leading-relaxed">
                Join our waitlist and get free access during beta. Help us build the wellness platform Nigerian diaspora families have always needed.
              </p>
            </div>
          </div>
        </section>

        {/* Form + Benefits */}
        <section className="bg-background pb-16">
          <div className="max-w-5xl mx-auto px-6 lg:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

              {/* Benefits */}
              <div>
                <p className="font-sans text-sm font-semibold text-secondary uppercase tracking-widest mb-4">Why join early?</p>
                <h2 className="font-serif font-bold text-2xl lg:text-3xl text-primary text-balance leading-tight mb-6">
                  Early adopters get more.
                </h2>
                <ul className="flex flex-col gap-4 mb-10" role="list">
                  {benefits.map((b) => (
                    <li key={b} className="flex items-start gap-3">
                      <CheckCircle2 size={18} className="text-secondary mt-0.5 shrink-0" />
                      <span className="font-sans text-sm text-primary/80 leading-relaxed">{b}</span>
                    </li>
                  ))}
                </ul>

                {/* Social proof */}
                <div className="bg-primary rounded-lg p-6">
                  <p className="font-serif font-semibold text-base text-white mb-1">Wellbeing Beyond Borders</p>
                  <p className="font-sans text-sm text-white/60 leading-relaxed">
                    Famva is designed for UK Nigerian families — culturally intelligent, accessible, and built to close the care gap that money alone cannot fix.
                  </p>
                  <div className="mt-5 flex items-center gap-3">
                    <div className="flex -space-x-2">
                      {["CO", "NA", "ET", "AB"].map((initials) => (
                        <div
                          key={initials}
                          className="w-8 h-8 rounded-full bg-secondary/20 border-2 border-primary flex items-center justify-center"
                          aria-hidden="true"
                        >
                          <span className="font-serif font-bold text-[10px] text-secondary">{initials}</span>
                        </div>
                      ))}
                    </div>
                    <p className="font-sans text-xs text-white/60">
                      <span className="font-semibold text-white">500+</span> families already waiting
                    </p>
                  </div>
                </div>
              </div>

              {/* Form */}
              <div>
                {state === "success" ? (
                  <div className="bg-white rounded-[16px] border border-[#e0e0e8] shadow-sm p-10 text-center flex flex-col items-center gap-5">
                    <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center">
                      <CheckCircle2 size={32} className="text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-2xl text-primary mb-2">
                        You&apos;re on the list!
                      </h3>
                      <p className="font-sans text-sm text-primary/65 leading-relaxed max-w-xs mx-auto">
                        Thank you, {form.name}. We&apos;ll be in touch as soon as Famva is ready for early access. Watch your inbox.
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
                ) : (
                  <div className="bg-white rounded-[16px] border border-[#e0e0e8] shadow-sm p-8">
                    <h3 className="font-serif font-semibold text-xl text-primary mb-1">Join the Waitlist</h3>
                    <p className="font-sans text-sm text-primary/55 mb-7">Free during beta. No credit card required.</p>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
                      {/* Name */}
                      <div>
                        <label htmlFor="name" className="block font-sans text-sm font-medium text-primary mb-1.5">
                          Full Name <span className="text-secondary" aria-hidden="true">*</span>
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          autoComplete="name"
                          required
                          value={form.name}
                          onChange={handleChange}
                          placeholder="e.g. Chidera Okafor"
                          className="w-full h-11 px-4 rounded-md border border-[#e0e0e8] bg-background font-sans text-sm text-primary placeholder:text-primary/30 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition"
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label htmlFor="email" className="block font-sans text-sm font-medium text-primary mb-1.5">
                          Email Address <span className="text-secondary" aria-hidden="true">*</span>
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          required
                          value={form.email}
                          onChange={handleChange}
                          placeholder="you@example.com"
                          className="w-full h-11 px-4 rounded-md border border-[#e0e0e8] bg-background font-sans text-sm text-primary placeholder:text-primary/30 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition"
                        />
                      </div>

                      {/* Role */}
                      <div>
                        <label htmlFor="role" className="block font-sans text-sm font-medium text-primary mb-1.5">
                          I am a...
                        </label>
                        <select
                          id="role"
                          name="role"
                          value={form.role}
                          onChange={handleChange}
                          className="w-full h-11 px-4 rounded-md border border-[#e0e0e8] bg-background font-sans text-sm text-primary focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition appearance-none cursor-pointer"
                        >
                          <option value="">Select your role</option>
                          <option value="uk_sponsor">UK-based family member (sponsor)</option>
                          <option value="elderly_user">Elderly parent in Nigeria</option>
                          <option value="local_helper">Local family helper in Nigeria</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      {/* Location */}
                      <div>
                        <label htmlFor="location" className="block font-sans text-sm font-medium text-primary mb-1.5">
                          City / Location (UK)
                        </label>
                        <input
                          id="location"
                          name="location"
                          type="text"
                          autoComplete="address-level2"
                          value={form.location}
                          onChange={handleChange}
                          placeholder="e.g. Manchester"
                          className="w-full h-11 px-4 rounded-md border border-[#e0e0e8] bg-background font-sans text-sm text-primary placeholder:text-primary/30 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition"
                        />
                      </div>

                      {/* Error */}
                      {(state === "error" || errorMsg) && (
                        <p className="font-sans text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-4 py-2.5" role="alert">
                          {errorMsg || "Something went wrong. Please try again."}
                        </p>
                      )}

                      {/* Submit */}
                      <button
                        type="submit"
                        disabled={state === "submitting"}
                        className="w-full h-12 rounded-md bg-secondary text-white font-sans font-semibold text-sm hover:bg-[#D9246E] disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center gap-2"
                      >
                        {state === "submitting" ? (
                          <>
                            <Loader2 size={16} className="animate-spin" />
                            Joining...
                          </>
                        ) : (
                          <>
                            Join the Waitlist
                            <ArrowRight size={16} />
                          </>
                        )}
                      </button>

                      <p className="font-sans text-xs text-primary/45 text-center leading-relaxed">
                        By joining, you agree to receive updates from Famva. We will never spam you or share your details.
                      </p>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
