'use server'

import { revalidateTag } from 'next/cache'
import { CACHE_TAG } from './queries'

export async function revalidateTeams() {
  revalidateTag(CACHE_TAG)
}
