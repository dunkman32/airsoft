'use server'

import { revalidateTag } from 'next/cache'
import { MEDIA_CACHE_TAG } from './queries'

export async function revalidateMedia() {
  revalidateTag(MEDIA_CACHE_TAG)
}
