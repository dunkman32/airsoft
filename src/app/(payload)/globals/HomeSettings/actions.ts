'use server'

import { revalidateTag } from 'next/cache'
import { HOME_SETTINGS_CACHE_TAG } from './queries'

export async function revalidateHomeSettings() {
  revalidateTag(HOME_SETTINGS_CACHE_TAG)
}
