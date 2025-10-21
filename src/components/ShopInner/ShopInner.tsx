'use client'

import React from 'react'
import Image from 'next/image'
import type { Shop, Media } from '@/app/(payload)/payload-types'
import { RichText } from '../RichText'

interface ShopInnerProps {
  shopItem: Shop
}

export function ShopInner({ shopItem }: ShopInnerProps) {
  const mainImage = shopItem.image as Media
  const extraImages = shopItem.extraImages || []
  const formattedDate = shopItem.createdAt
    ? new Date(shopItem.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null

  return (
    <article className="w-full">
      {/* Header Section - Centered */}
      <div className="container mx-auto px-4 py-12 text-center">
        {/* Date */}
        {formattedDate && (
          <time className="text-sm text-brand-gray-500 block mb-4">
            Added {formattedDate}
          </time>
        )}

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-brand-charcoal mb-6">
          {shopItem.title}
        </h1>

        {/* Price */}
        {typeof shopItem.price === 'number' && (
          <p className="text-3xl md:text-4xl font-bold text-brand-orange mb-6">
            ${shopItem.price.toFixed(2)}
          </p>
        )}

        {/* Description */}
        <p className="text-lg text-brand-gray-600 max-w-3xl mx-auto leading-relaxed">
          {shopItem.desc}
        </p>
      </div>

      {/* Main Product Image */}
      <div className="w-full relative aspect-[16/9] md:aspect-[21/9] bg-brand-gray-100">
        {mainImage?.url && (
          <Image
            src={mainImage.url}
            alt={mainImage.alt || shopItem.title}
            fill
            className="object-contain"
            priority
          />
        )}
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto prose prose-lg prose-gray">
          <RichText content={shopItem.content} />
        </div>
      </div>

      {/* Extra Images Gallery */}
      {extraImages.length > 0 && (
        <div className="container mx-auto px-4 py-12">
          <h2 className="text-2xl md:text-3xl font-bold text-brand-charcoal mb-8 text-center">
            Product Gallery
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {extraImages.map((item, index) => {
              const image = item.image as Media | undefined
              if (!image?.url) return null

              return (
                <div
                  key={index}
                  className="relative aspect-square bg-brand-gray-100 rounded-lg overflow-hidden group"
                >
                  <Image
                    src={image.url}
                    alt={item.caption || image.alt || `Product image ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {item.caption && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                      <p className="text-white text-sm">{item.caption}</p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}
    </article>
  )
}
