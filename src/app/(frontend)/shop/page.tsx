import { getPayload } from 'payload'
import config from '@payload-config'
import { ShopGrid } from '@/components/ShopGrid/ShopGrid'
import type { Shop } from '@/app/(payload)/payload-types'
import { AboutUs } from '@/components/AboutUs'

interface PageProps {
  searchParams: Promise<{
    page?: string
  }>
}

export const metadata = {
  title: 'Shop',
  description: 'Browse our airsoft products',
}

export default async function ShopListPage({ searchParams }: PageProps) {
  const params = await searchParams
  const currentPage = Number(params.page) || 1
  const itemsPerPage = 12

  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'shop',
    limit: itemsPerPage,
    page: currentPage,
    sort: '-createdAt',
  })

  const shopItems = result.docs as Shop[]
  const totalPages = result.totalPages
  const hasNextPage = result.hasNextPage
  const hasPrevPage = result.hasPrevPage

  return (
    <div className="flex gap-2 flex-col">
      <ShopGrid
        shopItems={shopItems}
        currentPage={currentPage}
        totalPages={totalPages}
        hasNextPage={hasNextPage}
        hasPrevPage={hasPrevPage}
      />
      <AboutUs />
    </div>
  )
}
