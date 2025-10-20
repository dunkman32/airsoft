import { getPayload } from 'payload'
import config from '@payload-config'
import { NewsGrid } from '@/components/NewsGrid/NewsGrid'
import type { News } from '@/app/(payload)/payload-types'
import { AboutUs } from '@/components/AboutUs'

interface PageProps {
  searchParams: Promise<{
    page?: string
  }>
}

export const metadata = {
  title: 'News',
  description: 'Latest news and updates',
}

export default async function NewsListPage({ searchParams }: PageProps) {
  const params = await searchParams
  const currentPage = Number(params.page) || 1
  const itemsPerPage = 12

  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'news',
    limit: itemsPerPage,
    page: currentPage,
    sort: '-createdAt',
  })

  const newsItems = result.docs as News[]
  const totalPages = result.totalPages
  const hasNextPage = result.hasNextPage
  const hasPrevPage = result.hasPrevPage

  return (
    <div className="flex gap-2 flex-col">
      <NewsGrid
        newsItems={newsItems}
        currentPage={currentPage}
        totalPages={totalPages}
        hasNextPage={hasNextPage}
        hasPrevPage={hasPrevPage}
      />
      <AboutUs />
    </div>
  )
}
