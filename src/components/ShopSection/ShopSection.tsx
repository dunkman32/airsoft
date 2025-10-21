'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import type { Shop } from '@/app/(payload)/payload-types'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { SectionTitle } from '@/components/SectionTitle'
import { ShopCard } from '@/components/ShopCard'

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
  }

  return (
    <div className="container mx-auto p-3 lg:p-8 rounded-lg">
      <Link href="/shop">
        <SectionTitle showIcons>Shop</SectionTitle>
      </Link>

      {/* Shop Grid - 2 columns on md, 4 on xl */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {currentItems.map((item, index) => (
          <ShopCard key={item.id || index} item={item} index={index} />
        ))}
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
