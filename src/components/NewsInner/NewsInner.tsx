'use client'

import React from 'react'
import Image from 'next/image'
import type { News, Media } from '@/app/(payload)/payload-types'
import { RichText } from './RichText'

interface NewsInnerProps {
  newsItem: News
}

export function NewsInner({ newsItem }: NewsInnerProps) {
  const image = newsItem.image as Media
  const formattedDate = new Date(newsItem.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <article className="w-full">
      {/* Header Section - Centered */}
      <div className="container mx-auto px-4 py-12 text-center">
        {/* Date */}
        <time className="text-sm text-brand-gray-500 block mb-4">
          Published {formattedDate}
        </time>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-brand-charcoal mb-6">
          {newsItem.title}
        </h1>

        {/* Description */}
        <p className="text-lg text-brand-gray-600 max-w-3xl mx-auto leading-relaxed">
          {newsItem.desc}
        </p>
      </div>

      {/* Full-size Image */}
      <div className="w-full relative aspect-[16/9] md:aspect-[21/9] bg-brand-gray-100">
        {image?.url && (
          <Image
            src={image.url}
            alt={image.alt || newsItem.title}
            fill
            className="object-cover"
            priority
          />
        )}
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto prose prose-lg prose-gray">
          <RichText content={newsItem.content} />
        </div>
      </div>
    </article>
  )
}
