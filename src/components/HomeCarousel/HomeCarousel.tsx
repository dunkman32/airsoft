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

export function HomeCarouselComponent({ carouselItems }: { carouselItems?: HomeSetting['carousel'] }) {
  return (
    <div className="w-full min-h-[440px]">
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        plugins={[Autoplay()]}
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
    </div>
  )
}
