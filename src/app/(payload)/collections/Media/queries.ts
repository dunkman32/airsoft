import { unstable_cacheTag as cacheTag } from 'next/cache'
import { getPayload } from 'payload'
import type { Media } from '../../payload-types'
import config from '@payload-config'

export const MEDIA_CACHE_TAG = 'media-collection'

async function getCachedMedia(): Promise<Media[]> {
  'use cache'
  cacheTag(MEDIA_CACHE_TAG)

  try {
    const payload = await getPayload({ config })

    const result = await payload.find({
      collection: 'media',
      depth: 2,
      limit: 1000,
    })

    return result.docs
  } catch (_error) {
    return []
  }
}

export async function getMedia(): Promise<Media[]> {
  return getCachedMedia()
}

async function getCachedMediaById(id: number): Promise<Media | null> {
  'use cache'
  cacheTag(MEDIA_CACHE_TAG)

  try {
    const payload = await getPayload({ config })
    const result = await payload.findByID({
      collection: 'media',
      id,
      depth: 2,
    })

    return result
  } catch (_error) {
    return null
  }
}

export async function getMediaById(id: number): Promise<Media | null> {
  return getCachedMediaById(id)
}
