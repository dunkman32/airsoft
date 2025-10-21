'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { Shop, Media } from '@/app/(payload)/payload-types'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface ShopGridProps {
  shopItems: Shop[]
  currentPage: number
  totalPages: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

export function ShopGrid({
  shopItems,
  currentPage,
  totalPages,
  hasNextPage,
  hasPrevPage,
}: ShopGridProps) {
  const router = useRouter()

  const handlePageChange = (page: number) => {
    router.push(`/shop?page=${page}`)
  }

  if (!shopItems || shopItems.length === 0) {
    return (
      <div className="container mx-auto p-8">
        <h1
          className="text-3xl uppercase font-bold mb-8 text-brand-orange"
          style={{ textShadow: '0 2px 4px rgba(225, 138, 62, 0.4)' }}
        >
          Shop
        </h1>
        <p className="text-muted-foreground">No shop items found.</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-3 lg:p-8">
      <h1
        className="text-3xl uppercase font-bold mb-8 text-brand-orange"
        style={{ textShadow: '0 2px 4px rgba(225, 138, 62, 0.4)' }}
      >
        Shop
      </h1>

      {/* Shop Grid - 2 columns on md, 4 on xl (as requested: 2 column, 4 in row) */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {shopItems.map((item, index) => {
          const image = item.image as Media | undefined
          const imageUrl = image?.url

          if (!imageUrl) return null

          return (
            <Link
              key={item.id || index}
              href={`/shop/${item.slug}`}
              className="block w-full group"
            >
              <div className="relative w-full h-[350px] overflow-hidden rounded-lg bg-card border border-border hover:shadow-lg transition-all duration-300 group-hover:scale-[1.02]">
                <div className="relative w-full h-[200px]">
                  <Image
                    src={imageUrl}
                    alt={item.title || image.alt || `Product ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                  />
                </div>
                <div className="relative p-4 transition-transform duration-300 group-hover:-translate-y-12">
                  <h3 className="text-lg font-semibold mb-2 line-clamp-2 group-hover:text-brand-orange transition-colors">
                    {item.title}
                  </h3>
                  {item.desc && (
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                      {item.desc}
                    </p>
                  )}
                </div>
                {/* Price overlay - slides up from bottom on hover */}
                {typeof item.price === 'number' && (
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background via-background to-transparent transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-2xl font-bold text-brand-orange text-center">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                )}
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
