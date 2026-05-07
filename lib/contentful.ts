import { createClient } from "contentful"
import type { Document } from "@contentful/rich-text-types"

export const POSTS_PER_PAGE = 6

function getClient() {
  const space = process.env.CONTENTFUL_SPACE_ID
  const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN
  if (!space || !accessToken) {
    throw new Error("Missing CONTENTFUL_SPACE_ID or CONTENTFUL_ACCESS_TOKEN env vars")
  }
  return createClient({ space, accessToken })
}

export interface ContentfulAuthor {
  name: string
  email?: string
  imageUrl?: string
}

export interface ContentfulBlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content: Document
  tags: string[]
  author?: ContentfulAuthor
  publishedDate?: string
  featuredImageUrl?: string
  relatedBlogPosts?: ContentfulBlogPost[]
  isPublished: boolean
}

export function getAuthorInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

export function estimateReadTime(content: Document | undefined): string {
  if (!content) return "1 min read"
  const text = extractText(content as any)
  const words = text.trim().split(/\s+/).filter(Boolean).length
  return `${Math.max(1, Math.round(words / 200))} min read`
}

function extractText(node: any): string {
  if (!node) return ""
  if (node.nodeType === "text") return node.value ?? ""
  if (Array.isArray(node.content)) return node.content.map(extractText).join(" ")
  return ""
}

export function formatPublishedDate(dateString: string | undefined): string {
  if (!dateString) return ""
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

function mapAssetUrl(asset: any): string | undefined {
  const url = asset?.fields?.file?.url
  return url ? `https:${url}` : undefined
}

function mapAuthor(entry: any): ContentfulAuthor | undefined {
  if (!entry?.fields) return undefined
  return {
    name: entry.fields.name ?? "",
    email: entry.fields.email,
    imageUrl: mapAssetUrl(entry.fields.image),
  }
}

function mapBlogPost(entry: any): ContentfulBlogPost {
  const f = entry.fields
  return {
    id: entry.sys.id,
    slug: f.slug ?? "",
    title: f.title ?? "",
    excerpt: f.excerpt ?? "",
    content: f.content,
    tags: f.tags ?? [],
    author: mapAuthor(f.author),
    publishedDate: f.publishedDate,
    featuredImageUrl: mapAssetUrl(f.featuredImage),
    relatedBlogPosts: Array.isArray(f.relatedBlogPosts)
      ? f.relatedBlogPosts.filter((r: any) => r?.sys && r?.fields).map(mapBlogPost)
      : [],
    isPublished: f.isPublished ?? false,
  }
}

export async function getPublishedBlogPosts(): Promise<ContentfulBlogPost[]> {
  const client = getClient()
  const res = await client.getEntries({
    content_type: "headlessBlogPost",
    "fields.isPublished": true,
    order: ["-fields.publishedDate"] as any,
    include: 2,
  } as any)
  return res.items.map(mapBlogPost)
}

export async function getBlogPostBySlug(slug: string): Promise<ContentfulBlogPost | null> {
  const client = getClient()
  const res = await client.getEntries({
    content_type: "headlessBlogPost",
    "fields.slug": slug,
    include: 3,
    limit: 1,
  } as any)
  if (!res.items.length) return null
  return mapBlogPost(res.items[0])
}

export async function getFeaturedPost(): Promise<ContentfulBlogPost | null> {
  const client = getClient()
  const res = await client.getEntries({
    content_type: "featurePost",
    include: 3,
    limit: 1,
  } as any)
  if (!res.items.length) return null
  const blogPostEntry = (res.items[0] as any).fields?.featurePost
  if (!blogPostEntry?.fields) return null
  return mapBlogPost(blogPostEntry)
}

export async function getAllPublishedSlugs(): Promise<string[]> {
  const client = getClient()
  const res = await client.getEntries({
    content_type: "headlessBlogPost",
    "fields.isPublished": true,
  } as any)
  return res.items.map((e: any) => e.fields.slug).filter(Boolean) as string[]
}
