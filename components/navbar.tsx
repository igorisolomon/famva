"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import Image from "next/image"

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/#features", label: "Features" },
  { href: "/#stories", label: "Stories" },
]

export default function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/15 backdrop-blur-sm border-b border-white/10">
      <nav className="max-w-6xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image src="/logo-dark.png" alt="Famva logo" width={135} height={40}/>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8" role="list">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`font-sans text-sm font-medium transition-colors duration-200 ${
                  pathname === href
                    ? "text-secondary"
                    : "text-famva-black hover:text-gray-500"
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden md:block">
          <Link
            href="/waitlist"
            className="inline-flex items-center justify-center px-5 py-2 rounded-md bg-primary text-white font-sans font-semibold text-sm hover:bg-[#D9246E] transition-colors duration-200"
          >
            Join the Waitlist
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          className="md:hidden text-primary p-1"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-primary px-6 py-6 flex flex-col gap-5">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setIsOpen(false)}
              className={`font-sans text-base font-medium transition-colors duration-200 ${
                pathname === href ? "text-secondary" : "text-white/70 hover:text-white"
              }`}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/waitlist"
            onClick={() => setIsOpen(false)}
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-md bg-secondary text-white font-sans font-semibold text-sm hover:bg-[#D9246E] transition-colors duration-200 w-full text-center"
          >
            Join the Waitlist
          </Link>
        </div>
      )}
    </header>
  )
}
