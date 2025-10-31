'use server'

import { revalidateTag } from 'next/cache'
import { CACHE_TAG } from './queries'

export async function revalidateTeamsGlobal() {
  revalidateTag(CACHE_TAG)
}
