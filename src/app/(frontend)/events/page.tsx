import { getPayload } from 'payload'
import config from '@payload-config'
import { EventsGrid } from '@/components/EventsGrid/EventsGrid'
import type { Events } from '@/app/(payload)/payload-types'

interface PageProps {
  searchParams: Promise<{
    page?: string
  }>
}

export const metadata = {
  title: 'Events',
  description: 'Upcoming and past airsoft events',
}

export default async function EventsListPage({ searchParams }: PageProps) {
  const params = await searchParams
  const currentPage = Number(params.page) || 1
  const itemsPerPage = 12

  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'events',
    limit: itemsPerPage,
    page: currentPage,
    sort: '-date',
  })

  const eventsItems = result.docs as Events[]
  const totalPages = result.totalPages
  const hasNextPage = result.hasNextPage
  const hasPrevPage = result.hasPrevPage

  return (
    <div className="flex gap-2 flex-col">
      <EventsGrid
        eventsItems={eventsItems}
        currentPage={currentPage}
        totalPages={totalPages}
        hasNextPage={hasNextPage}
        hasPrevPage={hasPrevPage}
      />
    </div>
  )
}
