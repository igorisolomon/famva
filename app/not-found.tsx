import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import Link from "next/link"

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="min-h-[80vh] flex items-center justify-center bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-wider text-secondary bg-secondary/10 rounded-full uppercase">
            404 Error
          </span>
          <h1 className="font-serif font-bold text-8xl lg:text-9xl text-primary">
            404
          </h1>
          <h2 className="mt-4 font-serif font-bold text-2xl lg:text-3xl text-primary">
            Page Not Found
          </h2>
          <p className="mt-4 text-lg text-primary/70 leading-relaxed max-w-md mx-auto">
            We couldn't find the page you're looking for. It may have been moved or no longer exists.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-secondary text-white font-semibold rounded-full hover:bg-secondary/90 transition-colors"
            >
              Go Home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
