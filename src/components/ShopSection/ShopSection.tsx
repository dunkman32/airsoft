'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Shop, Media } from '@/app/(payload)/payload-types'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { SectionTitle } from '@/components/SectionTitle'

interface ShopSectionProps {
  shopItems?: Shop[]
  itemsPerPage?: number
}

export function ShopSection({ shopItems, itemsPerPage = 4 }: ShopSectionProps) {
  const [currentPage, setCurrentPage] = useState(1)

  if (!shopItems || shopItems.length === 0) {
    return null
  }

  const totalPages = Math.ceil(shopItems.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentItems = shopItems.slice(startIndex, endIndex)

  const hasPrevPage = currentPage > 1
  const hasNextPage = currentPage < totalPages

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    // Scroll to top of shop section
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="container mx-auto p-3 lg:p-8 rounded-lg">
      <Link href="/shop">
        <SectionTitle showIcons>Shop</SectionTitle>
      </Link>

      {/* Shop Grid - 2 columns on md, 4 on xl */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {currentItems.map((item, index) => {
          const image = item.image as Media | undefined
          const imageUrl = image?.url

          if (!imageUrl) return null

          return (
            <Link
              key={item.id || index}
              href={`/shop/${item.slug}`}
              className="block w-full group"
            >
              <div className="relative w-full h-60 items-end flex overflow-hidden rounded-lg bg-card border border-border hover:shadow-lg transition-all duration-300 group-hover:scale-[1.02]">
                <div className="absolute inset-0 w-full">
                  <Image
                    src={imageUrl}
                    alt={item.title || image.alt || `Product ${index + 1}`}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                  />
                </div>
                <div className="relative px-4 py-1 transition-transform duration-300 group-hover:-translate-y-12 backdrop-blur-xs w-full">
                  <h3 className="text-lg font-semibold mb-1 line-clamp-2 group-hover:text-brand-orange transition-colors">
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
                    <p className="text-2xl font-bold text-brand-orange">
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
