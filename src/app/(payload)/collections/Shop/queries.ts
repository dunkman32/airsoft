import { unstable_cacheTag as cacheTag } from 'next/cache'
import { getPayload } from 'payload'
import type { Shop } from '../../payload-types'
import config from '@payload-config'

export const SHOP_CACHE_TAG = 'shop-collection'

async function getCachedShop(): Promise<Shop[]> {
  'use cache'
  cacheTag(SHOP_CACHE_TAG)

  try {
    const payload = await getPayload({ config })

    const result = await payload.find({
      collection: 'shop',
      depth: 2,
      limit: 1000,
    })

    return result.docs
  } catch (_error) {
    return []
  }
}

export async function getShop(): Promise<Shop[]> {
  return getCachedShop()
}

async function getCachedShopBySlug(slug: string): Promise<Shop | null> {
  'use cache'
  cacheTag(SHOP_CACHE_TAG)

  try {
    const payload = await getPayload({ config })

    const result = await payload.find({
      collection: 'shop',
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

export async function getShopBySlug(slug: string): Promise<Shop | null> {
  return getCachedShopBySlug(slug)
}
