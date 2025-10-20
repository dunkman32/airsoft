'use client'

import type { AboutUs, Media } from '@/app/(payload)/payload-types'
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

interface AboutUsCarouselProps {
  slides: NonNullable<AboutUs['slides']>
}

export function AboutUsCarousel({ slides }: AboutUsCarouselProps) {
  if (!slides || slides.length === 0) return null

  return (
    <div className="w-full">
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        plugins={[Autoplay({ delay: 5000 })]}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {slides.map((slide, index) => {
            const image = slide.image as Media | undefined
            const imageUrl = image?.url

            if (!imageUrl) return null

            const slideContent = (
              <div className="relative w-full h-[260px] overflow-hidden rounded-lg group">
                <Image
                  src={imageUrl}
                  alt={image.alt || slide.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  priority={index < 3}
                />
                {/* Overlay with title and description */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-white text-2xl font-bold mb-2">{slide.title}</h3>
                  <p className="text-white/90 text-sm line-clamp-3">{slide.desc}</p>
                </div>
              </div>
            )

            return (
              <CarouselItem key={slide.id || index} className="pl-2 md:pl-4 md:basis-1/3">
                {slide.link ? (
                  <Link href={slide.link} className="block w-full">
                    {slideContent}
                  </Link>
                ) : (
                  slideContent
                )}
              </CarouselItem>
            )
          })}
        </CarouselContent>
        {/* <div className="hidden lg:block">
          <CarouselPrevious className="left-[-40px]" />
          <CarouselNext className="right-[-40px]" />
        </div> */}
      </Carousel>
    </div>
  )
}
