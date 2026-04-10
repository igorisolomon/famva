import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Clock, ChevronLeft, ChevronRight } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { blogPosts, POSTS_PER_PAGE } from "@/lib/blog-data"

interface BlogPageProps {
  searchParams: Promise<{ page?: string }>
}

export const metadata = {
  title: "Blog — Famva",
  description:
    "Health insights, caregiving guidance, and stories for UK Nigerian families caring for elderly parents back home.",
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { page } = await searchParams
  const currentPage = Math.max(1, parseInt(page ?? "1", 10))

  const featured = blogPosts.find((p) => p.featured)!
  const allOthers = blogPosts.filter((p) => !p.featured)
  const totalPages = Math.ceil(allOthers.length / POSTS_PER_PAGE)
  const paginatedPosts = allOthers.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  )

  const categories = Array.from(new Set(blogPosts.map((p) => p.category)))

  return (
    <>
      <Navbar />
      <main>
        {/* ── Page Header ─────────────────────────────────────── */}
        <section className="bg-primary pt-32 pb-16">
          <div className="max-w-6xl mx-auto px-6 lg:px-10">
            <div className="max-w-2xl">
              <p className="font-sans text-sm font-semibold text-secondary uppercase tracking-widest mb-4">
                The Famva Blog
              </p>
              <h1 className="font-serif font-bold text-4xl lg:text-5xl text-white text-balance leading-tight">
                Insights for families separated by distance, not love.
              </h1>
              <p className="mt-5 font-sans text-base text-white/60 leading-relaxed max-w-lg">
                Health guidance, caregiving stories, and practical tools for UK Nigerian families caring for elderly parents back home.
              </p>
            </div>

            {/* Category pills */}
            <div className="mt-10 flex flex-wrap gap-2" role="list" aria-label="Blog categories">
              <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-secondary text-white font-sans text-xs font-semibold">
                All
              </span>
              {categories.map((cat) => (
                <span
                  key={cat}
                  className="inline-flex items-center px-4 py-1.5 rounded-full border border-white/20 text-white/60 font-sans text-xs font-medium hover:border-secondary/60 hover:text-secondary transition-colors duration-200 cursor-pointer"
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── Featured Post ────────────────────────────────────── */}
        <section className="bg-white py-16 border-b border-[#e0e0e8]">
          <div className="max-w-6xl mx-auto px-6 lg:px-10">
            <p className="font-sans text-xs font-semibold text-secondary uppercase tracking-widest mb-6">
              Featured Article
            </p>
            <Link
              href={`/blog/${featured.slug}`}
              className="group grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center"
            >
              {/* Image */}
              <div className="relative rounded-[16px] overflow-hidden h-72 lg:h-[400px] shadow-lg shadow-primary/10">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  priority
                />
                <div className="absolute inset-0 bg-primary/15" aria-hidden="true" />
                <span className="absolute top-5 left-5 inline-flex items-center px-3 py-1.5 rounded-full bg-secondary text-white font-sans text-xs font-semibold shadow">
                  Featured
                </span>
              </div>

              {/* Content */}
              <div>
                <span className="inline-block font-sans text-xs font-semibold text-secondary uppercase tracking-widest mb-3">
                  {featured.category}
                </span>
                <h2 className="font-serif font-bold text-2xl lg:text-3xl text-primary text-balance leading-snug group-hover:text-secondary transition-colors duration-200 mb-4">
                  {featured.title}
                </h2>
                <p className="font-sans text-sm text-primary/65 leading-relaxed mb-6">
                  {featured.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0"
                      aria-hidden="true"
                    >
                      <span className="font-serif font-bold text-xs text-secondary">
                        {featured.authorInitials}
                      </span>
                    </div>
                    <div>
                      <p className="font-sans font-semibold text-sm text-primary">
                        {featured.author}
                      </p>
                      <p className="font-sans text-xs text-primary/50">
                        {featured.authorRole}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-primary/40">
                    <div className="flex items-center gap-1.5">
                      <Clock size={13} />
                      <span className="font-sans text-xs">{featured.readTime}</span>
                    </div>
                    <span className="font-sans text-xs">{featured.date}</span>
                  </div>
                </div>

                <div className="mt-6">
                  <span className="inline-flex items-center gap-2 font-sans font-semibold text-sm text-secondary group-hover:gap-3 transition-all duration-200">
                    Read article
                    <ArrowRight size={15} />
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* ── All Posts Grid + Pagination ──────────────────────── */}
        <section className="bg-[#F2F2F2] py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-6 lg:px-10">
            <div className="flex items-center justify-between mb-10">
              <h2 className="font-serif font-bold text-xl text-primary">
                All Articles
                <span className="font-sans font-normal text-sm text-primary/40 ml-2">
                  ({allOthers.length} posts)
                </span>
              </h2>
              {totalPages > 1 && (
                <p className="font-sans text-xs text-primary/50">
                  Page {currentPage} of {totalPages}
                </p>
              )}
            </div>

            {/* Posts grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
              {paginatedPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group bg-white rounded-[16px] overflow-hidden border border-[#e0e0e8] shadow-sm hover:shadow-md hover:border-secondary/30 transition-all duration-300 flex flex-col"
                >
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-primary/10" aria-hidden="true" />
                  </div>
                  <div className="flex flex-col flex-1 p-6">
                    <span className="font-sans text-xs font-semibold text-secondary uppercase tracking-widest mb-2">
                      {post.category}
                    </span>
                    <h3 className="font-serif font-bold text-lg text-primary text-balance leading-snug group-hover:text-secondary transition-colors duration-200 mb-3">
                      {post.title}
                    </h3>
                    <p className="font-sans text-sm text-primary/60 leading-relaxed flex-1 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="mt-5 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div
                          className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0"
                          aria-hidden="true"
                        >
                          <span className="font-serif font-bold text-xs text-secondary">
                            {post.authorInitials}
                          </span>
                        </div>
                        <div>
                          <p className="font-sans font-semibold text-xs text-primary">{post.author}</p>
                          <p className="font-sans text-xs text-primary/40">{post.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 text-primary/40">
                        <Clock size={12} />
                        <span className="font-sans text-xs">{post.readTime}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <nav
                className="mt-12 flex items-center justify-center gap-2"
                aria-label="Blog pagination"
              >
                {currentPage > 1 ? (
                  <Link
                    href={`/blog?page=${currentPage - 1}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-[8px] border border-[#e0e0e8] bg-white text-primary font-sans text-sm font-medium hover:border-secondary hover:text-secondary transition-colors duration-200"
                  >
                    <ChevronLeft size={15} />
                    Previous
                  </Link>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-[8px] border border-[#e0e0e8] bg-white text-primary/30 font-sans text-sm font-medium cursor-not-allowed">
                    <ChevronLeft size={15} />
                    Previous
                  </span>
                )}

                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <Link
                      key={p}
                      href={`/blog?page=${p}`}
                      className={`w-9 h-9 rounded-[8px] flex items-center justify-center font-sans text-sm font-medium transition-colors duration-200 ${
                        p === currentPage
                          ? "bg-secondary text-white"
                          : "bg-white border border-[#e0e0e8] text-primary hover:border-secondary hover:text-secondary"
                      }`}
                      aria-current={p === currentPage ? "page" : undefined}
                    >
                      {p}
                    </Link>
                  ))}
                </div>

                {currentPage < totalPages ? (
                  <Link
                    href={`/blog?page=${currentPage + 1}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-[8px] border border-[#e0e0e8] bg-white text-primary font-sans text-sm font-medium hover:border-secondary hover:text-secondary transition-colors duration-200"
                  >
                    Next
                    <ChevronRight size={15} />
                  </Link>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-[8px] border border-[#e0e0e8] bg-white text-primary/30 font-sans text-sm font-medium cursor-not-allowed">
                    Next
                    <ChevronRight size={15} />
                  </span>
                )}
              </nav>
            )}
          </div>
        </section>

        {/* ── Newsletter CTA ───────────────────────────────────── */}
        <section className="bg-primary py-20">
          <div className="max-w-3xl mx-auto px-6 lg:px-10 text-center">
            <p className="font-sans text-sm font-semibold text-secondary uppercase tracking-widest mb-4">
              Stay Informed
            </p>
            <h2 className="font-serif font-bold text-2xl lg:text-3xl text-white text-balance leading-tight mb-4">
              Get the latest articles in your inbox.
            </h2>
            <p className="font-sans text-sm text-white/60 leading-relaxed mb-8 max-w-md mx-auto">
              Health guides, caregiving tips, and Famva updates — delivered directly to you. No spam, ever.
            </p>
            <Link
              href="/waitlist"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-[8px] bg-secondary text-white font-sans font-semibold text-sm hover:bg-[#D9246E] transition-colors duration-200"
            >
              Join the Waitlist
              <ArrowRight size={15} />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
