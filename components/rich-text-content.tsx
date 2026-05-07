import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { BLOCKS, MARKS, INLINES } from "@contentful/rich-text-types"
import type { Document, Block, Inline } from "@contentful/rich-text-types"
import type { ReactNode } from "react"

const options = {
  renderMark: {
    [MARKS.BOLD]: (text: ReactNode) => <strong className="font-semibold">{text}</strong>,
    [MARKS.ITALIC]: (text: ReactNode) => <em>{text}</em>,
    [MARKS.UNDERLINE]: (text: ReactNode) => <u>{text}</u>,
    [MARKS.CODE]: (text: ReactNode) => (
      <code className="px-1.5 py-0.5 rounded bg-primary/5 font-mono text-xs text-secondary">
        {text}
      </code>
    ),
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (_node: Block | Inline, children: ReactNode) => (
      <p className="text-sm text-primary/75 leading-relaxed">{children}</p>
    ),
    [BLOCKS.HEADING_1]: (_node: Block | Inline, children: ReactNode) => (
      <h1 className="font-serif font-bold text-2xl lg:text-3xl text-primary mt-10 mb-3">
        {children}
      </h1>
    ),
    [BLOCKS.HEADING_2]: (_node: Block | Inline, children: ReactNode) => (
      <h2 className="font-serif font-bold text-xl lg:text-2xl text-primary mt-10 mb-2">
        {children}
      </h2>
    ),
    [BLOCKS.HEADING_3]: (_node: Block | Inline, children: ReactNode) => (
      <h3 className="font-serif font-bold text-lg text-primary mt-8 mb-2">{children}</h3>
    ),
    [BLOCKS.HEADING_4]: (_node: Block | Inline, children: ReactNode) => (
      <h4 className="font-serif font-semibold text-base text-primary mt-6 mb-1">{children}</h4>
    ),
    [BLOCKS.HEADING_5]: (_node: Block | Inline, children: ReactNode) => (
      <h5 className="font-sans font-semibold text-sm text-primary mt-4 mb-1">{children}</h5>
    ),
    [BLOCKS.HEADING_6]: (_node: Block | Inline, children: ReactNode) => (
      <h6 className="font-sans font-semibold text-xs text-primary/80 mt-4 mb-1">{children}</h6>
    ),
    [BLOCKS.UL_LIST]: (_node: Block | Inline, children: ReactNode) => (
      <ul className="flex flex-col gap-2 pl-0">{children}</ul>
    ),
    [BLOCKS.OL_LIST]: (_node: Block | Inline, children: ReactNode) => (
      <ol className="flex flex-col gap-2 pl-0 list-none counter-reset-[item]">{children}</ol>
    ),
    [BLOCKS.LIST_ITEM]: (_node: Block | Inline, children: ReactNode) => (
      <li className="flex items-start gap-3">
        <span
          className="mt-2 w-1.5 h-1.5 rounded-full bg-secondary shrink-0"
          aria-hidden="true"
        />
        <div className="text-sm text-primary/75 leading-relaxed flex-1 [&>p]:my-0">{children}</div>
      </li>
    ),
    [BLOCKS.HR]: () => <hr className="border-t border-[#e0e0e8] my-8" />,
    [BLOCKS.QUOTE]: (_node: Block | Inline, children: ReactNode) => (
      <blockquote className="border-l-4 border-secondary pl-5 italic text-sm text-primary/70 leading-relaxed my-6">
        {children}
      </blockquote>
    ),
    [BLOCKS.EMBEDDED_ASSET]: (node: Block | Inline) => {
      const asset = (node as any).data?.target
      const url = asset?.fields?.file?.url
      if (!url) return null
      const alt = asset.fields.description || asset.fields.title || ""
      return (
        <div className="my-8 rounded-lg overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`https:${url}`} alt={alt} className="w-full h-auto" />
        </div>
      )
    },
    [INLINES.HYPERLINK]: (node: Block | Inline, children: ReactNode) => (
      <a
        href={(node as any).data.uri}
        target="_blank"
        rel="noopener noreferrer"
        className="text-secondary underline underline-offset-2 hover:text-[#D9246E] transition-colors duration-200"
      >
        {children}
      </a>
    ),
  },
}

export default function RichTextContent({ document }: { document: Document }) {
  return (
    <div className="font-sans text-primary leading-relaxed space-y-5">
      {documentToReactComponents(document, options)}
    </div>
  )
}
