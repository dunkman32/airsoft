import { unstable_cacheTag as cacheTag } from 'next/cache'
import { getPayload } from 'payload'
import type { HomeSetting } from '../../payload-types'
import config from '@payload-config'

export const HOME_SETTINGS_CACHE_TAG = 'home-settings-global'

async function getCachedHomeSettings(): Promise<HomeSetting | null> {
  'use cache'
  cacheTag(HOME_SETTINGS_CACHE_TAG)

  try {
    const payload = await getPayload({ config })
    const result = await payload.findGlobal({
      slug: 'home-settings',
      depth: 2,
    })

    return result
  } catch (_error) {
    return null
  }
}

export async function getHomeSettings(): Promise<HomeSetting | null> {
  return getCachedHomeSettings()
}
