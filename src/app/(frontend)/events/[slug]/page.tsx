import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import { EventInner } from '@/components/EventInner/EventInner'
import type { Event } from '@/app/(payload)/payload-types'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'events',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })

  const eventItem = result.docs[0]

  if (!eventItem) {
    return {
      title: 'Event Not Found',
    }
  }

  return {
    title: eventItem.title,
    description: `Event on ${new Date(eventItem.date).toLocaleDateString()}`,
  }
}

export default async function EventPage({ params }: PageProps) {
  const { slug } = await params
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'events',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })

  const eventItem = result.docs[0] as Event

  if (!eventItem) {
    notFound()
  }

  return <EventInner eventItem={eventItem} />
}
