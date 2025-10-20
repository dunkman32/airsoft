import React, { JSX } from 'react'
import type { News } from '@/app/(payload)/payload-types'

interface RichTextProps {
  content: News['content']
}

interface SerializedNode {
  type?: string
  text?: string
  bold?: boolean
  italic?: boolean
  underline?: boolean
  strikethrough?: boolean
  code?: boolean
  children?: SerializedNode[]
  format?: string
  tag?: string
  value?: {
    url?: string
    alt?: string
  }
  url?: string
  linkType?: string
  newTab?: boolean
  listType?: 'number' | 'bullet'
  [key: string]: unknown
}

export function RichText({ content }: RichTextProps) {
  if (!content?.root?.children) {
    return null
  }

  const renderNode = (node: SerializedNode, index: number): React.ReactNode => {
    // Text node
    if (node.text !== undefined) {
      let text: React.ReactNode = node.text

      if (node.bold) text = <strong key={index}>{text}</strong>
      if (node.italic) text = <em key={index}>{text}</em>
      if (node.underline) text = <u key={index}>{text}</u>
      if (node.strikethrough) text = <s key={index}>{text}</s>
      if (node.code) text = <code key={index}>{text}</code>

      return text
    }

    // Element nodes
    const children = node.children?.map((child, i) => renderNode(child, i))

    switch (node.type) {
      case 'paragraph':
        return (
          <p key={index} className="mb-4">
            {children}
          </p>
        )

      case 'heading':
        const HeadingTag = (node.tag || 'h2') as keyof JSX.IntrinsicElements
        return <HeadingTag key={index}>{children}</HeadingTag>

      case 'list':
        if (node.listType === 'number') {
          return (
            <ol key={index} className="list-decimal ml-6 mb-4">
              {children}
            </ol>
          )
        }
        return (
          <ul key={index} className="list-disc ml-6 mb-4">
            {children}
          </ul>
        )

      case 'listitem':
        return <li key={index}>{children}</li>

      case 'quote':
        return (
          <blockquote key={index} className="border-l-4 border-brand-gray-300 pl-4 italic my-4">
            {children}
          </blockquote>
        )

      case 'link':
        return (
          <a
            key={index}
            href={node.url}
            target={node.newTab ? '_blank' : undefined}
            rel={node.newTab ? 'noopener noreferrer' : undefined}
            className="text-brand-red hover:underline"
          >
            {children}
          </a>
        )

      case 'upload':
        if (node.value?.url) {
          return (
            <img
              key={index}
              src={node.value.url}
              alt={node.value.alt || ''}
              className="w-full h-auto my-6 rounded-lg"
            />
          )
        }
        return null

      case 'horizontalrule':
        return <hr key={index} className="my-8 border-brand-gray-200" />

      default:
        return <div key={index}>{children}</div>
    }
  }

  return (
    <div className="rich-text">
      {content.root.children.map((node, index) => renderNode(node, index))}
    </div>
  )
}
