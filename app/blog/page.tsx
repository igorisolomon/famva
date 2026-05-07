import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Clock, ChevronLeft, ChevronRight, Search } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import {
  getPublishedBlogPosts,
  getFeaturedPost,
  POSTS_PER_PAGE,
  getAuthorInitials,
  estimateReadTime,
  formatPublishedDate,
} from "@/lib/contentful"

export const revalidate = 3600

interface BlogPageProps {
  searchParams: Promise<{ page?: string; q?: string }>
}

export const metadata = {
  title: "Blog — Famva",
  description:
    "Health insights, caregiving guidance, and stories for UK Nigerian families caring for elderly parents back home.",
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { page, q } = await searchParams
  const query = q?.trim().toLowerCase() ?? ""
  const currentPage = Math.max(1, parseInt(page ?? "1", 10))

  const [featured, allPosts] = await Promise.all([
    getFeaturedPost(),
    getPublishedBlogPosts(),
  ])

  const featuredId = featured?.id
  const allOthers = allPosts.filter((p) => p.id !== featuredId)
  const displayFeatured = featured ?? allPosts[0] ?? null

  const filteredPosts = query
    ? allOthers.filter(
      (p) =>
        p.title.toLowerCase().includes(query) ||
        p.excerpt.toLowerCase().includes(query) ||
        p.tags.some((t) => t.toLowerCase().includes(query))
    )
    : allOthers

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)
  const safePage = Math.min(currentPage, Math.max(1, totalPages))
  const paginatedPosts = filteredPosts.slice(
    (safePage - 1) * POSTS_PER_PAGE,
    safePage * POSTS_PER_PAGE
  )

  const allTags = Array.from(new Set(allPosts.flatMap((p) => p.tags)))

  return (
    <>
      <Navbar />
      <main>
        {/* ── Page Header ─────────────────────────────────────── */}
        <section className="bg-background pt-32 pb-16">
          <div className="max-w-6xl mx-auto px-6 lg:px-10">
            <div className="max-w-4xl">
              <p className="font-sans text-sm font-semibold text-secondary uppercase tracking-widest mb-4">
                The Famva Blog
              </p>
              <h1 className="font-serif font-bold text-4xl lg:text-5xl text-gray-900 text-balance leading-tight">
                Insights for families separated by distance, not love.
              </h1>
              <p className="mt-5 font-sans text-base text-gray-900/60 leading-relaxed max-w-lg">
                Health guidance, caregiving stories, and practical tools for UK Nigerian families caring for elderly parents back home.
              </p>
            </div>

            {/* Search */}
            <form action="/blog" method="GET" className="mt-8 max-w-md">
              <div className="relative">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                <input
                  type="search"
                  name="q"
                  defaultValue={q}
                  placeholder="Search articles…"
                  className="w-full pl-11 pr-4 py-3 rounded-[10px] border border-[#e0e0e8] bg-white font-sans text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors"
                />
              </div>
            </form>

            {/* Tag pills */}
            {false && (allTags.length > 0) && (
              <div className="mt-10 flex flex-wrap gap-2">
                <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-secondary text-gray-900 font-sans text-xs font-semibold">
                  All
                </span>
                {allTags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-4 py-1.5 rounded-full border border-graytext-gray-900/20 text-gray-900/60 font-sans text-xs font-medium hover:border-secondary/60 hover:text-secondary transition-colors duration-200 cursor-pointer"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ── Featured Post ────────────────────────────────────── */}
        {displayFeatured && (
          <section className="bg-background pb-16 border-b border-[#e0e0e8]">
            <div className="max-w-6xl mx-auto px-6 lg:px-10">
              <p className="font-sans text-xs font-semibold text-secondary uppercase tracking-widest mb-6">
                Featured Article
              </p>
              <Link
                href={`/blog/${displayFeatured.slug}`}
                className="group grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center"
              >
                {/* Image */}
                <div className="relative rounded-[16px] overflow-hidden h-72 lg:h-[400px] shadow-lg shadow-primary/10 bg-primary/10">
                  {displayFeatured.featuredImageUrl ? (
                    <Image
                      src={displayFeatured.featuredImageUrl}
                      alt={displayFeatured.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      priority
                    />
                  ) : null}
                  <div className="absolute inset-0 bg-primary/15" aria-hidden="true" />
                  <span className="absolute top-5 left-5 inline-flex items-center px-3 py-1.5 rounded-full bg-secondary text-white font-sans text-xs font-semibold shadow">
                    Featured
                  </span>
                </div>

                {/* Content */}
                <div>
                  {displayFeatured.tags[0] && (
                    <span className="inline-block font-sans text-xs font-semibold text-secondary uppercase tracking-widest mb-3">
                      {displayFeatured.tags[0]}
                    </span>
                  )}
                  <h2 className="font-serif font-bold text-2xl lg:text-3xl text-primary text-balance leading-snug group-hover:text-secondary transition-colors duration-200 mb-4">
                    {displayFeatured.title}
                  </h2>
                  <p className="font-sans text-sm text-primary/65 leading-relaxed mb-6">
                    {displayFeatured.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0"
                        aria-hidden="true"
                      >
                        <span className="font-serif font-bold text-xs text-secondary">
                          {getAuthorInitials(displayFeatured.author?.name ?? "FA")}
                        </span>
                      </div>
                      <div>
                        <p className="font-sans font-semibold text-sm text-primary">
                          {displayFeatured.author?.name ?? "Famva"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-primary/40">
                      <div className="flex items-center gap-1.5">
                        <Clock size={13} />
                        <span className="font-sans text-xs">
                          {estimateReadTime(displayFeatured.content)}
                        </span>
                      </div>
                      {displayFeatured.publishedDate && (
                        <span className="font-sans text-xs">
                          {formatPublishedDate(displayFeatured.publishedDate)}
                        </span>
                      )}
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
        )}

        {/* ── All Posts Grid + Pagination ──────────────────────── */}
        <section className="bg-white py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-6 lg:px-10">
            <div className="flex items-center justify-between mb-10">
              <h2 className="font-serif font-bold text-xl text-primary">
                {query ? "Search Results" : "All Articles"}
                <span className="font-sans font-normal text-sm text-primary/40 ml-2">
                  ({filteredPosts.length} {filteredPosts.length === 1 ? "post" : "posts"})
                </span>
              </h2>
              {totalPages > 1 && (
                <p className="font-sans text-xs text-primary/50">
                  Page {safePage} of {totalPages}
                </p>
              )}
            </div>

            {/* Empty state */}
            {paginatedPosts.length === 0 && (
              <div className="py-20 text-center">

                {!q ?
                  <p className="font-serif text-lg text-primary/50">No articles posted.</p> :
                  <>
                    <p className="font-serif text-lg text-primary/50">No articles found for &ldquo;{q}&rdquo;.</p>
                    <Link href="/blog" className="mt-4 inline-block font-sans text-sm text-secondary hover:underline">
                      Clear search
                    </Link></>}
              </div>
            )}

            {/* Posts grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
              {paginatedPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group bg-white rounded-[16px] overflow-hidden border border-[#e0e0e8] shadow-sm hover:shadow-md hover:border-secondary/30 transition-all duration-300 flex flex-col"
                >
                  <div className="relative h-52 overflow-hidden bg-primary/10">
                    {post.featuredImageUrl && (
                      <Image
                        src={post.featuredImageUrl}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    )}
                    <div className="absolute inset-0 bg-primary/10" aria-hidden="true" />
                  </div>
                  <div className="flex flex-col flex-1 p-6">
                    {post.tags[0] && (
                      <span className="font-sans text-xs font-semibold text-secondary uppercase tracking-widest mb-2">
                        {post.tags[0]}
                      </span>
                    )}
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
                            {getAuthorInitials(post.author?.name ?? "FA")}
                          </span>
                        </div>
                        <div>
                          <p className="font-sans font-semibold text-xs text-primary">
                            {post.author?.name ?? "Famva"}
                          </p>
                          {post.publishedDate && (
                            <p className="font-sans text-xs text-primary/40">
                              {formatPublishedDate(post.publishedDate)}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 text-primary/40">
                        <Clock size={12} />
                        <span className="font-sans text-xs">{estimateReadTime(post.content)}</span>
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
                {safePage > 1 ? (
                  <Link
                    href={`/blog?page=${safePage - 1}${query ? `&q=${encodeURIComponent(q!)}` : ""}`}
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
                      href={`/blog?page=${p}${query ? `&q=${encodeURIComponent(q!)}` : ""}`}
                      className={`w-9 h-9 rounded-[8px] flex items-center justify-center font-sans text-sm font-medium transition-colors duration-200 ${p === safePage
                        ? "bg-secondary text-white"
                        : "bg-white border border-[#e0e0e8] text-primary hover:border-secondary hover:text-secondary"
                        }`}
                      aria-current={p === safePage ? "page" : undefined}
                    >
                      {p}
                    </Link>
                  ))}
                </div>

                {safePage < totalPages ? (
                  <Link
                    href={`/blog?page=${safePage + 1}${query ? `&q=${encodeURIComponent(q!)}` : ""}`}
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
