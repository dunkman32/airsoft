'use client'

import React from 'react'
import Image from 'next/image'
import type {  Media } from '@/app/(payload)/payload-types'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

interface TeamGalleryProps {
  gallery: any[]
}

export function TeamGallery({ gallery }: TeamGalleryProps) {
  if (!gallery || gallery.length === 0) {
    return null
  }

  return (
    <div className="w-full my-8">
      <Carousel
        opts={{
          align: 'start',
          loop: true,
          slidesToScroll: 1,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {gallery.map((item, index) => {
            const image = item.image as Media | undefined
            const imageUrl = image?.url

            if (!imageUrl) return null

            return (
              <CarouselItem
                key={item.id || index}
                className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3"
              >
                <div className="relative w-full aspect-[4/3] overflow-hidden rounded-lg bg-card border border-border">
                  <Image
                    src={imageUrl}
                    alt={image.alt || `Gallery image ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              </CarouselItem>
            )
          })}
        </CarouselContent>
        <div className="hidden lg:block">
          <CarouselPrevious className="left-[-40px]" />
          <CarouselNext className="right-[-40px]" />
        </div>
      </Carousel>
    </div>
  )
}
