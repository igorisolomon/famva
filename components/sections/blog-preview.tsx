import Link from "next/link"
import Image from "next/image"
import { Clock, ArrowRight } from "lucide-react"
import {
  getPublishedBlogPosts,
  getFeaturedPost,
  getAuthorInitials,
  estimateReadTime,
  formatPublishedDate,
} from "@/lib/contentful"

export default async function BlogPreviewSection() {
  const [featured, allPosts] = await Promise.all([
    getFeaturedPost(),
    getPublishedBlogPosts(),
  ])

  const displayFeatured = featured ?? allPosts[0] ?? null
  const others = allPosts.filter((p) => p.id !== displayFeatured?.id).slice(0, 3)

  if (!displayFeatured && others.length === 0) return null

  return (
    <section className="bg-[#F2F2F2] py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <p className="font-sans text-sm font-semibold text-secondary uppercase tracking-widest mb-3">From the Blog</p>
            <h2 className="font-serif font-bold text-3xl lg:text-4xl text-primary text-balance leading-tight">
              Insights for families like yours.
            </h2>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-sans font-semibold text-sm text-secondary hover:text-[#D9246E] transition-colors duration-200 shrink-0"
          >
            View all articles
            <ArrowRight size={15} />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {displayFeatured && (
            <Link
              href={`/blog/${displayFeatured.slug}`}
              className="lg:col-span-3 group flex flex-col bg-white rounded-[16px] overflow-hidden border border-[#e0e0e8] shadow-sm hover:shadow-md hover:border-secondary/30 transition-all duration-300"
            >
              <div className="relative h-64 lg:h-72 overflow-hidden bg-primary/10">
                {displayFeatured.featuredImageUrl && (
                  <Image
                    src={displayFeatured.featuredImageUrl}
                    alt={displayFeatured.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                )}
                <div className="absolute inset-0 bg-primary/20" aria-hidden="true" />
                <span className="absolute top-4 left-4 inline-flex items-center px-3 py-1 rounded-full bg-secondary text-white font-sans text-xs font-semibold">
                  Featured
                </span>
              </div>
              <div className="flex flex-col flex-1 p-6">
                {displayFeatured.tags[0] && (
                  <span className="inline-block font-sans text-xs font-semibold text-secondary uppercase tracking-widest mb-2">
                    {displayFeatured.tags[0]}
                  </span>
                )}
                <h3 className="font-serif font-bold text-xl text-primary text-balance leading-snug group-hover:text-secondary transition-colors duration-200 mb-3">
                  {displayFeatured.title}
                </h3>
                <p className="font-sans text-sm text-primary/65 leading-relaxed flex-1">
                  {displayFeatured.excerpt}
                </p>
                <div className="mt-5 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0"
                      aria-hidden="true"
                    >
                      <span className="font-serif font-bold text-xs text-secondary">
                        {getAuthorInitials(displayFeatured.author?.name ?? "FA")}
                      </span>
                    </div>
                    <div>
                      <p className="font-sans font-semibold text-xs text-primary">
                        {displayFeatured.author?.name ?? "Famva"}
                      </p>
                      {displayFeatured.publishedDate && (
                        <p className="font-sans text-xs text-primary/50">
                          {formatPublishedDate(displayFeatured.publishedDate)}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-primary/40">
                    <Clock size={12} />
                    <span className="font-sans text-xs">
                      {estimateReadTime(displayFeatured.content)}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          )}

          {others.length > 0 && (
            <div className="lg:col-span-2 flex flex-col gap-4">
              {others.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group flex gap-4 bg-white rounded-lg overflow-hidden border border-[#e0e0e8] p-4 hover:border-secondary/30 hover:shadow-sm transition-all duration-300"
                >
                  <div className="relative w-20 h-20 rounded-md overflow-hidden shrink-0 bg-primary/10">
                    {post.featuredImageUrl && (
                      <Image
                        src={post.featuredImageUrl}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    )}
                  </div>
                  <div className="flex flex-col justify-between min-w-0">
                    <div>
                      {post.tags[0] && (
                        <span className="font-sans text-xs font-semibold text-secondary uppercase tracking-wider">
                          {post.tags[0]}
                        </span>
                      )}
                      <h3 className="font-serif font-semibold text-sm text-primary leading-snug mt-1 group-hover:text-secondary transition-colors duration-200 line-clamp-2">
                        {post.title}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2 mt-2 text-primary/40">
                      <Clock size={11} />
                      <span className="font-sans text-xs">{estimateReadTime(post.content)}</span>
                      {post.publishedDate && (
                        <>
                          <span className="font-sans text-xs">·</span>
                          <span className="font-sans text-xs">
                            {formatPublishedDate(post.publishedDate)}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
