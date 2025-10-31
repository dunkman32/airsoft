import { unstable_cacheTag as cacheTag } from 'next/cache'
import { getPayload } from 'payload'
import type { Event } from '../../payload-types'
import config from '@payload-config'

export const EVENTS_CACHE_TAG = 'events-collection'

async function getCachedEvents(): Promise<Event[]> {
  'use cache'
  cacheTag(EVENTS_CACHE_TAG)

  try {
    const payload = await getPayload({ config })

    const result = await payload.find({
      collection: 'events',
      depth: 2,
      limit: 1000,
    })

    return result.docs
  } catch (_error) {
    return []
  }
}

export async function getEvents(): Promise<Event[]> {
  return getCachedEvents()
}

async function getCachedEventBySlug(slug: string): Promise<Event | null> {
  'use cache'
  cacheTag(EVENTS_CACHE_TAG)

  try {
    const payload = await getPayload({ config })

    const result = await payload.find({
      collection: 'events',
      where: {
        slug: {
          equals: slug,
        },
      },
      depth: 2,
      limit: 1,
    })

    return result.docs[0] || null
  } catch (_error) {
    return null
  }
}

export async function getEventBySlug(slug: string): Promise<Event | null> {
  return getCachedEventBySlug(slug)
}
