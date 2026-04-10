import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Clock, ArrowRight } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { blogPosts, getBlogPost } from "@/lib/blog-data"
import type { Metadata } from "next"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) return { title: "Post Not Found — Famva" }
  return {
    title: `${post.title} — Famva Blog`,
    description: post.excerpt,
  }
}

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }))
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) notFound()

  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 2)

  // Convert markdown-like content to simple HTML paragraphs for rendering
  const sections = post.content
    .trim()
    .split("\n\n")
    .filter(Boolean)

  return (
    <>
      <Navbar />
      <main>
        {/* ── Hero ──────────────────────────────────────────────── */}
        <section className="bg-primary pt-28 pb-0">
          <div className="max-w-4xl mx-auto px-6 lg:px-10 pt-8 pb-0">
            {/* Back link */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 font-sans text-sm text-white/50 hover:text-secondary transition-colors duration-200 mb-8"
            >
              <ArrowLeft size={14} />
              Back to Blog
            </Link>

            <span className="inline-block font-sans text-xs font-semibold text-secondary uppercase tracking-widest mb-4">
              {post.category}
            </span>

            <h1 className="font-serif font-bold text-3xl lg:text-4xl xl:text-5xl text-white text-balance leading-tight mb-6">
              {post.title}
            </h1>

            {/* Author + meta */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-8 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full bg-secondary/20 border border-secondary/30 flex items-center justify-center shrink-0"
                  aria-hidden="true"
                >
                  <span className="font-serif font-bold text-sm text-secondary">
                    {post.authorInitials}
                  </span>
                </div>
                <div>
                  <p className="font-sans font-semibold text-sm text-white">{post.author}</p>
                  <p className="font-sans text-xs text-white/50">{post.authorRole}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-white/40">
                <div className="flex items-center gap-1.5">
                  <Clock size={13} />
                  <span className="font-sans text-xs">{post.readTime}</span>
                </div>
                <span className="font-sans text-xs">{post.date}</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── Hero Image ────────────────────────────────────────── */}
        <div className="bg-primary">
          <div className="max-w-4xl mx-auto px-6 lg:px-10">
            <div className="relative h-72 lg:h-[420px] rounded-b-[20px] overflow-hidden shadow-2xl shadow-black/30">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-primary/20" aria-hidden="true" />
            </div>
          </div>
        </div>

        {/* ── Article Body ──────────────────────────────────────── */}
        <section className="bg-white py-16">
          <div className="max-w-4xl mx-auto px-6 lg:px-10">
            <div className="max-w-2xl mx-auto">
              {/* Excerpt / lead */}
              <p className="font-sans text-base text-primary/70 leading-relaxed border-l-4 border-secondary pl-5 mb-10 italic">
                {post.excerpt}
              </p>

              {/* Content */}
              <div className="font-sans text-primary leading-relaxed space-y-5">
                {sections.map((block, idx) => {
                  if (block.startsWith("## ")) {
                    return (
                      <h2
                        key={idx}
                        className="font-serif font-bold text-xl lg:text-2xl text-primary mt-10 mb-2"
                      >
                        {block.replace("## ", "")}
                      </h2>
                    )
                  }
                  if (block.startsWith("**") && block.endsWith("**")) {
                    return (
                      <p key={idx} className="font-sans font-semibold text-primary text-sm">
                        {block.replace(/\*\*/g, "")}
                      </p>
                    )
                  }
                  // List items
                  if (block.startsWith("- ")) {
                    const items = block.split("\n").filter((l) => l.startsWith("- "))
                    return (
                      <ul key={idx} className="flex flex-col gap-2 pl-0" role="list">
                        {items.map((item, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <span
                              className="mt-1.5 w-1.5 h-1.5 rounded-full bg-secondary shrink-0"
                              aria-hidden="true"
                            />
                            <span
                              className="text-sm text-primary/75 leading-relaxed"
                              dangerouslySetInnerHTML={{
                                __html: item
                                  .replace("- ", "")
                                  .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"),
                              }}
                            />
                          </li>
                        ))}
                      </ul>
                    )
                  }
                  return (
                    <p
                      key={idx}
                      className="text-sm text-primary/75 leading-relaxed"
                      dangerouslySetInnerHTML={{
                        __html: block.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"),
                      }}
                    />
                  )
                })}
              </div>

              {/* Tags / CTA strip */}
              <div className="mt-14 pt-8 border-t border-[#e0e0e8] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-secondary/10 text-secondary font-sans text-xs font-semibold">
                  {post.category}
                </span>
                <Link
                  href="/waitlist"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[8px] bg-secondary text-white font-sans font-semibold text-sm hover:bg-[#D9246E] transition-colors duration-200"
                >
                  Join the Waitlist
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── Related Posts ─────────────────────────────────────── */}
        {related.length > 0 && (
          <section className="bg-[#F2F2F2] py-16">
            <div className="max-w-4xl mx-auto px-6 lg:px-10">
              <h2 className="font-serif font-bold text-xl text-primary mb-8">
                Continue Reading
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {related.map((rp) => (
                  <Link
                    key={rp.slug}
                    href={`/blog/${rp.slug}`}
                    className="group bg-white rounded-[12px] overflow-hidden border border-[#e0e0e8] hover:border-secondary/30 hover:shadow-sm transition-all duration-300 flex flex-col"
                  >
                    <div className="relative h-44 overflow-hidden">
                      <Image
                        src={rp.image}
                        alt={rp.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <span className="font-sans text-xs font-semibold text-secondary uppercase tracking-wider mb-2">
                        {rp.category}
                      </span>
                      <h3 className="font-serif font-semibold text-base text-primary leading-snug group-hover:text-secondary transition-colors duration-200 flex-1">
                        {rp.title}
                      </h3>
                      <div className="mt-4 flex items-center gap-1.5 text-primary/40">
                        <Clock size={12} />
                        <span className="font-sans text-xs">{rp.readTime}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="mt-8 text-center">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 font-sans font-semibold text-sm text-secondary hover:text-[#D9246E] transition-colors duration-200"
                >
                  View all articles
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  )
}
