'use client'

import type { Media } from '@/app/(payload)/payload-types'
import Image from 'next/image'
import { TeamGallery } from '../TeamGallery/TeamGallery'

interface TeamsInnerProps {
  teamItem: any
}

export function TeamsInner({ teamItem }: TeamsInnerProps) {
  const hero = teamItem.hero as Media

  return (
    <article className="w-full">
      {/* Hero Section with Blurred Background */}
      <div className="relative w-full min-h-[400px] md:min-h-[500px] flex items-center justify-center overflow-hidden">
        {/* Blurred Background Image */}
        {hero?.url && (
          <div className="absolute inset-0">
            <Image
              src={hero.url}
              alt=""
              fill
              className="object-cover scale-110"
              priority
            />
            <div className="absolute backdrop-blur-xs inset-0 bg-black/40" />
          </div>
        )}

        {/* Content Overlay */}
        <div className="relative z-10 container mx-auto px-4 py-12 text-center">
          {/* Title - White, Large, Centered */}
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
            {teamItem.name}
          </h1>

          {/* Description - White text */}
          {teamItem.desc && (
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto drop-shadow-md">
              {teamItem.desc}
            </p>
          )}
        </div>
      </div>

      {/* Gallery Carousel */}
      {teamItem.gallery && teamItem.gallery.length > 0 && (
        <div className="container mx-auto px-4 py-8">
          <h2
            className="text-2xl uppercase font-bold mb-6 text-brand-orange"
            style={{ textShadow: '0 2px 4px rgba(225, 138, 62, 0.4)' }}
          >
            Gallery
          </h2>
          <TeamGallery gallery={teamItem.gallery} />
        </div>
      )}
    </article>
  )
}
