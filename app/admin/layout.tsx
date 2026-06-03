"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { LayoutDashboard, Users, Activity, FileText, Sparkles, LogOut, Menu } from "lucide-react"
import { Toaster } from "sonner"
import { cn } from "@/lib/utils"

const NAV = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/system", label: "System", icon: Activity },
  { href: "/admin/system/audit-logs", label: "Audit Logs", icon: FileText },
  { href: "/admin/ai", label: "AI Plans", icon: Sparkles },
]

function Sidebar({
  pathname,
  onClose,
  onLogout,
}: {
  pathname: string
  onClose?: () => void
  onLogout: () => void
}) {
  return (
    <aside className="h-full w-[240px] flex flex-col bg-[#2B0F4F] flex-shrink-0">
      <div className="flex items-center gap-3 px-5 py-5 border-b border-white/10">
        <Image src="/logo-icon.png" alt="Famva" width={30} height={30} />
        <span className="font-serif font-bold text-white text-lg">Famva</span>
        <span className="ml-auto text-[10px] bg-[#FF2E83]/20 text-[#FF2E83] px-2 py-0.5 rounded-full font-sans font-semibold tracking-wide">
          ADMIN
        </span>
      </div>

      <nav className="flex-1 p-3 flex flex-col gap-0.5 overflow-y-auto">
        {NAV.map(({ href, label, icon: Icon }) => {
          const active = pathname === href
          return (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-sans font-medium transition-colors",
                active
                  ? "bg-[#FF2E83]/15 text-white border-l-2 border-[#FF2E83] pl-[10px]"
                  : "text-white/60 hover:text-white hover:bg-white/[0.06]"
              )}
            >
              <Icon size={16} className={active ? "text-[#FF2E83]" : ""} />
              {label}
            </Link>
          )
        })}
      </nav>

      <div className="p-3 border-t border-white/10">
        <button
          onClick={onLogout}
          className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-sm font-sans font-medium text-white/50 hover:text-white hover:bg-white/[0.06] transition-colors"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </aside>
  )
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [ready, setReady] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const isLoginPage = pathname === "/admin/login"

  useEffect(() => {
    if (isLoginPage) {
      setReady(true)
      return
    }
    const token = localStorage.getItem("admin_token")
    if (!token) {
      router.replace("/admin/login")
    } else {
      setReady(true)
    }
  }, [isLoginPage, router])

  function logout() {
    localStorage.removeItem("admin_token")
    localStorage.removeItem("admin_refresh_token")
    router.replace("/admin/login")
  }

  if (!ready) return null
  if (isLoginPage) return <>{children}</>

  return (
    <div className="flex h-screen bg-[#F2F2F2] overflow-hidden">
      {/* Desktop sidebar */}
      <div className="hidden md:flex h-full">
        <Sidebar pathname={pathname} onLogout={logout} />
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
          <div className="relative h-full w-fit">
            <Sidebar pathname={pathname} onClose={() => setMobileOpen(false)} onLogout={logout} />
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile topbar */}
        <div className="md:hidden flex items-center gap-3 px-4 h-14 bg-white border-b border-[#e0e0e8] flex-shrink-0">
          <button onClick={() => setMobileOpen(true)} className="text-[#2B0F4F] p-1">
            <Menu size={20} />
          </button>
          <span className="font-serif font-bold text-[#2B0F4F] text-base">Famva Admin</span>
        </div>

        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>

      <Toaster richColors position="top-right" />
    </div>
  )
}
