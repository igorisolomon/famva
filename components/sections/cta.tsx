import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function CtaSection() {
  return (
    <section className="bg-secondary py-20 md:py-28">
      <div className="max-w-3xl mx-auto px-6 lg:px-10 text-center">
        <h2 className="font-serif font-bold text-3xl lg:text-5xl text-white text-balance leading-tight">
          Your parent deserves daily care. You deserve peace of mind.
        </h2>
        <p className="mt-5 font-sans text-base text-white/80 leading-relaxed max-w-xl mx-auto">
          Join our waitlist today. Be among the first families to experience Famva — free during our beta launch.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/waitlist"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-md bg-white text-secondary font-sans font-bold text-sm hover:bg-[#F2F2F2] transition-colors duration-200 w-full sm:w-auto"
          >
            Join the Waitlist
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}
