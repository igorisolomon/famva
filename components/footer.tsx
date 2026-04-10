import Image from "next/image"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-primary text-white/70 font-sans">
      <div className="max-w-6xl mx-auto px-6 lg:px-10 py-16">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-12">
          {/* Brand */}
          <div className="max-w-xs">
            <Link href="/" className="font-serif font-bold text-2xl text-secondary tracking-tight">
              <Image src="/logo-light.png" alt="Famva logo" width={150} height={50} className="inline-block mr-2" />
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              Wellbeing Beyond Borders. AI-powered wellness intelligence for families separated by distance, not love.
            </p>
          </div>

          {/* Nav links */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-10 text-sm">
            <div>
              <p className="font-semibold text-white mb-3">Product</p>
              <ul className="flex flex-col gap-2.5" role="list">
                <li><Link href="/how-it-works" className="hover:text-secondary transition-colors">How It Works</Link></li>
                <li><Link href="/about" className="hover:text-secondary transition-colors">About Us</Link></li>
                <li><Link href="/waitlist" className="hover:text-secondary transition-colors">Join Waitlist</Link></li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-white mb-3">Company</p>
              <ul className="flex flex-col gap-2.5" role="list">
                <li><Link href="/about" className="hover:text-secondary transition-colors">Our Mission</Link></li>
                <li><a href="mailto:hello@famva.com" className="hover:text-secondary transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-white mb-3">Legal</p>
              <ul className="flex flex-col gap-2.5" role="list">
                <li><span className="text-white/40 cursor-default">Privacy Policy</span></li>
                <li><span className="text-white/40 cursor-default">Terms of Service</span></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <p>&copy; {new Date().getFullYear()} Famva. All rights reserved.</p>
          <p>Built with care for families everywhere.</p>
        </div>
      </div>
    </footer>
  )
}
