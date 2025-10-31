import 'server-only'
import { getPayload } from 'payload'
import config from '@payload-config'
import { unstable_cacheTag as cacheTag } from 'next/cache'

export const CACHE_TAG = 'teams-global'

const getTeamsGlobalCached = async () => {
  'use cache'
  cacheTag(CACHE_TAG)

  const payload = await getPayload({ config })

  const teamsGlobal = await payload.findGlobal({
    slug: 'teams-global',
    depth: 2,
  })

  return teamsGlobal
}

export const getTeamsGlobal = async () => {
  return getTeamsGlobalCached()
}
