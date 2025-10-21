'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { Event, Media } from '@/app/(payload)/payload-types'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface EventsGridProps {
  eventsItems: Event[]
  currentPage: number
  totalPages: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

export function EventsGrid({
  eventsItems,
  currentPage,
  totalPages,
  hasNextPage,
  hasPrevPage,
}: EventsGridProps) {
  const router = useRouter()

  const handlePageChange = (page: number) => {
    router.push(`/events?page=${page}`)
  }

  if (!eventsItems || eventsItems.length === 0) {
    return (
      <div className="container mx-auto p-8">
        <h1
          className="text-3xl uppercase font-bold mb-8 text-brand-orange"
          style={{ textShadow: '0 2px 4px rgba(225, 138, 62, 0.4)' }}
        >
          Events
        </h1>
        <p className="text-muted-foreground">No events found.</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-3 lg:p-8">
      <h1
        className="text-3xl uppercase font-bold mb-8 text-brand-orange"
        style={{ textShadow: '0 2px 4px rgba(225, 138, 62, 0.4)' }}
      >
        Events
      </h1>

      {/* Events Grid - 1 column on mobile, 2 on md, 3 on lg, 4 on xl */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {eventsItems.map((item, index) => {
          const image = item.coverImage as Media | undefined
          const imageUrl = image?.url

          if (!imageUrl) return null

          const formattedDate = new Date(item.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })

          return (
            <Link
              key={item.id || index}
              href={`/events/${item.slug}`}
              className="block w-full group"
            >
              <div className="relative w-full min-h-[300px] overflow-hidden rounded-lg bg-card border border-border hover:shadow-lg transition-all duration-300 group-hover:scale-[1.02]">
                <div className="relative w-full h-[200px]">
                  <Image
                    src={imageUrl}
                    alt={item.title || image.alt || `Event ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  />
                </div>
                <div className="p-4">
                  <time className="text-xs text-gray-400 block mb-2">{formattedDate}</time>
                  <h3 className="text-lg font-semibold mb-2 line-clamp-2 group-hover:text-brand-orange transition-colors">
                    {item.title}
                  </h3>
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8">
          <Button
            variant="outline"
            size="icon"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={!hasPrevPage}
            aria-label="Previous page"
            className="cursor-pointer"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
              // Show first page, last page, current page, and pages around current page
              const showPage =
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 1 && page <= currentPage + 1)

              if (!showPage) {
                // Show ellipsis
                if (page === currentPage - 2 || page === currentPage + 2) {
                  return (
                    <span key={page} className="px-2 text-muted-foreground">
                      ...
                    </span>
                  )
                }
                return null
              }

              return (
                <Button
                  key={page}
                  variant={currentPage === page ? 'default' : 'outline'}
                  size="icon"
                  onClick={() => handlePageChange(page)}
                  className={
                    currentPage === page
                      ? 'bg-brand-orange hover:bg-brand-orange/90 cursor-pointer'
                      : 'cursor-pointer'
                  }
                >
                  {page}
                </Button>
              )
            })}
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={!hasNextPage}
            aria-label="Next page"
            className="cursor-pointer"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}
