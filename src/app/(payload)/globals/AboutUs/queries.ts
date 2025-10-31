import { unstable_cacheTag as cacheTag } from 'next/cache'
import { getPayload } from 'payload'
import type { AboutUs } from '../../payload-types'
import config from '@payload-config'

export const ABOUT_US_CACHE_TAG = 'about-us-global'

async function getCachedAboutUs(): Promise<AboutUs | null> {
  'use cache'
  cacheTag(ABOUT_US_CACHE_TAG)

  try {
    const payload = await getPayload({ config })
    const result = await payload.findGlobal({
      slug: 'about-us',
      depth: 2,
    })

    return result
  } catch (_error) {
    return null
  }
}

export async function getAboutUs(): Promise<AboutUs | null> {
  return getCachedAboutUs()
}
