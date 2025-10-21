import React, { Fragment, JSX } from 'react'
import type { SerializedEditorState, SerializedLexicalNode } from '@payloadcms/richtext-lexical/lexical'
import type { DefaultNodeTypes } from '@payloadcms/richtext-lexical'

interface RichTextProps {
  content: SerializedEditorState
  className?: string
}

type NodeTypes = DefaultNodeTypes | SerializedLexicalNode

interface SerializedTextNode {
  type: 'text'
  text: string
  format?: number
  detail?: number
  mode?: string
  style?: string
}

interface SerializedElementNode {
  type: string
  children?: NodeTypes[]
  format?: string | number
  indent?: number
  version?: number
  direction?: 'ltr' | 'rtl' | null
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  listType?: 'number' | 'bullet' | 'check'
  start?: number
  url?: string
  doc?: unknown
  linkType?: 'custom' | 'internal'
  newTab?: boolean
  fields?: {
    url?: string
    alt?: string
  }
  relationTo?: string
  value?:
    | number
    | {
        id: string | number
      }
}

const IS_BOLD = 1
const IS_ITALIC = 1 << 1
const IS_STRIKETHROUGH = 1 << 2
const IS_UNDERLINE = 1 << 3
const IS_CODE = 1 << 4

export function RichText({ content, className = '' }: RichTextProps) {
  if (!content?.root?.children) {
    return null
  }

  const renderNode = (node: NodeTypes, index: number): React.ReactNode => {
    // Text node
    if ('text' in node && node.type === 'text') {
      const textNode = node as SerializedTextNode
      let text: React.ReactNode = textNode.text
      const format = textNode.format || 0

      if (format & IS_BOLD) text = <strong key={`bold-${index}`}>{text}</strong>
      if (format & IS_ITALIC) text = <em key={`italic-${index}`}>{text}</em>
      if (format & IS_UNDERLINE) text = <u key={`underline-${index}`}>{text}</u>
      if (format & IS_STRIKETHROUGH) text = <s key={`strike-${index}`}>{text}</s>
      if (format & IS_CODE) text = <code key={`code-${index}`} className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">{text}</code>

      return <Fragment key={index}>{text}</Fragment>
    }

    // Element nodes
    const elementNode = node as SerializedElementNode
    const children = elementNode.children?.map((child, i) => renderNode(child, i))

    switch (elementNode.type) {
      case 'paragraph':
        return (
          <p key={index} className="mb-4 text-gray-400 leading-relaxed">
            {children}
          </p>
        )

      case 'heading':
        const HeadingTag = (elementNode.tag || 'h2') as keyof JSX.IntrinsicElements
        const headingSizes = {
          h1: 'text-3xl font-bold mb-6 mt-8 text-gray-700',
          h2: 'text-2xl font-bold mb-4 mt-6 text-gray-700',
          h3: 'text-xl font-semibold mb-3 mt-5 text-gray-700',
          h4: 'text-lg font-semibold mb-2 mt-4 text-gray-600',
          h5: 'text-base font-semibold mb-2 mt-3 text-gray-600',
          h6: 'text-sm font-semibold mb-2 mt-2 text-gray-600',
        }
        return (
          <HeadingTag key={index} className={headingSizes[elementNode.tag || 'h2']}>
            {children}
          </HeadingTag>
        )

      case 'list':
        if (elementNode.listType === 'number') {
          return (
            <ol key={index} className="list-decimal ml-6 mb-4 text-gray-400 space-y-2">
              {children}
            </ol>
          )
        }
        if (elementNode.listType === 'check') {
          return (
            <ul key={index} className="ml-6 mb-4 text-gray-400 space-y-2 list-none">
              {children}
            </ul>
          )
        }
        return (
          <ul key={index} className="list-disc ml-6 mb-4 text-gray-400 space-y-2">
            {children}
          </ul>
        )

      case 'listitem':
        return (
          <li key={index} className="text-gray-400">
            {children}
          </li>
        )

      case 'quote':
        return (
          <blockquote key={index} className="border-l-4 border-gray-300 pl-4 italic my-6 text-gray-500">
            {children}
          </blockquote>
        )

      case 'link':
        return (
          <a
            key={index}
            href={elementNode.url}
            target={elementNode.newTab ? '_blank' : undefined}
            rel={elementNode.newTab ? 'noopener noreferrer' : undefined}
            className="text-brand-orange hover:text-brand-orange/80 hover:underline transition-colors"
          >
            {children}
          </a>
        )

      case 'upload':
        if (elementNode.fields?.url) {
          return (
            <div key={index} className="my-8">
              <img
                src={elementNode.fields.url}
                alt={elementNode.fields.alt || ''}
                className="w-full h-auto rounded-lg shadow-sm"
              />
              {elementNode.fields.alt && (
                <p className="text-sm text-gray-400 text-center mt-2 italic">
                  {elementNode.fields.alt}
                </p>
              )}
            </div>
          )
        }
        return null

      case 'horizontalrule':
        return <hr key={index} className="my-8 border-gray-200" />

      case 'linebreak':
        return <br key={index} />

      default:
        return children ? <div key={index}>{children}</div> : null
    }
  }

  return (
    <div className={`rich-text prose prose-gray max-w-none ${className}`}>
      {content.root.children.map((node, index) => renderNode(node, index))}
    </div>
  )
}
