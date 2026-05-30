"use client"

import { createContext, useContext, useEffect } from "react"

const RecaptchaContext = createContext<{
  execute: (action: string) => Promise<string>
} | null>(null)

export function RecaptchaProvider({ children }: { children: React.ReactNode }) {
  const siteKey = "6LfGNwQtAAAAAOim8gArPQ2J2rTbLx-C35btaErL"

  useEffect(() => {
    const script = document.createElement("script")
    script.src = `https://www.google.com/recaptcha/enterprise.js?render=${siteKey}`
    script.async = true
    document.head.appendChild(script)
    return () => { document.head.removeChild(script) }
  }, [siteKey])

  const execute = (action: string): Promise<string> =>
    new Promise((resolve, reject) => {
      ;(window as any).grecaptcha?.enterprise.ready(async () => {
        try {
          const token = await (window as any).grecaptcha.enterprise.execute(siteKey, { action })
          resolve(token)
        } catch (err) {
          reject(err)
        }
      })
    })

  return (
    <RecaptchaContext.Provider value={{ execute }}>
      {children}
    </RecaptchaContext.Provider>
  )
}

export function useRecaptcha() {
  const ctx = useContext(RecaptchaContext)
  if (!ctx) throw new Error("useRecaptcha must be used within RecaptchaProvider")
  return ctx
}
