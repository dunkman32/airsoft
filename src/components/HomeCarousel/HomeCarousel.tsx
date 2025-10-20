'use client'

import type { HomeSetting, Media } from '@/app/(payload)/payload-types'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import type { CarouselApi } from '@/components/ui/carousel'

export function HomeCarouselComponent({ carouselItems }: { carouselItems?: HomeSetting['carousel'] }) {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!api) {
      return
    }

    setCurrent(api.selectedScrollSnap())

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  return (
    <div className="w-full min-h-[440px] relative">
      <Carousel
        setApi={setApi}
        opts={{
          align: 'start',
          loop: true,
        }}
        plugins={[Autoplay({ delay: 5000 })]}
        className="w-full"
      >
        <CarouselContent>
          {carouselItems?.map((item, index) => {
            const image = item.image as Media | undefined
            const imageUrl = image?.url

            if (!imageUrl) return null

            const carouselItem = (
              <div className="relative w-full min-h-[440px] overflow-hidden">
                <Image
                  src={imageUrl}
                  alt={image.alt || `Carousel slide ${index + 1}`}
                  fill
                  className="object-cover"
                  priority={index === 0}
                  sizes="100vw"
                />
              </div>
            )

            return (
              <CarouselItem key={item.id || index}>
                {item.link ? (
                  <Link href={item.link} className="block w-full">
                    {carouselItem}
                  </Link>
                ) : (
                  carouselItem
                )}
              </CarouselItem>
            )
          })}
        </CarouselContent>
        <CarouselPrevious className="left-4" />
        <CarouselNext className="right-4" />
      </Carousel>

      {/* Pagination bullets */}
      <div className="absolute bottom-4 backdrop-blur p-1 rounded-3xl left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
        {carouselItems?.map((item, index) => (
          <button
            key={item.id || index}
            className={`w-2 h-2 rounded-full transition-all ${
              index === current ? 'bg-white w-8' : 'bg-white/50'
            }`}
            onClick={() => api?.scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
