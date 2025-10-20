'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { News, Media } from '@/app/(payload)/payload-types'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'

export function NewsCarouselComponent({ newsItems }: { newsItems?: News[] }) {
  if (!newsItems || newsItems.length === 0) {
    return null
  }

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-6">Latest News</h2>
      <Carousel
        opts={{
          align: 'start',
          loop: true,
          slidesToScroll: 1,
        }}
        plugins={[Autoplay({ delay: 4000 })]}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {newsItems.map((item, index) => {
            const image = item.image as Media | undefined
            const imageUrl = image?.url

            if (!imageUrl) return null

            const newsCard = (
              <div className="relative w-full min-h-[300px] overflow-hidden rounded-lg bg-card border border-border hover:shadow-lg transition-shadow">
                <div className="relative w-full h-[200px]">
                  <Image
                    src={imageUrl}
                    alt={item.title || image.alt || `News ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2 line-clamp-2">
                    {item.title}
                  </h3>
                  {item.desc && (
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {item.desc}
                    </p>
                  )}
                </div>
              </div>
            )

            return (
              <CarouselItem key={item.id || index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <Link href={`/news/${item.slug}`} className="block w-full">
                  {newsCard}
                </Link>
              </CarouselItem>
            )
          })}
        </CarouselContent>
        <CarouselPrevious className="left-[-40px]" />
        <CarouselNext className="right-[-40px]" />
      </Carousel>
    </div>
  )
}
