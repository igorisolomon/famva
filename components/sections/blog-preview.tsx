import Link from "next/link"
import Image from "next/image"
import { Clock, ArrowRight } from "lucide-react"
import { blogPosts } from "@/lib/blog-data"

export default function BlogPreviewSection() {
  const featured = blogPosts.find((p) => p.featured)
  const others = blogPosts.filter((p) => !p.featured).slice(0, 3)

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
          {featured && (
            <Link
              href={`/blog/${featured.slug}`}
              className="lg:col-span-3 group flex flex-col bg-white rounded-[16px] overflow-hidden border border-[#e0e0e8] shadow-sm hover:shadow-md hover:border-secondary/30 transition-all duration-300"
            >
              <div className="relative h-64 lg:h-72 overflow-hidden">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-primary/20" aria-hidden="true" />
                <span className="absolute top-4 left-4 inline-flex items-center px-3 py-1 rounded-full bg-secondary text-white font-sans text-xs font-semibold">
                  Featured
                </span>
              </div>
              <div className="flex flex-col flex-1 p-6">
                <span className="inline-block font-sans text-xs font-semibold text-secondary uppercase tracking-widest mb-2">
                  {featured.category}
                </span>
                <h3 className="font-serif font-bold text-xl text-primary text-balance leading-snug group-hover:text-secondary transition-colors duration-200 mb-3">
                  {featured.title}
                </h3>
                <p className="font-sans text-sm text-primary/65 leading-relaxed flex-1">
                  {featured.excerpt}
                </p>
                <div className="mt-5 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0"
                      aria-hidden="true"
                    >
                      <span className="font-serif font-bold text-xs text-secondary">
                        {featured.authorInitials}
                      </span>
                    </div>
                    <div>
                      <p className="font-sans font-semibold text-xs text-primary">{featured.author}</p>
                      <p className="font-sans text-xs text-primary/50">{featured.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-primary/40">
                    <Clock size={12} />
                    <span className="font-sans text-xs">{featured.readTime}</span>
                  </div>
                </div>
              </div>
            </Link>
          )}

          <div className="lg:col-span-2 flex flex-col gap-4">
            {others.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex gap-4 bg-white rounded-lg overflow-hidden border border-[#e0e0e8] p-4 hover:border-secondary/30 hover:shadow-sm transition-all duration-300"
              >
                <div className="relative w-20 h-20 rounded-md overflow-hidden shrink-0">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="flex flex-col justify-between min-w-0">
                  <div>
                    <span className="font-sans text-xs font-semibold text-secondary uppercase tracking-wider">
                      {post.category}
                    </span>
                    <h3 className="font-serif font-semibold text-sm text-primary leading-snug mt-1 group-hover:text-secondary transition-colors duration-200 line-clamp-2">
                      {post.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 mt-2 text-primary/40">
                    <Clock size={11} />
                    <span className="font-sans text-xs">{post.readTime}</span>
                    <span className="font-sans text-xs">·</span>
                    <span className="font-sans text-xs">{post.date}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
