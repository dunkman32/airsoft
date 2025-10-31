'use server'

import { revalidateTag } from 'next/cache'
import { RULES_CACHE_TAG } from './queries'

export async function revalidateRules() {
  revalidateTag(RULES_CACHE_TAG)
}
