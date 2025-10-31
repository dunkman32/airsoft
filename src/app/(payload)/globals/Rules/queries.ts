import { unstable_cacheTag as cacheTag } from 'next/cache'
import { getPayload } from 'payload'
import type { Rule } from '../../payload-types'
import config from '@payload-config'

export const RULES_CACHE_TAG = 'rules-global'

async function getCachedRules(): Promise<Rule | null> {
  'use cache'
  cacheTag(RULES_CACHE_TAG)

  try {
    const payload = await getPayload({ config })
    const result = await payload.findGlobal({
      slug: 'rules',
      depth: 2,
    })

    return result
  } catch (_error) {
    return null
  }
}

export async function getRules(): Promise<Rule | null> {
  return getCachedRules()
}
