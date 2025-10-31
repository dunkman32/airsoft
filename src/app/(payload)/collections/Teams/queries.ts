import 'server-only'
import { getPayload } from 'payload'
import config from '@payload-config'
import { unstable_cacheTag as cacheTag } from 'next/cache'

export const CACHE_TAG = 'teams'

const getTeamsCached = async () => {
  'use cache'
  cacheTag(CACHE_TAG)

  const payload = await getPayload({ config })

  const teams = await payload.find({
    collection: 'teams',
    depth: 2,
  })

  return teams
}

export const getTeams = async () => {
  return getTeamsCached()
}
