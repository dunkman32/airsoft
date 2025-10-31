import { unstable_cacheTag as cacheTag } from 'next/cache'
import { getPayload } from 'payload'
import type { News } from '../../payload-types'
import config from '@payload-config'

export const NEWS_CACHE_TAG = 'news-collection'

async function getCachedNews(): Promise<News[]> {
  'use cache'
  cacheTag(NEWS_CACHE_TAG)

  try {
    const payload = await getPayload({ config })

    const result = await payload.find({
      collection: 'news',
      depth: 2,
      limit: 1000,
    })

    return result.docs
  } catch (_error) {
    return []
  }
}

export async function getNews(): Promise<News[]> {
  return getCachedNews()
}

async function getCachedNewsBySlug(slug: string): Promise<News | null> {
  'use cache'
  cacheTag(NEWS_CACHE_TAG)

  try {
    const payload = await getPayload({ config })

    const result = await payload.find({
      collection: 'news',
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

export async function getNewsBySlug(slug: string): Promise<News | null> {
  return getCachedNewsBySlug(slug)
}
