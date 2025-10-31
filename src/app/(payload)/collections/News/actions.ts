'use server'

import { revalidateTag } from 'next/cache'
import { NEWS_CACHE_TAG } from './queries'

export async function revalidateNews() {
  revalidateTag(NEWS_CACHE_TAG)
}
