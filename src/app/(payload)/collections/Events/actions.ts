'use server'

import { revalidateTag } from 'next/cache'
import { EVENTS_CACHE_TAG } from './queries'

export async function revalidateEvents() {
  revalidateTag(EVENTS_CACHE_TAG)
}
