'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Event, Media } from '@/app/(payload)/payload-types'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
import { SectionTitle } from '@/components/SectionTitle'

export function EventsCarouselComponent({ eventsItems }: { eventsItems?: Event[] }) {
  if (!eventsItems || eventsItems.length === 0) {
    return null
  }

  return (
    <div className="container mx-auto p-3 lg:p-8 rounded-lg">
      <Link href="/events">
        <SectionTitle showIcons>Featured Events</SectionTitle>
      </Link>
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
          {eventsItems.map((item, index) => {
            const image = item.coverImage as Media | undefined
            const imageUrl = image?.url

            if (!imageUrl) return null

            const formattedDate = new Date(item.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })

            const eventCard = (
              <div className="relative w-full min-h-[300px] overflow-hidden rounded-lg bg-card border border-border hover:shadow-lg transition-shadow">
                <div className="relative w-full h-[200px]">
                  <Image
                    src={imageUrl}
                    alt={item.title || image.alt || `Event ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-4">
                  <time className="text-xs text-gray-400 block mb-2">{formattedDate}</time>
                  <h3 className="text-lg font-semibold mb-2 line-clamp-2">{item.title}</h3>
                </div>
              </div>
            )

            return (
              <CarouselItem
                key={item.id || index}
                className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3"
              >
                <Link href={`/events/${item.slug}`} className="block w-full">
                  {eventCard}
                </Link>
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
