import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Clock, ArrowRight } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import RichTextContent from "@/components/rich-text-content"
import {
  getBlogPostBySlug,
  getAllPublishedSlugs,
  getPublishedBlogPosts,
  getAuthorInitials,
  estimateReadTime,
  formatPublishedDate,
} from "@/lib/contentful"
import type { Metadata } from "next"

export const revalidate = 3600
export const dynamicParams = true

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)
  if (!post) return { title: "Post Not Found — Famva" }
  return {
    title: `${post.title} — Famva Blog`,
    description: post.excerpt,
    openGraph: post.featuredImageSmallUrl
      ? { images: [{ url: post.featuredImageSmallUrl, width: 1200, height: 630 }] }
      : undefined,
  }
}

export async function generateStaticParams() {
  const slugs = await getAllPublishedSlugs()
  return slugs.map((slug) => ({ slug }))
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const [post, allPosts] = await Promise.all([
    getBlogPostBySlug(slug),
    getPublishedBlogPosts(),
  ])
  if (!post) notFound()

  // Use relatedBlogPosts from Contentful if set, otherwise pick 2 others
  const related =
    post.relatedBlogPosts && post.relatedBlogPosts.length > 0
      ? post.relatedBlogPosts.slice(0, 2)
      : allPosts.filter((p) => p.id !== post.id).slice(0, 2)

  const readTime = estimateReadTime(post.content)
  const publishedDate = formatPublishedDate(post.publishedDate)

  return (
    <>
      <Navbar />
      <main>
        {/* ── Hero ──────────────────────────────────────────────── */}
        <section className="bg-background pt-28 pb-0">
          <div className="max-w-4xl mx-auto px-6 lg:px-10 pt-8 pb-0">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 font-sans text-sm text-gray/50 hover:text-secondary transition-colors duration-200 mb-8"
            >
              <ArrowLeft size={14} />
              Back to Blog
            </Link>

            <br/>

            {post.tags[0] && (
              <span className="inline-block font-sans text-xs font-semibold text-secondary uppercase tracking-widest mb-4">
                {post.tags[0]}
              </span>
            )}

            <h1 className="font-serif font-bold text-3xl lg:text-4xl xl:text-5xl text-gray text-balance leading-tight mb-6">
              {post.title}
            </h1>

            {/* Author + meta */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-8 border-b border-white/10">
              <div className="flex items-center gap-3">
                {post.author?.imageUrl ? (
                  <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0">
                    <Image
                      src={post.author.imageUrl}
                      alt={post.author.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div
                    className="w-10 h-10 rounded-full bg-secondary/20 border border-secondary/30 flex items-center justify-center shrink-0"
                    aria-hidden="true"
                  >
                    <span className="font-serif font-bold text-sm text-secondary">
                      {getAuthorInitials(post.author?.name ?? "FA")}
                    </span>
                  </div>
                )}
                <div>
                  <p className="font-sans font-semibold text-sm text-gray">
                    {post.author?.name ?? "Famva"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-gray/40">
                <div className="flex items-center gap-1.5">
                  <Clock size={13} />
                  <span className="font-sans text-xs">{readTime}</span>
                </div>
                {publishedDate && (
                  <span className="font-sans text-xs">{publishedDate}</span>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ── Hero Image ────────────────────────────────────────── */}
        {post.featuredImageUrl && (
          <div className="bg-background pb-16">
            <div className="max-w-4xl mx-auto px-6 lg:px-10">
              <div className="relative h-72 lg:h-105 rounded-b-[20px] overflow-hidden shadow-2xl shadow-black/30">
                <Image
                  src={post.featuredImageUrl}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-primary/20" aria-hidden="true" />
              </div>
            </div>
          </div>
        )}

        {/* ── Article Body ──────────────────────────────────────── */}
        <section className="bg-white py-16">
          <div className="max-w-4xl mx-auto px-6 lg:px-10">
            <div className="max-w-2xl mx-auto">
              {/* Excerpt / lead */}
              <p className="font-sans text-base text-primary/70 leading-relaxed border-l-4 border-secondary pl-5 mb-10 italic">
                {post.excerpt}
              </p>

              {/* Rich text content */}
              {post.content && <RichTextContent document={post.content} />}

              {/* Tags / CTA strip */}
              <div className="mt-14 pt-8 border-t border-[#e0e0e8] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-3 py-1.5 rounded-full bg-secondary/10 text-secondary font-sans text-xs font-semibold"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  href="/waitlist"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-secondary text-white font-sans font-semibold text-sm hover:bg-[#D9246E] transition-colors duration-200"
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
                    key={rp.id}
                    href={`/blog/${rp.slug}`}
                    className="group bg-white rounded-lg overflow-hidden border border-[#e0e0e8] hover:border-secondary/30 hover:shadow-sm transition-all duration-300 flex flex-col"
                  >
                    <div className="relative h-44 overflow-hidden bg-primary/10">
                      {rp.featuredImageUrl && (
                        <Image
                          src={rp.featuredImageUrl}
                          alt={rp.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      )}
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      {rp.tags[0] && (
                        <span className="font-sans text-xs font-semibold text-secondary uppercase tracking-wider mb-2">
                          {rp.tags[0]}
                        </span>
                      )}
                      <h3 className="font-serif font-semibold text-base text-primary leading-snug group-hover:text-secondary transition-colors duration-200 flex-1">
                        {rp.title}
                      </h3>
                      <div className="mt-4 flex items-center gap-1.5 text-primary/40">
                        <Clock size={12} />
                        <span className="font-sans text-xs">{estimateReadTime(rp.content)}</span>
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
