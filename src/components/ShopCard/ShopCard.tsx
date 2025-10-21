'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Shop, Media } from '@/app/(payload)/payload-types'

interface ShopCardProps {
  item: Shop
  index?: number
}

export function ShopCard({ item, index = 0 }: ShopCardProps) {
  const image = item.image as Media | undefined
  const imageUrl = image?.url

  if (!imageUrl) return null

  return (
    <Link href={`/shop/${item.slug}`} className="block w-full group">
      <div className="relative w-full flex items-end h-60 overflow-hidden rounded-lg bg-card border border-border hover:shadow-lg transition-all duration-300 group-hover:scale-[1.02]">
        <div className="absolute w-full inset-0">
          <Image
            src={imageUrl}
            alt={item.title || image.alt || `Product ${index + 1}`}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
          />
        </div>
        <div className="relative px-4 py-1 transition-transform duration-300 group-hover:-translate-y-12">
          <h3 className="text-lg font-semibold mb-1 line-clamp-2 group-hover:text-brand-orange transition-colors">
            {item.title}
          </h3>
          {item.desc && (
            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{item.desc}</p>
          )}
        </div>
        {/* Price overlay - slides up from bottom on hover */}
        {typeof item.price === 'number' && (
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background via-background to-transparent transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <p className="text-2xl font-bold text-brand-orange">
              ${item.price.toFixed(2)}
            </p>
          </div>
        )}
      </div>
    </Link>
  )
}
