'use client'

import type { HomeSetting, Media } from '@/app/(payload)/payload-types'
import {
  Carousel,
  CarouselContent,
  CarouselItem
} from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'
import Link from 'next/link'


export function AdsCarouselComponent({ adsItems }: { adsItems?: HomeSetting['ads'] }) {
  if (!adsItems || adsItems.length === 0) {
    return null
  }

  return (
    <div className="w-full min-h-[42px] mx-auto">
      <Carousel
        opts={{
          align: 'start',
          loop: true,
          slidesToScroll: 1,
        }}
        plugins={[Autoplay({ delay: 2000 })]}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {adsItems.map((item, index) => {
            const image = item.image as Media | undefined
            const imageUrl = image?.url

            if (!imageUrl) return null

            const adItem = (
              <div className="relative w-full min-h-[42px] overflow-hidden rounded-lg">
                <Image
                  src={imageUrl}
                  alt={item.title || image.alt || `Ad ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                />
                {item.title && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                    <p className="text-white text-sm font-medium truncate">
                      {item.title}
                    </p>
                  </div>
                )}
              </div>
            )

            return (
              <CarouselItem key={item.id || index} className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4">
                {item.link ? (
                  <Link href={item.link} className="block w-full">
                    {adItem}
                  </Link>
                ) : (
                  adItem
                )}
              </CarouselItem>
            )
          })}
        </CarouselContent>
      </Carousel>
    </div>
  )
}
