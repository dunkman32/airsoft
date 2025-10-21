'use client'

import React from 'react'
import Image from 'next/image'
import type { Event, Media } from '@/app/(payload)/payload-types'
import { RichText } from '../RichText'
import { EventGallery } from '../EventGallery/EventGallery'

interface EventInnerProps {
  eventItem: Event
}

export function EventInner({ eventItem }: EventInnerProps) {
  const coverImage = eventItem.coverImage as Media
  const formattedDate = new Date(eventItem.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <article className="w-full">
      {/* Header Section - Centered */}
      <div className="container mx-auto px-4 py-12">
        {/* Date - Gray, Small, Centered */}
        <time className="text-sm text-gray-400 block text-center mb-4">
          {formattedDate}
        </time>

        {/* Title - Black, Large, Centered, Medium Weight */}
        <h1 className="text-lg md:text-xl font-medium text-black text-center mb-6">
          {eventItem.title}
        </h1>

        {/* Cover Image - Full Width, Rounded, Max Height 125 */}
        <div className="w-full relative rounded-lg overflow-hidden" style={{ maxHeight: '500px' }}>
          {coverImage?.url && (
            <Image
              src={coverImage.url}
              alt={coverImage.alt || eventItem.title}
              width={1200}
              height={500}
              className="w-full h-auto rounded-lg object-cover"
              style={{ maxHeight: '500px' }}
              priority
            />
          )}
        </div>
      </div>

      {/* Gallery Carousel */}
      {eventItem.gallery && eventItem.gallery.length > 0 && (
        <div className="container mx-auto px-4 py-8">
          <EventGallery gallery={eventItem.gallery} />
        </div>
      )}

      {/* Rich Text Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <RichText content={eventItem.content} />
        </div>
      </div>
    </article>
  )
}
